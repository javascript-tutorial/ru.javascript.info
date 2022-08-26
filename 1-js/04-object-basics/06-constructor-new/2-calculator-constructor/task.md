importance: 5

---

# Создайте калькулятор при помощи конструктора, new Calculator

Создайте функцию-конструктор `Calculator`, которая создаёт объекты с тремя методами:

- `read()` запрашивает два значения при помощи `prompt` и сохраняет их значение в свойствах объекта.
- `sum()` возвращает сумму этих свойств.
- `mul()` возвращает произведение этих свойств.

Например:

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
