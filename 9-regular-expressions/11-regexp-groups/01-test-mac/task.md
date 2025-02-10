# Проверьте MAC-адрес

[MAC-адрес](https://ru.wikipedia.org/wiki/MAC_address) сетевого интерфейса состоит из 6-ти двузначных шестнадцатеричных чисел, разделённых двоеточиями.

Например: `subject:'01:32:54:67:89:AB'`.

Напишите регулярное выражение, которое проверит, является ли строка MAC-адресом.

Использование:
```js
let regexp = /ваш regexp/;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false (нет двоеточий)

alert( regexp.test('01:32:54:67:89') ); // false (5 чисел, должно быть 6)

<<<<<<< HEAD
alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ в конце строки)
=======
alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ at the end)
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
```
