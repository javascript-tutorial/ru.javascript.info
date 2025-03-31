importance: 2

---

# Две функции - один объект

<<<<<<< HEAD
Возможно ли создать функции `A` и `B`, чтобы `new A() == new B()`?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```

Если да – приведите пример вашего кода.
