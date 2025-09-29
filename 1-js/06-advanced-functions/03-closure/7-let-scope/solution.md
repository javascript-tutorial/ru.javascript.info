<<<<<<< HEAD
Ответ: **ошибка**.

Попробуйте запустить этот код:
=======
The result is: **error**.

Try running it:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let x = 1;

function func() {
*!*
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
*/!*
  let x = 2;
}

func();
```

<<<<<<< HEAD
В этом примере мы можем наблюдать характерную разницу между "несуществующей" и "неинициализированной" переменной.

Как вы могли прочитать в статье [](info:closure), переменная находится в неинициализированном состоянии с момента входа в блок кода (или функцию). И остается неинициализированной до соответствующего оператора `let`.

Другими словами, переменная технически существует, но не может быть использована до `let`.

Приведенный выше код демонстрирует это.
=======
In this example we can observe the peculiar difference between a "non-existing" and "uninitialized" variable.

As you may have read in the article [](info:closure), a variable starts in the "uninitialized" state from the moment when the execution enters a code block (or a function). And it stays uninitalized until the corresponding `let` statement.

In other words, a variable technically exists, but can't be used before `let`.

The code above demonstrates it.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
function func() {
*!*
<<<<<<< HEAD
  // локальная переменная x известна движку с самого начала выполнения функции,
  // но она является неинициализированной до let ("мёртвая зона")
  // следовательно, ошибка
=======
  // the local variable x is known to the engine from the beginning of the function,
  // but "uninitialized" (unusable) until let ("dead zone")
  // hence the error
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
*/!*

  console.log(x); // ReferenceError: Cannot access 'x' before initialization

  let x = 2;
}
```

<<<<<<< HEAD
Эту зону временной непригодности переменной (от начала блока кода до `let`) иногда называют "мёртвой зоной".
=======
This zone of temporary unusability of a variable (from the beginning of the code block till `let`) is sometimes called the "dead zone".
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
