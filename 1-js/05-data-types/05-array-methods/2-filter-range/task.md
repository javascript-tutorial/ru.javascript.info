importance: 4

---

# Фильтрация по диапазону

<<<<<<< HEAD
Напишите функцию `filterRange(arr, a, b)`, которая принимает массив `arr`, ищет в нём элементы между `a` и `b` и отдаёт массив этих элементов.
=======
Write a function `filterRange(arr, a, b)` that gets an array `arr`, looks for elements with values higher or equal to `a` and lower or equal to `b` and return a result as an array.
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

Функция должна возвращать новый массив и не изменять исходный.

Например:

```js
let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4); 

alert( filtered ); // 3,1 (совпадающие значения)

alert( arr ); // 5,3,8,1 (без изменений)
```

