# Fetch: запросы на другие сайты

Если мы сделаем запрос `fetch` на другой веб-сайт, он, вероятно, завершится неудачей.

Например, давайте попробуем запросить `http://example.com`:

```js run async
try {
  await fetch('http://example.com');
} catch(err) {
  alert(err); // Failed to fetch
}
```

Вызов `fetch` не удался, как и ожидалось.

Ключевым понятием здесь является *источник* (origin) -- комбинация домен/порт/протокол.

Запросы на другой источник -- отправленные на другой домен (или даже поддомен), или протокол, или порт -- требуют специальных заголовков от удалённой стороны.

Эта политика называется "CORS": Cross-Origin Resource Sharing ("совместное использование ресурсов между разными источниками").

<<<<<<< HEAD
## Зачем нужен CORS? Экскурс в историю

CORS существует для защиты интернета от злых хакеров.
=======
## Why is CORS needed? A brief history

CORS exists to protect the internet from evil hackers.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Серьёзно. Давайте сделаем краткое историческое отступление.

**Многие годы скрипт с одного сайта не мог получить доступ к содержимому другого сайта.**

<<<<<<< HEAD
Это простое, но могучее правило было основой интернет-безопасности. Например, хакерский скрипт с сайта `hacker.com` не мог получить доступ к почтовому ящику пользователя на сайте `gmail.com`. И люди чувствовали себя спокойно.
=======
That simple, yet powerful rule was a foundation of the internet security. E.g. an evil script from website `hacker.com` could not access the user's mailbox at website `gmail.com`. People felt safe.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

В то время в JavaScript не было методов для сетевых запросов. Это был "игрушечный" язык для украшения веб-страниц.

Но веб-разработчики жаждали большей власти. Чтобы обойти этот запрет и всё же получать данные с других сайтов, были придуманы разные хитрости.

### Использование форм

Одним из способов общения с другим сервером была отправка туда формы `<form>`. Люди отправляли её в `<iframe>`, чтобы оставаться на текущей странице, вот так:

```html
<!-- цель формы -->
*!*
<iframe name="iframe"></iframe>
*/!*

<!-- форма могла быть динамически сгенерирована и отправлена с помощью JavaScript -->
*!*
<form target="iframe" method="POST" action="http://another.com/…">
*/!*
  ...
</form>
```

Таким способом было возможно сделать GET/POST запрос к другому сайту даже без сетевых методов, так как формы можно отправлять куда угодно. Но так как запрещено получать доступ к содержимому `<iframe>` с другого сайта, прочитать ответ было невозможно.

Если быть точным, были трюки и для этого, требующие специального кода на странице и в ифрейме, так что общение с ифреймом было технически возможно. Сейчас мы не будем вдаваться в подробности, пусть эти динозавры покоятся в мире.

### Использование скриптов

Ещё один трюк заключался в использовании тега `script`. У него может быть любой `src`, с любым доменом, например `<script src="http://another.com/…">`. Это даёт возможность загрузить и выполнить скрипт откуда угодно.

Если сайт, например `another.com`, хотел предоставить данные для такого доступа, он предоставлял так называемый "протокол JSONP" (<b>JSON</b> with <b>P</b>adding)".

Вот как он работал.

Например, нам на нашем сайте нужны данные с сайта `http://another.com`, скажем, погода:

1. Сначала, заранее, объявляем глобальную функцию для обработки данных, например `gotWeather`.

    ```js
    // 1. Объявить функцию для обработки погодных данных
    function gotWeather({ temperature, humidity }) {
      alert(`температура: ${temperature}, влажность: ${humidity}`);
    }
    ```
