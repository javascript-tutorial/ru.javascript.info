The solution using a loop:

```js run
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(100) );
```

The solution using recursion:

```js run
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert( sumTo(100) );
```

The solution using the formula: `sumTo(n) = n*(n+1)/2`:

```js run
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
```

P.S. Naturally, the formula is the fastest solution. It uses only 3 operations for any number `n`. The math helps!

The loop variant is the second in terms of speed. In both the recursive and the loop variant we sum the same numbers. But the recursion involves nested calls and execution stack management. That also takes resources, so it's slower.

P.P.S. The standard describes a "tail call" optimization: if the recursive call is the very last one in the function (like in `sumTo` above), then the outer function will not need to resume the execution and we don't need to remember its execution context. In that case `sumTo(100000)` is countable. But if your JavaScript engine does not support it, there will be an error: maximum stack size exceeded, because there's usually a limitation on the total stack size.
