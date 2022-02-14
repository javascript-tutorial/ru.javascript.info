

```js run demo
let userName = prompt("Кто там?", '');

<<<<<<< HEAD
if (userName === 'Админ') {
=======
if (userName === 'Admin') {
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

  let pass = prompt('Пароль?', '');

<<<<<<< HEAD
  if (pass === 'Я главный') {
    alert( 'Здравствуйте!' );
  } else if (pass === '' || pass === null) {
    alert( 'Отменено' );
=======
  if (pass === 'TheMaster') {
    alert( 'Welcome!' );
  } else if (pass === '' || pass === null) {
    alert( 'Canceled' );
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834
  } else {
    alert( 'Неверный пароль' );
  }

} else if (userName === '' || userName === null) {
<<<<<<< HEAD
  alert( 'Отменено' );
=======
  alert( 'Canceled' );
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834
} else {
  alert( "Я вас не знаю" );
}
```

Обратите внимание на вертикальные отступы внутри блоков `if`. Они технически не требуются, но делают код более читаемым.
