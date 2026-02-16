<<<<<<< HEAD
# Циклы while и for

При написании скриптов зачастую встаёт задача сделать однотипное действие много раз.

Например, вывести товары из списка один за другим. Или просто перебрать все числа от `1` до `10` и для каждого выполнить одинаковый код.

Для многократного повторения одного участка кода предусмотрены *циклы*.

```smart header="Циклы for..of и for..in"
Небольшое объявление для продвинутых читателей.

В этой статье рассматриваются только базовые циклы: `while`, `do..while` и `for(..;..;..)`.

Если вы пришли к этой статье в поисках других типов циклов, вот указатели:

- См. [for..in](info:object#forin) для перебора свойств объекта.
- См. [for..of](info:array#perebor-elementov) и [Перебираемые объекты](info:iterable) для перебора массивов и перебираемых объектов.

В противном случае, продолжайте читать.
```

## Цикл "while"

Цикл `while` имеет следующий синтаксис:

```js
while (condition) {
  // код
  // также называемый "телом цикла"
}
```

Код из тела цикла выполняется, пока условие `condition` истинно.

Например, цикл ниже выводит `i`, пока `i < 3`:

```js run
let i = 0;
while (i < 3) { // выводит 0, затем 1, затем 2
=======
# Loops: while and for

We often need to repeat actions.

For example, outputting goods from a list one after another or just running the same code for each number from 1 to 10.

*Loops* are a way to repeat the same code multiple times.

```smart header="The for..of and for..in loops"
A small announcement for advanced readers.

This article covers only basic loops: `while`, `do..while` and `for(..;..;..)`.

If you came to this article searching for other types of loops, here are the pointers:

