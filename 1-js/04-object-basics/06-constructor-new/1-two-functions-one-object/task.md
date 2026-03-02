importance: 2

---

# Две функции - один объект

<<<<<<< HEAD
Возможно ли создать функции `A` и `B`, чтобы `new A() == new B()`?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```

Если да – приведите пример вашего кода.
