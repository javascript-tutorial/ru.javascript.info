importance: 5

---

# Ошибка создания экземпляра класса

В коде ниже класс `Rabbit` наследует `Animal`.

К сожалению, объект класса `Rabbit` не создаётся. Что не так? Исправьте ошибку.

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    this.name = name;
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
*/!*
alert(rabbit.name);
```
