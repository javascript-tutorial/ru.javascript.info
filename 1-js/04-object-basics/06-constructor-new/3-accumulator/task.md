importance: 5

---

# Создаём Accumulator

Напишите функцию-конструктор `Accumulator(startingValue)`.

Объект, который она создаёт, должен уметь следующее:

- Хранить "текущее значение" в свойстве `value`. Начальное значение устанавливается в аргументе конструктора `startingValue`.
- Метод `read()` использует `prompt` для получения числа и прибавляет его к свойству `value`.

Таким образом, свойство `value` является текущей суммой всего, что ввёл пользователь при вызовах метода `read()`, с учётом начального значения `startingValue`.

Ниже вы можете посмотреть работу кода:

```js
<<<<<<< HEAD
let accumulator = new Accumulator(1); // начальное значение 1

accumulator.read(); // прибавит ввод prompt к текущему значению
accumulator.read(); // прибавит ввод prompt к текущему значению

alert(accumulator.value); // выведет сумму этих значений
=======
let accumulator = new Accumulator(1); // initial value 1

accumulator.read(); // adds the user-entered value
accumulator.read(); // adds the user-entered value

alert(accumulator.value); // shows the sum of these values
>>>>>>> f72405a263e1d1adbc8d17179ee46af70842bb55
```

[demo]
