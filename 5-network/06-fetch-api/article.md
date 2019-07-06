# Fetch API

<<<<<<< HEAD:5-network/05-fetch-api/article.md
На данный момент мы уже многое знаем про `fetch`.
=======
So far, we know quite a bit about `fetch`.
>>>>>>> master:5-network/06-fetch-api/article.md

Теперь давайте рассмотрим оставшуюся часть API, чтобы охватить все его возможности.

<<<<<<< HEAD:5-network/05-fetch-api/article.md
Нижеследующий список - это все возможные опции для `fetch` с соответствующими значениями по умолчанию (в комментариях указаны альтернативные значения):
=======
Here's the full list of all possible `fetch` options with their default values (alternatives in comments):
>>>>>>> master:5-network/06-fetch-api/article.md

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
<<<<<<< HEAD:5-network/05-fetch-api/article.md
    "Content-Type": "text/plain;charset=UTF-8" // значение этого заголовка обычно ставится автоматически, в зависимости от тела запроса
  },
  body: undefined // string, FormData, Blob, BufferSource или URLSearchParams
  referrer: "about:client", // referrer: "about:client", // или "" для того, чтобы не послать заголовок Referer, или URL с текущего источника
=======
    // the content type header value is usually auto-set depending on the request body
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string, FormData, Blob, BufferSource, or URLSearchParams
  referrer: "about:client", // or "" to send no Referer header, or an url from the current origin
>>>>>>> master:5-network/06-fetch-api/article.md
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

<<<<<<< HEAD:5-network/05-fetch-api/article.md
В главе <info:fetch-basics> мы полностью охватили охватили параметры `method`, `headers` и `body`.
=======
We fully covered `method`, `headers` and `body` in the chapter <info:fetch>.
>>>>>>> master:5-network/06-fetch-api/article.md

Опцию `signal` разъяснена в главе в <info:fetch-abort>.

Теперь давайте пройдёмся по оставшимся опциям.

## referrer, referrerPolicy

Данные опции определяют, как `fetch` устанавливает HTTP-заголовок `Referer`.

<<<<<<< HEAD:5-network/05-fetch-api/article.md
В заголовке указывается URL-адрес страницы, с которой пришёл запрос. В большинстве случаев он играет совсем небольшую роль, однако в некоторых случаях, с целью большей безопасности, имеет смысл убрать или укоротить его.
=======
That header contains the url of the page that made the request. In most scenarios, it plays a very minor informational role, but sometimes, for security purposes, it makes sense to remove or shorten it.
>>>>>>> master:5-network/06-fetch-api/article.md

**Опция `referrer` позволяет установить любой` Referer` в пределах текущего источника или же отключить его.**

Чтобы не отправлять Referer, нужно указать значением пустую строку:
```js
fetch('/page', {
*!*
  referrer: "" // отсутствует Referer заголовок
*/!*
});
```

Для того, чтобы установить другой URL-адрес для текущего источника:

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

