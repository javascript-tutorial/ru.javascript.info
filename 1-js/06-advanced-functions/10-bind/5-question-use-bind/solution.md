
Ошибка происходит потому, что `askPassword` получает функции `loginOk/loginFail` без контекста.

Когда они вызываются, то, естественно, `this=undefined`.

Используем `bind`, чтобы передать в `askPassword` функции `loginOk/loginFail` с уже привязанным контекстом:

```js run
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'Вася',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

*!*
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
*/!*
```

Теперь всё работает корректно.

Альтернативное решение - сделать функции-обёртки над `user.loginOk/loginFail`:
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

Обычно это также работает и хорошо выглядит. Но может не сработать в более сложных ситуациях, а именно - когда значение переменной `user` меняется между вызовом `askPassword` и выполнением `() => user.loginOk()`.
