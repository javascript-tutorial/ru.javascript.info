importance: 5

---

<<<<<<< HEAD
# Исправьте сложение

Ниже приведён код, который запрашивает у пользователя два числа и показывает их сумму.

Он работает неправильно. Код в примере выводит `12` (для значения полей по умолчанию).

В чём ошибка? Исправьте её. Результат должен быть `3`.

```js run
let a = prompt("Первое число?", 1);
let b = prompt("Второе число?", 2);
=======
# Fix the addition

Here's a code that asks the user for two numbers and shows their sum.

It works incorrectly. The output in the example below is `12` (for default prompt values).

Why? Fix it. The result should be `3`.

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

alert(a + b); // 12
```
