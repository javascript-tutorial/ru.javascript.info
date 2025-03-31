
```js run
function ask(question, yes, no) {
<<<<<<< HEAD
  if (confirm(question)) yes()
=======
  if (confirm(question)) yes();
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
  else no();
}

ask(
<<<<<<< HEAD
  "Вы согласны?",
*!*
  () => alert("Вы согласились."),
  () => alert("Вы отменили выполнение.")
=======
  "Do you agree?",
*!*
  () => alert("You agreed."),
  () => alert("You canceled the execution.")
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
*/!*
);
```

<<<<<<< HEAD
Выглядит короче и понятней, правда?
=======
Looks short and clean, right?
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
