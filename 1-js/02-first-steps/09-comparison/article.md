<<<<<<< HEAD
# Операторы сравнения

Многие операторы сравнения известны нам из математики.

В JavaScript они записываются так:

- Больше/меньше: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Больше/меньше или равно: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Равно: `a == b`. Обратите внимание, для сравнения используется двойной знак равенства `==`. Один знак равенства `a = b` означал бы присваивание.
- Не равно. В математике обозначается символом <code>&ne;</code>, но в JavaScript записывается как <code>a != b</code>.

В этом разделе мы больше узнаем про то, какие бывают сравнения, как язык с ними работает и к каким неожиданностям мы должны быть готовы.

В конце вы найдёте хороший рецепт того, как избегать "причуд" сравнения в JavaScript.

## Результат сравнения имеет логический тип

Все операторы сравнения возвращают значение логического типа:

- `true` -- означает "да", "верно", "истина".
- `false` -- означает "нет", "неверно", "ложь".

Например:

```js run
alert( 2 > 1 );  // true (верно)
alert( 2 == 1 ); // false (неверно)
alert( 2 != 1 ); // true (верно)
```

Результат сравнения можно присвоить переменной, как и любое значение:

```js run
let result = 5 > 4; // результат сравнения присваивается переменной result
alert( result ); // true
```

## Сравнение строк

Чтобы определить, что одна строка больше другой, JavaScript использует "алфавитный" или "лексикографический" порядок.

Другими словами, строки сравниваются посимвольно.

Например:

```js run
alert( 'Я' > 'А' ); // true
alert( 'Коты' > 'Кода' ); // true
alert( 'Сонный' > 'Сон' ); // true
```

Алгоритм сравнения двух строк довольно прост:

1. Сначала сравниваются первые символы строк.
2. Если первый символ первой строки больше (меньше), чем первый символ второй, то первая строка больше (меньше) второй. Сравнение завершено.
3. Если первые символы равны, то таким же образом сравниваются уже вторые символы строк.
4. Сравнение продолжается, пока не закончится одна из строк.
5. Если обе строки заканчиваются одновременно, то они равны. Иначе, большей считается более длинная строка.

В примерах выше сравнение `'Я' > 'А'` завершится на первом шаге, тогда как строки `'Коты'` и `'Кода'` будут сравниваться посимвольно:

1. `К` равна `К`.
2. `о` равна `о`.
3. `т` больше, чем `д`. На этом сравнение заканчивается. Первая строка больше.

```smart header="Используется кодировка Unicode, а не настоящий алфавит"
Приведённый выше алгоритм сравнения похож на алгоритм, используемый в словарях и телефонных книгах, но между ними есть и различия.

Например, в JavaScript имеет значение регистр символов. Заглавная буква `"A"` не равна строчной `"a"`. Какая же из них больше? Строчная `"a"`. Почему? Потому что строчные буквы имеют больший код во внутренней таблице кодирования, которую использует JavaScript (Unicode). Мы ещё поговорим о внутреннем представлении строк и его влиянии в главе <info:string>.
```

## Сравнение разных типов

При сравнении значений разных типов JavaScript приводит каждое из них к числу.

Например:

```js run
alert( '2' > 1 ); // true, строка '2' становится числом 2
alert( '01' == 1 ); // true, строка '01' становится числом 1
```

Логическое значение `true` становится `1`, а `false` – `0`.

Например:
=======
# Comparisons

We know many comparison operators from maths.

In JavaScript they are written like this:

- Greater/less than: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Greater/less than or equals: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Equals: `a == b`, please note the double equality sign `==` means the equality test, while a single one `a = b` means an assignment.
- Not equals: In maths the notation is <code>&ne;</code>, but in JavaScript it's written as <code>a != b</code>.

In this article we'll learn more about different types of comparisons, how JavaScript makes them, including important peculiarities.

At the end you'll find a good recipe to avoid "JavaScript quirks"-related issues.

## Boolean is the result

All comparison operators return a boolean value:

- `true` -- means "yes", "correct" or "the truth".
- `false` -- means "no", "wrong" or "not the truth".

For example:

```js run
alert( 2 > 1 );  // true (correct)
alert( 2 == 1 ); // false (wrong)
alert( 2 != 1 ); // true (correct)
```

A comparison result can be assigned to a variable, just like any value:

```js run
let result = 5 > 4; // assign the result of the comparison
alert( result ); // true
```

## String comparison

To see whether a string is greater than another, JavaScript uses the so-called "dictionary" or "lexicographical" order.

In other words, strings are compared letter-by-letter.

For example:

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

The algorithm to compare two strings is simple:

