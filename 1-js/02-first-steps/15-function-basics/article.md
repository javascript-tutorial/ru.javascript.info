<<<<<<< HEAD
# Функции

Зачастую нам надо повторять одно и то же действие во многих частях программы.

Например, необходимо красиво вывести сообщение при приветствии посетителя, при выходе посетителя с сайта, ещё где-нибудь.

Чтобы не повторять один и тот же код во многих местах, придуманы функции. Функции являются основными «строительными блоками» программы.

Примеры встроенных функций вы уже видели – это `alert(message)`, `prompt(message, default)` и `confirm(question)`. Но можно создавать и свои.

## Объявление функции

Для создания функций мы можем использовать *объявление функции*.

Пример объявления функции:

```js
function showMessage() {
  alert( 'Всем привет!' );
}
```

Вначале идёт ключевое слово `function`, после него *имя функции*, затем список *параметров* в круглых скобках через запятую (в вышеприведённом примере он пустой) и, наконец, код функции, также называемый "телом функции", внутри фигурных скобок.

```js
function имя(параметры) {
  ...тело...
}
```

Наша новая функция может быть вызвана по своему имени: `showMessage()`.

Например:

```js run
function showMessage() {
  alert( 'Всем привет!' );
=======
# Functions

Quite often we need to perform a similar action in many places of the script.

For example, we need to show a nice-looking message when a visitor logs in, logs out and maybe somewhere else.

Functions are the main "building blocks" of the program. They allow the code to be called many times without repetition.

We've already seen examples of built-in functions, like `alert(message)`, `prompt(message, default)` and `confirm(question)`. But we can create functions of our own as well.

## Function Declaration

To create a function we can use a *function declaration*.

It looks like this:

```js
function showMessage() {
  alert( 'Hello everyone!' );
}
```

The `function` keyword goes first, then goes the *name of the function*, then a list of *parameters* between the parentheses (comma-separated, empty in the example above, we'll see examples later) and finally the code of the function, also named "the function body", between curly braces.

```js
function name(parameter1, parameter2, ... parameterN) {
 // body
}
```

Our new function can be called by its name: `showMessage()`.

For instance:

```js run
function showMessage() {
  alert( 'Hello everyone!' );
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
}

*!*
showMessage();
showMessage();
*/!*
```

<<<<<<< HEAD
Вызов `showMessage()` выполняет код функции. Здесь мы увидим сообщение дважды.

Этот пример явно демонстрирует одно из главных предназначений функций: избавление от дублирования кода.

Если понадобится поменять сообщение или способ его вывода – достаточно изменить его в одном месте: в функции, которая его выводит.

## Локальные переменные

Переменные, объявленные внутри функции, видны только внутри этой функции.

Например:
=======
The call `showMessage()` executes the code of the function. Here we will see the message two times.

This example clearly demonstrates one of the main purposes of functions: to avoid code duplication.

If we ever need to change the message or the way it is shown, it's enough to modify the code in one place: the function which outputs it.

## Local variables

A variable declared inside a function is only visible inside that function.

For example:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
function showMessage() {
*!*
<<<<<<< HEAD
  let message = "Привет, я JavaScript!"; // локальная переменная
=======
  let message = "Hello, I'm JavaScript!"; // local variable
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
*/!*

  alert( message );
}

<<<<<<< HEAD
showMessage(); // Привет, я JavaScript!

alert( message ); // <-- будет ошибка, т.к. переменная видна только внутри функции
```

## Внешние переменные

У функции есть доступ к внешним переменным, например:

```js run no-beautify
let *!*userName*/!* = 'Вася';

function showMessage() {
  let message = 'Привет, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Привет, Вася
```

Функция обладает полным доступом к внешним переменным и может изменять их значение.

Например:

```js run
let *!*userName*/!* = 'Вася';

function showMessage() {
  *!*userName*/!* = "Петя"; // (1) изменяем значение внешней переменной

  let message = 'Привет, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*Вася*/!* перед вызовом функции

showMessage();

alert( userName ); // *!*Петя*/!*, значение внешней переменной было изменено функцией
```

