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
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
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
