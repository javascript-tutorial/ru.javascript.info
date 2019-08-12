# Промисификация

Промисификация -- это длинное слово для простого преобразования. Мы берём функцию, которая принимает колбэк и меняем её, чтобы она вместо этого возвращала промис.

<<<<<<< HEAD
Такие преобразования часто необходимы в реальной жизни, так как многие функции и библиотеки основаны на колбэках, а использование промисов более удобно, поэтому есть смысл "промисифицировать" их.

Например, у нас есть `loadScript(src, callback)` из главы <info:callbacks>.
=======
Such transforms are often needed in real-life, as many functions and libraries are callback-based. But promises are more convenient. So it makes sense to promisify those.

For instance, we have `loadScript(src, callback)` from the chapter <info:callbacks>.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

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
Let's promisify it. The new `loadScriptPromise(src)` function will do the same, but accept only `src` (no `callback`) and return a promise.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err)
      else resolve(script);
    });
  })
}

// использование:
// loadScriptPromise('path/script.js').then(...)
```

<<<<<<< HEAD
Теперь `loadScriptPromise` хорошо вписывается в код, основанный на промисах.
=======
Now `loadScriptPromise` fits well in promise-based code.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Как видно, она передаёт всю работу исходной функции `loadScript`, предоставляя ей колбэк, по вызову которого происходит `resolve/reject` промиса.

<<<<<<< HEAD
На практике нам, скорее всего, понадобится промисифицировать не одну функцию, поэтому имеет смысл сделать для этого специальную "функцию-помощник".

Мы назовём её `promisify(f)` - она принимает функцию для промисификации `f` и возвращает функцию-обёртку.
=======
In practice we'll probably need to promisify many functions, it makes sense to use a helper.

We'll call it `promisify(f)`: it accepts a to-promisify function `f` and returns a wrapper function.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Эта функция-обёртка делает то же самое, что и код выше: возвращает промис и передаёт вызов оригинальной `f`, отслеживая результат в своём колбэке:

```js
function promisify(f) {
  return function (...args) { // возвращает функцию-обёртку
    return new Promise((resolve, reject) => {
      function callback(err, result) { // наш специальный колбэк для f
        if (err) {
          return reject(err);
        } else {
          resolve(result);
        }
      }

<<<<<<< HEAD
      args.push(callback); // добавляем колбэк в конец аргументов f
=======
      args.push(callback); // append our custom callback to the end of f arguments
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

      f.call(this, ...args); // вызываем оригинальную функцию
    });
  };
};

// использование:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

Здесь мы предполагаем, что исходная функция ожидает колбэк с двумя аргументами `(err, result)`. Это то, с чем мы чаще всего сталкиваемся. Тогда наш колбэк - в правильном формате, и `promisify` отлично работает для такого случая.

<<<<<<< HEAD
Но что, если исходная `f` ожидает колбэк с большим количеством аргументов `callback(err, res1, res2, ...)`?

Ниже описана улучшенная функция `promisify`: при вызове `promisify(f, true)` результатом промиса будет массив результатов `[res1, res2, ...]`:
=======
But what if the original `f` expects a callback with more arguments `callback(err, res1, res2, ...)`?

Here's a more advanced version of `promisify`: if called as `promisify(f, true)`, the promise result will be an array of callback results `[res1, res2, ...]`:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
// promisify(f, true), чтобы получить массив результатов
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // наш специальный колбэк для f
        if (err) {
          return reject(err);
        } else {
          // делаем resolve для всех results колбэка, если задано manyArgs
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
};

// использование:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```

<<<<<<< HEAD
Для более экзотических форматов колбэка, например без `err`: `callback(result)`, мы можем промисифицировать функции без помощника, "вручную".
=======
For more exotic callback formats, like those without `err` at all: `callback(result)`, we can promisify such functions without using the helper, manually.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Также существуют модули с более гибкой промисификацией, например, [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify) или встроенная функция `util.promisify` в Node.js.

```smart
Промисификация - это отличный подход, особенно, если вы будете использовать `async/await` (см. следующую главу), но она не является тотальной заменой любых колбэков.

Помните, промис может иметь только один результат, но колбэк технически может вызываться сколько угодно раз.

Поэтому промисификация используется для функций, которые вызывают колбэк только один раз. Последующие вызовы колбэка будут проигнорированы.
```
