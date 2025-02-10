# Типы данных

<<<<<<< HEAD
Значение в JavaScript всегда относится к данным определённого типа. Например, это может быть строка или число.

Есть восемь основных типов данных в JavaScript. В этой главе мы рассмотрим их в общем, а в следующих главах поговорим подробнее о каждом.

Переменная в JavaScript может содержать любые данные. В один момент там может быть строка, а в другой - число:
=======
A value in JavaScript is always of a certain type. For example, a string or a number.

There are eight basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.

We can put any type in a variable. For example, a variable can at one moment be a string and then store a number:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
// Не будет ошибкой
let message = "hello";
message = 123456;
```

<<<<<<< HEAD
Языки программирования, в которых такое возможно, называются "динамически типизированными". Это значит, что типы данных есть, но переменные не привязаны ни к одному из них.

## Число
=======
Programming languages that allow such things, such as JavaScript, are called "dynamically typed", meaning that there exist data types, but variables are not bound to any of them.

## Number
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
let n = 123;
n = 12.345;
```

*Числовой* тип данных (`number`) представляет как целочисленные значения, так и числа с плавающей точкой.

Существует множество операций для чисел, например, умножение `*`, деление `/`, сложение `+`, вычитание `-` и так далее.

Кроме обычных чисел, существуют так называемые "специальные числовые значения", которые относятся к этому типу данных: `Infinity`, `-Infinity` и `NaN`.

- `Infinity` представляет собой математическую [бесконечность](https://ru.wikipedia.org/wiki/Бесконечность#В_математике) ∞. Это особое значение, которое больше любого числа.

    Мы можем получить его в результате деления на ноль:

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    Или задать его явно:

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` означает вычислительную ошибку. Это результат неправильной или неопределённой математической операции, например:

    ```js run
    alert( "не число" / 2 ); // NaN, такое деление является ошибкой
    ```

<<<<<<< HEAD
    Значение `NaN` "прилипчиво".  Любая математическая операция с `NaN` возвращает `NaN`:
=======
    `NaN` is sticky. Any further mathematical operation on `NaN` returns `NaN`:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

    ```js run
    alert( NaN + 1 ); // NaN
    alert( 3 * NaN ); // NaN
<<<<<<< HEAD
    alert( "не число" / 2 - 1 ); // NaN
    ```

    Если где-то в математическом выражении есть `NaN`, то оно распространяется на весь результат (есть только одно исключение: `NaN ** 0` равно `1`).
=======
    alert( "not a number" / 2 - 1 ); // NaN
    ```

    So, if there's a `NaN` somewhere in a mathematical expression, it propagates to the whole result (there's only one exception to that: `NaN ** 0` is `1`).
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```smart header="Математические операции -- безопасны"
Математические операции в JavaScript "безопасны". Мы можем делать что угодно: делить на ноль, обращаться с нечисловыми строками как с числами и т.д.

Скрипт никогда не остановится с фатальной ошибкой (не "умрёт"). В худшем случае мы получим `NaN` как результат выполнения.
```

Специальные числовые значения относятся к типу "число". Конечно, это не числа в привычном значении этого слова.

Подробнее о работе с числами мы поговорим в главе  <info:number>.

<<<<<<< HEAD
## BigInt
=======
## BigInt [#bigint-type]

In JavaScript, the "number" type cannot safely represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(2<sup>53</sup>-1)</code> for negatives.

To be really precise, the "number" type can store larger integers (up to <code>1.7976931348623157 * 10<sup>308</sup></code>), but outside of the safe integer range <code>±(2<sup>53</sup>-1)</code> there'll be a precision error, because not all digits fit into the fixed 64-bit storage. So an "approximate" value may be stored.

For example, these two numbers (right above the safe range) are the same:

```js
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992
```

So to say, all odd integers greater than <code>(2<sup>53</sup>-1)</code> can't be stored at all in the "number" type.

For most purposes <code>±(2<sup>53</sup>-1)</code> range is quite enough, but sometimes we need the entire range of really big integers, e.g. for cryptography or microsecond-precision timestamps.

`BigInt` type was recently added to the language to represent integers of arbitrary length.

A `BigInt` value is created by appending `n` to the end of an integer:

