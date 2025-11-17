Мы не можем просто заменить первый символ, так как строки в JavaScript неизменяемы.

Но можно пересоздать строку на основе существующей, с заглавным первым символом:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

Однако есть небольшая проблемка. Если строка пуста, `str[0]` вернёт `undefined`, а у `undefined` нет метода `toUpperCase()`, поэтому мы получим ошибку.

<<<<<<< HEAD
Выхода два:

1. Использовать `str.charAt(0)`, поскольку этот метод всегда возвращает строку (для пустой строки — пустую).
2. Добавить проверку на пустую строку.

Вот второй вариант:
=======
The easiest way out is to add a test for an empty string, like this:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("вася") ); // Вася
```
