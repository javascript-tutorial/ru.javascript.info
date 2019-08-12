Разница в поведении станет очевидной, если рассмотреть код внутри функции.

Поведение будет различным, если управление каким-то образом выпрыгнет из `try..catch`.

Например, когда есть `return` внутри `try..catch`. Секция `finally` работает в любом случае при *любом* выходе из `try..catch`, даже через `return`: сразу после того как `try..catch` выполнится, но до того, как вызывающий код получит контроль.

```js run
function f() {
  try {
    alert('начало');
*!*
    return "result";
*/!*
  } catch (e) {
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
    alert('начало');
    throw new Error("ошибка");
  } catch (e) {
    // ...
    if("не могу обработать ошибку") {
*!*
      throw e;
*/!*
    }

  } finally {
    alert('очистка!')
  }
}

f(); // очистка!
```

<<<<<<< HEAD
Именно `finally` гарантирует очистку. Если мы просто поместим код в конце `f`, то он не выполнится в описанных ситуациях.
=======
It's `finally` that guarantees the cleanup here. If we just put the code at the end of `f`, it wouldn't run in these situations.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
