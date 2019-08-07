# Promise API

В классе `Promise` есть 5 статических методов. Давайте познакомимся с ними.

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

// Преобразуем каждый URL в промис, возвращённый fetch
let requests = urls.map(url => fetch(url));

// Promise.all будет ожидать выполнения всех промисов
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

Более реальный пример с получением информации о пользователях GitHub по их логинам из массива (мы могли бы получить массив товаров по их идентификаторам, логика та же):

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

**Если любой из промисов будет отклонён, то промис, возвращённый `Promise.all`, немедленно завершается с этой ошибкой.**

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

```warn header="В случае ошибки, остальные результаты игнорируются"
Если один промис завершается с ошибкой, то весь `Promise.all` завершается с ней, полностью забывая про остальные промисы в списке. Их результаты игнорируются.

Например, если сделано несколько вызовов `fetch`, как в примере выше, и один не прошёл, то остальные будут всё ещё выполняться, но `Promise.all` за ними уже не смотрит. Скорее всего, они так или иначе завершатся, но их результаты будут проигнорированы.

`Promise.all` ничего не делает для их отмены, так как в промисах вообще нет концепии "отмены". В главе <info:fetch-abort> мы рассмотрим `AbortController`, который помогает с этим, но он не является частью Promise API.
```

````smart header="`Promise.all(iterable)` разрешает передавать НЕ промисы в `iterable` (итерируемом объекте)"
Обычно, `Promise.all(...)` принимает итерируемый объект промисов (чаще всего массив). Но если любой из этих объектов не является промисом, он оборачивается в `Promise.resolve`.

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

Таким образом, мы можем передавать уже готовые значения, которые не являются промисами, в `Promise.all`, иногда это бывает удобно.
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

Мы ознакомились с пятью статическими методами класса `Promise`:

1. `Promise.resolve(value)` -- возвращает успешно выполнившийся промис, с указанным значением.
2. `Promise.reject(error)` -- возвращает промис с указанной ошибкой.
3. `Promise.all(promises)` -- ожидает выполнения всех промисов и возвращает массив с результатами. Если любой из указанных промисов вернёт ошибку, то результатом работы `Promise.all` будет эта ошибка, результаты остальных промисов будут игнорироваться.
4. `Promise.allSettled(promises)` (a new method) -- waits for all promises to resolve or reject and returns an array of their results as object with:
    - `state`: `'fulfilled'` or `'rejected'`
    - `value` (if fulfilled) or `reason` (if rejected).
5. `Promise.race(promises)` -- ожидает первый выполненный промис, результатом будет выполнившийся промис или первая ошибка.

Из всех перечисленных методов, самый часто используемый - это, пожалуй, `Promise.all`.