1. Compare the first character of both strings.
2. If the first character from the first string is greater (or less) than the other string's, then the first string is greater (or less) than the second. We're done.
3. Otherwise, if both strings' first characters are the same, compare the second characters the same way.
4. Repeat until the end of either string.
5. If both strings end at the same length, then they are equal. Otherwise, the longer string is greater.

In the first example above, the comparison `'Z' > 'A'` gets to a result at the first step.

The second comparison `'Glow'` and `'Glee'` needs more steps as strings are compared character-by-character:

1. `G` is the same as `G`.
2. `l` is the same as `l`.
3. `o` is greater than `e`. Stop here. The first string is greater.

```smart header="Not a real dictionary, but Unicode order"
The comparison algorithm given above is roughly equivalent to the one used in dictionaries or phone books, but it's not exactly the same.

For instance, case matters. A capital letter `"A"` is not equal to the lowercase `"a"`. Which one is greater? The lowercase `"a"`. Why? Because the lowercase character has a greater index in the internal encoding table JavaScript uses (Unicode). We'll get back to specific details and consequences of this in the chapter <info:string>.
```

## Comparison of different types

When comparing values of different types, JavaScript converts the values to numbers.

For example:

```js run
alert( '2' > 1 ); // true, string '2' becomes a number 2
alert( '01' == 1 ); // true, string '01' becomes a number 1
```

For boolean values, `true` becomes `1` and `false` becomes `0`.

For example:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

<<<<<<< HEAD
````smart header="Забавное следствие"
Возможна следующая ситуация:

- Два значения равны.
- Одно из них `true` как логическое значение, другое – `false`.

Например:
=======
````smart header="A funny consequence"
It is possible that at the same time:

- Two values are equal.
- One of them is `true` as a boolean and the other one is `false` as a boolean.

For example:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

<<<<<<< HEAD
С точки зрения JavaScript, результат ожидаем. Равенство преобразует значения, используя числовое преобразование, поэтому `"0"` становится `0`. В то время как явное преобразование с помощью `Boolean` использует другой набор правил.
````

## Строгое сравнение

Использование обычного сравнения `==` может вызывать проблемы. Например, оно не отличает `0` от `false`:
=======
From JavaScript's standpoint, this result is quite normal. An equality check converts values using the numeric conversion (hence `"0"` becomes `0`), while the explicit `Boolean` conversion uses another set of rules.
````

## Strict equality

A regular equality check `==` has a problem. It cannot differentiate `0` from `false`:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
alert( 0 == false ); // true
```

<<<<<<< HEAD
Та же проблема с пустой строкой:
=======
The same thing happens with an empty string:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
alert( '' == false ); // true
```

<<<<<<< HEAD
Это происходит из-за того, что операнды разных типов преобразуются оператором `==` к числу. В итоге, и пустая строка, и `false` становятся нулём.

Как же тогда отличать `0` от `false`?

**Оператор строгого равенства `===` проверяет равенство без приведения типов.**

Другими словами, если `a` и `b` имеют разные типы, то проверка `a === b` немедленно возвращает `false` без попытки их преобразования.

Давайте проверим:

```js run
alert( 0 === false ); // false, так как сравниваются разные типы
```

Ещё есть оператор строгого неравенства `!==`, аналогичный `!=`.

Оператор строгого равенства дольше писать, но он делает код более очевидным и оставляет меньше места для ошибок.

## Сравнение с null и undefined

Поведение `null` и `undefined` при сравнении с другими значениями — особое:

При строгом равенстве `===`
: Эти значения различны, так как различны их типы.
=======
This happens because operands of different types are converted to numbers by the equality operator `==`. An empty string, just like `false`, becomes a zero.

What to do if we'd like to differentiate `0` from `false`?

**A strict equality operator `===` checks the equality without type conversion.**

In other words, if `a` and `b` are of different types, then `a === b` immediately returns `false` without an attempt to convert them.

Let's try it:

```js run
alert( 0 === false ); // false, because the types are different
```

There is also a "strict non-equality" operator `!==` analogous to `!=`.

The strict equality operator is a bit longer to write, but makes it obvious what's going on and leaves less room for errors.

## Comparison with null and undefined

There's a non-intuitive behavior when `null` or `undefined` are compared to other values.

For a strict equality check `===`
: These values are different, because each of them is a different type.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

    ```js run
    alert( null === undefined ); // false
    ```

<<<<<<< HEAD
При нестрогом равенстве `==`
: Эти значения равны друг другу и не равны никаким другим значениям. Это специальное правило языка.
=======
For a non-strict check `==`
: There's a special rule. These two are a "sweet couple": they equal each other (in the sense of `==`), but not any other value.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

    ```js run
    alert( null == undefined ); // true
    ```

