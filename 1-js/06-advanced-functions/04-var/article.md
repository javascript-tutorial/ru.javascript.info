
# Устаревшее ключевое слово "var"

<<<<<<< HEAD
В самой первой главе про [переменные](info:variables) мы ознакомились с тремя способами объявления переменных:
=======
```smart header="This article is for understanding old scripts"
The information in this article is useful for understanding old scripts.

That's not how we write a new code.
```

In the very first chapter about [variables](info:variables), we mentioned three ways of variable declaration:
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8

1. `let`
2. `const`
3. `var`

`let` и `const` ведут себя одинаково по отношению к лексическому окружению, области видимости.

Но `var` - это совершенно другой зверь, берущий своё начало с давних времён. Обычно `var` не используется в современных скриптах, но всё ещё может скрываться в старых.

Если в данный момент вы не работаете с подобными скриптами, вы можете пропустить или отложить прочтение данной главы, однако, есть шанс, что вы столкнётесь с `var` в будущем.

На первый взгляд, поведение `var` похоже на `let`. Например, объявление переменной:

```js run
function sayHi() {
  var phrase = "Привет"; // локальная переменная, "var" вместо "let"

  alert(phrase); // Привет
}

sayHi();

alert(phrase); // Ошибка: phrase не определена
```

...Однако, отличия всё же есть.

## Для "var" не существует блочной области видимости

Область видимости переменных `var` ограничивается либо функцией, либо, если переменная глобальная, то скриптом. Такие переменные доступны за пределами блока.

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
alert(test); // Error: test is not defined
*/!*
```

Аналогично для циклов: `var` не может быть блочной или локальной внутри цикла:

```js
for (var i = 0; i < 10; i++) {
  // ...
}

*!*
alert(i); // 10, переменная i доступна вне цикла, т.к. является глобальной переменной
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
alert(phrase); // Ошибка: phrase не определена (видна в консоли разработчика)
```

Как мы видим, `var` выходит за пределы блоков `if`, `for` и подобных. Это происходит потому, что на заре развития JavaScript блоки кода не имели лексического окружения. Поэтому можно сказать, что `var` - это пережиток прошлого.

## "var" обрабатываются в начале запуска функции

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

Это проще всего продемонстрировать на примере:

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

В обоих примерах выше вызов `alert` происходил без ошибки, потому что переменная `phrase` уже существовала. Но её значение ещё не было присвоено, поэтому мы получали `undefined`.

<<<<<<< HEAD
## Итого
=======
### IIFE

As in the past there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

```js run
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

Here a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript meets `"function"` in the main code flow, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Try to declare and immediately call a function
function() { // <-- Error: Unexpected token (

  let message = "Hello";

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

## Summary
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8

Существует 2 основных отличия `var` от `let/const`:

1. Переменные `var` не имеют блочной области видимости, они ограничены, как минимум, телом функции.
2. Объявления (инициализация) переменных `var`производится в начале исполнения функции (или скрипта для глобальных переменных).

<<<<<<< HEAD
Есть ещё одно небольшое отличие, относящееся к глобальному объекту, мы рассмотрим его в следующей главе.
=======
There's one more very minor difference related to the global object, that we'll cover in the next chapter.
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8

Эти особенности, как правило, не очень хорошо влияют на код. Блочная область видимости - это удобно. Поэтому много лет назад `let` и `const` были введены в стандарт и сейчас являются основным способом объявления переменных.
