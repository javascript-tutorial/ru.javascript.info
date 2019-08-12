
# Fetch

JavaScript может отправлять сетевые запросы на сервер и подгружать новую информацию по мере необходимости.

<<<<<<< HEAD
Например, мы можем использовать сетевой запрос, чтобы:
- Отправить заказ,
- Загрузить информацию о пользователе,
- Запросить последние обновления с сервера,
- ...и т.п.
=======
For example, we can use a network request to:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Для сетевых запросов из JavaScript есть широко известный термин "AJAX" (аббревиатура от <b>A</b>synchronous <b>J</b>avaScript <b>A</b>nd <b>X</b>ML).  XML мы использовать не обязаны, просто термин старый, поэтому в нём есть это слово. Возможно, вы его уже где-то слышали.

Есть несколько способов делать сетевые запросы и получать информацию с сервера.

<<<<<<< HEAD
Метод `fetch()` — современный и очень мощный, поэтому начнём с него. Он не поддерживается старыми (можно использовать полифил), но поддерживается всеми современными браузерами.

Базовый синтаксис:
=======
There's an umbrella term "AJAX" (abbreviated <b>A</b>synchronous <b>J</b>avaScript <b>A</b>nd <b>X</b>ML) for network requests from JavaScript. We don't have to use XML though: the term comes from old times, that's that word is there. You may have heard that term already.

There are multiple ways to send a network request and get information from the server.

The `fetch()` method is modern and versatile, so we'll start with it. It's not supported by old browsers (can be polyfilled), but very well supported among the new ones.

The basic syntax is:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
let promise = fetch(url, [options])
```

- **`url`** -- URL для отправки запроса.
- **`options`** -- дополнительные параметры: метод, заголовки и так далее.

<<<<<<< HEAD
Браузер сразу же начинает запрос и возвращает промис, который внешний код использует для получения результата.
=======
The browser starts the request right away and returns a promise that the calling code should use to get the result.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Процесс получения ответа обычно происходит в два этапа.

**Во-первых, `promise` выполняется с объектом встроенного класса [Response](https://fetch.spec.whatwg.org/#response-class) в качестве результата, как только сервер пришлёт заголовки ответа.**

<<<<<<< HEAD
На этом этапе мы можем проверить статус HTTP-запроса и определить, выполнился ли он успешно, а также посмотреть заголовки, но пока без тела ответа.

Промис завершается с ошибкой, если `fetch` не смог выполнить HTTP-запрос, например при ошибке сети или если нет такого сайта. HTTP-статусы такие как 404 или 500, не являются ошибкой.

Мы можем увидеть HTTP-статус в свойствах ответа:

- **`status`** -- код статуса HTTP-запроса, например 200.
- **`ok`** -- логическое значение: будет `true`, если код HTTP-статуса в диапазоне 200-299.
=======
At this stage we can check HTTP status, to see whether it is successful or not, check headers, but don't have the body yet.

The promise rejects if the `fetch` was unable to make HTTP-request, e.g. network problems, or there's no such site. Abnormal HTTP-statuses, such as 404 or 500 do not cause an error.

We can see HTTP-status in response properties:

- **`status`** -- HTTP status code, e.g. 200.
- **`ok`** -- boolean, `true` if the HTTP status code is 200-299.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Например:

```js
let response = await fetch(url);

<<<<<<< HEAD
if (response.ok) { // если HTTP-статус в диапазоне 200-299
  // получаем тело ответа (см. про этот метод ниже)
=======
if (response.ok) { // if HTTP-status is 200-299
  // get the response body (the method explained below)
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
  let json = await response.json();
} else {
  alert("Ошибка HTTP: " + response.status);
}
```

**Во-вторых, для получения тела ответа нам нужно использовать дополнительный вызов метода.**

`Response` предоставляет несколько методов, основанных на промисах, для доступа к телу ответа в различных форматах:

<<<<<<< HEAD
- **`response.text()`** -- читает ответ и возвращает как обычный текст,
- **`response.json()`** -- декодирует ответ в формате JSON,
- **`response.formData()`** -- возвращает ответ как объект `FormData` (разберём его в [следующей главе](info:formdata)),
- **`response.blob()`** -- возвращает объект как [Blob](info:blob) (бинарные данные с типом),
- **`response.arrayBuffer()`** -- возвращает ответ как [ArrayBuffer](info:arraybuffer-binary-arrays) (низкоуровневое представление бинарных данных),
- помимо этого, `response.body` - это объект [ReadableStream](https://streams.spec.whatwg.org/#rs-class), с помощью которого можно считывать тело запроса по частям. Мы рассмотрим и такой пример несколько позже.
=======
- **`response.text()`** -- read the response and return as text,
- **`response.json()`** -- parse the response as JSON,
- **`response.formData()`** -- return the response as `FormData` object (explained in the [next chapter](info:formdata)),
- **`response.blob()`** -- return the response as [Blob](info:blob) (binary data with type),
- **`response.arrayBuffer()`** -- return the response as [ArrayBuffer](info:arraybuffer-binary-arrays) (low-level representaion of binary data),
- additionally, `response.body` is a [ReadableStream](https://streams.spec.whatwg.org/#rs-class) object, it allows to read the body chunk-by-chunk, we'll see an example later.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Например, получим JSON-объект с последними коммитами из репозитория на GitHub:

```js run async
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);

