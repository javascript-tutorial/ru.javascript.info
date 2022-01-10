Строка, которую мы возвращаем, должна быть не длиннее `maxlength`, поэтому, если мы обрезаем строку, то мы должны убрать на один символ больше, чем `maxlength` — чтобы хватило места на многоточие.

<<<<<<< HEAD
Имейте в виду, что в качестве многоточия здесь используется `…` — ровно один специальный юникодный символ. Это не то же самое, что `...` — три точки.
=======
Note that there is actually a single Unicode character for an ellipsis. That's not three dots.
>>>>>>> 246c600f11b4e6c52b4ae14f83e65319671f998f

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