```js
// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

As `BigInt` numbers are rarely needed, we don't cover them here, but devoted them a separate chapter <info:bigint>. Read it when you need such big numbers.

## String
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

В JavaScript тип `number` не может безопасно работать с числами, большими, чем <code>(2<sup>53</sup>-1)</code> (т. е. `9007199254740991`) или меньшими, чем <code>-(2<sup>53</sup>-1)</code> для отрицательных чисел. 

Если говорить совсем точно, то, технически, тип `number` *может* хранить большие целые числа (до <code>1.7976931348623157 * 10<sup>308</sup></code>), но за пределами безопасного диапазона целых чисел <code>±(2<sup>53</sup>-1)</code> будет ошибка точности, так как не все цифры помещаются в фиксированную 64-битную память. Поэтому можно хранить "приблизительное" значение.

Например, эти два числа (прямо за пределами безопасного диапазона) совпадают:

```js
<<<<<<< HEAD
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992
=======
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
```

То есть все нечетные целые числа, большие чем <code>(2<sup>53</sup>-1)</code>, вообще не могут храниться в типе `number`.

В большинстве случаев безопасного диапазона чисел от <code>-(2<sup>53</sup>-1)</code> до <code>(2<sup>53</sup>-1)</code> вполне достаточно, но иногда нам требуется весь диапазон действительно гигантских целых чисел без каких-либо ограничений или пропущенных значений внутри него. Например, в криптографии или при использовании метки времени («timestamp») с микросекундами.

<<<<<<< HEAD
Тип `BigInt` был добавлен в JavaScript, чтобы дать возможность работать с целыми числами произвольной длины.

Чтобы создать значение типа `BigInt`, необходимо добавить `n` в конец числового литерала:
=======
Double and single quotes are "simple" quotes. There's practically no difference between them in JavaScript.

Backticks are "extended functionality" quotes. They allow us to embed variables and expressions into a string by wrapping them in `${…}`, for example:

```js run
let name = "John";

// embed a variable
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// embed an expression
alert( `the result is *!*${1 + 2}*/!*` ); // the result is 3
```

The expression inside `${…}` is evaluated and the result becomes a part of the string. We can put anything in there: a variable like `name` or an arithmetical expression like `1 + 2` or something more complex.

Please note that this can only be done in backticks. Other quotes don't have this embedding functionality!
```js run
alert( "the result is ${1 + 2}" ); // the result is ${1 + 2} (double quotes do nothing)
```

We'll cover strings more thoroughly in the chapter <info:string>.

```smart header="There is no *character* type."
In some languages, there is a special "character" type for a single character. For example, in the C language and in Java it is called "char".

In JavaScript, there is no such type. There's only one type: `string`. A string may consist of zero characters (be empty), one character or many of them.
```

## Boolean (logical type)

The boolean type has only two values: `true` and `false`.

This type is commonly used to store yes/no values: `true` means "yes, correct", and `false` means "no, incorrect".

For instance:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
// символ "n" в конце означает, что это BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

Так как необходимость в использовании `BigInt`--чисел появляется достаточно редко, мы рассмотрим их в отдельной главе <info:bigint>. Ознакомьтесь с ней, когда вам понадобятся настолько большие числа.

```smart header="Поддержка"
В данный момент `BigInt` поддерживается только в браузерах Firefox, Chrome, Edge и Safari, но не поддерживается в IE.
```

## Строка

Строка (`string`) в JavaScript должна быть заключена в кавычки.

```js
let str = "Привет";
let str2 = 'Одинарные кавычки тоже подойдут';
let phrase = `Обратные кавычки позволяют встраивать переменные ${str}`;
```

В JavaScript существует три типа кавычек.

1. Двойные кавычки: `"Привет"`.
2. Одинарные кавычки: `'Привет'`.
3. Обратные кавычки: <code>&#96;Привет&#96;</code>.

Двойные или одинарные кавычки являются "простыми", между ними нет разницы в JavaScript.

Обратные же кавычки имеют расширенную функциональность. Они позволяют нам встраивать выражения в строку, заключая их в `${…}`. Например:

```js run
let name = "Иван";

// Вставим переменную
alert( `Привет, *!*${name}*/!*!` ); // Привет, Иван!

