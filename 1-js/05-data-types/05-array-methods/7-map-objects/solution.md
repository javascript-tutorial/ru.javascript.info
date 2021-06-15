
```js run no-beautify
let vasya = { name: "Вася", surname: "Пупкин", id: 1 };
let petya = { name: "Петя", surname: "Иванов", id: 2 };
let masha = { name: "Маша", surname: "Петрова", id: 3 };

let users = [ vasya, petya, masha ];

*!*
let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
*/!*

/*
usersMapped = [
  { fullName: "Вася Пупкин", id: 1 },
  { fullName: "Петя Иванов", id: 2 },
  { fullName: "Маша Петрова", id: 3 }
]
*/

alert( usersMapped[0].id ); // 1
alert( usersMapped[0].fullName ); // Вася Пупкин
```

<<<<<<< HEAD
Обратите внимание, что для стрелочных функций мы должны использовать дополнительные скобки.
=======
Please note that in the arrow functions we need to use additional brackets. 
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Мы не можем написать вот так:
```js
let usersMapped = users.map(user => *!*{*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
});
```

Как мы помним, есть две функции со стрелками: без тела `value => expr` и с телом `value => {...}`.

Здесь JavaScript будет трактовать `{` как начало тела функции, а не начало объекта. Чтобы обойти это, нужно заключить их в "нормальные" скобки:

```js
let usersMapped = users.map(user => *!*({*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
```

Теперь всё хорошо.


