
# Fetch: прерывание запроса

<<<<<<< HEAD
Как мы знаем, метод `fetch` возвращает промис. А в JavaScript в целом нет понятия "отмены" промиса. Как же прервать запрос `fetch`?

Для таких целей существует специальный встроенный объект: `AbortController`, который можно использовать для отмены не только `fetch`, но и других асинхронных задач.

Использовать его достаточно просто:

- Шаг 1: создаём контроллер:
=======
As we know, `fetch` returns a promise. And JavaScript generally has no concept of "aborting" a promise. So how can we cancel an ongoing `fetch`? E.g. if the user actions on our site indicate that the `fetch` isn't needed any more.

There's a special built-in object for such purposes: `AbortController`. It can be used to abort not only `fetch`, but other asynchronous tasks as well.

The usage is very straightforward:

## The AbortController object
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Create a controller:

<<<<<<< HEAD
    Контроллер `controller` - чрезвычайно простой объект.

    - Он имеет единственный метод `abort()` и единственное свойство `signal`.
    - При вызове `abort()`:
        - генерируется событие с именем `abort` на объекте `controller.signal`
        - свойство `controller.signal.aborted` становится равным `true`.

    Все, кто хочет узнать о вызове `abort()`, ставят обработчики на `controller.signal`, чтобы отслеживать его.

    Вот так (пока без `fetch`):
=======
```js
let controller = new AbortController();
```

A controller is an extremely simple object.

- It has a single method `abort()`,
- And a single property `signal` that allows to set event listeners on it.

When `abort()` is called:
- `controller.signal` emits the `"abort"` event.
- `controller.signal.aborted` property becomes `true`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Generally, we have two parties in the process: 
1. The one that performs a cancelable operation, it sets a listener on `controller.signal`.
2. The one that cancels: it calls `controller.abort()` when needed.

<<<<<<< HEAD
    // срабатывает при вызове controller.abort()
    signal.addEventListener('abort', () => alert("отмена!"));

    controller.abort(); // отмена!
=======
Here's the full example (without `fetch` yet):

```js run
let controller = new AbortController();
let signal = controller.signal;

// The party that performs a cancelable operation 
// gets the "signal" object
// and sets the listener to trigger when controller.abort() is called
signal.addEventListener('abort', () => alert("abort!"));
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

// The other party, that cancels (at any point later):
controller.abort(); // abort!

<<<<<<< HEAD
- Шаг 2: передайте свойство `signal` опцией в метод `fetch`:
=======
// The event triggers and signal.aborted becomes true
alert(signal.aborted); // true
```
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

As we can see, `AbortController` is just a mean to pass `abort` events when `abort()` is called on it.

<<<<<<< HEAD
    Метод `fetch` умеет работать с `AbortController`, он слушает событие `abort` на `signal`.

- Шаг 3: чтобы прервать выполнение `fetch`, вызовите `controller.abort()`:
=======
We could implement the same kind of event listening in our code on our own, without the `AbortController` object.

But what's valuable is that `fetch` knows how to work with the `AbortController` object. It's integrated in it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Using with fetch

<<<<<<< HEAD
    Вот и всё: `fetch` получает событие из `signal` и прерывает запрос.

Когда `fetch` отменяется, его промис завершается с ошибкой `AbortError`, поэтому мы должны обработать её, например, в `try..catch`:
=======
To be able to cancel `fetch`, pass the `signal` property of an `AbortController` as a `fetch` option:

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

The `fetch` method knows how to work with `AbortController`. It will listen to `abort` events on `signal`.

Now, to abort, call `controller.abort()`:

```js
controller.abort();
```

We're done: `fetch` gets the event from `signal` and aborts the request.

When a fetch is aborted, its promise rejects with an error `AbortError`, so we should handle it, e.g. in `try..catch`.

Here's the full example with `fetch` aborted after 1 second:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
**`AbortController` - масштабируемый, он позволяет отменить несколько вызовов `fetch` одновременно.**

Например, здесь мы запрашиваем много URL параллельно, и контроллер прерывает их все:
=======
## AbortController is scalable

`AbortController` is scalable. It allows to cancel multiple fetches at once.

Here's a sketch of code that fetches many `urls` in parallel, and uses a single controller to abort them all:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let urls = [...]; // список URL для параллельных fetch

let controller = new AbortController();

// an array of fetch promises
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
// if controller.abort() is called from anywhere,
// it aborts all fetches
```

If we have our own asynchronous tasks, different from `fetch`, we can use a single `AbortController` to stop those, together with fetches.

We just need to listen to its `abort` event in our tasks:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
// вызов откуда-нибудь ещё:
// controller.abort() прервёт все вызовы fetch и наши задачи
```

Так что `AbortController` существует не только для `fetch`, это универсальный объект для отмены асинхронных задач, в `fetch` встроена интеграция с ним.
=======
// if controller.abort() is called from anywhere,
// it aborts all fetches and ourJob
```

## Summary

- `AbortController` is a simple object that generates an `abort` event on it's `signal` property when the `abort()` method is called (and also sets `signal.aborted` to `true`).
- `fetch` integrates with it: we pass the `signal` property as the option, and then `fetch` listens to it, so it's possible to abort the `fetch`.
- We can use `AbortController` in our code. The "call `abort()`" -> "listen to `abort` event" interaction is simple and universal. We can use it even without `fetch`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
