# Promise API

<<<<<<< HEAD
В классе `Promise` есть 5 статических методов. Давайте познакомимся с ними.

## Promise.all

Допустим, нам нужно запустить множество промисов параллельно и дождаться, пока все они выполнятся.

Например, параллельно загрузить несколько файлов и обработать результат, когда он готов.
=======
There are 6 static methods in the `Promise` class. We'll quickly cover their use cases here.

## Promise.all

Let's say we want many promises to execute in parallel and wait until all of them are ready.

For instance, download several URLs in parallel and process the content once they are all done.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Для этого как раз и пригодится `Promise.all`.

Синтаксис:

```js
let promise = Promise.all([...промисы...]);
```

<<<<<<< HEAD
Метод `Promise.all` принимает массив промисов (может принимать любой перебираемый объект, но обычно используется массив) и возвращает новый промис.

Новый промис завершится, когда завершится весь переданный список промисов, и его результатом будет массив их результатов.
=======
`Promise.all` takes an array of promises (it technically can be any iterable, but is usually an array) and returns a new promise.

The new promise resolves when all listed promises are settled, and the array of their results becomes its result.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Например, `Promise.all`, представленный ниже, выполнится спустя 3 секунды, его результатом будет массив `[1, 2, 3]`:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // когда все промисы выполнятся, результат будет 1,2,3
// каждый промис даёт элемент массива
```

<<<<<<< HEAD
Обратите внимание, что порядок элементов массива в точности соответствует порядку исходных промисов. Даже если первый промис будет выполняться дольше всех, его результат всё равно будет первым в массиве.
=======
Please note that the order of the resulting array members is the same as in its source promises. Even though the first promise takes the longest time to resolve, it's still first in the array of results.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Часто применяемый трюк - пропустить массив данных через map-функцию, которая для каждого элемента создаст задачу-промис, и затем обернёт получившийся массив в `Promise.all`.

Например, если у нас есть массив ссылок, то мы можем загрузить их вот так:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// Преобразуем каждый URL в промис, возвращённый fetch
let requests = urls.map(url => fetch(url));

// Promise.all будет ожидать выполнения всех промисов
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

<<<<<<< HEAD
А вот пример побольше, с получением информации о пользователях GitHub по их логинам из массива (мы могли бы получать массив товаров по их идентификаторам, логика та же):
=======
A bigger example with fetching user information for an array of GitHub users by their names (we could fetch an array of goods by their ids, the logic is identical):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // все промисы успешно завершены
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // покажет 200 для каждой ссылки
    }

    return responses;
  })
<<<<<<< HEAD
  // преобразовать массив ответов response в response.json(),
  // чтобы прочитать содержимое каждого
=======
  // map array of responses into an array of response.json() to read their content
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  .then(responses => Promise.all(responses.map(r => r.json())))
  // все JSON-ответы обработаны, users - массив с результатами
  .then(users => users.forEach(user => alert(user.name)));
```

**Если любой из промисов завершится с ошибкой, то промис, возвращённый `Promise.all`, немедленно завершается с этой ошибкой.**

Например:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Ошибка!
```

<<<<<<< HEAD
Здесь второй промис завершится с ошибкой через 2 секунды. Это приведёт к немедленной ошибке в `Promise.all`, так что выполнится `.catch`: ошибка этого промиса становится ошибкой всего `Promise.all`.
=======
Here the second promise rejects in two seconds. That leads to an immediate rejection of `Promise.all`, so `.catch` executes: the rejection error becomes the outcome of the entire `Promise.all`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```warn header="В случае ошибки, остальные результаты игнорируются"
Если один промис завершается с ошибкой, то весь `Promise.all` завершается с ней, полностью забывая про остальные промисы в списке. Их результаты игнорируются.

