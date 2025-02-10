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
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