2. Затем создаём тег `<script>` с `src="http://another.com/weather.json?callback=gotWeather"`, при этом имя нашей функции - в URL-параметре `callback`.

    ```js
    let script = document.createElement('script');
    script.src = `http://another.com/weather.json?callback=gotWeather`;
    document.body.append(script);
    ```
3. Удалённый сервер с `another.com` должен в ответ сгенерировать скрипт, который вызывает `gotWeather(...)` с данными, которые хочет передать.
    ```js
    // Ожидаемый ответ от сервера выглядит так:
    gotWeather({
      temperature: 25,
      humidity: 78
    });
    ```
4. Когда этот скрипт загрузится и выполнится, наша функция `gotWeather` получает данные.

Это работает и не нарушает безопасность, потому что обе стороны согласились передавать данные таким образом. А когда обе стороны согласны, то это определённо не хак. Всё ещё существуют сервисы, которые предоставляют такой доступ, так как это работает даже для очень старых браузеров.

Спустя некоторое время в браузерном JavaScript появились методы для сетевых запросов.

<<<<<<< HEAD
Вначале запросы на другой источник были запрещены. Но в результате долгих дискуссий было решено разрешить их делать, но для использования новых возможностей требовать разрешение сервера, выраженное в специальных заголовках.

## Простые запросы
=======
At first, cross-origin requests were forbidden. But as a result of long discussions, cross-origin requests were allowed, but with any new capabilities requiring an explicit allowance by the server, expressed in special headers.

## Safe requests
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Есть два вида запросов на другой источник:

<<<<<<< HEAD
1. Простые.
2. Все остальные.

Простые запросы будут попроще, поэтому давайте начнём с них.

[Простой запрос](http://www.w3.org/TR/cors/#terminology) - это запрос, удовлетворяющий следующим условиям:

1. [Простой метод](http://www.w3.org/TR/cors/#simple-method): GET, POST или HEAD
2. [Простые заголовки](http://www.w3.org/TR/cors/#simple-header) -- разрешены только:
=======
1. Safe requests.
2. All the others.

Safe Requests are simpler to make, so let's start with them.

A request is safe if it satisfies two conditions:

1. [Safe method](https://fetch.spec.whatwg.org/#cors-safelisted-method): GET, POST or HEAD
2. [Safe headers](https://fetch.spec.whatwg.org/#cors-safelisted-request-header) -- the only allowed custom headers are:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    - `Accept`,
    - `Accept-Language`,
    - `Content-Language`,
    - `Content-Type` со значением `application/x-www-form-urlencoded`, `multipart/form-data` или `text/plain`.

<<<<<<< HEAD
Любой другой запрос считается "непростым". Например, запрос с методом `PUT` или с HTTP-заголовком `API-Key` не соответствует условиям.

**Принципиальное отличие между ними состоит в том, что "простой запрос" может быть сделан через `<form>` или `<script>`, без каких-то специальных методов.**

Таким образом, даже очень старый сервер должен быть способен принять простой запрос.
=======
Any other request is considered "unsafe". For instance, a request with `PUT` method or with an `API-Key` HTTP-header does not fit the limitations.

**The essential difference is that a safe request can be made with a `<form>` or a `<script>`, without any special methods.**

So, even a very old server should be ready to accept a safe request.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

В противоположность этому, запросы с нестандартными заголовками или, например, методом `DELETE` нельзя создать таким способом. Долгое время JavaScript не мог делать такие запросы. Поэтому старый сервер может предположить, что такие запросы поступают от привилегированного источника, "просто потому, что веб-страница неспособна их посылать".

<<<<<<< HEAD
Когда мы пытаемся сделать непростой запрос, браузер посылает специальный предварительный запрос ("предзапрос", по англ. "preflight"), который спрашивает у сервера -- согласен ли он принять такой непростой запрос или нет?

И, если сервер явно не даёт согласие в заголовках, непростой запрос не посылается.
=======
When we try to make a unsafe request, the browser sends a special "preflight" request that asks the server -- does it agree to accept such cross-origin requests, or not?

And, unless the server explicitly confirms that with headers, an unsafe request is not sent.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Далее мы разберём конкретные детали.

<<<<<<< HEAD
## CORS для простых запросов

При запросе на другой источник браузер всегда ставит "от себя" заголовок `Origin`.

Например, если мы запрашиваем `https://anywhere.com/request` со страницы `https://javascript.info/page`, заголовки будут такими:
=======
## CORS for safe requests

If a request is cross-origin, the browser always adds the `Origin` header to it.

For instance, if we request `https://anywhere.com/request` from `https://javascript.info/page`, the headers will look like:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```http
GET /request
Host: anywhere.com
*!*
Origin: https://javascript.info
*/!*
...
```

<<<<<<< HEAD
Как вы можете видеть, заголовок `Origin` содержит именно источник (домен/протокол/порт), без пути.

