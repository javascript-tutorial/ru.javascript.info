importance: 4

---

# Переписать условия "if" на "switch"

Перепишите код с использованием одной конструкции `switch`:

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
