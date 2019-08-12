# Fetch API

На данный момент мы уже многое знаем про `fetch`.

Давайте рассмотрим оставшуюся часть API, чтобы охватить все возможности.

<<<<<<< HEAD
```smart
Заметим: большинство этих возможностей используются редко. Вы можете пропустить эту главу и, несмотря на это, нормально использовать `fetch`.

Тем не менее, полезно знать, что вообще может `fetch`, чтобы, когда появится необходимость, вернуться и прочитать конкретные детали.
=======
Let's see the rest of API, to cover all its abilities.

```smart
Please note: most of these options are used rarely. You may skip this chapter and still use `fetch` well.

Still, it's good to know what `fetch` can do, so if the need arises, you can return and read the details.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
```

Нижеследующий список - это все возможные опции для `fetch` с соответствующими значениями по умолчанию (в комментариях указаны альтернативные значения):

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
<<<<<<< HEAD
    // значение этого заголовка обычно ставится автоматически,
    // в зависимости от тела запроса
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string, FormData, Blob, BufferSource или URLSearchParams
  referrer: "about:client", // или "" для того, чтобы не послать заголовок Referer,
  // или URL с текущего источника
=======
    // the content type header value is usually auto-set
    // depending on the request body
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string, FormData, Blob, BufferSource, or URLSearchParams
  referrer: "about:client", // or "" to send no Referer header,
  // or an url from the current origin
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache или only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // контрольная сумма, например "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController, чтобы прервать запрос
  window: window // null
});
```

Довольно-таки внушительный список, не так ли?

В главе <info:fetch> мы разобрали параметры `method`, `headers` и `body`.

Опция `signal` разъяснена в главе в <info:fetch-abort>.

<<<<<<< HEAD
Теперь давайте пройдёмся по оставшимся возможностям.
=======
Now let's explore the rest of capabilities.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

## referrer, referrerPolicy

Данные опции определяют, как `fetch` устанавливает HTTP-заголовок `Referer`.

<<<<<<< HEAD
Обычно этот заголовок ставится автоматически и содержит URL-адрес страницы, с которой пришёл запрос. В большинстве случаев он совсем неважен, в некоторых случаях, с целью большей безопасности, имеет смысл убрать или укоротить его.

**Опция `referrer` позволяет установить любой `Referer` в пределах текущего источника или же убрать его.**
=======
Usually that header is set automatically and contains the url of the page that made the request. In most scenarios, it's not important at all, sometimes, for security purposes, it makes sense to remove or shorten it.

**The `referrer` option allows to set any `Referer` within the current origin) or remove it.**
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Чтобы не отправлять `Referer`, нужно указать значением пустую строку:
```js
fetch('/page', {
*!*
  referrer: "" // не ставить заголовок Referer
*/!*
});
```

Для того, чтобы установить другой URL-адрес (должен быть с текущего источника):

```js
fetch('/page', {
  // предположим, что мы находимся на странице https://javascript.info
  // мы можем установить любое значение Referer при условии, что оно принадлежит текущему источнику
*!*
  referrer: "https://javascript.info/anotherpage"
*/!*
});
```

**Опция `referrerPolicy` устанавливает общие правила для `Referer`.**

Выделяется 3 типа запросов:

1. Запрос на тот же источник.
2. Запрос на другой источник.
3. Запрос с HTTPS to HTTP (с безопасного протокола на небезопасный).

В отличие от настройки `referrer`, которая позволяет задачать точное значение `Referer`, настройка `referrerPolicy` сообщает браузеру общие правила, что делать для каждого типа запроса.

