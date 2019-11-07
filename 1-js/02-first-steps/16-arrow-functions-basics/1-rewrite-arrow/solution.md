
```js run
let ask = (question, yes, no) => confirm(question) ? yes() : no();

ask(
  "Вы согласны?",
*!*
  () => alert("Вы согласились."),
  () => alert("Вы отменили выполнение.")
*/!*
);
```

Выглядит короче и понятней, правда?
