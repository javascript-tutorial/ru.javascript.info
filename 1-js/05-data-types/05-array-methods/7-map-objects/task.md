importance: 5

---

# Трансформировать в объекты

У вас есть массив объектов `user`, и у каждого из объектов есть `name`, `surname` и `id`.

Напишите код, который создаст ещё один массив объектов с параметрами `id` и `fullName`, где `fullName` - состоит из `name` и `surname`.

Например:

```js no-beautify
let vasya = { name: "Вася", surname: "Пупкин", id: 1 };
let petya = { name: "Петя", surname: "Иванов", id: 2 };
let masha = { name: "Маша", surname: "Петрова", id: 3 };

let users = [ vasya, petya, masha ];

*!*
let usersMapped = /* ... ваш код ... */
*/!*

/*
usersMapped = [
  { fullName: "Вася Пупкин", id: 1 },
  { fullName: "Петя Иванов", id: 2 },
  { fullName: "Маша Петрова", id: 3 }
]
*/

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // Вася Пупкин
```

Итак, на самом деле вам нужно трансформировать один массив объектов в другой. Попробуйте использовать `=>`. Это небольшая уловка.