importance: 5

---

# Деструктурирующее присваивание

У нас есть объект:

```js
let user = {
  name: "John",
  years: 30
};
```

Напишите деструктурирующее присваивание, которое:

<<<<<<< HEAD
- свойство `name` присвоит в переменную `name`.
- свойство `years` присвоит в переменную `age`.
- свойство `isAdmin` присвоит в переменную `isAdmin` (false, если нет такого свойства)

Пример переменных после вашего присваивания:
=======
- `name` property into the variable `name`.
- `years` property into the variable `age`.
- `isAdmin` property into the variable `isAdmin` (false, if no such property)

Here's an example of the values after your assignment:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```js
let user = { name: "John", years: 30 };

// ваш код должен быть с левой стороны:
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
