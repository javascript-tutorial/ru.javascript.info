# Промисификация

Промисификация -- это длинное слово для простого преобразования. Мы берём функцию, которая принимает колбэк и меняем её, чтобы она вместо этого возвращала промис.

Если точнее, то мы создаём функцию-обёртку, которая делает то же самое, внутри вызывая исходную функцию, но возвращает промис.

Такие преобразования часто необходимы в реальной жизни, так как многие функции и библиотеки основаны на колбэках, а использование промисов более удобно, поэтому есть смысл "промисифицировать" их.

Например, у нас есть `loadScript(src, callback)` из главы <info:callbacks>.

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// использование:
// loadScript('path/script.js', (err, script) => {...})
```

Давайте промисифицируем её. Новая функция `loadScriptPromise(src)` будет делать то же самое, но будет принимать только `src` (не callback) и возвращать промис.

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

Теперь `loadScriptPromise` хорошо вписывается в наш код, основанный на промисах.

Как видно, она передаёт всю работу исходной функции `loadScript`, предоставляя ей собственный колбэк, по вызову которого происходит `resolve/reject` промиса.

Так как нам может понадобиться промисифицировать множество функций, имеет смысл использовать вспомогательную функцию.

На самом деле, это очень просто - `promisify(f)`, описанная ниже, принимает функцию `f` и возвращает функцию-обёртку.

Эта функция-обёртка делает то же самое, что и код выше: возвращает промис и передаёт вызов оригиналу `f`, отслеживая результат в виде специально созданного колбэка:

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

      args.push(callback); // добавляем колбэк в конце массива аргументов

      f.call(this, ...args); // вызываем оригинальную функцию
    });
  };
};

// использование:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

Здесь мы предполагаем, что исходная функция ожидает колбэк с двумя аргументами `(err, result)`. Это то, с чем мы чаще всего сталкиваемся. Тогда наш колбэк - в правильном формате, и `promisify` отлично работает для такого случая.

Но что, если исходная `f` ожидает колбэк с большим количеством аргументов `callback(err, res1, res2)`?

Ниже описана изменённая функция `promisify`, которая возвращает массив результатов:

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

В некоторых случая `err` может отсутствовать: `callback(result)`, или могут встречаться экзотические варианты формата колбэка, которые мы можем промисифицировать без помощника, "вручную".

Также существуют модули с более гибкой промисификацией, например, [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify) или встроенная функция `util.promisify` в Node.js.

```smart
Промисификация - это отличный паттерн, особенно, если вы будете использовать `async/await` (см. следующую главу), но она не является тотальной заменой всех колбэков.

Помните, промис может иметь только один результат, но колбэк технически может вызываться сколько угодно раз.

Поэтому промисификация используется для функций, которые вызывают колбэк только один раз. Последующие вызовы колбэка будут проигнорированы.
```
