
# Fetch: Основы

Метод `fetch()` это современный метод отправки HTTP запросов.

На протяжении нескольких лет метод постоянно развивался и до сих пор продолжает улучшаться. В настоящее время его поддерживают все современный браузеры.

Базовый синтакс:

```js
let promise = fetch(url, [options])
```

- **`url`** -- URL для отправки запроса.
- **`options`** -- дополнительные параметры: метод, заголовки и так далее.

Браузер сразу же начинает запрос и возвращает `promise`.

Процесс получения ответа обычно происходит в два этапа.

**`Promise` выполняется со встроенный объектом класса [Response](https://fetch.spec.whatwg.org/#response-class) как только сервер отправляет ответ с заголовками.**

Таким образом, мы можем проверить HTTP статус, чтобы увидеть, является ли он успешным или нет, проверить заголовки, но пока без тела ответа.

Промис завершается с ошибкой если `fetch` не смог выполнить HTTP запрос, например при ошибке сети, или при отсутствии запрашиваемого ресурса. HTTP ошибки, такие как 404 или 500 считаются стандартной частью процесса.

Мы можем увидеть их в свойствах ответа:

- **`ok`** -- логическая переменная, `true` при HTTP коде состояния 200-299.
- **`status`** -- HTTP код состояния.

Например:

```js
let response = await fetch(url);

if (response.ok) { // если HTTP код состояния 200-299
  // получаем тело ответа (см. ниже)
  let json = await response.json();
} else {
  alert("Ошибка HTTP: " + response.status);
}
```

Для получения тела ответа нам нужно использовать дополнительный вызов метода.

`Response` предоставляет несколько методов основанных на промисах для доступа к телу ответа в различных форматах:

- **`response.json()`** -- преобразовывает ответ в JSON объект,
- **`response.text()`** -- возвращает ответ как обычный текст,
- **`response.formData()`** -- возвращает ответ как объект FormData (кодировка form/multipart),
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
И для примера работы с бинарными данными, давайте запросим и выведем на экран изображение (см. главу [Blob](info:blob) чтобы узнать детали реализации)

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

Если мы получили ответ с `response.text()`, тогда `response.json()` не сработает, так как данные уже были преобразованы.

```js
let text = await response.text(); // тело ответа преобразовано
let parsed = await response.json(); // ошибка (данные уже были преобразованы)
````

## Headers
Заголовки хранятся в коллекции `response.headers`.

Мы можем получить индивидуальный заголовок или перебрать их в цикле:

```js run async
let response = await fetch('https://api.github.com/repos/iliakan/javascript-tutorial-en/commits');

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

...Но существует список [запрещенных HTTP заголовков](https://fetch.spec.whatwg.org/#forbidden-header-name), которые мы не можем установить:

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

Эти заголовки обеспечивают достоверность данных и безопасность протокла HTTP, поэтому они контроллируются исключительно браузером.

## POST запросы

Для отправки `POST` запроса или запроса с другим методом, нам необходимо использовать `fetch` параметры:

- **`method`** -- HTTP метод, например `POST`,
- **`body`** -- один из:
  - строка (например JSON),
  - объект `FormData`, для отправки данных как `form/multipart`,
  - `Blob`/`BufferSource` для отправки бинарных данных,
  - [URLSearchParams](info:url), для отправки данных как `x-www-form-urlencoded`, используется очень редко.

Рассмотрим примеры:

## Отправка JSON

Этот код отправляет объект `user` как JSON:

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
Обратите внимание, если тело ответа - строка, то `Content-Type` установлен как `text/plain;charset=UTF-8` по умолчанию. Поэтому мы используем параметр `headers` для отправки `application/json`.

## Отправка формы

Давайте сделаем тоже самое с HTML `<form>`.


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

Здесь [FormData](https://xhr.spec.whatwg.org/#formdata) автоматически преобразует данные формы, поля `<input type="file">` также обрабатываются, и отправляет это используя `Content-Type: form/multipart`.

## Отправка изображения

Мы можем отправить бинарные данные напрямую используя `Blob` или `BufferSource`.

Например, у нас есть `<canvas>` на котором мы можем рисовать движением мыши. При нажатии на кнопку "Отправить", изображение отправляется на сервер:

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

Здесь нам не нужно устанавливать `Content-Type` вручную, потому что объект `Blob` имеет встроенный тип (в данном примере `image/png`,  сгенерированный методом `toBlob`).

Функция `submit()` может быть переписана без `async/await` например так:

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

## Своя форма с изображением

На практике, удобнее отправлять изображения как часть формы с дополнительными полями, такими как "name" или остальными метаданными. 

Также, серверы обычно предназначены для приема таких форм, а не простых бинарных данных.

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

Теперь, с точки зрения сервера, изображение это файл в форме.

## Итого

Типичный `fetch` запрос состоит из двух `awaits`:

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
- `response.status` -- HTTP код ответа,
- `response.ok` -- `true` статус ответа 200-299.
- `response.headers` -- коллекция HTTP заголовков.

Методы для получения тела ответа: 
- **`response.json()`** -- преобразовывает ответ в JSON объект,
- **`response.text()`** -- возвращает ответ как обычный текст,
- **`response.formData()`** -- возвращает ответ как объект FormData (кодировка form/multipart),
- **`response.blob()`** -- возвращает объект как [Blob](info:blob) (бинарные данные с типом),
- **`response.arrayBuffer()`** -- возвращает ответ как [ArrayBuffer](info:arraybuffer-binary-arrays) (простейшие бинарные данные),

Параметры:
- `method` -- HTTP метод,
- `headers` -- an object with request headers (not any header is allowed),
- `headers` -- объект с запрашиваемыми заголовками (не все заголовка разрешены),
- `body` -- текст/FormData/BufferSource/Blob/UrlSearchParams данные для отправки.

В следующих главах мы рассмотрим больше параметров и вариантов использования.
