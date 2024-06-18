
```js run
let room = {
  number: 23
};

let meetup = {
  title: "Совещание",
  occupiedBy: [{name: "Иванов"}, {name: "Петров"}],
  place: room
};

room.occupiedBy = meetup;
meetup.self = meetup;

alert( JSON.stringify(meetup, function replacer(key, value) {
  return (key != "" && value == meetup) ? undefined : value;
}));

/* 
{
  "title":"Совещание",
  "occupiedBy":[{"name":"Иванов"},{"name":"Петров"}],
  "place":{"number":23}
}
*/
```

Функция `replacer` будет вызвана для каждой пары `(key, value)`, и в первом вызове будет передан специальный «объект-обёртка»: `{"": meetup}`.

Если мы реализуем только проверку `value == meetup`, то в результате получим `undefined`. Чтобы в первом вызове `replacer` не было удалено свойство, ссылающееся на `meetup`, нам также нужно добавить проверку `key != ""`.
