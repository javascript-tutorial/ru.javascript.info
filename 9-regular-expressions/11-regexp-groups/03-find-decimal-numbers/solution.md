<<<<<<< HEAD
Положительное число с необязательным присутствием десятичной части (из прошлой задачи): `pattern:\d+(\.\d+)?`.
=======
A positive number with an optional decimal part is: `pattern:\d+(\.\d+)?`.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Добавим необязательный минус `pattern:-?` в начало:

```js run
let regexp = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) );   // -1.5, 0, 2, -123.4
```