Сервер может проверить `Origin` и, если он согласен принять такой запрос, добавить особый заголовок `Access-Control-Allow-Origin` к ответу. Этот заголовок должен содержать разрешённый источник (в нашем случае `https://javascript.info`) или звёздочку `*`. Тогда ответ успешен, в противном случае возникает ошибка.

Здесь браузер играет роль доверенного посредника:
1. Он гарантирует, что к запросу на другой источник добавляется правильный заголовок `Origin`.
2. Он проверяет наличие разрешающего заголовка `Access-Control-Allow-Origin` в ответе и, если всё хорошо, то JavaScript получает доступ к ответу сервера, в противном случае - доступ запрещается с ошибкой.
=======
As you can see, the `Origin` header contains exactly the origin (domain/protocol/port), without a path.

The server can inspect the `Origin` and, if it agrees to accept such a request, add a special header `Access-Control-Allow-Origin` to the response. That header should contain the allowed origin (in our case `https://javascript.info`), or a star `*`. Then the response is successful, otherwise it's an error.

The browser plays the role of a trusted mediator here:
1. It ensures that the correct `Origin` is sent with a cross-origin request.
2. It checks for permitting `Access-Control-Allow-Origin` in the response, if it exists, then JavaScript is allowed to access the response, otherwise it fails with an error.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

![](xhr-another-domain.svg)

Вот пример ответа сервера, который разрешает доступ:
```http
200 OK
Content-Type:text/html; charset=UTF-8
*!*
Access-Control-Allow-Origin: https://javascript.info
*/!*
```

## Заголовки ответа

<<<<<<< HEAD
По умолчанию при запросе к другому источнику JavaScript может получить доступ только к так называемым "простым" заголовкам ответа:
=======
For cross-origin request, by default JavaScript may only access so-called "safe" response headers:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- `Cache-Control`
- `Content-Language`
- `Content-Type`
- `Expires`
- `Last-Modified`
- `Pragma`

При доступе к любому другому заголовку ответа будет ошибка.

```smart header="Обратите внимание: нет `Content-Length`"
Пожалуйста, обратите внимание: в списке нет заголовка `Content-Length`!

Этот заголовок содержит полную длину ответа. Поэтому если мы загружаем что-то и хотели бы отслеживать прогресс в процентах, то требуется дополнительное разрешение для доступа к этому заголовку (читайте ниже).
```

<<<<<<< HEAD
Чтобы разрешить JavaScript доступ к любому другому заголовку ответа, сервер должен указать заголовок `Access-Control-Expose-Headers`. Он содержит список, через запятую, заголовков, которые не являются простыми, но доступ к которым разрешён.
=======
To grant JavaScript access to any other response header, the server must send the `Access-Control-Expose-Headers` header. It contains a comma-separated list of unsafe header names that should be made accessible.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Например:

```http
200 OK
Content-Type:text/html; charset=UTF-8
Content-Length: 12345
API-Key: 2c9de507f2c54aa1
Access-Control-Allow-Origin: https://javascript.info
*!*
Access-Control-Expose-Headers: Content-Length,API-Key
*/!*
```

<<<<<<< HEAD
При таком заголовке `Access-Control-Expose-Headers`, скрипту разрешено получить заголовки `Content-Length` и `API-Key` ответа.

## "Непростые" запросы
=======
With such an `Access-Control-Expose-Headers` header, the script is allowed to read the `Content-Length` and `API-Key` headers of the response.

## "Unsafe" requests
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Мы можем использовать любой HTTP-метод: не только `GET/POST`, но и `PATCH`, `DELETE` и другие.

<<<<<<< HEAD
Некоторое время назад никто не мог даже предположить, что веб-страница способна делать такие запросы. Так что могут существовать веб-сервисы, которые рассматривают нестандартный метод как сигнал: "Это не браузер". Они могут учитывать это при проверке прав доступа.

Поэтому, чтобы избежать недопониманий, браузер не делает "непростые" запросы (которые нельзя было сделать в прошлом) сразу. Перед этим он посылает предварительный запрос, спрашивая разрешения.

Предварительный запрос использует метод `OPTIONS`, у него нет тела, но есть два заголовка:

