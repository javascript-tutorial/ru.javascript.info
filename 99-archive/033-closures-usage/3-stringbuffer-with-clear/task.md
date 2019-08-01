importance: 5

---

# Строковый буфер с очисткой

Добавьте буферу из решения задачи <info:task/stringbuffer> метод `buffer.clear()`, который будет очищать текущее содержимое буфера:

```js
function makeBuffer() {
  ...ваш код...
}

var buffer = makeBuffer();

buffer("Тест");
buffer(" тебя не съест ");
alert( buffer() ); // Тест тебя не съест

*!*
buffer.clear();
*/!*

alert( buffer() ); // ""
```

