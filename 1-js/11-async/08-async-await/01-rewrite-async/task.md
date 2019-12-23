
# Перепишите, используя async/await

<<<<<<< HEAD
Перепишите один из примеров раздела <info:promise-chaining>, используя `async/await` вместо `.then/catch`:
=======
Rewrite this example code from the chapter <info:promise-chaining> using `async/await` instead of `.then/catch`:
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0

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
