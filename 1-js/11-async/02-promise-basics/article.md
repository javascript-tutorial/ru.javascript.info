
<<<<<<< HEAD
# Промисы
=======
Imagine that you're a top singer, and fans ask day and night for your upcoming song.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Представьте, что вы известный певец, которого фанаты постоянно донимают расспросами о предстоящем сингле.

<<<<<<< HEAD
Чтобы получить передышку, вы обещаете разослать им сингл, когда он будет выпущен. Вы даёте фанатам список, в который они могут записаться. Они могут оставить там свой e-mail, чтобы получить песню, как только она выйдет. И даже больше: если что-то пойдёт не так, например, в студии будет пожар и песню выпустить не выйдет, они также получат уведомление об этом.
=======
Everyone is happy: you, because the people don't crowd you anymore, and fans, because they won't miss the song.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Все счастливы! Вы счастливы, потому что вас больше не донимают фанаты, а фанаты больше не беспокоятся, что пропустят новый сингл.

<<<<<<< HEAD
Это аналогия из реальной жизни для ситуаций, с которыми мы часто сталкиваемся в программировании:
=======
1. A "producing code" that does something and takes time. For instance, some code that loads the data over a network. That's a "singer".
2. A "consuming code" that wants the result of the "producing code" once it's ready. Many functions  may need that result. These are the "fans".
3. A *promise* is a special JavaScript object that links the "producing code" and the "consuming code" together. In terms of our analogy: this is the "subscription list". The "producing code" takes whatever time it needs to produce the promised result, and the "promise" makes that result available to all of the subscribed code when it's ready.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

1. Есть "создающий" код, который делает что-то, что занимает время. Например, загружает данные по сети. В нашей аналогии это - "певец".
2. Есть "потребляющий" код, который хочет получить результат "создающего" кода, когда он будет готов. Он может быть необходим более чем одной функции. Это - "фанаты".
3. `Promise` (по англ. `promise`, будем называть такой объект "промис") - это специальный объект в JavaScript, который связывает "создающий" и "потребляющий" коды вместе. В терминах нашей аналогии - это "список для подписки". "Создающий" код может выполняться сколько потребуется, чтобы получить результат, а *промис* делает результат доступным для кода, который подписан на него, когда результат готов.

Аналогия не совсем точна, потому что объект `Promise` в JavaScript гораздо сложнее простого списка подписок: он обладает дополнительными возможностями и ограничениями. Но для начала и такая аналогия хороша.

Синтаксис создания `Promise`:

```js
let promise = new Promise(function(resolve, reject) {
  // функция-исполнитель (executor)
  // "певец"
});
```

<<<<<<< HEAD
Функция, переданная в конструкцию `new Promise`, называется *исполнитель* (executor). Когда `Promise` создаётся, она запускается автоматически. Она должна содержать "создающий" код, который когда-нибудь создаст результат. В терминах нашей аналогии: *исполнитель* - это "певец".
=======
The function passed to `new Promise` is called the *executor*. When `new Promise` is created, the executor runs automatically. It contains the producing code which should eventually produce the result. In terms of the analogy above: the executor is the "singer".
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Её аргументы `resolve` и `reject` - это колбэки, которые предоставляет сам JavaScript. Наш код - только внутри исполнителя.

<<<<<<< HEAD
Когда он получает результат, сейчас или позже - не важно, он должен вызвать один из этих колбэков:

- `resolve(value)` — если работа завершилась успешно, с результатом `value`.
- `reject(error)` — если произошла ошибка, `error` - объект ошибки.

Итак, исполнитель запускается автоматически, он должен выполнить работу, а затем вызвать `resolve` или `reject`.

У объекта `promise`, возвращаемого конструктором `new Promise`, есть внутренние свойства:

- `state` ("состояние") — вначале `"pending"` ("ожидание"), потом меняется на  `"fulfilled"` ("выполнено успешно") при вызове `resolve` или на `"rejected"` ("выполнено с ошибкой") при вызове `reject`.
- `result` ("результат") — вначале `undefined`, далее изменяется на `value` при вызове `resolve(value)` или на `error` при вызове `reject(error)`.
=======
When the executor obtains the result, be it soon or late, doesn't matter, it should call one of these callbacks:

