<<<<<<< HEAD
Чтобы вторые скобки заработали, первые -- должны вернуть функцию.

Вот так:
=======
For the second parentheses to work, the first ones must return a function.

Like this:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js run
function sum(a) {

  return function(b) {
<<<<<<< HEAD
    return a + b; // берёт "a" из внешнего лексического окружения
=======
    return a + b; // takes "a" from the outer lexical environment
>>>>>>> 20208769e528337949e946f526534d61d38bac47
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

