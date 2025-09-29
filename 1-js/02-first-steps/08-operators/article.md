<<<<<<< HEAD
# Базовые операторы, математика

Многие операторы знакомы нам ещё со школы: сложение `+`, умножение `*`, вычитание `-` и так далее.

В этой главе мы начнём с простых операторов, а потом сконцентрируемся на специфических для JavaScript аспектах, которые не проходят в школьном курсе арифметики.

## Термины: "унарный", "бинарный", "операнд"

Прежде, чем мы двинемся дальше, давайте разберёмся с терминологией.

- *Операнд* -- то, к чему применяется оператор. Например, в умножении `5 * 2` есть два операнда: левый операнд равен `5`, а правый операнд равен `2`. Иногда их называют "аргументами" вместо "операндов".
- *Унарным* называется оператор, который применяется к одному операнду. Например, оператор унарный минус `"-"` меняет знак числа на противоположный:
=======
# Basic operators, maths

We know many operators from school. They are things like addition `+`, multiplication `*`, subtraction `-`, and so on.

In this chapter, we’ll start with simple operators, then concentrate on JavaScript-specific aspects, not covered by school arithmetic.

## Terms: "unary", "binary", "operand"

Before we move on, let's grasp some common terminology.

- *An operand* -- is what operators are applied to. For instance, in the multiplication of `5 * 2` there are two operands: the left operand is `5` and the right operand is `2`. Sometimes, people call these "arguments" instead of "operands".
- An operator is *unary* if it has a single operand. For example, the unary negation `-` reverses the sign of a number:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
<<<<<<< HEAD
    alert( x ); // -1, применили унарный минус
    ```
- *Бинарным* называется оператор, который применяется к двум операндам. Тот же минус существует и в бинарной форме:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, бинарный минус вычитает значения
    ```

    Формально, в последних примерах мы говорим о двух разных операторах, использующих один символ: оператор отрицания (унарный оператор, который обращает знак) и оператор вычитания (бинарный оператор, который вычитает одно число из другого).

## Математика

Поддерживаются следующие математические операторы:

- Сложение `+`,
- Вычитание `-`,
- Умножение `*`,
- Деление `/`,
- Взятие остатка от деления `%`,
- Возведение в степень `**`.

Первые четыре оператора очевидны, а про `%` и `**` стоит сказать несколько слов.

### Взятие остатка %

Оператор взятия остатка `%`, несмотря на обозначение, никакого отношения к процентам не имеет.

