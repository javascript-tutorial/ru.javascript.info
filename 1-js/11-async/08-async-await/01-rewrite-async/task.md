
# Перепишите, используя async/await

Перепишите один из примеров раздела <info:promise-chaining>, используя `async/await` вместо `.then/catch`:

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
}

loadJson('no-such-user.json') // (3)
  .catch(alert); // Error: 404
```
