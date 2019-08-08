```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('выполнилось через 3 секунды'));
```

Заметьте, что `resolve` вызывается без аргументов. Мы не возвращаем из `delay` ничего, просто гарантируем задержку.
