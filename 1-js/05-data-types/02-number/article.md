# Числа

<<<<<<< HEAD
В современном JavaScript существует два типа чисел:
1. Обычные числа в JavaScript хранятся в 64-битном формате [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-1985), который также называют "числа с плавающей точкой двойной точности" (double precision floating point numbers). Это числа, которые мы будем использовать чаще всего. Мы поговорим о них в этой главе.
2. `BigInt` числа дают возможность работать с целыми числами произвольной длины. Они нужны достаточно редко и используются в случаях, когда необходимо работать со значениями более чем <code>(2<sup>53</sup>-1)</code> или менее чем <code>-(2<sup>53</sup>-1)</code>. Так как `BigInt` числа нужны достаточно редко, мы рассмотрим их в отдельной главе <info:bigint>.

В данной главе мы рассмотрим только первый тип чисел: числа типа `number`. Давайте глубже изучим, как с ними работать в JavaScript.
=======
In modern JavaScript, there are two types of numbers:

1. Regular numbers in JavaScript are stored in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), also known as "double precision floating point numbers". These are numbers that we're using most of the time, and we'll talk about them in this chapter.

2. BigInt numbers represent integers of arbitrary length. They are sometimes needed because a regular integer number can't safely exceed <code>(2<sup>53</sup>-1)</code> or be less than <code>-(2<sup>53</sup>-1)</code>, as we mentioned earlier in the chapter <info:types>. As bigints are used in a few special areas, we devote them to a special chapter <info:bigint>.

So here we'll talk about regular numbers. Let's expand our knowledge of them.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

## Способы записи числа

Представьте, что нам надо записать число 1 миллиард. Самый очевидный путь:

```js
let billion = 1000000000;
```

<<<<<<< HEAD
Мы также можем использовать символ нижнего подчёркивания `_` в качестве разделителя:

```js
let billion = 1_000_000_000
```

