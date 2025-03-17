
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
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
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
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
);
```
