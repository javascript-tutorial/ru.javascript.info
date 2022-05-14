importance: 4

---

# Создайте объект с ключами из массива

Допустим, мы получили массив пользователей в виде `{id:..., name:..., age:... }`.

Создайте функцию `groupById(arr)`, которая создает из нее объект с `id` в качестве ключа и элементами массива в качестве значений.

Например:

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
// после вызова у нас должно получиться:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

Такая функция действительно удобна при работе с серверными данными.

В этой задаче мы предполагаем, что `id` уникален. Не может быть двух элементов массива с одинаковым `id`.

Используйте метод array `.reduce` в решении.
