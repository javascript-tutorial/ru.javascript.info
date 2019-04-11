
# Fetch: Основы

Метод `fetch()` это современный метод отправки HTTP запросов.

На протяжении нескольких лет метод постоянно развивался и до сих пор продолжает улучшаться. В настоящее время его поддерживают все современный браузеры.

Базовый синтакс:

```js
let promise = fetch(url, [options])
```

- **`url`** -- URL для отправки запроса.
- **`options`** -- дополнительный параметры: метод, заголовки и так далее.

Браузер сразу же начинает запрос и возвращает `promise`.

Процесс получения ответа обычно происходит в два этапа.

**`promise` выполняется со встроенный объектом класса [Response](https://fetch.spec.whatwg.org/#response-class) как только сервер отправляет ответ с заголовками.**

Таким образом, мы можем проверить HTTP статус, чтобы увидеть, является ли он успешным или нет, проверить заголовки, но пока без тела ответа.

Промис завершается с ошибкой если `fetch` не смог выполнить HTTP запрос, например при ошибке сети, или при отсутствии запрашиваемого ресурса. HTTP ошибки, такие как 404 или 500 считаются стандартной частью процесса.

Мы можем увидеть их в свойствах ответа:

- **`ok`** -- логическая переменная, `true` при HTTP коде состояния 200-299.
- **`status`** -- HTTP код состояния.

Например:

```js
let response = await fetch(url);

if (response.ok) { // if HTTP-status is 200-299
  // get the response body (see below)
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
```

Для получения тела ответа нам нужно использовать дополнительный вызов метода.

`Response` предоставляет несколько методов основанных на промисах для доступа к телу ответа в различных форматах:

- **`response.json()`** -- приобразовать ответ в JSON объект,
- **`response.text()`** -- вернуть ответ как обычный текст,
- **`response.formData()`** -- вернуть ответ как объект FormData (кодировка form/multipart),
- **`response.blob()`** -- возвращает объект как [Blob](info:blob) (бинарные данные с типом),
- **`response.arrayBuffer()`** -- возвращает ответ как [ArrayBuffer](info:arraybuffer-binary-arrays) (простейшие бинарные данные),
- в дополнение, `response.body` это объект [ReadableStream](https://streams.spec.whatwg.org/#rs-class), который дает возможность считываеть тело по частям. Мы рассмотрим пример позже.

Например, у нас есть JSON объект с последними Github коммитами:

```js run async
let response = await fetch('https://api.github.com/repos/iliakan/javascript-tutorial-en/commits');

*!*
let commits = await response.json(); // получаем тело ответа и преобразовываем в JSON
*/!*

alert(commits[0].author.login);
```

Или пример с использованием промисов:

```js run
fetch('https://api.github.com/repos/iliakan/javascript-tutorial-en/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

Для получения текста:
```js
let text = await response.text();
```
И для примера работы с бинарными данными, давайте запросим и выведем на экран картинку (см. главу [Blob](info:blob) чтобы узнать детали реализации)

```js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
let blob = await response.blob(); // скачать как Blob объект
*/!*

// создадим <img>
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

// выводим на экран
img.src = URL.createObjectURL(blob);

setTimeout(() => { // прячем через две секунды
  img.remove();
  URL.revokeObjectURL(img.src);
}, 2000);
```

````warn
Мы можем выбрать только один метод преобразования.

If we got the response with `response.text()`, then `response.json()` won't work, as the body content has already been processed.

Если мы получили ответ с `response.text()`, тогда `response.json()` не сработает, так как данные уже были обработаны.

```js
let text = await response.text(); // тело ответа преобразовано
let parsed = await response.json(); // ошибка (данные уже были преобразованы)
````

## Headers

There's a Map-like headers object in `response.headers`.

We can get individual headers or iterate over them:

```js run async
let response = await fetch('https://api.github.com/repos/iliakan/javascript-tutorial-en/commits');

// get one header
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// iterate over all headers
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

To set a header, we can use the `headers` option, like this:

```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'abcdef'
  }
});
```

...But there's a list of [forbidden HTTP headers](https://fetch.spec.whatwg.org/#forbidden-header-name) that we can't set:

- `Accept-Charset`, `Accept-Encoding`
- `Access-Control-Request-Headers`
- `Access-Control-Request-Method`
- `Connection`
- `Content-Length`
- `Cookie`, `Cookie2`
- `Date`
- `DNT`
- `Expect`
- `Host`
- `Keep-Alive`
- `Origin`
- `Referer`
- `TE`
- `Trailer`
- `Transfer-Encoding`
- `Upgrade`
- `Via`
- `Proxy-*`
- `Sec-*`

These headers ensure proper and safe HTTP, so they are controlled exclusively by the browser.

## POST requests

To make a `POST` request, or a request with another method, we need to use `fetch` options:

- **`method`** -- HTTP-method, e.g. `POST`,
- **`body`** -- one of:
  - a string (e.g. JSON),
  - `FormData` object, to submit the data as `form/multipart`,
  - `Blob`/`BufferSource` to send binary data,
  - [URLSearchParams](info:url), to submit the data as `x-www-form-urlencoded`, rarely used.

Let's see examples.

## Submit JSON

This code submits a `user` object as JSON:

```js run async
let user = {
  name: 'John',
  surname: 'Smith'
};

