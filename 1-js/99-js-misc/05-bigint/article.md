# BigInt

[recent caniuse="bigint"]

<<<<<<< HEAD
`BigInt` - это специальный числовой тип, который предоставляет возможность работать с целыми числами произвольной длины.

Чтобы создать значение типа `BigInt`, необходимо добавить `n` в конец числового литерала или вызвать функцию `BigInt`, которая создаст число типа `BigInt` из переданного аргумента. Аргументом может быть число, строка и др.
=======
`BigInt` is a special numeric type that provides support for integers of arbitrary length.

A bigint is created by appending `n` to the end of an integer literal or by calling the function `BigInt` that creates bigints from strings, numbers etc.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

```js
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

<<<<<<< HEAD
const bigintFromNumber = BigInt(10); // то же самое, что и 10n
```

## Математические операторы

`BigInt` можно использовать как обычные числа, к примеру:
=======
const bigintFromNumber = BigInt(10); // same as 10n
```

## Math operators

`BigInt` can mostly be used like a regular number, for example:
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

```js run
alert(1n + 2n); // 3

alert(5n / 2n); // 2
```

<<<<<<< HEAD
Обратите внимание: операция деления `5/2` возвращает округлённый результат, без дробной части. Все операции с числами типа `bigint` возвращают `bigint`.

В математических операциях мы не можем смешивать `bigint` и обычные числа:
=======
Please note: the division `5/2` returns the result rounded towards zero, without the decimal part. All operations on bigints return bigints.

We can't mix bigints and regular numbers:
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

```js run
alert(1n + 2); // Error: Cannot mix BigInt and other types
```

<<<<<<< HEAD
Мы должны явно их конвертировать: используя либо `BigInt()`, либо `Number()`, например:
=======
We should explicitly convert them if needed: using either `BigInt()` or `Number()`, like this:
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

```js run
let bigint = 1n;
let number = 2;

<<<<<<< HEAD
// конвертируем number в bigint
alert(bigint + BigInt(number)); // 3

// конвертируем `bigint` в number
alert(Number(bigint) + number); // 3
```

Конвертирование `bigint` в число всегда происходит неявно и без генерации ошибок, но если значение `bigint` слишком велико и не подходит под тип `number`, то дополнительные биты будут отброшены, так что следует быть осторожными с такими преобразованиями.

````smart header="К `BigInt` числам нельзя применить унарный оператор `+`"
Унарный оператор `+value` является хорошо известным способом конвертировать произвольное значение `value` в число.

Данный оператор не поддерживается при работе с `BigInt` числами.
```js run
let bigint = 1n;

alert( +bigint ); // SyntaxError: Unexpected identifier
```
````

## Операции сравнения

Операции сравнения, такие как `<`, `>`, работают с `bigint` и обычными числами как обычно:
=======
// number to bigint
alert(bigint + BigInt(number)); // 3

// bigint to number
alert(Number(bigint) + number); // 3
```

The conversion operations are always silent, never give errors, but if the bigint is too huge and won't fit the number type, then extra bits will be cut off, so we should be careful doing such conversion.

````smart header="The unary plus is not supported on bigints"
The unary plus operator `+value` is a well-known way to convert `value` to a number.

On bigints it's not supported, to avoid confusion:
```js run
let bigint = 1n;

alert( +bigint ); // error
```
So we should use `Number()` to convert a bigint to a number.
````

## Comparisons

Comparisons, such as `<`, `>` work with bigints and numbers just fine:
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

```js run
alert( 2n > 1n ); // true

alert( 2n > 1 ); // true
```

<<<<<<< HEAD
Пожалуйста, обратите внимание, что обычные и `bigint` числа принадлежат к разным типам, они могут быть равны только при нестрогом сравнении `==`:
=======
Please note though, as numbers and bigints belong to different types, they can be equal `==`, but not strictly equal `===`:
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

```js run
alert( 1 == 1n ); // true

alert( 1 === 1n ); // false
```

<<<<<<< HEAD
## Логические операции

