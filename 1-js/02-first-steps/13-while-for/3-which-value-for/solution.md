<<<<<<< HEAD
**Ответ: от `0` до `4` в обоих случаях.**
=======
**The answer: from `0` to `4` in both cases.**
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );
```

<<<<<<< HEAD
Такой результат обусловлен алгоритмом работы `for`:

1. Выполнить единожды присваивание `i = 0` перед чем-либо (начало).
2. Проверить условие `i < 5`
3. Если `true` -- выполнить тело цикла `alert(i)`, и затем `i++`

Увеличение `i++` выполняется отдельно от проверки условия `(2)`, значение `i` при этом не используется, поэтому нет никакой разницы между `i++` и `++i`.
=======
That can be easily deducted from the algorithm of `for`:

1. Execute once `i = 0` before everything (begin).
2. Check the condition `i < 5`
3. If `true` -- execute the loop body `alert(i)`, and then `i++`

The increment `i++` is separated from the condition check (2). That's just another statement.

The value returned by the increment is not used here, so there's no difference between `i++` and `++i`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
