Вариант решения с использованием `if`:

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

Вариант решения с оператором `?`:

```js
function min(a, b) {
  return a < b ? a : b;
}
```

P.S. В случае равенства `a == b` не имеет значения, что возвращать.
