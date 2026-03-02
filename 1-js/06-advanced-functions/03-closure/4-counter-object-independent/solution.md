
<<<<<<< HEAD
Несомненно, он отлично будет работать.

Обе вложенные функции были созданы с одним и тем же внешним лексическим окружением, так что они имеют доступ к одной и той же переменной `count`:
=======
Surely it will work just fine.

Both nested functions are created within the same outer Lexical Environment, so they share access to the same `count` variable:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js run
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
<<<<<<< HEAD

=======
  
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1
```
