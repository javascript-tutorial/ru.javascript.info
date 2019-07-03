<<<<<<< HEAD
Конструктор `new Date` стандартно использует местную временную зону. Единственная важная вещь, которую нужно запомнить - это то, что месяцы начинаются с нуля.
=======
The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Поэтому февраль обозначается числом 1.

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
