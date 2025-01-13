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
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Например:

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
