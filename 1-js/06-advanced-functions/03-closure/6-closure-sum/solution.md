<<<<<<< HEAD
Чтобы вторые скобки заработали, первые -- должны вернуть функцию.

Вот так:
=======
For the second parentheses to work, the first ones must return a function.

Like this:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js run
function sum(a) {

  return function(b) {
<<<<<<< HEAD
    return a + b; // берёт "a" из внешнего лексического окружения
=======
    return a + b; // takes "a" from the outer lexical environment
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

