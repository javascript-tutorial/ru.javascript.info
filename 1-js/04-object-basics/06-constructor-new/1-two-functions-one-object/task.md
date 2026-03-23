importance: 2

---

# Две функции - один объект

<<<<<<< HEAD
Возможно ли создать функции `A` и `B`, чтобы `new A() == new B()`?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```

Если да – приведите пример вашего кода.
