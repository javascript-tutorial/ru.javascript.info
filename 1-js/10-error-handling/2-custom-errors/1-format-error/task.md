importance: 5

---

# Наследовать из SyntaxError

Создайте класс `FormatError`, который наследуется из встроенного класса `SyntaxError`.

Класс должен поддерживать свойства `message`, `name` и `stack`.

Пример использования:

```js
let err = new FormatError("ошибка формата");

alert( err.message ); // ошибка формата
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true (потому что наследуется из SyntaxError)
```
