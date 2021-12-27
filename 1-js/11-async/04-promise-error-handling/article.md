
# Промисы: обработка ошибок

Цепочки промисов отлично подходят для перехвата ошибок. Если промис завершается с ошибкой, то управление переходит в ближайший обработчик ошибок. На практике это очень удобно.

Например, в представленном ниже примере для `fetch` указана неправильная ссылка (сайт не существует), и `.catch` перехватывает ошибку:

```js run
*!*
fetch('https://no-such-server.blabla') // ошибка
*/!*
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (текст может отличаться)
```

Как видно, `.catch` не обязательно должен быть сразу после ошибки, он может быть далее, после одного или даже нескольких `.then`

Или, может быть, с сервером всё в порядке, но в ответе мы получим некорректный JSON. Самый лёгкий путь перехватить все ошибки - это добавить `.catch` в конец цепочки:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
*!*
  .catch(error => alert(error.message));
*/!*
```

Если все в порядке, то такой `.catch` вообще не выполнится. Но если любой из промисов будет отклонён (проблемы с сетью или некорректная json-строка, или что угодно другое), то ошибка будет перехвачена.

## Неявный try..catch

Вокруг функции промиса и обработчиков находится "невидимый `try..catch`". Если происходит исключение, то оно перехватывается, и промис считается отклонённым с этой ошибкой.

Например, этот код:

```js run
new Promise((resolve, reject) => {
*!*
  throw new Error("Ошибка!");
*/!*
}).catch(alert); // Error: Ошибка!
```

...Работает так же, как и этот:

```js run
new Promise((resolve, reject) => {
*!*
<<<<<<< HEAD
  reject(new Error("Ошибка!"));
*/!*  
}).catch(alert); // Error: Ошибка!
=======
  reject(new Error("Whoops!"));
*/!*
}).catch(alert); // Error: Whoops!
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
```

"Невидимый `try..catch`" вокруг промиса автоматически перехватывает ошибку и превращает её в отклонённый промис.

Это работает не только в функции промиса, но и в обработчиках. Если мы бросим ошибку (`throw`) из обработчика (`.then`), то промис будет считаться отклонённым, и управление перейдёт к ближайшему обработчику ошибок.

Пример:

```js run
new Promise((resolve, reject) => {
  resolve("ок");
}).then((result) => {
*!*
  throw new Error("Ошибка!"); // генерируем ошибку
*/!*
}).catch(alert); // Error: Ошибка!
```

Это происходит для всех ошибок, не только для тех, которые вызваны оператором `throw`. Например, программная ошибка:

```js run
new Promise((resolve, reject) => {
  resolve("ок");
}).then((result) => {
*!*
  blabla(); // нет такой функции
*/!*
}).catch(alert); // ReferenceError: blabla is not defined
```

<<<<<<< HEAD
Финальный `.catch` перехватывает как промисы, в которых вызван `reject`, так и случайные ошибки в обработчиках.
=======
The final `.catch` not only catches explicit rejections, but also accidental errors in the handlers above.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

## Пробрасывание ошибок

Как мы уже заметили, `.catch` ведёт себя как `try..catch`. Мы можем иметь столько обработчиков `.then`, сколько мы хотим, и затем использовать один `.catch` в конце, чтобы перехватить ошибки из всех обработчиков.

<<<<<<< HEAD
В обычном `try..catch` мы можем проанализировать ошибку и повторно пробросить дальше, если не можем её обработать. То же самое возможно для промисов.

Если мы пробросим (`throw`) ошибку внутри блока `.catch`, то управление перейдёт к следующему ближайшему обработчику ошибок. А если мы обработаем ошибку и завершим работу обработчика нормально, то продолжит работу ближайший успешный обработчик `.then`.
=======
In a regular `try..catch` we can analyze the error and maybe rethrow it if it can't be handled. The same thing is possible for promises.

If we `throw` inside `.catch`, then the control goes to the next closest error handler. And if we handle the error and finish normally, then it continues to the next closest successful `.then` handler.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

В примере ниже `.catch` успешно обрабатывает ошибку:

```js run
// the execution: catch -> then
new Promise((resolve, reject) => {

  throw new Error("Ошибка!");

}).catch(function(error) {

  alert("Ошибка обработана, продолжить работу");

}).then(() => alert("Управление перейдёт в следующий then"));
```

Здесь блок `.catch` завершается нормально. Поэтому вызывается следующий успешный обработчик `.then`.

В примере ниже мы видим другую ситуацию с блоком `.catch`. Обработчик `(*)` перехватывает ошибку и не может обработать её (например, он знает как обработать только `URIError`), поэтому ошибка пробрасывается далее:

```js run
// the execution: catch -> catch
new Promise((resolve, reject) => {

  throw new Error("Ошибка!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // обрабатываем ошибку
  } else {
    alert("Не могу обработать ошибку");

*!*
    throw error; // пробрасывает эту или другую ошибку в следующий catch
*/!*
  }

}).then(function() {
  /* не выполнится */
}).catch(error => { // (**)

  alert(`Неизвестная ошибка: ${error}`);
  // ничего не возвращаем => выполнение продолжается в нормальном режиме

});
```

Управление переходит от первого блока `.catch` `(*)` к следующему `(**)`, вниз по цепочке.

## Необработанные ошибки

Что произойдёт, если ошибка не будет обработана? Например, мы просто забыли добавить `.catch` в конец цепочки, как здесь:

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // Ошибка (нет такой функции)
})
  .then(() => {
    // обработчики .then, один или более
  }); // без .catch в самом конце!
```

