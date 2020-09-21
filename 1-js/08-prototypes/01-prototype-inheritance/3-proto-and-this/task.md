importance: 5

---

<<<<<<< HEAD
# Куда будет произведена запись?
=======
# Where does it write?
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

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
