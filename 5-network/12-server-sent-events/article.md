# Посылаемые сервером события

Спецификация [Server-Sent Events](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) описывает встроенный класс `EventSource`, который позволяет поддерживать соединение с сервером и получать от него события.

Как и в случае с `WebSocket`, соединение постоянно.

Но есть несколько важных различий:

| `WebSocket` | `EventSource` |
|-------------|---------------|
| Двунаправленность: и сервер, и клиент могут обмениваться сообщениями | Однонаправленность: данные посылает только сервер |
| Бинарные и текстовые данные | Только текст |
| Протокол WebSocket | Обычный HTTP |

`EventSource` не настолько мощный способ коммуникации с сервером, как `WebSocket`.

Зачем нам его использовать?

Основная причина: он проще. Многим приложениям не требуется вся мощь `WebSocket`.

Если нам нужно получать поток данных с сервера: неважно, сообщения в чате или же цены для магазина - вот в чем хорош `EventSource`. К тому же, он поддерживает автоматическое переподключение, которое, используя `WebSocket`, нам бы пришлось поддерживать самим. Кроме того, мы используем старый добрый HTTP, а не новый протокол.

## Получение сообщений

Чтобы начать получать данные, нам нужно просто создать `new EventSource(url)`.

Браузер установит соединение с `url` и будет поддерживать его открытым, ожидая события.

Сервер должен ответить со статусом 200 и заголовком `Content-Type: text/event-stream`, затем он должен поддерживать соединение открытым и отправлять сообщения в особом формате:

```
data: Сообщение 1

data: Сообщение 2

data: Сообщение 3
data: в две строки
```

- Текст сообщения указывается после `data:`, пробел после двоеточия необязателен.
- Сообщения разделяются двойным переносом строки `\n\n`.
- Чтобы разделить сообщение на несколько строк, мы можем отправить несколько `data:` подряд (третее сообщение).

На практике, сложные сообщения обычно отправляются в формате JSON, указывая переносы строк внутри.

Например:

```js
data: {"user":"Джон","message":"Первая строка*!*\n*/!* Вторая строка"}
```

...Так что можно считать, что в каждом `data:` указано ровно одно сообщение.

Для каждого сообщения генериуется событие `message`:

```js
let eventSource = new EventSource("/events/subscribe");

eventSource.onmessage = function(event) {
  console.log("Новое сообщение", event.data);
  // этот код вывет в консоль 3 сообщения для данных, описанных выше
};

// or eventSource.addEventListener('message', ...)
```

### Cross-domain requests

`EventSource` supports cross-origin requests, like `fetch` any other networking methods. We can use any URL:

```js
let source = new EventSource("https://another-site.com/events");
```

The remote server will get the `Origin` header and must respond with `Access-Control-Allow-Origin` to proceed.

To pass credentials, we should set the additional option `withCredentials`, like this:

```js
let source = new EventSource("https://another-site.com/events", {
  withCredentials: true
});
```

Please see the chapter <info:fetch-crossorigin> for more details about cross-domain headers.


## Переподключение

После создания, `new EventSource` подключается к серверу и, если соединение обрывается, -- переподключается.

Это очень удобно, так как нам не приходится беспокоиться об этом.

There's a small delay between reconnections, a few seconds by default.

Сервер может выставить рекомендуемую задержку, указав в ответе `retry:` (в милисекундах):

```js
retry: 15000
data: Привет, я выставил задержку переподключения в 15 секунд
```

Поле `retry:` может посылаться как вместе с данными, так и отдельным сообщением.

Браузер должен быть подождать окончания задержки перед попыткой переподключения. Если потеряно подключение к интернету, бразуер может дождаться его востанновления и затем попытаться переподключиться.

- Если сервер хочет остановить попытки переподключения, он должен ответить со статусом 204.
- Если браузер хочет прекратить соединение, он может вызвать `eventSource.close()`:

```js
let eventSource = new EventSource(...);

eventSource.close();
```

