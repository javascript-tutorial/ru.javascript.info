
```js run
function ask(question, yes, no) {
<<<<<<< HEAD
  if (confirm(question)) yes()
=======
  if (confirm(question)) yes();
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
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
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
*/!*
);
```

<<<<<<< HEAD
Выглядит короче и понятней, правда?
=======
Looks short and clean, right?
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
