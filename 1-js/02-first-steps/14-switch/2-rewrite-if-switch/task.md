importance: 4

---

<<<<<<< HEAD
# Переписать условия "if" на "switch"

Перепишите код с использованием одной конструкции `switch`:

```js run
const number = +prompt('Введите число между 0 и 3', '');

if (number === 0) {
  alert('Вы ввели число 0');
}

if (number === 1) {
  alert('Вы ввели число 1');
}

if (number === 2 || number === 3) {
  alert('Вы ввели число 2, а может и 3');
}
```
=======
# Rewrite "if" into "switch"

Rewrite the code below using a single `switch` statement:

```js run
let a = +prompt('a?', '');

if (a == 0) {
  alert( 0 );
}
if (a == 1) {
  alert( 1 );
}

if (a == 2 || a == 3) {
  alert( '2,3' );
}
```

>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
