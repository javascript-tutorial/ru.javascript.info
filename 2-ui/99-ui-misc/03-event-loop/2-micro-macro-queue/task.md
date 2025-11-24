importance: 5

---

<<<<<<< HEAD
# Что код выведет в консоли?
=======
# What will be the output of this code?
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

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
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
