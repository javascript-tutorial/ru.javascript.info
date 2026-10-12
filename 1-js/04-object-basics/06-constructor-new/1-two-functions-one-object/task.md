importance: 2

---

# Две функции - один объект

<<<<<<< HEAD
Возможно ли создать функции `A` и `B`, чтобы `new A() == new B()`?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```

Если да – приведите пример вашего кода.
