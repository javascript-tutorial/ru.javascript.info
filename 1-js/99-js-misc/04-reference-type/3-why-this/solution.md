
Вот как это объясняется.

1. Это обычный вызов метода объекта через точку `.`, и `this` ссылается на объект перед точкой.
	
2. Здесь то же самое. Круглые скобки (оператор группировки) тут не изменяют порядок выполнения операций - доступ к методу через точку в любом случае срабатывает первым.

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/solution.md
3. Здесь мы имеем более сложный вызов `(expression).method()`. Такой вызов работает, как если бы он был разделён на 2 строчки:
=======
2. The same, parentheses do not change the order of operations here, the dot is first anyway.

3. Here we have a more complex call `(expression)()`. The call works as if it were split into two lines:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/99-js-misc/04-reference-type/3-why-this/solution.md

    ```js no-beautify
    f = obj.go; // вычисляется выражение (переменная f ссылается на код функции)
    f();        // вызов функции, на которую ссылается f
    ```
    
    Здесь `f()` выполняется как функция, без передачи значения `this`.

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/solution.md
4. Тут похожая ситуация на случай `(3)` - идёт потеря значения `this`.
=======
    Here `f()` is executed as a function, without `this`.

4. The similar thing as `(3)`, to the left of the parentheses `()` we have an expression.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/99-js-misc/04-reference-type/3-why-this/solution.md

Чтобы объяснить поведение в примерах `(3)` и `(4)`, нам нужно помнить, что доступ к свойству (через точку или квадратные скобки) возвращает специальное значение ссылочного типа (Reference Type).

За исключением вызова метода, любая другая операция (подобно операции присваивания `=` или сравнения через логические операторы, например `||`) превращает это значение в обычное, которое не несёт информации, позволяющей установить `this`.

