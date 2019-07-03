
<<<<<<< HEAD:5-network/01-fetch-basics/article.md
# Fetch: Основы

Метод `fetch()` — это современный метод отправки HTTP-запросов.

На протяжении нескольких лет метод постоянно развивался и до сих пор продолжает улучшаться. В настоящее время его поддерживают все современные браузеры.
=======
# Fetch

JavaScript can send network requests to the server and load new information whenever is needed.

For example, we can:

- Submit an order,
- Load user information,
- Receive latest updates from the server,
- ...etc.

...And all of that without reloading the page!

There's an umbrella term "AJAX" (abbreviated <b>A</b>synchronous <b>J</b>avascript <b>A</b>nd <b>X</b>ml) for that. We don't have to use XML though: the term comes from old times, that's why it's here.

There are multiple ways to send a network request and get information from the server.

The `fetch()` method is modern and versatile, so we'll start with it. It evolved for several years and continues to improve, right now the support is pretty solid among browsers.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/01-fetch/article.md

Базовый синтаксис:

```js
let promise = fetch(url, [options])
```

- **`url`** -- URL для отправки запроса.
- **`options`** -- дополнительные параметры: метод, заголовки и так далее.

Браузер сразу же начинает запрос и возвращает `promise`.

Процесс получения ответа обычно происходит в два этапа.

