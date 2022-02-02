importance: 5

---

# Использование частично применённой функции для логина

Это задание является немного усложнённым вариантом одного из предыдущих -- <info:task/question-use-bind>.

Объект `user` был изменён. Теперь вместо двух функций `loginOk/loginFail` у него есть только одна -- `user.login(true/false)`.

Что нужно передать в вызов функции `askPassword` в коде ниже, чтобы она могла вызывать функцию `user.login(true)` как `ok` и функцию `user.login(false)` как `fail`?

```js
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

*!*
askPassword(?, ?); // ?
*/!*
```

Ваши изменения должны затрагивать только выделенный фрагмент кода.
