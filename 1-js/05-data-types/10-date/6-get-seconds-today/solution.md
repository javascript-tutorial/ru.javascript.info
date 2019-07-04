Чтобы получить количество секунд, нужно сгенерировать объект `date` на самое начало текущего дня -- 00:00:00, а затем вычесть полученное значение из "сейчас".

Разность даст нам количество миллисекунд с начала дня, делим его на 1000 и получаем секунды:

```js run
function getSecondsToday() {
  let now = new Date();

  // создаём объект с текущими днём/месяцем/годом
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // разница в миллисекундах
  return Math.round(diff / 1000); // получаем секунды
}

alert( getSecondsToday() );
```

В качестве альтернативного решения можно получить часы/минуты и преобразовать их в секунды:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}
```
