# Promise API

<<<<<<< HEAD
В классе `Promise` есть 4 статических метода. Давайте познакомимся с ними.
=======
There are 5 static methods in the `Promise` class. We'll quickly cover their use cases here.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

## Promise.resolve

Синтаксис:

```js
let promise = Promise.resolve(value);
```

Возвращает выполненный промис со значением `value`.

То же самое, что и:

```js
let promise = new Promise(resolve => resolve(value));
```

`Promise.resolve` используют, когда хотят построить асинхронную цепочку, и начальный результат уже есть.

Например, нижеприведённая функция `loadCached` получает данные из указанного `url` и сохраняет результат. Поэтому в будущем, когда мы захотим повторно получить данные по этой же ссылке, мы сможем сразу вернуть результат:

```js
function loadCached(url) {
  let cache = loadCached.cache || (loadCached.cache = new Map());

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

Мы можем использовать метод `then` для `loadCached`, вот так: `loadCached(url).then(…)`, потому что функция `loadCached` возвращает промис. Это и есть основная цель использования `Promise.resolve` в строке `(*)`: функция гарантированно возвращает унифицированный результат. Мы всегда можем использовать `.then` после `loadCached`.

## Promise.reject

Синтаксис:

```js
let promise = Promise.reject(error);
```

Создаёт неудачно выполненный промис с указанной ошибкой (`error`).

Подробная запись:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

Мы здесь рассмотрели его для полноты изложения, в реальном коде используется редко.

## Promise.all

Допустим, нам нужно запустить множество промисов параллельно и дождаться, пока все они выполнятся.

Например, параллельно загрузить несколько ссылок и обработать результат, когда он готов.

Для этого как раз и пригодится `Promise.all`.

Синтаксис:

```js
let promise = Promise.all([...promises...]);
```

Метод `.all` принимает массив промисов (может принимать любой итерируемый объект, но обычно используется массив) и возвращает новый промис.

Новый промис выполнится, когда весь переданный список промисов получит результат.

Например, `Promise.all`, представленный ниже, выполнится спустя 3 секунды, результатом работы метода будет массив `[1, 2, 3]`:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // когда все промисы выполнятся, результат будет 1,2,3. Каждый промис добавляет результат в массив
```

Обратите внимание, что порядок результатов в точности соответствует порядку промисов. Даже если первый промис будет выполняться дольше всех, он все равно запишет результат в первый элемент массива.

Часто применяемый трюк - пропустить массив данных через map-функцию, которая для каждого элемента создаст задачу-промис, и затем обернёт получившийся массив в `Promise.all`.

Например, если у нас есть массив ссылок, то мы можем получить результат по ним вот так:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

<<<<<<< HEAD
// Проходим по каждому элементу массива, запускаем промис (fetch(url)) и добавляем его в массив (requests)
=======
// map every url to the promise of the fetch
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
let requests = urls.map(url => fetch(url));

// Promise.all будет ожидать выполнения всех промисов
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

<<<<<<< HEAD
Более реальный пример - это получить информацию о пользователях GitHub по их логинам из массива (или мы можем получить массив товаров по их идентификаторам, логика та же):
=======
A bigger example with fetching user information for an array of github users by their names (or we could fetch an array of goods by their ids, the logic is same):
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // все промисы выполнены, можно показать код HTTP-состояния
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // покажет 200 для каждой ссылки
    }

    return responses;
  })
  // формируем массив ответов из response.json(), чтобы прочитать его содержимое
  .then(responses => Promise.all(responses.map(r => r.json())))
  // после выполнения всех промисов: "users" это массив с результатами
  .then(users => users.forEach(user => alert(user.name)));
```

<<<<<<< HEAD
Если любой из промисов будет отклонён, то `Promise.all` немедленно вернёт эту ошибку.
=======
**If any of the promises is rejected, `Promise.all` immediately rejects with that error.**
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Например:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

Тут второй промис будет отклонён через 2 секунды. Это приведёт к немедленному отклонению всего `Promise.all`, поэтому выполнится `.catch`: ошибка отклонённого промиса становится результатом всего `Promise.all`.

<<<<<<< HEAD
Важный момент - промисы не предоставляют способа "отменить" или "прервать" их выполнение. Таким образом, промисы продолжат выполняться, но все результаты будут игнорироваться.

Есть варианты обойти данное ограничение: можно написать дополнительный код для `clearTimeout` (или каким-то другим образом отменить промис) в случае ошибки, либо можно сделать так, чтобы ошибки становились элементами в результирующем массиве (смотрите задачу ниже).
=======
```warn header="In case of an error, other promises are ignored"
If one promise rejects, `Promise.all` immediately rejects, completely forgetting about the other ones in the list. Their results are ignored.

