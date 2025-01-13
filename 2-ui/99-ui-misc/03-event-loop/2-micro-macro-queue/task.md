importance: 5

---

<<<<<<< HEAD
# Что код выведет в консоли?
=======
# What will be the output of this code?
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);
```
<<<<<<< HEAD

=======
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