<<<<<<< HEAD
Например, если сделано несколько вызовов `fetch`, как в примере выше, и один не прошёл, то остальные будут всё ещё выполняться, но `Promise.all` за ними уже не смотрит. Скорее всего, они так или иначе завершатся, но их результаты будут проигнорированы.
=======
For example, if there are multiple `fetch` calls, like in the example above, and one fails, the others will still continue to execute, but `Promise.all` won't watch them anymore. They will probably settle, but their results will be ignored.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`Promise.all` ничего не делает для их отмены, так как в промисах вообще нет концепции "отмены". В главе <info:fetch-abort> мы рассмотрим `AbortController`, который помогает с этим, но он не является частью Promise API.
```

````smart header="`Promise.all(iterable)` разрешает передавать не-промисы в `iterable` (перебираемом объекте)"
Обычно, `Promise.all(...)` принимает перебираемый объект промисов (чаще всего массив). Но если любой из этих объектов не является промисом, он передаётся в итоговый массив "как есть".

Например, здесь результат: `[1, 2, 3]`

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```

Таким образом, мы можем передавать уже готовые значения, которые не являются промисами, в `Promise.all`, иногда это бывает удобно.
````

## Promise.allSettled

[recent browser="new"]

<<<<<<< HEAD
`Promise.all` завершается с ошибкой, если она возникает в любом из переданных промисов. Это подходит для ситуаций "всё или ничего", когда нам нужны *все* результаты для продолжения:
=======
`Promise.all` rejects as a whole if any promise rejects. That's good for "all or nothing" cases, when we need *all* results successful to proceed:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // методу render нужны результаты всех fetch
```

<<<<<<< HEAD
Метод `Promise.allSettled` всегда ждёт завершения всех промисов. В массиве результатов будет
=======
`Promise.allSettled` just waits for all promises to settle, regardless of the result. The resulting array has:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- `{status:"fulfilled", value:результат}` для успешных завершений,
- `{status:"rejected", reason:ошибка}` для ошибок.

Например, мы хотели бы загрузить информацию о множестве пользователей. Даже если в каком-то запросе ошибка, нас всё равно интересуют остальные.

Используем для этого `Promise.allSettled`:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

Массив `results` в строке `(*)` будет таким:
```js
[
  {status: 'fulfilled', value: ...объект ответа...},
  {status: 'fulfilled', value: ...объект ответа...},
  {status: 'rejected', reason: ...объект ошибки...}
]
```

<<<<<<< HEAD
То есть, для каждого промиса у нас есть его статус и значение/ошибка.
=======
So for each promise we get its status and `value/error`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

### Полифил

Если браузер не поддерживает `Promise.allSettled`, для него легко сделать полифил:

```js
<<<<<<< HEAD
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      status: 'fulfilled',
      value: value
    }), error => ({
      status: 'rejected',
      reason: error
    }))));
=======
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  };
}
```

<<<<<<< HEAD
В этом коде `promises.map` берёт аргументы, превращает их в промисы (на всякий случай) и добавляет каждому обработчик `.then`.

Этот обработчик превращает успешный результат `value` в `{state:'fulfilled', value: value}`, а ошибку `error` в `{state:'rejected', reason: error}`. Это как раз и есть формат результатов `Promise.allSettled`.

Затем мы можем использовать `Promise.allSettled`, чтобы получить результаты *всех* промисов, даже если при выполнении какого-то возникнет ошибка.

## Promise.race

Метод очень похож на `Promise.all`, но ждёт только первый промис, из которого берёт результат (или ошибку).
=======
In this code, `promises.map` takes input values, turns them into promises (just in case a non-promise was passed) with `p => Promise.resolve(p)`, and then adds `.then` handler to every one.

That handler turns a successful result `value` into `{status:'fulfilled', value}`, and an error `reason` into `{status:'rejected', reason}`. That's exactly the format of `Promise.allSettled`.

Now we can use `Promise.allSettled` to get the results of *all* given promises, even if some of them reject.

## Promise.race

Similar to `Promise.all`, but waits only for the first settled promise and gets its result (or error).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Синтаксис:

```js
let promise = Promise.race(iterable);
```

Например, тут результат будет `1`:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

Быстрее всех выполнился первый промис, он и дал результат. После этого остальные промисы игнорируются.

## Promise.any

Similar to `Promise.race`, but waits only for the first fulfilled promise and gets its result. If all of the given promises are rejected, then the returned promise is rejected with [`AggregateError`](mdn:js/AggregateError) - a special error object that stores all promise errors in its `errors` property.

The syntax is:

```js
let promise = Promise.any(iterable);
```

For instance, here the result will be `1`:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

The first promise here was fastest, but it was rejected, so the second promise became the result. After the first fulfilled promise "wins the race", all further results are ignored.

Here's an example when all promises fail:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error
});
```

