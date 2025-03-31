<<<<<<< HEAD
Ответ: **Pete**.

Функция `work()` в приведенном ниже коде получает `name` из места его происхождения через ссылку на внешнее лексическое окружение:

![](lexenv-nested-work.svg)

Таким образом, в результате мы получаем `"Pete"`.

Но если бы в `makeWorker()` не было `let name`, то поиск шел бы снаружи и брал глобальную переменную, что мы видим из приведенной выше цепочки. В этом случае результатом было бы `"John"`.
=======
The answer is: **Pete**.

The `work()` function in the code below gets `name` from the place of its origin through the outer lexical environment reference:

![](lexenv-nested-work.svg)

So, the result is `"Pete"` here.

But if there were no `let name` in `makeWorker()`, then the search would go outside and take the global variable as we can see from the chain above. In that case the result would be `"John"`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
