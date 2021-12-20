importance: 2

---

# Две функции - один объект

Возможно ли создать функции `A` и `B` в примере ниже, где объекты равны `new A()==new B()`?

<<<<<<< HEAD
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 8d04d0d2db97276dbb2b451c30a7bd3e05d65831

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Если да - приведите пример вашего кода.