<<<<<<< HEAD:5-network/01-fetch-basics/article.md
**Результатом `promise` является объект встроенного класса [Response](https://fetch.spec.whatwg.org/#response-class), он появляется, как только сервер пришлёт заголовки ответа.**
=======
**First, the `promise` resolves with an object of the built-in [Response](https://fetch.spec.whatwg.org/#response-class) class as soon as the server responds with headers.**
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/01-fetch/article.md

Таким образом, можно проверить статус HTTP-запроса и определить, выполнился ли он успешно, а также посмотреть заголовки, но пока без тела ответа.

Промис завершается с ошибкой, если `fetch` не смог выполнить HTTP-запрос, например при ошибке сети или если нет такого сайта. HTTP-ошибки, такие как 404 или 500, считаются стандартной частью процесса.

Мы можем увидеть их в свойствах ответа:

- **`ok`** -- логическое значение: будет `true`, если код HTTP-статуса в диапазоне 200-299.
- **`status`** -- код статуса HTTP-запроса.

Например:

```js
let response = await fetch(url);

if (response.ok) { // если код HTTP-состояния в пределах 200-299
  // получаем тело ответа (см. ниже)
  let json = await response.json();
} else {
  alert("Ошибка HTTP: " + response.status);
}
```

<<<<<<< HEAD:5-network/01-fetch-basics/article.md
Для получения тела ответа нам нужно использовать дополнительный вызов метода.
=======
**Second, to get the response body, we need to use an additional method call.**
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/01-fetch/article.md

`Response` предоставляет несколько методов, основанных на промисах, для доступа к телу ответа в различных форматах:

<<<<<<< HEAD:5-network/01-fetch-basics/article.md
- **`response.json()`** -- преобразовывает ответ в JSON-объект,
- **`response.text()`** -- возвращает ответ как обычный текст,
- **`response.formData()`** -- возвращает ответ как объект FormData,
- **`response.blob()`** -- возвращает объект как [Blob](info:blob) (бинарные данные с типом),
- **`response.arrayBuffer()`** -- возвращает ответ как [ArrayBuffer](info:arraybuffer-binary-arrays) (простейшие бинарные данные),
- помимо этого, `response.body` - это объект [ReadableStream](https://streams.spec.whatwg.org/#rs-class), с помощью которого можно считывать тело запроса по частям. Мы рассмотрим пример позже.
=======
- **`response.json()`** -- parse the response as JSON object,
- **`response.text()`** -- return the response as text,
- **`response.formData()`** -- return the response as `FormData` object (form/multipart encoding, explained in the [next chapter](info:formdata)),
- **`response.blob()`** -- return the response as [Blob](info:blob) (binary data with type),
- **`response.arrayBuffer()`** -- return the response as [ArrayBuffer](info:arraybuffer-binary-arrays) (pure binary data),
- additionally, `response.body` is a [ReadableStream](https://streams.spec.whatwg.org/#rs-class) object, it allows to read the body chunk-by-chunk, we'll see an example later.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/01-fetch/article.md

Например, у нас есть JSON-объект с последними коммитами из репозитория на GitHub:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

*!*
let commits = await response.json(); // получаем тело ответа и преобразовываем в JSON
*/!*

alert(commits[0].author.login);
```

Или пример с использованием промисов:

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

<<<<<<< HEAD:5-network/01-fetch-basics/article.md
Для получения текста:
```js
let text = await response.text();
```
Для примера работы с бинарными данными, давайте запросим и выведем на экран изображение (см. главу [Blob](info:blob), чтобы узнать про операции с Blob):
=======
To get the text, `await response.text()` instead of `.json()`:
```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); // read response body as text

alert(text.slice(0, 80) + '...');
```

As a show-case for reading in binary format, let's fetch and show an image (see chapter [Blob](info:blob) for details about operations on blobs):
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/01-fetch/article.md

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

<<<<<<< HEAD:5-network/01-fetch-basics/article.md
setTimeout(() => { // прячем через две секунды
=======
setTimeout(() => { // hide after three seconds
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/01-fetch/article.md
  img.remove();
  URL.revokeObjectURL(img.src);
}, 3000);
```

````warn
Мы можем выбрать только один метод преобразования.

Если мы уже получили ответ с `response.text()`, тогда `response.json()` не сработает, так как данные уже были обработаны.

```js
let text = await response.text(); // тело ответа обработано
let parsed = await response.json(); // ошибка (данные уже были обработаны)
````

## Заголовки
Заголовки хранятся в объекте `response.headers` типа Map.

Мы можем получить конкретный заголовок или перебрать их в цикле:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// получить один заголовок
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// перебрать все заголовки
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

Для установки заголовка, мы можем использовать опцию `headers`, например:

```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'abcdef'
  }
});
```

...Но существует список [запрещённых HTTP-заголовков](https://fetch.spec.whatwg.org/#forbidden-header-name), которые мы не можем установить:

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

Эти заголовки обеспечивают достоверность данных и безопасность протокола HTTP, поэтому они контролируются исключительно браузером.

## POST-запросы

Для отправки `POST` запроса или запроса с другим методом, нам необходимо использовать `fetch` параметры:

- **`method`** -- HTTP метод, например `POST`,
- **`body`** -- один из:
  - строка (например JSON),
  - объект `FormData` для отправки данных как `form/multipart`,
  - `Blob`/`BufferSource` для отправки бинарных данных,
  - [URLSearchParams](info:url) для отправки таких данных как `x-www-form-urlencoded`, используется очень редко.

Рассмотрим примеры:

<<<<<<< HEAD:5-network/01-fetch-basics/article.md
## Отправка JSON

Этот код отправляет объект `user` как JSON:
=======
For example, this code submits `user` object as JSON:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/01-fetch/article.md

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
Обратите внимание, если тело ответа - строка, то `Content-Type` установлен как `text/plain;charset=UTF-8` по умолчанию. Поэтому мы используем параметр `headers` для отправки `application/json`.

<<<<<<< HEAD:5-network/01-fetch-basics/article.md
## Отправка формы

Давайте сделаем то же самое с HTML `<form>`.


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

Объект [FormData](https://xhr.spec.whatwg.org/#formdata) автоматически кодирует данные формы, поля `<input type="file">` также обрабатываются, а затем отправляет их с использованием заголовка `Content-Type: form/multipart`.

## Отправка изображения
=======
Please note, if the body is a string, then `Content-Type` is set to `text/plain;charset=UTF-8` by default. So we use `headers` option to send `application/json` instead, that's the correct content type for JSON-encoded data.

## Sending an image
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/01-fetch/article.md

Мы можем отправить бинарные данные напрямую, используя `Blob` или `BufferSource`.

Например, у нас есть элемент `<canvas>`, на котором мы можем рисовать движением мыши. При нажатии на кнопку "Отправить", изображение отправляется на сервер:

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
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

В этом случае нам не нужно вручную устанавливать заголовок `Content-Type`, потому что объект `Blob` имеет встроенный тип (в показанном примере это `image/png`,  созданный методом `toBlob`).

Функция `submit()` может быть переписана без `async/await` например так:

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

<<<<<<< HEAD:5-network/01-fetch-basics/article.md
## Создание FormData с изображением

Всё-таки на практике удобнее отправлять изображения в качестве части данных формы с дополнительными полями, такими как "name" или другими метаданными. 

Помимо этого, серверы обычно предназначены для получения данных, закодированных методом multipart/form-data, нежели чем простых бинарных данных.

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

Теперь с точки зрения сервера, изображение это файл в форме.

## Итого
=======
## Summary
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/01-fetch/article.md

Типичный запрос с помощью `fetch` состоит из двух операторов `await`:

```js
let response = await fetch(url, options); // завершается с заголовками ответа
let result = await response.json(); // преобразует тело ответа в JSON
```

Или с помощью промисов:
```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* обрабатываем результат */)
```

Параметры ответа:
- `response.status` -- HTTP-код ответа,
- `response.ok` -- `true`, если статус ответа в диапазоне 200-299.
- `response.headers` -- похожий на объект типа Map с HTTP-заголовками.

<<<<<<< HEAD:5-network/01-fetch-basics/article.md
Методы для получения тела ответа: 
- **`response.json()`** -- преобразовывает ответ в JSON-объект,
- **`response.text()`** -- возвращает ответ как обычный текст,
- **`response.formData()`** -- возвращает ответ как объект FormData (кодировка form/multipart),
- **`response.blob()`** -- возвращает объект как [Blob](info:blob) (бинарные данные с типом),
- **`response.arrayBuffer()`** -- возвращает ответ как [ArrayBuffer](info:arraybuffer-binary-arrays) (простейшие бинарные данные),

Параметры:
- `method` -- HTTP-метод,
- `headers` -- объект с запрашиваемыми заголовками (не все заголовка разрешены),
- `body` -- данные для отправки в виде текста/FormData/BufferSource/Blob/UrlSearchParams.
=======
Methods to get response body:
- **`response.json()`** -- parse the response as JSON object,
- **`response.text()`** -- return the response as text,
- **`response.formData()`** -- return the response as `FormData` object (form/multipart encoding, see the next chapter),
- **`response.blob()`** -- return the response as [Blob](info:blob) (binary data with type),
- **`response.arrayBuffer()`** -- return the response as [ArrayBuffer](info:arraybuffer-binary-arrays) (pure binary data),

Fetch options so far:
- `method` -- HTTP-method,
- `headers` -- an object with request headers (not any header is allowed),
- `body` -- `string`, `FormData`, `BufferSource`, `Blob` or `UrlSearchParams` object to send.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/01-fetch/article.md

В следующих главах мы рассмотрим больше параметров и вариантов использования.
