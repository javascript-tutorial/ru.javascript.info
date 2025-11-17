<<<<<<< HEAD
Чтобы вторые скобки заработали, первые -- должны вернуть функцию.

Вот так:
=======
For the second parentheses to work, the first ones must return a function.

Like this:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
function sum(a) {

  return function(b) {
<<<<<<< HEAD
    return a + b; // берёт "a" из внешнего лексического окружения
=======
    return a + b; // takes "a" from the outer lexical environment
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

