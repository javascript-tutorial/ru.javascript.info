
# Перепишите, используя async/await

<<<<<<< HEAD
Ниже пример из раздела <info:promise-chaining>, перепишите его, используя `async/await` вместо `.then/catch`.
=======
Below you can find the "rethrow" example. Rewrite it using `async/await` instead of `.then/catch`.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

В функции `demoGithubUser` замените рекурсию на цикл: используя `async/await`, сделать это будет просто.

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
}

// Запрашивать логин, пока github не вернёт существующего пользователя.
function demoGithubUser() {
  let name = prompt("Введите логин?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Полное имя: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```
