```js run demo
function filterRange(arr, startRange, endRange) {
  // добавлены скобки вокруг выражения для улучшения читабельности
  return arr.filter(item => (startRange <= item && item <= endRange));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1 (совпадающие значения)

alert( arr ); // 5,3,8,1 (без изменений)
```
