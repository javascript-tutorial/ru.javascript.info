
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

Обратите внимание, что в обоих решениях есть начальная задержка перед первым выводом. Иногда нам нужно добавить строку, чтобы сделать сразу первый вывод. Это делается просто.

