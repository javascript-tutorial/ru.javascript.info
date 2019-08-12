# Promise API

<<<<<<< HEAD
В классе `Promise` есть 5 статических методов. Давайте познакомимся с ними.
=======
There are 5 static methods in the `Promise` class. We'll quickly cover their use cases here.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

## Promise.all

Допустим, нам нужно запустить множество промисов параллельно и дождаться, пока все они выполнятся.

Например, параллельно загрузить несколько файлов и обработать результат, когда он готов.

Для этого как раз и пригодится `Promise.all`.

Синтаксис:

```js
let promise = Promise.all([...промисы...]);
```

<<<<<<< HEAD
Метод `Promise.all` принимает массив промисов (может принимать любой перебираемый объект, но обычно используется массив) и возвращает новый промис.

Новый промис завершится, когда завершится весь переданный список промисов, и его результатом будет массив их результатов.
=======
`Promise.all` takes an array of promises (technically can be any iterable, but usually an array) and returns a new promise.

The new promise resolves when all listed promises are settled and the array of their results becomes its result.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

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
Please note that the order of resulting array members is the same as source promises. Even though the first promise takes the longest time to resolve, it's still first in the array of results.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

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

А вот пример побольше, с получением информации о пользователях GitHub по их логинам из массива (мы могли бы получать массив товаров по их идентификаторам, логика та же):

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
<<<<<<< HEAD
    // все промисы успешно завершены
=======
    // all responses are resolved successfully
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // покажет 200 для каждой ссылки
    }

    return responses;
  })
  // преобразовать массив ответов response в response.json(),
  // чтобы прочитать содержимое каждого
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

Здесь второй промис завершится с ошибкой через 2 секунды. Это приведёт к немедленной ошибке в `Promise.all`, так что выполнится `.catch`: ошибка этого промиса становится ошибкой всего `Promise.all`.

```warn header="В случае ошибки, остальные результаты игнорируются"
Если один промис завершается с ошибкой, то весь `Promise.all` завершается с ней, полностью забывая про остальные промисы в списке. Их результаты игнорируются.

Например, если сделано несколько вызовов `fetch`, как в примере выше, и один не прошёл, то остальные будут всё ещё выполняться, но `Promise.all` за ними уже не смотрит. Скорее всего, они так или иначе завершатся, но их результаты будут проигнорированы.

`Promise.all` ничего не делает для их отмены, так как в промисах вообще нет концепии "отмены". В главе <info:fetch-abort> мы рассмотрим `AbortController`, который помогает с этим, но он не является частью Promise API.
```

<<<<<<< HEAD
````smart header="`Promise.all(iterable)` разрешает передавать не-промисы в `iterable` (перебираемом объекте)"
Обычно, `Promise.all(...)` принимает перебираемый объект промисов (чаще всего массив). Но если любой из этих объектов не является промисом, он передаётся в итоговый массив "как есть".
=======
````smart header="`Promise.all(iterable)` allows non-promise \"regular\" values in `iterable`"
Normally, `Promise.all(...)` accepts an iterable (in most cases an array) of promises. But if any of those objects is not a promise, it's passed to the resulting array "as is".
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

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
`Promise.all` rejects as a whole if any promise rejects. That's good for "all or nothing" cases, when we need *all* results to go on:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
<<<<<<< HEAD
]).then(render); // методу render нужны результаты всех fetch
```

Метод `Promise.allSettled` всегда ждёт завершения всех промисов. В массиве результатов будет
=======
]).then(render); // render method needs results of all fetches
```

`Promise.allSettled` waits for all promises to settle. The resulting array has:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

- `{status:"fulfilled", value:результат}` для успешных завершений,
- `{status:"rejected", reason:ошибка}` для ошибок.

<<<<<<< HEAD
Например, мы хотели бы загрузить информацию о множестве пользователей. Даже если в каком-то запросе ошибка, нас всё равно интересуют остальные.
=======
For example, we'd like to fetch the information about multiple users. Even if one request fails, we're still interested in the others.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

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
То есть, для каждого промиса у нас его статус и значение/ошибка.
=======
So, for each promise we get its status and `value/error`.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

### Полифил

Если браузер не поддерживает `Promise.allSettled`, для него легко сделать полифил:

```js
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      state: 'fulfilled',
<<<<<<< HEAD
      value: value
    }), error => ({
      state: 'rejected',
      reason: error
=======
      value
    }), reason => ({
      state: 'rejected',
      reason
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
    }))));
  };
}
```

<<<<<<< HEAD
В этом коде `promises.map` берёт аргументы, превращает их в промисы (на всякий случай) и добавляет каждому обработчик `.then`.
=======
In this code, `promises.map` takes input values, turns into promises (just in case a non-promise was passed) with `p => Promise.resolve(p)`, and then adds `.then` handler to every one.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Этот обработчик превращает успешный результат `value` в `{state:'fulfilled', value: value}`, а ошибку `error` в `{state:'rejected', reason: error}`. Это как раз и есть формат результатов `Promise.allSettled`.