- `Access-Control-Request-Method` содержит HTTP-метод "непростого" запроса.
- `Access-Control-Request-Headers` предоставляет разделённый запятыми список его "непростых" HTTP-заголовков.
=======
Some time ago no one could even imagine that a webpage could make such requests. So there may still exist webservices that treat a non-standard method as a signal: "That's not a browser". They can take it into account when checking access rights.

So, to avoid misunderstandings, any "unsafe" request -- that couldn't be done in the old times, the browser does not make such requests right away. First, it sends a preliminary, so-called "preflight" request, to ask for permission.

A preflight request uses the method `OPTIONS`, no body and two headers:

- `Access-Control-Request-Method` header has the method of the unsafe request.
- `Access-Control-Request-Headers` header provides a comma-separated list of its unsafe HTTP-headers.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Если сервер согласен принимать такие запросы, то он должен ответить без тела,  со статусом 200 и с заголовками:

<<<<<<< HEAD
- `Access-Control-Allow-Methods` должен содержать разрешённые методы.
- `Access-Control-Allow-Headers` должен содержать список разрешённых заголовков.
- Кроме того, заголовок `Access-Control-Max-Age` может указывать количество секунд, на которое нужно кешировать разрешения. Так что браузеру не придётся посылать предзапрос для последующих запросов, удовлетворяющих данным разрешениям.

![](xhr-preflight.svg)

Давайте пошагово посмотрим, как это работает, на примере `PATCH` запроса (этот метод часто используется для обновления данных) на другой источник:
=======
- `Access-Control-Allow-Origin` must be either `*` or the requesting origin, such as `https://javascript.info`, to allow it.
- `Access-Control-Allow-Methods` must have the allowed method.
- `Access-Control-Allow-Headers` must have a list of allowed headers.
- Additionally, the header `Access-Control-Max-Age` may specify a number of seconds to cache the permissions. So the browser won't have to send a preflight for subsequent requests that satisfy given permissions.

![](xhr-preflight.svg)

Let's see how it works step-by-step on the example of a cross-origin `PATCH` request (this method is often used to update data):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let response = await fetch('https://site.com/service.json', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'API-Key': 'secret'
  }
});
```

<<<<<<< HEAD
Этот запрос не является простым по трём причинам (достаточно одной):
- Метод `PATCH`
- `Content-Type` не один из: `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`.
- Содержит "непростой" заголовок `API-Key`.
=======
There are three reasons why the request is unsafe (one is enough):
- Method `PATCH`
- `Content-Type` is not one of: `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`.
- "Unsafe" `API-Key` header.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

### Шаг 1 (предзапрос)

<<<<<<< HEAD
Перед тем, как послать такой запрос, браузер самостоятельно генерирует и посылает предзапрос, который выглядит следующим образом:
=======
Prior to sending such a request, the browser, on its own, sends a preflight request that looks like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```http
OPTIONS /service.json
Host: site.com
Origin: https://javascript.info
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: Content-Type,API-Key
```

<<<<<<< HEAD
- Метод: `OPTIONS`.
- Путь -- точно такой же, как в основном запросе: `/service.json`.
- Особые заголовки:
    - `Origin` -- источник.
    - `Access-Control-Request-Method` -- запрашиваемый метод.
    - `Access-Control-Request-Headers` -- разделённый запятыми список "непростых" заголовков запроса.
=======
- Method: `OPTIONS`.
- The path -- exactly the same as the main request: `/service.json`.
- Cross-origin special headers:
    - `Origin` -- the source origin.
    - `Access-Control-Request-Method` -- requested method.
    - `Access-Control-Request-Headers` -- a comma-separated list of "unsafe" headers.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

### Шаг 2 (ответ сервера на предзапрос)

<<<<<<< HEAD
Сервер должен ответить со статусом 200 и заголовками:
=======
The server should respond with status 200 and the headers:
- `Access-Control-Allow-Origin: https://javascript.info`
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
- `Access-Control-Allow-Methods: PATCH`
- `Access-Control-Allow-Headers: Content-Type,API-Key`.

Это разрешит будущую коммуникацию, в противном случае возникает ошибка.

<<<<<<< HEAD
Если сервер ожидает в будущем другие методы и заголовки, то он может в ответе перечислить их все сразу, разрешить заранее, например:
=======
If the server expects other methods and headers in the future, it makes sense to allow them in advance by adding them to the list.

