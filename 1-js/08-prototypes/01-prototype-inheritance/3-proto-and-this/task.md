importance: 5

---

<<<<<<< HEAD
# Куда будет произведена запись?
=======
# Where does it write?
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Объект `rabbit` наследует от объекта `animal`.

Какой объект получит свойство `full` при вызове `rabbit.eat()`: `animal` или `rabbit`? 

```js
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
```
