Да, возможно.

Если функция возвращает объект, то вместо `this` будет возвращён этот объект.

Например, они могут вернуть один и тот же объект `obj`, определённый снаружи:

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