For example, this response also allows `PUT`, `DELETE` and additional headers:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```http
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Methods: PUT,PATCH,DELETE
Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control
Access-Control-Max-Age: 86400
```

<<<<<<< HEAD
Теперь, когда браузер видит, что `PATCH` есть в `Access-Control-Allow-Methods`, а `Content-Type,API-Key` - в списке `Access-Control-Allow-Headers`, он посылает наш основной запрос.

Кроме того, ответ на предзапрос кешируется на время, указанное в заголовке `Access-Control-Max-Age` (86400 секунд, один день), так что последующие запросы не вызовут предзапрос. Они будут отосланы сразу при условии, что соответствуют закешированным разрешениям.
=======
Now the browser can see that `PATCH` is in `Access-Control-Allow-Methods` and `Content-Type,API-Key` are in the list `Access-Control-Allow-Headers`, so it sends out the main request.

If there's the header `Access-Control-Max-Age` with a number of seconds, then the preflight permissions are cached for the given time. The response above will be cached for 86400 seconds (one day). Within this timeframe, subsequent requests will not cause a preflight. Assuming that they fit the cached allowances, they will be sent directly.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

### Шаг 3 (основной запрос)

<<<<<<< HEAD
Если предзапрос успешен, браузер делает основной запрос. Алгоритм здесь такой же, что и для простых запросов.

Основной запрос имеет заголовок `Origin` (потому что он идёт на другой источник):
=======
When the preflight is successful, the browser now makes the main request. The process here is the same as for safe requests.

