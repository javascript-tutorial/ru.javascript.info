<<<<<<< HEAD
# Функции-стрелки, основы

Существует ещё более простой и краткий синтаксис для создания функций, который часто лучше, чем синтаксис Function Expression.

Он называется "функции-стрелки" или "стрелочные функции" (arrow functions), т.к. выглядит следующим образом:
=======
# Arrow functions, the basics

There's another very simple and concise syntax for creating functions, that's often better than Function Expressions.

It's called "arrow functions", because it looks like this:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js
let func = (arg1, arg2, ...argN) => expression
```

<<<<<<< HEAD
...Такой код создаёт функцию `func` с аргументами `arg1..argN` и вычисляет `expression` с правой стороны с их использованием, возвращая результат.

Другими словами, это более короткий вариант такой записи:
=======
...This creates a function `func` that accepts arguments `arg1..argN`, then evaluates the `expression` on the right side with their use and returns its result.

In other words, it's the shorter version of:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

<<<<<<< HEAD
Давайте взглянем на конкретный пример:
=======
Let's see a concrete example:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

```js run
let sum = (a, b) => a + b;

<<<<<<< HEAD
/* Более короткая форма для:
=======
/* This arrow function is a shorter form of:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
<<<<<<< HEAD

```

То есть, `(a, b) => a + b` задаёт функцию с двумя аргументами `a` и `b`, которая при запуске вычисляет выражение справа `a + b` и возвращает его результат.

- Если у нас только один аргумент, то круглые скобки вокруг параметров можно опустить, сделав запись ещё короче:

    ```js run
    // тоже что и
    // let double = function(n) { return n * 2 }
    *!*
    let double = n => n * 2;
=======
```

As you can, see `(a, b) => a + b` means a function that accepts two arguments named `a` and `b`. Upon the execution, it evaluates the expression `a + b` and returns the result.

- If we have only one argument, then parentheses around parameters can be omitted, making that even shorter.

    For example:

    ```js run
    *!*
    let double = n => n * 2;
    // roughly the same as: let double = function(n) { return n * 2 }
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
    */!*

    alert( double(3) ); // 6
    ```

<<<<<<< HEAD
- Если нет аргументов, указываются пустые круглые скобки:
=======
- If there are no arguments, parentheses will be empty (but they should be present):
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

<<<<<<< HEAD
Функции-стрелки могут быть использованы так же, как и Function Expression.

Например, для динамического создания функции:

```js run
let age = prompt("Сколько Вам лет?", 18);

let welcome = (age < 18) ?
  () => alert('Привет') :
  () => alert("Здравствуйте!");

welcome(); // теперь всё в порядке
```

Поначалу функции-стрелки могут показаться необычными и трудночитаемыми, но это быстро пройдёт, как только глаза привыкнут к этим конструкциям.

Они очень удобны для простых однострочных действий, когда лень писать много букв.

## Многострочные стрелочные функции

В примерах выше аргументы использовались слева от `=>`, а справа вычислялось выражение с их значениями.

Порой нам нужно что-то посложнее, например, выполнить несколько инструкций. Это также возможно, нужно лишь заключить инструкции в фигурные скобки. И использовать `return` внутри них, как в обычной функции.

Например:

```js run
let sum = (a, b) => {  // фигурная скобка, открывающая тело многострочной функции
  let result = a + b;
*!*
  return result; // при фигурных скобках для возврата значения нужно явно вызвать return
=======
Arrow functions can be used in the same way as Function Expressions.

For instance, to dynamically create a function:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ok now
```

Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

They are very convenient for simple one-line actions, when we're just too lazy to write many words.

## Multiline arrow functions

The examples above took arguments from the left of `=>` and evaluated the right-side expression with them.

Sometimes we need something a little bit more complex, like multiple expressions or statements. It is also possible, but we should enclose them in curly braces. Then use a normal `return` within them.

Like this:

```js run
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, then we need an explicit "return" 
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
*/!*
};

alert( sum(1, 2) ); // 3
```

<<<<<<< HEAD
```smart header="Дальше будет ещё информация"
Здесь мы рассмотрели функции-стрелки как способ писать меньше букв. Но это далеко не всё!

Стрелочные функции обладают другими интересными особенностями. Их изучение требует знания некоторых других возможностей языка JavaScript, поэтому мы вернёмся к стрелочным функциям позже, в главе <info:arrow-functions>.

А пока мы можем использовать их для простых однострочных действий и колбэков.
```

## Итого

Функции-стрелки очень удобны для однострочных действий. Они бывают двух типов:

1. Без фигурных скобок: `(...args) => expression` -- правая сторона выражение: функция выполняет его и возвращает результат.
2. С фигурными скобками: `(...args) => { body }` -- скобки позволяют нам писать многострочные инструкции внутри функции, но при этом необходимо указывать директиву `return`, чтобы вернуть какое-либо значение.
=======
```smart header="More to come"
Here we praised arrow functions for brevity. But that's not all!

Arrow functions have other interesting features.

To study them in-depth, we first need to get to know some other aspects of JavaScript, so we'll return to arrow functions later in the chapter <info:arrow-functions>.

For now, we can already use arrow functions for one-line actions and callbacks.
```

## Summary

Arrow functions are handy for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
