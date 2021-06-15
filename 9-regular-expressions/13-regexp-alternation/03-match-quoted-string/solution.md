Решение: `pattern:/"(\\.|[^"\\])*"/g`.

Шаг за шагом:

<<<<<<< HEAD
- Сначала ищем открывающую кавычку `pattern:"`
- Затем, если есть обратный слеш `pattern:\\` (удвоение обратного слеша – техническое, потому что это спец.символ, на самом деле там один обратный слеш), то после него также подойдёт любой символ (точка).
- Иначе берём любой символ, кроме кавычек (которые будут означать конец строки) и обратного слеша (чтобы предотвратить одинокие обратные слеши, сам по себе единственный обратный слеш не нужен, он должен экранировать какой-то символ) `pattern:[^"\\]`
- ...И так далее, до закрывающей кавычки.
=======
- First we look for an opening quote `pattern:"`
- Then if we have a backslash `pattern:\\` (we have to double it in the pattern because it is a special character), then any character is fine after it (a dot).
- Otherwise we take any character except a quote (that would mean the end of the string) and a backslash (to prevent lonely backslashes, the backslash is only used with some other symbol after it): `pattern:[^"\\]`
- ...And so on till the closing quote.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

В действии:

```js run
let regexp = /"(\\.|[^"\\])*"/g;
let str = ' .. "test me" .. "Скажи \\"Привет\\"!" .. "\\\\ \\"" .. ';

alert( str.match(regexp) ); // "test me","Скажи \"Привет\"!","\\ \""
```