The main request has the `Origin` header (because it's cross-origin):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```http
PATCH /service.json
Host: site.com
Content-Type: application/json
API-Key: secret
Origin: https://javascript.info
```

### Шаг 4 (основной ответ)

Сервер не должен забывать о добавлении `Access-Control-Allow-Origin` к ответу на основной запрос. Успешный предзапрос не освобождает от этого:

```http
Access-Control-Allow-Origin: https://javascript.info
```

После этого JavaScript может прочитать ответ сервера.

```smart
Предзапрос осуществляется "за кулисами", невидимо для JavaScript.

JavaScript получает только ответ на основной запрос или ошибку, если со стороны сервера нет разрешения.
```

## Авторизационные данные

<<<<<<< HEAD
Запрос на другой источник по умолчанию не содержит авторизационных данных (credentials), под которыми здесь понимаются куки и заголовки HTTP-аутентификации.

Это нетипично для HTTP-запросов. Обычно запрос к `http://site.com` сопровождается всеми куки с этого домена. Но запросы на другой источник, сделанные методами JavaScript - исключение.
=======
A cross-origin request initiated by JavaScript code by default does not bring any credentials (cookies or HTTP authentication).

That's uncommon for HTTP-requests. Usually, a request to `http://site.com` is accompanied by all cookies from that domain. Cross-origin requests made by JavaScript methods on the other hand are an exception.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Например, `fetch('http://another.com')` не посылает никаких куки, даже тех (!), которые принадлежат домену `another.com`.

Почему?

Потому что запрос с авторизационными данными даёт намного больше возможностей, чем без них. Если он разрешён, то это позволяет JavaScript действовать от имени пользователя и получать информацию, используя его авторизационные данные.

Действительно ли сервер настолько доверяет скрипту? Тогда он должен явно разрешить такие запросы при помощи дополнительного заголовка.

Чтобы включить отправку авторизационных данных в `fetch`, нам нужно добавить опцию `credentials: "include"`, вот так:

```js
fetch('http://another.com', {
  credentials: "include"
});
```

<<<<<<< HEAD
Теперь `fetch` пошлёт куки с домена `another.com` вместе с нашим запросом на этот сайт.
=======
Now `fetch` sends cookies originating from `another.com` with request to that site.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Если сервер согласен принять запрос *с авторизационными данными*, он должен добавить заголовок `Access-Control-Allow-Credentials: true` к ответу, в дополнение к `Access-Control-Allow-Origin`.

Например:

```http
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Credentials: true
```

<<<<<<< HEAD
Пожалуйста, обратите внимание: в `Access-Control-Allow-Origin` запрещено использовать звёздочку `*` для запросов с авторизационными данными. Там должен быть именно источник, как показано выше. Это дополнительная мера безопасности, чтобы гарантировать, что сервер действительно знает, кому он доверяет делать такие запросы.
=======
Please note: `Access-Control-Allow-Origin` is prohibited from using a star `*` for requests with credentials. Like shown above, it must provide the exact origin there. That's an additional safety measure, to ensure that the server really knows who it trusts to make such requests.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Итого

<<<<<<< HEAD
С точки зрения браузера запросы к другому источнику бывают двух видов: "простые" и все остальные.

[Простые запросы](http://www.w3.org/TR/cors/#terminology) должны удовлетворять следующим условиям:
- Метод: GET, POST или HEAD.
- Заголовки -- мы можем установить только:
=======
From the browser point of view, there are two kinds of cross-origin requests: "safe" and all the others.

"Safe" requests must satisfy the following conditions:
- Method: GET, POST or HEAD.
- Headers -- we can set only:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type` со значением `application/x-www-form-urlencoded`, `multipart/form-data` или `text/plain`.

<<<<<<< HEAD
Основное их отличие заключается в том, что простые запросы с давних времён выполнялись с использованием тегов `<form>` или `<script>`, в то время как непростые долгое время были невозможны для браузеров.

Практическая разница состоит в том, что простые запросы отправляются сразу с заголовком `Origin`, а для других браузер делает предварительный запрос, спрашивая разрешения.

**Для простых запросов:**

- → Браузер посылает заголовок `Origin` с источником.
- ← Для запросов без авторизационных данных (не отправляются умолчанию) сервер должен установить:
    - `Access-Control-Allow-Origin` в `*` или то же значение, что и `Origin`
- ← Для запросов с авторизационными данными сервер должен установить:
    - `Access-Control-Allow-Origin` в то же значение, что и `Origin`
    - `Access-Control-Allow-Credentials` в `true`
=======
The essential difference is that safe requests were doable since ancient times using `<form>` or `<script>` tags, while unsafe were impossible for browsers for a long time.

So, the practical difference is that safe requests are sent right away, with the `Origin` header, while for the other ones the browser makes a preliminary "preflight" request, asking for permission.

**For safe requests:**

- → The browser sends the `Origin` header with the origin.
- ← For requests without credentials (not sent by default), the server should set:
    - `Access-Control-Allow-Origin` to `*` or same value as `Origin`
- ← For requests with credentials, the server should set:
    - `Access-Control-Allow-Origin` to same value as `Origin`
    - `Access-Control-Allow-Credentials` to `true`
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Дополнительно, чтобы разрешить JavaScript доступ к любым заголовкам ответа, кроме `Cache-Control`,  `Content-Language`, `Content-Type`, `Expires`, `Last-Modified` или `Pragma`, сервер должен перечислить разрешённые в заголовке `Access-Control-Expose-Headers`.

<<<<<<< HEAD
**Для непростых запросов перед основным запросом отправляется предзапрос:**

- → Браузер посылает запрос `OPTIONS` на тот же адрес с заголовками:
    - `Access-Control-Request-Method` - содержит запрашиваемый метод,
    - `Access-Control-Request-Headers` - перечисляет непростые запрашиваемые заголовки.
- ← Сервер должен ответить со статусом 200 и заголовками:
    - `Access-Control-Allow-Methods` со списком разрешённых методов,
    - `Access-Control-Allow-Headers` со списком разрешённых заголовков,
    - `Access-Control-Max-Age` с количеством секунд для кеширования разрешений
- → Затем отправляется основной запрос, применяется предыдущая "простая" схема.
=======
**For unsafe requests, a preliminary "preflight" request is issued before the requested one:**

- → The browser sends an `OPTIONS` request to the same URL, with the headers:
    - `Access-Control-Request-Method` has requested method.
    - `Access-Control-Request-Headers` lists unsafe requested headers.
- ← The server should respond with status 200 and the headers:
    - `Access-Control-Allow-Methods` with a list of allowed methods,
    - `Access-Control-Allow-Headers` with a list of allowed headers,
    - `Access-Control-Max-Age` with a number of seconds to cache the permissions.
- Then the actual request is sent, and the previous "safe" scheme is applied.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
