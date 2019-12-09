

```js no-beautify
5 > 4 → true
"ананас" > "яблоко" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

Разъяснения:

<<<<<<< HEAD
1. Очевидно, `true`.
2. Используется посимвольное сравнение, поэтому `false`.
3. Снова посимвольное сравнение. Первый символ первой строки `"2"` больше, чем первый символ второй `"1"`.
4. Специальный случай. Значения `null` и `undefined` равны друг другу при нестрогом сравнении.
5. Строгое сравнение разных типов, поэтому `false`.
6. Аналогично `(4)`, `null` равен только `undefined`.
7. Строгое сравнение разных типов.
=======
1. Obviously, true.
2. Dictionary comparison, hence false. `"a"` is smaller than `"p"`.
3. Again, dictionary comparison, first char of `"2"` is greater than the first char of `"1"`.
4. Values `null` and `undefined` equal each other only.
5. Strict equality is strict. Different types from both sides lead to false.
6. Similar to `(4)`, `null` only equals `undefined`.
7. Strict equality of different types.
>>>>>>> 5b195795da511709faf79a4d35f9c5623b6dbdbd
