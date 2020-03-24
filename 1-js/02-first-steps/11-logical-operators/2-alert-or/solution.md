Ответ: сначала `1`, затем `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

Вызов `alert` не возвращает значения, или, иначе говоря, возвращает `undefined`.

<<<<<<< HEAD
1. Первый оператор ИЛИ `||` выполнит первый `alert(1)`.
2. Получит `undefined` и пойдёт дальше, ко второму операнду в поисках истинного значения.
3. Так как второй операнд `2` является истинным, то вычисления завершатся, результатом `undefined || 2` будет `2`, которое будет выведено внешним `alert( .... )`.
=======
1. The first OR `||` evaluates its left operand `alert(1)`. That shows the first message with `1`.
2. The `alert` returns `undefined`, so OR goes on to the second operand searching for a truthy value.
3. The second operand `2` is truthy, so the execution is halted, `2` is returned and then shown by the outer alert.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

Второй оператор `||` не будет выполнен, выполнение до `alert(3)` не дойдёт, поэтому `3` выведено не будет.
