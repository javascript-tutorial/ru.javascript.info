# Insert After Head

<<<<<<< HEAD
У нас есть строка с HTML-документом.

Напишите  регулярное выражение которое вставляет `<h1>Hello</h1>` сразу же после тега `<body>`. У тега могут быть атрибуты.
=======
We have a string with an HTML Document.

Write a regular expression that inserts `<h1>Hello</h1>` immediately after `<body>` tag. The tag may have attributes.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

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
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```html
<html>
  <body style="height: 200px"><h1>Hello</h1>
  ...
  </body>
</html>
```
