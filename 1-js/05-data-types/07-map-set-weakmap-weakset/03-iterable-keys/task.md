importance: 5

---

# Итерируемые ключи

Нам нужно получить массив `map.keys()` и продолжить работать с ними (а не с объектом Map).

Но у нас есть проблема:

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
