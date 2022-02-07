importance: 2

---

# Две функции - один объект

Возможно ли создать функции `A` и `B` в примере ниже, где объекты равны `new A()==new B()`?

<<<<<<< HEAD
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Если да - приведите пример вашего кода.
