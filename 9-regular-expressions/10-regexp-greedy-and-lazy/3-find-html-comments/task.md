# Поиск HTML-комментариев

Найти все HTML-комментарии в тексте:

```js
let regexp = /ваше регулярное выражение/g;

let str = `... <!-- My -- comment
 test --> ..  <!----> .. 
`;

alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'
```
