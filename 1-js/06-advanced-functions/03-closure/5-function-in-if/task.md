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
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
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
