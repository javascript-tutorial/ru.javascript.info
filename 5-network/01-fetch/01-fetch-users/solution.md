
Чтобы получить сведения о пользователе, нам нужно:

1. `fetch('https://api.github.com/users/USERNAME')`.
2. Если в ответ приходит статус `200`, вызываем метод `.json()`, чтобы прочитать JS-объект.

Если запрос завершается ошибкой или код статуса в ответе отличен от 200, то мы просто возвращаем `null` в массиве результатов.

Вот код:

```js demo
async function getUsers(names) {
  let jobs = [];

  for(let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      failResponse => {
        return null;
      }
    );
    jobs.push(job);
  }

  let results = await Promise.all(jobs);

  return results;
}
```

Пожалуйста, обратите внимание: вызов `.then` идёт сразу после `fetch`, то есть когда ответ получен, сразу начинаем считывание данных с помощью `.json()`, не дожидаясь завершения других запросов.

Если бы мы использовали `await Promise.all(names.map(name => fetch(...)))` и вызывали бы `.json()` на результатах запросов, то пришлось бы ждать, пока завершатся все из них. Вызывая `.json()` сразу после каждого `fetch`, мы добились того, что считывание присланных по каждому запросу данных происходит независимо от других запросов.

Это пример того, как относительно низкоуровневое `Promise` API может быть полезным, даже если мы в основном используем `async/await` в коде.