- `resolve(value)` — if the job is finished successfully, with result `value`.
- `reject(error)` — if an error has occurred, `error` is the error object.

So to summarize: the executor runs automatically and attempts to perform a job. When it is finished with the attempt, it calls `resolve` if it was successful or `reject` if there was an error.

The `promise` object returned by the `new Promise` constructor has these internal properties:

- `state` — initially `"pending"`, then changes to either `"fulfilled"` when `resolve` is called or `"rejected"` when `reject` is called.
- `result` — initially `undefined`, then changes to `value` when `resolve(value)` is called or `error` when `reject(error)` is called.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Так что исполнитель по итогу переводит `promise` в одно из двух состояний:

![](promise-resolve-reject.svg)

Позже мы рассмотрим, как "фанаты" узнают об этих изменениях.

Ниже пример конструктора `Promise` и простого исполнителя с кодом, дающим результат с задержкой (через `setTimeout`):

```js
let promise = new Promise(function(resolve, reject) {
  // эта функция выполнится автоматически, при вызове new Promise

  // через 1 секунду сигнализировать, что задача выполнена с результатом "done"
  setTimeout(() => *!*resolve("done")*/!*, 1000);
});
```

Мы можем наблюдать две вещи, запустив код выше:

<<<<<<< HEAD
1. Функция-исполнитель запускается сразу же при вызове `new Promise`.
2. Исполнитель получает два аргумента: `resolve` и `reject` — это функции, встроенные в JavaScript, поэтому нам не нужно их писать. Нам нужно лишь позаботиться, чтобы исполнитель вызвал одну из них по готовности.

Спустя одну секунду "обработки" исполнитель вызовет `resolve("done")`, чтобы передать результат:
=======
1. The executor is called automatically and immediately (by `new Promise`).
2. The executor receives two arguments: `resolve` and `reject`. These functions are pre-defined by the JavaScript engine, so we don't need to create them. We should only call one of them when ready.

    After one second of "processing", the executor calls `resolve("done")` to produce the result. This changes the state of the `promise` object:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

![](promise-resolve-1.svg)

Это был пример успешно выполненной задачи, в результате мы получили "успешно выполненный" промис.

А теперь пример, в котором исполнитель сообщит, что задача выполнена с ошибкой:

