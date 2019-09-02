<<<<<<< HEAD
# Blob 
=======
`Blob` # Blob
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

`ArrayBuffer` и бинарные массивы являются частью ECMA-стандарта и, соответственно, частью JavaScript.

Кроме того, в браузере имеются дополнительные высокоуровневые объекты, описанные в [File API](https://www.w3.org/TR/FileAPI/).

<<<<<<< HEAD
Объект `Blob` состоит из необязательной строки `type` (обычно MIME-тип) и `blobParts` - последовательности других объектов `Blob`, строк и `BufferSource`.
=======
`Blob` consists of an optional string `type` (a MIME-type usually), plus `blobParts` -- a sequence of other `Blob` objects, strings and `BufferSource`.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

![](blob.svg)

Благодаря `type` мы можем загружать и скачивать Blob-объекты, где `type` естественно становится `Content-Type` в сетевых запросах.

Конструктор имеет следующий синтаксис:

```js
new Blob(blobParts, options);
```

<<<<<<< HEAD
- **`blobParts`** -- массив значений `Blob`/`BufferSource`/`String`.
- **`options`** -- необязательный объект с дополнительными настройками:
  - **`type`** -- тип объекта, обычно MIME-тип, например. `image/png`,
  - **`endings`** -- если указан, то окончания строк создаваемого `Blob` будут изменены в соответствии с текущей операционной системой (`\r\n` или `\n`). По умолчанию `"transparent"` (ничего не делать), но также может быть `"native"` (изменять).
=======
- **`blobParts`** is an array of `Blob`/`BufferSource`/`String` values.
- **`options`** optional object:
  - **`type`** -- `Blob` type, usually MIME-type, e.g. `image/png`,
  - **`endings`** -- whether to transform end-of-line to make the `Blob` correspond to current OS newlines (`\r\n` or `\n`). By default `"transparent"` (do nothing), but also can be `"native"` (transform).
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

Например:

```js
// создадим Blob из строки
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// обратите внимание: первый аргумент должен быть массивом [...]
```

```js
// создадим Blob из типизированного массива и строк
let hello = new Uint8Array([72, 101, 108, 108, 111]); // "hello" в бинарной форме

let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
```


<<<<<<< HEAD
Мы можем получить срез Blob, используя:
=======
We can extract `Blob` slices with:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js
blob.slice([byteStart], [byteEnd], [contentType]);
```

- **`byteStart`** -- стартовая позиция байта, по умолчанию 0.
- **`byteEnd`** -- последний байт, по умолчанию до конца.
- **`contentType`** -- тип `type` создаваемого Blob-объекта, по умолчанию такой же, как и исходный.

Аргументы - как в `array.slice`, отрицательные числа также разрешены.

<<<<<<< HEAD
```smart header="Blob не изменяем (immutable)"
Мы не можем изменять данные напрямую в Blob, но мы можем делать срезы и создавать новый Blob на их основе, объединять несколько объектов в новый и так далее.
=======
```smart header="`Blob` objects are immutable"
We can't change data directly in a `Blob`, but we can slice parts of a `Blob`, create new `Blob` objects from them, mix them into a new `Blob` and so on.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

Это поведение аналогично JavaScript-строке: мы не можем изменить символы в строке, но мы можем создать новую исправленную строку на базе имеющейся.
```

## Blob как URL

<<<<<<< HEAD
Blob может быть использован как URL для `<a>`, `<img>` или других тегов, для показа содержимого.

Давайте начнём с простого примера. При клике на ссылку мы загружаем динамически генерируемый Blob с `hello world` содержимым как файл:
=======
Thanks to `type`, we can also download/upload `Blob` objects, and the `type` naturally becomes `Content-Type` in network requests.

Let's start with a simple example. By clicking on a link you download a dynamically-generated `Blob` with `hello world` contents as a file:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```html run
<!-- download атрибут указывает браузеру делать загрузку вместо навигации -->
<a download="hello.txt" href='#' id="link">Загрузить</a>

<script>
let blob = new Blob(["Hello, world!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);
</script>
```

Мы также можем создать ссылку динамически, используя только JavaScript, и эмулировать на ней клик, используя `link.click()`, тогда загрузка начнётся автоматически.

<<<<<<< HEAD
Далее простой пример создания "на лету" и загрузки Blob-объекта, без использования HTML:
=======
Here's the similar code that causes user to download the dynamicallly created `Blob`, without any HTML:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);
```

<<<<<<< HEAD
**`URL.createObjectURL` берёт Blob и создаёт уникальный URL для него в формате `blob:<origin>/<uuid>`.**
=======
`URL.createObjectURL` takes a `Blob` and creates an unique URL for it, in the form `blob:<origin>/<uuid>`.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

Вот как выглядит сгенерированный URL:

```
blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
```

<<<<<<< HEAD
Браузер для каждого URL, сгенерированного через `URL.createObjectURL`, сохраняет внутреннее соответствие URL -> `Blob`. Так образом, такие URL короткие, но дают доступ к большому объекту `Blob`.

Сгенерированный url действителен, только пока текущий документ открыт. Это позволяет ссылаться на сгенерированный в нём Blob в `<img>`, `<a>` или в любом другом объекте, где ожидается url в качестве одного из параметров.

В данном случае возможен побочный эффект. Пока в карте соответствия существует ссылка на Blob, он находится в памяти. Браузер не может освободить память, занятую Blob-объектом.

Ссылка в карте соответствия автоматически удаляется при выгрузке документа, после этого также освобождается память. Но если приложение имеет длительный жизненный цикл, это может произойти не скоро. Таким образом, если мы создадим URL для Blob, он будет висеть в памяти, даже если в нём нет больше необходимости.

**`URL.revokeObjectURL(url)` удаляет внутреннюю ссылку на объект, что позволяет удалить его (если нет другой ссылки) сборщику мусора, и память будет освобождена.**

В последнем примере мы использовали Blob только единожды, для мгновенной загрузки, после мы сразу же вызвали `URL.revokeObjectURL(link.href)`.

В предыдущем примере с кликабельной HTML-ссылкой мы не вызывали `URL.revokeObjectURL(link.href)`, потому что это сделало бы ссылку недействительной. После удаления внутренней ссылки на `Blob`, URL больше не будет работать.

## Blob to base64

Альтернатива `URL.createObjectURL` -- конвертация Blob-объекта в строку с кодировкой base64.
=======
The browser for each URL generated by `URL.createObjectURL` stores an the URL -> `Blob` mapping internally. So such URLs are short, but allow to access the `Blob`.

A generated URL (and hence the link with it) is only valid within the current document, while it's open. And it allows to reference the `Blob` in `<img>`, `<a>`, basically any other object that expects an url.

There's a side-effect though. While there's an mapping for a `Blob`, the `Blob` itself resides in the memory. The browser can't free it.

The mapping is automatically cleared on document unload, so `Blob` o bjects are freed then. But if an app is long-living, then that doesn't happen soon.

**So if we create an URL, that `Blob` will hang in memory, even if not needed any more.**

`URL.revokeObjectURL(url)` removes the reference from the internal mapping, thus allowing the `Blob` to be deleted (if there are no other references), and the memory to be freed.

In the last example, we intend the `Blob` to be used only once, for instant downloading, so we call `URL.revokeObjectURL(link.href)` immediately.

In the previous example with the clickable HTML-link, we don't call `URL.revokeObjectURL(link.href)`, because that would make the `Blob` url invalid. After the revocation, as the mapping is removed, the URL doesn't work any more.

## Blob to base64

An alternative to `URL.createObjectURL` is to convert a `Blob` into a base64-encoded string.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

Эта кодировка представляет двоичные данные в виде строки с безопасными для чтения символами в ASCII-кодах от 0 до 64. И что более важно -- мы можем использовать эту кодировку для "data-urls".

[data url](https://developer.mozilla.org/ru/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) имеет форму `data:[<mediatype>][;base64],<data>`. Мы можем использовать такой url где угодно наряду с "обычным" url.

Например, смайлик:

```html
<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
```

Браузер декодирует строку и показывает смайлик: <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">


<<<<<<< HEAD
Для трансформации Blob в base64 мы будем использовать встроенный в браузер объект типа `FileReader`. Он может читать данные из Blob в множестве форматов. В [следующей главе](info:file) мы рассмотрим это более глубоко.
=======
To transform a `Blob` into base64, we'll use the built-in `FileReader` object. It can read data from Blobs in multiple formats. In the [next chapter](info:file) we'll cover it more in-depth.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

Вот пример загрузки Blob при помощи base64:

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

*!*
let reader = new FileReader();
reader.readAsDataURL(blob); // конвертирует Blob в base64 и вызывает onload
*/!*

reader.onload = function() {
  link.href = reader.result; // url с данными
  link.click();
};
```

<<<<<<< HEAD
Оба варианта могут быть использованы для создания URL с Blob. Но обычно `URL.createObjectURL(blob)` является более быстрым и безопасным.

```compare title-plus="URL.createObjectURL(blob)" title-minus="Blob to data url"
+ Нужно отзывать объект для освобождения памяти.
+ Прямой доступ к Blob, без "кодирования/декодирования".
- Нет необходимости что-либо отзывать.
- Потеря производительности и памяти при декодировании больших Blob-объектов.
=======
Both ways of making an URL of a `Blob` are usable. But usually `URL.createObjectURL(blob)` is simpler and faster.

```compare title-plus="URL.createObjectURL(blob)" title-minus="Blob to data url"
+ We need to revoke them if care about memory.
+ Direct access to blob, no "encoding/decoding"
- No need to revoke anything.
- Performance and memory losses on big `Blob` objects for encoding.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
```

## Изображение в Blob

<<<<<<< HEAD
Мы можем создать Blob для изображения, части изображения или даже создать скриншот страницы. Что удобно для последующей загрузки куда-либо.
=======
We can create a `Blob` of an image, an image part, or even make a page screenshot. That's handy to upload it somewhere.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

Операции с изображениями выполняются через элемент `<canvas>`:

<<<<<<< HEAD
1. Для отрисовки изображения (или его части) на холсте (canvas) используется [canvas.drawImage](https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/drawImage).
2. Вызов canvas-метода [.toBlob(callback, format, quality)](https://developer.mozilla.org/ru/docs/Web/API/HTMLCanvasElement/toBlob) создаёт Blob и вызывает функцию `callback` при завершении.
=======
1. Draw an image (or its part) on canvas using [canvas.drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage).
2. Call canvas method [.toBlob(callback, format, quality)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) that creates a `Blob` and runs `callback` with it when done.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

В примере ниже изображение просто копируется, но мы можем взять его часть или трансформировать его на canvas перед созданием Blob:

```js run
// берём любое изображение
let img = document.querySelector('img');

// создаём <canvas> того же размера
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

// копируем изображение в  canvas (метод позволяет вырезать часть изображения)
context.drawImage(img, 0, 0);
// мы можем вращать изображение при помощи context.rotate() и делать множество других преобразований

// toBlob является асинхронной операцией, для которой callback-функция вызывается при завершении
canvas.toBlob(function(blob) {
  // после того, как Blob создан, загружаем его
  let link = document.createElement('a');
  link.download = 'example.png';

  link.href = URL.createObjectURL(blob);
  link.click();

  // удаляем внутреннюю ссылку на Blob, что позволит браузеру очистить память
  URL.revokeObjectURL(link.href);
}, 'image/png');
```

Или если вы предпочитаете `async/await` вместо колбэка:
```js
let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
```

<<<<<<< HEAD
Для создания скриншота страницы мы можем использовать такую библиотеку, как  <https://github.com/niklasvh/html2canvas>. Всё, что она делает, это просто проходит страницу и отрисовывает её в `<canvas>`. После этого мы может получить Blob одним из вышеуказанных способов.
=======
For screenshotting a page, we can use a library such as <https://github.com/niklasvh/html2canvas>. What it does is just walks the page and draws it on `<canvas>`. Then we can get a `Blob` of it the same way as above.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

## Из Blob в ArrayBuffer

Конструктор `Blob` позволяет создать Blob-объект практически из чего угодно, включая `BufferSource`.

Но если нам нужна производительная низкоуровневая обработка, мы можем использовать `ArrayBuffer` из `FileReader`:

```js
// получаем arrayBuffer из Blob
let fileReader = new FileReader();

*!*
fileReader.readAsArrayBuffer(blob);
*/!*

fileReader.onload = function(event) {
  let arrayBuffer = fileReader.result;
};
```


## Итого

В то время как `ArrayBuffer`, `Uint8Array` и другие `BufferSource` являются "бинарными данными", [Blob](https://www.w3.org/TR/FileAPI/#dfn-Blob) представляет собой "бинарные данные с типом".

Это делает Blob удобным для операций загрузки/выгрузки данных, которые так часто используются в браузере.

Методы, которые выполняют сетевые запросы, такие как [XMLHttpRequest](info:xmlhttprequest), [fetch](info:fetch) и подобные, могут изначально работать с `Blob` так же, как и с другими объектами, представляющими двоичные данные.

Мы можем легко конвертировать `Blob` в низкоуровневые бинарные типы данных и обратно:

- Мы можем создать Blob из типизированного массива, используя конструктор `new Blob(...)`.
- Мы можем обратно создать `ArrayBuffer` из Blob, используя `FileReader`, а затем создать его представление для низкоуровневых операций.

