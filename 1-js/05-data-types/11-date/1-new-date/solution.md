Конструктор `new Date` стандартно использует местную временную зону. Единственная важная вещь, которую нужно запомнить - это то, что месяцы начинаются с нуля.

Поэтому февраль обозначается числом 1.

Here's an example with numbers as date components:

```js run
//new Date(year, month, date, hour, minute, second, millisecond)
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
```
We could also create a date from a string, like this:

```js run
//new Date(datastring)
let d2 = new Date("February 20, 2012 03:12:00");
alert( d2 );
```
