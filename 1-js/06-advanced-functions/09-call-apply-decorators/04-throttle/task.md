importance: 5

---

# Тормозящий (throttling) декоратор

<<<<<<< HEAD
Создайте "тормозящий" декоратор `throttle(f, ms)`, который возвращает обёртку, передавая вызов в `f` не более одного раза в `ms` миллисекунд. Те вызовы, которые попадают в период "торможения", игнорируются.

**Отличие от `debounce` - если проигнорированный вызов является последним во время "задержки", то он выполняется в конце.**
=======
Create a "throttling" decorator `throttle(f, ms)` -- that returns a wrapper.

When it's called multiple times, it passes the call to `f` at maximum once per `ms` milliseconds.

The difference with debounce is that it's completely different decorator:
- `debounce` runs the function once after the "cooldown" period. Good for processing the final result.
- `throttle` runs it not more often than given `ms` time. Good for regular updates that shouldn't be very often.

In other words, `throttle` is like a secretary that accepts phone calls, but bothers the boss (calls the actual `f`) not more often than once per `ms` milliseconds.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Давайте рассмотрим реальное применение, чтобы лучше понять это требование и выяснить, откуда оно взято.

**Например, мы хотим отслеживать движения мыши.**

<<<<<<< HEAD

В браузере мы можем объявить функцию, которая будет запускаться при каждом движении указателя и получать его местоположение. Во время активного использования мыши эта функция запускается очень часто, это может происходить около 100 раз в секунду (каждые 10 мс).
=======
In a browser we can setup a function to run at every mouse movement and get the pointer location as it moves. During an active mouse usage, this function usually runs very frequently, can be something like 100 times per second (every 10 ms).
**We'd like to update some information on the web-page when the pointer moves.**
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

**Мы бы хотели обновлять информацию на странице при передвижениях.**

...Но функция обновления `update()` слишком ресурсоёмкая, чтобы делать это при каждом микродвижении. Да и нет смысла делать обновление чаще, чем один раз в 1000 мс.

Поэтому мы обернём вызов в декоратор: будем использовать `throttle(update, 1000)` как функцию, которая будет запускаться при каждом перемещении указателя вместо оригинальной `update()`. Декоратор будет вызываться часто, но передавать вызов в `update()` максимум раз в 1000 мс.

Визуально это будет выглядеть вот так:

1. Для первого движения указателя декорированный вариант сразу передаёт вызов в `update`. Это важно, т.к. пользователь сразу видит нашу реакцию на его перемещение.
2. Затем, когда указатель продолжает движение, в течение 1000 мс ничего не происходит. Декорированный вариант игнорирует вызовы.
3. По истечению 1000 мс происходит ещё один вызов `update` с последними координатами.
4. Затем, наконец, указатель где-то останавливается. Декорированный вариант ждёт, пока не истечёт 1000 мс, и затем вызывает `update` с последними координатами. В итоге окончательные координаты указателя тоже обработаны.

Пример кода:

```js
function f(a) {
<<<<<<< HEAD
  console.log(a)
=======
  console.log(a);
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
}

// f1000 передаёт вызовы f максимум раз в 1000 мс
let f1000 = throttle(f, 1000);

f1000(1); // показывает 1
f1000(2); // (ограничение, 1000 мс ещё нет)
f1000(3); // (ограничение, 1000 мс ещё нет)

// когда 1000 мс истекли ...
// ...выводим 3, промежуточное значение 2 было проигнорировано
```

P.S. Аргументы и контекст `this`, переданные в `f1000`, должны быть переданы в оригинальную `f`.
