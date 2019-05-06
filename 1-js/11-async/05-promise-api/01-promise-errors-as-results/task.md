# Отказоустойчивый Promise.all

Мы бы хотели загрузить несколько ссылок параллельно.

Как можно это сделать:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

Promise.all(urls.map(url => fetch(url)))
  // for each response show its status
  .then(responses => { // (*)
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`);
    }
  });
```

Проблема в том, что если какой-нибудь промис завершится ошибкой, то `Promise.all` вернёт эту ошибку и мы потеряем уже загруженные ссылки.

Это не хорошо.

Исправьте код так, чтобы массив `responses` в строке `(*)` включал в себя объекты с успешно выполненными запросами и объекты с ошибками.

Например, если одна из указанных ссылок некорректная, то результат должен быть примерно таким:

```js
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'http://no-such-url'
];

Promise.all(...) // код для получения данных с указанных ссылок
  // ...и передаём полученные ошибки в качестве элементов массива...
  .then(responses => {  
    // 3 ссылки => 3 элемента массива
    alert(responses[0].status); // 200
    alert(responses[1].status); // 200
    alert(responses[2]); // TypeError: failed to fetch (сообщение ошибки зависит от браузера)
  });
```

P.S. В этой задаче вам не надо загружать всю страницу, используя `response.text()` или `response.json()`. Просто обработайте ошибки правильно.
