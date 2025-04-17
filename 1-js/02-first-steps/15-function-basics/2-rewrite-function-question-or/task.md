importance: 4

---

<<<<<<< HEAD
# Перепишите функцию, используя оператор '?' или '||'

Следующая функция возвращает `true`, если параметр `age` больше `18`.

В ином случае она задаёт вопрос `confirm` и возвращает его результат.
=======
# Rewrite the function using '?' or '||'

The following function returns `true` if the parameter `age` is greater than `18`.

Otherwise it asks for a confirmation and returns its result.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
<<<<<<< HEAD
    return confirm('Родители разрешили?');
=======
    return confirm('Did parents allow you?');
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
  }
}
```

<<<<<<< HEAD
Перепишите функцию, чтобы она делала то же самое, но без `if`, в одну строку.

Сделайте два варианта функции `checkAge`:

1. Используя оператор `?`
2. Используя оператор `||`
=======
Rewrite it, to perform the same, but without `if`, in a single line.

Make two variants of `checkAge`:

1. Using a question mark operator `?`
2. Using OR `||`
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
