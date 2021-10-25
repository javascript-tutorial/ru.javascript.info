важность: 5

---

# Депозитный калькулятор

Создайте интерфейс, позволяющий ввести сумму банковского вклада и процент, а затем рассчитать, какая это будет сумма через заданный промежуток времени.

Демо-версия:

[iframe src="solution" height="350" border="1"]

Любое изменение введённых данных должно быть обработано немедленно.

Формула:
```js
<<<<<<< HEAD
// initial: начальная сумма денег
// interest: проценты, например, 0.05 означает 5% в год
// years: сколько лет ждать
let result = Math.round(initial * (1 + interest * years));
=======
// initial: the initial money sum
// interest: e.g. 0.05 means 5% per year
// years: how many years to wait
let result = Math.round(initial * (1 + interest) ** years);
>>>>>>> 3699f73b4ccb2a57ac5ef990d2687bf31ccf564c
```
