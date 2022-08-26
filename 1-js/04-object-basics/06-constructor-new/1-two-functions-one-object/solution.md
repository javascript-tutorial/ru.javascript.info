Да, возможно.

Если функция возвращает объект, то `new` вернёт его вместо `this`.

Таким образом, они могут, к примеру, возвращать один и тот же внешне определённый объект `obj`:

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
