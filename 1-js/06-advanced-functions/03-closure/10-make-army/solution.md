
<<<<<<< HEAD
Давайте посмотрим, что происходит внутри `makeArmy`, и решение станет очевидным.

1. Она создаёт пустой массив `shooters`:
=======
Let's examine what exactly happens inside `makeArmy`, and the solution will become obvious.

1. It creates an empty array `shooters`:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

    ```js
    let shooters = [];
    ```
<<<<<<< HEAD
2. В цикле заполняет его `shooters.push(function...)`.

    Каждый элемент -- это функция, так что получится такой массив:
=======
2. Fills it with functions via `shooters.push(function)` in the loop.

    Every element is a function, so the resulting array looks like this:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

    ```js no-beautify
    shooters = [
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); }
    ];
    ```

<<<<<<< HEAD
3. Функция возвращает массив.

    Позже вызов `army[5]()` получит элемент `army[5]` из массива (это будет функция) и вызовет её.

    Теперь, почему все эти функции показывают одно и то же?

    Всё потому, что внутри функций  `shooter` нет локальной переменной `i`. Когда вызывается такая функция, она берёт `i` из своего внешнего лексического окружения.

    Какое будет значение у `i`?

    Если мы посмотрим в исходный код:

=======
3. The array is returned from the function.
    
    Then, later, the call to any member, e.g. `army[5]()` will get the element `army[5]` from the array (which is a function) and calls it.
    
    Now why do all such functions show the same value, `10`?
    
    That's because there's no local variable `i` inside `shooter` functions. When such a function is called, it takes `i` from its outer lexical environment.
    
    Then, what will be the value of `i`?
    
    If we look at the source:
    
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
    ```js
    function makeArmy() {
      ...
      let i = 0;
      while (i < 10) {
<<<<<<< HEAD
        let shooter = function() { // функция shooter
          alert( i ); // должна выводить порядковый номер
        };
        shooters.push(shooter); // и добавлять стрелка в массив
=======
        let shooter = function() { // shooter function
          alert( i ); // should show its number
        };
        shooters.push(shooter); // add function to the array
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
        i++;
      }
      ...
    }
    ```
<<<<<<< HEAD

    ...Мы увидим, что оно живёт в лексическом окружении, связанном с текущим вызовом `makeArmy()`. Но, когда вызывается `army[5]()`, `makeArmy` уже завершила свою работу, и последнее значение `i`: `10` (конец цикла `while`).

    Как результат, все функции `shooter` получат одно и то же значение из внешнего лексического окружения: последнее значение `i=10`.

    ![](lexenv-makearmy-empty.svg)

    Как вы можете видеть выше, на каждой итерации блока `while {...}` создается новое лексическое окружение. Чтобы исправить это, мы можем скопировать значение `i` в переменную внутри блока `while {...}`, например, так:

=======
    
    We can see that all `shooter` functions are created in the lexical environment of `makeArmy()` function. But when `army[5]()` is called, `makeArmy` has already finished its job, and the final value of `i` is `10` (`while` stops at `i=10`).
    
    As the result, all `shooter` functions get the same value from the outer lexical environment and that is, the last value, `i=10`.
    
    ![](lexenv-makearmy-empty.svg)
    
    As you can see above, on each iteration of a `while {...}` block, a new lexical environment is created. So, to fix this, we can copy the value of `i` into a variable within the `while {...}` block, like this:
    
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
    ```js run
    function makeArmy() {
      let shooters = [];
    
      let i = 0;
      while (i < 10) {
        *!*
          let j = i;
        */!*
<<<<<<< HEAD
          let shooter = function() { // функция shooter
            alert( *!*j*/!* ); // должна выводить порядковый номер
=======
          let shooter = function() { // shooter function
            alert( *!*j*/!* ); // should show its number
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
          };
        shooters.push(shooter);
        i++;
      }
    
      return shooters;
    }
    
    let army = makeArmy();
    
<<<<<<< HEAD
    // теперь код работает правильно
    army[0](); // 0
    army[5](); // 5
    ```

    Здесь `let j = i` объявляет "итерационно-локальную" переменную `j` и копирует в нее `i`. Примитивы копируются "по значению", поэтому фактически мы получаем независимую копию `i`, принадлежащую текущей итерации цикла.

    Функции `shooter` работают правильно, потому что значение `i` теперь живет чуть ближе. Не в лексическом окружении `makeArmy()`, а в лексическом окружении, соответствующем текущей итерации цикла:

    ![](lexenv-makearmy-while-fixed.svg)

    Этой проблемы также можно было бы избежать, если бы мы использовали `for` в начале, например, так:

=======
    // Now the code works correctly
    army[0](); // 0
    army[5](); // 5
    ```
    
    Here `let j = i` declares an "iteration-local" variable `j` and copies `i` into it. Primitives are copied "by value", so we actually get an independent copy of `i`, belonging to the current loop iteration.
    
    The shooters work correctly, because the value of `i` now lives a little bit closer. Not in `makeArmy()` Lexical Environment, but in the Lexical Environment that corresponds to the current loop iteration:
    
    ![](lexenv-makearmy-while-fixed.svg)
    
    Such a problem could also be avoided if we used `for` in the beginning, like this:
    
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
    ```js run demo
    function makeArmy() {
    
      let shooters = [];
    
    *!*
<<<<<<< HEAD
      for (let i = 0; i < 10; i++) {
    */!*
        let shooter = function() { // функция shooter
          alert( i ); // должна выводить порядковый номер
=======
      for(let i = 0; i < 10; i++) {
    */!*
        let shooter = function() { // shooter function
          alert( i ); // should show its number
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
        };
        shooters.push(shooter);
      }
    
      return shooters;
    }
    
    let army = makeArmy();
    
    army[0](); // 0
    army[5](); // 5
    ```
<<<<<<< HEAD

    По сути, это то же самое, поскольку `for` на каждой итерации создает новое лексическое окружение со своей переменной `i`. Поэтому функция `shooter`, создаваемая на каждой итерации, ссылается на свою собственную переменную `i`, причем именно с этой итерации.

   ![](lexenv-makearmy-for-fixed.svg)

Теперь, когда вы приложили столько усилий, чтобы прочитать это объяснение, а конечный вариант оказался так прост - использовать `for`, вы можете задаться вопросом -- стоило ли оно того?

Что ж, если бы вы могли легко ответить на вопрос из задачи, вы бы не стали читать решение. Так что, должно быть, эта задача помогла вам лучше понять суть дела. 

Кроме того, действительно встречаются случаи, когда человек предпочитает `while`, а не `for`, и другие сценарии, где такие проблемы реальны.
=======
    
    That's essentially the same, because `for` on each iteration generates a new lexical environment, with its own variable `i`. So `shooter` generated in every iteration references its own `i`, from that very iteration.
    
    ![](lexenv-makearmy-for-fixed.svg)

Now, as you've put so much effort into reading this, and the final recipe is so simple - just use `for`, you may wonder -- was it worth that?

Well, if you could easily answer the question, you wouldn't read the solution. So, hopefully this task must have helped you to understand things a bit better. 

Besides, there are indeed cases when one prefers `while` to `for`, and other scenarios, where such problems are real.

>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
