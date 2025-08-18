
Используем `setInterval`:

```js run
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// использование:
printNumbers(5, 10);
```

Используем рекурсивный `setTimeout`:

```js run
function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// использование:
printNumbers(5, 10);
```

Заметим, что в обоих решениях есть начальная задержка перед первым выводом. Она составляет одну секунду (1000мс). Если мы хотим, чтобы функция запускалась сразу же, то надо добавить такой запуск вручную на отдельной строке, вот так:

```js run
function printNumbers(from, to) {
  let current = from;

  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }

*!*
  go();
*/!*
  let timerId = setInterval(go, 1000);
}

printNumbers(5, 10);
```

В примере выше будет ошибка для случая printNumbers(5, 5) при обращение к timerId. Можно использовать var для всплытия или вынести timerId в начало функции

```js run
function printNumbers(from, to) {
  let timerId
  let current = from;

  function go() {
    alert(current);
    if (current == to && timerId) {
      clearInterval(timerId);
    }
    current++;
  }

*!*
  go();
*/!*
  if (current <= to) {
    timerId = setInterval(go, 1000);
  }
}

printNumbers(5, 10);
```
