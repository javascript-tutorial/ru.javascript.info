Для решения задачи сгенерируем таблицу в виде строки: `"<table>...</table>"`, а затем присвоим в `innerHTML`.

Алгоритм:

<<<<<<< HEAD
1. Создать заголовок таблицы с `<th>` и именами дней недели.
2. Создать объект даты `d = new Date(year, month-1)`.  Это первый день месяца `month` (с учётом того, что месяцы в JS начинаются от 0, а не от 1).
3. Ячейки первого ряда пустые от начала и до дня недели `d.getDay()`, с которого начинается месяц. Заполним `<td></td>`.
4. Увеличить день в `d`: `d.setDate(d.getDate()+1)`. Если `d.getMonth()` ещё не в следующем месяце, то добавим новую ячейку `<td>` в календарь. Если это воскресенье, то добавим новую строку <code>"&lt;/tr&gt;&lt;tr&gt;"</code>.
5. Если месяц закончился, но строка таблицы ещё не заполнена, добавим в неё пустые `<td>`, чтобы сделать в календаре красивые пустые квадратики.
=======
1. Create the table header with `<th>` and weekday names.
2. Create the date object `d = new Date(year, month-1)`. That's the first day of `month` (taking into account that months in JavaScript start from `0`, not `1`).
3. First few cells till the first day of the month `d.getDay()` may be empty. Let's fill them in with `<td></td>`.
4. Increase the day in `d`: `d.setDate(d.getDate()+1)`. If `d.getMonth()` is not yet the next month, then add the new cell `<td>` to the calendar. If that's a Sunday, then add a newline <code>"&lt;/tr&gt;&lt;tr&gt;"</code>.
5. If the month has finished, but the table row is not yet full, add empty `<td>` into it, to make it square.
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
