# Типы данных

<<<<<<< HEAD
Значение в JavaScript всегда относится к данным определённого типа. Например, это может быть строка или число.

Есть восемь основных типов данных в JavaScript. В этой главе мы рассмотрим их в общем, а в следующих главах поговорим подробнее о каждом.

Переменная в JavaScript может содержать любые данные. В один момент там может быть строка, а в другой - число:
=======
A value in JavaScript is always of a certain type. For example, a string or a number.

There are eight basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.

We can put any type in a variable. For example, a variable can at one moment be a string and then store a number:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

    Значение `NaN` "прилипчиво".  Любая операция с `NaN` возвращает `NaN`:

    ```js run
    alert( "не число" / 2 + 5 ); // NaN
    ```

    Если где-то в математическом выражении есть `NaN`, то результатом вычислений с его участием будет `NaN`.

```smart header="Математические операции -- безопасны"
Математические операции в JavaScript "безопасны". Мы можем делать что угодно: делить на ноль, обращаться с нечисловыми строками как с числами и т.д.

Скрипт никогда не остановится с фатальной ошибкой (не "умрёт"). В худшем случае мы получим `NaN` как результат выполнения.
```

Специальные числовые значения относятся к типу "число". Конечно, это не числа в привычном значении этого слова.

Подробнее о работе с числами мы поговорим в главе  <info:number>.

## BigInt

В JavaScript тип "number" не может содержать числа больше, чем <code>(2<sup>53</sup>-1)</code> (т. е. `9007199254740991`), или меньше, чем <code>-(2<sup>53</sup>-1)</code> для отрицательных чисел. Это техническое ограничение вызвано их внутренним представлением.

Для большинства случаев этого достаточно. Но иногда нам нужны действительно гигантские числа, например, в криптографии или при использовании метки времени ("timestamp") с микросекундами.

Тип `BigInt` был добавлен в JavaScript, чтобы дать возможность работать с целыми числами произвольной длины.

Чтобы создать значение типа `BigInt`, необходимо добавить `n` в конец числового литерала:

```js
// символ "n" в конце означает, что это BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

Так как `BigInt`-числа нужны достаточно редко, мы рассмотрим их в отдельной главе <info:bigint>. Ознакомьтесь с ней, когда вам понадобятся настолько большие числа.

```smart header="Поддержка"
В данный момент `BigInt` поддерживается только в браузерах Firefox, Chrome, Edge и Safari, но не поддерживается в IE.
```

<<<<<<< HEAD
## Строка
=======
## BigInt [#bigint-type]

In JavaScript, the "number" type cannot represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(2<sup>53</sup>-1)</code> for negatives. It's a technical limitation caused by their internal representation.

For most purposes that's quite enough, but sometimes we need really big numbers, e.g. for cryptography or microsecond-precision timestamps.

`BigInt` type was recently added to the language to represent integers of arbitrary length.

A `BigInt` value is created by appending `n` to the end of an integer:

```js
// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

As `BigInt` numbers are rarely needed, we don't cover them here, but devoted them a separate chapter <info:bigint>. Read it when you need such big numbers.


```smart header="Compatibility issues"
Right now, `BigInt` is supported in Firefox/Chrome/Edge/Safari, but not in IE.
```

You can check [*MDN* BigInt compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) to know which versions of a browser are supported.

## String
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Строка (`string`) в JavaScript должна быть заключена в кавычки.

```js
<<<<<<< HEAD
let str = "Привет";
let str2 = 'Одинарные кавычки тоже подойдут';
let phrase = `Обратные кавычки позволяют встраивать переменные ${str}`;
=======
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

В JavaScript существует три типа кавычек.

1. Двойные кавычки: `"Привет"`.
2. Одинарные кавычки: `'Привет'`.
3. Обратные кавычки: <code>&#96;Привет&#96;</code>.

<<<<<<< HEAD
Двойные или одинарные кавычки являются "простыми", между ними нет разницы в JavaScript.
=======
Double and single quotes are "simple" quotes. There's practically no difference between them in JavaScript.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
```smart header="Нет отдельного типа данных для одного символа."
В некоторых языках, например C и Java, для хранения одного символа, например `"a"` или `"%"`, существует отдельный тип. В языках C и Java это `char`.

