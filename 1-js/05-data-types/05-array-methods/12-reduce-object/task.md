importance: 4

---

<<<<<<< HEAD
# Создайте объект с ключами из массива

Допустим, мы получили массив пользователей в виде `{id:..., name:..., age:... }`.

Создайте функцию `groupById(arr)`, которая создаст из него объект с `id` в качестве ключа и элементами массива в качестве значений.

Например:
=======
# Create keyed object from array

Let's say we received an array of users in the form `{id:..., name:..., age:... }`.

Create a function `groupById(arr)` that creates an object from it, with `id` as the key, and array items as values.

For example:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
<<<<<<< HEAD
после вызова у нас должно получиться:
=======
// after the call we should have:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

<<<<<<< HEAD
Такая функция очень удобна при работе с данными, которые приходят с сервера.

В этой задаче мы предполагаем, что `id` уникален. Не может быть двух элементов массива с одинаковым `id`.

Используйте метод `.reduce` в решении.
=======
Such function is really handy when working with server data.

In this task we assume that `id` is unique. There may be no two array items with the same `id`.

Please use array `.reduce` method in the solution.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
