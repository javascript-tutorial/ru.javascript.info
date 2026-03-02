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
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
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
