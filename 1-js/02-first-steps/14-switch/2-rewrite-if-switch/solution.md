<<<<<<< HEAD
Первые две проверки – обычный `case`, третья разделена на два `case`:

```js run
const number = +prompt('Введите число между 0 и 3', '');

switch (number) {
  case 0:
    alert('Вы ввели число 0');
    break;

  case 1:
    alert('Вы ввели число 1');
=======
The first two checks turn into two `case`. The third check is split into two cases:

```js run
let a = +prompt('a?', '');

switch (a) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
    break;

  case 2:
  case 3:
<<<<<<< HEAD
    alert('Вы ввели число 2, а может и 3');
=======
    alert( '2,3' );
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
*!*
    break;
*/!*
}
```

<<<<<<< HEAD
Обратите внимание: `break` внизу не обязателен, но ставится по «правилам хорошего тона».

Допустим, он не стоит. Есть шанс, что в будущем нам понадобится добавить в конец ещё один `case`, например `case 4`, и мы, вполне вероятно, забудем этот `break` поставить. В результате выполнение `case 2/case 3` продолжится на `case 4` и будет ошибка.
=======
Please note: the `break` at the bottom is not required. But we put it to make the code future-proof.

In the future, there is a chance that we'd want to add one more `case`, for example `case 4`. And if we forget to add a break before it, at the end of `case 3`, there will be an error. So that's a kind of self-insurance.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
