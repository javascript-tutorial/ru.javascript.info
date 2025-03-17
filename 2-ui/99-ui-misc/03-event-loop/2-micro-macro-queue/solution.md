<<<<<<< HEAD
Вывод в консоли: 1 7 3 5 2 6 4.

Задача довольно простая, нужно лишь понимать, как работают очереди микрозадач и макрозадач.

Давайте разберем, что здесь происходит, по шагам.

```js
console.log(1);
// Первая строка выполняется сразу и выводит `1`.
// Очереди микрозадач и макрозадач на данный момент пусты.

setTimeout(() => console.log(2));
// `setTimeout` ставит переданный колбэк в очередь макрозадач
// - содержимое очереди макрозадач:
//   `console.log(2)`

Promise.resolve().then(() => console.log(3));
// В очередь микрозадач ставится колбэк, выводящий `3`
// - содержимое очереди микрозадач:
//   `console.log(3)`

Promise.resolve().then(() => setTimeout(() => console.log(4)));
// В очередь микрозадач ставится колбэк с `setTimeout`
// - содержимое очереди микрозадач:
//   `console.log(3); setTimeout(...4)`

Promise.resolve().then(() => console.log(5));
// В очередь микрозадач ставится колбэк, выводящий `5`
// - содержимое очереди микрозадач:
//   `console.log(3); setTimeout(...4); console.log(5)`

setTimeout(() => console.log(6));
// `setTimeout` ставит переданный колбэк в очередь макрозадач
// - содержимое очереди макрозадач:
//   `console.log(2); console.log(6)`

console.log(7);
// Тут же выводит `7`.
```

Итак, получается, что:

1. Числа `1` и `7` выводятся сразу же, так как они не используют очереди задач вообще.
2. Далее после окончания основного потока кода срабатывает очередь микрозадач.
    - Её содержимое: `console.log(3); setTimeout(...4); console.log(5)`.
    - Выведется `3` и `5`, а `setTimeout(() => console.log(4))` поставит в конец очереди макрозадач вывод `4`.
    - В очереди макрозадач получается теперь: `console.log(2); console.log(6); console.log(4)`.
3. Очередь микрозадач полностью выполнена, срабатывает очередь макрозадач. Она выведет `2`, `6`, `4`.

Получается вывод `1 7 3 5 2 6 4`.
=======
The console output is: 1 7 3 5 2 6 4.

The task is quite simple, we just need to know how microtask and macrotask queues work.

Let's see what's going on, step by step.

```js
console.log(1);
// The first line executes immediately, it outputs `1`.
// Macrotask and microtask queues are empty, as of now.

setTimeout(() => console.log(2));
// `setTimeout` appends the callback to the macrotask queue.
// - macrotask queue content:
//   `console.log(2)`

Promise.resolve().then(() => console.log(3));
// The callback is appended to the microtask queue.
// - microtask queue content:
//   `console.log(3)`

Promise.resolve().then(() => setTimeout(() => console.log(4)));
// The callback with `setTimeout(...4)` is appended to microtasks
// - microtask queue content:
//   `console.log(3); setTimeout(...4)`

Promise.resolve().then(() => console.log(5));
// The callback is appended to the microtask queue
// - microtask queue content:
//   `console.log(3); setTimeout(...4); console.log(5)`

setTimeout(() => console.log(6));
// `setTimeout` appends the callback to macrotasks
// - macrotask queue content:
//   `console.log(2); console.log(6)`

console.log(7);
// Outputs 7 immediately.
```

To summarize,

1. Numbers `1` and `7` show up immediately, because simple `console.log` calls don't use any queues.
2. Then, after the main code flow is finished, the microtask queue runs.
    - It has commands: `console.log(3); setTimeout(...4); console.log(5)`.
    - Numbers `3` and `5` show up, while `setTimeout(() => console.log(4))` adds the `console.log(4)` call to the end of the macrotask queue.
    - The macrotask queue is now: `console.log(2); console.log(6); console.log(4)`.
3. After the microtask queue becomes empty, the macrotask queue executes. It outputs `2`, `6`, `4`.

Finally, we have the output: `1 7 3 5 2 6 4`.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
