importance: 4

---

# Видна ли переменная?

Что выведет данный код?

```js
let x = 1;

function func() {
  console.log(x); // ?

  let x = 2;
}

func();
```

P.S. В этой задаче есть подвох. Решение не очевидно.