Внешняя переменная используется, только если внутри функции нет такой локальной.

Если одноимённая переменная объявляется внутри функции, тогда она перекрывает внешнюю. Например, в коде ниже функция использует локальную переменную `userName`. Внешняя будет проигнорирована:

```js run
let userName = 'Вася';

function showMessage() {
*!*
  let userName = "Петя"; // объявляем локальную переменную
*/!*

  let message = 'Привет, ' + userName; // *!*Петя*/!*
  alert(message);
}

// функция создаст и будет использовать свою собственную локальную переменную userName
showMessage();

alert( userName ); // *!*Вася*/!*, не изменилась, функция не трогала внешнюю переменную
```

```smart header="Глобальные переменные"
Переменные, объявленные снаружи всех функций, такие как внешняя переменная `userName` в вышеприведённом коде -- называются *глобальными*.

*Глобальные переменные* видимы для любой функции (если только их не перекрывают одноимённые локальные переменные).

Желательно сводить использование глобальных переменных к минимуму. В современном коде обычно мало или совсем нет глобальных переменных. Хотя они иногда полезны для хранения важнейших "общепроектовых" данных.
```

## Параметры

Мы можем передать внутрь функции любую информацию, используя параметры.

В нижеприведённом примере функции передаются два параметра: `from` и `text`.

```js run
function showMessage(*!*from, text*/!*) { // параметры: from, text
  alert(from + ': ' + text);
}

*!*
showMessage('Аня', 'Привет!'); // Аня: Привет! (*)
showMessage('Аня', "Как дела?"); // Аня: Как дела? (**)
*/!*
```

Когда функция вызывается в строках `(*)` и `(**)`, переданные значения копируются в локальные переменные `from` и `text`. Затем они используются в теле функции.

Вот ещё один пример: у нас есть переменная `from`, и мы передаём её функции. Обратите внимание: функция изменяет значение `from`, но это изменение не видно снаружи. Функция всегда получает только копию значения:

=======
showMessage(); // Hello, I'm JavaScript!

alert( message ); // <-- Error! The variable is local to the function
```

## Outer variables

A function can access an outer variable as well, for example:

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hello, John
```

The function has full access to the outer variable. It can modify it as well.

For instance:

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) changed the outer variable

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* before the function call

showMessage();

alert( userName ); // *!*Bob*/!*, the value was modified by the function
```

The outer variable is only used if there's no local one.

If a same-named variable is declared inside the function then it *shadows* the outer one. For instance, in the code below the function uses the local `userName`. The outer one is ignored:

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // declare a local variable
*/!*

  let message = 'Hello, ' + userName; // *!*Bob*/!*
  alert(message);
}

// the function will create and use its own userName
showMessage();

alert( userName ); // *!*John*/!*, unchanged, the function did not access the outer variable
```

```smart header="Global variables"
Variables declared outside of any function, such as the outer `userName` in the code above, are called *global*.

Global variables are visible from any function (unless shadowed by locals).

It's a good practice to minimize the use of global variables. Modern code has few or no globals. Most variables reside in their functions. Sometimes though, they can be useful to store project-level data.
```

## Parameters

We can pass arbitrary data to functions using parameters.

In the example below, the function has two parameters: `from` and `text`.

```js run
function showMessage(*!*from, text*/!*) { // parameters: from, text
  alert(from + ': ' + text);
}

*!*showMessage('Ann', 'Hello!');*/!* // Ann: Hello! (*)
*!*showMessage('Ann', "What's up?");*/!* // Ann: What's up? (**)
```

When the function is called in lines `(*)` and `(**)`, the given values are copied to local variables `from` and `text`. Then the function uses them.

