

```js run demo
let userName = prompt("Кто там?", '');

<<<<<<< HEAD
if (userName == 'Админ') {
=======
if (userName === 'Admin') {
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

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
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b
  } else {
    alert( 'Неверный пароль' );
  }

<<<<<<< HEAD
} else if (userName == '' || userName == null) {
  alert( 'Отменено' );
=======
} else if (userName === '' || userName === null) {
  alert( 'Canceled' );
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b
} else {
  alert( "Я вас не знаю" );
}
```

Обратите внимание на вертикальные отступы внутри блоков `if`. Они технически не требуются, но делают код более читаемым.
