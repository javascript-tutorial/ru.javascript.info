# Fetch API

На данный момент мы уже многое знаем про `fetch`.

Давайте рассмотрим оставшуюся часть API, чтобы охватить все возможности.

```smart
Заметим: большинство этих возможностей используются редко. Вы можете пропустить эту главу и, несмотря на это, нормально использовать `fetch`.

Тем не менее, полезно знать, что вообще может `fetch`, чтобы, когда появится необходимость, вернуться и прочитать конкретные детали.
```

Нижеследующий список - это все возможные опции для `fetch` с соответствующими значениями по умолчанию (в комментариях указаны альтернативные значения):

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    // значение этого заголовка обычно ставится автоматически,
    // в зависимости от тела запроса
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string, FormData, Blob, BufferSource или URLSearchParams
  referrer: "about:client", // или "" для того, чтобы не послать заголовок Referer,
  // или URL с текущего источника
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

## referrer, referrerPolicy

Данные опции определяют, как `fetch` устанавливает HTTP-заголовок `Referer`.
=======
Now let's explore the remaining capabilities.

## referrer, referrerPolicy

These options govern how `fetch` sets the HTTP `Referer` header.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Обычно этот заголовок ставится автоматически и содержит URL-адрес страницы, с которой пришёл запрос. В большинстве случаев он совсем неважен, в некоторых случаях, с целью большей безопасности, имеет смысл убрать или укоротить его.

<<<<<<< HEAD
**Опция `referrer` позволяет установить любой `Referer` в пределах текущего источника или же убрать его.**
=======
**The `referrer` option allows to set any `Referer` (within the current origin) or remove it.**
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
В отличие от настройки `referrer`, которая позволяет задать точное значение `Referer`, настройка `referrerPolicy` сообщает браузеру общие правила, что делать для каждого типа запроса.
=======
Unlike the `referrer` option that allows to set the exact `Referer` value, `referrerPolicy` tells the browser general rules for each request type.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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
=======
- **`"no-referrer-when-downgrade"`** -- the default value: full `Referer` is always sent, unless we send a request from HTTPS to HTTP (to the less secure protocol).
- **`"no-referrer"`** -- never send `Referer`.
- **`"origin"`** -- only send the origin in `Referer`, not the full page URL, e.g. only `http://site.com` instead of `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- send the full `Referer` to the same origin, but only the origin part for cross-origin requests (as above).
- **`"same-origin"`** -- send the full `Referer` to the same origin, but no `Referer` for cross-origin requests.
- **`"strict-origin"`** -- send only the origin, not the `Referer` for HTTPS→HTTP requests.
- **`"strict-origin-when-cross-origin"`** -- for same-origin send the full `Referer`, for cross-origin send only the origin, unless it's HTTPS→HTTP request, then send nothing.
- **`"unsafe-url"`** -- always send the full url in `Referer`, even for HTTPS→HTTP requests.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Вот таблица со всеми комбинациями:

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
Let's say we have an admin zone with a URL structure that shouldn't be known from outside of the site.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Если мы отправляем запрос `fetch`, то по умолчанию он всегда отправляет заголовок `Referer` с полным URL-адресом нашей админки (исключение - это когда мы делаем запрос от HTTPS в HTTP, в таком случае `Referer` не будет отправляться).

Например, `Referer: https://javascript.info/admin/secret/paths`.

<<<<<<< HEAD
Если мы хотим, чтобы другие сайты получали только источник, но не URL-путь, это сделает такая настройка:
=======
If we'd like other websites know only the origin part, not the URL-path, we can set the option:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
fetch('https://another.com/page', {
  // ...
  referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
});
```

Мы можем поставить её во все вызовы `fetch`, возможно, интегрировать в JavaScript-библиотеку нашего проекта, которая делает все запросы и внутри использует `fetch`.

Единственным отличием в поведении будет то, что для всех запросов на другой источник `fetch` будет посылать только источник в заголовке `Referer` (например, `https://javascript.info`, без пути). А для запросов на наш источник мы продолжим получать полный `Referer` (это может быть полезно для отладки).

