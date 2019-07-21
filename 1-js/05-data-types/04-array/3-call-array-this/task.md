importance: 5

---

# Вызов в контексте массива

Каков результат? Почему?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // ?
```

