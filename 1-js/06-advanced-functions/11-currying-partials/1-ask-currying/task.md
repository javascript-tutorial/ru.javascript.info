importance: 5

---

# Частичное применение для логина

Эта задача -- немного более усложнённый вариант <info:task/question-use-bind>.

Объект `user` был изменён. Теперь вместо двух функций `loginOk/loginFail`, у него одна функция: `user.login(true/false)`.

Что нужно передать функции `askPassword` в коде ниже, чтобы она вызывала `user.login(true)` как `ok` и `user.login(false)` как `fail`?

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

Вы можете изменять только подсвеченные фрагменты кода.

