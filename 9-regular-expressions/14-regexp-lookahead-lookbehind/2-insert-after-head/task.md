# Insert After Head

<<<<<<< HEAD
У нас есть строка с HTML-документом.

Напишите  регулярное выражение которое вставляет `<h1>Hello</h1>` сразу же после тега `<body>`. У тега могут быть атрибуты.
=======
We have a string with an HTML Document.

Write a regular expression that inserts `<h1>Hello</h1>` immediately after `<body>` tag. The tag may have attributes.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

For instance:

```js
let regexp = /your regular expression/;

let str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;

str = str.replace(regexp, `<h1>Hello</h1>`);
```

<<<<<<< HEAD
После этого значение `str`:
=======
After that the value of `str` should be:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```html
<html>
  <body style="height: 200px"><h1>Hello</h1>
  ...
  </body>
</html>
```
