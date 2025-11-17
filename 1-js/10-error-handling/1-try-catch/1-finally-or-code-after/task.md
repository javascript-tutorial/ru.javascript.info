importance: 5

---

# Finally или просто код?

Сравните два фрагмента кода.

<<<<<<< HEAD
1. Первый использует `finally` для выполнения кода после `try..catch`:

    ```js
    try {
      начать работу
      работать
    } catch (e) {
      обработать ошибку
=======
1. The first one uses `finally` to execute the code after `try...catch`:

    ```js
    try {
      work work
    } catch (err) {
      handle errors
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
    } finally {
    *!*
      очистить рабочее пространство
    */!*
    }
    ```
<<<<<<< HEAD
2. Второй фрагмент просто ставит очистку после `try..catch`:

    ```js
    try {
      начать работу
      работать
    } catch (e) {
      обработать ошибку
=======
2. The second fragment puts the cleaning right after `try...catch`:

    ```js
    try {
      work work
    } catch (err) {
      handle errors
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
    }

    *!*
    очистить рабочее пространство
    */!*
    ```

Нам определённо нужна очистка после работы, неважно возникли ошибки или нет.

Есть ли здесь преимущество в использовании `finally` или оба фрагмента кода одинаковы? Если такое преимущество есть, то дайте пример, когда оно проявляется.
