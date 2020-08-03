importance: 5

---

# Изменяем "prototype"

В коде ниже мы создаём нового кролика `new Rabbit`, а потом пытаемся изменить его прототип.

Сначала у нас есть такой код:

```js run
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

alert( rabbit.eats ); // true
```


<<<<<<< HEAD
1. Добавим одну строчку (выделенную в коде ниже). Что вызов `alert` покажет нам сейчас?
=======
1. We added one more string (emphasized). What will `alert` show now?
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype = {};
    */!*

    alert( rabbit.eats ); // ?
    ```

2. ...А если код такой (заменили одну строчку)?

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype.eats = false;
    */!*

    alert( rabbit.eats ); // ?
    ```

<<<<<<< HEAD
3. Или такой (заменили одну строчку)?
=======
3. And like this (replaced one line)?
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete rabbit.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```

4. Или, наконец, такой:

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete Rabbit.prototype.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```
