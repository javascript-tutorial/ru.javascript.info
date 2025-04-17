<<<<<<< HEAD
# Стрелочные функции, основы

Существует ещё один очень простой и лаконичный синтаксис для создания функций, который часто лучше, чем Function Expression.

Он называется "функции-стрелки" или "стрелочные функции" (arrow functions), т.к. выглядит следующим образом:

```js
let func = (arg1, arg2, ...argN) => expression;
```

Это создаёт функцию `func`, которая принимает аргументы `arg1..argN`, затем вычисляет `expression` в правой части с их использованием и возвращает результат.

Другими словами, это сокращённая версия:

```js
let func = function(arg1, arg2, ...argN) {
=======
# Arrow functions, the basics

There's another very simple and concise syntax for creating functions, that's often better than Function Expressions.

It's called "arrow functions", because it looks like this:

```js
let func = (arg1, arg2, ..., argN) => expression;
```

This creates a function `func` that accepts arguments `arg1..argN`, then evaluates the `expression` on the right side with their use and returns its result.

In other words, it's the shorter version of:

```js
let func = function(arg1, arg2, ..., argN) {
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
  return expression;
};
```

<<<<<<< HEAD
Давайте рассмотрим конкретный пример:
=======
Let's see a concrete example:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
let sum = (a, b) => a + b;

<<<<<<< HEAD
/* Эта стрелочная функция представляет собой более короткую форму:
=======
/* This arrow function is a shorter form of:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
<<<<<<< HEAD

```

Как вы можете видеть, `(a, b) => a + b` задаёт функцию, которая принимает два аргумента с именами `a` и `b`. И при выполнении она вычисляет выражение `a + b` и возвращает результат.

- Если у нас только один аргумент, то круглые скобки вокруг параметров можно опустить, сделав запись ещё короче:
=======
```

As you can see, `(a, b) => a + b` means a function that accepts two arguments named `a` and `b`. Upon the execution, it evaluates the expression `a + b` and returns the result.

- If we have only one argument, then parentheses around parameters can be omitted, making that even shorter.

    For example:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

    ```js run
    *!*
    let double = n => n * 2;
<<<<<<< HEAD
    // примерно тоже что и: let double = function(n) { return n * 2 }
=======
    // roughly the same as: let double = function(n) { return n * 2 }
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
    */!*

    alert( double(3) ); // 6
    ```

<<<<<<< HEAD
- Если аргументов нет, круглые скобки будут пустыми, но они должны присутствовать:
=======
- If there are no arguments, parentheses are empty, but they must be present:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

<<<<<<< HEAD
Стрелочные функции можно использовать так же, как и Function Expression.

Например, для динамического создания функции:

```js run
let age = prompt("Сколько Вам лет?", 18);

let welcome = (age < 18) ?
  () => alert('Привет!') :
  () => alert("Здравствуйте!");
=======
Arrow functions can be used in the same way as Function Expressions.

For instance, to dynamically create a function:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello!') :
  () => alert("Greetings!");
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

welcome();
```

<<<<<<< HEAD
Поначалу стрелочные функции могут показаться необычными и даже трудночитаемыми, но это быстро пройдёт по мере того, как глаза привыкнут к этим конструкциям.

Они очень удобны для простых однострочных действий, когда лень писать много слов.

## Многострочные стрелочные функции

Стрелочные функции, которые мы видели до этого, были очень простыми. Они брали аргументы слева от `=>` и вычисляли и возвращали выражение справа.

Иногда нам нужна более сложная функция, с несколькими выражениями и инструкциями. Это также возможно, нужно лишь заключить их в фигурные скобки. При этом важное отличие - в том, что в таких скобках для возврата значения нужно использовать `return` (как в обычных функциях).

Вроде этого:

```js run
let sum = (a, b) => {  // фигурная скобка, открывающая тело многострочной функции
  let result = a + b;
*!*
  return result; // если мы используем фигурные скобки, то нам нужно явно указать "return"
=======
Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

They are very convenient for simple one-line actions, when we're just too lazy to write many words.

## Multiline arrow functions

The arrow functions that we've seen so far were very simple. They took arguments from the left of `=>`, evaluated and returned the right-side expression with them.

Sometimes we need a more complex function, with multiple expressions and statements. In that case, we can enclose them in curly braces. The major difference is that curly braces require a `return` within them to return a value (just like a regular function does).

Like this:

```js run
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, then we need an explicit "return"
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
*/!*
};

alert( sum(1, 2) ); // 3
```

<<<<<<< HEAD
```smart header="Дальше - больше"
Здесь мы представили главной целью стрелочных функций краткость. Но это ещё не всё!

Стрелочные функции обладают и другими интересными возможностями.

Чтобы изучить их более подробно, нам сначала нужно познакомиться с некоторыми другими аспектами JavaScript, поэтому мы вернёмся к стрелочным функциям позже, в главе <info:arrow-functions>.

А пока мы можем использовать их для простых однострочных действий и колбэков.
```

## Итого

Стрелочные функции очень удобны для простых действий, особенно для однострочных.

Они бывают двух типов:

1. Без фигурных скобок: `(...args) => expression` -- правая сторона выражения: функция вычисляет его и возвращает результат. Скобки можно не ставить, если аргумент только один: `n => n * 2`.
2. С фигурными скобками: `(...args) => { body }` -- скобки позволяют нам писать несколько инструкций внутри функции, но при этом необходимо явно вызывать `return`, чтобы вернуть значение.
=======
```smart header="More to come"
Here we praised arrow functions for brevity. But that's not all!

Arrow functions have other interesting features.

To study them in-depth, we first need to get to know some other aspects of JavaScript, so we'll return to arrow functions later in the chapter <info:arrow-functions>.

For now, we can already use arrow functions for one-line actions and callbacks.
```

## Summary

Arrow functions are handy for simple actions, especially for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result. Parentheses can be omitted, if there's only a single argument, e.g. `n => n*2`.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
