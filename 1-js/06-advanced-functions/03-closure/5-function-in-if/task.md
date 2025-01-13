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
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
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
