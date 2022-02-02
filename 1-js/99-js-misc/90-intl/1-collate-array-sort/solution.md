Здесь подойдут стандартные параметры сравнения:

```js run
let animals = ["тигр", "ёж", "енот", "ехидна", "АИСТ", "ЯК"];

*!*
let collator = new Intl.Collator();
animals.sort(function(a, b) {
  return collator.compare(a, b);
});
*/!*

alert( animals ); // АИСТ,ёж,енот,ехидна,тигр,ЯК
```

А вот, что было бы при обычном вызове `sort()`:

```js run
let animals = ["тигр", "ёж", "енот", "ехидна", "АИСТ", "ЯК"];

*!*
alert( animals.sort() ); // АИСТ,ЯК,енот,ехидна,тигр,ёж
*/!*
```

