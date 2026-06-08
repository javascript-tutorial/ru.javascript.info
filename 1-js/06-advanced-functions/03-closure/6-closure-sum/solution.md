<<<<<<< HEAD
Чтобы вторые скобки заработали, первые -- должны вернуть функцию.

Вот так:
=======
For the second parentheses to work, the first ones must return a function.

Like this:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js run
function sum(a) {

  return function(b) {
<<<<<<< HEAD
    return a + b; // берёт "a" из внешнего лексического окружения
=======
    return a + b; // takes "a" from the outer lexical environment
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

