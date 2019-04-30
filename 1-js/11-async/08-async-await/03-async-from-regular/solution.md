
Это тот случай, когда понимание внутреннего устройства работы `async/await` очень кстати.

Здесь нужно думать о вызове функции `async`, как о промисе. И просто воспользоваться `.then`:
```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // покажет 10 через 1 секунду
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
