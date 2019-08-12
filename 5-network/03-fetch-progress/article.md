
# Fetch: ход загрузки

Метод `fetch` позволяет отслеживать процесс *получения* данных.

Заметим, на данный момент в `fetch` нет способа отслеживать процесс *отправки*. Для этого используйте [XMLHttpRequest](info:xmlhttprequest), позже мы его рассмотрим.

<<<<<<< HEAD
Чтобы отслеживать ход загрузки данных с сервера, можно использовать свойство `response.body`. Это `ReadableStream` ("поток для чтения") -- особый объект, который предоставляет тело ответа по частям, по мере поступления. Потоки для чтения описаны в спецификации [Streams API](https://streams.spec.whatwg.org/#rs-class).
=======
To track download progress, we can use `response.body` property. It's  `ReadableStream` -- a special object that provides body chunk-by-chunk, as it comes. Readable streams are described in the [Streams API](https://streams.spec.whatwg.org/#rs-class) specification.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

В отличие от `response.text()`, `response.json()` и других методов, `response.body` даёт полный контроль над процессом чтения, и мы можем подсчитать, сколько данных получено на каждый момент.

Вот примерный код, который читает ответ из `response.body`:

```js
// вместо response.json() и других методов
const reader = response.body.getReader();

// бесконечный цикл, пока идёт загрузка
while(true) {
  // done становится true в последнем фрагменте
  // value - Uint8Array из байтов каждого фрагмента
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Получено ${value.length} байт`)
}
```

<<<<<<< HEAD
Результат вызова `await reader.read()` - это объект с двумя свойствами:
- **`done`** -- `true`, когда чтение закончено, иначе `false`.
- **`value`** -- типизированный массив данных ответа `Uint8Array`.

```smart
Streams API также описывает асинхронный перебор по `ReadableStream`, при помощи цикла `for await..of`, но он пока слабо поддерживается (см. [задачи для браузеров](https://github.com/whatwg/streams/issues/778#issuecomment-461341033)), поэтому используем цикл `while`.
```

Мы получаем новые фрагмента данных в цикле, пока загрузка не завершится, то есть пока `done` не станет `true`.

Чтобы отслеживать процесс загрузки, нам нужно при получении очередного фрагмента прибавлять его длину `value` к счетчику.

Вот полный рабочий пример, который получает ответ сервера и в процессе получения выводит в консоли длину полученных данных:
=======
The result of `await reader.read()` call is an object with two properties:
- **`done`** -- `true` when the reading is complete, otherwise `false`.
- **`value`** -- a typed array of bytes: `Uint8Array`.

```smart
Streams API also describes asynchronous iteration over `ReadableStream` with `for await..of` loop, but it's not yet widely supported (see [browser issues](https://github.com/whatwg/streams/issues/778#issuecomment-461341033)), so we use `while` loop.
```

We receive response chunks in the loop, until the loading finishes, that is: until `done` becomes `true`.

To log the progress, we just need for every received fragment `value` to add its length to the counter.

Here's the full working example that gets the response and logs the progress in console, more explanations to follow:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js run async
// Шаг 1: начинаем загрузку fetch, получаем поток для чтения
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// Шаг 2: получаем длину содержимого ответа
const contentLength = +response.headers.get('Content-Length');

<<<<<<< HEAD
// Шаг 3: считываем данные:
let receivedLength = 0; // количество байт, полученных на данный момент
let chunks = []; // массив полученных двоичных фрагментов (составляющих тело ответа)
=======
// Step 3: read the data
let receivedLength = 0; // received that many bytes at the moment
let chunks = []; // array of received binary chunks (comprises the body)
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Получено ${receivedLength} из ${contentLength}`)
}

// Шаг 4: соединим фрагменты в общий типизированный массив Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
	chunksAll.set(chunk, position); // (4.2)
	position += chunk.length;
}

// Шаг 5: декодируем Uint8Array обратно в строку
let result = new TextDecoder("utf-8").decode(chunksAll);

// Готово!
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

Разберёмся, что здесь произошло:

1. Мы обращаемся к `fetch` как обычно, но вместо вызова `response.json()` мы получаем доступ к потоку чтения `response.body.getReader()`.

<<<<<<< HEAD
    Обратите внимание, что мы не можем использовать одновременно оба эти метода для чтения одного и того же ответа: либо обычный метод `response.json()`, либо чтение потока `response.body`.
2. Ещё до чтения потока мы можем вычислить полную длину ответа из заголовка `Content-Length`.

    Он может быть нечитаемым при запросах на другой источник (подробнее в разделе <info:fetch-crossorigin>) и, в общем-то, серверу необязательно его устанавливать. Тем не менее, обычно длина указана.
3. Вызываем `await reader.read()` до окончания загрузки.

    Всё, что получили, мы складываем по "кусочкам" в массив `chunks`. Это важно, потому что после того, как ответ получен, мы уже не сможем "перечитать" его, используя `response.json()` или любой другой способ (попробуйте - будет ошибка).
4. В самом конце у нас типизированный массив -- `Uint8Array`. В нём находятся фрагменты данных. Нам нужно их склеить, чтобы получить строку. К сожалению, для этого нет специального метода, но можно сделать, например, так:
    1. Создаём `chunksAll = new Uint8Array(receivedLength)` -- массив того же типа заданной длины.
    2. Используем `.set(chunk, position)` для копирования каждого фрагмента друг за другом в него.
5. Наш результат теперь хранится в `chunksAll`. Это не строка, а байтовый массив.

    Чтобы получить именно строку, надо декодировать байты. Встроенный объект [TextDecoder](info:text-decoder) как раз этим и занимается. Потом мы можем, если необходимо, преобразовать строку в данные с помощью `JSON.parse`.

    Что если результат нам нужен в бинарном виде вместо строки? Это ещё проще. Замените шаги 4 и 5 на создание единого `Blob` из всех фрагментов:
=======
    Please note, we can't use both these methods to read the same response: either use a reader or a response method to get the result.
2. Prior to reading, we can figure out the full response length from the `Content-Length` header.

    It may be absent for cross-origin requests (see chapter <info:fetch-crossorigin>) and, well, technically a server doesn't have to set it. But usually it's at place.
3. Call `await reader.read()` until it's done.

    We gather response chunks in the array `chunks`. That's important, because after the response is consumed, we won't be able to "re-read" it using `response.json()` or another way (you can try, there'll be an error).
4. At the end, we have `chunks` -- an array of `Uint8Array` byte chunks. We need to join them into a single result. Unfortunately, there's no single method that concatenates those, so there's some code to do that:
    1. We create `chunksAll = new Uint8Array(receivedLength)` -- a same-typed array with the combined length.
    2. Then use `.set(chunk, position)` method to copy each `chunk` one after another in it.
5. We have the result in `chunksAll`. It's a byte array though, not a string.

    To create a string, we need to interpret these bytes. The built-in [TextDecoder](info:text-decoder) does exactly that. Then we can `JSON.parse` it, if necessary.

    What if we need binary content instead of a string? That's even simpler. Replace steps 4 and 5 with a single line that creates a `Blob` from all chunks:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
    ```js
    let blob = new Blob(chunks);
    ```

В итоге у нас есть результат (строки или `Blob`, смотря что удобно) и отслеживание прогресса получения.

На всякий случай повторимся, что здесь мы рассмотрели, как отслеживать процесс получения данных с сервера, а не их отправки на сервер. Для отслеживания закачки у `fetch` пока нет способа.
