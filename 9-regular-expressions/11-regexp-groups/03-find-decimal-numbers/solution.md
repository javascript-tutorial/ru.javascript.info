<<<<<<< HEAD
Положительное число с необязательным присутствием десятичной части (из прошлой задачи): `pattern:\d+(\.\d+)?`.
=======
A positive number with an optional decimal part is: `pattern:\d+(\.\d+)?`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Добавим необязательный минус `pattern:-?` в начало:

```js run
let regexp = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) );   // -1.5, 0, 2, -123.4
```