*!*
let commits = await response.json(); // читаем ответ в формате JSON
*/!*

alert(commits[0].author.login);
```

То же самое без `await`, с использованием промисов:

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

<<<<<<< HEAD
Для получения ответа в виде текста используем `await response.text()` вместо `.json()`:
=======
To get the reponse text, `await response.text()` instead of `.json()`:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); // прочитать тело ответа как текст

alert(text.slice(0, 80) + '...');
```

<<<<<<< HEAD
В качестве примера работы с бинарными данными, давайте запросим и выведем на экран логотип [спецификации "fetch"](https://fetch.spec.whatwg.org) (см. главу [Blob](info:blob), чтобы узнать про операции с `Blob`):
=======
As a show-case for reading in binary format, let's fetch and show a logo image of ["fetch" specification](https://fetch.spec.whatwg.org) (see chapter [Blob](info:blob) for details about operations on `Blob`):
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
let blob = await response.blob(); // скачиваем как Blob-объект
*/!*

// создаём <img>
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

// выводим на экран
img.src = URL.createObjectURL(blob);

setTimeout(() => { // прячем через три секунды
  img.remove();
  URL.revokeObjectURL(img.src);
}, 3000);
```

````warn
<<<<<<< HEAD
Мы можем выбрать только один метод чтения ответа.

Если мы уже получили ответ с `response.text()`, тогда `response.json()` не сработает, так как данные уже были обработаны.
=======
We can choose only one body-reading method.

If we've already got the response with `response.text()`, then `response.json()` won't work, as the body content has already been processed.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
let text = await response.text(); // тело ответа обработано
let parsed = await response.json(); // ошибка (данные уже были обработаны)
````

<<<<<<< HEAD
## Заголовки ответа

Заголовки ответа хранятся в похожем на `Map` объекте `response.headers`.

Это не совсем `Map`, но мы можем использовать такие же методы, как с `Map`, чтобы получить заголовок по его имени или перебрать заголовки в цикле:
=======
## Response headers

The response headers are available in a Map-like headers object in `response.headers`.

It's not exactly a Map, but it has similar methods to get individual headers by name or iterate over them:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// получить один заголовок
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// перебрать все заголовки
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

<<<<<<< HEAD
## Заголовки запроса

Для установки заголовка запроса в `fetch` мы можем использовать опцию `headers`. Она содержит объект с исходящими заголовками, например:
=======
## Request headers

To set a request header in `fetch`, we can use the `headers` option. It has an object with outgoing headers, like this:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'secret'
  }
});
```

Есть список [запрещённых HTTP-заголовков](https://fetch.spec.whatwg.org/#forbidden-header-name), которые мы не можем установить:

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

Эти заголовки обеспечивают достоверность данных и корректную работу протокола HTTP, поэтому они контролируются исключительно браузером.

## POST-запросы

Для отправки `POST`-запроса или запроса с другим методом, нам необходимо использовать `fetch` параметры:

- **`method`** -- HTTP метод, например `POST`,
- **`body`** -- тело запроса, одно из списка:
  - строка (например, в формате JSON),
  - объект `FormData` для отправки данных как `form/multipart`,
  - `Blob`/`BufferSource` для отправки бинарных данных,
  - [URLSearchParams](info:url) для отправки данных в кодировке `x-www-form-urlencoded`, используется  редко.

<<<<<<< HEAD
Чаще всего используется JSON.

Например, этот код отправляет объект `user` как JSON:
=======
- **`method`** -- HTTP-method, e.g. `POST`,
- **`body`** -- the request body, one of:
  - a string (e.g. JSON-encoded),
  - `FormData` object, to submit the data as `form/multipart`,
  - `Blob`/`BufferSource` to send binary data,
  - [URLSearchParams](info:url), to submit the data in `x-www-form-urlencoded` encoding, rarely used.

The JSON format is used most of the time.

For example, this code submits `user` object as JSON:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js run async
let user = {
  name: 'John',
  surname: 'Smith'
};

*!*
let response = await fetch('/article/fetch/post/user', {
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

<<<<<<< HEAD
Заметим, что так как тело запроса `body` - строка, то заголовок `Content-Type` по умолчанию будет `text/plain;charset=UTF-8`.

Но, так как мы посылаем JSON, то используем параметр `headers` для отправки вместо этого `application/json`, правильный `Content-Type` для JSON.
=======
Please note, if the request `body` is a string, then `Content-Type` header is set to `text/plain;charset=UTF-8` by default.

But, as we're going to send JSON, we use `headers` option to send `application/json` instead, the correct `Content-Type` for JSON-encoded data.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

## Отправка изображения

<<<<<<< HEAD
Мы можем отправить бинарные данные при помощи `fetch`, используя объекты `Blob` или `BufferSource`.

В этом примере есть элемент `<canvas>`, на котором мы можем рисовать движением мыши. При нажатии на кнопку "Отправить" изображение отправляется на сервер:
=======
We can also submit binary data with `fetch` using `Blob` or `BufferSource` objects.

In this example, there's a `<canvas>` where we can draw by moving a mouse over it. A click on the "submit" button sends the image to server:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Отправить" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

<<<<<<< HEAD
      // сервер ответит подтверждением и размером изображения
=======
      // the server responds with confirmation and the image size
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

<<<<<<< HEAD
Заметим, что здесь нам не нужно вручную устанавливать заголовок `Content-Type`, потому что объект `Blob` имеет встроенный тип (`image/png`, заданный в `toBlob`). При отправке объектов `Blob` он автоматически становится значением `Content-Type`.
=======
Please note, here we don't set `Content-Type` header manually, because a `Blob` object has a built-in type (here `image/png`, as generated by `toBlob`). For `Blob` objects that type becomes the value of `Content-Type`.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Функция `submit()` может быть переписана без `async/await`, например, так:

```js
function submit() {
  canvasElem.toBlob(function(blob) {        
    fetch('/article/fetch/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
```

## Итого

Типичный запрос с помощью `fetch` состоит из двух операторов `await`:

```js
let response = await fetch(url, options); // завершается с заголовками ответа
let result = await response.json(); // читать тело ответа в формате JSON
```

<<<<<<< HEAD
Или, без `await`:
=======
Or, without `await`:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* обрабатываем результат */)
```

Параметры ответа:
- `response.status` -- HTTP-код ответа,
- `response.ok` -- `true`, если статус ответа в диапазоне 200-299.
- `response.headers` -- похожий на `Map` объект с HTTP-заголовками.

<<<<<<< HEAD
Методы для получения тела ответа:
- **`response.text()`** -- возвращает ответ как обычный текст,
- **`response.json()`** -- преобразовывает ответ в JSON-объект,
- **`response.formData()`** -- возвращает ответ как объект FormData (кодировка form/multipart, см. следующую главу),
- **`response.blob()`** -- возвращает объект как [Blob](info:blob) (бинарные данные с типом),
- **`response.arrayBuffer()`** -- возвращает ответ как [ArrayBuffer](info:arraybuffer-binary-arrays) (низкоуровневые бинарные данные),

Опции `fetch`, которые мы изучили на данный момент:
- `method` -- HTTP-метод,
- `headers` -- объект с запрашиваемыми заголовками (не все заголовки разрешены),
- `body` -- данные для отправки (тело запроса) в виде текста, `FormData`, `BufferSource`, `Blob` или `UrlSearchParams`.
=======
Methods to get response body:
- **`response.text()`** -- return the response as text,
- **`response.json()`** -- parse the response as JSON object,
- **`response.formData()`** -- return the response as `FormData` object (form/multipart encoding, see the next chapter),
- **`response.blob()`** -- return the response as [Blob](info:blob) (binary data with type),
- **`response.arrayBuffer()`** -- return the response as [ArrayBuffer](info:arraybuffer-binary-arrays) (low-level binary data),

Fetch options so far:
- `method` -- HTTP-method,
- `headers` -- an object with request headers (not any header is allowed),
- `body` -- the data to send (request body) as `string`, `FormData`, `BufferSource`, `Blob` or `UrlSearchParams` object.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

В следующих главах мы рассмотрим больше параметров и вариантов использования `fetch`.
