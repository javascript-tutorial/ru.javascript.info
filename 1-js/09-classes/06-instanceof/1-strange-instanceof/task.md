importance: 5

---

# Странный instanceof

<<<<<<< HEAD
Почему `instanceof` в примере ниже возвращает `true`? Мы же видим, что `a` не создан с помощью `B()`.
=======
In the code below, why does `instanceof` return `true`? We can easily see that `a` is not created by `B()`.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
