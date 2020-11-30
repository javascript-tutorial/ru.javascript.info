<<<<<<< HEAD
По определению факториал `n!` можно записать как `n * (n-1)!`.
=======
By definition, a factorial `n!` can be written as `n * (n-1)!`.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Другими словами, `factorial(n)` можно получить как `n` умноженное на результат `factorial(n-1)`. И результат для `n-1`, в свою очередь, может быть вычислен рекурсивно и так далее до `1`.

```js run
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```

Базисом рекурсии является значение `1`. А можно было бы сделать базисом и `0`, однако это добавило рекурсии дополнительный шаг:

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```
