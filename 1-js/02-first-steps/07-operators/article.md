# Операторы

Мы знаем много операторов из школы. Это такие вещи, как сложение `+`, умножение `*`, вычитание `-`, и так далее.

В этой главе мы сконцентрируемся на аспектах операторов, которые не охватываются школьной арифметикой.

## Термины: «унарный», «бинарный», «операнд»

Прежде чем двигаться дальше, давайте разберемся с некоторой общей терминологией.

- *Операнд* -- это то, к чему применяются операторы. Например, при умножении `5 * 2` есть два операнда: левый операнд `5` и правый операнд `2`. Иногда люди называют это «аргументы» вместо «операндов».
- Оператор *унарный*, если он имеет один операнд. Например, одинарное отрицание `-` меняет знак числа:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, было применено унарное отрицание
    ```
- Оператор является *бинарным*, если он имеет два операнда. Тот же минус существует и в бинарной форме:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, бинарный минус вычитает значения
    ```

    Формально, мы говорим здесь о двух разных операторах: унарное отрицание (один операнд: меняет знак) и бинарное вычитание (два операнда: вычитание).

## Конкатенация строк, бинарный +

Теперь давайте посмотрим на особенности JavaScript-операторов, которые выходят за рамки школьной арифметики.

Обычно оператор плюс `+` суммирует числа.

Но если бинарный `+` применяется к строкам, он объединяет (сцепляет) их:

```js
let s = "моя" + "строка";
alert(s); // моястрока
```

Обратите внимание, что если один из операндов является строкой, другой тоже преобразуется в строку.

Например:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Видите, не имеет значения, является ли первый операнд строкой или вторым. Правило простое: если один из операндов является строкой, другой также преобразуется в строку.

Однако обратите внимание, что операции выполняются слева направо. Если перед строкой находятся два числа, числа будут добавлены перед преобразованием в строку:

```js run
alert(2 + 2 + '1' ); // "41" а не "221"
```

Конкатенация и преобразование строк - это особенность бинарного плюс `+`. Другие арифметические операторы работают только с числами и всегда преобразуют свои операнды в числа.

Например, вычитание и деление:

```js run
alert( 2 - '1' ); // 1
alert( '6' / '2' ); // 3
```

## Числовое преобразование, одинарное +

Плюс `+` существует в двух формах: бинарная форма, которую мы использовали выше, и унарная форма.

Унарный плюс или, другими словами, оператор плюс `+`, примененный к одному значению, ничего не делает с числами. Но если операнд не является числом, унарный плюс преобразует его в число.

Например:

```js run
// Не влияет на числа
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Преобразует не числа
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

На самом деле он делает то же самое, что и `Number(...)`, но короче.

Необходимость преобразования строк в числа возникает очень часто. Например, если мы получаем значения из полей формы HTML, они обычно являются строками.

Что если мы хотим их сложить?

Бинарный плюс добавил бы их в виде строк:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", бинарный плюс объединяет строки
```

Если мы хотим рассматривать их как числа, нам нужно преобразовать и затем сложить их:

```js run
let apples = "2";
let oranges = "3";

*!*
// оба значения преобразуются в числа перед бинарным плюсом
alert( +apples + +oranges ); // 5
*/!*

// более длинный вариант
// alert( Number(apples) + Number(oranges) ); // 5
```

С точки зрения математика, обилие плюсов может показаться странным. Но с точки зрения программиста, в этом нет ничего особенного: сначала применяются унарные плюсы, они преобразуют строки в числа, а затем их суммирует бинарный плюс.

Почему одинарные плюсы применяются к значениям перед двоичными? Как мы увидим, это из-за их *более высокого приоритета*.

## Приоритет оператора

Если выражение имеет более одного оператора, порядок выполнения определяется их *приоритетом* или, другими словами, неявным порядком приоритета операторов.

Из школы мы все знаем, что умножение в выражении `1 + 2 * 2` должно быть рассчитано до сложения. Это как раз вопрос приоритета. Умножение имеет *более высокий приоритет*, чем сложение.

Скобки переопределяют любой приоритет, поэтому, если мы не удовлетворены неявным порядком, мы можем использовать их для его изменения. Например: `(1 + 2) * 2`.

В JavaScript много операторов. Каждый оператор имеет соответствующий приоритет. Тот, у которого больше число, выполняется первым. Если приоритет тот же, порядок выполнения слева направо.

Вот выдержка из [таблицы приоритетов](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) (вам не нужно помнить это, но обратите внимание, что унарные операторы выше, чем соответствующие бинарные):

| Приоритет | Тип оператора | Знак |
|------------|------|------|
| ... | ... | ... |
| 16 | унарный плюс | `+` |
| 16 | унарный минус | `-` |
| 14 | умножение | `*` |
| 14 | деление | `/` |
| 13 | сложение | `+` |
| 13 | вычитание | `-` |
| ... | ... | ... |
| 3 | присваивание | `=` |
| ... | ... | ... |

Как мы видим, «унарный плюс» имеет приоритет `16`, который выше, чем `13` «сложение» (бинарный плюс). Вот почему в выражении `+apples + +oranges` одинарные плюсы работают до сложения.

## Присваивание

Отметим, что присваивание `=` также является оператором. Он указан в таблице приоритетов с очень низким приоритетом `3`.

Вот почему, когда мы присваиваем переменную, такую как `x = 2 * 2 + 1`, сначала выполняются вычисления, а затем вычисляется `=`, сохраняя результат в `x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

Возможно присваивание по цепочке:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Такое присваивание работает справа-налево. Сначала вычисляется самое правое выражение `2 + 2`, а затем присваивается переменным слева: `c`, `b` и `a`. В конце, все переменные имеют одно общее значение.

````smart header="Оператор присваивания `\"=\"` возвращает значение"

