
# Fetch: прерывание запроса

Как мы знаем, метод `fetch` возвращает промис. А в JavaScript в целом нет понятия "отмены" промиса. Как же прервать запрос `fetch`?

Для таких целей существует специальный встроенный объект: `AbortController`, который можно использовать для отмены не только `fetch`, но и других асинхронных задач.

Использовать его достаточно просто:

- Шаг 1: создаём контроллер:

    ```js
    let controller = new AbortController();
    ```

    Контроллер `controller` - чрезвычайно простой объект.

    - Он имеет единственный метод `abort()` и единственное свойство `signal`.
    - При вызове `abort()`:
        - генерируется событие с именем `abort` на объекте `controller.signal`
        - свойство `controller.signal.aborted` становится равным `true`.

    Все, кто хочет узнать о вызове `abort()`, ставят обработчики на `controller.signal`, чтобы отслеживать его.

    Вот так (пока без `fetch`):

    ```js run
    let controller = new AbortController();
    let signal = controller.signal;

    // срабатывает при вызове controller.abort()
    signal.addEventListener('abort', () => alert("отмена!"));

    controller.abort(); // отмена!

    alert(signal.aborted); // true
    ```

- Шаг 2: передайте свойство `signal` опцией в метод `fetch`:

    ```js
    let controller = new AbortController();
    fetch(url, {
      signal: controller.signal
    });
    ```

    Метод `fetch` умеет работать с `AbortController`, он слушает событие `abort` на `signal`.

- Шаг 3: чтобы прервать выполнение `fetch`, вызовите `controller.abort()`:

    ```js
    controller.abort();
    ```

    Вот и всё: `fetch` получает событие из `signal` и прерывает запрос.

Когда `fetch` отменяется, его промис завершается с ошибкой `AbortError`, поэтому мы должны обработать её, например, в `try..catch`:

```js run async
// прервать через 1 секунду
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // обработать ошибку от вызова abort()
    alert("Прервано!");
  } else {
    throw err;
  }
}
```

**`AbortController` - масштабируемый, он позволяет отменить несколько вызовов `fetch` одновременно.**

Например, здесь мы запрашиваем много URL параллельно, и контроллер прерывает их все:

```js
let urls = [...]; // список URL для параллельных fetch

let controller = new AbortController();

let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// если откуда-то вызвать controller.abort(),
// то это прервёт все вызовы fetch
```

Если у нас есть собственные асинхронные задачи, отличные от `fetch`, мы можем использовать один `AbortController` для их остановки вместе с `fetch`.

Нужно лишь слушать его событие `abort`:

```js
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => { // наша задача
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, { // запросы fetch
  signal: controller.signal
}));

// ожидать выполнения нашей задачи и всех запросов
let results = await Promise.all([...fetchJobs, ourJob]);

// вызов откуда-нибудь ещё:
// controller.abort() прервёт все вызовы fetch и наши задачи
```

Так что `AbortController` существует не только для `fetch`, это универсальный объект для отмены асинхронных задач, в `fetch` встроена интеграция с ним.
