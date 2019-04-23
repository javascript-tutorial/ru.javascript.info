# Blob 

`ArrayBuffer` и бинарные массивы являются частью ECMA стандарта, и соответственно частью Javascript.

Кроме того, в браузере, имеются дополнительные высокоуровневые объекты, описанные в [File API](https://www.w3.org/TR/FileAPI/).

`Blob` объект состоит из необязательной строки `type` (обычно MIME-type), и `blobParts` -- цепочки других `Blob` объектов, строк и `BufferSources`.

![](blob.png)

Благодаря `type` мы можем загружать и скачивать blob-объекты, где `type` естественно становится `Content-Type` в сетевых запросах.

Конструктор имеет следующий синтаксис:

```js
new Blob(blobParts, options);
```

- **`blobParts`** -- массив значений `Blob`/`BufferSource`/`String`.
- **`options`** -- необязательный объект с дополнительными настройками:
  - **`type`** -- тип объекта, обычно MIME-тип, например. `image/png`,
  - **`endings`** -- если указан то окончания строк создаваемого blob будут изменены в соответствии с текущей операционной системой (`\r\n` или `\n`). По умолчанию `"transparent"` (ничего не делать), но так же может быть `"native"` (изменять).

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


Мы можем получить срез blob массива, используя:

```js
blob.slice([byteStart], [byteEnd], [contentType]);
```

- **`byteStart`** -- стартовая позиция байта, по умолчанию 0.
- **`byteEnd`** -- последний байт, по умолчанию до конца.
- **`contentType`** -- тип `type` создаваемого blob объекта, по умолчанию такой же как и исходный.

Аргументы подобные `array.slice`, отрицательные числа так же разрешены.

```smart header="Blob не изменяем (immutable)"
Мы не можем изменять данные напрямую в blob, но мы можем делать срезы и создавать новый blob на их основе, сделать объединение нескольких объектов в новый и так далее.

Это поведение аналогично Javascript строке: мы не можем изменить символы в строке, но мы можем создать новую исправленную строку на базе имеющийся.
```

## Blob как URL

Blob может быть использован как URL для `<a>`, `<img>` или других тегов, для показа содержимого.

Давайте начнем с простого примера. При клике на ссылку мы загружаем динамически генерируемый blob с `hello world` содержимым как файл:

```html run
<!-- download атрибут указывает браузеру делать загрузку вместо навигации -->
<a download="hello.txt" href='#' id="link">Download</a>

<script>
let blob = new Blob(["Hello, world!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);
</script>
```

Мы так же можем создать ссылку динамически, используя только JavaScript и эмулировать на ней клик, используя `link.click()`, тогда загрузка начнется автоматически.

Далее простой пример создания "на лету" и загрузки blob объекта, без использования HTML:

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);
```

**`URL.createObjectURL` берет blob и создает уникальный url для него, в форме `blob:<origin>/<uuid>`.**

Вот как выглядит сгенерированный URL:

```
blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
```

Браузер для каждого url сгенерированного через `URL.createObjectURL` сохраняет внутреннее соответствие url -> blob. Таким образом url содержит короткий код, но это дает доступ к большому blob объекту.

Сгенерированный url действителен только пока текущий документ открыт. И это позволяет ссылаться на сгенерированный в нем blob в `<img>`, `<a>` или любом другом объекте, ожидающим url.

В данном случае возможен побочный эффект. Пока в карте соответствия существует ссылка на blob, он находится в памяти. Браузер не может освободить память занятую blob объектом.

Ссылка в карте соответствия автоматически удаляется при выгрузке документа, после этого также освобождается память. Но если приложение имеет длительный жизненный цикл, это может произойти не скоро. Таким образом, если мы создадим URL для blob, он будет висеть в памяти, даже если в нем нет больше необходимости.

**`URL.revokeObjectURL(url)` удаляет внутреннюю ссылку на объект, что позволит удалить его (если нет другой ссылки) сборщику мусора, и память будет освобождена.**

В последнем примере мы использовали blob только единожды, для мгновенной загрузки, после мы сразу же вызвали `URL.revokeObjectURL(link.href)`.

Хотя в предыдущем примере, с кликабельной HTML ссылкой, мы не вызывали `URL.revokeObjectURL(link.href)`, потому что это сделало бы ссылку недействительной. После отзыва, и удаления ссылки на blob, url больше не будет работать.

## Blob to base64

Альтернативой `URL.createObjectURL` является возможность перевода blob объекта в строку с кодировкой base64.

Эта кодировка представляет двоичные данные в виде строки с безопасными для чтения символами в ASCII-кодах от 0 до 64. И что более важно -- мы можем использовать эту кодировку для "data-urls".

[data url](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) имеет форму `data:[<mediatype>][;base64],<data>`. Мы можем использовать такой url где угодно, в паре с "обычным" url.

На пример, смайлик:

```html
<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
```

Браузер декодирует строку и покажет смайлик: <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">


Для трансформации blob в base64, мы будет использовать встроенный в браузер `FileReader` объект. Он может читать данные из Blob в множестве форматов. В [следующей главе](info:file) мы рассмотрим это более глубоко.

Вот пример загрузки blob, при помощи base-64:

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

*!*
let reader = new FileReader();
reader.readAsDataURL(blob); // конвертирует blob в base64 и вызывает onload
*/!*

reader.onload = function() {
  link.href = reader.result; // url с данными
  link.click();
};
```

