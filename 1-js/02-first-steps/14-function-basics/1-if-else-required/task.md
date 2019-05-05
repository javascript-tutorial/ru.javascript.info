importance: 4

---

# Обязателен ли "else"?

Следующая функция возвращает `true`, если параметр `age` больше `18`.

В ином случае она задаёт вопрос посредством вызова `confirm` и возвращает его результат:

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Did parents allow you?');
  }
*/!*
}
```

Будет ли эта функция работать как-то иначе, если убрать `else`?

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Did parents allow you?');
*/!*
}
```

Есть ли хоть одно отличие в поведении этого варианта?
