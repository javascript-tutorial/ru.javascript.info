importance: 5

---

# Отсортировать пользователей по возрасту

Напишите функцию `sortByAge(users)`, которая принимает массив объектов со свойством `age` и сортирует их по нему.

Например:

```js no-beautify
let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let arr = [ vasya, petya, masha ];

sortByAge(arr);

// теперь: [vasya, masha, petya]
alert(arr[0].name); // Вася
alert(arr[1].name); // Маша
alert(arr[2].name); // Петя
```
