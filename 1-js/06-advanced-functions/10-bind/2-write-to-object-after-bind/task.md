importance: 5

---

# Связанная функция как метод

Что выведет функция?

```js
function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
```

