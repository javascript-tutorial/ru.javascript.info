
```js run
function ask(question, yes, no) {
<<<<<<< HEAD
  if (confirm(question)) yes()
=======
  if (confirm(question)) yes();
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
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
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
*/!*
);
```

<<<<<<< HEAD
Выглядит короче и понятней, правда?
=======
Looks short and clean, right?
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