В JavaScript подобного типа нет, есть только тип `string`. Строка может содержать ноль символов (быть пустой), один символ или множество.
```

## Булевый (логический) тип
=======
```smart header="There is no *character* type."
In some languages, there is a special "character" type for a single character. For example, in the C language and in Java it is called "char".

In JavaScript, there is no such type. There's only one type: `string`. A string may consist of zero characters (be empty), one character or many of them.
```

## Boolean (logical type)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
age = undefined;

alert(age); // "undefined"
```

<<<<<<< HEAD
...Но так делать не рекомендуется. Обычно `null` используется для присвоения переменной "пустого" или "неизвестного" значения, а `undefined` -- для проверок, была ли переменная назначена.
=======
...But we don't recommend doing that. Normally, one uses `null` to assign an "empty" or "unknown" value to a variable, while `undefined` is reserved as a default initial value for unassigned things.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Объекты и символы

Тип `object` (объект) -- особенный.

<<<<<<< HEAD
Все остальные типы называются "примитивными", потому что их значениями могут быть только простые значения (будь то строка, или число, или что-то ещё). В объектах же хранят коллекции данных или более сложные структуры.

Объекты занимают важное место в языке и требуют особого внимания. Мы разберёмся с ними в главе <info:object> после того, как узнаем больше о примитивах.
=======
All other types are called "primitive" because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities.

Being that important, objects deserve a special treatment. We'll deal with them later in the chapter <info:object>, after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We have to mention it here for the sake of completeness, but also postpone the details till we know objects.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Тип `symbol` (символ) используется для создания уникальных идентификаторов в объектах. Мы упоминаем здесь о нём для полноты картины, изучим этот тип после объектов.

## Оператор typeof [#type-typeof]

Оператор `typeof` возвращает тип аргумента. Это полезно, когда мы хотим обрабатывать значения различных типов по-разному или просто хотим сделать проверку.

У него есть две синтаксические формы:

1. Синтаксис оператора: `typeof x`.
2. Синтаксис функции: `typeof(x)`.

Другими словами, он работает со скобками или без скобок. Результат одинаковый.

Вызов `typeof x` возвращает строку с именем типа:

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
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof` behavior, coming from the early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Итого

<<<<<<< HEAD
В JavaScript есть 8 основных типов.

- `number` для любых чисел: целочисленных или чисел с плавающей точкой; целочисленные значения ограничены диапазоном <code>±(2<sup>53</sup>-1)</code>.
- `bigint` для целых чисел произвольной длины.
- `string` для строк. Строка может содержать ноль или больше символов, нет отдельного символьного типа.
- `boolean` для `true`/`false`.
- `null` для неизвестных значений -- отдельный тип, имеющий одно значение `null`.
- `undefined` для неприсвоенных значений -- отдельный тип, имеющий одно значение `undefined`.
- `object` для более сложных структур данных.
- `symbol` для уникальных идентификаторов.
=======
There are 8 basic data types in JavaScript.

- `number` for numbers of any kind: integer or floating-point, integers are limited by <code>±(2<sup>53</sup>-1)</code>.
- `bigint` is for integer numbers of arbitrary length.
- `string` for strings. A string may have zero or more characters, there's no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values -- a standalone type that has a single value `null`.
- `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Оператор `typeof` позволяет нам увидеть, какой тип данных сохранён в переменной.

- Имеет две формы: `typeof x` или `typeof(x)`.
- Возвращает строку с именем типа. Например, `"string"`.
- Для `null` возвращается `"object"` -- это ошибка в языке, на самом деле это не объект.

В следующих главах мы сконцентрируемся на примитивных значениях, а когда познакомимся с ними, перейдём к объектам.