*!*
let response = await fetch('/article/fetch-basics/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});
*/!*

let result = await response.json();
alert(result.message);
```

Please note, if the body is a string, then `Content-Type` is set to `text/plain;charset=UTF-8` by default. So we use `headers` option to send `application/json` instead.

## Submit a form

Let's do the same with an HTML `<form>`.


```html run
<form id="formElem">
  <input type="text" name="name" value="John">
  <input type="text" name="surname" value="Smith">
</form>

<script>
(async () => {
  let response = await fetch('/article/fetch-basics/post/user', {
    method: 'POST',
*!*
    body: new FormData(formElem)
*/!*
  });

  let result = await response.json();

  alert(result.message);
})();
</script>
```

Here [FormData](https://xhr.spec.whatwg.org/#formdata) automatically encodes the form, `<input type="file">` fields are handled also, and sends it using `Content-Type: form/multipart`.

## Submit an image

We can also submit binary data directly using `Blob` or `BufferSource`.

For example, here's a `<canvas>` where we can draw by moving a mouse. A click on the "submit" button sends the image to server:

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch-basics/post/image', {
        method: 'POST',
        body: blob
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

Here we also didn't need to set `Content-Type` manually, because a `Blob` object has a built-in type (here `image/png`, as generated by `toBlob`).

The `submit()` function can be rewritten without `async/await` like this:

```js
function submit() {
  canvasElem.toBlob(function(blob) {        
    fetch('/article/fetch-basics/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
```

## Custom FormData with image

In practice though, it's often more convenient to send an image as a part of the form, with additional fields, such as "name" and other metadata.

Also, servers are usually more suited to accept multipart-encoded forms, rather than raw binary data.

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

*!*
      let formData = new FormData();
      formData.append("name", "myImage");
      formData.append("image", blob);
*/!*    

      let response = await fetch('/article/fetch-basics/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

Now, from the server standpoint, the image is a "file" in the form.

## Summary

A typical fetch request consists of two `awaits`:

```js
let response = await fetch(url, options); // resolves with response headers
let result = await response.json(); // read body as json
```

Or, promise-style:
```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* process result */)
```

Response properties:
- `response.status` -- HTTP code of the response,
- `response.ok` -- `true` is the status is 200-299.
- `response.headers` -- Map-like object with HTTP headers.

Methods to get response body:
- **`response.json()`** -- parse the response as JSON object,
- **`response.text()`** -- return the response as text,
- **`response.formData()`** -- return the response as FormData object (form/multipart encoding),
- **`response.blob()`** -- return the response as [Blob](info:blob) (binary data with type),
- **`response.arrayBuffer()`** -- return the response as [ArrayBuffer](info:arraybuffer-binary-arrays) (pure binary data),

Fetch options so far:
- `method` -- HTTP-method,
- `headers` -- an object with request headers (not any header is allowed),
- `body` -- string/FormData/BufferSource/Blob/UrlSearchParams data to submit.

In the next chapters we'll see more options and use cases.