В `if` или любом другом логическом операторе `bigint` число ведёт себя как обычное число.

К примеру, в `if` `bigint` `0n` преобразуется в `false`, другие значения преобразуются в `true`:

```js run
if (0n) {
  // никогда не выполнится
}
```

Логические операторы `||`, `&&` и другие также работают с `bigint` числами как с обычными числами:

```js run
alert( 1n || 2 ); // 1

alert( 0n || 2 ); // 2
```

## Полифилы

Создание полифила для `BigInt` - достаточно непростая задача. Причина в том, что многие операторы в JavaScript, такие как `+`, `-` и др., ведут себя по-разному с `bigint` по сравнению с обычными числами.

К примеру, деление `bigint` числа всегда возвращает `bigint` (округлённое при необходимости).

Чтобы эмулировать такое поведение, полифил должен будет проанализировать код и заменить все такие операторы на свои вызовы. Такая реализация будет тяжеловесной, не очень хорошей с точки зрения производительности.

Вот почему на данный момент нет хорошо реализованного полифила.

Существует обратное решение, предложеное разработчиками библиотеки [JSBI](https://github.com/GoogleChromeLabs/jsbi).

Эта библиотека реализует большие числа, используя собственные методы. Мы можем использовать их вместо встроенных `BigInt`:

| Операция | Встроенный `BigInt` | JSBI |
|-----------|-----------------|------|
| Создание из `number` | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| Сложение | `c = a + b` | `c = JSBI.add(a, b)` |
| Вычитание	| `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

...А затем использовать полифил (плагин Babel) для замены вызовов JSBI на встроенные `Bigint` для браузеров, которые их поддерживают.

Другими словами, данный подход предлагает использовать JSBI вместо встроенных `BigInt`. JSBI внутри себя работает с числами как с `BigInt`, эмулирует их с соблюдением всех требований спецификации. Таким образом, мы можем выполнять JSBI-код в интерпретаторах, которые не поддерживают `Bigint`, а для тех, которые поддерживают - полифил преобразует вызовы в обычные `Bigint`.

## Ссылки

- MDN: [BigInt](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
- Спецификация: [BigInt](https://tc39.es/ecma262/#sec-bigint-objects).
=======
## Boolean operations

When inside `if` or other boolean operations, bigints behave like numbers.

For instance, in `if`, bigint `0n` is falsy, other values are truthy:

```js run
if (0n) {
  // never executes
}
```

Boolean operators, such as `||`, `&&` and others also work with bigints similar to numbers:

```js run
alert( 1n || 2 ); // 1 (1n is considered truthy)

alert( 0n || 2 ); // 2 (0n is considered falsy)
```

## Polyfills

Polyfilling bigints is tricky. The reason is that many JavaScript operators, such as `+`, `-` and so on behave differently with bigints compared to regular numbers.

For example, division of bigints always returns a bigint (rounded if necessary).

To emulate such behavior, a polyfill would need to analyze the code and replace all such operators with its functions. But doing so is cumbersome and would cost a lot of performance.

So, there's no well-known good polyfill.

Although, the other way around is proposed by the developers of [JSBI](https://github.com/GoogleChromeLabs/jsbi) library.

This library implements big numbers using its own methods. We can use them instead of native bigints:

| Operation | native `BigInt` | JSBI |
|-----------|-----------------|------|
| Creation from Number | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| Addition | `c = a + b` | `c = JSBI.add(a, b)` |
| Subtraction	| `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

...And then use the polyfill (Babel plugin) to convert JSBI calls to native bigints for those browsers that support them.

In other words, this approach suggests that we write code in JSBI instead of native bigints. But JSBI works with numbers as with bigints internally, emulates them closely following the specification, so the code will be "bigint-ready".

We can use such JSBI code "as is" for engines that don't support bigints and for those that do support - the polyfill will convert the calls to native bigints.

## References

- [MDN docs on BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
- [Specification](https://tc39.es/ecma262/#sec-bigint-objects).
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
