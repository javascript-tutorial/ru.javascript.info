importance: 5

---

<<<<<<< HEAD
# Куда будет произведена запись?
=======
# Where does it write?
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

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
