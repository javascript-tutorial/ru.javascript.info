
```js run demo
/**
 * Возводит x в степень n (комментарий JSDoc)
 *
 * @param {number} x число, которое возводится в степень
 * @param {number} n степень, должна быть целым числом больше 1
 *
 * @return {number} x в степени n
 */
function pow(x, n) {
  let result = x;

  for (let i = 1; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", '');
let n = prompt("n?", '');

if (n < 1) {
  alert(`Power ${n} is not supported,
    use an integer greater than 0`);
} else {
  alert( pow(x, n) );
}
```
