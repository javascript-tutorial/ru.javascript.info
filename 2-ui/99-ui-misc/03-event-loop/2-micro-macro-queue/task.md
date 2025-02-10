importance: 5

---

<<<<<<< HEAD
# Что код выведет в консоли?
=======
# What will be the output of this code?
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

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
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
