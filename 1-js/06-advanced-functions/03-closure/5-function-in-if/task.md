# Функция в if

Посмотрите на код. Какой будет результат у вызова на последней строке?

```js
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```