Here's one more example: we have a variable `from` and pass it to the function. Please note: the function changes `from`, but the change is not seen outside, because a function always gets a copy of the value:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
function showMessage(from, text) {

*!*
<<<<<<< HEAD
  from = '*' + from + '*'; // немного украсим "from"
=======
  from = '*' + from + '*'; // make "from" look nicer
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
*/!*

  alert( from + ': ' + text );
}

<<<<<<< HEAD
let from = "Аня";

showMessage(from, "Привет"); // *Аня*: Привет

// значение "from" осталось прежним, функция изменила значение локальной переменной
alert( from ); // Аня
```

Значение, передаваемое в качестве параметра функции, также называется *аргументом*.

Другими словами:

- Параметр - это переменная, указанная в круглых скобках в объявлении функции.
- Аргумент - это значение, которое передаётся функции при её вызове.

Мы объявляем функции со списком параметров, затем вызываем их, передавая аргументы.

Рассматривая приведённый выше пример, мы могли бы сказать: "функция `showMessage` объявляется с двумя параметрами, затем вызывается с двумя аргументами: `from` и `"Привет"`".

## Значения по умолчанию

Если при вызове функции аргумент не был указан, то его значением становится `undefined`.

Например, вышеупомянутая функция `showMessage(from, text)` может быть вызвана с одним аргументом:

```js
showMessage("Аня");
```

Это не приведёт к ошибке. Такой вызов выведет `"*Аня*: undefined"`. В вызове не указан параметр `text`, поэтому предполагается, что `text === undefined`.

Если мы хотим задать параметру `text` значение по умолчанию, мы должны указать его после `=`:

```js run
function showMessage(from, *!*text = "текст не добавлен"*/!*) {
  alert( from + ": " + text );
}

showMessage("Аня"); // Аня: текст не добавлен
```

Теперь, если параметр `text` не указан, его значением будет `"текст не добавлен"`

В данном случае `"текст не добавлен"` это строка, но на её месте могло бы быть и более сложное выражение, которое бы вычислялось и присваивалось при отсутствии параметра. Например:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() выполнится только если не передан text
  // результатом будет значение text
}
```

```smart header="Вычисление параметров по умолчанию"
В JavaScript параметры по умолчанию вычисляются каждый раз, когда функция вызывается без соответствующего аргумента.

В приведённом выше примере, функция `anotherFunction()` не будет вызвана вообще, если указан аргумент `text`.

С другой стороны, функция будет независимо вызываться каждый раз, когда аргумент `text` отсутствует.
```

````smart header="Использование параметров по умолчанию в ранних версиях JavaScript"
Ранние версии JavaScript не поддерживали параметры по умолчанию. Поэтому существуют альтернативные способы, которые могут встречаться в старых скриптах.

Например, явная проверка на `undefined`:
=======
let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// the value of "from" is the same, the function modified a local copy
alert( from ); // Ann
```

When a value is passed as a function parameter, it's also called an *argument*.

In other words, to put these terms straight:

- A parameter is the variable listed inside the parentheses in the function declaration (it's a declaration time term).
- An argument is the value that is passed to the function when it is called (it's a call time term).

We declare functions listing their parameters, then call them passing arguments.

In the example above, one might say: "the function `showMessage` is declared with two parameters, then called with two arguments: `from` and `"Hello"`".


## Default values

If a function is called, but an argument is not provided, then the corresponding value becomes `undefined`.

For instance, the aforementioned function `showMessage(from, text)` can be called with a single argument:

```js
showMessage("Ann");
```

That's not an error. Such a call would output `"*Ann*: undefined"`. As the value for `text` isn't passed, it becomes `undefined`.

We can specify the so-called "default" (to use if omitted) value for a parameter in the function declaration, using `=`:

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```

Now if the `text` parameter is not passed, it will get the value `"no text given"`.

The default value also jumps in if the parameter exists, but strictly equals `undefined`, like this:

```js
showMessage("Ann", undefined); // Ann: no text given
```

