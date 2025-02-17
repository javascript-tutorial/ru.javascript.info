<<<<<<< HEAD
# Конструкция "switch"

Конструкция `switch` заменяет собой сразу несколько `if`.

Она представляет собой более наглядный способ сравнить выражение сразу с несколькими вариантами.

## Синтаксис

Конструкция `switch` имеет один или более блок `case` и необязательный блок `default`.

Выглядит она так:
=======
# The "switch" statement

A `switch` statement can replace multiple `if` checks.

It gives a more descriptive way to compare a value with multiple variants.

## The syntax

The `switch` has one or more `case` blocks and an optional default.

It looks like this:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js no-beautify
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

<<<<<<< HEAD
- Переменная `x` проверяется на строгое равенство первому значению `value1`, затем второму `value2` и так далее.
- Если соответствие установлено – `switch` начинает выполняться от соответствующей директивы `case` и далее, до ближайшего `break` (или до конца `switch`).
- Если ни один `case` не совпал – выполняется (если есть) вариант `default`.

## Пример работы

Пример использования `switch` (сработавший код выделен):
=======
- The value of `x` is checked for a strict equality to the value from the first `case` (that is, `value1`) then to the second (`value2`) and so on.
- If the equality is found, `switch` starts to execute the code starting from the corresponding `case`, until the nearest `break` (or until the end of `switch`).
- If no case is matched then the `default` code is executed (if it exists).

## An example

An example of `switch` (the executed code is highlighted):
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let a = 2 + 2;

switch (a) {
  case 3:
<<<<<<< HEAD
    alert( 'Маловато' );
    break;
*!*
  case 4:
    alert( 'В точку!' );
    break;
*/!*
  case 5:
    alert( 'Перебор' );
    break;
  default:
    alert( "Нет таких значений" );
}
```

Здесь оператор `switch` последовательно сравнит `a` со всеми вариантами из `case`.

Сначала `3`, затем – так как нет совпадения – `4`. Совпадение найдено, будет выполнен этот вариант, со строки `alert( 'В точку!' )` и далее, до ближайшего `break`, который прервёт выполнение.

**Если `break` нет, то выполнение пойдёт ниже по следующим `case`, при этом остальные проверки игнорируются.**

Пример без `break`:
=======
    alert( 'Too small' );
    break;
*!*
  case 4:
    alert( 'Exactly!' );
    break;
*/!*
  case 5:
    alert( 'Too big' );
    break;
  default:
    alert( "I don't know such values" );
}
```

Here the `switch` starts to compare `a` from the first `case` variant that is `3`. The match fails.

Then `4`. That's a match, so the execution starts from `case 4` until the nearest `break`.

**If there is no `break` then the execution continues with the next `case` without any checks.**

An example without `break`:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let a = 2 + 2;

switch (a) {
  case 3:
<<<<<<< HEAD
    alert( 'Маловато' );
*!*
  case 4:
    alert( 'В точку!' );
  case 5:
    alert( 'Перебор' );
  default:
    alert( "Нет таких значений" );
=======
    alert( 'Too small' );
*!*
  case 4:
    alert( 'Exactly!' );
  case 5:
    alert( 'Too big' );
  default:
    alert( "I don't know such values" );
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
*/!*
}
```

<<<<<<< HEAD
В примере выше последовательно выполнятся три `alert`:

```js
alert( 'В точку!' );
alert( 'Перебор' );
alert( "Нет таких значений" );
```

````smart header="Любое выражение может быть аргументом для `switch/case`"
И `switch` и `case` допускают любое выражение в качестве аргумента.

Например:
=======
In the example above we'll see sequential execution of three `alert`s:

```js
alert( 'Exactly!' );
alert( 'Too big' );
alert( "I don't know such values" );
```

````smart header="Any expression can be a `switch/case` argument"
Both `switch` and `case` allow arbitrary expressions.

For example:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
<<<<<<< HEAD
    alert("Выполнится, т.к. значением +a будет 1, что в точности равно b+1");
=======
    alert("this runs, because +a is 1, exactly equals b+1");
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
    break;
*/!*

  default:
<<<<<<< HEAD
    alert("Это не выполнится");
}
```
В этом примере выражение `+a` вычисляется в `1`, что совпадает с выражением `b + 1` в `case`, и следовательно, код в этом блоке будет выполнен.
````

## Группировка "case"

Несколько вариантов `case`, использующих один код, можно группировать.

Для примера, выполним один и тот же код для `case 3` и `case 5`, сгруппировав их:
=======
    alert("this doesn't run");
}
```
Here `+a` gives `1`, that's compared with `b + 1` in `case`, and the corresponding code is executed.
````

## Grouping of "case"

Several variants of `case` which share the same code can be grouped.

For example, if we want the same code to run for `case 3` and `case 5`:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run no-beautify
let a = 3;

switch (a) {
  case 4:
<<<<<<< HEAD
    alert('Правильно!');
    break;

*!*
  case 3: // (*) группируем оба case
  case 5:
    alert('Неправильно!');
    alert("Может вам посетить урок математики?");
=======
    alert('Right!');
    break;

*!*
  case 3: // (*) grouped two cases
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
    break;
*/!*

  default:
<<<<<<< HEAD
    alert('Результат выглядит странновато. Честно.');
}
```

Теперь оба варианта `3` и `5` выводят одно сообщение.

Возможность группировать `case` – это побочный эффект того, как `switch/case` работает без `break`. Здесь выполнение `case 3` начинается со строки `(*)` и продолжается в `case 5`, потому что отсутствует `break`.

## Тип имеет значение

Нужно отметить, что проверка на равенство всегда строгая. Значения должны быть одного типа, чтобы выполнялось равенство.

Для примера, давайте рассмотрим следующий код:

```js run
let arg = prompt("Введите число?");
switch (arg) {
  case '0':
  case '1':
    alert( 'Один или ноль' );
    break;

  case '2':
    alert( 'Два' );
    break;

  case 3:
    alert( 'Никогда не выполнится!' );
    break;
  default:
    alert( 'Неизвестное значение' );
}
```

1. Для `'0'` и `'1'` выполнится первый `alert`.
2. Для `'2'` -- второй `alert`.
3. Но для `3`, результат выполнения `prompt` будет строка `"3"`, которая не соответствует строгому равенству `===` с числом `3`. Таким образом, мы имеем "мёртвый код" в `case 3`! Выполнится вариант `default`.
=======
    alert('The result is strange. Really.');
}
```

Now both `3` and `5` show the same message.

The ability to "group" cases is a side effect of how `switch/case` works without `break`. Here the execution of `case 3` starts from the line `(*)` and goes through `case 5`, because there's no `break`.

## Type matters

Let's emphasize that the equality check is always strict. The values must be of the same type to match.

For example, let's consider the code:

```js run
let arg = prompt("Enter a value?");
switch (arg) {
  case '0':
  case '1':
    alert( 'One or zero' );
    break;

  case '2':
    alert( 'Two' );
    break;

  case 3:
    alert( 'Never executes!' );
    break;
  default:
    alert( 'An unknown value' );
}
```

1. For `0`, `1`, the first `alert` runs.
2. For `2` the second `alert` runs.
3. But for `3`, the result of the `prompt` is a string `"3"`, which is not strictly equal `===` to the number `3`. So we've got a dead code in `case 3`! The `default` variant will execute.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
