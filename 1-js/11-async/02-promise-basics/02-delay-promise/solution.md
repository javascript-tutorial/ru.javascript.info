```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('runs after 3 seconds'));
```

Заметьте, что `resolve` вызывается без аргументов. Мы не возвращаем из `delay` ничего, просто гарантируем задержку.