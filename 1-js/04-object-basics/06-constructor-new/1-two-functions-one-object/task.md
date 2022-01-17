importance: 2

---

# Две функции - один объект

Возможно ли создать функции `A` и `B` в примере ниже, где объекты равны `new A()==new B()`?

<<<<<<< HEAD
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> a6fdfda09570a8ce47bb0b83cd7a32a33869cfad

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Если да - приведите пример вашего кода.