Символ нижнего подчёркивания `_` -- это «[синтаксический сахар](https://ru.wikipedia.org/wiki/Синтаксический_сахар)», он делает число более читабельным. Движок JavaScript попросту игнорирует `_` между цифрами, поэтому в примере выше получается точно такой же миллиард, как и в первом случае.  

Однако в реальной жизни мы в основном стараемся не писать длинные последовательности нулей, так как можно легко ошибиться. Укороченная запись может выглядеть как `"1млрд"` или `"7.3млрд"` для 7 миллиардов 300 миллионов. Такой принцип работает для всех больших чисел.

В JavaScript, чтобы укоротить запись числа, мы можем добавить к нему букву `"e"` и указать необходимое количество нулей:
=======
We also can use underscore `_` as the separator:

```js
let billion = 1_000_000_000;
```

Here the underscore `_` plays the role of the "[syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)", it makes the number more readable. The JavaScript engine simply ignores `_` between digits, so it's exactly the same one billion as above.

In real life though, we try to avoid writing long sequences of zeroes. We're too lazy for that. We'll try to write something like `"1bn"` for a billion or `"7.3bn"` for 7 billion 300 million. The same is true for most large numbers.

In JavaScript, we can shorten a number by appending the letter `"e"` to it and specifying the zeroes count:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
let billion = 1e9;  // 1 миллиард, буквально: 1 и 9 нулей

<<<<<<< HEAD
alert( 7.3e9 );  // 7.3 миллиарда (7,300,000,000)
```

Другими словами, `"e"` умножает число на `1` с указанным количеством нулей.

```js
1e3 === 1 * 1000 // e3 означает *1000
1.23e6 === 1.23 * 1000000 // e6 означает *1000000
```

А сейчас давайте запишем что-нибудь очень маленькое. К примеру, 1 микросекунду (одна миллионная секунды):

```js
let mcs = 0.000001;
```

В этом случае нам также поможет `"e"`. Если мы хотим избежать записи длинной последовательности из нулей, мы можем сделать так:

```js
let ms = 1e-6; // шесть нулей слева от 1
```

Если мы подсчитаем количество нулей в `0.000001`, их будет 6. Естественно, верная запись `1e-6`.
=======
alert( 7.3e9 );  // 7.3 billions (same as 7300000000 or 7_300_000_000)
```

In other words, `e` multiplies the number by `1` with the given zeroes count.

```js
1e3 === 1 * 1000; // e3 means *1000
1.23e6 === 1.23 * 1000000; // e6 means *1000000
```

Now let's write something very small. Say, 1 microsecond (one-millionth of a second):

```js
let mсs = 0.000001;
```

Just like before, using `"e"` can help. If we'd like to avoid writing the zeroes explicitly, we could write the same as:

```js
let mcs = 1e-6; // five zeroes to the left from 1
```

If we count the zeroes in `0.000001`, there are 6 of them. So naturally it's `1e-6`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Другими словами, отрицательное число после `"e"` подразумевает деление на `1` с указанным количеством нулей:

```js
<<<<<<< HEAD
// 1 делится на 1 с 3 нулями
1e-3 === 1 / 1000 (=0.001)

// 1.23 делится на 1 с 6 нулями
1.23e-6 === 1.23 / 1000000 (=0.00000123)
=======
// -3 divides by 1 with 3 zeroes
1e-3 === 1 / 1000; // 0.001

// -6 divides by 1 with 6 zeroes
1.23e-6 === 1.23 / 1000000; // 0.00000123

// an example with a bigger number
1234e-2 === 1234 / 100; // 12.34, decimal point moves 2 times
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
```

### Шестнадцатеричные, двоичные и восьмеричные числа

[Шестнадцатеричные](https://ru.wikipedia.org/wiki/%D0%A8%D0%B5%D1%81%D1%82%D0%BD%D0%B0%D0%B4%D1%86%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D1%87%D0%BD%D0%B0%D1%8F_%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D1%81%D1%87%D0%B8%D1%81%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F) числа широко используются в JavaScript для представления цветов, кодировки символов и многого другого. Естественно, есть короткий стиль записи: `0x`, после которого указывается число.

Например:

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (то же самое, регистр не имеет значения)
```

Двоичные и восьмеричные числа используются не так часто, но они также поддерживаются: `0b` для двоичных и `0o` для восьмеричных:

```js run
let a = 0b11111111; // двоичная (бинарная) форма записи числа 255
let b = 0o377; // восьмеричная форма записи числа 255

alert( a == b ); // true, с двух сторон число 255
```

Есть только 3 системы счисления с такой поддержкой. Для других систем счисления мы рекомендуем использовать функцию `parseInt` (рассмотрим позже в этой главе).

## toString(base)

Метод `num.toString(base)` возвращает строковое представление числа `num` в системе счисления `base`.

Например:
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

<<<<<<< HEAD
`base` может варьироваться от `2` до `36` (по умолчанию `10`).
=======
The `base` can vary from `2` to `36`. By default, it's `10`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Часто используемые:

<<<<<<< HEAD
- **base=16** — для шестнадцатеричного представления цвета, кодировки символов и т.д., цифры могут быть `0..9` или `A..F`.
- **base=2** — обычно используется для отладки побитовых операций, цифры `0` или `1`.
- **base=36** — максимальное основание, цифры могут быть `0..9` или `A..Z`. То есть, используется весь латинский алфавит для представления числа. Забавно, но можно использовать `36`-разрядную систему счисления для получения короткого представления большого числового идентификатора. К примеру, для создания короткой ссылки. Для этого просто преобразуем его в `36`-разрядную систему счисления:
=======
- **base=16** is used for hex colors, character encodings etc, digits can be `0..9` or `A..F`.
- **base=2** is mostly for debugging bitwise operations, digits can be `0` or `1`.
- **base=36** is the maximum, digits can be `0..9` or `A..Z`. The whole Latin alphabet is used to represent a number. A funny, but useful case for `36` is when we need to turn a long numeric identifier into something shorter, for example, to make a short url. Can simply represent it in the numeral system with base `36`:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="Две точки для вызова метода"
Внимание! Две точки в `123456..toString(36)` это не опечатка. Если нам надо вызвать метод непосредственно на числе, как `toString` в примере выше, то нам надо поставить две точки `..` после числа.

<<<<<<< HEAD
Если мы поставим одну точку: `123456.toString(36)`, тогда это будет ошибкой, поскольку синтаксис JavaScript предполагает, что после первой точки начинается десятичная часть. А если поставить две точки, то JavaScript понимает, что десятичная часть отсутствует, и начинается метод.

Также можно записать как `(123456).toString(36)`.
=======
If we placed a single dot: `123456.toString(36)`, then there would be an error, because JavaScript syntax implies the decimal part after the first dot. And if we place one more dot, then JavaScript knows that the decimal part is empty and now uses the method.

Also could write `(123456).toString(36)`.

>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
```

## Округление

Одна из часто используемых операций при работе с числами - это округление.

В JavaScript есть несколько встроенных функций для работы с округлением:

`Math.floor`
: Округление в меньшую сторону: `3.1` становится `3`, а `-1.1` — `-2`.

`Math.ceil`
: Округление в большую сторону: `3.1` становится `4`, а `-1.1` — `-1`.

`Math.round`
<<<<<<< HEAD
: Округление до ближайшего целого: `3.1` становится `3`, `3.6` — `4`, а `-1.1` — `-1`.
=======
: Rounds to the nearest integer: `3.1` becomes `3`, `3.6` becomes `4`. In the middle cases `3.5` rounds up to `4`, and `-3.5` rounds up to `-3`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

`Math.trunc` (не поддерживается в Internet Explorer)
: Производит удаление дробной части без округления: `3.1` становится `3`, а `-1.1` — `-1`.

Ниже представлена таблица с различиями между функциями округления:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.5`|  `3`    |   `4`  |    `4`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.5`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


Эти функции охватывают все возможные способы обработки десятичной части. Что если нам надо округлить число до `n-ого` количества цифр в дробной части?

Например, у нас есть `1.2345` и мы хотим округлить число до 2-х знаков после запятой, оставить только `1.23`.

Есть два пути решения:

1. Умножить и разделить.

    Например, чтобы округлить число до второго знака после запятой, мы можем умножить число на `100`, вызвать функцию округления и разделить обратно.
    ```js run
    let num = 1.23456;

    alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. Метод [toFixed(n)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) округляет число до `n` знаков после запятой и возвращает строковое представление результата.

    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    Округляет значение до ближайшего числа, как в большую, так и в меньшую сторону, аналогично методу `Math.round`:

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

<<<<<<< HEAD
    Обратите внимание, что результатом `toFixed` является строка. Если десятичная часть короче, чем необходима, будут добавлены нули в конец строки:
=======
    Please note that the result of `toFixed` is a string. If the decimal part is shorter than required, zeroes are appended to the end:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", добавлены нули, чтобы получить 5 знаков после запятой
    ```

<<<<<<< HEAD
    Мы можем преобразовать полученное значение в число, используя унарный оператор `+` или `Number()`, пример с унарным оператором: `+num.toFixed(5)`.
=======
    We can convert it to a number using the unary plus or a `Number()` call, e.g. write `+num.toFixed(5)`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

## Неточные вычисления

<<<<<<< HEAD
Внутри JavaScript число представлено в виде 64-битного формата [IEEE-754](https://ru.wikipedia.org/wiki/IEEE_754-1985). Для хранения числа используется 64 бита: 52 из них используется для хранения цифр, 11 для хранения положения десятичной точки и один бит отведён на хранение знака.

Если число слишком большое, оно переполнит 64-битное хранилище, JavaScript вернёт бесконечность:
=======
Internally, a number is represented in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), so there are exactly 64 bits to store a number: 52 of them are used to store the digits, 11 of them store the position of the decimal point, and 1 bit is for the sign.

If a number is really huge, it may overflow the 64-bit storage and become a special numeric value `Infinity`:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
alert( 1e500 ); // Infinity
```

Наиболее часто встречающаяся ошибка при работе с числами в JavaScript - это потеря точности.

<<<<<<< HEAD
Посмотрите на это (неверное!) сравнение:
=======
Consider this (falsy!) equality test:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

Да-да, сумма `0.1` и `0.2` не равна `0.3`.

Странно! Что тогда, если не `0.3`?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

<<<<<<< HEAD
Ой! Здесь гораздо больше последствий, чем просто некорректное сравнение. Представьте, вы делаете интернет-магазин и посетители формируют заказ из 2-х позиций за `$0.10` и `$0.20`. Итоговый заказ будет `$0.30000000000000004`. Это будет сюрпризом для всех.
=======
Ouch! Imagine you're making an e-shopping site and the visitor puts `$0.10` and `$0.20` goods into their cart. The order total will be `$0.30000000000000004`. That would surprise anyone.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Но почему это происходит?

Число хранится в памяти в бинарной форме, как последовательность бит - единиц и нулей. Но дроби, такие как `0.1`, `0.2`, которые выглядят довольно просто в десятичной системе счисления, на самом деле являются бесконечной дробью в двоичной форме.

```js run
alert(0.1.toString(2)); // 0.0001100110011001100110011001100110011001100110011001101
alert(0.2.toString(2)); // 0.001100110011001100110011001100110011001100110011001101
alert((0.1 + 0.2).toString(2)); // 0.0100110011001100110011001100110011001100110011001101
```
<<<<<<< HEAD
=======

What is `0.1`? It is one divided by ten `1/10`, one-tenth. In the decimal numeral system, such numbers are easily representable. Compare it to one-third: `1/3`. It becomes an endless fraction `0.33333(3)`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Другими словами, что такое `0.1`? Это единица делённая на десять — `1/10`, одна десятая. В десятичной системе счисления такие числа легко представимы, по сравнению с одной третьей: `1/3`, которая становится бесконечной дробью `0.33333(3)`.

Деление на `10` гарантированно хорошо работает в десятичной системе, но деление на `3` - нет. По той же причине и в двоичной системе счисления, деление на `2` обязательно сработает, а `1/10` становится бесконечной дробью.

В JavaScript нет возможности для хранения точных значений 0.1 или 0.2, используя двоичную систему, точно также, как нет возможности хранить одну третью в десятичной системе счисления.

Числовой формат IEEE-754 решает эту проблему путём округления до ближайшего возможного числа. Правила округления обычно не позволяют нам увидеть эту "крошечную потерю точности", но она существует.

Пример:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

И когда мы суммируем 2 числа, их "неточности" тоже суммируются.

Вот почему `0.1 + 0.2` - это не совсем `0.3`.

<<<<<<< HEAD
```smart header="Не только в JavaScript"
Справедливости ради заметим, что ошибка в точности вычислений для чисел с плавающей точкой сохраняется в любом другом языке, где используется формат IEEE 754, включая PHP, Java, C, Perl и Ruby.
=======
```smart header="Not only JavaScript"
The same issue exists in many other programming languages.

PHP, Java, C, Perl, and Ruby give exactly the same result, because they are based on the same numeric format.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
```

Можно ли обойти проблему? Конечно, наиболее надёжный способ — это округлить результат используя метод [toFixed(n)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // "0.30"
```

Помните, что метод `toFixed` всегда возвращает строку. Это гарантирует, что результат будет с заданным количеством цифр в десятичной части. Также это удобно для форматирования цен в интернет-магазине `$0.30`. В других случаях можно использовать унарный оператор `+`, чтобы преобразовать строку в число:

```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

Также можно временно умножить число на 100 (или на большее), чтобы привести его к целому, выполнить математические действия, а после разделить обратно. Суммируя целые числа, мы уменьшаем погрешность, но она всё равно появляется при финальном делении:

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

<<<<<<< HEAD
Таким образом, метод умножения/деления уменьшает погрешность, но полностью её не решает.
=======
So, the multiply/divide approach reduces the error, but doesn't remove it totally.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Иногда можно попробовать полностью отказаться от дробей. Например, если мы в нашем интернет-магазине начнём использовать центы вместо долларов. Но что будет, если мы применим скидку 30%? На практике у нас не получится полностью избавиться от дроби. Просто используйте округление, чтобы отрезать "хвосты", когда надо.

````smart header="Забавный пример"
Попробуйте выполнить его:

```js run
// Привет! Я – число, растущее само по себе!
alert( 9999999999999999 ); // покажет 10000000000000000
```

Причина та же – потеря точности. Из 64 бит, отведённых на число, сами цифры числа занимают до 52 бит, остальные 11 бит хранят позицию десятичной точки и один бит – знак. Так что если 52 бит не хватает на цифры, то при записи пропадут младшие разряды.

Интерпретатор не выдаст ошибку, но в результате получится «не совсем то число», что мы и видим в примере выше. Как говорится: «как смог, так записал».
````

```smart header="Два нуля"
Другим забавным следствием внутреннего представления чисел является наличие двух нулей: `0` и `-0`.

<<<<<<< HEAD
Все потому, что знак представлен отдельным битом, так что, любое число может быть положительным и отрицательным, включая нуль.

В большинстве случаев это поведение незаметно, так как операторы в JavaScript воспринимают их одинаковыми.
```



## Проверка: isFinite и isNaN
=======
That's because a sign is represented by a single bit, so it can be set or not set for any number including a zero.

In most cases, the distinction is unnoticeable, because operators are suited to treat them as the same.
```

## Tests: isFinite and isNaN
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Помните эти специальные числовые значения?

- `Infinity` (и `-Infinity`) — особенное численное значение, которое ведёт себя в точности как математическая бесконечность ∞.
- `NaN` представляет ошибку.

Эти числовые значения принадлежат типу `number`, но они не являются "обычными" числами, поэтому есть функции для их проверки:


- `isNaN(value)` преобразует значение в число и проверяет является ли оно `NaN`:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

<<<<<<< HEAD
    Нужна ли нам эта функция? Разве не можем ли мы просто сравнить `=== NaN`? К сожалению, нет. Значение `NaN` уникально тем, что оно не является равным ничему другому, даже самому себе:
=======
    But do we need this function? Can't we just use the comparison `=== NaN`? Unfortunately not. The value `NaN` is unique in that it does not equal anything, including itself:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(value)` преобразует аргумент в число и возвращает `true`, если оно является обычным числом, т.е. не `NaN/Infinity/-Infinity`:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, потому что специальное значение: NaN
    alert( isFinite(Infinity) ); // false, потому что специальное значение: Infinity
    ```

Иногда `isFinite` используется для проверки, содержится ли в строке число:


```js run
let num = +prompt("Введите число:", '');

// вернёт true всегда, кроме ситуаций, когда аргумент - Infinity/-Infinity или не число
alert( isFinite(num) );
```

<<<<<<< HEAD
Помните, что пустая строка интерпретируется как `0` во всех числовых функциях, включая`isFinite`.

````smart header="`Number.isNaN` и `Number.isFinite`"
Методы [Number.isNaN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) и [Number.isFinite](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) - это более "строгие" версии функций `isNaN` и `isFinite`. Они не преобразуют аргумент в число, а наоборот - первым делом проверяют, является ли аргумент числом (принадлежит ли он к типу `number`).

- `Number.isNaN(value)` возвращает `true` только в том случае, если аргумент принадлежит к типу `number` и является `NaN`. Во всех остальных случаях возвращает `false`.

    ```js run
    alert( Number.isNaN(NaN) ); // true
    alert( Number.isNaN("str" / 2) ); // true
=======
Please note that an empty or a space-only string is treated as `0` in all numeric functions including `isFinite`.

````smart header="`Number.isNaN` and `Number.isFinite`"
[Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) and [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) methods are the more "strict" versions of `isNaN` and `isFinite` functions. They do not autoconvert their argument into a number, but check if it belongs to the `number` type instead.

- `Number.isNaN(value)` returns `true` if the argument belongs to the `number` type and it is `NaN`. In any other case, it returns `false`.

    ```js run
    alert( Number.isNaN(NaN) ); // true
    alert( Number.isNaN("str" / 2) ); // true

    // Note the difference:
    alert( Number.isNaN("str") ); // false, because "str" belongs to the string type, not the number type
    alert( isNaN("str") ); // true, because isNaN converts string "str" into a number and gets NaN as a result of this conversion
    ```

- `Number.isFinite(value)` returns `true` if the argument belongs to the `number` type and it is not `NaN/Infinity/-Infinity`. In any other case, it returns `false`.

    ```js run
    alert( Number.isFinite(123) ); // true
    alert( Number.isFinite(Infinity) ); // false
    alert( Number.isFinite(2 / 0) ); // false

    // Note the difference:
    alert( Number.isFinite("123") ); // false, because "123" belongs to the string type, not the number type
    alert( isFinite("123") ); // true, because isFinite converts string "123" into a number 123
    ```

In a way, `Number.isNaN` and `Number.isFinite` are simpler and more straightforward than `isNaN` and `isFinite` functions. In practice though, `isNaN` and `isFinite` are mostly used, as they're shorter to write.
````

```smart header="Comparison with `Object.is`"
There is a special built-in method `Object.is` that compares values like `===`, but is more reliable for two edge cases:

1. It works with `NaN`: `Object.is(NaN, NaN) === true`, that's a good thing.
2. Values `0` and `-0` are different: `Object.is(0, -0) === false`, technically that's correct because internally the number has a sign bit that may be different even if all other bits are zeroes.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

    // Обратите внимание на разный результат:
    alert( Number.isNaN("str") ); // false, так как "str" является строкой, а не числом
    alert( isNaN("str") ); // true, так как isNaN сначала преобразует строку "str" в число и в результате преобразования получает NaN
    ```

<<<<<<< HEAD
- `Number.isFinite(value)` возвращает `true` только в том случае, если аргумент принадлежит к типу `number` и не является `NaN/Infinity/-Infinity`. Во всех остальных случаях возвращает `false`.

    ```js run
    alert( Number.isFinite(123) ); // true
    alert( Number.isFinite(Infinity) ); // false
    alert( Number.isFinite(2 / 0) ); // false

    // Обратите внимание на разный результат:
    alert( Number.isFinite("123") ); // false, так как "123" является строкой, а не числом
    alert( isFinite("123") ); // true, так как isFinite сначала преобразует строку "123" в число 123
    ```

Не стоит считать `Number.isNaN` и `Number.isFinite` более "корректными" версиями функций `isNaN` и `isFinite`. Это дополняющие друг-друга инструменты для разных задач.
````

```smart header="Сравнение `Object.is`"

Существует специальный метод [Object.is](mdn:js/Object/is), который сравнивает значения примерно как `===`, но более надёжен в двух особых ситуациях:

1. Работает с `NaN`: `Object.is(NaN, NaN) === true`, здесь он хорош.
2. Значения `0` и `-0` разные: `Object.is(0, -0) === false`, это редко используется, но технически эти значения разные.

Во всех других случаях `Object.is(a, b)` идентичен `a === b`.

Этот способ сравнения часто используется в спецификации JavaScript. Когда внутреннему алгоритму необходимо сравнить 2 значения на предмет точного совпадения, он использует `Object.is` (Определение [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
=======
We mention `Object.is` here, because it's often used in JavaScript specification. When an internal algorithm needs to compare two values for being exactly the same, it uses `Object.is` (internally called [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
```


## parseInt и parseFloat

Для явного преобразования к числу можно использовать `+` или `Number()`. Если строка не является в точности числом, то результат будет `NaN`:

```js run
alert( +"100px" ); // NaN
```

Единственное исключение — это пробелы в начале строки и в конце, они игнорируются.

<<<<<<< HEAD
В реальной жизни мы часто сталкиваемся со значениями у которых есть единица измерения, например `"100px"` или `"12pt"` в CSS. Также во множестве стран символ валюты записывается после номинала `"19€"`. Так как нам получить числовое значение из таких строк?
=======
But in real life, we often have values in units, like `"100px"` or `"12pt"` in CSS. Also in many countries, the currency symbol goes after the amount, so we have `"19€"` and would like to extract a numeric value out of that.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Для этого есть `parseInt` и `parseFloat`.

Они "читают" число из строки. Если в процессе чтения возникает ошибка, они возвращают полученное до ошибки число. Функция `parseInt` возвращает целое число, а `parseFloat` возвращает число с плавающей точкой:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, вернётся только целая часть
alert( parseFloat('12.3.4') ); // 12.3, произойдёт остановка чтения на второй точке
```

Функции `parseInt/parseFloat` вернут `NaN`, если не смогли прочитать ни одну цифру:

```js run
alert( parseInt('a123') ); // NaN, на первом символе происходит остановка чтения
```

````smart header="Второй аргумент `parseInt(str, radix)`"
Функция `parseInt()` имеет необязательный второй параметр. Он определяет систему счисления, таким образом `parseInt` может также читать строки с шестнадцатеричными числами, двоичными числами и т.д.:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, без 0x тоже работает

alert( parseInt('2n9c', 36) ); // 123456
```
````

## Другие математические функции

В JavaScript встроен объект [Math](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math), который содержит различные математические функции и константы.

Несколько примеров:

`Math.random()`
<<<<<<< HEAD
: Возвращает псевдослучайное число в диапазоне от 0 (включительно) до 1 (но не включая 1)
=======
: Returns a random number from 0 to 1 (not including 1).
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (любое количество псевдослучайных чисел)
    ```

<<<<<<< HEAD
`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: Возвращает наибольшее/наименьшее число из перечисленных аргументов.
=======
`Math.max(a, b, c...)` and `Math.min(a, b, c...)`
: Returns the greatest and smallest from the arbitrary number of arguments.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
<<<<<<< HEAD
: Возвращает число `n`, возведённое в степень `power`
=======
: Returns `n` raised to the given power.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

    ```js run
    alert( Math.pow(2, 10) ); // 2 в степени 10 = 1024
    ```

<<<<<<< HEAD
В объекте `Math` есть множество функций и констант, включая тригонометрические функции, подробнее можно ознакомиться в документации по объекту [Math](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math).
=======
There are more functions and constants in `Math` object, including trigonometry, which you can find in the [docs for the Math object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math).
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

## Итого

<<<<<<< HEAD
Чтобы писать числа с большим количеством нулей:

- Используйте краткую форму записи чисел - `"e"`, с указанным количеством нулей. Например: `123e6` это `123` с 6-ю нулями `123000000`.
- Отрицательное число после `"e"` приводит к делению числа на 1 с указанным количеством нулей. Например: `123e-6` это `0.000123` (`123` миллионных).
=======
To write numbers with many zeroes:

- Append `"e"` with the zeroes count to the number. Like: `123e6` is the same as `123` with 6 zeroes `123000000`.
- A negative number after `"e"` causes the number to be divided by 1 with given zeroes. E.g. `123e-6` means `0.000123` (`123` millionths).
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Для других систем счисления:

<<<<<<< HEAD
- Можно записывать числа сразу в шестнадцатеричной (`0x`), восьмеричной (`0o`) и бинарной (`0b`) системах счисления
- `parseInt(str, base)` преобразует строку в целое число в соответствии с указанной системой счисления: `2 ≤ base ≤ 36`.
- `num.toString(base)` представляет число в строковом виде в указанной системе счисления `base`.

Для проверки на `NaN` и `Infinity`:
=======
- Can write numbers directly in hex (`0x`), octal (`0o`) and binary (`0b`) systems.
- `parseInt(str, base)` parses the string `str` into an integer in numeral system with given `base`, `2 ≤ base ≤ 36`.
- `num.toString(base)` converts a number to a string in the numeral system with the given `base`.

For regular number tests:

- `isNaN(value)` converts its argument to a number and then tests it for being `NaN`
- `Number.isNaN(value)` checks whether its argument belongs to the `number` type, and if so, tests it for being `NaN`
- `isFinite(value)` converts its argument to a number and then tests it for not being `NaN/Infinity/-Infinity`
- `Number.isFinite(value)` checks whether its argument belongs to the `number` type, and if so, tests it for not being `NaN/Infinity/-Infinity`

For converting values like `12pt` and `100px` to a number:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

- `isNaN(value)` преобразует аргумент в число и проверяет, является ли оно `NaN`
- `Number.isNaN(value)` проверяет, является ли аргумент числом, и если да, то проверяет, является ли оно `NaN`
- `isFinite(value)` преобразует аргумент в число и проверяет, что оно не является `NaN/Infinity/-Infinity`
- `Number.isFinite(value)` проверяет, является ли аргумент числом, и если да, то проверяет, что оно не является `NaN/Infinity/-Infinity`

Для преобразования значений типа `12pt` и `100px` в число:

- Используйте `parseInt/parseFloat` для "мягкого" преобразования строки в число, данные функции по порядку считывают число из строки до тех пор пока не возникнет ошибка.

Для дробей:

<<<<<<< HEAD
- Используйте округления `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` или `num.toFixed(precision)`.
- Помните, что при работе с дробями происходит потеря точности.

Ещё больше математических функций:

- Документация по объекту [Math](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math). Библиотека маленькая, но содержит всё самое важное.
=======
- See the [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object when you need them. The library is very small but can cover basic needs.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
