# Async/await

Существует специальный синтаксис для работы с промисами, который называется "async/await". Он удивительно прост для понимания и использования.

## Асинхронные функции

Начнём с ключевого слова `async`. Оно ставится перед функцией, вот так:

```js
async function f() {
  return 1;
}
```

У слова `async` один простой смысл: эта функция всегда возвращает промис. Значения других типов оборачиваются в завершившийся успешно промис автоматически.

<<<<<<< HEAD
Например, эта функция возвратит выполненный промис с результатом `1`:
=======
For instance, this function returns a resolved promise with the result of `1`; let's test it:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

<<<<<<< HEAD
Можно и явно вернуть промис, результат будет одинаковым:
=======
...We could explicitly return a promise, which would be the same:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

Так что ключевое слово `async` перед функцией гарантирует, что эта функция в любом случае вернёт промис. Согласитесь, достаточно просто? Но это ещё не всё. Есть другое ключевое слово - `await`, которое можно использовать только внутри `async`-функций.

## Await

Синтаксис:

```js
// работает только внутри async–функций
let value = await promise;
```

Ключевое слово `await` заставит интерпретатор JavaScript ждать до тех пор, пока промис справа от `await` не выполнится. После чего оно вернёт его результат, и выполнение кода продолжится.

В этом примере промис успешно выполнится через 1 секунду:

```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("готово!"), 1000)
  });

*!*
<<<<<<< HEAD
  let result = await promise; // будет ждать, пока промис не выполнится (*)
=======
  let result = await promise; // wait until the promise resolves (*)
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
*/!*

  alert(result); // "готово!"
}

f();
```

В данном примере выполнение функции остановится на строке `(*)` до тех пор, пока промис не выполнится. Это произойдёт через секунду после запуска функции. После чего в переменную `result` будет записан результат выполнения промиса, и браузер отобразит alert-окно "готово!".

<<<<<<< HEAD
Обратите внимание, хотя `await` и заставляет JavaScript дожидаться выполнения промиса, это не отнимает ресурсов процессора. Пока промис не выполнится, JS-движок может заниматься другими задачами: выполнять прочие скрипты, обрабатывать события и т.п.
=======
Let's emphasize: `await` literally makes JavaScript wait until the promise settles, and then go on with the result. That doesn't cost any CPU resources, because the engine can do other jobs in the meantime: execute other scripts, handle events, etc.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

По сути, это просто "синтаксический сахар" для получения результата промиса, более наглядный, чем `promise.then`.

