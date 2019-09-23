importance: 5

---

# Свойство функции после bind

<<<<<<< HEAD
В свойство функции записано значение. Изменится ли оно после применения `bind`? Обоснуйте ответ.
=======
There's a value in the property of a function. Will it change after `bind`? Why, or why not?
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "Вася"
});

alert( bound.test ); // что выведет? почему?
*/!*
```

