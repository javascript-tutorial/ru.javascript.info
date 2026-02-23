<<<<<<< HEAD
Чтобы вторые скобки заработали, первые -- должны вернуть функцию.

Вот так:
=======
For the second parentheses to work, the first ones must return a function.

Like this:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js run
function sum(a) {

  return function(b) {
<<<<<<< HEAD
    return a + b; // берёт "a" из внешнего лексического окружения
=======
    return a + b; // takes "a" from the outer lexical environment
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

