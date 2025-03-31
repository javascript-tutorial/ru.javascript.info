<<<<<<< HEAD
Чтобы вторые скобки заработали, первые -- должны вернуть функцию.

Вот так:
=======
For the second parentheses to work, the first ones must return a function.

Like this:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
function sum(a) {

  return function(b) {
<<<<<<< HEAD
    return a + b; // берёт "a" из внешнего лексического окружения
=======
    return a + b; // takes "a" from the outer lexical environment
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

