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
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
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
