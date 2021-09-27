importance: 2

---

# Две функции - один объект

Возможно ли создать функции `A` и `B` в примере ниже, где объекты равны `new A()==new B()`?

<<<<<<< HEAD
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Если да - приведите пример вашего кода.
