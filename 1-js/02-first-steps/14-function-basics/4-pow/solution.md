
```js run demo
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
<<<<<<< HEAD
  alert(`Степень ${n} не поддерживается, используйте натуральное число`);
=======
  alert(`Power ${n} is not supported, use a positive integer`);
>>>>>>> f72405a263e1d1adbc8d17179ee46af70842bb55
} else {
  alert( pow(x, n) );
}
```
