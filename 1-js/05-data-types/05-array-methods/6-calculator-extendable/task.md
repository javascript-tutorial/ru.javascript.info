importance: 5

---

# Создать расширяемый калькулятор

Создайте функцию конструктор `Calculator`, которая создаёт "расширяемые" объекты калькулятора.

Задание состоит из двух частей.

1. Во-первых, реализуйте метод `calculate(str)`, который принимает строку типа `"1 + 2"` в формате "ЧИСЛО оператор ЧИСЛО" (разделено пробелами) и возвращает результат. Метод должен понимать плюс `+` и минус `-`.

    Пример использования:

    ```js
    let calc = new Calculator;

    alert( calc.calculate("3 + 7") ); // 10
    ```
2. Затем добавьте метод `addMethod(name, func)`, который добавляет в калькулятор новые операции. Он принимает оператор `name` и функцию с двумя аргументами `func(a,b)`, которая описывает его.

    Например, давайте добавим умножение `*`, деление `/` и возведение в степень `**`:

    ```js
    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);

    let result = powerCalc.calculate("2 ** 3");
    alert( result ); // 8
    ```

<<<<<<< HEAD
- Для этой задачи не нужны скобки или сложные выражения.
- Числа и оператор разделены ровно одним пробелом.
- Не лишним будет добавить обработку ошибок.
=======
- No parentheses or complex expressions in this task.
- The numbers and the operator are delimited with exactly one space.
- There may be error handling if you'd like to add it.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
