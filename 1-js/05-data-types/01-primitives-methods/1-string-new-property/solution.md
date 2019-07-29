
Попробуйте запустить код:

```js run
let str = "Привет";

str.test = 5; // (*)

alert(str.test);
```

В зависимости от того, используете ли вы cтрогий режим (`use strict`) или нет, результат может быть:
1. `undefined` (без strict)
2. Ошибка (strict mode)

Почему? Давайте посмотрим что происходит в строке кода, отмеченной `(*)`:

<<<<<<< HEAD
1. В момент обращения к свойству `str` создаётся "объект-обёртка".
2. В cтрогом режиме, попытка изменения этого объекта выдаёт ошибку.
3. Без строгого режима, операция продолжается, объект получает свойство `test`, но после этого он удаляется, так что на последней линии `str` больше не имеет свойства `test`.

**Данный пример наглядно показывает, что примитивы не являются объектами.**
=======
1. When a property of `str` is accessed, a "wrapper object" is created.
2. In strict mode, writing into it is an error.
3. Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the "wrapper object" disappears, so in the last line `str` has no trace of the property.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

Они не могут хранить дополнительные данные.
