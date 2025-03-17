<<<<<<< HEAD
Используя оператор `?`:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Родители разрешили?');
}
```

Используя оператор `||` (самый короткий вариант):

```js
function checkAge(age) {
  return (age > 18) || confirm('Родители разрешили?');
}
```

Обратите внимание, что круглые скобки вокруг `age > 18` не обязательны. Они здесь для лучшей читаемости кода.
=======
Using a question mark operator `'?'`:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Did parents allow you?');
}
```

Using OR `||` (the shortest variant):

```js
function checkAge(age) {
  return (age > 18) || confirm('Did parents allow you?');
}
```

Note that the parentheses around `age > 18` are not required here. They exist for better readability.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
