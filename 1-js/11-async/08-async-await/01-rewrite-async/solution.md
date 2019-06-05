
Комментарии к решению под кодом:

```js run
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

Комментарии:

1. Функция `loadJson` теперь асинхронная.
2. Все `.then` внутри неё заменены на `await`.
3. Можно было бы просто вернуть промис во внешний код `return response.json()`, вот так:

    ```js
    if (response.status == 200) {
      return response.json(); // (3)
    }
    ```

    Тогда внешнему коду пришлось бы получать результат промиса самостоятельно (через `.then` или `await`). В нашем варианте это не обязательно.
4. Выброшенная из `loadJson` ошибка перехватывается с помощью `.catch`. Здесь нельзя использовать `await loadJson(…)`, так как мы находимся не в теле функции `async`.
