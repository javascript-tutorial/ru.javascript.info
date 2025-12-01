
```js run
function ask(question, yes, no) {
<<<<<<< HEAD
  if (confirm(question)) yes()
=======
  if (confirm(question)) yes();
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
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
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
*/!*
);
```

<<<<<<< HEAD
Выглядит короче и понятней, правда?
=======
Looks short and clean, right?
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
