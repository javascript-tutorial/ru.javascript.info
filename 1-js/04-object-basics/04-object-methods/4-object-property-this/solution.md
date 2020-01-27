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

Это потому, что правила, которые определяют значение `this`, никак не смотрят на объявление объекта. Важен лишь момент вызова метода.

Здесь значение `this` внутри `makeUser()` является `undefined`, потому что `makeUser()` вызвана как функция, не через "точку" как метод.

Литерал объекта сам по себе не влияет на `this`. Значение `this` одно для всей функции и блоков кода в ней, литеральные объекты не меняют его.

Таким образом, при создании объекта `ref: this` берёт текущее значение `this` функции `makeUser()`.

<<<<<<< HEAD
А вот противоположный случай:
=======
We can rewrite the function and return the same `this` with `undefined` value: 

```js run
function makeUser(){
  return this; // this time there's no object literal
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
As you can see the result of `alert( makeUser().name )` is the same as the result of `alert( user.ref.name )` from the previous example.

Here's the opposite case:
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

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

Теперь это работает, поскольку `user.ref()` вызывается как метод. И значением `this` становится объект перед точкой `.`.
