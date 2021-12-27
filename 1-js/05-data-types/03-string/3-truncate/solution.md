Строка, которую мы возвращаем, должна быть не длиннее `maxlength`, поэтому, если мы обрезаем строку, то мы должны убрать на один символ больше, чем `maxlength` — чтобы хватило места на многоточие.

<<<<<<< HEAD
Имейте в виду, что в качестве многоточия здесь используется `…` — ровно один специальный юникодный символ. Это не то же самое, что `...` — три точки.
=======
Note that there is actually a single Unicode character for an ellipsis. That's not three dots.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