Here `"no text given"` is a string, but it can be a more complex expression, which is only evaluated and assigned if the parameter is missing. So, this is also possible:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() only executed if no text given
  // its result becomes the value of text
}
```

```smart header="Evaluation of default parameters"
In JavaScript, a default parameter is evaluated every time the function is called without the respective parameter.

In the example above, `anotherFunction()` isn't called at all, if the `text` parameter is provided.

On the other hand, it's independently called every time when `text` is missing.
```

````smart header="Default parameters in old JavaScript code"
Several years ago, JavaScript didn't support the syntax for default parameters. So people used other ways to specify them.

Nowadays, we can come across them in old scripts.

For example, an explicit check for `undefined`:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
function showMessage(from, text) {
*!*
  if (text === undefined) {
<<<<<<< HEAD
    text = 'текст не добавлен';
=======
    text = 'no text given';
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
  }
*/!*

  alert( from + ": " + text );
}
```

<<<<<<< HEAD
...Или с помощью оператора `||`:

```js
function showMessage(from, text) {
  // Если значение text ложно, тогда присвоить параметру text значение по умолчанию
  // заметим, что при этом пустая строка text === "" будет также считаться отсутствующим значением
  text = text || 'текст не добавлен';
=======
...Or using the `||` operator:

```js
function showMessage(from, text) {
  // If the value of text is falsy, assign the default value
  // this assumes that text == "" is the same as no text at all
  text = text || 'no text given';
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
  ...
}
```
````

<<<<<<< HEAD
### Альтернативные параметры по умолчанию

Иногда имеет смысл присваивать значения по умолчанию для параметров не в объявлении функции, а на более позднем этапе.

Во время выполнения функции мы можем проверить, передан ли параметр, сравнив его с `undefined`:
=======

### Alternative default parameters

Sometimes it makes sense to assign default values for parameters at a later stage after the function declaration.

We can check if the parameter is passed during the function execution, by comparing it with `undefined`:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
function showMessage(text) {
  // ...
<<<<<<< HEAD
*!*
  if (text === undefined) { // если параметр отсутствует
    text = 'пустое сообщение';
  }
*/!*
  alert(text);
}
showMessage(); // пустое сообщение
```

...Или мы можем использовать оператор `||`:

```js
function showMessage(text) {
  // если значение text ложно или равняется undefined, тогда присвоить text значение 'пусто'
  text = text || 'пусто';
=======

*!*
  if (text === undefined) { // if the parameter is missing
    text = 'empty message';
  }
*/!*

  alert(text);
}

showMessage(); // empty message
```

...Or we could use the `||` operator:

```js
function showMessage(text) {
  // if text is undefined or otherwise falsy, set it to 'empty'
  text = text || 'empty';
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
  ...
}
```

<<<<<<< HEAD
Современные движки JavaScript поддерживают [оператор нулевого слияния](info:nullish-operators) `??`. Его использование будет лучшей практикой, в случае, если большинство ложных значений, таких как `0`, следует расценивать как "нормальные".

```js run
function showCount(count) {
  // если count равен undefined или null, показать "неизвестно"
  alert(count ?? "неизвестно");
}
showCount(0); // 0
showCount(null); // неизвестно
showCount(); // неизвестно
```

## Возврат значения

Функция может вернуть результат, который будет передан в вызвавший её код.

Простейшим примером может служить функция сложения двух чисел:
=======
Modern JavaScript engines support the [nullish coalescing operator](info:nullish-coalescing-operator) `??`, it's better when most falsy values, such as `0`, should be considered "normal":

```js run
function showCount(count) {
  // if count is undefined or null, show "unknown"
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```

## Returning a value

A function can return a value back into the calling code as the result.

The simplest example would be a function that sums two values:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

<<<<<<< HEAD
Директива `return` может находиться в любом месте тела функции. Как только выполнение доходит до этого места, функция останавливается, и значение возвращается в вызвавший её код (присваивается переменной `result` выше).

Вызовов `return` может быть несколько, например:
=======
The directive `return` can be in any place of the function. When the execution reaches it, the function stops, and the value is returned to the calling code (assigned to `result` above).

