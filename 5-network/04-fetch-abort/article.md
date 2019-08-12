
# Fetch: Прерывание запроса

<<<<<<< HEAD
Как мы знаем, метод `fetch` возвращает промис. А в JavaScript в целом нет понятия "отмены" промиса. Как же прервать запрос `fetch`?

Для таких целей существует специальный встроенный объект: `AbortController`, который можно использовать отмены не только `fetch`, но и других асинхронных задач.
=======
As we know, `fetch` returns a promise. And JavaScript generally has no concept of "aborting" a promise. So how can we abort a `fetch`?

There's a special built-in object for such purposes: `AbortController`, that can be used to abort not only `fetch`, but other asynchronous tasks as well.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Использовать его достаточно просто:

- Шаг 1: создаём контроллер:

    ```js
    let controller = new AbortController();
    ```

<<<<<<< HEAD
    Контроллер `controller` - чрезвычайно простой объект.

    - Он имеет единственный метод `abort()` и единственное свойство `signal`.
    - При вызове `abort()`:
        - генерируется событие с именем `abort` на объекте `controller.signal`
        - свойство `controller.signal.aborted` становится равным `true`.

    Все, кто хочет узнать о вызове `abort()`, ставят обработчики на `controller.signal`, чтобы отслеживать его.

    Вот так (пока без `fetch`):
=======
    A controller is an extremely simple object.

    - It has a single method `abort()`, and a single property `signal`.
    - When `abort()` is called:
        - `abort` event triggers on `controller.signal`
        - `controller.signal.aborted` property becomes `true`.

    All parties interested to learn about `abort()` call set listeners on `controller.signal` to track it.

    Like this (without `fetch` yet):
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

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

<<<<<<< HEAD
    Метод `fetch` умеет работать с `AbortController`, он слушает событие `abort` на `signal`.
=======
    The `fetch` method knows how to work with `AbortController`, it listens to `abort` on `signal`.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

- Шаг 3: чтобы прервать выполнение `fetch`, вызовите `controller.abort()`:

    ```js
    controller.abort();
    ```

    Вот и всё: `fetch` получает событие из `signal` и прерывает запрос.

<<<<<<< HEAD
Когда `fetch` отменяется, его промис завершается с ошибкой `AbortError`, поэтому мы должны обработать её, например, в `try..catch`:
=======
When a fetch is aborted, its promise rejects with an error `AbortError`, so we should handle it, e.g. in `try..catch`:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js run async
// прервать через 1 секунду
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // обработь ошибку от вызова abort()
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

<<<<<<< HEAD
// если откуда-то вызвать controller.abort(),
// то это прервёт все вызовы fetch
```

Если у нас есть собственные асинхронные задачи, отличные от `fetch`, мы можем использовать один `AbortController` для их остановки вместе с `fetch`.

Нужно лишь слушать его событие `abort`:
=======
// if controller.abort() is called from elsewhere,
// it aborts all fetches
```

If we have our own asynchronous jobs, different from `fetch`, we can use a single `AbortController` to stop those, together with fetches.

We just need to listen to its `abort` event:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
let urls = [...];
let controller = new AbortController();

<<<<<<< HEAD
let ourJob = new Promise((resolve, reject) => { // наша задача
=======
let ourJob = new Promise((resolve, reject) => { // our task
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
  ...
  controller.signal.addEventListener('abort', reject);
});

<<<<<<< HEAD
let fetchJobs = urls.map(url => fetch(url, { // запросы fetch
  signal: controller.signal
}));

// ожидать выполнения нашей задачи и всех запросов
let results = await Promise.all([...fetchJobs, ourJob]);

// вызов откуда-нибудь ещё:
// controller.abort() прервёт все вызовы fetch и наши задачи
```

Так что `AbortController` существует не только для `fetch`, это универсальный объект для отмены асинхронных задач, в `fetch` встроена интеграция с ним.
=======
let fetchJobs = urls.map(url => fetch(url, { // fetches
  signal: controller.signal
}));

// Wait for fetches and our task in parallel
let results = await Promise.all([...fetchJobs, ourJob]);

// if controller.abort() is called from elsewhere,
// it aborts all fetches and ourJob
```

So `AbortController` is not only for `fetch`, it's a universal object to abort asynchronous tasks, and `fetch` has built-in integration with it.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
