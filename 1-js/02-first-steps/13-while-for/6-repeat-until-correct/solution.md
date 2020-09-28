
```js run demo
let num;

do {
  num = prompt("Введите число, большее 100?", 0);
} while (num <= 100 && num);
```

Цикл `do..while` повторяется, пока верны две проверки:

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/6-repeat-until-correct/solution.md
1. Проверка `num <= 100` -- то есть, введённое число всё ещё меньше `100`.
2. Проверка `&& num` вычисляется в `false`, когда `num` имеет значение `null` или пустая строка `''`. В этом случае цикл `while` тоже нужно прекратить.
=======
1. The check for `num <= 100` -- that is, the entered value is still not greater than `100`.
2. The check `&& num` is false when `num` is `null` or an empty string. Then the `while` loop stops too.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d:1-js/02-first-steps/13-while-for/6-repeat-until-correct/solution.md

Кстати, сравнение `num <= 100` при вводе `null` даст `true`, так что вторая проверка необходима.