There may be many occurrences of `return` in a single function. For instance:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
<<<<<<< HEAD
    return confirm('А родители разрешили?');
=======
    return confirm('Do you have permission from your parents?');
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
*/!*
  }
}

<<<<<<< HEAD
let age = prompt('Сколько вам лет?', 18);

if ( checkAge(age) ) {
  alert( 'Доступ получен' );
} else {
  alert( 'Доступ закрыт' );
}
```

Возможно использовать `return` и без значения. Это приведёт к немедленному выходу из функции.

Например:
=======
let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

It is possible to use `return` without a value. That causes the function to exit immediately.

For example:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

<<<<<<< HEAD
  alert( "Вам показывается кино" ); // (*)
=======
  alert( "Showing you the movie" ); // (*)
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
  // ...
}
```

<<<<<<< HEAD
В коде выше, если `checkAge(age)` вернёт `false`, `showMovie` не выполнит `alert`.

````smart header="Результат функции с пустым `return` или без него - `undefined`"
Если функция не возвращает значения, это всё равно, как если бы она возвращала `undefined`:

```js run
function doNothing() { /* пусто */ }
=======
In the code above, if `checkAge(age)` returns `false`, then `showMovie` won't proceed to the `alert`.

````smart header="A function with an empty `return` or without it returns `undefined`"
If a function does not return a value, it is the same as if it returns `undefined`:

```js run
function doNothing() { /* empty */ }
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

alert( doNothing() === undefined ); // true
```

<<<<<<< HEAD
Пустой `return` аналогичен `return undefined`:
=======
An empty `return` is also the same as `return undefined`:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

<<<<<<< HEAD
````warn header="Никогда не добавляйте перевод строки между `return` и его значением"
Для длинного выражения в `return` может быть заманчиво разместить его на нескольких отдельных строках, например так:
=======
````warn header="Never add a newline between `return` and the value"
For a long expression in `return`, it might be tempting to put it on a separate line, like this:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
<<<<<<< HEAD
Код не выполнится, потому что интерпретатор JavaScript подставит точку с запятой после `return`. Для него это будет выглядеть так:
=======
That doesn't work, because JavaScript assumes a semicolon after `return`. That'll work the same as:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

<<<<<<< HEAD
Таким образом, это фактически стало пустым `return`.

Если мы хотим, чтобы возвращаемое выражение занимало несколько строк, нужно начать его на той же строке, что и `return`. Или, хотя бы, поставить там открывающую скобку, вот так:
=======
So, it effectively becomes an empty return.

If we want the returned expression to wrap across multiple lines, we should start it at the same line as `return`. Or at least put the opening parentheses there as follows:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
<<<<<<< HEAD

И тогда всё сработает, как задумано.
````

## Выбор имени функции [#function-naming]

Функция - это действие. Поэтому имя функции обычно является глаголом. Оно должно быть кратким, точным и описывать действие функции, чтобы программист, который будет читать код, получил верное представление о том, что делает функция.

Как правило, используются глагольные префиксы, обозначающие общий характер действия, после которых следует уточнение. Обычно в командах разработчиков действуют соглашения, касающиеся значений этих префиксов.

Например, функции, начинающиеся с `"show"` обычно что-то показывают.

Функции, начинающиеся с...

- `"get…"` -- возвращают значение,
- `"calc…"` -- что-то вычисляют,
- `"create…"` -- что-то создают,
- `"check…"` -- что-то проверяют и возвращают логическое значение, и т.д.

Примеры таких имён:

```js no-beautify
showMessage(..)     // показывает сообщение
getAge(..)          // возвращает возраст (получая его каким-то образом)
calcSum(..)         // вычисляет сумму и возвращает результат
createForm(..)      // создаёт форму (и обычно возвращает её)
checkPermission(..) // проверяет доступ, возвращая true/false
```

Благодаря префиксам, при первом взгляде на имя функции становится понятным, что делает её код, и какое значение она может возвращать.

```smart header="Одна функция -- одно действие"
Функция должна делать только то, что явно подразумевается её названием. И это должно быть одним действием.

