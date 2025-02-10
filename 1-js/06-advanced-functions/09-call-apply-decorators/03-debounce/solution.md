```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```

<<<<<<< HEAD
Вызов `debounce` возвращает обёртку. При вызове он планирует вызов исходной функции через указанное количество `ms` и отменяет предыдущий такой тайм-аут.
=======
A call to `debounce` returns a wrapper. When called, it schedules the original function call after given `ms` and cancels the previous such timeout.

>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
