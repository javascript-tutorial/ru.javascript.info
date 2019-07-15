# Server Sent Events

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

// или eventSource.addEventListener('message', ...)
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

## Типы событий

По умолчанию объект `EventSource` генерирует 3 события:

- `message` -- получено сообщение, записанное в `event.data`.
- `open` -- соединение открыто.
- `error` -- не удалось установить соединение, например, сервер вернул статус 500.

Сервер может указать другой тип события с помощью `event: ...` в начале сообщения.

Например:

```
event: join
data: Боб

data: Привет

event: leave
data: Боб
```

Чтобы начать слушать пользователькие события, нужно использовать `addEventListener`, а не `onmessage`:

```js
eventSource.addEventListener('join', event => {
  alert(`${event.data} зашел`);
});

eventSource.addEventListener('message', event => {
  alert(`Сказал: ${event.data}`);
});

eventSource.addEventListener('leave', event => {
  alert(`${event.data} вышел`);
});
```

## Full example

Here's the server that sends messages with `1`, `2`, `3`, then `bye` and breaks the connection.

Then the browser automatically reconnects.

[codetabs src="eventsource"]


## Итоги

Объект `EventSource` "общается" с сервером. Он устанавливает постоянное соединение и позволяет серверу отправлять через него сообщения.

Он предоставляет:
- Автоматическое переподключение после истечения настраиваемой с помощью `retry` задержки.
- Идентификаторы сообщений для восстановления "общения" с сервером, последний идентификатор посылается в заголовке `Last-Event-ID`.
- Текущее состояние, записанное в свойстве `readyState`.

Это делает `EventSource` достойной альтернативой протоколу `WebSocket`, который не имеет этих функций.

Для многих приложений возможностей `EventSource` вполне достаточно.

Поддерживается во всех современных браузерах (кроме Internet Explorer).

Синтаксис:

```js
let source = new EventSource(url, [credentials]);
```

Второй аргумент - объект с одним свойством: `{ withCredentials: true }`, позволяет передавать вместе с запросом авторизирующие заголовки.

В целом, кросс-доменная безопасность на таком же уровне, как у `fetch` и других методов работы с сетью.

### Свойства объекта `EventSource`

`readyState`
: Текущее состояние подключения: `EventSource.CONNECTING (=0)`, `EventSource.OPEN (=1)` или `EventSource.CLOSED (=2)`.

`lastEventId`
: `id` последнего полученного сообщения. При переподключении браузер посылает его в заголовке `Last-Event-ID`.

### Методы

`close()`
: Закрывает соединение.

### События

`message`
: Сообщение получено, переданные данные записаны в `event.data`.

`open`
: Соединение установлено.

`error`
: Потеряно соединение (произойдет переподключение) или произошла фатальная ошибка. Мы можем обратиться к свойству `readyState`, чтобы проверить происходит ли переподключение.

Сервер может выставить собственное событие с помощью `event:`. Такие события должны быть обработаны с помощью `addEventListener`, а не `on<event>`.

### Формат ответа сервера

Сервер посылает сообщения, разделенные двойным переносом строки `\n\n`.

Часть сообщения может начинаться с:

- `data:` -- тело сообщения, несколько `data` подряд интерпретируются как одно сообщение, разделенные переносами строк `\n`.
- `id:` -- обновляет свойство `lastEventId`, отправляемое в `Last-Event-ID` при переподключении.
- `retry:` -- рекомендованная задержка перед переподключением в миллисекундах. Не может быть установлена с помощью JavaScript.
- `event:` -- пользовательское имя события, должно быть указано перед `data:`.
