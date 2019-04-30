importance: 5

---

# Независимы ли счётчики?

Здесь мы делаем два счётчика: `counter` и `counter2`, используя одну и ту же функцию `makeCounter`.

Они независимы? Что покажет второй счётчик? `0,1` или `2,3` или что-то ещё?

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```

