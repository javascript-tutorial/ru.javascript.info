

```js run
let i = 0;

let start = Date.now();

let timer = setInterval(count);

function count() {

  for(let j = 0; j < 1000000; j++) {
    i++;
  }

  if (i == 1000000000) {
    alert("Выполнено в " + (Date.now() - start) + 'ms');
    clearInterval(timer);
  }

}
```
