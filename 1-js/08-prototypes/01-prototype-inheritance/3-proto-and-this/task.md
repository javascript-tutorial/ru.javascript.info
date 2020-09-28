importance: 5

---

<<<<<<< HEAD
# Куда будет произведена запись?
=======
# Where does it write?
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

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
