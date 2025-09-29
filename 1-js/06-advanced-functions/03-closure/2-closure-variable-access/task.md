importance: 5

---

<<<<<<< HEAD
# Какие переменные доступны?

Приведенная ниже функция `makeWorker` создает другую функцию и возвращает ее. Эта новая функция может быть вызвана из другого места.

Будет ли она иметь доступ к внешним переменным из места своего создания, или из места вызова, или из обоих мест?
=======
# Which variables are available?

The function `makeWorker` below makes another function and returns it. That new function can be called from somewhere else.

Will it have access to the outer variables from its creation place, or the invocation place, or both?
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

<<<<<<< HEAD
// создаём функцию
let work = makeWorker();

// вызываем её
work(); // что будет показано?
```

Какое значение будет показано? "Pete" или "John"?
=======
// create a function
let work = makeWorker();

// call it
work(); // what will it show?
```

Which value it will show? "Pete" or "John"?
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