Затем мы можем использовать `Promise.allSettled`, чтобы получить результаты *всех* промисов, даже если при выполнении какого-то возникнет ошибка.

## Promise.race

<<<<<<< HEAD
Метод очень похож на `Promise.all`, но ждёт только первый промис, из которого берёт результат (или ошибку).
=======
Similar to `Promise.all`, but waits only for the first settled promise, and gets its result (or error).
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

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

<<<<<<< HEAD
Быстрее всех выполнился первый промис, он и дал результат. После этого остальные промисы игнорируются.

## Promise.resolve/reject

Методы `Promise.resolve` и `Promise.reject` редко используются в современном коде, так как синтаксис `async/await` (мы рассмотрим его [чуть позже](info:async-await)) делает его, вобщем-то, не нужным.

Мы рассмотрим их здесь для полноты картины, а также для тех, кто по каким-то причинам не может использовать `async/await`.

- `Promise.resolve(value)` создаёт успешно выполненный промис с результатом `value`.

То же самое, что:
=======
The first promise here was fastest, so it became the result. After the first settled promise "wins the race", all further results/errors are ignored.


## Promise.resolve/reject

Methods `Promise.resolve` and `Promise.reject` are rarely needed in modern code, because `async/await` syntax (we'll cover it in [a bit later](info:async-await)) makes them somewhat obsolete.

We cover them here for completeness, and for those who can't use `async/await` for some reason.

- `Promise.resolve(value)` creates a resolved promise with the result `value`.

Same as:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
let promise = new Promise(resolve => resolve(value));
```

<<<<<<< HEAD
Этот метод используют для совместимости: когда ожидается, что функция возвратит именно промис.

Например, функция `loadCached` ниже загружает URL и запоминает (кеширует) его содержимое. При будущих вызовах с тем же URL он тут же читает предыдущее содержимое из кеша, но использует `Promise.resolve`, чтобы сделать из него промис, для того, чтобы возвращаемое значение всегда было промисом:
=======
The method is used for compatibility, when a function is expected to return a promise.

For example, `loadCached` function below fetches URL and remembers (caches) its content. For future calls with the same URL it immediately gets the previous content from cache, but uses `Promise.resolve` to make a promise of it, so that the returned value is always a promise:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

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

<<<<<<< HEAD
Мы можем писать `loadCached(url).then(…)`, потому что функция `loadCached` всегда возвращает промис. Мы всегда можем использовать `.then` после `loadCached`. Это и есть цель использования `Promise.resolve` в строке `(*)`.

### Promise.reject

- `Promise.reject(error)` создаёт промис, завершённый с ошибкой `error`.

То же самое, что:
=======
We can write `loadCached(url).then(…)`, because the function is guaranteed to return a promise. We can always use `.then` after `loadCached`. That's the purpose of `Promise.resolve` in the line `(*)`.

### Promise.reject

- `Promise.reject(error)` creates a rejected promise with `error`.

Same as:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
let promise = new Promise((resolve, reject) => reject(error));
```

<<<<<<< HEAD
На практике этот метод почти никогда не используется.
=======
In practice, this method is almost never used.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

## Итого

Мы ознакомились с пятью статическими методами класса `Promise`:

<<<<<<< HEAD
1. `Promise.all(promises)` -- ожидает выполнения всех промисов и возвращает массив с результатами. Если любой из указанных промисов вернёт ошибку, то результатом работы `Promise.all` будет эта ошибка, результаты остальных промисов будут игнорироваться.
2. `Promise.allSettled(promises)` (добавлен недавно) -- ждёт, пока все промисы завершатся и возвращает их результаты в виде массива с объектами, у каждого объекта два свойства:
    - `state`: `"fulfilled"`, если выполнен успешно или `"rejected"`, если ошибка,
    - `value` - результат, если успешно или `reason` - ошибка, если нет.
3. `Promise.race(promises)` -- ожидает первый выполненный промис, который становится его результатом, остальные игнорируются.
4. `Promise.resolve(value)` -- возвращает успешно выполнившийся промис с результатом `value`.
5. `Promise.reject(error)` -- возвращает промис с ошибкой `error`.
=======
1. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, then it becomes the error of `Promise.all`, and all other results are ignored.
2. `Promise.allSettled(promises)` (recently added method) -- waits for all promises to settle and returns their results as array of objects with:
    - `state`: `"fulfilled"` or `"rejected"`
    - `value` (if fulfilled) or `reason` (if rejected).
3. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.
4. `Promise.resolve(value)` -- makes a resolved promise with the given value.
5. `Promise.reject(error)` -- makes a rejected promise with the given error.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Из всех перечисленных методов, самый часто используемый - это, пожалуй, `Promise.all`.
