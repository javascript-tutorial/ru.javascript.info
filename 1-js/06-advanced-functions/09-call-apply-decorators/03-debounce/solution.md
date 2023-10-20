```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```

Вызов `debounce` возвращает обёртку. При вызове он планирует вызов исходной функции через указанное количество `ms` и отменяет предыдущий такой тайм-аут.