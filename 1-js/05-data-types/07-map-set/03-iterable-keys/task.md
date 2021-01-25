importance: 5

---

# Перебираемые ключи

<<<<<<< HEAD
Мы хотели бы получить массив ключей `map.keys()` в переменную и далее работать с ними, например, применить метод `.push`.
=======
We'd like to get an array of `map.keys()` in a variable and then apply array-specific methods to it, e.g. `.push`.
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

Но это не выходит:

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Error: keys.push is not a function
// Ошибка: keys.push -- это не функция
keys.push("more");
*/!*
```

Почему? Что нужно поправить в коде, чтобы вызов `keys.push` сработал?
