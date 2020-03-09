```js demo
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

Вызов `throttle(func, ms)` возвращает `wrapper`.

<<<<<<< HEAD
1. Во время первого вызова обёртка просто вызывает `func` и устанавливает состояние задержки (`isThrottled = true`).
2. В этом состоянии все вызовы запоминаются в `saveArgs / saveThis`. Обратите внимание, что контекст и аргументы одинаково важны и должны быть запомнены. Они нам нужны для того, чтобы воспроизвести вызов позднее.
3. ... Затем по прошествии `ms` миллисекунд срабатывает `setTimeout`. Состояние задержки сбрасывается (`isThrottled = false`). И если мы проигнорировали вызовы, то "обёртка" выполняется с последними запомненными аргументами и контекстом.
=======
1. During the first call, the `wrapper` just runs `func` and sets the cooldown state (`isThrottled = true`).
2. In this state all calls are memorized in `savedArgs/savedThis`. Please note that both the context and the arguments are equally important and should be memorized. We need them simultaneously to reproduce the call.
3. After `ms` milliseconds pass, `setTimeout` triggers. The cooldown state is removed (`isThrottled = false`) and, if we had ignored calls, `wrapper` is executed with the last memorized arguments and context.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

На третьем шаге выполняется не `func`, а `wrapper`, потому что нам нужно не только выполнить `func`, но и ещё раз установить состояние задержки и таймаут для его сброса.
