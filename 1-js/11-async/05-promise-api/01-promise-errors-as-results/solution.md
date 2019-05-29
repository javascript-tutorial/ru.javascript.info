Решение задачи довольно простое.

Посмотрите:

```js
Promise.all(
  fetch('https://api.github.com/users/iliakan'),
  fetch('https://api.github.com/users/remy'),
  fetch('http://no-such-url')
)
```

Тут у нас массив, состоящий из промисов `fetch(...)`, который передаётся в `Promise.all`.

Мы не можем поменять работу `Promise.all`: при ошибке в любом из входящих в него промисов - весь Promise.all завершится с этой ошибкой.

Вот так:

```js
Promise.all(
  fetch('https://api.github.com/users/iliakan').catch(err => err),
  fetch('https://api.github.com/users/remy').catch(err => err),
  fetch('http://no-such-url').catch(err => err)
)
```

Другими словами, `.catch` перехватывает ошибки в промисах и возвращает их как нормальный результат. Согласно документации, если `.then/catch` вернёт значение (не важно, ошибка это или что-то другое), тогда выполнение продолжится в "нормальном" потоке.

Итак, `.catch` вернёт ошибку как "нормальный" результат в `Promise.all`.

Этот код:
```js
Promise.all(
  urls.map(url => fetch(url))
)
```

Можно переписать так:

```js
Promise.all(
  urls.map(url => fetch(url).catch(err => err))
)
```