// Вставим выражение
alert( `результат: *!*${1 + 2}*/!*` ); // результат: 3
```

Выражение внутри `${…}` вычисляется, и его результат становится частью строки. Мы можем положить туда всё, что угодно: переменную `name`, или выражение `1 + 2`, или что-то более сложное.

Обратите внимание, что это можно делать только в обратных кавычках. Другие кавычки не имеют такой функциональности встраивания!
```js run
alert( "результат: ${1 + 2}" ); // результат: ${1 + 2} (двойные кавычки ничего не делают)
```

Мы рассмотрим строки более подробно в главе <info:string>.

```smart header="Нет отдельного типа данных для одного символа."
В некоторых языках, например C и Java, для хранения одного символа, например `"a"` или `"%"`, существует отдельный тип. В языках C и Java это `char`.

В JavaScript подобного типа нет, есть только тип `string`. Строка может содержать ноль символов (быть пустой), один символ или множество.
```

## Булевый (логический) тип

Булевый тип (`boolean`) может принимать только два значения: `true` (истина) и `false` (ложь).

Такой тип, как правило, используется для хранения значений да/нет: `true` значит "да, правильно", а `false` значит "нет, не правильно".

Например:

```js
let nameFieldChecked = true; // да, поле отмечено
let ageFieldChecked = false; // нет, поле не отмечено
```

Булевые значения также могут быть результатом сравнений:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (результатом сравнения будет "да")
```

Мы рассмотрим булевые значения более подробно в главе <info:logical-operators>.

## Значение "null"

Специальное значение `null` не относится ни к одному из типов, описанных выше.

Оно формирует отдельный тип, который содержит только значение `null`:

```js
let age = null;
```

В JavaScript `null` не является "ссылкой на несуществующий объект" или "нулевым указателем", как в некоторых других языках.

Это просто специальное значение, которое представляет собой "ничего", "пусто" или "значение неизвестно".

<<<<<<< HEAD
В приведённом выше коде указано, что значение переменной `age` неизвестно.
=======
The code above states that `age` is unknown.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

## Значение "undefined"

Специальное значение `undefined` также стоит особняком. Оно формирует тип из самого себя так же, как и `null`.

Оно означает, что "значение не было присвоено".

Если переменная объявлена, но ей не присвоено никакого значения, то её значением будет `undefined`:

```js run
let age;

<<<<<<< HEAD
alert(age); // выведет "undefined"
```

Технически мы можем присвоить значение `undefined` любой переменной:

```js run
let age = 123;

// изменяем значение на undefined
=======
alert(age); // shows "undefined"
```

Technically, it is possible to explicitly assign `undefined` to a variable:

```js run
let age = 100;

// change the value to undefined
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
age = undefined;

alert(age); // "undefined"
```

<<<<<<< HEAD
...Но так делать не рекомендуется. Обычно `null` используется для присвоения переменной "пустого" или "неизвестного" значения, а `undefined` -- для проверок, была ли переменная назначена.
=======
...But we don't recommend doing that. Normally, one uses `null` to assign an "empty" or "unknown" value to a variable, while `undefined` is reserved as a default initial value for unassigned things.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

## Объекты и символы

Тип `object` (объект) -- особенный.

<<<<<<< HEAD
Все остальные типы называются "примитивными", потому что их значениями могут быть только простые значения (будь то строка, или число, или что-то ещё). В объектах же хранят коллекции данных или более сложные структуры.

Объекты занимают важное место в языке и требуют особого внимания. Мы разберёмся с ними в главе <info:object> после того, как узнаем больше о примитивах.
=======
All other types are called "primitive" because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities.

Being that important, objects deserve a special treatment. We'll deal with them later in the chapter <info:object>, after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We have to mention it here for the sake of completeness, but also postpone the details till we know objects.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

Тип `symbol` (символ) используется для создания уникальных идентификаторов в объектах. Мы упоминаем здесь о нём для полноты картины, изучим этот тип после объектов.

<<<<<<< HEAD
## Оператор typeof [#type-typeof]

Оператор `typeof` возвращает тип аргумента. Это полезно, когда мы хотим обрабатывать значения различных типов по-разному или просто хотим сделать проверку.

У него есть две синтаксические формы:

