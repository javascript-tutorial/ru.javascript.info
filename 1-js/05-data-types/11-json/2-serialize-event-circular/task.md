importance: 5

---

# Исключить обратные ссылки

В простых случаях циклических ссылок мы можем исключить нарушающее свойство из сериализации по его имени.

Но иногда есть много обратных ссылок. И имена могут использоваться как в циклических ссылках, так и в обычных свойствах.

Напишите функцию `replacer` для строкового преобразования, но удалите свойства, которые ссылаются на` meetup`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

*!*
// обратные ссылки 
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(key, value) {
  /* ваш код */
}));

/* в результате должно быть:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```
