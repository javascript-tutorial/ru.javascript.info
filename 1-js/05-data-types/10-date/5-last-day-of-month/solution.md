Создадим дату из следующего месяца, но в день передадим 0:
```js run demo
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

Обычно даты начинаются с 1, но технически возможно передать любое число, и дата сама себя поправит. Так что если передать 0, то это значение будет соответствовать "один день перед первым числом месяца", другими словами: "последнее число прошлого месяца".



