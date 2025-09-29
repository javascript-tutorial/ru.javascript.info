<<<<<<< HEAD
Ответ: `1`.
=======
The answer: `1`.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let i = 3;

while (i) {
  alert( i-- );
}
```

<<<<<<< HEAD
Каждое выполнение цикла уменьшает `i`. Проверка `while(i)` остановит цикл при `i = 0`.

Соответственно, будет такая последовательность шагов цикла ("развернём" цикл):
=======
Every loop iteration decreases `i` by `1`. The check `while(i)` stops the loop when `i = 0`.

Hence, the steps of the loop form the following sequence ("loop unrolled"):
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
let i = 3;

<<<<<<< HEAD
alert(i--); // выведет 3, затем уменьшит i до 2

alert(i--) // выведет 2, затем уменьшит i до 1

alert(i--) // выведет 1, затем уменьшит i до 0

// все, проверка while(i) не даст выполняться циклу дальше
=======
alert(i--); // shows 3, decreases i to 2

alert(i--) // shows 2, decreases i to 1

alert(i--) // shows 1, decreases i to 0

// done, while(i) check stops the loop
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
```