В случае ошибки выполнение должно перейти к ближайшему обработчику ошибок. Но в примере выше нет никакого обработчика. Поэтому ошибка как бы "застревает", её некому обработать.

<<<<<<< HEAD
На практике, как и при обычных необработанных ошибках в коде, это означает, что что-то пошло сильно не так.

Что происходит, когда обычная ошибка не перехвачена `try..catch`? Скрипт умирает с сообщением в консоли. Похожее происходит и в случае необработанной ошибки промиса.

JavaScript-движок отслеживает такие ситуации и генерирует в этом случае глобальную ошибку. Вы можете увидеть её в консоли, если запустите пример выше.
=======
In practice, just like with regular unhandled errors in code, it means that something has gone terribly wrong.

What happens when a regular error occurs and is not caught by `try..catch`? The script dies with a message in the console. A similar thing happens with unhandled promise rejections.

The JavaScript engine tracks such rejections and generates a global error in that case. You can see it in the console if you run the example above.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

В браузере мы можем поймать такие ошибки, используя событие `unhandledrejection`:

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
  // объект события имеет два специальных свойства:
  alert(event.promise); // [object Promise] - промис, который сгенерировал ошибку
  alert(event.reason); // Error: Ошибка! - объект ошибки, которая не была обработана
});
*/!*

new Promise(function() {
  throw new Error("Ошибка!");
}); // нет обработчика ошибок
```

Это событие является частью [стандарта HTML](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections).

Если происходит ошибка, и отсутствует её обработчик, то генерируется событие `unhandledrejection`, и соответствующий объект `event` содержит информацию об ошибке.

Обычно такие ошибки неустранимы, поэтому лучше всего - информировать пользователя о проблеме и, возможно, отправить информацию об ошибке на сервер.

В не-браузерных средах, таких как Node.js, есть другие способы отслеживания необработанных ошибок.

## Итого

<<<<<<< HEAD
- `.catch` перехватывает все виды ошибок в промисах: будь то вызов `reject()` или ошибка, брошенная в обработчике при помощи `throw`.
- Необходимо размещать `.catch` там, где мы хотим обработать ошибки и знаем, как это сделать. Обработчик может проанализировать ошибку (могут быть полезны пользовательские классы ошибок) и пробросить её, если ничего не знает о ней (возможно, это программная ошибка).
- Можно и совсем не использовать `.catch`, если нет нормального способа восстановиться после ошибки.
- В любом случае нам следует использовать обработчик события `unhandledrejection` (для браузеров и аналог для других окружений), чтобы отслеживать необработанные ошибки и информировать о них пользователя (и, возможно, наш сервер), благодаря чему наше приложение никогда не будет "просто умирать".
=======
- `.catch` handles errors in promises of all kinds: be it a `reject()` call, or an error thrown in a handler.
- We should place `.catch` exactly in places where we want to handle errors and know how to handle them. The handler should analyze errors (custom error classes help) and rethrow unknown ones (maybe they are programming mistakes).
- It's ok not to use `.catch` at all, if there's no way to recover from an error.
- In any case we should have the `unhandledrejection` event handler (for browsers, and analogs for other environments) to track unhandled errors and inform the user (and probably our server) about them, so that our app never "just dies".
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
