importance: 5

---

<<<<<<< HEAD
# Что код выведет в консоли?
=======
# What will be the output of this code?
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

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
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
