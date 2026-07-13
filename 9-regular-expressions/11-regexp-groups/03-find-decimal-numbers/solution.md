<<<<<<< HEAD
Положительное число с необязательным присутствием десятичной части (из прошлой задачи): `pattern:\d+(\.\d+)?`.
=======
A positive number with an optional decimal part is: `pattern:\d+(\.\d+)?`.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

Добавим необязательный минус `pattern:-?` в начало:

```js run
let regexp = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) );   // -1.5, 0, 2, -123.4
```
