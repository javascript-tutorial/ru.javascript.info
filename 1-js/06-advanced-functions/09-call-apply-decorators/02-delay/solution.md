Решение:

```js run demo
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("test"); // показывает "test" после 1000 мс
```

Обратите внимание, как здесь используется функция-стрелка. Как мы знаем, функция-стрелка не имеет собственных `this` и `arguments`, поэтому `f.apply(this, arguments)` берет `this` и `arguments` из обёртки.

Если мы передадим обычную функцию, `setTimeout` вызовет её без аргументов и с `this=window` (при условии, что код выполняется в браузере).

Мы всё ещё можем передать правильный `this`, используя промежуточную переменную, но это немного громоздко:

```js
function delay(f, ms) {

  return function(...args) {
    let savedThis = this; // сохраняем this в промежуточную переменную
    setTimeout(function() {
      f.apply(savedThis, args); // используем её
    }, ms);
  };

}
```
