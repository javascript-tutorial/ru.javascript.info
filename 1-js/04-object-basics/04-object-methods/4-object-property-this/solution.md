**Ответ: ошибка.**

Проверьте:
```js run
function makeUser() {
  return {
    name: "Джон",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```

<<<<<<< HEAD
Это потому, что правила, которые определяют значение `this`, никак не смотрят на объявление объекта. Важен лишь момент вызова метода.

Здесь значение `this` внутри `makeUser()` является `undefined`, потому что `makeUser()` вызвана как функция, не через "точку" как метод.

Литерал объекта сам по себе не влияет на `this`. Значение `this` одно для всей функции и блоков кода в ней, литеральные объекты не меняют его.
=======
That's because rules that set `this` do not look at object definition. Only the moment of call matters.

Here the value of `this` inside `makeUser()` is `undefined`, because it is called as a function, not as a method with "dot" syntax.

The value of `this` is one for the whole function, code blocks and object literals do not affect it.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Таким образом, при создании объекта `ref: this` берёт текущее значение `this` функции `makeUser()`.

А вот противоположный случай:

```js run
function makeUser() {
  return {
    name: "Джон",
*!*
    ref() {
      return this;
    }
*/!*
  };
};

let user = makeUser();

alert( user.ref().name ); // Джон
```

<<<<<<< HEAD
Теперь это работает, поскольку `user.ref()` вызывается как метод. И значением `this` становится объект перед точкой `.`.


=======
Now it works, because `user.ref()` is a method. And the value of `this` is set to the object before dot `.`.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