Оператор всегда возвращает значение. Это очевидно для большинства из них, таких как сложение `+` или умножение `*`. Но оператор присваивания также следует этому правилу.

Вызов `x = value` записывает `value` в `x` и возвращает его.

Вот демонстрация, которая использует присвоение как часть более сложного выражения:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

В приведенном выше примере результатом `(a = b + 1)` является значение, которое присваивается `a` (то есть `3`). Затем оно используется для вычитания из `3`.

Забавный код, не так ли? Мы должны понять, как это работает, потому что иногда мы видим это в сторонних библиотеках, но не должны писать ничего подобного сами. Такие трюки определенно не делают код более понятным или читабельным.
````

## Остаток %

Оператор остатка `%`, несмотря на его внешний вид, не связан с процентами.

Результатом `a % b` является остаток от целочисленного деления `a` на `b`.

Например:

```js run
alert( 5 % 2 ); // 1, остаток от деления 5 на 2
alert( 8 % 3 ); // 2, остаток от деления 8 на 3
alert( 6 % 3 ); // 0, остаток от деления 6 на 3
```

## Возведение в степень **

Оператор возведения в степень `**` является недавним дополнением к языку.

Для натурального числа `b` результат `a ** b` равен `a`, умноженное на себя `b` раз.

Например:

```js run
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
```

Оператор работает и для нецелых чисел.

Например:

```js run
alert( 4 ** (1/2) ); // 2 (степень 1/2 равна квадратному корню, это математика)
alert( 8 ** (1/3) ); // 2 (степень 1/3 равна кубическому корню)
```

## Инкремент/декремент

<!-- Can't use -- in title, because built-in parse turns it into – -->

Увеличение или уменьшение числа на единицу является одной из наиболее распространенных числовых операций.

Итак, для этого есть специальные операторы:

- **Инкремент** `++` увеличивает переменную на 1:

    ```js run no-beautify
    let counter = 2;
    counter++;      // работает так же, как counter = counter + 1, но короче
    alert( counter ); // 3
    ```
- **Декремент** `--` уменьшает переменную на 1:

    ```js run no-beautify
    let counter = 2;
    counter--;      // работает так же, как counter = counter - 1, но короче
    alert( counter ); // 1
    ```

```warn
Инкремент/декремент может применяться только к переменным. Попытка использовать его для значения типа "5++" приведет к ошибке.
```

The operators `++` and `--` can be placed either before or after a variable.

- When the operator goes after the variable, it is in "postfix form": `counter++`.
- The "prefix form" is when the operator goes before the variable: `++counter`.

Both of these statements do the same thing: increase `counter` by `1`.

Is there any difference? Yes, but we can only see it if we use the returned value of `++/--`.

Let's clarify. As we know, all operators return a value. Increment/decrement is no exception. The prefix form returns the new value while the postfix form returns the old value (prior to increment/decrement).

To see the difference, here's an example:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

In the line `(*)`, the *prefix* form `++counter` increments `counter` and returns the new value, `2`. So, the `alert` shows `2`.

Now, let's use the postfix form:

```js run
let counter = 1;
let a = counter++; // (*) changed ++counter to counter++

alert(a); // *!*1*/!*
```

In the line `(*)`, the *postfix* form `counter++` also increments `counter` but returns the *old* value (prior to increment). So, the `alert` shows `1`.

To summarize:

- If the result of increment/decrement is not used, there is no difference in which form to use:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, the lines above did the same
    ```
- If we'd like to increase a value *and* immediately use the result of the operator, we need the prefix form:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- If we'd like to increment a value but use its previous value, we need the postfix form:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Increment/decrement among other operators"
The operators `++/--` can be used inside expressions as well. Their precedence is higher than most other arithmetical operations.

For instance:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Compare with:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, because counter++ returns the "old" value
```

Though technically okay, such notation usually makes code less readable. One line does multiple things -- not good.

While reading code, a fast "vertical" eye-scan can easily miss something like `counter++` and it won't be obvious that the variable increased.

We advise a style of "one line -- one action":

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

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

These operators are used very rarely. To understand them, we need to delve into low-level number representation and it would not be optimal to do that right now, especially since we won't need them any time soon. If you're curious, you can read the [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) article on MDN. It would be more practical to do that when a real need arises.

## Modify-in-place

We often need to apply an operator to a variable and store the new result in that same variable.

For example:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

This notation can be shortened using the operators `+=` and `*=`:

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert( n ); // 14
```

Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.

Such operators have the same precedence as a normal assignment, so they run after most other calculations:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (right part evaluated first, same as n *= 8)
```

## Comma

The comma operator `,` is one of the rarest and most unusual operators. Sometimes, it's used to write shorter code, so we need to know it in order to understand what's going on.

The comma operator allows us to evaluate several expressions, dividing them with a comma `,`. Each of them is evaluated but only the result of the last one is returned.

For example:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (the result of 3 + 4)
```

Here, the first expression `1 + 2` is evaluated and its result is thrown away. Then, `3 + 4` is evaluated and returned as the result.

```smart header="Comma has a very low precedence"
Please note that the comma operator has very low precedence, lower than `=`, so parentheses are important in the example above.

Without them: `a = 1 + 2, 3 + 4` evaluates `+` first, summing the numbers into `a = 3, 7`, then the assignment operator `=` assigns    `a = 3`, and finally the number after the comma, `7`, is not processed so it's ignored.
```

Why do we need an operator that throws away everything except the last part?

Sometimes, people use it in more complex constructs to put several actions in one line.

For example:

```js
// three operations in one line
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Such tricks are used in many JavaScript frameworks. That's why we're mentioning them. But, usually, they don't improve code readability so we should think well before using them.
