importance: 5

---

# Сортировать по полю

У нас есть массив объектов, который нужно отсортировать:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

Обычный способ был бы таким:

```js
// по имени (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// по возрасту (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

Можем мы сделать его более кратким, например, вот так?

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

Таким образом, чтобы вместо функции, мы просто писали `byField(fieldName)`.

Напишите функцию `byField`, которая может быть использована для этого.
