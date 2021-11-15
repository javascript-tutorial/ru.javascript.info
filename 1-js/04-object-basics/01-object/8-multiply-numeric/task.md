importance: 3

---

<<<<<<< HEAD
# Умножаем все числовые свойства на 2

Создайте функцию `multiplyNumeric(obj)`, которая умножает все числовые свойства объекта `obj` на `2`.
=======
# Multiply numeric property values by 2

Create a function `multiplyNumeric(obj)` that multiplies all numeric property values of `obj` by `2`.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Например:

```js
// до вызова функции
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// после вызова функции
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
```

Обратите внимание, что `multiplyNumeric` не нужно ничего возвращать. Следует напрямую изменять объект.

P.S. Используйте `typeof` для проверки, что значение свойства числовое.

