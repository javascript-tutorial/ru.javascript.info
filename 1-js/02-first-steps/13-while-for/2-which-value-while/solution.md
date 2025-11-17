<<<<<<< HEAD
Задача демонстрирует, как постфиксные/префиксные варианты могут повлиять на результат, когда используются в сравнениях.

1. **От 1 до 4**
=======
The task demonstrates how postfix/prefix forms can lead to different results when used in comparisons.

1. **From 1 to 4**
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

    ```js run
    let i = 0;
    while (++i < 5) alert( i );
    ```

<<<<<<< HEAD
    Первое значение: `i = 1`, так как операция `++i` сначала увеличит `i`, а потом уже произойдёт сравнение и выполнение `alert`.

    Далее `2, 3, 4…` Значения выводятся одно за другим. Для каждого значения сначала происходит увеличение, а потом – сравнение, так как `++` стоит перед переменной.

    При `i = 4` произойдёт увеличение `i` до `5`, а потом сравнение `while (5 < 5)` – это неверно. Поэтому на этом цикл остановится, и значение `5` выведено не будет.
2. **От 1 до 5**
=======
    The first value is `i = 1`, because `++i` first increments `i` and then returns the new value. So the first comparison is `1 < 5` and the `alert` shows `1`.

    Then follow `2, 3, 4…` -- the values show up one after another. The comparison always uses the incremented value, because `++` is before the variable.

    Finally, `i = 4` is incremented to `5`, the comparison `while(5 < 5)` fails, and the loop stops. So `5` is not shown.
2. **From 1 to 5**
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

    ```js run
    let i = 0;
    while (i++ < 5) alert( i );
    ```

<<<<<<< HEAD
    Первое значение: `i = 1`. Остановимся на нём подробнее. Оператор `i++` увеличивает `i`, возвращая старое значение, так что в сравнении `i++ < 5` будет участвовать `i = 0` (в отличие от `++i < 5`).

    Но последующий вызов `alert` уже не относится к этому выражению, так что получит новый `i = 1`.

    Далее следуют `2, 3, 4…`.

    Остановимся на `i = 4`. Префиксная форма `++i` увеличила бы `i` и использовала бы в сравнении `5`. Но здесь мы имеем постфиксную форму `i++`, поэтому она увеличивает `i` до `5`, но возвращает старое значение. Таким образом, сравнение фактически равно `while (4 < 5)` -- `true`, поэтому срабатывает `alert`.

   Значение `i = 5` -- последнее, так как на следующем шаге `while (5 < 5)` -- `false`.
=======
    The first value is again `i = 1`. The postfix form of `i++` increments `i` and then returns the *old* value, so the comparison `i++ < 5` will use `i = 0` (contrary to `++i < 5`).

    But the `alert` call is separate. It's another statement which executes after the increment and the comparison. So it gets the current `i = 1`.

    Then follow `2, 3, 4…`

    Let's stop on `i = 4`. The prefix form `++i` would increment it and use `5` in the comparison. But here we have the postfix form `i++`. So it increments `i` to `5`, but returns the old value. Hence the comparison is actually `while(4 < 5)` -- true, and the control goes on to `alert`.

    The value `i = 5` is the last one, because on the next step `while(5 < 5)` is false.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
