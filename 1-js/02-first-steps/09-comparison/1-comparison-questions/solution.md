

```js no-beautify
5 > 4 → true
<<<<<<< HEAD
"ананас" > "яблоко" → false
=======
"apple" > "pineapple" → false
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

<<<<<<< HEAD
Разъяснения:

1. Очевидно, `true`.
2. Используется посимвольное сравнение, поэтому `false`. `"а"` меньше, чем `"я"`.
3. Снова посимвольное сравнение. Первый символ первой строки `"2"` больше, чем первый символ второй `"1"`.
4. Специальный случай. Значения `null` и `undefined` равны только друг другу при нестрогом сравнении.
5. Строгое сравнение разных типов, поэтому `false`.
6. Аналогично `(4)`, `null` равен только `undefined`.
7. Строгое сравнение разных типов.
=======
Some of the reasons:

1. Obviously, true.
2. Dictionary comparison, hence false. `"a"` is smaller than `"p"`.
3. Again, dictionary comparison, first char `"2"` is greater than the first char `"1"`.
4. Values `null` and `undefined` equal each other only.
5. Strict equality is strict. Different types from both sides lead to false.
6. Similar to `(4)`, `null` only equals `undefined`.
7. Strict equality of different types.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
