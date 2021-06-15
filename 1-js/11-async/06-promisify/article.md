# Промисификация

<<<<<<< HEAD
Промисификация -- это длинное слово для простого преобразования. Мы берём функцию, которая принимает колбэк и меняем её, чтобы она вместо этого возвращала промис.

Такие преобразования часто необходимы в реальной жизни, так как многие функции и библиотеки основаны на колбэках, а использование промисов более удобно, поэтому есть смысл "промисифицировать" их.
=======
"Promisification" is a long word for a simple transformation. It's the conversion of a function that accepts a callback into a function that returns a promise.

Such transformations are often required in real-life, as many functions and libraries are callback-based. But promises are more convenient, so it makes sense to promisify them.

For better understanding, let's see an example.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Например, у нас есть `loadScript(src, callback)` из главы <info:callbacks>.

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));

  document.head.append(script);
}

// использование:
// loadScript('path/script.js', (err, script) => {...})
```

<<<<<<< HEAD
Давайте промисифицируем её. Новая функция `loadScriptPromise(src)` будет делать то же самое, но будет принимать только `src` (не `callback`) и возвращать промис.
=======
The function loads a script with the given `src`, and then calls `callback(err)` in case of an error, or `callback(null, script)` in case of successful loading. That's a widespread agreement for using callbacks, we saw it before.

Let's promisify it. 

We'll make a new function `loadScriptPromise(src)`, that does the same (loads the script), but returns a promise instead of using callbacks.

In other words, we pass it only `src` (no `callback`) and get a promise in return, that resolves with `script` when the load is successful, and rejects with the error otherwise.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Here it is:
```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// использование:
// loadScriptPromise('path/script.js').then(...)
```

<<<<<<< HEAD
Теперь `loadScriptPromise` хорошо вписывается в код, основанный на промисах.

Как видно, она передаёт всю работу исходной функции `loadScript`, предоставляя ей колбэк, по вызову которого происходит `resolve/reject` промиса.

На практике нам, скорее всего, понадобится промисифицировать не одну функцию, поэтому имеет смысл сделать для этого специальную "функцию-помощник".
=======
As we can see, the new function is a wrapper around the original `loadScript` function. It calls it providing its own callback that translates to promise `resolve/reject`.

Now `loadScriptPromise` fits well in promise-based code. If we like promises more than callbacks (and soon we'll see more reasons for that), then we will use it instead.

In practice we may need to promisify more than one function, so it makes sense to use a helper.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Мы назовём её `promisify(f)` - она принимает функцию для промисификации `f` и возвращает функцию-обёртку.

<<<<<<< HEAD
Эта функция-обёртка делает то же самое, что и код выше: возвращает промис и передаёт вызов оригинальной `f`, отслеживая результат в своём колбэке:

```js
function promisify(f) {
  return function (...args) { // возвращает функцию-обёртку
    return new Promise((resolve, reject) => {
      function callback(err, result) { // наш специальный колбэк для f
=======
```js
function promisify(f) {
  return function (...args) { // return a wrapper-function (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f (**)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // добавляем колбэк в конец аргументов f

      f.call(this, ...args); // вызываем оригинальную функцию
    });
  };
}

// использование:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

<<<<<<< HEAD
Здесь мы предполагаем, что исходная функция ожидает колбэк с двумя аргументами `(err, result)`. Это то, с чем мы чаще всего сталкиваемся. Тогда наш колбэк - в правильном формате, и `promisify` отлично работает для такого случая.
=======
The code may look a bit complex, but it's essentially the same that we wrote above, while promisifying `loadScript` function.

A call to `promisify(f)` returns a wrapper around `f` `(*)`. That wrapper returns a promise and forwards the call to the original `f`, tracking the result in the custom callback `(**)`.

Here, `promisify` assumes that the original function expects a callback with exactly two arguments `(err, result)`. That's what we encounter most often. Then our custom callback is in exactly the right format, and `promisify` works great for such a case.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Но что, если исходная `f` ожидает колбэк с большим количеством аргументов `callback(err, res1, res2, ...)`?

<<<<<<< HEAD
Ниже описана улучшенная функция `promisify`: при вызове `promisify(f, true)` результатом промиса будет массив результатов `[res1, res2, ...]`:
=======
We can improve our helper. Let's make a more advanced version of `promisify`.

- When called as `promisify(f)` it should work similar to the version above.
- When called as `promisify(f, true)`, it should return the promise that resolves with the array of callback results. That's exactly for callbacks with many arguments.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
// promisify(f, true), чтобы получить массив результатов
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // наш специальный колбэк для f
        if (err) {
          reject(err);
        } else {
          // делаем resolve для всех results колбэка, если задано manyArgs
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// использование:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
```

<<<<<<< HEAD
Для более экзотических форматов колбэка, например без `err`: `callback(result)`, мы можем промисифицировать функции без помощника, "вручную".
=======
As you can see it's essentially the same as above, but `resolve` is called with only one or all arguments depending on whether `manyArgs` is truthy.

For more exotic callback formats, like those without `err` at all: `callback(result)`, we can promisify such functions manually without using the helper.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Также существуют модули с более гибкой промисификацией, например, [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify) или встроенная функция `util.promisify` в Node.js.

```smart
Промисификация - это отличный подход, особенно, если вы будете использовать `async/await` (см. следующую главу), но она не является тотальной заменой любых колбэков.

Помните, промис может иметь только один результат, но колбэк технически может вызываться сколько угодно раз.

Поэтому промисификация используется для функций, которые вызывают колбэк только один раз. Последующие вызовы колбэка будут проигнорированы.
```
