importance: 5

---

# Странный instanceof

Почему `instanceof` внизу возвращает `true`? Мы можем легко увидеть, что `a` не создан с помощью `B()`.

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