````warn header="`await` нельзя использовать в обычных функциях"
Если мы попробуем использовать `await` внутри функции, объявленной без `async`, получим синтаксическую ошибку:

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // SyntaxError
*/!*
}
```

Ошибки не будет, если мы укажем ключевое слово `async` перед объявлением функции. Как было сказано раньше, `await` можно использовать только внутри `async`–функций.
````

Давайте перепишем пример `showAvatar()` из раздела <info:promise-chaining> с помощью `async/await`:

1. Нам нужно заменить вызовы `.then` на `await`.
2. И добавить ключевое слово `async` перед объявлением функции.

```js run
async function showAvatar() {

  // запрашиваем JSON с данными пользователя
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // запрашиваем информацию об этом пользователе из github
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // отображаем аватар пользователя
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // ждём 3 секунды и затем скрываем аватар
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

Получилось очень просто и читаемо, правда? Гораздо лучше, чем раньше.

````smart header="`await` нельзя использовать на верхнем уровне вложенности"
Программисты, узнав об `await`, часто пытаются использовать эту возможность на верхнем уровне вложенности (вне тела функции). Но из-за того, что `await` работает только внутри `async`–функций, так сделать не получится:

```js run
// SyntaxError на верхнем уровне вложенности
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
```

<<<<<<< HEAD
Можно обернуть этот код в анонимную `async`–функцию, тогда всё заработает:
=======
But we can wrap it into an anonymous async function, like this:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```


````
<<<<<<< HEAD
````smart header="`await` работает с \"thenable\"–объектами"
Как и `promise.then`, `await` позволяет работать с промис–совместимыми объектами. Идея в том, что если у объекта можно вызвать метод `then`, этого достаточно, чтобы использовать его с `await`.

В примере ниже, экземпляры класса `Thenable` будут работать вместе с `await`:
=======
````smart header="`await` accepts \"thenables\""
Like `promise.then`, `await` allows us to use thenable objects (those with a callable `then` method). The idea is that a third-party object may not be a promise, but promise-compatible: if it supports `.then`, that's enough to use it with `await`.

Here's a demo `Thenable` class; the `await` below accepts its instances:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // выполнить resolve со значением this.num * 2 через 1000мс
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
};

async function f() {
  // код будет ждать 1 секунду,
  // после чего значение result станет равным 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

<<<<<<< HEAD
Когда `await` получает объект с `.then`, не являющийся промисом, JavaScript автоматически запускает этот метод, передавая ему аргументы – встроенные функции `resolve` и `reject`. Затем `await` приостановит дальнейшее выполнение кода, пока любая из этих функций не будет вызвана (в примере это строка `(*)`). После чего выполнение кода продолжится с результатом `resolve` или `reject` соответственно.
=======
If `await` gets a non-promise object with `.then`, it calls that method providing the built-in functions `resolve` and `reject` as arguments (just as it does for a regular `Promise` executor). Then `await` waits until one of them is called (in the example above it happens in the line `(*)`) and then proceeds with the result.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
````

````smart header="Асинхронные методы классов"
Для объявления асинхронного метода достаточно написать `async` перед именем:

```js run
class Waiter {
*!*
  async wait() {
*/!*
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1
```
Как и в случае с асинхронными функциями, такой метод гарантированно возвращает промис, и в его теле можно использовать `await`.

````
## Обработка ошибок

<<<<<<< HEAD
Когда промис завершается успешно, `await promise` возвращает результат. Когда завершается с ошибкой – будет выброшено исключение. Как если бы на этом месте находилось выражение `throw`.
=======
If a promise resolves normally, then `await promise` returns the result. But in the case of a rejection, it throws the error, just as if there were a `throw` statement at that line.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

Такой код:

```js
async function f() {
*!*
  await Promise.reject(new Error("Упс!"));
*/!*
}
```

<<<<<<< HEAD
Делает тоже самое, что и такой:
=======
...is the same as this:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js
async function f() {
*!*
  throw new Error("Упс!");
*/!*
}
```

Но есть отличие, на практике промис может завершиться с ошибкой не сразу, а через некоторое время. В этом случае будет задержка, а затем `await` выбросит исключение.

Такие ошибки можно ловить, используя `try..catch`, как с обычным `throw`:

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch
*/!*
  }
}

f();
```

<<<<<<< HEAD
В случае ошибки выполнение `try` прерывается и управление прыгает в начало блока `catch`. Блоком `try` можно обернуть несколько строк:
=======
In the case of an error, the control jumps to the `catch` block. We can also wrap multiple lines:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // перехватит любую ошибку в блоке try: и в fetch, и в response.json
    alert(err);
  }
}

f();
```

Если у нас нет `try..catch`, асинхронная функция будет возвращать завершившийся с ошибкой промис (в состоянии `rejected`). В этом случае мы можем использовать метод `.catch` промиса, чтобы обработать ошибку:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() вернёт промис в состоянии rejected
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

<<<<<<< HEAD
Если забыть добавить `.catch`, то будет сгенерирована ошибка "Uncaught promise error" и информация об этом будет выведена в консоль. Такие ошибки можно поймать глобальным обработчиком, о чём подробно написано в разделе <info:promise-error-handling>.

```smart header="`async/await` и `promise.then/catch`"
При работе с `async/await`, `.then` используется нечасто, так как `await` автоматически ожидает завершения выполнения промиса. В этом случае обычно (но не всегда) гораздо удобнее перехватывать ошибки, используя `try..catch`, нежели чем `.catch`.

Но на верхнем уровне вложенности (вне `async`–функций) `await` использовать нельзя, поэтому `.then/catch` для обработки финального результата или ошибок – обычная практика.

Так сделано в строке `(*)` в примере выше.
=======
If we forget to add `.catch` there, then we get an unhandled promise error (viewable in the console). We can catch such errors using a global `unhandledrejection` event handler as described in the chapter <info:promise-error-handling>.


```smart header="`async/await` and `promise.then/catch`"
When we use `async/await`, we rarely need `.then`, because `await` handles the waiting for us. And we can use a regular `try..catch` instead of `.catch`. That's usually (but not always) more convenient.

But at the top level of the code, when we're outside any `async` function, we're syntactically unable to use `await`, so it's a normal practice to add `.then/catch` to handle the final result or falling-through error, like in the line `(*)` of the example above.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
```

````smart header="`async/await` отлично работает с `Promise.all`"
Когда необходимо подождать несколько промисов одновременно, можно обернуть их в `Promise.all`, и затем `await`:

```js
// await будет ждать массив с результатами выполнения всех промисов
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

<<<<<<< HEAD
В случае ошибки она будет передаваться как обычно: от завершившегося с ошибкой промиса к `Promise.all`. А после будет сгенерировано исключение, которое можно отловить, обернув выражение в `try..catch`.
=======
In the case of an error, it propagates as usual, from the failed promise to `Promise.all`, and then becomes an exception that we can catch using `try..catch` around the call.

>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
````

## Итого

Ключевое слово `async` перед объявлением функции:

<<<<<<< HEAD
1. Обязывает её всегда возвращать промис.
2. Позволяет использовать `await` в теле этой функции.
=======
1. Makes it always return a promise.
2. Allows `await` to be used in it.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

Ключевое слово `await` перед промисом заставит JavaScript дождаться его выполнения, после чего:

<<<<<<< HEAD
1. Если промис завершается с ошибкой, будет сгенерировано исключение, как если бы на этом месте находилось `throw`.
2. Иначе вернётся результат промиса.

Вместе они предоставляют отличный каркас для написания асинхронного кода. Такой код легко и писать, и читать.

Хотя при работе с `async/await` можно обходиться без `promise.then/catch`, иногда всё-таки приходится использовать эти методы (на верхнем уровне вложенности, например). Также `await` отлично работает в сочетании с `Promise.all`, если необходимо выполнить несколько задач параллельно.
=======
1. If it's an error, the exception is generated — same as if `throw error` were called at that very place.
2. Otherwise, it returns the result.

Together they provide a great framework to write asynchronous code that is easy to both read and write.

With `async/await` we rarely need to write `promise.then/catch`, but we still shouldn't forget that they are based on promises, because sometimes (e.g. in the outermost scope) we have to use these methods. Also `Promise.all` is nice when we are waiting for many tasks simultaneously.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
