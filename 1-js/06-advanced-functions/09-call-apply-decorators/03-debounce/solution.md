```js demo
function debounce(f, ms) {

  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };

}
```

Вызов `debounce` возвращает обёртку. Возможны два состояния:
- `isCooldown = false` -- готова к выполнению.
- `isCooldown = true` -- ожидание окончания тайм-аута.

В первом вызове `isCoolDown` является ложным, поэтому вызов продолжается, и состояние изменяется на `true`.

Пока `isCoolDown` имеет значение true, все остальные вызовы игнорируются.

Затем `setTimeout` устанавливает в него значение `false` после заданной задержки.