Возможные значения описаны в [спецификации Referrer Policy](https://w3c.github.io/webappsec-referrer-policy/):

<<<<<<< HEAD:5-network/05-fetch-api/article.md
- **`"no-referrer-when-downgrade"`** -- значение по умолчанию: `Referer` отправляется всегда, если только мы не отправим запрос из HTTPS в HTTP (из более безопасного протокола в менее безопасный).
- **`"no-referrer"`** -- никогда не отправлять `Referer`.
- **`"origin"`** -- отправлять в `Referer` только текущий источник, а не полный URL-адрес страницы, например, послать `http://site.com` вместо `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- отправлять полный Referer для запросов в пределах текущего источника, но для кроссдоменных запросов отправлять только само значение источника
- **`"same-origin"`** -- отправлять полный Referer для запросов в пределах текущего источника, а для кроссдоменных запросов не отправлять referer вообще.
- **`"strict-origin"`** -- отправлять только значение источника, не отправлять Referer для HTTPS→HTTP запросов.
- **`"strict-origin-when-cross-origin"`** -- для запросов в пределах текущего источника отправлять полный Referer, для кроссдоменных запросов отправлять только значение источника, в случае HTTPS→HTTP запросов не отправлять ничего. 
- **`"unsafe-url"`** -- всегда отправлять полный URL-адрес в `Referer`.

Допустим, у нас есть админка со структурой URL, которая не должна стать известной снаружи сайта.
=======
- **`"no-referrer-when-downgrade"`** -- default value: `Referer` is sent always, unless we send a request from HTTPS to HTTP (to less secure protocol).
- **`"no-referrer"`** -- never send `Referer`.
- **`"origin"`** -- only send the origin in `Referer`, not the full page URL, e.g. `http://site.com` instead of `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- send full `Referer` to the same origin, but only the origin part for cross-origin requests.
- **`"same-origin"`** -- send full `Referer` to the same origin, but no referer for for cross-origin requests.
- **`"strict-origin"`** -- send only origin, don't send `Referer` for HTTPS→HTTP requests.
- **`"strict-origin-when-cross-origin"`** -- for same-origin send full `Referer`, for cross-origin send only origin, unless it's HTTPS→HTTP request, then send nothing.
- **`"unsafe-url"`** -- always send full url in `Referer`.

Let's say we have an admin zone with URL structure that shouldn't be known from outside of the site.
>>>>>>> master:5-network/06-fetch-api/article.md

Если мы отправляем кроссдоменный запрос `fetch`, то по умолчанию он отправит заголовок `Referer` с полным URL-адресом нашей админки (исключение - это когда мы делаем запрос от HTTPS в HTTP, в таком случае `Referer` не будет отправляться).

Например, `Referer: https://javascript.info/admin/secret/paths`.

Если же мы хотим полностью скрыть его:

```js
fetch('https://another.com/page', {
  referrerPolicy: "no-referrer" // не посылать Referer - даёт такой же результат, как и referrer: ""
});
```

<<<<<<< HEAD:5-network/05-fetch-api/article.md
Или же, если мы хотим, чтобы удалённая сторона знала домен, откуда поступает запрос, но не полный URL, мы можем отправить только источник:
=======
Otherwise, if we'd like the remote side to see only the domain where the request comes from, but not the full URL, we can send only the "origin" part of it:
>>>>>>> master:5-network/06-fetch-api/article.md

```js
fetch('https://another.com/page', {
  referrerPolicy: "strict-origin" // Referer: https://javascript.info
});
```

## mode

Опция `mode` - это надёжная защита от кроссдоменных запросов:

- **`"cors"`** -- стоит по умолчанию, позволяет делать кроссдоменные запросы так, как описано в <info:fetch-crossorigin>,
- **`"same-origin"`** -- кроссдоменные запросы запрещены,
- **`"no-cors"`** -- разрешены только простые кроссдоменные запросы.

Это может пригодиться, если URL-адрес для fetch приходит от третьего лица, и нам нужно что-то, чтобы контролировать ограничение кроссдоменных возможностей - эдакий "выключатель".

## credentials

Опция `credentials` может указывать, должен ли `fetch` отправлять cookies и аутентификационные заголовки HTTP вместе с запросом.

- **`"same-origin"`** -- стоит по умолчанию, не отправлять для кроссдоменных запросов,
- **`"include"`** -- отправлять всегда, но при этом необходимы `Access-Control-Allow-Credentials` заголовки в ответе от кроссдоменного сервера,
- **`"omit"`** -- не отправлять ни при каких обстоятельствах, даже для запросов, сделанных в пределах текущего источника.

## Кеш

По умолчанию `fetch` делает запросы, используя стандартный HTTP-кешинг. То есть, он учитывает заголовки `Expires`, `Cache-Control`, отправляет `If-Modified-Since` и так далее. Так же, как и обычные HTTP-запросы.

Опция `cache` позволяет игнорировать HTTP-кеш или же настроить его использование:

- **`"default"`** -- `fetch` будет использовать стандартные правила и заголовки HTTP кеширования;
- **`"no-store"`** -- полностью игнорировать HTTP-кеш, этот режим становится режимом по умолчанию, если присутствуют такие заголовки как `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, или `If-Range`;
- **`"reload"`** -- не брать результат из HTTP-кеша (даже при его присутствии), но сохранить ответ в кеше (если это дозволено заголовками ответа);
- **`"no-cache"`** -- в случае, если существует кешированный ответ - создать условный запрос, в противном же случае - обычный запрос. Сохранить ответ в  HTTP-кеше;
- **`"force-cache"`** -- использовать ответ из HTTP-кеша, даже если он устаревший. Если же ответ в HTTP-кеше отсутствует, сделать обычный HTTP-запрос, действовать как обычно;
- **`"only-if-cached"`** -- использовать ответ из HTTP-кеша, даже если он устаревший. Если же ответ в HTTP-кеше отсутствует, тогда выдаётся ошибка. Это работает, только когда `mode` установлен в `"same-origin"`.

## Перенаправление

Обычно `fetch` следует таким HTTP-перенаправлениям, как 301, 302 и так далее.

Это можно поменять при помощи опции `redirect`:

- **`"follow"`** -- стоит по умолчанию, следовать HTTP-перенаправлениям,
- **`"error"`** -- ошибка в случае HTTP-перенаправления,
- **`"manual"`** -- не следовать HTTP-перенаправлению, но установить адрес перенаправления в `response.url`, а `response.redirected` будет иметь значение `true`, чтобы мы могли сделать перенаправление на новый адрес вручную.

## integrity

Опция `integrity` позволяет проверить, соответствует ли ответ известной заранее контрольной сумме.

Как описано в [спецификации] (https://w3c.github.io/webappsec-subresource-integrity/), поддерживаемыми хеш-функциями являются SHA-256, SHA-384 и SHA-512. В зависимости от браузера, могут быть и другие.

Например, мы скачиваем файл, и мы точно знаем, что контрольная сумма его SHA-256 равна "abc" (разумеется, настоящая контрольная сумма будет длиннее).

Мы можем добавить это в опцию `integrity` вот так:

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abd'
});
```

Затем `fetch` самостоятельно вычислит SHA-256 и сравнит его с нашей строкой. В случае несоответствия срабатывает ошибка.

## keepalive

Опция `keepalive` указывает на то, что запрос может пережить страницу.

Например, для улучшения опыта взаимодействия мы собираем статистические данные о том, как посетитель ведёт себя на нашей странице (на что он кликает, части страницы, которые он просматривает).

Когда посетитель покидает нашу страницу - мы хотим сохранить это на нашем сервере.

Для этого мы можем использовать `window.onunload`:

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

Обычно, когда документ выгружен, все связанные с ним сетевые запросы прерываются. Но опция `keepalive` указывает браузеру выполнять запрос в фоновом режиме даже после того, как пользователь покидает страницу. Поэтому важно, чтобы наш запрос был успешным.

- Мы не можем посылать мегабайты: лимит тела для запроса с keepalive - 64Кбайт.
    - Если мы собрали достаточно данных, мы можем отправлять их регулярно, и это не будет большой нагрузкой для запроса при "onunload".
    - Этот лимит распространяется на все текущие запросы. Однако, мы можем обойти это правило, послав 100 запросов одновременно - каждый по 64Кбайт.
- Мы не получим ответ от сервера, если запрос сделан при `onunload`: так как в тот момент документ уже выгружен.
    - Обычно сервер посылает пустой ответ на такие запросы, так что это не является проблемой.