- See [for..in](info:object#forin) to loop over object properties.
- See [for..of](info:array#loops) and [iterables](info:iterable) for looping over arrays and iterable objects.

Otherwise, please read on.
```

## The "while" loop

The `while` loop has the following syntax:

```js
while (condition) {
  // code
  // so-called "loop body"
}
```

While the `condition` is truthy, the `code` from the loop body is executed.

For instance, the loop below outputs `i` while `i < 3`:

```js run
let i = 0;
while (i < 3) { // shows 0, then 1, then 2
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
  alert( i );
  i++;
}
```

<<<<<<< HEAD
Одно выполнение тела цикла по-научному называется *итерация*. Цикл в примере выше совершает три итерации.

Если бы строка `i++` отсутствовала в примере выше, то цикл бы повторялся (в теории) вечно. На практике, конечно, браузер не позволит такому случиться, он предоставит пользователю возможность остановить "подвисший" скрипт, а JavaScript на стороне сервера придётся "убить" процесс.

Любое выражение или переменная может быть условием цикла, а не только сравнение: условие `while` вычисляется и преобразуется в логическое значение.

Например, `while (i)` -- более краткий вариант `while (i != 0)`:
=======
A single execution of the loop body is called *an iteration*. The loop in the example above makes three iterations.

If `i++` was missing from the example above, the loop would repeat (in theory) forever. In practice, the browser provides ways to stop such loops, and in server-side JavaScript, we can kill the process.

Any expression or variable can be a loop condition, not just comparisons: the condition is evaluated and converted to a boolean by `while`.

For instance, a shorter way to write `while (i != 0)` is `while (i)`:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js run
let i = 3;
*!*
<<<<<<< HEAD
while (i) { // когда i будет равно 0, условие станет ложным, и цикл остановится
=======
while (i) { // when i becomes 0, the condition becomes falsy, and the loop stops
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
*/!*
  alert( i );
  i--;
}
```

<<<<<<< HEAD
````smart header="Фигурные скобки не требуются для тела цикла из одной строки"
Если тело цикла состоит лишь из одной инструкции, мы можем опустить фигурные скобки `{…}`:
=======
````smart header="Curly braces are not required for a single-line body"
If the loop body has a single statement, we can omit the curly braces `{…}`:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

<<<<<<< HEAD
## Цикл "do…while"

Проверку условия можно разместить под телом цикла, используя специальный синтаксис `do..while`:

```js
do {
  // тело цикла
} while (condition);
```

Цикл сначала выполнит тело, а затем проверит условие `condition`, и пока его значение равно `true`, он будет выполняться снова и снова.

Например:
=======
## The "do..while" loop

The condition check can be moved *below* the loop body using the `do..while` syntax:

```js
do {
  // loop body
} while (condition);
```

The loop will first execute the body, then check the condition, and, while it's truthy, execute it again and again.

For example:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

<<<<<<< HEAD
Такая форма синтаксиса оправдана, если вы хотите, чтобы тело цикла выполнилось **хотя бы один раз**, даже если условие окажется ложным. На практике чаще используется форма с предусловием: `while(…) {…}`.

## Цикл "for"

Более сложный, но при этом самый распространённый цикл — цикл `for`.

Выглядит он так:

```js
for (начало; условие; шаг) {
  // ... тело цикла ...
}
```

Давайте разберёмся, что означает каждая часть, на примере. Цикл ниже выполняет `alert(i)` для `i` от `0` до (но не включая) `3`:

```js run
for (let i = 0; i < 3; i++) { // выведет 0, затем 1, затем 2
=======
This form of syntax should only be used when you want the body of the loop to execute **at least once** regardless of the condition being truthy. Usually, the other form is preferred: `while(…) {…}`.

## The "for" loop

The `for` loop is more complex, but it's also the most commonly used loop.

It looks like this:

```js
for (begin; condition; step) {
  // ... loop body ...
}
```

Let's learn the meaning of these parts by example. The loop below runs `alert(i)` for `i` from `0` up to (but not including) `3`:

```js run
for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
  alert(i);
}
```

<<<<<<< HEAD
Рассмотрим конструкцию `for` подробней:

| часть  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| начало | `let i = 0`    | Выполняется один раз при входе в цикл                                      |
| условие | `i < 3`| Проверяется *перед* каждой итерацией цикла.<br>Если оно вычислится в `false`, цикл остановится.              |
| тело | `alert(i)`      | Выполняется снова и снова, пока условие вычисляется в `true`. |
| шаг | `i++`| Выполняется *после* тела цикла на каждой итерации *перед* проверкой условия.                         |

В целом, алгоритм работы цикла выглядит следующим образом:

```
Выполнить начало
→ (Если условие == true → Выполнить тело, Выполнить шаг)
→ (Если условие == true → Выполнить тело, Выполнить шаг)
→ (Если условие == true → Выполнить тело, Выполнить шаг)
→ ...
```

То есть, `начало` выполняется один раз, а затем каждая итерация заключается в проверке `условия`, после которой выполняется `тело` и `шаг`.

Если тема циклов для вас нова, может быть полезным вернуться к примеру выше и воспроизвести его работу на листе бумаги, шаг за шагом.

Вот в точности то, что происходит в нашем случае:
=======
Let's examine the `for` statement part-by-part:

| part  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| begin | `let i = 0`    | Executes once upon entering the loop.                                      |
| condition | `i < 3`| Checked before every loop iteration. If false, the loop stops.              |
| body | `alert(i)`| Runs again and again while the condition is truthy.                         |
| step| `i++`      | Executes after the body on each iteration. |

The general loop algorithm works like this:

```
Run begin
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ ...
```

That is, `begin` executes once, and then it iterates: after each `condition` test, `body` and `step` are executed.

If you are new to loops, it could help to go back to the example and reproduce how it runs step-by-step on a piece of paper.

Here's exactly what happens in our case:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js
// for (let i = 0; i < 3; i++) alert(i)

<<<<<<< HEAD
// Выполнить начало
let i = 0;
// Если условие == true → Выполнить тело, Выполнить шаг
if (i < 3) { alert(i); i++ }
// Если условие == true → Выполнить тело, Выполнить шаг
if (i < 3) { alert(i); i++ }
// Если условие == true → Выполнить тело, Выполнить шаг
if (i < 3) { alert(i); i++ }
// ...конец, потому что теперь i == 3
```

````smart header="Встроенное объявление переменной"
В примере переменная счётчика `i` была объявлена прямо в цикле. Это так называемое "встроенное" объявление переменной. Такие переменные существуют только внутри цикла.
=======
// run begin
let i = 0
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// ...finish, because now i == 3
```

````smart header="Inline variable declaration"
Here, the "counter" variable `i` is declared right in the loop. This is called an "inline" variable declaration. Such variables are visible only inside the loop.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
<<<<<<< HEAD
alert(i); // ошибка, нет такой переменной
```

Вместо объявления новой переменной мы можем использовать уже существующую:
=======
alert(i); // error, no such variable
```

Instead of defining a variable, we could use an existing one:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js run
let i = 0;

<<<<<<< HEAD
for (i = 0; i < 3; i++) { // используем существующую переменную
  alert(i); // 0, 1, 2
}

alert(i); // 3, переменная доступна, т.к. была объявлена снаружи цикла
```
````

### Пропуск частей "for"

Любая часть `for` может быть пропущена.

Для примера, мы можем пропустить `начало` если нам ничего не нужно делать перед стартом цикла.

Вот так:

```js run
let i = 0; // мы уже имеем объявленную i с присвоенным значением

for (; i < 3; i++) { // нет необходимости в "начале"
=======
for (i = 0; i < 3; i++) { // use an existing variable
  alert(i); // 0, 1, 2
}

alert(i); // 3, visible, because declared outside of the loop
```
````

### Skipping parts

Any part of `for` can be skipped.

For example, we can omit `begin` if we don't need to do anything at the loop start.

Like here:

```js run
let i = 0; // we have i already declared and assigned

for (; i < 3; i++) { // no need for "begin"
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
  alert( i ); // 0, 1, 2
}
```

<<<<<<< HEAD
Можно убрать и `шаг`:
=======
We can also remove the `step` part:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

<<<<<<< HEAD
Это сделает цикл аналогичным `while (i < 3)`.

А можно и вообще убрать всё, получив бесконечный цикл:

```js
for (;;) {
  // будет выполняться вечно
}
```

При этом сами точки с запятой `;` обязательно должны присутствовать, иначе будет ошибка синтаксиса.

## Прерывание цикла: "break"

Обычно цикл завершается при вычислении *условия* в `false`.

Но мы можем выйти из цикла в любой момент с помощью специальной директивы `break`.

Например, следующий код подсчитывает сумму вводимых чисел до тех пор, пока посетитель их вводит, а затем – выдаёт:
=======
This makes the loop identical to `while (i < 3)`.

We can actually remove everything, creating an infinite loop:

```js
for (;;) {
  // repeats without limits
}
```

Please note that the two `for` semicolons `;` must be present. Otherwise, there would be a syntax error.

## Breaking the loop

Normally, a loop exits when its condition becomes falsy.

But we can force the exit at any time using the special `break` directive.

For example, the loop below asks the user for a series of numbers, "breaking" when no number is entered:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js run
let sum = 0;

while (true) {

<<<<<<< HEAD
  let value = +prompt("Введите число", '');
=======
  let value = +prompt("Enter a number", '');
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
<<<<<<< HEAD
alert( 'Сумма: ' + sum );
```

Директива `break` в строке `(*)` полностью прекращает выполнение цикла и передаёт управление на строку за его телом, то есть на `alert`.

Вообще, сочетание «бесконечный цикл + `break`» – отличная штука для тех ситуаций, когда условие, по которому нужно прерваться, находится не в начале или конце цикла, а посередине или даже в нескольких местах его тела.

## Переход к следующей итерации: continue [#continue]

Директива `continue` -- "облегчённая версия" `break`. При её выполнении цикл не прерывается, а переходит к следующей итерации (если условие все ещё равно `true`).

Её используют, если понятно, что на текущем повторе цикла делать больше нечего.

Например, цикл ниже использует `continue`, чтобы выводить только нечётные значения:
=======
alert( 'Sum: ' + sum );
```

The `break` directive is activated at the line `(*)` if the user enters an empty line or cancels the input. It stops the loop immediately, passing control to the first line after the loop. Namely, `alert`.

The combination "infinite loop + `break` as needed" is great for situations when a loop's condition must be checked not in the beginning or end of the loop, but in the middle or even in several places of its body.

## Continue to the next iteration [#continue]

The `continue` directive is a "lighter version" of `break`. It doesn't stop the whole loop. Instead, it stops the current iteration and forces the loop to start a new one (if the condition allows).

We can use it if we're done with the current iteration and would like to move on to the next one.

The loop below uses `continue` to output only odd values:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js run no-beautify
for (let i = 0; i < 10; i++) {

<<<<<<< HEAD
  // если true, пропустить оставшуюся часть тела цикла
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, затем 3, 5, 7, 9
}
```

Для чётных значений `i`, директива `continue` прекращает выполнение тела цикла и передаёт управление на следующую итерацию `for` (со следующим числом). Таким образом `alert` вызывается только для нечётных значений.

````smart header="Директива `continue` позволяет избегать вложенности"
Цикл, который обрабатывает только нечётные значения, мог бы выглядеть так:
=======
  // if true, skip the remaining part of the body
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, then 3, 5, 7, 9
}
```

For even values of `i`, the `continue` directive stops executing the body and passes control to the next iteration of `for` (with the next number). So the `alert` is only called for odd values.

````smart header="The `continue` directive helps decrease nesting"
A loop that shows odd values could look like this:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

<<<<<<< HEAD
С технической точки зрения он полностью идентичен. Действительно, вместо `continue` можно просто завернуть действия в блок `if`.

Однако мы получили дополнительный уровень вложенности фигурных скобок. Если код внутри `if` более длинный, то это ухудшает читаемость, в отличие от варианта с `continue`.
````

````warn header="Нельзя использовать `break/continue` справа от оператора '?'"
Обратите внимание, что эти синтаксические конструкции не являются выражениями и не могут быть использованы с тернарным оператором `?`. В частности, использование таких директив, как `break/continue`, вызовет ошибку.

Например, если мы возьмём этот код:
=======
From a technical point of view, this is identical to the example above. Surely, we can just wrap the code in an `if` block instead of using `continue`.

But as a side effect, this created one more level of nesting (the `alert` call inside the curly braces). If the code inside of `if` is longer than a few lines, that may decrease the overall readability.
````

````warn header="No `break/continue` to the right side of '?'"
Please note that syntax constructs that are not expressions cannot be used with the ternary operator `?`. In particular, directives such as `break/continue` aren't allowed there.

For example, if we take this code:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

<<<<<<< HEAD
...и перепишем его, используя вопросительный знак:

```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue здесь приведёт к ошибке
```

...то будет синтаксическая ошибка.

Это ещё один повод не использовать оператор вопросительного знака `?` вместо `if`.
````

## Метки для break/continue

Бывает, нужно выйти одновременно из нескольких уровней цикла сразу.

Например, в коде ниже мы проходимся циклами по `i` и `j`, запрашивая с помощью `prompt` координаты `(i, j)` с `(0,0)` до `(2,2)`:
=======
...and rewrite it using a question mark:

```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue isn't allowed here
```

...it stops working: there's a syntax error.

This is just another reason not to use the question mark operator `?` instead of `if`.
````

## Labels for break/continue

Sometimes we need to break out from multiple nested loops at once.

For example, in the code below we loop over `i` and `j`, prompting for the coordinates `(i, j)` from `(0,0)` to `(2,2)`:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

<<<<<<< HEAD
    let input = prompt(`Значение на координатах (${i},${j})`, '');

    // Что если мы захотим перейти к Готово (ниже) прямо отсюда?
  }
}

