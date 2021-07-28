```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}
<<<<<<< HEAD
```

Вызов `debounce` возвращает обёртку. Возможны два состояния:
- `isCooldown = false` -- готова к выполнению.
- `isCooldown = true` -- ожидание окончания тайм-аута.

В первом вызове `isCoolDown = false`, поэтому вызов продолжается, и состояние изменяется на `true`.

Пока `isCoolDown` имеет значение `true`, все остальные вызовы игнорируются.

Затем `setTimeout` устанавливает его в `false` после заданной задержки.
=======

```

A call to `debounce` returns a wrapper. When called, it schedules the original function call after given `ms` and cancels the previous such timeout.

>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b
