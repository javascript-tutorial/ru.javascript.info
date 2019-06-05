
```js run
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Вы согласны?",
*!*
  () => alert("Вы согласились."),
  () => alert("Вы отменили выполнение.")
*/!*
);
```

Выглядит короче и понятней, правда?
