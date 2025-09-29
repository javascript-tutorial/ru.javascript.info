importance: 4

---

# Какие буквы (заглавные или строчные) использовать для имён констант?

Рассмотрим следующий код:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

<<<<<<< HEAD
У нас есть константа `birthday`, а также `age`, которая вычисляется при помощи некоторого кода, используя значение из `birthday` (в данном случае детали не имеют значения, поэтому код не рассматривается).
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Можно ли использовать заглавные буквы для имени `birthday`? А для `age`? Или одновременно для обеих переменных?

```js
<<<<<<< HEAD
const BIRTHDAY = '18.04.1982'; // использовать заглавные буквы?

const AGE = someCode(BIRTHDAY); // а здесь?
=======
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
```
