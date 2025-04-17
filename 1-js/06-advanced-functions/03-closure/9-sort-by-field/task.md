importance: 5

---

<<<<<<< HEAD
# Сортировать по полю

У нас есть массив объектов, который нужно отсортировать:

```js
let users = [
  { name: "Иван", age: 20, surname: "Иванов" },
  { name: "Пётр", age: 18, surname: "Петров" },
  { name: "Анна", age: 19, surname: "Каренина" }
];
```

Обычный способ был бы таким:

```js
// по имени (Анна, Иван, Пётр)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// по возрасту (Пётр, Анна, Иван)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

Можем ли мы сделать его короче, например вот таким?
=======
# Sort by field

We've got an array of objects to sort:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

The usual way to do that would be:

```js
// by name (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// by age (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

Can we make it even less verbose, like this?
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

<<<<<<< HEAD
То есть чтобы вместо функции мы просто писали `byField(fieldName)`.

Напишите функцию `byField`, которая может быть использована для этого.
=======
So, instead of writing a function, just put `byField(fieldName)`.

Write the function `byField` that can be used for that.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
