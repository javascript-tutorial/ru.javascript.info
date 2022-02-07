# Поиск HTML-тегов

Создайте регулярное выражение, чтобы найти все (открывающие и закрывающие) HTML-теги с их атрибутами.

Пример использования:

```js run
let regexp = /ваше регулярное выражение/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert( str.match(regexp) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

<<<<<<< HEAD
В этой задаче мы предполагаем, что теги выглядят как `<...что угодно...>`, и внутри тегов не может быть символов `<` и `>` (первый встреченный `>` закрывает тег).
=======
Here we assume that tag attributes may not contain `<` and `>` (inside quotes too), that simplifies things a bit.
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6
