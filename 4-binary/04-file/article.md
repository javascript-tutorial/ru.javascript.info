# File и FileReader

Объект [File](https://www.w3.org/TR/FileAPI/#dfn-file) наследуется от объекта `Blob` и возможностями по взаимодействию с файловой системой.

Есть два способа его получить.

Во-первых, есть конструктор, похожий на `Blob`:

```js
new File(fileParts, fileName, [options])
```

<<<<<<< HEAD
- **`fileParts`** -- массив значений Blob/BufferSource/String, такой же как `Blob`.
- **`fileName`** -- строка имени файла.
- **`options`** -- необязательный объект:
    - **`lastModified`** -- дата последнего изменения в формате timestamp (целое число).
=======
- **`fileParts`** -- is an array of Blob/BufferSource/String value, same as `Blob`.
- **`fileName`** -- file name string.
- **`options`** -- optional object:
    - **`lastModified`** -- the timestamp (integer date) of last modification.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Во-вторых, чаще всего мы получаем файл из `<input type="file">` или через перетаскивание с помощью мыши, или других интерфейсов браузера. Затем этот файл получает нужную информацию из ОС.

<<<<<<< HEAD
Например:
=======
As `File` inherits from `Blob`, it has same properties, plus:
- `name` -- the file name,
- `lastModified` -- the timestamp of last modification.

That's how we can get a `File` object from `<input type="file">`:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```html run
<input type="file" onchange="showFile(this)">

<script>
function showFile(input) {
  let file = input.files[0];

  alert(`File name: ${file.name}`); // например, my.png
  alert(`Last modified: ${file.lastModified}`); // например, 1552830408824
}
</script>
```

```smart
Через `<input>` можно выбрать несколько файлов, поэтому `input.files` -- псевдомассив выбранных файлов. Здесь у нас только один файл, поэтому мы просто берём `input.files[0]`.
```

## FileReader

[FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) объект, цель которого: читать данные из `Blob` (и, следовательно, `File` тоже).

Данные передаются при помощи событий, так как чтение с диска может занять время.

Конструктор:

```js
let reader = new FileReader(); // без аргументов
```
    
Основные методы:

- **`readAsArrayBuffer(blob)`** -- считать данные как `ArrayBuffer`
- **`readAsText(blob, [encoding])`** -- считать данные как строку (кодировка по умолчанию: `utf-8`)
- **`readAsDataURL(blob)`** -- считать данные как base64-кодированный URL.
- **`abort()`** -- отменить операцию.

<<<<<<< HEAD
В процессе чтения можно "слушать" следующие события:
- `loadstart` -- чтение начато.
- `progress` -- срабатывает во время чтения данных.
- `load` -- нет ошибок, чтение окончено.
- `abort` -- вызван `abort()`.
- `error` -- произошла ошибка.
- `loadend` -- чтение завершено (успешно или нет).

Когда чтение закончено, мы сможем получить доступ к его результату следующим образом:
- `reader.result` результат чтения (если оно успешно)
- `reader.error` объект ошибки (при неудаче).
=======
- **`readAsArrayBuffer(blob)`** -- read the data in binary format `ArrayBuffer`.
- **`readAsText(blob, [encoding])`** -- read the data as a text string with the given encoding (`utf-8` by default).
- **`readAsDataURL(blob)`** -- read the binary data and encode it as base64 data url.
- **`abort()`** -- cancel the operation.

The choice of `read*` method depends on which format we prefer, how we're going to use the data.

- `readAsArrayBuffer` - for binary files, to do low-level binary operations. For high-level operations, like slicing, `File` inherits from `Blob`, so we can calll them directly, without reading.
- `readAsText` - for text files, when we'd like to get a string.
- `readAsDataURL` -- when we'd like to use this data in `src` for `img` or another tag. There's an alternative to reading a file for that, as discussed in chapter <info:blob>: `URL.createObjectURL(file)`.

As the reading proceeds, there are events:
- `loadstart` -- loading started.
- `progress` -- occurs during reading.
- `load` -- no errors, reading complete.
- `abort` -- `abort()` called.
- `error` -- error has occurred.
- `loadend` -- reading finished with either success or failure.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Наиболее часто используемые события - это, конечно же, `load` и `error`.

Вот пример чтения файла:

```html run
<input type="file" onchange="readFile(this)">

<script>
function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    console.log(reader.result);
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}
</script>
```

<<<<<<< HEAD
```smart header="`FileReader` для Blob"
Как упоминалось в главе <info:blob>, `FileReader` работает для любых объектов Blob, а не только для файлов.

Поэтому мы можем использовать его для преобразования Blob в другой формат:
- `readAsArrayBuffer(blob)` -- в `ArrayBuffer`,
- `readAsText(blob, [encoding])` -- в строку (альтернатива `TextDecoder`),
- `readAsDataURL(blob)` -- в формат base64-кодированного URL.
```


```smart header="`FileReaderSync` доступен только для веб-воркеров"
Для веб-воркеров существует также и синхронный вариант `FileReader`, именуемый [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync).
=======
```smart header="`FileReader` for blobs"
As mentioned in the chapter <info:blob>, `FileReader` can read not just files, but any blobs.

We can use it to convert a blob to another format:
- `readAsArrayBuffer(blob)` -- to `ArrayBuffer`,
- `readAsText(blob, [encoding])` -- to string (an alternative to `TextDecoder`),
- `readAsDataURL(blob)` -- to base64 data url.
```


```smart header="`FileReaderSync` is available inside Web Workers"
For Web Workers, there also exists a synchronous variant of `FileReader`, called [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync).
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Его методы считывания `read*` не генерируют события, а возвращают результат, как это делают обычные функции.

Но это только внутри веб-воркера, поскольку задержки в синхронных вызовах, которые возможны при чтении из файла, в веб-воркерах менее важны. Они не влияют на страницу.
```

## Итого

`File` объекты наследуют от `Blob`.

<<<<<<< HEAD
Помимо методов и свойств `Blob`, объекты `File` также имеют свойства `fileName` и `lastModified` плюс внутреннюю возможность чтения из файловой системы. Обычно мы получаем объекты `File` из пользовательского ввода, например, через `<input>` или перетаскиванием с помощью мыши.
=======
In addition to `Blob` methods and properties, `File` objects also have `name` and `lastModified` properties, plus the internal ability to read from filesystem. We usually get `File` objects from user input, like `<input>` or Drag'n'Drop events (`ondragend`).
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Объекты `FileReader` могут читать из файла или Blob в одном из трёх форматов:
- Строка (`readAsText`).
- `ArrayBuffer` (`readAsArrayBuffer`).
- URL в формате base64 (`readAsDataURL`).

<<<<<<< HEAD
Однако, во многих случаях нам не нужно читать содержимое файла. Как и в случае с Blob, мы можем создать короткий URL с помощью `URL.createObjectURL(file)` и использовать его в теге `<a>` или `<img>`. Таким образом, файл может быть загружен или показан в виде изображения, как часть canvas и т.д.
И если мы собираемся отправить `File` по сети, то это также легко, поскольку сетевой API, такой как `XMLHttpRequest` или `fetch`, изначально принимает объекты `File`.
=======
And if we're going to send a `File` over a network, that's also easy: network API like `XMLHttpRequest` or `fetch` natively accepts `File` objects.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