Результат `a % b` – это [остаток](https://ru.wikipedia.org/wiki/Деление_с_остатком) от целочисленного деления `a` на `b`.

Например:

```js run
alert( 5 % 2 ); // 1, остаток от деления 5 на 2
alert( 8 % 3 ); // 2, остаток от деления 8 на 3
alert( 8 % 4 ); // 0, остаток от деления 8 на 4
```

### Возведение в степень **

Оператор возведения в степень `a ** b` возводит `a` в степень `b`.

В школьной математике мы записываем это как a<sup>b</sup>.

Например:
=======
    alert( x ); // -1, unary negation was applied
    ```
- An operator is *binary* if it has two operands. The same minus exists in binary form as well:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, binary minus subtracts values
    ```

    Formally, in the examples above we have two different operators that share the same symbol: the negation operator, a unary operator that reverses the sign, and the subtraction operator, a binary operator that subtracts one number from another.

## Maths

The following math operations are supported:

- Addition `+`,
- Subtraction `-`,
- Multiplication `*`,
- Division `/`,
- Remainder `%`,
- Exponentiation `**`.

The first four are straightforward, while `%` and `**` need a few words about them.

### Remainder %

The remainder operator `%`, despite its appearance, is not related to percents.

The result of `a % b` is the [remainder](https://en.wikipedia.org/wiki/Remainder) of the integer division of `a` by `b`.

For instance:

```js run
alert( 5 % 2 ); // 1, the remainder of 5 divided by 2
alert( 8 % 3 ); // 2, the remainder of 8 divided by 3
alert( 8 % 4 ); // 0, the remainder of 8 divided by 4
```

### Exponentiation **

The exponentiation operator `a ** b` raises `a` to the power of `b`.

In school maths, we write that as a<sup>b</sup>.

For instance:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
alert( 2 ** 2 ); // 2² = 4
alert( 2 ** 3 ); // 2³ = 8
alert( 2 ** 4 ); // 2⁴ = 16
```

<<<<<<< HEAD
Математически, оператор работает и для нецелых чисел. Например, квадратный корень является возведением в степень ½:

```js run
alert( 4 ** (1/2) ); // 2 (степень 1/2 эквивалентна взятию квадратного корня)
```

## Сложение строк при помощи бинарного +

Давайте рассмотрим специальные возможности операторов JavaScript, которые выходят за рамки школьной арифметики.

Обычно при помощи плюса `'+'` складывают числа.

Но если бинарный оператор `'+'` применить к строкам, то он их объединяет в одну:

```js
let s = "моя" + "строка";
alert(s); // моястрока
```

Обратите внимание, если хотя бы один операнд является строкой, то второй будет также преобразован в строку.

Например:
=======
Just like in maths, the exponentiation operator is defined for non-integer numbers as well.

For example, a square root is an exponentiation by ½:

```js run
alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)
```


## String concatenation with binary +

Let's meet the features of JavaScript operators that are beyond school arithmetics.

Usually, the plus operator `+` sums numbers.

But, if the binary `+` is applied to strings, it merges (concatenates) them:

```js
let s = "my" + "string";
alert(s); // mystring
```

Note that if any of the operands is a string, then the other one is converted to a string too.

For example:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

<<<<<<< HEAD
Как видите, не важно, первый или второй операнд является строкой.

Вот пример посложнее:

```js run
alert(2 + 2 + '1' ); // будет "41", а не "221"
```

Здесь операторы работают один за другим. Первый `+` складывает два числа и возвращает `4`, затем следующий `+` объединяет результат со строкой, производя действие `4 + '1' = '41'`.

Сложение и преобразование строк — это особенность бинарного плюса `+`. Другие арифметические операторы работают только с числами и всегда преобразуют операнды в числа.

Например, вычитание и деление:

```js run
alert( 6 - '2' ); // 4, '2' приводится к числу
alert( '6' / '2' ); // 3, оба операнда приводятся к числам
```

## Приведение к числу, унарный +

Плюс `+` существует в двух формах: бинарной, которую мы использовали выше, и унарной.

Унарный, то есть применённый к одному значению, плюс `+` ничего не делает с числами. Но если операнд не число, унарный плюс преобразует его в число.

Например:

```js run
// Не влияет на числа
=======
See, it doesn't matter whether the first operand is a string or the second one.

Here's a more complex example:

```js run
alert(2 + 2 + '1' ); // "41" and not "221"
```

Here, operators work one after another. The first `+` sums two numbers, so it returns `4`, then the next `+` adds the string `1` to it, so it's like `4 + '1' = '41'`.

```js run
alert('1' + 2 + 2); // "122" and not "14"
```
Here, the first operand is a string, the compiler treats the other two operands as strings too. The `2` gets concatenated to `'1'`, so it's like `'1' + 2 = "12"` and `"12" + 2 = "122"`.

The binary `+` is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers.

Here's the demo for subtraction and division:

```js run
alert( 6 - '2' ); // 4, converts '2' to a number
alert( '6' / '2' ); // 3, converts both operands to numbers
```

## Numeric conversion, unary +

The plus `+` exists in two forms: the binary form that we used above and the unary form.

The unary plus or, in other words, the plus operator `+` applied to a single value, doesn't do anything to numbers. But if the operand is not a number, the unary plus converts it into a number.

For example:

```js run
// No effect on numbers
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
<<<<<<< HEAD
// Преобразует не числа в числа
=======
// Converts non-numbers
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

<<<<<<< HEAD
На самом деле это то же самое, что и `Number(...)`, только короче.

Необходимость преобразовывать строки в числа возникает очень часто. Например, обычно значения полей HTML-формы — это строки. А что, если их нужно, к примеру, сложить?

Бинарный плюс сложит их как строки:
=======
It actually does the same thing as `Number(...)`, but is shorter.

The need to convert strings to numbers arises very often. For example, if we are getting values from HTML form fields, they are usually strings. What if we want to sum them?

The binary plus would add them as strings:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let apples = "2";
let oranges = "3";

<<<<<<< HEAD
alert( apples + oranges ); // "23", так как бинарный плюс объединяет строки
```

Поэтому используем унарный плюс, чтобы преобразовать к числу:
=======
alert( apples + oranges ); // "23", the binary plus concatenates strings
```

If we want to treat them as numbers, we need to convert and then sum them:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let apples = "2";
let oranges = "3";

*!*
<<<<<<< HEAD
// оба операнда предварительно преобразованы в числа
alert( +apples + +oranges ); // 5
*/!*

// более длинный вариант
// alert( Number(apples) + Number(oranges) ); // 5
```

С точки зрения математики, такое изобилие плюсов выглядит странным. Но с точки зрения программиста тут нет ничего особенного: сначала выполнятся унарные плюсы, которые приведут строки к числам, а затем бинарный `'+'` их сложит.

Почему унарные плюсы выполнились до бинарного сложения? Как мы сейчас увидим, дело в их приоритете.

## Приоритет операторов

В том случае, если в выражении есть несколько операторов – порядок их выполнения определяется *приоритетом*, или, другими словами, существует определённый порядок выполнения операторов.

Из школы мы знаем, что умножение в выражении `1 + 2 * 2` выполнится раньше сложения. Это как раз и есть "приоритет". Говорят, что умножение имеет более высокий приоритет, чем сложение.

Скобки важнее, чем приоритет, так что, если мы не удовлетворены порядком по умолчанию, мы можем использовать их, чтобы изменить приоритет. Например, написать `(1 + 2) * 2`.

В JavaScript много операторов. Каждый оператор имеет соответствующий номер приоритета. Тот, у кого это число больше, – выполнится раньше. Если приоритет одинаковый, то порядок выполнения – слева направо.

Отрывок из [таблицы приоритетов](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) (нет необходимости всё запоминать, обратите внимание, что приоритет унарных операторов выше, чем соответствующих бинарных):

| Приоритет | Название | Обозначение |
|------------|------|------|
| ... | ... | ... |
| 15 | унарный плюс | `+` |
| 15 | унарный минус | `-` |
| 14 | возведение в степень | `**` |
| 13 | умножение | `*` |
| 13 | деление | `/` |
| 12 | сложение | `+` |
| 12 | вычитание | `-` |
| ... | ... | ... |
| 2 | присваивание | `=` |
| ... | ... | ... |

Так как "унарный плюс" имеет приоритет `15`, который выше, чем `12` у "сложения" (бинарный плюс), то в выражении `"+apples + +oranges"` сначала выполнятся унарные плюсы, а затем сложение.

## Присваивание

Давайте отметим, что в таблице приоритетов также есть оператор присваивания `=`. У него один из самых низких приоритетов: `2`.

Именно поэтому, когда переменной что-либо присваивают, например, `x = 2 * 2 + 1`, то сначала выполнится арифметика, а уже затем произойдёт присваивание `=` с сохранением результата в `x`.
=======
// both values converted to numbers before the binary plus
alert( +apples + +oranges ); // 5
*/!*

// the longer variant
// alert( Number(apples) + Number(oranges) ); // 5
```

From a mathematician's standpoint, the abundance of pluses may seem strange. But from a programmer's standpoint, there's nothing special: unary pluses are applied first, they convert strings to numbers, and then the binary plus sums them up.

Why are unary pluses applied to values before the binary ones? As we're going to see, that's because of their *higher precedence*.

## Operator precedence

If an expression has more than one operator, the execution order is defined by their *precedence*, or, in other words, the default priority order of operators.

From school, we all know that the multiplication in the expression `1 + 2 * 2` should be calculated before the addition. That's exactly the precedence thing. The multiplication is said to have *a higher precedence* than the addition.

Parentheses override any precedence, so if we're not satisfied with the default order, we can use them to change it. For example, write `(1 + 2) * 2`.

There are many operators in JavaScript. Every operator has a corresponding precedence number. The one with the larger number executes first. If the precedence is the same, the execution order is from left to right.

Here's an extract from the [precedence table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) (you don't need to remember this, but note that unary operators are higher than corresponding binary ones):

| Precedence | Name | Sign |
|------------|------|------|
| ... | ... | ... |
| 14 | unary plus | `+` |
| 14 | unary negation | `-` |
| 13 | exponentiation | `**` |
| 12 | multiplication | `*` |
| 12 | division | `/` |
| 11 | addition | `+` |
| 11 | subtraction | `-` |
| ... | ... | ... |
| 2 | assignment | `=` |
| ... | ... | ... |

As we can see, the "unary plus" has a priority of `14` which is higher than the `11` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.

## Assignment

Let's note that an assignment `=` is also an operator. It is listed in the precedence table with the very low priority of `2`.

That's why, when we assign a variable, like `x = 2 * 2 + 1`, the calculations are done first and then the `=` is evaluated, storing the result in `x`.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

<<<<<<< HEAD
### Присваивание = возвращает значение

Тот факт, что `=` является оператором, а не "магической" конструкцией языка, имеет интересные последствия.

Большинство операторов в JavaScript возвращают значение. Для некоторых это очевидно, например сложение `+` или умножение `*`. Но и оператор присваивания не является исключением.

Вызов `x = value` записывает `value` в `x` *и возвращает его*.

Благодаря этому присваивание можно использовать как часть более сложного выражения:
=======
### Assignment = returns a value

The fact of `=` being an operator, not a "magical" language construct has an interesting implication.

All operators in JavaScript return a value. That's obvious for `+` and `-`, but also true for `=`.

The call `x = value` writes the `value` into `x` *and then returns it*.

Here's a demo that uses an assignment as part of a more complex expression:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

<<<<<<< HEAD
В примере выше результатом `(a = b + 1)` будет значение, которое присваивается переменной `a` (то есть `3`). Потом оно используется для дальнейших вычислений.

Забавное применение присваивания, не так ли? Нам нужно понимать, как это работает, потому что иногда это можно увидеть в JavaScript-библиотеках.

Однако писать самим в таком стиле не рекомендуется. Такие трюки не сделают ваш код более понятным или читабельным.

### Присваивание по цепочке

Рассмотрим ещё одну интересную возможность: цепочку присваиваний.
=======
In the example above, the result of expression `(a = b + 1)` is the value which was assigned to `a` (that is `3`). It is then used for further evaluations.

Funny code, isn't it? We should understand how it works, because sometimes we see it in JavaScript libraries.

Although, please don't write the code like that. Such tricks definitely don't make code clearer or readable.

### Chaining assignments

Another interesting feature is the ability to chain assignments:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

<<<<<<< HEAD
Такое присваивание работает справа налево. Сначала вычисляется самое правое выражение `2 + 2`, и затем результат присваивается переменным слева: `c`, `b` и `a`. В конце у всех переменных будет одно значение.

Опять-таки, чтобы код читался легче, лучше разделять подобные конструкции на несколько строчек:
=======
Chained assignments evaluate from right to left. First, the rightmost expression `2 + 2` is evaluated and then assigned to the variables on the left: `c`, `b` and `a`. At the end, all the variables share a single value.

Once again, for the purposes of readability it's better to split such code into few lines:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
c = 2 + 2;
b = c;
a = c;
```
<<<<<<< HEAD
Польза от такого стиля особенно ощущается при быстром просмотре кода.

## Сокращённая арифметика с присваиванием

Часто нужно применить оператор к переменной и сохранить результат в ней же.

Например:
=======
That's easier to read, especially when eye-scanning the code fast.

## Modify-in-place

We often need to apply an operator to a variable and store the new result in that same variable.

For example:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
let n = 2;
n = n + 5;
n = n * 2;
```

<<<<<<< HEAD
Эту запись можно укоротить при помощи совмещённых операторов `+=` и `*=`:

```js run
let n = 2;
n += 5; // теперь n = 7 (работает как n = n + 5)
n *= 2; // теперь n = 14 (работает как n = n * 2)
=======
This notation can be shortened using the operators `+=` and `*=`:

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

alert( n ); // 14
```

<<<<<<< HEAD
Подобные краткие формы записи существуют для **всех** арифметических и побитовых операторов: `/=`, `-=`, `**=` и так далее.

Вызов с присваиванием имеет в точности такой же приоритет, как обычное присваивание, то есть выполнится после большинства других операций:
=======
Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.

Such operators have the same precedence as a normal assignment, so they run after most other calculations:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let n = 2;

<<<<<<< HEAD
n *= 3 + 5;

alert( n ); // 16  (сначала выполнится правая часть, выражение идентично n *= 8)
```

## Инкремент/декремент

<!-- Не получается использовать -- в заголовке, так как парсер превращает -- в длинное тире – -->

Одной из наиболее частых числовых операций является увеличение или уменьшение на единицу.

Для этого существуют даже специальные операторы:

- **Инкремент** `++` увеличивает переменную на 1:

    ```js run no-beautify
    let counter = 2;
    counter++;        // работает как counter = counter + 1, просто запись короче
    alert( counter ); // 3
    ```
- **Декремент** `--` уменьшает переменную на 1:

    ```js run no-beautify
    let counter = 2;
    counter--;        // работает как counter = counter - 1, просто запись короче
=======
n *= 3 + 5; // right part evaluated first, same as n *= 8

alert( n ); // 16
```

## Increment/decrement

<!-- Can't use -- in title, because the built-in parser turns it into a 'long dash' – -->

Increasing or decreasing a number by one is among the most common numerical operations.

So, there are special operators for it:

- **Increment** `++` increases a variable by 1:

    ```js run no-beautify
    let counter = 2;
    counter++;        // works the same as counter = counter + 1, but is shorter
    alert( counter ); // 3
    ```
- **Decrement** `--` decreases a variable by 1:

    ```js run no-beautify
    let counter = 2;
    counter--;        // works the same as counter = counter - 1, but is shorter
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
    alert( counter ); // 1
    ```

```warn
<<<<<<< HEAD
Инкремент/декремент можно применить только к переменной. Попытка использовать его на значении, типа 5++, приведёт к ошибке.
```

Операторы `++` и `--` могут быть расположены не только после, но и до переменной.

- Когда оператор идёт после переменной — это "постфиксная форма": `counter++`.
- "Префиксная форма" — это когда оператор идёт перед переменной: `++counter`.

Обе эти инструкции делают одно и то же: увеличивают `counter` на `1`.

Есть ли разница между ними? Да, но увидеть её мы сможем, только если будем использовать значение, которое возвращают `++/--`.

Давайте проясним этот момент. Как мы знаем, все операторы возвращают значение. Операторы инкремента/декремента не исключение. Префиксная форма возвращает новое значение, в то время как постфиксная форма возвращает старое (до увеличения/уменьшения числа).

Чтобы увидеть разницу, вот небольшой пример:
=======
Increment/decrement can only be applied to variables. Trying to use it on a value like `5++` will give an error.
```

The operators `++` and `--` can be placed either before or after a variable.

- When the operator goes after the variable, it is in "postfix form": `counter++`.
- The "prefix form" is when the operator goes before the variable: `++counter`.

Both of these statements do the same thing: increase `counter` by `1`.

Is there any difference? Yes, but we can only see it if we use the returned value of `++/--`.

Let's clarify. As we know, all operators return a value. Increment/decrement is no exception. The prefix form returns the new value while the postfix form returns the old value (prior to increment/decrement).

To see the difference, here's an example:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

<<<<<<< HEAD
В строке `(*)` *префиксная* форма `++counter` увеличивает `counter` и возвращает новое значение `2`. Так что `alert` покажет `2`.

Теперь посмотрим на постфиксную форму:

```js run
let counter = 1;
let a = counter++; // (*) меняем ++counter на counter++
=======
In the line `(*)`, the *prefix* form `++counter` increments `counter` and returns the new value, `2`. So, the `alert` shows `2`.

Now, let's use the postfix form:

```js run
let counter = 1;
let a = counter++; // (*) changed ++counter to counter++
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

alert(a); // *!*1*/!*
```

<<<<<<< HEAD
В строке `(*)` *постфиксная* форма `counter++` также увеличивает `counter`, но возвращает *старое* значение (которое было до увеличения). Так что `alert` покажет `1`.

Подведём итоги:

- Если результат оператора не используется, а нужно только увеличить/уменьшить переменную, тогда без разницы, какую форму использовать:
=======
In the line `(*)`, the *postfix* form `counter++` also increments `counter` but returns the *old* value (prior to increment). So, the `alert` shows `1`.

To summarize:

- If the result of increment/decrement is not used, there is no difference in which form to use:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

    ```js run
    let counter = 0;
    counter++;
    ++counter;
<<<<<<< HEAD
    alert( counter ); // 2, обе строки сделали одно и то же
    ```
- Если хочется тут же использовать результат, то нужна префиксная форма:
=======
    alert( counter ); // 2, the lines above did the same
    ```
- If we'd like to increase a value *and* immediately use the result of the operator, we need the prefix form:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
<<<<<<< HEAD
- Если нужно увеличить и при этом получить значение переменной *до увеличения* – нужна постфиксная форма:
=======
- If we'd like to increment a value but use its previous value, we need the postfix form:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

<<<<<<< HEAD
````smart header="Инкремент/декремент можно использовать в любых выражениях"
Операторы `++/--` могут также использоваться внутри выражений. Их приоритет выше, чем у большинства других арифметических операций.

Например:
=======
````smart header="Increment/decrement among other operators"
The operators `++/--` can be used inside expressions as well. Their precedence is higher than most other arithmetical operations.

For instance:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

<<<<<<< HEAD
Сравните с:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, потому что counter++ возвращает "старое" значение
```

Хотя технически здесь всё в порядке, такая запись обычно делает код менее читабельным. Одна строка выполняет множество действий -- нехорошо.

При беглом чтении кода можно с лёгкостью пропустить такой `counter++`, и будет неочевидно, что переменная увеличивается.

Лучше использовать стиль "одна строка -- одно действие":
=======
Compare with:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, because counter++ returns the "old" value
```

Though technically okay, such notation usually makes code less readable. One line does multiple things -- not good.

While reading code, a fast "vertical" eye-scan can easily miss something like `counter++` and it won't be obvious that the variable increased.

We advise a style of "one line -- one action":
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

<<<<<<< HEAD
## Побитовые операторы

Побитовые операторы работают с 32-разрядными целыми числами (при необходимости приводят к ним), на уровне их внутреннего двоичного представления.

Эти операторы не являются чем-то специфичным для JavaScript, они поддерживаются в большинстве языков программирования.

Поддерживаются следующие побитовые операторы:

- AND(и) ( `&` )
- OR(или) ( `|` )
- XOR(побитовое исключающее или) ( `^` )
- NOT(не) ( `~` )
- LEFT SHIFT(левый сдвиг) ( `<<` )
- RIGHT SHIFT(правый сдвиг) ( `>>` )
- ZERO-FILL RIGHT SHIFT(правый сдвиг с заполнением нулями) ( `>>>` )

Они используются редко, когда возникает необходимость оперировать с числами на очень низком (побитовом) уровне. В ближайшем времени они нам не понадобятся, так как веб-разработчики редко к ним прибегают, хотя в некоторых сферах (например, в криптографии) они полезны. 

Вы можете прочитать о них в главе <info:bitwise-operators>, когда возникнет реальная необходимость.

## Оператор "запятая"

Оператор "запятая" (`,`) редко применяется и является одним из самых необычных. Иногда он используется для написания более короткого кода, поэтому нам нужно знать его, чтобы понимать, что при этом происходит.

Оператор "запятая" предоставляет нам возможность вычислять несколько выражений, разделяя их запятой `,`. Каждое выражение выполняется, но возвращается результат только последнего.

Например:
=======
## Bitwise operators

Bitwise operators treat arguments as 32-bit integer numbers and work on the level of their binary representation.

These operators are not JavaScript-specific. They are supported in most programming languages.

The list of operators:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level. We won't need these operators any time soon, as web development has little use of them, but in some special areas, such as cryptography, they are useful. You can read the [Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) chapter on MDN when a need arises.

## Comma

The comma operator `,` is one of the rarest and most unusual operators. Sometimes, it's used to write shorter code, so we need to know it in order to understand what's going on.

The comma operator allows us to evaluate several expressions, dividing them with a comma `,`. Each of them is evaluated but only the result of the last one is returned.

For example:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

<<<<<<< HEAD
alert( a ); // 7 (результат вычисления 3 + 4)
```

Первое выражение `1 + 2` выполняется, а результат отбрасывается. Затем идёт `3 + 4`, выражение выполняется и возвращается результат.

````smart header="Запятая имеет очень низкий приоритет"
Пожалуйста, обратите внимание, что оператор `,` имеет очень низкий приоритет, ниже `=`, поэтому скобки важны в приведённом выше примере.

Попробуйте запустить следующий код (**строгий режим `"use strict"` в примере ниже не используется, иначе мы бы получили ошибку**):

```js run no-strict
a = 1 + 2, 3 + 4;

alert(a); // 3
```

Необычный результат, правда? Особенно учитывая то, что оператор `,` должен «выполнять каждое выражение, но возвращать результат только последнего».

Без скобок в `a = 1 + 2, 3 + 4` сначала выполнится `+`, суммируя числа в `a = 3, 7`, затем оператор присваивания `=` присвоит `a = 3`, а то, что идёт дальше, будет проигнорировано. Всё так же, как в `(a = 1 + 2), 3 + 4`.
````

Зачем нам оператор, который отбрасывает всё, кроме последнего выражения?

Иногда его используют в составе более сложных конструкций, чтобы сделать несколько действий в одной строке.

Например:

```js
// три операции в одной строке
=======
alert( a ); // 7 (the result of 3 + 4)
```

Here, the first expression `1 + 2` is evaluated and its result is thrown away. Then, `3 + 4` is evaluated and returned as the result.

```smart header="Comma has a very low precedence"
Please note that the comma operator has very low precedence, lower than `=`, so parentheses are important in the example above.

Without them: `a = 1 + 2, 3 + 4` evaluates `+` first, summing the numbers into `a = 3, 7`, then the assignment operator `=` assigns `a = 3`, and the rest is ignored. It's like `(a = 1 + 2), 3 + 4`.
```

Why do we need an operator that throws away everything except the last expression?

Sometimes, people use it in more complex constructs to put several actions in one line.

For example:

```js
// three operations in one line
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

<<<<<<< HEAD
Такие трюки используются во многих JavaScript-фреймворках. Вот почему мы упоминаем их. Но обычно они не улучшают читабельность кода, поэтому стоит хорошо подумать, прежде чем их использовать.
=======
Such tricks are used in many JavaScript frameworks. That's why we're mentioning them. But usually they don't improve code readability so we should think well before using them.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
