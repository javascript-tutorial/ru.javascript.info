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
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

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
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
  }
*/!*
}
```

<<<<<<< HEAD
Будет ли эта функция работать как-то иначе, если убрать `else`?
=======
Will the function work differently if `else` is removed?
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

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
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
*/!*
}
```

<<<<<<< HEAD
Есть ли хоть одно отличие в поведении этого варианта?
=======
Is there any difference in the behavior of these two variants?
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
