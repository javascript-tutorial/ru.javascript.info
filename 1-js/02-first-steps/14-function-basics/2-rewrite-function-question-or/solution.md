Используя оператор `?`:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Did parents allow you?');
}
```

Используя оператор `||` (самый короткий вариант):

```js
function checkAge(age) {
  return (age > 18) || confirm('Did parents allow you?');
}
```

Обратите внимание, что круглые скобки вокруг `age > 18` не обязательны. Они здесь для лучшей читаемости кода.
