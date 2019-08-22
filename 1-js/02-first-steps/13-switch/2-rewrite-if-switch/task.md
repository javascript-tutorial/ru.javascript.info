importance: 4

---

# Переписать условия "if" на "switch"

Перепишите код с использованием одной конструкции `switch`:

```js run
const number = +prompt('Number between 0 and 3', '');

if (number == 0) {
  alert( 0 );
}
if (number == 1) {
  alert( 1 );
}

if (number == 2 || number == 3) {
  alert( '2,3' );
}
```
