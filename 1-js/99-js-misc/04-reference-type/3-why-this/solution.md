
<<<<<<< HEAD
Вот как это объясняется.

1. Это обычный вызов метода объекта через точку `.`, и `this` ссылается на объект перед точкой.
2. Здесь то же самое. Круглые скобки (оператор группировки) тут не изменяют порядок выполнения операций - доступ к методу через точку в любом случае срабатывает первым.
3. Здесь мы имеем более сложный вызов `(expression).method()`. Такой вызов работает, как если бы он был разделён на 2 строчки:

    ```js no-beautify
    f = obj.go; // вычисляется выражение (переменная f ссылается на код функции)
    f();        // вызов функции, на которую ссылается f
    ```
    
    Здесь `f()` выполняется как функция, без передачи значения `this`.
4. Тут похожая ситуация на случай `(3)` - идёт потеря значения `this`.

Чтобы объяснить поведение в примерах `(3)` и `(4)`, нам нужно помнить, что доступ к свойству (через точку или квадратные скобки) возвращает специальное значение ссылочного типа (Reference Type).

За исключением вызова метода, любая другая операция (подобно операции присваивания `=` или сравнения через логические операторы, например `||`) превращает это значение в обычное, которое не несёт информации, позволяющей установить `this`.
=======
Here's the explanations.

1. That's a regular object method call.

2. The same, parentheses do not change the order of operations here, the dot is first anyway.

3. Here we have a more complex call `(expression)()`. The call works as if it were split into two lines:

    ```js no-beautify
    f = obj.go; // calculate the expression
    f();        // call what we have
    ```

    Here `f()` is executed as a function, without `this`.

4. The similar thing as `(3)`, to the left of the parentheses `()` we have an expression.

To explain the behavior of `(3)` and `(4)` we need to recall that property accessors (dot or square brackets) return a value of the Reference Type.  

Any operation on it except a method call (like assignment `=` or `||`) turns it into an ordinary value, which does not carry the information allowing to set `this`.

>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
