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
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
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
