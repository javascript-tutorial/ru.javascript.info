importance: 5

---

# Свойство функции после bind

<<<<<<< HEAD
В свойство функции записано значение. Изменится ли оно после применения `bind`? Обоснуйте ответ.
=======
There's a value in the property of a function. Will it change after `bind`? Why, or why not?
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

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

