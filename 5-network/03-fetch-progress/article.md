
# Fetch: ход загрузки

<<<<<<< HEAD:5-network/02-fetch-progress/article.md
Метод `fetch` позволяет отслеживать процесс получения данных. 

Заметим, на данный момент в `fetch` нет способа отслеживать отправку. Для этого используйте [XMLHttpRequest](info:xmlhttprequest).

Чтобы отслеживать ход загрузки данных с сервера, можно использовать свойство `response.body`. Это так называемый "поток для чтения" (readable stream) -- особый объект, который предоставляет тело ответа по частям, по мере поступления, так что мы можем увидеть, сколько уже получено. 

Вот пример кода, который использует этот объект для чтения ответа:
=======
The `fetch` method allows to track *download* progress.

Please note: there's currently no way for `fetch` to track *upload* progress. For that purpose, please use [XMLHttpRequest](info:xmlhttprequest), we'll cover it later.

To track download progress, we can use `response.body` property. It's a "readable stream" -- a special object that provides body chunk-by-chunk, as it comes.

Unlike `response.text()`, `response.json()` and other methods, `response.body` gives full control over the reading process, and we can see how much is consumed at the moment.

Here's the sketch of code that reads the reponse from `response.body`:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/03-fetch-progress/article.md

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

<<<<<<< HEAD:5-network/02-fetch-progress/article.md
Таким образом, цикл идёт, пока `await reader.read()` возвращает в ответе данные по частям.

У возвращаемого фрагмента (chunk) есть два свойства:
- **`done`** -- `true`, когда чтение закончено.
- **`value`** -- типизированный массив байтов: `Uint8Array`.

Чтобы пошагово отследить процесс, нам нужно всего лишь посчитать получившиеся фрагменты.
=======
So, we read response chunks in the loop, while `await reader.read()` returns them. When it's done, no more data, so we're done.

The result of `await reader.read()` call is an object with two properties:
- **`done`** -- true when the reading is complete.
- **`value`** -- a typed array of bytes: `Uint8Array`.

To log progress, we just need for every `value` add its length to the counter.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/03-fetch-progress/article.md

Вот полный код, где в процессе получения ответа от сервера мы фиксируем, сколько данных пришло из каждой части.

```js run async
// Шаг 1: начинаем обработку с помощью fetch и достаём ссылку на поток для чтения
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// Шаг 2: получаем длину контента
const contentLength = +response.headers.get('Content-Length');

// Шаг 3: считываем данные:
let receivedLength = 0; // длину на данный момент
let chunks = []; // массив полученных двоичных фрагментов (в нём будет тело ответа)
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

    Обратите внимание, что мы не можем использовать одновременно оба эти метода для одного и того же ответа. Используйте либо обычный метод `response.json()`, либо чтение потока `response.body`.
2. Ещё до чтения потока мы можем вычислить полную длину ответа из заголовка `Content-Length`.

    Она может отсутствовать в кросс-доменных запросах  (подробнее в разделе <info:fetch-crossorigin>) и, в общем-то, серверу необязательно её устанавливать. Тем не менее, обычно длина указана.
3. Вызываем `await reader.read()` до окончания загрузки.

    Всё, что получили, мы складываем по "кусочкам" в массив. Это важно, потому что после того, как ответ получен, мы уже не сможем "перечитать" его, используя `response.json()` или любой другой способ (попробуйте - будет ошибка).
4. В самом конце у нас типизированный массив -- `Uint8Array`. В нём находятся фрагменты данных. Нам нужно их склеить, чтобы получить строку. К сожалению, для этого нет специального метода, но можно сделать, например, так:
    1. Создаём `new Uint8Array(receivedLength)` -- массив того же типа заданной длины.
    2. Используем `.set(chunk, position)` метод для копирования каждого фрагмента друг за другом в массив результатов.
5. Наш результат теперь хранится в `chunksAll`. Это не строка, а байтовый массив.

    Чтобы получить именно строку, надо декодировать байты. Встроенный метод [TextDecoder](info:text-decoder) как раз этим и занимается. Потом мы можем распарсить её с помощью `JSON.parse`.

<<<<<<< HEAD:5-network/02-fetch-progress/article.md
Что если результат нам нужен в бинарном виде, а не в JSON-формате? Это ещё проще. Вместо шагов 4 и 5, мы создаём объект `Blob`:
```js
let blob = new Blob(chunks);
```

На всякий случай повторимся, что здесь мы рассмотрели, как отслеживать процесс получения данных с сервера, а не их отправки на сервер. Как отследить отправку `fetch` - пока нет способа.
=======
    What if we need binary content instead of JSON? That's even simpler. Replace steps 4 and 5 with a single call to a blob from all chunks:
    ```js
    let blob = new Blob(chunks);
    ```

At we end we have the result (as a string or a blob, whatever is convenient), and progress-tracking in the process.

Once again, please note, that's not for *upload* progress (no way now with `fetch`), only for *download* progress.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/03-fetch-progress/article.md
