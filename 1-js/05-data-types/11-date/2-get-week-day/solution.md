Метод `date.getDay()` возвращает номер дня недели, начиная с воскресенья.

Создадим массив дней недели, чтобы получить имя нужного дня по его номеру:

```js run demo
function getWeekDay(date) {
  let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 января 2014 года
alert( getWeekDay(date) ); // ПТ
```
