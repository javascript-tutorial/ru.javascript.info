importance: 5

---

<<<<<<< HEAD
# Куда будет произведена запись?
=======
# Where does it write?
>>>>>>> 246c600f11b4e6c52b4ae14f83e65319671f998f

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