```js
let promise = new Promise(function(resolve, reject) {
  // спустя одну секунду будет сообщено, что задача выполнена с ошибкой
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

![](promise-reject-1.svg)

<<<<<<< HEAD
Подведём промежуточные итоги: исполнитель выполняет задачу (что-то, что обычно требует времени), затем вызывает `resolve` или `reject`, чтобы изменить состояние соответствующего `Promise`.

Промис - и успешный, и отклонённый будем называть "завершённым", в отличие от изначального промиса "в ожидании".
=======
To summarize, the executor should perform a job (usually something that takes time) and then call `resolve` or `reject` to change the state of the corresponding promise object.

A promise that is either resolved or rejected is called "settled", as opposed to an initially "pending" promise.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

````smart header="Может быть что-то одно: либо результат, либо ошибка"
Исполнитель должен вызвать что-то одно: `resolve` или `reject`. Состояние промиса может быть изменено только один раз.

Все последующие вызовы `resolve` и `reject` будут проигнорированы:

```js
let promise = new Promise(function(resolve, reject) {
*!*
  resolve("done");
*/!*

  reject(new Error("…")); // игнорируется
  setTimeout(() => resolve("…")); // игнорируется
});
```

Идея в том, что задача, выполняемая исполнителем, может иметь только один итог: результат или ошибку.

Также заметим, что функция `resolve`/`reject` ожидает только один аргумент (или ни одного). Все дополнительные аргументы будут проигнорированы.
````

```smart header="Вызывайте `reject` с объектом `Error`"
В случае, если что-то пошло не так, мы должны вызвать `reject`. Это можно сделать с аргументом любого типа (как и `resolve`), но рекомендуется использовать объект `Error` (или унаследованный от него). Почему так? Скоро нам станет понятно.
```

````smart header="Вызов `resolve`/`reject` сразу"
Обычно исполнитель делает что-то асинхронное и после этого вызывает `resolve`/`reject`, то есть через какое-то время. Но это не обязательно, `resolve` или `reject` могут быть вызваны сразу:

```js
let promise = new Promise(function(resolve, reject) {
  // задача, не требующая времени
  resolve(123); // мгновенно выдаст результат: 123
});
```

Это может случиться, например, когда мы начали выполнять какую-то задачу, но тут же увидели, что ранее её уже выполняли, и результат закеширован.

Такая ситуация нормальна. Мы сразу получим успешно завершённый `Promise`.
````

```smart header="Свойства `state` и `result` - внутренние"
Свойства `state` и `result` - это внутренние свойства объекта `Promise` и мы не имеем к ним прямого доступа. Для обработки результата следует использовать методы `.then`/`.catch`/`.finally`, про них речь пойдёт дальше.
```

<<<<<<< HEAD
## Потребители: then, catch

Объект `Promise` служит связующим звеном между исполнителем ("создающим" кодом или "певцом") и функциями-потребителями ("фанатами"), которые получат либо результат, либо ошибку. Функции-потребители могут быть зарегистрированы (подписаны) с помощью методов `.then` и `.catch`.
=======
## Consumers: then, catch

A Promise object serves as a link between the executor (the "producing code" or "singer") and the consuming functions (the "fans"), which will receive the result or error. Consuming functions can be registered (subscribed) using the methods `.then` and `.catch`.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

### then

Наиболее важный и фундаментальный метод - `.then`.

Синтаксис:

```js
promise.then(
  function(result) { *!*/* обработает успешное выполнение */*/!* },
  function(error) { *!*/* обработает ошибку */*/!* }
);
```

<<<<<<< HEAD
Первый аргумент метода `.then` - функция, которая выполняется, когда промис переходит в состояние "выполнен успешно", и получает результат.

Второй аргумент `.then`  - функция, которая выполняется, когда промис переходит в состояние "выполнен с ошибкой", и получает ошибку.
=======
The first argument of `.then` is a function that runs when the promise is resolved and receives the result.

The second argument of `.then` is a function that runs when the promise is rejected and receives the error.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Например, вот реакция на успешно выполненный промис:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve запустит первую функцию, переданную в .then
promise.then(
*!*
  result => alert(result), // выведет "done!" через одну секунду
*/!*
  error => alert(error) // не будет запущена
);
```

Выполнилась первая функция.

<<<<<<< HEAD
А в случае ошибки в промисе -- выполнится вторая:
=======
And in the case of a rejection, the second one:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject запустит вторую функцию, переданную в .then
promise.then(
  result => alert(result), // не будет запущена
*!*
  error => alert(error) // выведет "Error: Whoops!" спустя одну секунду
*/!*
);
```

Если мы заинтересованы только в результате успешного выполнения задачи, то в `then` можно передать только одну функцию:

```js run
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

*!*
promise.then(alert); // выведет "done!" спустя одну секунду
*/!*
```

### catch

Если мы хотели бы только обработать ошибку, то можно использовать `null` в качестве первого аргумента: `.then(null, errorHandlingFunction)`. Или можно воспользоваться методом `.catch(errorHandlingFunction)`, который сделает то же самое:

```js run
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Ошибка!")), 1000);
});

*!*
// .catch(f) это то же самое, что promise.then(null, f)
promise.catch(alert); // выведет "Error: Ошибка!" спустя одну секунду
*/!*
```

Вызов `.catch(f)` - это сокращённый, "укороченный" вариант  `.then(null, f)`.

<<<<<<< HEAD
## Очистка: finally
=======
## Cleanup: finally
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

По аналогии с блоком `finally` из обычного `try {...} catch {...}`, у промисов также есть метод `finally`.

<<<<<<< HEAD
Вызов `.finally(f)` похож на `.then(f, f)`, в том смысле, что `f` выполнится в любом случае, когда промис завершится: успешно или с ошибкой.

Идея `finally` состоит в том, чтобы настроить обработчик для выполнения очистки/доведения после завершения предыдущих операций.

Например, остановка индикаторов загрузки, закрытие больше не нужных соединений и т.д.

Думайте об этом как о завершении вечеринки. Независимо от того, была ли вечеринка хорошей или плохой, сколько на ней было друзей, нам все равно нужно (или, по крайней мере, мы должны) сделать уборку после нее.

Код может выглядеть следующим образом:

```js
new Promise((resolve, reject) => {
  /* сделать что-то, что займёт время, и после вызвать resolve или может reject */
})
*!*
  // выполнится, когда промис завершится, независимо от того, успешно или нет
  .finally(() => остановить индикатор загрузки)
  // таким образом, индикатор загрузки всегда останавливается, прежде чем мы продолжим
