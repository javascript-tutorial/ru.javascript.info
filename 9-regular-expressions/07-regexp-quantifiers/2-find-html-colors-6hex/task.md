# Регулярное выражение для HTML-цветов

<<<<<<< HEAD
Напишите регулярное выражение, которое ищет HTML-цвета в формате `#ABCDEF`: первым идёт символ `#`, и потом - 6 шестнадцатеричных символов.
=======
Create a regexp to search HTML-colors written as `#ABCDEF`: first `#` and then 6 hexadecimal characters.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Пример использования:

```js
let reg = /...ваше выражение.../

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert( str.match(reg) )  // #121212,#AA00ef
```

P.S. В рамках этого задания не нужно искать цвета, записанные в иных форматах типа `#123` или `rgb(1,2,3)`.
