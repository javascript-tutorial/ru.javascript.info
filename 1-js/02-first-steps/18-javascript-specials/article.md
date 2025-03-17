<<<<<<< HEAD
# Особенности JavaScript

Давайте кратко повторим изученный материал и отметим наиболее "тонкие" моменты.

## Структура кода

Инструкции разделяются точкой с запятой:

```js run no-beautify
alert('Привет'); alert('Мир');
```

Как правило, перевод строки также интерпретируется как разделитель, так тоже будет работать:

```js run no-beautify
alert('Привет')
alert('Мир')
```

Это так называемая "автоматическая вставка точки с запятой". Впрочем, она не всегда срабатывает, например:

```js run
alert("После этого сообщения ждите ошибку")
=======
# JavaScript specials

This chapter briefly recaps the features of JavaScript that we've learned by now, paying special attention to subtle moments.

## Code structure

Statements are delimited with a semicolon:

```js run no-beautify
alert('Hello'); alert('World');
```

Usually, a line-break is also treated as a delimiter, so that would also work:

```js run no-beautify
alert('Hello')
alert('World')
```

That's called "automatic semicolon insertion". Sometimes it doesn't work, for instance:

```js run
alert("There will be an error after this message")
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

[1, 2].forEach(alert)
```

<<<<<<< HEAD
Большинство руководств по стилю кода рекомендуют ставить точку с запятой после каждой инструкции.

Точка с запятой не требуется после блоков кода {...} и синтаксических конструкций с ними, таких как, например, циклы:

```js
function f() {
  // после объявления функции необязательно ставить точку с запятой
}

for(;;) {
  // после цикла точка с запятой также необязательна
}
```

...Впрочем, если даже мы и поставим "лишнюю" точку с запятой, ошибки не будет. Она просто будет проигнорирована.

Подробности: <info:structure>.

## Строгий режим

Чтобы по максимуму использовать возможности современного JavaScript, все скрипты рекомендуется начинать с добавления директивы `"use strict"`.
=======
Most codestyle guides agree that we should put a semicolon after each statement.

Semicolons are not required after code blocks `{...}` and syntax constructs with them like loops:

```js
function f() {
  // no semicolon needed after function declaration
}

for(;;) {
  // no semicolon needed after the loop
}
```

...But even if we can put an "extra" semicolon somewhere, that's not an error. It will be ignored.

More in: <info:structure>.

## Strict mode

To fully enable all features of modern JavaScript, we should start scripts with `"use strict"`.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
'use strict';

...
```

<<<<<<< HEAD
Эту директиву следует размещать в первой строке скрипта или в начале тела функции.

Без `"use strict"` код также запустится, но некоторые возможности будут работать в "режиме совместимости" со старыми версиями языка JavaScript. Нам же предпочтительнее современное поведение.

Некоторые конструкции языка (например, классы, которые нам ещё предстоит изучить) включают строгий режим по умолчанию.

Подробности: <info:strict-mode>.

## Переменные

Можно объявить при помощи:

- `let`
- `const` (константа, т.е. изменению не подлежит)
- `var` (устаревший способ, подробности позже)

Имя переменной может включать:
- Буквы и цифры, однако цифра не может быть первым символом.
- Символы `$` и `_` используются наряду с буквами.
- Иероглифы и символы нелатинского алфавита также допустимы, но обычно не используются.

Переменные типизируются динамически. В них могут храниться любые значения:

```js
let x = 5;
x = "Вася";
```

Всего существует 8 типов данных:

- `number` для целых и вещественных чисел,
- `bigint` для работы с целыми числами произвольной длины,
- `string` для строк,
- `boolean` для логических значений истинности или ложности: `true/false`,
- `null` – тип с единственным значением `null`, т.е. "пустое значение" или "значение не существует",
- `undefined` – тип с единственным значением `undefined`, т.е. "значение не задано",
- `object` и `symbol` – сложные структуры данных и уникальные идентификаторы; их мы ещё не изучили.

Оператор `typeof` возвращает тип значения переменной, с двумя исключениями:
```js
typeof null == "object" // ошибка в языке
typeof function(){} == "function" // именно для функций
```

Подробности: <info:variables>, <info:types>.

## Взаимодействие с посетителем

В качестве рабочей среды мы используем браузер, так что простейшими функциями взаимодействия с посетителем являются:

