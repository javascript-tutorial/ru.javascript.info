# Функция в if

<<<<<<< HEAD
Посмотрите на код. Какой будет результат у вызова на последней строке?
=======
# Function in if

Look at the code. What will be the result of the call at the last line?
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```js run
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
