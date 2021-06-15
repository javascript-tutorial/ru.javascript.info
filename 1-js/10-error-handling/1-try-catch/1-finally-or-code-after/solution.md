Разница в поведении станет очевидной, если рассмотреть код внутри функции.

<<<<<<< HEAD
Поведение будет различным, если управление каким-то образом выпрыгнет из `try..catch`.

Например, когда есть `return` внутри `try..catch`. Секция `finally` работает в любом случае при *любом* выходе из `try..catch`, даже через `return`: сразу после того как `try..catch` выполнится, но до того, как вызывающий код получит контроль.
=======
The behavior is different if there's a "jump out" of `try...catch`.

For instance, when there's a `return` inside `try...catch`. The `finally` clause works in case of *any* exit from `try...catch`, even via the `return` statement: right after `try...catch` is done, but before the calling code gets the control.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function f() {
  try {
    alert('начало');
*!*
    return "result";
*/!*
  } catch (err) {
    /// ...
  } finally {
    alert('очистка!');
  }
}

f(); // очистка!
```

...Или когда есть `throw`, например, как здесь:

```js run
function f() {
  try {
<<<<<<< HEAD
    alert('начало');
    throw new Error("ошибка");
  } catch (e) {
=======
    alert('start');
    throw new Error("an error");
  } catch (err) {
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    // ...
    if("не могу обработать ошибку") {
*!*
      throw err;
*/!*
    }

  } finally {
    alert('очистка!')
  }
}

f(); // очистка!
```

Именно `finally` гарантирует очистку. Если мы просто поместим код в конце `f`, то он не выполнится в описанных ситуациях.
