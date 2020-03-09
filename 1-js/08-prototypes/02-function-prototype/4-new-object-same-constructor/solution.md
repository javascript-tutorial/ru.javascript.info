Мы можем использовать такой способ, если мы уверены в том, что свойство `"constructor"` существующего объекта имеет корректное значение.

Например, если мы не меняли `"prototype"`, используемый по умолчанию, то код ниже, без сомнений, сработает:

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (сработало!)
```

Всё получилось, потому что `User.prototype.constructor == User`.

<<<<<<< HEAD
...Но если кто-то перезапишет `User.prototype` и забудет заново назначить свойство `"constructor"`, чтобы оно указывало на `User`, то ничего не выйдет.
=======
..But if someone, so to speak, overwrites `User.prototype` and forgets to recreate `constructor` to reference `User`, then it would fail.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

Например:

```js run
function User(name) {
  this.name = name;
}
*!*
User.prototype = {}; // (*)
*/!*

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // undefined
```

Почему `user2.name` приняло значение `undefined`?

Рассмотрим, как отработал вызов `new user.constructor('Pete')`:

1. Сначала ищется свойство `constructor` в объекте `user`. Не нашлось.
2. Потом задействуется поиск по цепочке прототипов. Прототип объекта `user` -- это `User.prototype`, и там тоже нет искомого свойства.
3. Значение `User.prototype` -- это пустой объект `{}`, чей прототип -- `Object.prototype`. `Object.prototype.constructor == Object`. Таким образом, свойство `constructor` всё-таки найдено.

<<<<<<< HEAD
Наконец срабатывает `let user2 = new Object('Pete')`, но конструктор `Object` игнорирует аргументы, он всегда создаёт пустой объект: `let user2 = {}` -- это как раз то, чему равен `user2` в итоге.
=======
At the end, we have `let user2 = new Object('Pete')`. The built-in `Object` constructor ignores arguments, it always creates an empty object, similar to `let user2 = {}`, that's what we have in `user2` after all.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