[`prompt(question, [default])`](https://developer.mozilla.org/ru/docs/Web/API/Window/prompt)
: Задаёт вопрос `question` и возвращает то, что ввёл посетитель, либо `null`, если посетитель нажал на кнопку "Отмена".

[`confirm(question)`](https://developer.mozilla.org/ru/docs/Web/API/Window/confirm)
: Задаёт вопрос `question` и предлагает выбрать "ОК" или "Отмена". Выбор возвращается в формате `true/false`.

[`alert(message)`](https://developer.mozilla.org/ru/docs/Web/API/Window/alert)
: Выводит сообщение `message`.

Все эти функции показывают *модальные окна*, они останавливают выполнение кода и не позволяют посетителю взаимодействовать со страницей, пока не будет дан ответ на вопрос.

Например:

```js run
let userName = prompt("Введите имя", "Алиса");
let isTeaWanted = confirm("Вы хотите чаю?");

alert( "Посетитель: " + userName ); // Алиса
alert( "Чай: " + isTeaWanted ); // true
```

Подробности: <info:alert-prompt-confirm>.

## Операторы

JavaScript поддерживает следующие операторы:

Арифметические
: Простые `* + - /`, а также деление по модулю `%` и возведение в степень `**`.

    Бинарный плюс `+` объединяет строки. А если одним из операндов является строка, то второй тоже будет конвертирован в строку:

    ```js run
    alert( '1' + 2 ); // '12', строка
    alert( 1 + '2' ); // '12', строка
    ```

Операторы присваивания
: Простые `a = b` и составные `a *= 2`.

Битовые операции
: Битовые операторы работают с 32-битными целыми числами на самом низком, побитовом уровне. Подробнее об их использовании можно прочитать на ресурсе [MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Expressions_and_Operators#битовые_(поразрядные)_операторы) и в разделе [Побитовые операторы](https://learn.javascript.ru/bitwise-operators).

Условный оператор
: Единственный оператор с тремя параметрами: `cond ? resultA : resultB`. Если условие `cond` истинно, возвращается `resultA`, иначе – `resultB`.

Логические операторы
: Логические И `&&`, ИЛИ `||` используют так называемое "ленивое вычисление" и возвращают значение, на котором оно остановилось (не обязательно `true` или `false`). Логическое НЕ `!` конвертирует операнд в логический тип и возвращает инвертированное значение.

Оператор нулевого слияния
: Оператор `??` предоставляет способ выбора определённого значения из списка переменных. Результатом `a ?? b` будет `a`, если только оно не равно `null/undefined`, тогда `b`.

Сравнение
: Проверка на равенство `==` значений разных типов конвертирует их в число (за исключением `null` и `undefined`, которые могут равняться только друг другу), так что примеры ниже равны:
=======
The directive must be at the top of a script or at the beginning of a function body.

Without `"use strict"`, everything still works, but some features behave in the old-fashioned, "compatible" way. We'd generally prefer the modern behavior.

Some modern features of the language (like classes that we'll study in the future) enable strict mode implicitly.

More in: <info:strict-mode>.

## Variables

Can be declared using:

- `let`
- `const` (constant, can't be changed)
- `var` (old-style, will see later)

A variable name can include:
- Letters and digits, but the first character may not be a digit.
- Characters `$` and `_` are normal, on par with letters.
- Non-Latin alphabets and hieroglyphs are also allowed, but commonly not used.

Variables are dynamically typed. They can store any value:

```js
let x = 5;
x = "John";
```

There are 8 data types:

- `number` for both floating-point and integer numbers,
- `bigint` for integer numbers of arbitrary length,
- `string` for strings,
- `boolean` for logical values: `true/false`,
- `null` -- a type with a single value `null`, meaning "empty" or "does not exist",
- `undefined` -- a type with a single value `undefined`, meaning "not assigned",
- `object` and `symbol` -- for complex data structures and unique identifiers, we haven't learnt them yet.

The `typeof` operator returns the type for a value, with two exceptions:
```js
typeof null == "object" // error in the language
typeof function(){} == "function" // functions are treated specially
```

More in: <info:variables> and <info:types>.

## Interaction

We're using a browser as a working environment, so basic UI functions will be:

[`prompt(question, [default])`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)
: Ask a `question`, and return either what the visitor entered or `null` if they clicked "cancel".

[`confirm(question)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)
: Ask a `question` and suggest to choose between Ok and Cancel. The choice is returned as `true/false`.

[`alert(message)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)
: Output a `message`.

All these functions are *modal*, they pause the code execution and prevent the visitor from interacting with the page until they answer.

For instance:

```js run
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert( "Visitor: " + userName ); // Alice
alert( "Tea wanted: " + isTeaWanted ); // true
```

More in: <info:alert-prompt-confirm>.

## Operators

JavaScript supports the following operators:

Arithmetical
: Regular: `* + - /`, also `%` for the remainder and `**` for power of a number.

    The binary plus `+` concatenates strings. And if any of the operands is a string, the other one is converted to string too:

    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

Assignments
: There is a simple assignment: `a = b` and combined ones like `a *= 2`.

Bitwise
: Bitwise operators work with 32-bit integers at the lowest, bit-level: see the [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) when they are needed.

Conditional
: The only operator with three parameters: `cond ? resultA : resultB`. If `cond` is truthy, returns `resultA`, otherwise `resultB`.

Logical operators
: Logical AND `&&` and OR `||` perform short-circuit evaluation and then return the value where it stopped (not necessary `true`/`false`). Logical NOT `!` converts the operand to boolean type and returns the inverse value.

Nullish coalescing operator
: The `??` operator provides a way to choose a defined value from a list of variables. The result of `a ?? b` is `a` unless it's `null/undefined`, then `b`.

Comparisons
: Equality check `==` for values of different types converts them to a number (except `null` and `undefined` that equal each other and nothing else), so these are equal:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

<<<<<<< HEAD
    Другие операторы сравнения тоже конвертируют значения разных типов в числовой тип.

    Оператор строгого равенства `===` не выполняет конвертирования: разные типы для него всегда означают разные значения.

    Значения `null` и `undefined` особенные: они равны `==` только друг другу, но не равны ничему ещё.

    Операторы сравнения больше/меньше сравнивают строки посимвольно, остальные типы конвертируются в число.

Другие операторы
: Существуют и другие операторы, такие как запятая.

Подробности: <info:operators>, <info:comparison>, <info:logical-operators>, <info:nullish-operators>.

## Циклы

- Мы изучили три вида циклов:
=======
    Other comparisons convert to a number as well.

    The strict equality operator `===` doesn't do the conversion: different types always mean different values for it.

    Values `null` and `undefined` are special: they equal `==` each other and don't equal anything else.

    Greater/less comparisons compare strings character-by-character, other types are converted to a number.

Other operators
: There are few others, like a comma operator.

More in: <info:operators>, <info:comparison>, <info:logical-operators>, <info:nullish-coalescing-operator>.

## Loops

- We covered 3 types of loops:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

    ```js
    // 1
    while (condition) {
      ...
    }

    // 2
    do {
      ...
    } while (condition);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

<<<<<<< HEAD
- Переменная, объявленная в цикле `for(let...)`, видна только внутри цикла. Но мы также можем опустить `let` и переиспользовать существующую переменную.
- Директивы `break/continue` позволяют выйти из цикла/текущей итерации. Используйте метки для выхода из вложенных циклов.

Подробности: <info:while-for>.

Позже мы изучим ещё виды циклов для работы с объектами.

## Конструкция "switch"

Конструкция "switch" может заменить несколько проверок `if`. При сравнении она использует оператор строгого равенства `===`.

Например:

```js run
let age = prompt('Сколько вам лет?', 18);

switch (age) {
  case 18:
    alert("Так не сработает"); // результатом prompt является строка, а не число

  case "18":
    alert("А так сработает!");
    break;

  default:
    alert("Любое значение, неравное значению выше");
}
```

Подробности: <info:switch>.

## Функции

Мы рассмотрели три способа создания функции в JavaScript:

1. Function Declaration: функция в основном потоке кода
=======
- The variable declared in `for(let...)` loop is visible only inside the loop. But we can also omit `let` and reuse an existing variable.
- Directives `break/continue` allow to exit the whole loop/current iteration. Use labels to break nested loops.

Details in: <info:while-for>.

Later we'll study more types of loops to deal with objects.

## The "switch" construct

The "switch" construct can replace multiple `if` checks. It uses `===` (strict equality) for comparisons.

For instance:

```js run
let age = prompt('Your age?', 18);

switch (age) {
  case 18:
    alert("Won't work"); // the result of prompt is a string, not a number
    break;

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}
```

Details in: <info:switch>.

## Functions

We covered three ways to create a function in JavaScript:

1. Function Declaration: the function in the main code flow
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

<<<<<<< HEAD
2. Function Expression: функция как часть выражения
=======
2. Function Expression: the function in the context of an expression
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    };
    ```

<<<<<<< HEAD
3. Стрелочные функции:

    ```js
    // выражение в правой части
    let sum = (a, b) => a + b;

    // многострочный код в фигурных скобках { ... }, здесь нужен return:
=======
3. Arrow functions:

    ```js
    // expression on the right side
    let sum = (a, b) => a + b;

    // or multi-line syntax with { ... }, need return here:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
    let sum = (a, b) => {
      // ...
      return a + b;
    }

<<<<<<< HEAD
    // без аргументов
    let sayHi = () => alert("Привет");

    // с одним аргументом
=======
    // without arguments
    let sayHi = () => alert("Hello");

    // with a single argument
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
    let double = n => n * 2;
    ```


<<<<<<< HEAD
- У функций могут быть локальные переменные: т.е. объявленные в теле функции. Такие переменные видимы только внутри функции.
- У параметров могут быть значения по умолчанию: `function sum(a = 1, b = 2) {...}`.
- Функции всегда что-нибудь возвращают. Если нет оператора `return`, результатом будет `undefined`.

Подробности: <info:function-basics>, <info:arrow-functions-basics>.

## Далее мы изучим больше

Это был краткий список возможностей JavaScript. На данный момент мы изучили только основы. Далее в учебнике вы найдёте больше особенностей и продвинутых возможностей JavaScript.
=======
- Functions may have local variables: those declared inside its body or its parameter list. Such variables are only visible inside the function.
- Parameters can have default values: `function sum(a = 1, b = 2) {...}`.
- Functions always return something. If there's no `return` statement, then the result is `undefined`.

Details: see <info:function-basics>, <info:arrow-functions-basics>.

## More to come

That was a brief list of JavaScript features. As of now we've studied only basics. Further in the tutorial you'll find more specials and advanced features of JavaScript.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
