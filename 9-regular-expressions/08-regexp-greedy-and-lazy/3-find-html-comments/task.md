# Нахождение HTML комментариев

Найти все HTML комментарии в тексте:

```js
let reg = /ваше регулярное выражение/g;

let str = `... <!-- My -- comment
 test --> ..  <!----> .. 
`;

alert( str.match(reg) ); // '<!-- My -- comment \n test -->', '<!---->'
```
