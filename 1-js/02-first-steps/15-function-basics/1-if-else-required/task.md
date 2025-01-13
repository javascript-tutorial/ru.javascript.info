importance: 4

---

<<<<<<< HEAD
# Обязателен ли "else"?

Следующая функция возвращает `true`, если параметр `age` больше `18`.

В ином случае она запрашивает подтверждение через `confirm` и возвращает его результат:
=======
# Is "else" required?

The following function returns `true` if the parameter `age` is greater than `18`.

Otherwise it asks for a confirmation and returns its result:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
<<<<<<< HEAD
    return confirm('Родители разрешили?');
=======
    return confirm('Did parents allow you?');
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
  }
*/!*
}
```

<<<<<<< HEAD
Будет ли эта функция работать как-то иначе, если убрать `else`?
=======
Will the function work differently if `else` is removed?
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
<<<<<<< HEAD
  return confirm('Родители разрешили?');
=======
  return confirm('Did parents allow you?');
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
*/!*
}
```

<<<<<<< HEAD
Есть ли хоть одно отличие в поведении этого варианта?
=======
Is there any difference in the behavior of these two variants?
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
