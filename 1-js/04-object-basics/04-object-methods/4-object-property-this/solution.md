**Ответ: ошибка.**

Проверьте:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```

Это потому, что правила, которые определяют значение `this`, никак не смотрят на объявление объекта. Важен лишь момент вызова.

Здесь значение `this` внутри `makeUser()` равно `undefined`, потому что оно вызывается как функция, а не через "точечный" синтаксис как метод.

Значение `this` одно для всей функции, блоки кода и объектные литералы на него не влияют.

Таким образом, `ref: this` фактически принимает текущее `this` функции `makeUser()`.

<<<<<<< HEAD
Мы можем переписать функцию и вернуть то же самое `this` со значением `undefined`:

```js run
function makeUser(){
  return this; // на этот раз нет литерала объекта
=======
We can rewrite the function and return the same `this` with `undefined` value: 

```js run
function makeUser(){
  return this; // this time there's no object literal
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
<<<<<<< HEAD
Как вы можете видеть, результат `alert( makeUser().name )` совпадает с результатом `alert( user.ref.name )` из предыдущего примера.

Вот противоположный случай:
=======
As you can see the result of `alert( makeUser().name )` is the same as the result of `alert( user.ref.name )` from the previous example.

Here's the opposite case:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
}

let user = makeUser();

alert( user.ref().name ); // John
```

Теперь это работает, поскольку `user.ref()` - это метод. И значением `this` становится объект перед точкой `.`.
