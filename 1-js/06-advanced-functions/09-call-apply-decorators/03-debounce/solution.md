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

>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c
