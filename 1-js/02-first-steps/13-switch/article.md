# Конструкция "switch"

Конструкция `switch` заменяет собой сразу несколько `if`.

Она представляет собой более наглядный способ сравнить выражение сразу с несколькими вариантами.

## Синтаксис

Конструкция `switch` имеет один или более блок `case` и необязательный блок `default`.

Выглядит она так:

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

- Переменная `x` проверяется на строгое равенство первому значению `value1`, затем второму `value2` и так далее.
- Если соответствие установлено – `switch` начинает выполняться от соответствующей директивы `case` и далее, до ближайшего `break` (или до конца `switch`).
- Если ни один `case` не совпал – выполняется (если есть) вариант `default`.

## Пример работы

Пример использования `switch` (сработавший код выделен):

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
    break;
*!*
  case 4:
    alert( 'Exactly!' );
    break;
*/!*
  case 5:
    alert( 'Too large' );
    break;
  default:
    alert( "I don't know such values" );
}
```

Здесь оператор `switch` последовательно сравнит `a` со всеми вариантами из `case`.

Сначала `3`, затем – так как нет совпадения – `4`. Совпадение найдено, будет выполнен этот вариант, со строки `alert( 'Exactly!' )` и далее, до ближайшего `break`, который прервёт выполнение.

**Если `break` нет, то выполнение пойдёт ниже по следующим `case`, при этом остальные проверки игнорируются.**

Пример без `break`:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
*!*
  case 4:
    alert( 'Exactly!' );
  case 5:
    alert( 'Too big' );
  default:
    alert( "I don't know such values" );
*/!*
}
```

В примере выше последовательно выполнятся три `alert`:

```js
alert( 'Exactly!' );
alert( 'Too big' );
alert( "I don't know such values" );
```

````smart header="Любое выражение может быть `switch/case` аргументом"
Оба `switch` и `case` допускают любое выражение в качестве аргумента.

Например:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("this runs, because +a is 1, exactly equals b+1");
    break;
*/!*

  default:
    alert("this doesn't run");
}
```
В этом примере выражение `+a` вычисляется в `1`, что совпадает с выражением `b + 1` в `case`, и следовательно, код в этом блоке будет выполнен.
````

## Группировка "case"

Несколько вариантов `case`, использующих один код, можно группировать.

Для примера, выполним один и тот же код для `case 3` и `case 5`, сгруппировав их:

```js run no-beautify
let a = 2 + 2;

switch (a) {
  case 4:
    alert('Right!');
    break;

*!*
  case 3:                    // (*) группируем оба case
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
    break;
*/!*

  default:
    alert('The result is strange. Really.');
}
```

Теперь оба варианта `3` и `5` выводят одно сообщение.

Возможность группировать `case` это побочный эффект того, как `switch/case` работает без `break`. Здесь выполнение `case 3` начинается со строки `(*)` и продолжается в `case 5`, потому отсутствует `break`.

## Тип имеет значение

Нужно отметить, что проверка на равенство всегда строгая. Значения должны быть одного типа, чтобы выполнялось равенство.

Для примера, давайте рассмотрим следующий код:

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

1. Для `'0'` и `'1'` выполнится первый `alert`.
2. Для `'2'` -- второй `alert`.
3. Но для `3`, результатом `prompt` будет строка `"3"`, которая не соответствует строгому равенству `===` с числом `3`. Таким образом, мы имеем "мёртвый код" в `case 3`! Выполнится вариант `default`.
