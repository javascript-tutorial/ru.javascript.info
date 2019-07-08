
# Fetch

JavaScript может отправлять сетевые запросы на сервер и подгружать новую информацию по мере необходимости.

Например, мы можем:
- Отправить заказ,
- Загрузить информацию о пользователе,
- Запросить последние обновления с сервера,
- ...и т.п.

Для этого есть общий термин "AJAX" (аббревиатура от <b>A</b>synchronous <b>J</b>avascript <b>A</b>nd <b>X</b>ml. Хотя XML мы использовать не обязаны, просто термин старый, поэтому в нём есть это слово.

Есть несколько способов делать сетевые запросы и получать информацию с сервера.

Метод `fetch()` — современный и очень мощный, поэтому начнём с него. Его улучшают много лет, и сейчас он поддерживается всеми современными браузерами.

Базовый синтаксис:

```js
let promise = fetch(url, [options])
```

- **`url`** -- URL для отправки запроса.
- **`options`** -- дополнительные параметры: метод, заголовки и так далее.

Браузер сразу же начинает запрос и возвращает `promise`.

Процесс получения ответа обычно происходит в два этапа.

**Во-первых, результатом `promise` является объект встроенного класса [Response](https://fetch.spec.whatwg.org/#response-class), он появляется, как только сервер пришлёт заголовки ответа.**

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

**Во-вторых, для получения тела ответа нам нужно использовать дополнительный вызов метода.**

`Response` предоставляет несколько методов, основанных на промисах, для доступа к телу ответа в различных форматах:

- **`response.json()`** -- преобразовывает ответ в JSON-объект,
- **`response.text()`** -- возвращает ответ как обычный текст,
- **`response.formData()`** -- возвращает ответ как объект `FormData` (кодировка form/multipart, разберём его в [следующей главе(info:formdata)),
- **`response.blob()`** -- возвращает объект как [Blob](info:blob) (бинарные данные с типом),
- **`response.arrayBuffer()`** -- возвращает ответ как [ArrayBuffer](info:arraybuffer-binary-arrays) (простейшие бинарные данные),
- помимо этого, `response.body` - это объект [ReadableStream](https://streams.spec.whatwg.org/#rs-class), с помощью которого можно считывать тело запроса по частям. Мы рассмотрим пример позже.

Например, получим JSON-объект с последними коммитами из репозитория на GitHub:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

*!*
let commits = await response.json(); // получаем тело ответа и преобразовываем в JSON
*/!*

alert(commits[0].author.login);
```

То же самое без `await`, с использованием промисов:

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

Для получения текста используем `await response.text()` вместо `.json()`:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); // прочитать тело ответа как текст

alert(text.slice(0, 80) + '...');
```

В качестве примера работы с бинарными данными, давайте запросим и выведем на экран изображение (см. главу [Blob](info:blob), чтобы узнать про операции с Blob):

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

Для установки заголовка мы можем использовать опцию `headers`, например:

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

Для отправки `POST`-запроса или запроса с другим методом, нам необходимо использовать `fetch` параметры:

- **`method`** -- HTTP метод, например `POST`,
- **`body`** -- один из:
  - строка (например JSON),
  - объект `FormData` для отправки данных как `form/multipart`,
  - `Blob`/`BufferSource` для отправки бинарных данных,
  - [URLSearchParams](info:url) для отправки данных в кодировке `x-www-form-urlencoded`, используется  редко.

Например, этот код отправляет объект `user` как JSON:

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

## Отправка изображения

Мы можем отправить бинарные данные напрямую, используя `Blob` или `BufferSource`.

Например, у нас есть элемент `<canvas>`, на котором мы можем рисовать движением мыши. При нажатии на кнопку "Отправить" изображение отправляется на сервер:

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
- `response.headers` -- похожий на `Map` объект с HTTP-заголовками.

Методы для получения тела ответа:
- **`response.json()`** -- преобразовывает ответ в JSON-объект,
- **`response.text()`** -- возвращает ответ как обычный текст,
- **`response.formData()`** -- возвращает ответ как объект FormData (кодировка form/multipart, см. следующую главу),
- **`response.blob()`** -- возвращает объект как [Blob](info:blob) (бинарные данные с типом),
- **`response.arrayBuffer()`** -- возвращает ответ как [ArrayBuffer](info:arraybuffer-binary-arrays) (простейшие бинарные данные),

Опции `fetch`, которые мы изучили на данный момент:
- `method` -- HTTP-метод,
- `headers` -- объект с запрашиваемыми заголовками (не все заголовки разрешены),
- `body` -- данные для отправки в виде текста/FormData/BufferSource/Blob/UrlSearchParams.

В следующих главах мы рассмотрим больше параметров и вариантов использования `fetch`.