=======
The call `.finally(f)` is similar to `.then(f, f)` in the sense that `f` runs always, when the promise is settled: be it resolve or reject.

The idea of `finally` is to set up a handler for performing cleanup/finalizing after the previous operations are complete.

E.g. stopping loading indicators, closing no longer needed connections, etc.

Think of it as a party finisher. Irresepective of whether a party was good or bad, how many friends were in it, we still need (or at least should) do a cleanup after it.

The code may look like this:

```js
new Promise((resolve, reject) => {
  /* do something that takes time, and then call resolve or maybe reject */
})
*!*
  // runs when the promise is settled, doesn't matter successfully or not
  .finally(() => stop loading indicator)
  // so the loading indicator is always stopped before we go on
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
*/!*
  .then(result => показать результат, err => показать ошибку)
```

<<<<<<< HEAD
Обратите внимание, что `finally(f)` - это не совсем псевдоним `then(f,f)`, как можно было подумать.

Есть важные различия:

1. Обработчик, вызываемый из `finally`, не имеет аргументов. В `finally` мы не знаем, как был завершён промис. И это нормально, потому что обычно наша задача - выполнить "общие" завершающие процедуры.

    Пожалуйста, взгляните на приведенный выше пример: как вы можете видеть, обработчик `finally` не имеет аргументов, а результат промиса обрабатывается в следующем обработчике.

2. Обработчик `finally` "пропускает" результат или ошибку дальше, к последующим обработчикам.

    Например, здесь результат проходит через `finally` к `then`:
    
=======
Please note that `finally(f)` isn't exactly an alias of `then(f,f)` though.

There are important differences:

1. A `finally` handler has no arguments. In `finally` we don't know whether the promise is successful or not. That's all right, as our task is usually to perform "general" finalizing procedures.

    Please take a look at the example above: as you can see, the `finally` handler has no arguments, and the promise outcome is handled by the next handler.
2. A `finally` handler "passes through" the result or error to the next suitable handler.

    For instance, here the result is passed through `finally` to `then`:

>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
    ```js run
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("value"), 2000);
    })
<<<<<<< HEAD
      .finally(() => alert("Промис завершён")) // срабатывает первым
      .then(result => alert(result)); // <-- .then показывает "value"
    ```
    
    Как вы можете видеть, значение возвращаемое первым промисом, передается через `finally` к следующему `then`.
    
    Это очень удобно, потому что `finally` не предназначен для обработки результата промиса. Как уже было сказано, это место для проведения общей очистки, независимо от того, каков был результат.
    
    А здесь ошибка из промиса проходит через `finally` к `catch`:
=======
      .finally(() => alert("Promise ready")) // triggers first
      .then(result => alert(result)); // <-- .then shows "value"
    ```

    As you can see, the `value` returned by the first promise is passed through `finally` to the next `then`.

    That's very convenient, because `finally` is not meant to process a promise result. As said, it's a place to do generic cleanup, no matter what the outcome was.

    And here's an example of an error, for us to see how it's passed through `finally` to `catch`:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

    ```js run
    new Promise((resolve, reject) => {
      throw new Error("error");
    })
