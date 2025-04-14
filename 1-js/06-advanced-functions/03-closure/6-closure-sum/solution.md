<<<<<<< HEAD
Чтобы вторые скобки заработали, первые -- должны вернуть функцию.

Вот так:
=======
For the second parentheses to work, the first ones must return a function.

Like this:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
function sum(a) {

  return function(b) {
<<<<<<< HEAD
    return a + b; // берёт "a" из внешнего лексического окружения
=======
    return a + b; // takes "a" from the outer lexical environment
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