alert('Готово!');
```

Нам нужен способ остановить выполнение, если пользователь отменит ввод.

Обычный `break` после `input` лишь прервёт внутренний цикл, но этого недостаточно. Достичь желаемого поведения можно с помощью меток.

*Метка* имеет вид идентификатора с двоеточием перед циклом:
=======
    let input = prompt(`Value at coords (${i},${j})`, '');

    // what if we want to exit from here to Done (below)?
  }
}

alert('Done!');
```

We need a way to stop the process if the user cancels the input.

The ordinary `break` after `input` would only break the inner loop. That's not sufficient -- labels, come to the rescue!

A *label* is an identifier with a colon before a loop:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js
labelName: for (...) {
  ...
}
```

<<<<<<< HEAD
Вызов `break <labelName>` в цикле ниже ищет ближайший внешний цикл с такой меткой и переходит в его конец.
=======
The `break <labelName>` statement in the loop below breaks out to the label:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

<<<<<<< HEAD
    let input = prompt(`Значение на координатах (${i},${j})`, '');

    // если пустая строка или Отмена, то выйти из обоих циклов
    if (!input) *!*break outer*/!*; // (*)

    // сделать что-нибудь со значениями...
  }
}

alert('Готово!');
```

В примере выше это означает, что вызовом `break outer` будет разорван внешний цикл до метки с именем `outer`.

