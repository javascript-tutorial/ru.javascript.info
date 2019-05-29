# File и FileReader

Объект [File](https://www.w3.org/TR/FileAPI/#dfn-file) наследуется от объекта `Blob`, но дополняется возможностями подобных файловых систем.

Есть два способа его получить.

Во-первых, есть конструктор, похожий на `Blob`:

```js
new File(fileParts, fileName, [options])
```

- **`fileParts`** -- массив значений Blob/BufferSource/String, такой же как `Blob`.
- **`fileName`** -- строка имени файла.
- **`options`** -- необязательный объект:
    - **`lastModified`** -- timestamp (целочисленная дата) последнего изменения.

Во-вторых, чаще всего мы получаем файл из `<input type="file">`, или drag'n'drop, или других интерфейсов браузера. Затем этот файл получает нужную информацию из ОС.

Например:

```html run
<input type="file" onchange="showFile(this)">

<script>
function showFile(input) {
  let file = input.files[0];

  alert(`File name: ${file.name}`); // например my.png
  alert(`Last modified: ${file.lastModified}`); // например 1552830408824
}
</script>
```

```smart
Через `<input>` можно выбрать несколько файлов, поэтому `input.files` -- массивоподобный объект выбранных файлов. Здесь у нас только один файл, поэтому мы просто берем `input.files[0]`.
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
- **`readAsDataURL(blob)`** -- считать данные как base64 (data: URL).
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

Поэтому, мы можем использовать его для преобразования Blob в другой формат:
- `readAsArrayBuffer(blob)` -- в `ArrayBuffer`,
- `readAsText(blob, [encoding])` -- в строку (альтернатива `TextDecoder`),
- `readAsDataURL(blob)` -- в base64 (data: URL).
```


```smart header="`FileReaderSync` доступен только для Web Worker'ов"
Для Web Worker'ов существует также и синхронный вариант `FileReader`, именуемый [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync).

Его методы считывания `read*` не генерируют события, а скорее возвращают результат, как это делают обычные функции.

Но это только внутри Web Worker'а, поскольку задержки и зависания в Web Worker'ах менее важны, они не влияют на страницу.
```

## Итого

`File` объекты наследуемые от `Blob`.

Помимо методов и свойств `Blob`, объекты `File` также имеют свойства `fileName` и `lastModified`, плюс внутреннюю возможность чтения из файловой системы. Обычно мы получаем `File` объекты из пользовательского ввода, такого как `<input>` или drag'n'drop.

Объекты `FileReader` могут читать из файла или Blob, в одном из трех форматов:
- Строка (`readAsText`).
- `ArrayBuffer` (`readAsArrayBuffer`).
- Data: url, c кодировкой base-64 (`readAsDataURL`).

Однако во многих случаях нам не нужно читать содержимое файла. Как и в случае с Blob, мы можем создать короткий url с помощью `URL.createObjectURL(file)` и назначить его для `<a>` или `<img>`. Таким образом, файл может быть загружен или показан в виде изображения, как часть canvas и т.д.
И если мы собираемся отправить `File` по сети, это также легко, поскольку сетевой API, такой как `XMLHttpRequest` или `fetch`, изначально принимает объекты `File`.