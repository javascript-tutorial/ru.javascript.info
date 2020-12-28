

```js run demo
let userName = prompt("Кто там?", '');

<<<<<<< HEAD
if (userName == 'Админ') {
=======
if (userName === 'Admin') {
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

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
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293
  } else {
    alert( 'Неверный пароль' );
  }

<<<<<<< HEAD
} else if (userName == '' || userName == null) {
  alert( 'Отменено' );
=======
} else if (userName === '' || userName === null) {
  alert( 'Canceled' );
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293
} else {
  alert( "Я вас не знаю" );
}
```

Обратите внимание на вертикальные отступы внутри блоков `if`. Они технически не требуются, но делают код более читаемым.
