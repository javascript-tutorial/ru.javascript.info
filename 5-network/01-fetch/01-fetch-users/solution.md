
<<<<<<< HEAD
Чтобы получить сведения о пользователе, нам нужно вызвать `fetch('https://api.github.com/users/USERNAME')`.

Если ответ приходит cо статусом `200`, то вызываем метод `.json()`, чтобы прочитать JS-объект.

А если запрос завершается ошибкой или код статуса в ответе отличен от 200, то мы просто возвращаем `null` в массиве результатов.
=======
To fetch a user we need: `fetch('https://api.github.com/users/USERNAME')`.

If the response has status `200`, call `.json()` to read the JS object.

Otherwise, if a `fetch` fails, or the response has non-200 status, we just return `null` in the resulting arrray.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

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

Пожалуйста, обратите внимание: вызов `.then` прикреплён к `fetch`, чтобы, когда ответ получен, сразу начинать считывание данных с помощью `.json()`, не дожидаясь завершения других запросов.

Если бы мы использовали `await Promise.all(names.map(name => fetch(...)))` и вызывали бы `.json()` на результатах запросов, то пришлось бы ждать, пока завершатся все из них. Вызывая `.json()` сразу после каждого `fetch`, мы добились того, что считывание присланных по каждому запросу данных происходит независимо от других запросов.

<<<<<<< HEAD
Это пример того, как относительно низкоуровневое Promise API может быть полезным, даже если мы в основном используем `async/await` в коде.
=======
That's an example of how low-level Promise API can still be useful even if we mainly use `async/await`.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