Таким образом управление перейдёт со строки, помеченной `(*)`, к `alert('Готово!')`.

Можно размещать метку на отдельной строке:
=======
    let input = prompt(`Value at coords (${i},${j})`, '');

    // if an empty string or canceled, then break out of both loops
    if (!input) *!*break outer*/!*; // (*)

    // do something with the value...
  }
}

alert('Done!');
```

In the code above, `break outer` looks upwards for the label named `outer` and breaks out of that loop.

So the control goes straight from `(*)` to `alert('Done!')`.

We can also move the label onto a separate line:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

<<<<<<< HEAD
Директива `continue` также может быть использована с меткой. В этом случае управление перейдёт на следующую итерацию цикла с меткой.

````warn header="Метки не позволяют \"прыгнуть\" куда угодно"
Метки не дают возможности передавать управление в произвольное место кода.

Например, нет возможности сделать следующее:

```js
break label; // не прыгает к метке ниже
=======
The `continue` directive can also be used with a label. In this case, code execution jumps to the next iteration of the labeled loop.

````warn header="Labels do not allow to \"jump\" anywhere"
Labels do not allow us to jump into an arbitrary place in the code.

For example, it is impossible to do this:

```js
break label; // jump to the label below (doesn't work)
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

label: for (...)
```

<<<<<<< HEAD
Директива `break` должна находиться внутри блока кода. Технически, подойдет любой маркированный блок кода, например:
=======
A `break` directive must be inside a code block. Technically, any labelled code block will do, e.g.:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js
label: {
  // ...
<<<<<<< HEAD
  break label; // работает
=======
  break label; // works
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
  // ...
}
```

<<<<<<< HEAD
...Хотя в 99.9% случаев `break` используется внутри циклов, как мы видели в примерах выше.

К слову, `continue` возможно только внутри цикла.
````

## Итого

Мы рассмотрели 3 вида циклов:

- `while` -- Проверяет условие перед каждой итерацией.
- `do..while` -- Проверяет условие после каждой итерации.
- `for (;;)` -- Проверяет условие перед каждой итерацией, есть возможность задать дополнительные настройки.

Чтобы организовать бесконечный цикл, используют конструкцию `while (true)`. При этом он, как и любой другой цикл, может быть прерван директивой `break`.

Если на данной итерации цикла делать больше ничего не надо, но полностью прекращать цикл не следует – используют директиву `continue`.

Обе этих директивы поддерживают *метки*, которые ставятся перед циклом. Метки – единственный способ для `break/continue` выйти за пределы текущего цикла, повлиять на выполнение внешнего.

Заметим, что метки не позволяют прыгнуть в произвольное место кода, в JavaScript нет такой возможности.
=======
...Although, 99.9% of the time `break` is used inside loops, as we've seen in the examples above.

A `continue` is only possible from inside a loop.
````

## Summary

We covered 3 types of loops:

- `while` -- The condition is checked before each iteration.
- `do..while` -- The condition is checked after each iteration.
- `for (;;)` -- The condition is checked before each iteration, additional settings available.

To make an "infinite" loop, usually the `while(true)` construct is used. Such a loop, just like any other, can be stopped with the `break` directive.

If we don't want to do anything in the current iteration and would like to forward to the next one, we can use the `continue` directive.

`break/continue` support labels before the loop. A label is the only way for `break/continue` to escape a nested loop to go to an outer one.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
