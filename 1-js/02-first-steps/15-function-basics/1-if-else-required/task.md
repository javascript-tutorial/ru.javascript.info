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
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

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
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
  }
*/!*
}
```

<<<<<<< HEAD
Будет ли эта функция работать как-то иначе, если убрать `else`?
=======
Will the function work differently if `else` is removed?
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

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
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
*/!*
}
```

<<<<<<< HEAD
Есть ли хоть одно отличие в поведении этого варианта?
=======
Is there any difference in the behavior of these two variants?
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
