importance: 5

---
<<<<<<< HEAD
# Функция внутри if

Посмотрите на код. Какой будет результат у вызова на последней строке?

**Обратите внимание:** результат зависит от режима выполнения кода. Здесь используется строгий режим `"use strict"`. 

```js
=======
# Function in if

Look at the code. What will be the result of the call at the last line?

```js run
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
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
