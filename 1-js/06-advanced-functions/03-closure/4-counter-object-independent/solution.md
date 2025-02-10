
<<<<<<< HEAD
Несомненно, он отлично будет работать.

Обе вложенные функции были созданы с одним и тем же внешним лексическим окружением, так что они имеют доступ к одной и той же переменной `count`:
=======
Surely it will work just fine.

Both nested functions are created within the same outer Lexical Environment, so they share access to the same `count` variable:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
<<<<<<< HEAD

=======
  
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1
```
