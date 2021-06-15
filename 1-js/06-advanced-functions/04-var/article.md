
# Устаревшее ключевое слово "var"

<<<<<<< HEAD
В самой первой главе про [переменные](info:variables) мы ознакомились с тремя способами объявления переменных:
=======
```smart header="This article is for understanding old scripts"
The information in this article is useful for understanding old scripts.

That's not how we write a new code.
```

In the very first chapter about [variables](info:variables), we mentioned three ways of variable declaration:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

1. `let`
2. `const`
3. `var`

<<<<<<< HEAD
`let` и `const` ведут себя одинаково по отношению к лексическому окружению, области видимости.

Но `var` - это совершенно другой зверь, берущий своё начало с давних времён. Обычно `var` не используется в современных скриптах, но всё ещё может скрываться в старых.

Если в данный момент вы не работаете с подобными скриптами, вы можете пропустить или отложить прочтение данной главы, однако, есть шанс, что вы столкнётесь с `var` в будущем.

На первый взгляд, поведение `var` похоже на `let`. Например, объявление переменной:

```js run
function sayHi() {
  var phrase = "Привет"; // локальная переменная, "var" вместо "let"

  alert(phrase); // Привет
}
=======
The `var` declaration is similar to `let`. Most of the time we can replace `let` by `var` or vice-versa and expect things to work:

```js run
var message = "Hi";
alert(message); // Hi
```

But internally `var` is a very different beast, that originates from very old times. It's generally not used in modern scripts, but still lurks in the old ones.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

If you don't plan on meeting such scripts you may even skip this chapter or postpone it.

<<<<<<< HEAD
alert(phrase); // Ошибка: phrase не определена
```

...Однако, отличия всё же есть.
=======
On the other hand, it's important to understand differences when migrating old scripts from `var` to `let`, to avoid odd errors.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Для "var" не существует блочной области видимости

<<<<<<< HEAD
Область видимости переменных `var` ограничивается либо функцией, либо, если переменная глобальная, то скриптом. Такие переменные доступны за пределами блока.
=======
Variables, declared with `var`, are either function-scoped or global-scoped. They are visible through blocks.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Например:

```js run
if (true) {
  var test = true; // используем var вместо let
}

*!*
alert(test); // true, переменная существует вне блока if
*/!*
```

Так как `var` игнорирует блоки, мы получили глобальную переменную `test`.

А если бы мы использовали `let test` вместо `var test`, тогда переменная была бы видна только внутри `if`:

```js run
if (true) {
  let test = true; // используем let
}

*!*
alert(test); // ReferenceError: test is not defined
*/!*
```

Аналогично для циклов: `var` не может быть блочной или локальной внутри цикла:

```js
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
<<<<<<< HEAD
alert(i); // 10, переменная i доступна вне цикла, т.к. является глобальной переменной
=======
alert(i);   // 10, "i" is visible after loop, it's a global variable
alert(one); // 1, "one" is visible after loop, it's a global variable
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*/!*
```

Если блок кода находится внутри функции, то `var` становится локальной переменной в этой функции:

```js run
function sayHi() {
  if (true) {
    var phrase = "Привет";
  }

  alert(phrase); // срабатывает и выводит "Привет"
}

sayHi();
<<<<<<< HEAD
alert(phrase); // Ошибка: phrase не определена (видна в консоли разработчика)
```

Как мы видим, `var` выходит за пределы блоков `if`, `for` и подобных. Это происходит потому, что на заре развития JavaScript блоки кода не имели лексического окружения. Поэтому можно сказать, что `var` - это пережиток прошлого.

## "var" обрабатываются в начале запуска функции
=======
alert(phrase); // ReferenceError: phrase is not defined
```

As we can see, `var` pierces through `if`, `for` or other code blocks. That's because a long time ago in JavaScript, blocks had no Lexical Environments, and `var` is a remnant of that.

## "var" tolerates redeclarations

If we declare the same variable with `let` twice in the same scope, that's an error:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

With `var`, we can redeclare a variable any number of times. If we use `var` with an already-declared variable, it's just ignored:

```js run
var user = "Pete";

var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error