<<<<<<< HEAD
      .finally(() => alert("Промис завершён")) // срабатывает первым
      .catch(err => alert(err));  // <-- .catch показывает ошибку
    ```  

3. Обработчик `finally` также не должен ничего возвращать. Если это так, то возвращаемое значение молча игнорируется.

    Единственным исключением из этого правила является случай, когда обработчик `finally` выдает ошибку. Затем эта ошибка передается следующему обработчику вместо любого предыдущего результата.
    
Подведем итог:

- Обработчик `finally` не получает результат предыдущего обработчика (у него нет аргументов). Вместо этого этот результат передается следующему подходящему обработчику.
- Если обработчик `finally` возвращает что-то, это игнорируется.
- Когда `finally` выдает ошибку, выполнение переходит к ближайшему обработчику ошибок.

Эти функции полезны и заставляют все работать правильно, если мы используем `finally` так, как предполагается: для общих процедур очистки.

````smart header="На завершённых промисах обработчики запускаются сразу"
Если промис в состоянии ожидания, обработчики в `.then/catch/finally` будут ждать его.

Иногда может случиться так, что промис уже выполнен, когда мы добавляем к нему обработчик.

В таком случае эти обработчики просто запускаются немедленно:
=======
      .finally(() => alert("Promise ready")) // triggers first
      .catch(err => alert(err));  // <-- .catch shows the error
    ```

3. A `finally` handler also shouldn't return anything. If it does, the returned value is silently ignored.

    The only exception to this rule is when a `finally` handler throws an error. Then this error goes to the next handler, instead of any previous outcome.

To summarize:

- A `finally` handler doesn't get the outcome of the previous handler (it has no arguments). This outcome is passed through instead, to the next suitable handler.
- If a `finally` handler returns something, it's ignored.
- When `finally` throws an error, then the execution goes to the nearest error handler.

These features are helpful and make things work just the right way if we use `finally` how it's supposed to be used: for generic cleanup procedures.

````smart header="We can attach handlers to settled promises"
If a promise is pending, `.then/catch/finally` handlers wait for its outcome.

Sometimes, it might be that a promise is already settled when we add a handler to it.

In such case, these handlers just run immediately:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js run
// при создании промиса он сразу переводится в состояние "успешно завершён"
let promise = new Promise(resolve => resolve("готово!"));

promise.then(alert); // готово! (выведется сразу)
```

Note that this makes promises more powerful than the real life "subscription list" scenario. If the singer has already released their song and then a person signs up on the subscription list, they probably won't receive that song. Subscriptions in real life must be done prior to the event.

Promises are more flexible. We can add handlers any time: if the result is already there, they just execute.
````

<<<<<<< HEAD
## Пример: loadScript [#loadscript]

Теперь рассмотрим несколько практических примеров того, как промисы могут облегчить нам написание асинхронного кода.

У нас есть функция `loadScript` для загрузки скрипта из предыдущей главы.
=======
## Example: loadScript [#loadscript]

Next, let's see more practical examples of how promises can help us write asynchronous code.

We've got the `loadScript` function for loading a script from the previous chapter.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

Давайте вспомним, как выглядел вариант с колбэками:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));

  document.head.append(script);
}
```

Теперь перепишем её, используя `Promise`.

Новой функции `loadScript` более не нужен аргумент `callback`. Вместо этого она будет создавать и возвращать объект `Promise`, который перейдет в состояние "успешно завершён", когда загрузка закончится. Внешний код может добавлять обработчики ("подписчиков"), используя `.then`:

```js run
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

    document.head.append(script);
  });
}
```

Применение:

```js run
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src} загружен!`),
  error => alert(`Ошибка: ${error.message}`)
);

promise.then(script => alert('Ещё один обработчик...'));
```

Сразу заметно несколько преимуществ перед подходом с использованием колбэков:


| Промисы | Колбэки |
|----------|-----------|
| Промисы позволяют делать вещи в естественном порядке. Сперва мы запускаем `loadScript(script)`, и затем (`.then`) мы пишем, что делать с результатом. | У нас должна быть функция`callback` на момент вызова `loadScript(script, callback)`. Другими словами, нам нужно знать что делать с результатом *до того*, как вызовется `loadScript`. |
| Мы можем вызывать `.then` у `Promise` столько раз, сколько захотим. Каждый раз мы добавляем нового "фаната", новую функцию-подписчика в "список подписок". Больше об этом в следующей главе: [](info:promise-chaining). | Колбэк может быть только один. |

Таким образом, промисы позволяют улучшить порядок кода и дают нам гибкость. Но это далеко не всё. Мы узнаем ещё много полезного в последующих главах.
