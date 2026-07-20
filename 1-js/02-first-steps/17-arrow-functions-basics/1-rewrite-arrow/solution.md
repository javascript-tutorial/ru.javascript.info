
```js run
function ask(question, yes, no) {
<<<<<<< HEAD
  if (confirm(question)) yes()
=======
  if (confirm(question)) yes();
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
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
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
*/!*
);
```

<<<<<<< HEAD
Выглядит короче и понятней, правда?
=======
Looks short and clean, right?
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