Два независимых действия обычно подразумевают две функции, даже если предполагается, что они будут вызываться вместе (в этом случае мы можем создать третью функцию, которая будет их вызывать).

Несколько примеров, которые нарушают это правило:

- `getAge` -- будет плохим выбором, если функция будет выводить `alert` с возрастом (должна только возвращать его).
- `createForm` -- будет плохим выбором, если функция будет изменять документ, добавляя форму в него (должна только создавать форму и возвращать её).
- `checkPermission` -- будет плохим выбором, если функция будет отображать сообщение с текстом `доступ разрешён/запрещён` (должна только выполнять проверку и возвращать её результат).

В этих примерах использовались общепринятые смыслы префиксов. Конечно, вы в команде можете договориться о других значениях, но обычно они мало отличаются от общепринятых. В любом случае вы и ваша команда должны чётко понимать, что значит префикс, что функция с ним может делать, а чего не может.
```

```smart header="Сверхкороткие имена функций"
Имена функций, которые используются *очень часто*, иногда делают сверхкороткими.

Например, фреймворк [jQuery](https://jquery.com) определяет функцию с помощью `$`. В библиотеке [Lodash](https://lodash.com/) основная функция представлена именем `_`.

Это исключения. В основном имена функций должны быть в меру краткими и описательными.
```

## Функции == Комментарии

Функции должны быть короткими и делать только что-то одно. Если это что-то большое, имеет смысл разбить функцию на несколько меньших. Иногда следовать этому правилу непросто, но это определённо хорошее правило.

Небольшие функции не только облегчают тестирование и отладку -- само существование таких функций выполняет роль хороших комментариев!

Например, сравним ниже две функции `showPrimes(n)`. Каждая из них выводит [простое число](https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%BE%D1%81%D1%82%D0%BE%D0%B5_%D1%87%D0%B8%D1%81%D0%BB%D0%BE) до `n`.

Первый вариант использует метку `nextPrime`:
=======
And it will work just as we expect it to.
````

## Naming a function [#function-naming]

Functions are actions. So their name is usually a verb. It should be brief, as accurate as possible and describe what the function does, so that someone reading the code gets an indication of what the function does.

It is a widespread practice to start a function with a verbal prefix which vaguely describes the action. There must be an agreement within the team on the meaning of the prefixes.

For instance, functions that start with `"show"` usually show something.

Function starting with...

- `"get…"` -- return a value,
- `"calc…"` -- calculate something,
- `"create…"` -- create something,
- `"check…"` -- check something and return a boolean, etc.

Examples of such names:

```js no-beautify
showMessage(..)     // shows a message
getAge(..)          // returns the age (gets it somehow)
calcSum(..)         // calculates a sum and returns the result
createForm(..)      // creates a form (and usually returns it)
checkPermission(..) // checks a permission, returns true/false
```

With prefixes in place, a glance at a function name gives an understanding what kind of work it does and what kind of value it returns.

```smart header="One function -- one action"
A function should do exactly what is suggested by its name, no more.

Two independent actions usually deserve two functions, even if they are usually called together (in that case we can make a 3rd function that calls those two).

A few examples of breaking this rule:

- `getAge` -- would be bad if it shows an `alert` with the age (should only get).
- `createForm` -- would be bad if it modifies the document, adding a form to it (should only create it and return).
- `checkPermission` -- would be bad if it displays the `access granted/denied` message (should only perform the check and return the result).

These examples assume common meanings of prefixes. You and your team are free to agree on other meanings, but usually they're not much different. In any case, you should have a firm understanding of what a prefix means, what a prefixed function can and cannot do. All same-prefixed functions should obey the rules. And the team should share the knowledge.
```

```smart header="Ultrashort function names"
Functions that are used *very often* sometimes have ultrashort names.

For example, the [jQuery](https://jquery.com/) framework defines a function with `$`. The [Lodash](https://lodash.com/) library has its core function named `_`.

These are exceptions. Generally function names should be concise and descriptive.
```

## Functions == Comments

Functions should be short and do exactly one thing. If that thing is big, maybe it's worth it to split the function into a few smaller functions. Sometimes following this rule may not be that easy, but it's definitely a good thing.

A separate function is not only easier to test and debug -- its very existence is a great comment!

For instance, compare the two functions `showPrimes(n)` below. Each one outputs [prime numbers](https://en.wikipedia.org/wiki/Prime_number) up to `n`.

The first variant uses a label:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

<<<<<<< HEAD
    alert( i ); // простое
=======
    alert( i ); // a prime
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
  }
}
```

<<<<<<< HEAD
Второй вариант использует дополнительную функцию `isPrime(n)` для проверки на простое:
=======
The second variant uses an additional function `isPrime(n)` to test for primality:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

<<<<<<< HEAD
    alert(i);  // простое
=======
    alert(i);  // a prime
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

<<<<<<< HEAD
Второй вариант легче для понимания, не правда ли? Вместо куска кода мы видим название действия (`isPrime`). Иногда разработчики называют такой код *самодокументируемым*.

Таким образом, допустимо создавать функции, даже если мы не планируем повторно использовать их. Такие функции структурируют код и делают его более понятным.

## Итого

Объявление функции имеет вид:

```js
function имя(параметры, через, запятую) {
  /* тело, код функции */
}
```

- Передаваемые значения копируются в параметры функции и становятся локальными переменными.
- Функции имеют доступ к внешним переменным. Но это работает только изнутри наружу. Код вне функции не имеет доступа к её локальным переменным.
- Функция может возвращать значение. Если этого не происходит, тогда результат равен `undefined`.

Для того, чтобы сделать код более чистым и понятным, рекомендуется использовать локальные переменные и параметры функций, не пользоваться внешними переменными.

Функция, которая получает параметры, работает с ними и затем возвращает результат, гораздо понятнее функции, вызываемой без параметров, но изменяющей внешние переменные, что чревато побочными эффектами.

Именование функций:

- Имя функции должно понятно и чётко отражать, что она делает. Увидев её вызов в коде, вы должны тут же понимать, что она делает, и что возвращает.
- Функция - это действие, поэтому её имя обычно является глаголом.
- Есть много общепринятых префиксов, таких как: `create…`, `show…`, `get…`, `check…` и т.д. Пользуйтесь ими как подсказками, поясняющими, что делает функция.

Функции являются основными строительными блоками скриптов. Мы рассмотрели лишь основы функций в JavaScript, но уже сейчас можем создавать и использовать их. Это только начало пути. Мы будем неоднократно возвращаться к функциям и изучать их всё более и более глубоко.
=======
The second variant is easier to understand, isn't it? Instead of the code piece we see a name of the action (`isPrime`). Sometimes people refer to such code as *self-describing*.

So, functions can be created even if we don't intend to reuse them. They structure the code and make it readable.

## Summary

A function declaration looks like this:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- Values passed to a function as parameters are copied to its local variables.
- A function may access outer variables. But it works only from inside out. The code outside of the function doesn't see its local variables.
- A function can return a value. If it doesn't, then its result is `undefined`.

To make the code clean and easy to understand, it's recommended to use mainly local variables and parameters in the function, not outer variables.

It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side effect.

Function naming:

- A name should clearly describe what the function does. When we see a function call in the code, a good name instantly gives us an understanding what it does and returns.
- A function is an action, so function names are usually verbal.
- There exist many well-known function prefixes like `create…`, `show…`, `get…`, `check…` and so on. Use them to hint what a function does.

Functions are the main building blocks of scripts. Now we've covered the basics, so we actually can start creating and using them. But that's only the beginning of the path. We are going to return to them many times, going more deeply into their advanced features.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