For example, if there are multiple `fetch` calls, like in the example above, and one fails, other ones will still continue to execute, but `Promise.all` don't watch them any more. They will probably settle, but the result will be ignored.

`Promise.all` does nothing to cancel them, as there's no concept of "cancellation" in promises. In [another chapter](fetch-abort) we'll cover `AbortController` that aims to help with that, but it's not a part of the Promise API.
```
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

````smart header="`Promise.all(...)` разрешает передавать НЕ промисы в `iterable` (итерируемом) объекте"
Обычно, `Promise.all(...)` принимает итерируемый (чаще всего массив) объект промисов. Но если любой из этих объектов не является промисом, он оборачивается в `Promise.resolve`.

Например, здесь результат: `[1, 2, 3]`

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2, // обрабатывается как Promise.resolve(2)
  3  // обрабатывается как Promise.resolve(3)
]).then(alert); // 1, 2, 3
```

Таким образом, мы можем передавать в том числе значения, которые не являются промисами, в `Promise.all`, это бывает удобно.

````

## Promise.allSettled

[recent browser="new"]

`Promise.all` rejects as a whole if any promise rejects. That's good in cases, when we need *all* results to go on:

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // render method needs them all
```

`Promise.allSettled` waits for all promises to settle: even if one rejects, it waits for the others. The resulting array has:

- `{status:"fulfilled", value:result}` for successful responses,
- `{status:"rejected", reason:error}` for errors.

For example, we'd like to fetch the information about multiple users. Even if one request fails, we're interested in the others.

Let's use `Promise.allSettled`:

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

The `results` in the line `(*)` above will be:
```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

So, for each promise we get its status and `value/reason`.

### Polyfill

If the browser doesn't support `Promise.allSettled`, it's easy to polyfill:

```js
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(v => ({
      state: 'fulfilled',
      value: v,
    }), r => ({
      state: 'rejected',
      reason: r,
    }))));
  };
}
```

In this code, `promises.map` takes input values, turns into promises (just in case a non-promise was passed) with `p => Promise.resolve(p)`, and then adds `.then` handler to it.

That handler turns a successful result `v` into `{state:'fulfilled', value:v}`, and an error `r` into `{state:'rejected', reason:r}`. That's exactly the format of `Promise.allSettled`.

Then we can use `Promise.allSettled` to get the results or *all* given promises, even if some of them reject.

## Promise.race

Метод очень похож на `Promise.all`, он принимает итерируемый объект (массив) промисов, но вместо того, чтобы ждать выполнения всех промисов, он ожидает первый завершённый промис (даже в случае ошибки) и сразу возвращает результат.

Синтаксис:

```js
let promise = Promise.race(iterable);
```

Например, тут результат будет `1`:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

То есть, в отличие от `Promise.all`, результатом будет первый успешно выполнившийся промис из списка или первая появившаяся ошибка. Остальные промисы игнорируются.

## Итого

<<<<<<< HEAD
Мы ознакомились с 4 статическими методами класса `Promise`:

1. `Promise.resolve(value)` -- возвращает успешно выполнившийся промис, с указанным значением.
2. `Promise.reject(error)` -- возвращает промис с указанной ошибкой.
3. `Promise.all(promises)` -- ожидает выполнения всех промисов и возвращает массив с результатами. Если любой из указанных промисов вернёт ошибку, то результатом работы `Promise.all` будет эта ошибка, результаты остальных промисов будут игнорироваться.
4. `Promise.race(promises)` -- ожидает первый выполненный промис, результатом будет выполнившийся промис или первая ошибка.

Из всех перечисленных методов, самый часто используемый - это `Promise.all`.
=======
There are 5 static methods of `Promise` class:

1. `Promise.resolve(value)` -- makes a resolved promise with the given value.
2. `Promise.reject(error)` -- makes a rejected promise with the given error.
3. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, then it becomes the error of `Promise.all`, and all other results are ignored.
4. `Promise.allSettled(promises)` (a new method) -- waits for all promises to resolve or reject and returns an array of their results as object with:
    - `state`: `'fulfilled'` or `'rejected'`
    - `value` (if fulfilled) or `reason` (if rejected).
5. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.

Of these five, `Promise.all/allSettled` are the most common in practice.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
