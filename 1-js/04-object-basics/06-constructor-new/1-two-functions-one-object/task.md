importance: 2

---

# Две функции - один объект

<<<<<<< HEAD
Возможно ли создать функции `A` и `B`, чтобы `new A() == new B()`?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```

Если да – приведите пример вашего кода.
