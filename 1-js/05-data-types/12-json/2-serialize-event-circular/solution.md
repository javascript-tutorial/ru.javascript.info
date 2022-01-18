
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

Здесь нам также нужно проверить `key ==""`, чтобы исключить первый вызов, где значение `value` равно `meetup`.

<-- Похоже, что объяснение решения данной задачи неверное. В объяснении решения указывается на проверку первого вызова (key === ""), но в самом решении в условии на проверку (строка 17) используется key !== "", но все же решение работает. Насколько я понял первый вызов здесь вообще ни при чем, а решение работает потому, что условие (key != "" && value == meetup) проходя объект увидит НЕпустое свойство ссылающееся на объект meetup - такими свойствами будут room.occupiedBy и meetup.self, а объект-обертка первого вызова должен возвращать value, так как у него key === "" и value === meetup в отличие от условия решения key !== "" и value === meetup. -->
