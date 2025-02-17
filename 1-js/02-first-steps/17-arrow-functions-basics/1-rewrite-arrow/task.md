
<<<<<<< HEAD
# Перепишите с использованием функции-стрелки

Замените код Function Expression стрелочной функцией:

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes()
=======
# Rewrite with arrow functions

Replace Function Expressions with arrow functions in the code below:

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes();
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
  else no();
}

ask(
<<<<<<< HEAD
  "Вы согласны?",
  function() { alert("Вы согласились."); },
  function() { alert("Вы отменили выполнение."); }
=======
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
);
```
