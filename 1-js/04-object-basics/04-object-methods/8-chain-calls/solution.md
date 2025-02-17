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
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
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
