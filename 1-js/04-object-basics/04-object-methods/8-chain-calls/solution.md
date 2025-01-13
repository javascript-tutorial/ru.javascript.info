Решение состоит в том, чтобы возвращать сам объект из каждого вызова.

```js run demo
let ladder = {
  step: 0,
  up() {
    this.step++;
*!*
    return this;
*/!*
  },
  down() {
    this.step--;
*!*
    return this;
*/!*
  },
  showStep() {
    alert( this.step );
*!*
    return this;
*/!*
  }
};

<<<<<<< HEAD
ladder.up().up().down().showStep().down().showStep(); // показывает 1 затем 0
=======
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```

Мы также можем записать один вызов на одной строке. Для длинных цепей вызовов это более читабельно:

```js
ladder
  .up()
  .up()
  .down()
  .showStep() // 1
  .down()
  .showStep(); // 0
```
