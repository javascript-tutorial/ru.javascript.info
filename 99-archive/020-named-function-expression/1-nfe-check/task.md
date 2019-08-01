importance: 5

---

# Проверка на NFE

Каков будет результат выполнения кода?

```js no-beautify
function g() { return 1; }

alert(g);
```

А такого? Будет ли разница, если да -- почему?

```js no-beautify
(function g() { return 1; });

alert(g);
```