Возможные значения описаны в [спецификации Referrer Policy](https://w3c.github.io/webappsec-referrer-policy/):

<<<<<<< HEAD
- **`"no-referrer-when-downgrade"`** -- это значение по умолчанию: `Referer` отправляется всегда, если только мы не отправим запрос из HTTPS в HTTP (из более безопасного протокола в менее безопасный).
- **`"no-referrer"`** -- никогда не отправлять `Referer`.
- **`"origin"`** -- отправлять в `Referer` только текущий источник, а не полный URL-адрес страницы, например, посылать только `http://site.com` вместо `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- отправлять полный Referer для запросов в пределах текущего источника, но для запросов на другой источник отправлять только сам источник (как выше).
- **`"same-origin"`** -- отправлять полный Referer для запросов в пределах текущего источника, а для запросов на другой источник не отправлять его вообще.
- **`"strict-origin"`** -- отправлять только значение источника, не отправлять Referer для HTTPS→HTTP запросов.
- **`"strict-origin-when-cross-origin"`** -- для запросов в пределах текущего источника отправлять полный Referer, для запросов на другой источник отправлять только значение источника, в случае HTTPS→HTTP запросов не отправлять ничего.
- **`"unsafe-url"`** -- всегда отправлять полный URL-адрес в `Referer`, даже при запросах `HTTPS→HTTP`.

Вот таблица со всеми комбинациями:
=======
Requests are split into 3 types:

1. Request to the same origin.
2. Request to another origin.
3. Request from HTTPS to HTTP (from safe to unsafe protocol).

Unlike `referrer` option that allows to set the exact `Referer` value, `referrerPolicy` tells the browser general rules for each request type.

Possible values are described in the [Referrer Policy specification](https://w3c.github.io/webappsec-referrer-policy/):

- **`"no-referrer-when-downgrade"`** -- the default value: full `Referer` is sent always, unless we send a request from HTTPS to HTTP (to less secure protocol).
- **`"no-referrer"`** -- never send `Referer`.
- **`"origin"`** -- only send the origin in `Referer`, not the full page URL, e.g. only `http://site.com` instead of `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- send full `Referer` to the same origin, but only the origin part for cross-origin requests (as above).
- **`"same-origin"`** -- send full `Referer` to the same origin, but no referer for for cross-origin requests.
- **`"strict-origin"`** -- send only origin, don't send `Referer` for HTTPS→HTTP requests.
- **`"strict-origin-when-cross-origin"`** -- for same-origin send full `Referer`, for cross-origin send only origin, unless it's HTTPS→HTTP request, then send nothing.
- **`"unsafe-url"`** -- always send full url in `Referer`, even for HTTPS→HTTP requests.

Here's a table with all combinations:

| Value | To same origin | To another origin | HTTPS→HTTP |
|-------|----------------|-------------------|------------|
| `"no-referrer"` | - | - | - |
| `"no-referrer-when-downgrade"` or `""` (default) | full | full | - |
| `"origin"` | origin | origin | origin |
| `"origin-when-cross-origin"` | full | origin | origin |
| `"same-origin"` | full | - | - |
| `"strict-origin"` | origin | origin | - |
| `"strict-origin-when-cross-origin"` | full | origin | - |
| `"unsafe-url"` | full | full | full |
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

| Значение | На тот же источник | На другой источник | HTTPS→HTTP |
|----------|--------------------|--------------------|------------|
| `"no-referrer"` | - | - | - |
| `"no-referrer-when-downgrade"` или `""` (по умолчанию) | full | full | - |
| `"origin"` | origin | origin | origin |
| `"origin-when-cross-origin"` | full | origin | origin |
| `"same-origin"` | full | - | - |
| `"strict-origin"` | origin | origin | - |
| `"strict-origin-when-cross-origin"` | full | origin | - |
| `"unsafe-url"` | full | full | full |

<<<<<<< HEAD
Допустим, у нас есть админка со структурой URL, которая не должна стать известной снаружи сайта.
=======
If we send a `fetch`, then by default it always sends the `Referer` header with the full url of our page (except when we request from HTTPS to HTTP, then no `Referer`).
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Если мы отправляем запрос `fetch`, то по умолчанию он всегда отправляет заголовок `Referer` с полным URL-адресом нашей админки (исключение - это когда мы делаем запрос от HTTPS в HTTP, в таком случае `Referer` не будет отправляться).

<<<<<<< HEAD
Например, `Referer: https://javascript.info/admin/secret/paths`.

Если мы хотим, чтобы другие сайты получали только источник, но не URL-путь, это сделает такая настройка:
=======
If we'd like other websites know only the origin part, not URL-path, we can set the option:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
fetch('https://another.com/page', {
  // ...
  referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
});
```

<<<<<<< HEAD
Мы можем поставить её во все вызовы `fetch`, возможно, интегрировать в JavaScript-библиотеку нашего проекта, которая делает все запросы и внутри использует `fetch`.

Единственным отличием в поведении будет то, что для всех запросов на другой источник `fetch` будет посылать только источник в заголовке `Referer` (например, `https://javascript.info`, без пути). А для запросов на наш источник мы продолжим получать полный `Referer` (это может быть полезно для отладки).

```smart header="Политика установки Referer (Referrer Policy) - не только для `fetch`"
Политика установки Referer, описанная в [спецификации Referrer Policy](https://w3c.github.io/webappsec-referrer-policy/), существует не только для `fetch`, она более глобальная.

В частности, можно поставить политику по умолчанию для всей страницы, используя HTTP-заголовок `Referrer-Policy`, или на уровне ссылки `<a rel="noreferrer">`.
=======
We can put it to all `fetch` calls, maybe integrate into JavaScript library of our project that does all requests and uses `fetch` inside.

Its only difference compared to the default behavior is that for requests to another origin `fetch` sends only the origin part of the URL (e.g. `https://javascript.info`, without path). For requests to our origin we still get the full `Referer` (maybe useful for debugging purposes).

```smart header="Referrer policy is not only for `fetch`"
Referrer policy, described in the [specification](https://w3c.github.io/webappsec-referrer-policy/), is not just for `fetch`, but more global.

In particular, it's possible to set the default policy for the whole page using `Referrer-Policy` HTTP header, or per-link, with `<a rel="noreferrer">`.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
```

## mode

<<<<<<< HEAD
Опция `mode` - это защита от нечаянной отправки запроса на другой источник:
=======
The `mode` option is a safe-guard that prevents occasional cross-origin requests:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

- **`"cors"`** -- стоит по умолчанию, позволяет делать такие запросы так, как описано в <info:fetch-crossorigin>,
- **`"same-origin"`** -- запросы на другой источник запрещены,
- **`"no-cors"`** -- разрешены только простые запросы на другой источник.

<<<<<<< HEAD
Эта опция может пригодиться, если URL-адрес для `fetch` приходит от третьей стороны, и нам нужен своего рода "глобальный выключатель" для запросов на другие источники.
=======
This option may be useful when the URL for `fetch` comes from a 3rd-party, and we want a "power off switch" to limit cross-origin capabilities.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

## credentials

Опция `credentials` указывает, должен ли `fetch` отправлять куки и авторизационные заголовки HTTP вместе с запросом.

<<<<<<< HEAD
- **`"same-origin"`** -- стоит по умолчанию, не отправлять для запросов на другой источник,
- **`"include"`** -- отправлять всегда, но при этом необходим заголовок `Access-Control-Allow-Credentials` в ответе от сервера, чтобы JavaScript получил доступ к ответу сервера, об этом говорилось в главе <info:fetch-crossorigin>,
- **`"omit"`** -- не отправлять ни при каких обстоятельствах, даже для запросов, сделанных в пределах текущего источника.
=======
- **`"same-origin"`** -- the default, don't send for cross-origin requests,
- **`"include"`** -- always send, requires `Accept-Control-Allow-Credentials` from cross-origin server in order for JavaScript to access the response, that was covered in the chapter <info:fetch-crossorigin>,
- **`"omit"`** -- never send, even for same-origin requests.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

## cache

По умолчанию `fetch` делает запросы, используя стандартное HTTP-кеширование. То есть, учитывается заголовки `Expires`, `Cache-Control`, отправляется `If-Modified-Since` и так далее. Так же, как и обычные HTTP-запросы.

Настройка `cache` позволяет игнорировать HTTP-кеш или же настроить его использование:

<<<<<<< HEAD
- **`"default"`** -- `fetch` будет использовать стандартные правила и заголовки HTTP кеширования,
- **`"no-store"`** -- полностью игнорировать HTTP-кеш, этот режим становится режимом по умолчанию, если присутствуют такие заголовки как `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, или `If-Range`,
- **`"reload"`** -- не брать результат из HTTP-кеша (даже при его присутствии), но сохранить ответ в кеше (если это дозволено заголовками ответа);
- **`"no-cache"`** -- в случае, если существует кешированный ответ - создать условный запрос, в противном же случае - обычный запрос. Сохранить ответ в HTTP-кеше,
- **`"force-cache"`** -- использовать ответ из HTTP-кеша, даже если он устаревший. Если же ответ в HTTP-кеше отсутствует, сделать обычный HTTP-запрос, действовать как обычно,
- **`"only-if-cached"`** -- использовать ответ из HTTP-кеша, даже если он устаревший. Если же ответ в HTTP-кеше отсутствует, то выдаётся ошибка. Это работает, только когда `mode` установлен в `"same-origin"`.
=======
- **`"default"`** -- `fetch` uses standard HTTP-cache rules and headers,
- **`"no-store"`** -- totally ignore HTTP-cache, this mode becomes the default if we set a header `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, or `If-Range`,
- **`"reload"`** -- don't take the result from HTTP-cache (if any), but populate cache with the response (if response headers allow),
- **`"no-cache"`** -- create a conditional request if there is a cached response, and a normal request otherwise. Populate HTTP-cache with the response,
- **`"force-cache"`** -- use a response from HTTP-cache, even if it's stale. If there's no response in HTTP-cache, make a regular HTTP-request, behave normally,
- **`"only-if-cached"`** -- use a response from HTTP-cache, even if it's stale. If there's no response in HTTP-cache, then error. Only works when `mode` is `"same-origin"`.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

## redirect

Обычно `fetch` прозрачно следует HTTP-редиректам, таким как 301, 302 и так далее.

Это можно поменять при помощи опции `redirect`:

- **`"follow"`** -- стоит по умолчанию, следовать HTTP-редиректам,
- **`"error"`** -- ошибка в случае HTTP-редиректа,
- **`"manual"`** -- не следовать HTTP-редиректу, но установить адрес редиректа в `response.url`, а `response.redirected` будет иметь значение `true`, чтобы мы могли сделать перенаправление на новый адрес вручную.

## integrity

Опция `integrity` позволяет проверить, соответствует ли ответ известной заранее контрольной сумме.

Как описано в [спецификации](https://w3c.github.io/webappsec-subresource-integrity/), поддерживаемыми хеш-функциями являются SHA-256, SHA-384 и SHA-512. В зависимости от браузера, могут быть и другие.

<<<<<<< HEAD
Например, мы скачиваем файл, и мы точно знаем, что его контрольная сумма по алгоритму SHA-256 равна "abcdef" (разумеется, настоящая контрольная сумма будет длиннее).
=======
For example, we're downloading a file, and we know that it's SHA-256 checksum is "abcdef" (a real checksum is longer, of course).
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Мы можем добавить это в настройку `integrity` вот так:

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

Затем `fetch` самостоятельно вычислит SHA-256 и сравнит его с нашей строкой. В случае несоответствия будет ошибка.

## keepalive

<<<<<<< HEAD
Опция `keepalive` указывает на то, что запрос может "пережить" страницу, которая его отправила.

Например, мы собираем статистические данные о том, как посетитель ведёт себя на нашей странице (на что он кликает, части страницы, которые он просматривает), для анализа и улучшения интерфейса.

Когда посетитель покидает нашу страницу - мы хотим сохранить собранные данные на нашем сервере.

Для этого мы можем использовать событие `window.onunload`:
=======
The `keepalive` option indicates that the request may "outlive" the webpage that initiated it.

For example, we gather statistics about how the current visitor uses our page (mouse clicks, page fragments he views), to analyze and improve user experience.

When the visitor leaves our page -- we'd like to save the data at our server.

We can use `window.onunload` event for that:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js run
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
*!*
    keepalive: true
*/!*
  });
};
```

<<<<<<< HEAD
Обычно, когда документ выгружается, все связанные с ним сетевые запросы прерываются. Но настройка `keepalive` указывает браузеру выполнять запрос в фоновом режиме даже после того, как пользователь покидает страницу. Поэтому эта опция обязательна, чтобы такой запрос удался.

У неё есть ряд ограничений:

- Мы не можем посылать мегабайты: лимит тела для запроса с `keepalive` - 64кб.
    - Если мы собираем больше данных, можем отправлять их регулярно, "пакетами", тогда на момент последнего запроса в `onunload` их останется немного.
    - Этот лимит распространяется на все запросы с `keepalive`. То есть, мы не можем его обойти, послав 100 запросов одновременно - каждый по 64Кбайт.
- Мы не сможем обработать ответ от сервера, если запрос сделан при `onunload`: в тот момент документ уже выгружен, его функции не сработают.
    - Обычно сервер посылает пустой ответ на такие запросы, так что это не является проблемой.
=======
Normally, when a document is unloaded, all associated network requests are aborted. But `keepalive` option tells the browser to perform the request in background, even after it leaves the page. So this option is essential for our request to succeed.

It has few limitations:

- We can't send megabytes: the body limit for `keepalive` requests is 64kb.
    - If gather more data, we can send it out regularly in packets, so that there won't be a lot left for the last `onunload` request.
    - The limit is for all currently ongoing requests. So we can't cheat it by creating 100 requests, each 64kb.
- We can't handle the server response if the request is made in `onunload`, because the document is already unloaded at that time, functions won't work.
    - Usually, the server sends empty response to such requests, so it's not a problem.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