Оба варианта могут быть использованы для создания URL с blob. Но обычно `URL.createObjectURL(blob)` является более быстрым и безопасным.

```compare title-plus="URL.createObjectURL(blob)" title-minus="Blob to data url"
+ Нужно отзывать объект для освобождения памяти.
+ Прямой доступ к blob, без "кодирования/декодирования".
- Нет необходимости что либо отзывать.
- Потеря производительности и памяти при декодировании больших blob объектов.
```

## Изображение в blob

Мы можем создать blob для изображения, части изображения, или даже создать скриншот страницы. Что удобно для последующей загрузки куда либо.

Операции с изображениями выполняются через `<canvas>` элемент:

1. Для отрисовки изображения (или его части) на холсте( canvas) используется [canvas.drawImage](https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/drawImage).
2. Вызов canvas метода [.toBlob(callback, format, quality)](https://developer.mozilla.org/ru/docs/Web/API/HTMLCanvasElement/toBlob) создает blob и вызывает функцию `callback` при завершении.

В примере ниже, изображение просто копируется, но мы можем взять его часть, или трансформировать его на canvas перед созданием blob:

```js run
// берем любое изображение
let img = document.querySelector('img');

// создаем <canvas> того же размера
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

// копируем изображение в  canvas  (метод позволяет вырезать часть изображения)
context.drawImage(img, 0, 0);
// мы можем вращать изображение при помощи context.rotate(), и делать множество других преобразований

// toBlob является асинхронной операцией, для которой callback-функция вызывается при завершении
canvas.toBlob(function(blob) {
  // после того, как blob создан, загружаем его
  let link = document.createElement('a');
  link.download = 'example.png';

  link.href = URL.createObjectURL(blob);
  link.click();

  // удаляем внутреннюю ссылку на blob, что позволит браузеру очистить память
  URL.revokeObjectURL(link.href);
}, 'image/png');
```

Или если вы предпочитаете `async/await` вместо callback функции:
```js
let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
```

Для создания скриншота страницы мы можем использовать такую библиотеку, как  <https://github.com/niklasvh/html2canvas>. То, что она делает, это просто проходит страницу и отрисовывает её `<canvas>`. После этого мы может получить blob одним из вышеуказанных способов.

## Из Blob в ArrayBuffer

Конструктор `Blob` позволяет создать blob практически из чего угодно, включая `BufferSource`.

Но если нам нужена производительная низкоуровневая обработка, мы можем использовать `ArrayBuffer` из `FileReader`:

```js
// получаем arrayBuffer из blob
let fileReader = new FileReader();

*!*
fileReader.readAsArrayBuffer(blob);
*/!*

fileReader.onload = function(event) {
  let arrayBuffer = fileReader.result;
};
```


## Резюме

В то время как `ArrayBuffer`, `Uint8Array` и другие `BufferSource` являются "бинарными данными", [Blob](https://www.w3.org/TR/FileAPI/#dfn-Blob) представляет "бинарные данные с типом".

Это делает Blob удобным для операций загрузки/выгрузки данных, которые так часто используются в браузере.

Методы, которые выполняют веб-запросы, такие как [XMLHttpRequest](info:xmlhttprequest), [fetch](info:fetch-basics) и подобные, могут работать с `Blob` изначально, также как с другими двоичными типами.

Мы можем легко конвертировать `Blob` в низкоуровневые бинарные типы данных и обратно:

- Мы можем создать Blob из типового массива используя `new Blob(...)` конструктор.
- Мы можем обратно создать `ArrayBuffer` из Blob используя `FileReader`, и затем его создать представления для низкоуровневых операций.