As you can see, error objects for failed promises are available in the `errors` property of the `AggregateError` object.

## Promise.resolve/reject

<<<<<<< HEAD
Методы `Promise.resolve` и `Promise.reject` редко используются в современном коде, так как синтаксис `async/await` (мы рассмотрим его [чуть позже](info:async-await)) делает его, в общем-то, не нужным.

Мы рассмотрим их здесь для полноты картины, а также для тех, кто по каким-то причинам не может использовать `async/await`.

- `Promise.resolve(value)` создаёт успешно выполненный промис с результатом `value`.
=======
Methods `Promise.resolve` and `Promise.reject` are rarely needed in modern code, because `async/await` syntax (we'll cover it [a bit later](info:async-await)) makes them somewhat obsolete.

We cover them here for completeness and for those who can't use `async/await` for some reason.

### Promise.resolve

`Promise.resolve(value)` creates a resolved promise with the result `value`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

То же самое, что:

```js
let promise = new Promise(resolve => resolve(value));
```

Этот метод используют для совместимости: когда ожидается, что функция возвратит именно промис.

<<<<<<< HEAD
Например, функция `loadCached` ниже загружает URL и запоминает (кеширует) его содержимое. При будущих вызовах с тем же URL он тут же читает предыдущее содержимое из кеша, но использует `Promise.resolve`, чтобы сделать из него промис, для того, чтобы возвращаемое значение всегда было промисом:
=======
For example, the `loadCached` function below fetches a URL and remembers (caches) its content. For future calls with the same URL it immediately gets the previous content from cache, but uses `Promise.resolve` to make a promise of it, so the returned value is always a promise:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

Мы можем писать `loadCached(url).then(…)`, потому что функция `loadCached` всегда возвращает промис. Мы всегда можем использовать `.then` после `loadCached`. Это и есть цель использования `Promise.resolve` в строке `(*)`.

### Promise.reject

<<<<<<< HEAD
- `Promise.reject(error)` создаёт промис, завершённый с ошибкой `error`.
=======
`Promise.reject(error)` creates a rejected promise with `error`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

То же самое, что:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

На практике этот метод почти никогда не используется.

## Итого

<<<<<<< HEAD
Мы ознакомились с пятью статическими методами класса `Promise`:

1. `Promise.all(promises)` -- ожидает выполнения всех промисов и возвращает массив с результатами. Если любой из указанных промисов вернёт ошибку, то результатом работы `Promise.all` будет эта ошибка, результаты остальных промисов будут игнорироваться.
2. `Promise.allSettled(promises)` (добавлен недавно) -- ждёт, пока все промисы завершатся и возвращает их результаты в виде массива с объектами, у каждого объекта два свойства:
    - `state`: `"fulfilled"`, если выполнен успешно или `"rejected"`, если ошибка,
    - `value` - результат, если успешно или `reason` - ошибка, если нет.
3. `Promise.race(promises)` -- ожидает первый выполненный промис, который становится его результатом, остальные игнорируются.
4. `Promise.resolve(value)` -- возвращает успешно выполнившийся промис с результатом `value`.
5. `Promise.reject(error)` -- возвращает промис с ошибкой `error`.

Из всех перечисленных методов, самый часто используемый - это, пожалуй, `Promise.all`.
=======
There are 6 static methods of `Promise` class:

1. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of `Promise.all`, and all other results are ignored.
2. `Promise.allSettled(promises)` (recently added method) -- waits for all promises to settle and returns their results as an array of objects with:
    - `status`: `"fulfilled"` or `"rejected"`
    - `value` (if fulfilled) or `reason` (if rejected).
3. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.
4. `Promise.any(promises)` (recently added method) -- waits for the first promise to fulfill, and its result becomes the outcome. If all of the given promises are rejected, [`AggregateError`](mdn:js/AggregateError) becomes the error of `Promise.any`.
5. `Promise.resolve(value)` -- makes a resolved promise with the given value.
6. `Promise.reject(error)` -- makes a rejected promise with the given error.

Of all these, `Promise.all` is probably the most common in practice.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
