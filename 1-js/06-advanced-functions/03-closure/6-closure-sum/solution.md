<<<<<<< HEAD
Чтобы вторые скобки заработали, первые -- должны вернуть функцию.

Вот так:
=======
For the second parentheses to work, the first ones must return a function.

Like this:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
function sum(a) {

  return function(b) {
<<<<<<< HEAD
    return a + b; // берёт "a" из внешнего лексического окружения
=======
    return a + b; // takes "a" from the outer lexical environment
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

