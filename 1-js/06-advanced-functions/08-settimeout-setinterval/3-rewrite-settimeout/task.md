importance: 4

---

# Перепишите setTimeout на setInterval

Эта функция использует вложенный `setTimeout` для разделения задачи на части.

Перепишите ее, используя `setInterval`:

```js run
let i = 0;

let start = Date.now();

function count() {

  if (i == 1000000000) {
    alert("Выполнено в " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count);
  }

  // часть тяжелой задачи
  for(let j = 0; j < 1000000; j++) {
    i++;
  }

}

count();
```