alert(user); // John
```

## "var" variables can be declared below their use
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Объявления переменных `var` обрабатываются в начале выполнения функции (или запуска скрипта, если переменная является глобальной).

Другими словами, переменные `var` считаются объявленными с самого начала исполнения функции вне зависимости от того, в каком месте функции реально находятся их объявления (при условии, что они не находятся во вложенной функции).

Т.е. этот код:

```js run
function sayHi() {
  phrase = "Привет";

  alert(phrase);

*!*
  var phrase;
*/!*
}
sayHi();
```

...Технически полностью эквивалентен следующему (объявление переменной `var phrase` перемещено в начало функции):

```js run
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "Привет";

  alert(phrase);
}
sayHi();
```

...И даже коду ниже (как вы помните, блочная область видимости игнорируется):

```js run
function sayHi() {
  phrase = "Привет"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
sayHi();
```

Это поведение называется "hoisting" (всплытие, поднятие), потому что все объявления переменных `var` "всплывают" в самый верх функции.

В примере выше `if (false)` условие никогда не выполнится. Но это никаким образом не препятствует созданию переменной `var phrase`, которая находится внутри него, поскольку объявления `var` "всплывают" в начало функции. Т.е. в момент присвоения значения `(*)` переменная уже существует.

**Объявления переменных "всплывают", но присваивания значений - нет.**

<<<<<<< HEAD
Это проще всего продемонстрировать на примере:
=======
That's best demonstrated with an example:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function sayHi() {
  alert(phrase);  

*!*
  var phrase = "Привет";
*/!*
}

sayHi();
```

Строка `var phrase = "Привет"` состоит из двух действий:

1. Объявление переменной `var`
2. Присвоение значения в переменную `=`.

Объявление переменной обрабатывается в начале выполнения функции ("всплывает"), однако присвоение значения всегда происходит в той строке кода, где оно указано. Т.е. код выполняется по следующему сценарию:

```js run
function sayHi() {
*!*
  var phrase; // объявление переменной срабатывает вначале...
*/!*

  alert(phrase); // undefined

*!*
  phrase = "Привет"; // ...присвоение - в момент, когда исполнится данная строка кода.
*/!*
}

sayHi();
```

Поскольку все объявления переменных `var` обрабатываются в начале функции, мы можем ссылаться на них в любом месте. Однако, переменные имеют значение `undefined` до строки с присвоением значения.

<<<<<<< HEAD
В обоих примерах выше вызов `alert` происходил без ошибки, потому что переменная `phrase` уже существовала. Но её значение ещё не было присвоено, поэтому мы получали `undefined`.
=======
In both examples above, `alert` runs without an error, because the variable `phrase` exists. But its value is not yet assigned, so it shows `undefined`.

## IIFE

In the past, as there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

```js run
(function() {

  var message = "Hello";

  alert(message); // Hello

})();
```

Here, a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript engine encounters `"function"` in the main code, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Tries to declare and immediately call a function
function() { // <-- SyntaxError: Function statements require a function name

  var message = "Hello";

  alert(message); // Hello

}();
```

Even if we say: "okay, let's add a name", that won't work, as JavaScript does not allow Function Declarations to be called immediately:

```js run
// syntax error because of parentheses below
function go() {

}(); // <-- can't call Function Declaration immediately
```

So, the parentheses around the function is a trick to show JavaScript that the function is created in the context of another expression, and hence it's a Function Expression: it needs no name and can be called immediately.

There exist other ways besides parentheses to tell JavaScript that we mean a Function Expression:

```js run
// Ways to create IIFE

(function() {
  alert("Parentheses around the function");
}*!*)*/!*();

(function() {
  alert("Parentheses around the whole thing");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT operator starts the expression");
}();

*!*+*/!*function() {
  alert("Unary plus starts the expression");
}();
```

In all the above cases we declare a Function Expression and run it immediately. Let's note again: nowadays there's no reason to write such code.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Итого

Существует 2 основных отличия `var` от `let/const`:

<<<<<<< HEAD
1. Переменные `var` не имеют блочной области видимости, они ограничены, как минимум, телом функции.
2. Объявления (инициализация) переменных `var`производится в начале исполнения функции (или скрипта для глобальных переменных).

Есть ещё одно небольшое отличие, относящееся к глобальному объекту, мы рассмотрим его в следующей главе.
=======
1. `var` variables have no block scope, their visibility is scoped to current function, or global, if declared outside function.
2. `var` declarations are processed at function start (script start for globals).

There's one more very minor difference related to the global object, that we'll cover in the next chapter.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Эти особенности, как правило, не очень хорошо влияют на код. Блочная область видимости - это удобно. Поэтому много лет назад `let` и `const` были введены в стандарт и сейчас являются основным способом объявления переменных.