```js
// Обычный синтаксис
typeof 5 // Выведет "number"
// Синтаксис, напоминающий вызов функции (встречается реже)
typeof(5) // Также выведет "number"
```

Если передается выражение, то нужно заключать его в скобки, т.к. typeof имеет более высокий приоритет, чем бинарные операторы:

```js
typeof 50 + " Квартир"; // Выведет "number Квартир"
typeof (50 + " Квартир"); // Выведет "string"
```
Другими словами, скобки необходимы для определения типа значения, которое получилось в результате выполнения выражения в них.

Вызов `typeof x` возвращает строку с именем типа:
=======
The `typeof` operator returns the type of the operand. It's useful when we want to process values of different types differently or just want to do a quick check.

A call to `typeof x` returns a string with the type name:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

Последние три строки нуждаются в пояснении:

<<<<<<< HEAD
1. `Math` — это встроенный объект, который предоставляет математические операции и константы. Мы рассмотрим его подробнее в главе <info:number>. Здесь он служит лишь примером объекта.
2. Результатом вызова `typeof null` является `"object"`. Это официально признанная ошибка в `typeof`, ведущая начало с времён создания JavaScript и сохранённая для совместимости. Конечно, `null` не является объектом. Это специальное значение с отдельным типом.
3. Вызов `typeof alert` возвращает `"function"`, потому что `alert` является функцией. Мы изучим функции в следующих главах, где заодно увидим, что в JavaScript нет специального типа "функция". Функции относятся к объектному типу. Но `typeof` обрабатывает их особым образом, возвращая `"function"`. Так тоже повелось от создания JavaScript. Формально это неверно, но может быть удобным на практике.
=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof`, coming from very early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own. The behavior of `typeof` is wrong here.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```smart header="The `typeof(x)` syntax"
You may also come across another syntax: `typeof(x)`. It's the same as `typeof x`.

To put it clear: `typeof` is an operator, not a function. The parentheses here aren't a part of `typeof`. It's the kind of parentheses used for mathematical grouping.

Usually, such parentheses contain a mathematical expression, such as `(2 + 2)`, but here they contain only one argument `(x)`. Syntactically, they allow to avoid a space between the `typeof` operator and its argument, and some people like it.

Some people prefer `typeof(x)`, although the `typeof x` syntax is much more common.
```

## Итого

<<<<<<< HEAD
В JavaScript есть 8 основных типов данных.

- Семь из них называют «примитивными» типами данных:
    - `number` для любых чисел: целочисленных или чисел с плавающей точкой; целочисленные значения ограничены диапазоном <code>±(2<sup>53</sup>-1)</code>.
    - `bigint` для целых чисел произвольной длины.
    - `string` для строк. Строка может содержать ноль или больше символов, нет отдельного символьного типа.
    - `boolean` для `true`/`false`.
    - `null` для неизвестных значений -- отдельный тип, имеющий одно значение `null`.
    - `undefined` для неприсвоенных значений -- отдельный тип, имеющий одно значение `undefined`.
    - `symbol` для уникальных идентификаторов.
- И один не является «примитивным» и стоит особняком:
    - `object` для более сложных структур данных.
=======
There are 8 basic data types in JavaScript.

- Seven primitive data types:
    - `number` for numbers of any kind: integer or floating-point, integers are limited by <code>±(2<sup>53</sup>-1)</code>.
    - `bigint` for integer numbers of arbitrary length.
    - `string` for strings. A string may have zero or more characters, there's no separate single-character type.
    - `boolean` for `true`/`false`.
    - `null` for unknown values -- a standalone type that has a single value `null`.
    - `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
    - `symbol` for unique identifiers.
- And one non-primitive data type:
    - `object` for more complex data structures.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

Оператор `typeof` позволяет нам увидеть, какой тип данных сохранён в переменной.

<<<<<<< HEAD
- Имеет две формы: `typeof x` или `typeof(x)`.
- Возвращает строку с именем типа. Например, `"string"`.
- Для `null` возвращается `"object"` -- это ошибка в языке, на самом деле это не объект.
=======
- Usually used as `typeof x`, but `typeof(x)` is also possible.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` -- this is an error in the language, it's not actually an object.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

В следующих главах мы сконцентрируемся на примитивных значениях, а когда познакомимся с ними, перейдём к объектам.
