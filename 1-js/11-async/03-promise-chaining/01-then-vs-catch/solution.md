<<<<<<< HEAD
Короткий ответ: **нет, они не эквивалентны**:
=======
The short answer is: **no, they are not equal**:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Разница в том, что если ошибка произойдёт в `f1`, то она будет обработана в `.catch` в этом примере:

```js run
promise
  .then(f1)
  .catch(f2);
```

...но не в этом:

```js run
promise
  .then(f1, f2);
```

Ошибка передаётся по цепочке, но во втором примере нет продолжения цепочки после `f1`.

<<<<<<< HEAD
Другими словами, `.then` передаёт результат или ошибку следующему блоку `.then/catch`. Так как в первом примере в цепочке далее имеется блок `catch`, а во втором - нет, то ошибка в нём останется необработанной.
=======
In other words, `.then` passes results/errors to the next `.then/catch`. So in the first example, there's a `catch` below, and in the second one there isn't, so the error is unhandled.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