```smart header="Политика установки Referer (Referrer Policy) - не только для `fetch`"
Политика установки Referer, описанная в [спецификации Referrer Policy](https://w3c.github.io/webappsec-referrer-policy/), существует не только для `fetch`, она более глобальная.

<<<<<<< HEAD
В частности, можно поставить политику по умолчанию для всей страницы, используя HTTP-заголовок `Referrer-Policy`, или на уровне ссылки `<a rel="noreferrer">`.
=======
In particular, it's possible to set the default policy for the whole page using the `Referrer-Policy` HTTP header, or per-link, with `<a rel="noreferrer">`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

## mode

Опция `mode` - это защита от нечаянной отправки запроса на другой источник:

<<<<<<< HEAD
- **`"cors"`** -- стоит по умолчанию, позволяет делать такие запросы так, как описано в <info:fetch-crossorigin>,
- **`"same-origin"`** -- запросы на другой источник запрещены,
- **`"no-cors"`** -- разрешены только простые запросы на другой источник.
=======
- **`"cors"`** -- the default, cross-origin requests are allowed, as described in <info:fetch-crossorigin>,
- **`"same-origin"`** -- cross-origin requests are forbidden,
- **`"no-cors"`** -- only safe cross-origin requests are allowed.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Эта опция может пригодиться, если URL-адрес для `fetch` приходит от третьей стороны, и нам нужен своего рода "глобальный выключатель" для запросов на другие источники.

## credentials

Опция `credentials` указывает, должен ли `fetch` отправлять куки и авторизационные заголовки HTTP вместе с запросом.

- **`"same-origin"`** -- стоит по умолчанию, не отправлять для запросов на другой источник,
- **`"include"`** -- отправлять всегда, но при этом необходим заголовок `Access-Control-Allow-Credentials` в ответе от сервера, чтобы JavaScript получил доступ к ответу сервера, об этом говорилось в главе <info:fetch-crossorigin>,
- **`"omit"`** -- не отправлять ни при каких обстоятельствах, даже для запросов, сделанных в пределах текущего источника.

## cache

<<<<<<< HEAD
По умолчанию `fetch` делает запросы, используя стандартное HTTP-кеширование. То есть, учитывается заголовки `Expires`, `Cache-Control`, отправляется `If-Modified-Since` и так далее. Так же, как и обычные HTTP-запросы.
=======
By default, `fetch` requests make use of standard HTTP-caching. That is, it respects the `Expires` and `Cache-Control` headers, sends `If-Modified-Since` and so on. Just like regular HTTP-requests do.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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
- **`"reload"`** -- don't take the result from HTTP-cache (if any), but populate the cache with the response (if the response headers permit this action),
- **`"no-cache"`** -- create a conditional request if there is a cached response, and a normal request otherwise. Populate HTTP-cache with the response,
- **`"force-cache"`** -- use a response from HTTP-cache, even if it's stale. If there's no response in HTTP-cache, make a regular HTTP-request, behave normally,
- **`"only-if-cached"`** -- use a response from HTTP-cache, even if it's stale. If there's no response in HTTP-cache, then error. Only works when `mode` is `"same-origin"`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## redirect

Обычно `fetch` прозрачно следует HTTP-редиректам, таким как 301, 302 и так далее.

Это можно поменять при помощи опции `redirect`:

<<<<<<< HEAD
- **`"follow"`** -- стоит по умолчанию, следовать HTTP-редиректам,
- **`"error"`** -- ошибка в случае HTTP-редиректа,
- **`"manual"`** -- не следовать HTTP-редиректу, но установить адрес редиректа в `response.url`, а `response.redirected` будет иметь значение `true`, чтобы мы могли сделать перенаправление на новый адрес вручную.
=======
- **`"follow"`** -- the default, follow HTTP-redirects,
- **`"error"`** -- error in case of HTTP-redirect,
- **`"manual"`** -- allows to process HTTP-redirects manually. In case of redirect, we'll get a special response object, with `response.type="opaqueredirect"` and zeroed/empty status and most other properies.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## integrity

Опция `integrity` позволяет проверить, соответствует ли ответ известной заранее контрольной сумме.

<<<<<<< HEAD
Как описано в [спецификации](https://w3c.github.io/webappsec-subresource-integrity/), поддерживаемыми хеш-функциями являются SHA-256, SHA-384 и SHA-512. В зависимости от браузера, могут быть и другие.
=======
As described in the [specification](https://w3c.github.io/webappsec-subresource-integrity/), supported hash-functions are SHA-256, SHA-384, and SHA-512, there might be others depending on the browser.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Например, мы скачиваем файл, и мы точно знаем, что его контрольная сумма по алгоритму SHA-256 равна "abcdef" (разумеется, настоящая контрольная сумма будет длиннее).

Мы можем добавить это в настройку `integrity` вот так:

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

Затем `fetch` самостоятельно вычислит SHA-256 и сравнит его с нашей строкой. В случае несоответствия будет ошибка.

## keepalive

Опция `keepalive` указывает на то, что запрос может "пережить" страницу, которая его отправила.

<<<<<<< HEAD
Например, мы собираем статистические данные о том, как посетитель ведёт себя на нашей странице (на что он кликает, части страницы, которые он просматривает), для анализа и улучшения интерфейса.

Когда посетитель покидает нашу страницу - мы хотим сохранить собранные данные на нашем сервере.

Для этого мы можем использовать событие `window.onunload`:
=======
For example, we gather statistics on how the current visitor uses our page (mouse clicks, page fragments he views), to analyze and improve the user experience.

When the visitor leaves our page -- we'd like to save the data to our server.

We can use the `window.onunload` event for that:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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
Normally, when a document is unloaded, all associated network requests are aborted. But the `keepalive` option tells the browser to perform the request in the background, even after it leaves the page. So this option is essential for our request to succeed.

It has a few limitations:

- We can't send megabytes: the body limit for `keepalive` requests is 64KB.
    - If we need to gather a lot of statistics about the visit, we should send it out regularly in packets, so that there won't be a lot left for the last `onunload` request.
    - This limit applies to all `keepalive` requests together. In other words, we can perform multiple `keepalive` requests in parallel, but the sum of their body lengths should not exceed 64KB.
- We can't handle the server response if the document is unloaded. So in our example `fetch` will succeed due to `keepalive`, but subsequent functions won't work.
    - In most cases, such as sending out statistics, it's not a problem, as the server just accepts the data and usually sends an empty response to such requests.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
