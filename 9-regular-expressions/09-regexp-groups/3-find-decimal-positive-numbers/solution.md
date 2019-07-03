
<<<<<<< HEAD
Регулярное выражение для неотрицательного целого числа `pattern:\d+`. Мы должны исключить `0` в качестве первой цифры, так как нам не нужен ноль, но мы можем разрешить его появление далее.
=======
An non-negative integer number is `pattern:\d+`. A zero `0` can't be the first digit,  but we should allow it in further digits.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Нам позволит сделать это регулярное выражение: `pattern:[1-9]\d*`.

Десятичная часть находится с помощью: `pattern:\.\d+`.

<<<<<<< HEAD
Поскольку десятичная часть является необязательной, то давайте заключим ее в скобки с квантификатором `pattern:'?'`.
=======
Because the decimal part is optional, let's put it in parentheses with the quantifier `pattern:?`.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

В итоге, мы получаем регулярное выражение: `pattern:[1-9]\d*(\.\d+)?`:

```js run
let reg = /[1-9]\d*(\.\d+)?/g;

let str = "1.5 0 -5 12. 123.4.";

alert( str.match(reg) );   // 1.5, 0, 12, 123.4
```
