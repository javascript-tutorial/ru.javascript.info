
# Перепишите, используя async/await

<<<<<<< HEAD
Перепишите один из примеров раздела <info:promise-chaining>, используя `async/await` вместо `.then/catch`:
=======
Rewrite this example code from the chapter <info:promise-chaining> using `async/await` instead of `.then/catch`:
>>>>>>> 0f748275e20a81700c8514f22a7cc80c4422d09c

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404
```
