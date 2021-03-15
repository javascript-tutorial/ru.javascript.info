

```js run demo
let userName = prompt("Кто там?", '');

<<<<<<< HEAD
if (userName == 'Админ') {
=======
if (userName === 'Admin') {
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

  let pass = prompt('Пароль?', '');

<<<<<<< HEAD
  if (pass == 'Я главный') {
    alert( 'Здравствуйте!' );
  } else if (pass == '' || pass == null) {
    alert( 'Отменено' );
=======
  if (pass === 'TheMaster') {
    alert( 'Welcome!' );
  } else if (pass === '' || pass === null) {
    alert( 'Canceled' );
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69
  } else {
    alert( 'Неверный пароль' );
  }

<<<<<<< HEAD
} else if (userName == '' || userName == null) {
  alert( 'Отменено' );
=======
} else if (userName === '' || userName === null) {
  alert( 'Canceled' );
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69
} else {
  alert( "Я вас не знаю" );
}
```

Обратите внимание на вертикальные отступы внутри блоков `if`. Они технически не требуются, но делают код более читаемым.
