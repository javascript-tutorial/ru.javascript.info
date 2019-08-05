Ошибка возникает потому, что конструктор дочернего класса должен вызывать `super()`.

Вот правильный код:

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    *!*
    super(name);
    */!*
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("Белый кролик"); // ошибки нет
*/!*
alert(rabbit.name); // White Rabbit
```
