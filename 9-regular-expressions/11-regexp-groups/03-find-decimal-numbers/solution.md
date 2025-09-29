<<<<<<< HEAD
Положительное число с необязательным присутствием десятичной части (из прошлой задачи): `pattern:\d+(\.\d+)?`.
=======
A positive number with an optional decimal part is: `pattern:\d+(\.\d+)?`.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Добавим необязательный минус `pattern:-?` в начало:

```js run
let regexp = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) );   // -1.5, 0, 2, -123.4
```