<<<<<<< HEAD
При использовании математических операторов и других операторов сравнения `< > <= >=`
: Значения `null/undefined` преобразуются к числам: `null` становится `0`, а `undefined` – `NaN`.

Посмотрим, какие забавные вещи случаются, когда мы применяем эти правила. И, что более важно, как избежать ошибок при их использовании.

### Странный результат сравнения null и 0

Сравним `null` с нулём:
=======
For maths and other comparisons `< > <= >=`
: `null/undefined` are converted to numbers: `null` becomes `0`, while `undefined` becomes `NaN`.

Now let's see some funny things that happen when we apply these rules. And, what's more important, how to not fall into a trap with them.

### Strange result: null vs 0

Let's compare `null` with a zero:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

<<<<<<< HEAD
С точки зрения математики это странно. Результат последнего сравнения говорит о том, что "`null` больше или равно нулю", тогда результат одного из сравнений выше должен быть `true`, но они оба ложны.

Причина в том, что нестрогое равенство и сравнения `> < >= <=` работают по-разному. Сравнения преобразуют `null` в число, рассматривая его как `0`. Поэтому выражение (3) `null >= 0` истинно, а `null > 0` ложно.

С другой стороны, для нестрогого равенства `==` значений `undefined` и `null` действует особое правило: эти значения ни к чему не приводятся, они равны друг другу и не равны ничему другому. Поэтому (2) `null == 0` ложно.

### Несравненное значение undefined

Значение `undefined` несравнимо с другими значениями:
=======
Mathematically, that's strange. The last result states that "`null` is greater than or equal to zero", so in one of the comparisons above it must be `true`, but they are both false.

The reason is that an equality check `==` and comparisons `> < >= <=` work differently. Comparisons convert `null` to a number, treating it as `0`. That's why (3) `null >= 0` is true and (1) `null > 0` is false.

On the other hand, the equality check `==` for `undefined` and `null` is defined such that, without any conversions, they equal each other and don't equal anything else. That's why (2) `null == 0` is false.

### An incomparable undefined

The value `undefined` shouldn't be compared to other values:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

<<<<<<< HEAD
Почему же сравнение `undefined` с нулём всегда ложно?

На это есть следующие причины:

- Сравнения `(1)` и `(2)` возвращают `false`, потому что `undefined` преобразуется в `NaN`, а `NaN` – это специальное числовое значение, которое возвращает `false` при любых сравнениях.
- Нестрогое равенство `(3)` возвращает `false`, потому что `undefined` равно только `null`, `undefined` и ничему больше.

### Как избежать проблем

Зачем мы рассмотрели все эти примеры? Должны ли мы постоянно помнить обо всех этих особенностях? Необязательно. Со временем все они станут вам знакомы, но можно избежать проблем, если следовать надёжным правилам:

- Относитесь очень осторожно к любому сравнению с `undefined/null`, кроме случаев строгого равенства `===`.
- Не используйте сравнения `>= > < <=` с переменными, которые могут принимать значения `null/undefined`, разве что вы полностью уверены в том, что делаете. Если переменная может принимать эти значения, то добавьте для них отдельные проверки.

## Итого

- Операторы сравнения возвращают значения логического типа.
- Строки сравниваются посимвольно в лексикографическом порядке.
- Значения разных типов при сравнении приводятся к числу. Исключением является сравнение с помощью операторов строгого равенства/неравенства.
- Значения `null` и `undefined` равны `==` друг другу и не равны любому другому значению.
- Будьте осторожны при использовании операторов сравнений вроде `>` и `<` с переменными, которые могут принимать значения `null/undefined`. Хорошей идеей будет сделать отдельную проверку на `null/undefined`.
=======
Why does it dislike zero so much? Always false!

We get these results because:

- Comparisons `(1)` and `(2)` return `false` because `undefined` gets converted to `NaN` and `NaN` is a special numeric value which returns `false` for all comparisons.
- The equality check `(3)` returns `false` because `undefined` only equals `null`, `undefined`, and no other value.

### Avoid problems

Why did we go over these examples? Should we remember these peculiarities all the time? Well, not really. Actually, these tricky things will gradually become familiar over time, but there's a solid way to avoid problems with them:

- Treat any comparison with `undefined/null` except the strict equality `===` with exceptional care.
- Don't use comparisons `>= > < <=` with a variable which may be `null/undefined`, unless you're really sure of what you're doing. If a variable can have these values, check for them separately.

## Summary

- Comparison operators return a boolean value.
- Strings are compared letter-by-letter in the "dictionary" order.
- When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).
- The values `null` and `undefined` equal `==` each other and do not equal any other value.
- Be careful when using comparisons like `>` or `<` with variables that can occasionally be `null/undefined`. Checking for `null/undefined` separately is a good idea.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