Также переподключение не произойдет, если в ответе указан неверный `Content-Type` или его статус отличается от 301, 307, 200 и 204. The connection the `"error"` event is emitted, and the browser won't reconnect. [???]

```smart
Переоткрыть закрытое соединение невозможно. Если необходимо снова подключиться, объявите новый `EventSource`.
```

## Message id

When a connection breaks due to network problems, either side can't be sure which messages were received, and which weren't.

To correctly resume the connection, each message should have an `id` field, like this:

```
data: Message 1
id: 1

data: Message 2
id: 2

data: Message 3
data: of two lines
id: 3
```

When a message with `id:` is received, the browser:

- Sets the property `eventSource.lastEventId` to its value.
- Upon reconnection sends the header `Last-Event-ID` with that `id`, so that the server may re-send following messages.

```smart header="Put `id:` after `data:`"
Please note: the `id:` is appended below the message data, to ensure that `lastEventId` is updated after the message data is received.
```

## Connection status: readyState

The `EventSource` object has `readyState` property, that has one of three values:

```js no-beautify
EventSource.CONNECTING = 0; // connecting or reconnecting
EventSource.OPEN = 1;       // connected
EventSource.CLOSED = 2;     // connection closed
```

When an object is created, or the connection is down, it's always `EventSource.CONNECTING` (equals `0`).

We can query this property to know the state of `EventSource`.

## Event types

By default `EventSource` object generates three events:

- `message` -- a message received, available as `event.data`.
- `open` -- the connection is open.
- `error` -- the connection could not be established, e.g. the server returned HTTP 500 status.

The server may specify another type of event with `event: ...` at the event start.

For example:

```
event: join
data: Bob

data: Hello

event: leave
data: Bob
```

To handle custom events, we must use `addEventListener`, not `onmessage`:

```js
eventSource.addEventListener('join', event => {
  alert(`Joined ${event.data}`);
});

eventSource.addEventListener('message', event => {
  alert(`Said: ${event.data}`);
});

eventSource.addEventListener('leave', event => {
  alert(`Left ${event.data}`);
});
```

## Full example

Here's the server that sends messages with `1`, `2`, `3`, then `bye` and breaks the connection.

Then the browser automatically reconnects.

[codetabs src="eventsource"]


## Summary

The `EventSource` object communicates with the server. It establishes a persistent connection and allows the server to send messages over it.

It offers:
- Automatic reconnect, with tunable `retry` timeout.
- Message ids to resume events, the last identifier is sent in `Last-Event-ID` header.
- The current state is in the `readyState` property.

That makes `EventSource` a viable alternative to `WebSocket`, as it's more low-level and lacks these features.

In many real-life applications, the power of `EventSource` is just enough.

Supported in all modern browsers (not IE).

The syntax is:

```js
let source = new EventSource(url, [credentials]);
```

The second argument has only one possible option: `{ withCredentials: true }`, it allows sending cross-domain credentials.

Overall cross-domain security is same as for `fetch` and other network methods.

### Properties of an `EventSource` object

`readyState`
: The current connection state: either `EventSource.CONNECTING (=0)`, `EventSource.OPEN (=1)` or `EventSource.CLOSED (=2)`.

`lastEventId`
: The last received `id`. Upon reconnection the browser sends it in the header `Last-Event-ID`.

### Methods

`close()`
: Closes the connection соединение.

### Events

`message`
: Message received, the data is in `event.data`.

`open`
: The connection is established.

`error`
: In case of an error, including both lost connection (will auto-reconnect) and fatal errors. We can check `readyState` to see if the reconnection is being attempted.

The server may set a custom event name in `event:`. Such events should be handled using `addEventListener`, not `on<event>`.

### Server response format

The server sends messages, delimited by `\n\n`.

Message parts may start with:

- `data:` -- message body, a sequence of multiple `data` is interpreted as a single message, with `\n` between the parts.
- `id:` -- renews `lastEventId`, sent in `Last-Event-ID` on reconnect.
- `retry:` -- recommends a retry delay for reconnections in ms. There's no way to set it from JavaScript.
- `event:` -- even name, must precede `data:`.
