importance: 5

---

# Создайте калькулятор при помощи конструктора, new Calculator

Создайте функцию-конструктор `Calculator`, которая создаёт объекты с тремя методами:

<<<<<<< HEAD
- `read()` запрашивает два значения при помощи `prompt` и сохраняет их значение в свойствах объекта.
- `sum()` возвращает сумму этих свойств.
- `mul()` возвращает произведение этих свойств.
=======
- `read()` prompts for two values and saves them as object properties with names `a` and `b` respectively.
- `sum()` returns the sum of these properties.
- `mul()` returns the multiplication product of these properties.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

Например:

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
