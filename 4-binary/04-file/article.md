# File и FileReader

Объект [File](https://www.w3.org/TR/FileAPI/#dfn-file) наследуется от объекта `Blob`, но также дополняется способностью взаимодействовать с файловой системой.

Есть два способа его получить.

Во-первых, есть конструктор, похожий на `Blob`:

```js
new File(fileParts, fileName, [options])
```

- **`fileParts`** -- массив значений Blob/BufferSource/String, такой же как `Blob`.
- **`fileName`** -- строка имени файла.
- **`options`** -- необязательный объект:
    - **`lastModified`** -- timestamp (целочисленная дата) последнего изменения.

Во-вторых, чаще всего мы получаем файл из `<input type="file">` или через перетаскивание с помощью мыши, или других интерфейсов браузера. Затем этот файл получает нужную информацию из ОС.

Например:

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
Через `<input>` можно выбрать несколько файлов, поэтому `input.files` -- массивоподобный объект выбранных файлов. Здесь у нас только один файл, поэтому мы просто берём `input.files[0]`.
```

## FileReader

Единственная цель объекта [FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) заключается в чтении информации из объекта `Blob` и, следовательно, `File`.

В основе лежат события, так как чтение с диска может занять некоторое время.

Конструктор:

```js
let reader = new FileReader(); // без аргументов
```
    
Основные методы:

- **`readAsArrayBuffer(blob)`** -- считать данные как `ArrayBuffer`
- **`readAsText(blob, [encoding])`** -- считать данные как строку (кодировка по умолчанию: `utf-8`)
- **`readAsDataURL(blob)`** -- считать данные в формате base64 для URL.
- **`abort()`** -- отменить операцию.

В процессе чтения можно "слушать" следующие события:
- `loadstart` -- чтение начато.
- `progress` -- срабатывает во время чтения данных.
- `load` -- нет ошибок, чтение окончено.
- `abort` -- вызван `abort()`.
- `error` -- произошла ошибка.
- `loadend` -- загрузка закончилась успешно или нет.

Когда чтение закончено, мы сможем получить доступ к его результату следующим образом:
- `reader.result` результат чтения (если оно успешно)
- `reader.error` объект ошибки (при неудаче).

Наиболее часто используемые события это, конечно же, `load` и `error`.

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

```smart header="`FileReader` для Blob"
Как упоминалось в главе <info:blob>, `FileReader` работает для любых объектов Blob, а не только для файлов.

Поэтому мы можем использовать его для преобразования Blob в другой формат:
- `readAsArrayBuffer(blob)` -- в `ArrayBuffer`,
- `readAsText(blob, [encoding])` -- в строку (альтернатива `TextDecoder`),
- `readAsDataURL(blob)` -- в формат base64 для URL.
```


```smart header="`FileReaderSync` доступен только для веб-воркеров"
Для веб-воркеров существует также и синхронный вариант `FileReader`, именуемый [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync).

Его методы считывания `read*` не генерируют события, а скорее возвращают результат, как это делают обычные функции.

Но это только внутри веб-воркера, поскольку задержки и зависания в веб-воркерах менее важны, они не влияют на страницу.
```

## Итого

`File` объекты наследуют от `Blob`.

Помимо методов и свойств `Blob`, объекты `File` также имеют свойства `fileName` и `lastModified` плюс внутреннюю возможность чтения из файловой системы. Обычно мы получаем объекты `File` из пользовательского ввода, например, через `<input>` или перетаскиванием с помощью мыши.

Объекты `FileReader` могут читать из файла или Blob в одном из трёх форматов:
- Строка (`readAsText`).
- `ArrayBuffer` (`readAsArrayBuffer`).
- Данные в формате base64 для URL (`readAsDataURL`).

Однако, во многих случаях нам не нужно читать содержимое файла. Как и в случае с Blob, мы можем создать короткий URL с помощью `URL.createObjectURL(file)` и использовать его в теге `<a>` или `<img>`. Таким образом, файл может быть загружен или показан в виде изображения, как часть canvas и т.д.
И если мы собираемся отправить `File` по сети, то это также легко, поскольку сетевой API, такой как `XMLHttpRequest` или `fetch`, изначально принимает объекты `File`.