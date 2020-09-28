
# Перепишите, используя async/await

<<<<<<< HEAD
Перепишите один из примеров раздела <info:promise-chaining>, используя `async/await` вместо `.then/catch`:
=======
Rewrite this example code from the chapter <info:promise-chaining> using `async/await` instead of `.then/catch`:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

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

loadJson('no-such-user.json')
  .catch(alert); // Error: 404
```
