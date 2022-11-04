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

...Но если кто-то перезапишет `User.prototype` и забудет заново назначить свойство `"constructor"`, чтобы оно указывало на `User`, то ничего не выйдет.

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
3. Идя дальше по цепочке, значение `User.prototype` -- это пустой объект `{}`, чей прототип -- встроенный `Object.prototype`. 
4. Наконец, для встроенного `Object.prototype` предусмотрен встроенный `Object.prototype.constructor == Object`. Таким образом, свойство `constructor` всё-таки найдено.

В итоге срабатывает `let user2 = new Object('Pete')`.

Вероятно, это не то, что нам нужно. Мы хотели создать `new User`, а не `new Object`. Это и есть результат отсутствия конструктора.

(На всякий случай, если вам интересно, вызов `new Object(...)` преобразует свой аргумент в объект. Это теоретическая вещь, на практике никто не вызывает `new Object` со значением, тем более, в основном мы вообще не используем `new Object` для создания объектов).
