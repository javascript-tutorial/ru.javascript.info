# Функция в if

<<<<<<< HEAD
Посмотрите на код. Какой будет результат у вызова на последней строке?
=======
# Function in if

Look at the code. What will be the result of the call at the last line?
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

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
