<<<<<<< HEAD
# Обработка ошибок, "try..catch"

Неважно, насколько мы хороши в программировании, иногда наши скрипты содержат ошибки. Они могут возникать из-за наших промахов, неожиданного ввода пользователя, неправильного ответа сервера и по тысяче других причин.
=======
# Error handling, "try...catch"

No matter how great we are at programming, sometimes our scripts have errors. They may occur because of our mistakes, an unexpected user input, an erroneous server response, and for a thousand other reasons.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Обычно скрипт в случае ошибки "падает" (сразу же останавливается), с выводом ошибки в консоль.

<<<<<<< HEAD
Но есть синтаксическая конструкция `try..catch`, которая позволяет "ловить" ошибки и вместо падения делать что-то более осмысленное.

## Синтаксис "try..catch"

Конструкция `try..catch` состоит из двух основных блоков: `try`, и затем `catch`:
=======
But there's a syntax construct `try...catch` that allows us to "catch" errors so the script can, instead of dying, do something more reasonable.

## The "try...catch" syntax

The `try...catch` construct has two main blocks: `try`, and then `catch`:
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js
try {

  // код...

} catch (err) {

  // обработка ошибки

}
```

Работает она так:

<<<<<<< HEAD
1. Сначала выполняется код внутри блока `try {...}`.
2. Если в нём нет ошибок, то блок `catch(err)` игнорируется: выполнение доходит до конца `try` и потом далее, полностью пропуская `catch`.
3. Если же в нём возникает ошибка, то выполнение `try` прерывается, и поток управления переходит в начало `catch(err)`. Переменная `err` (можно использовать любое имя) содержит объект ошибки с подробной информацией о произошедшем.

![](try-catch-flow.svg)

Таким образом, при ошибке в блоке `try {…}` скрипт не "падает", и мы получаем возможность обработать ошибку внутри `catch`.

Давайте рассмотрим примеры.
=======
1. First, the code in `try {...}` is executed.
2. If there were no errors, then `catch (err)` is ignored: the execution reaches the end of `try` and goes on, skipping `catch`.
3. If an error occurs, then the `try` execution is stopped, and control flows to the beginning of `catch (err)`. The `err` variable (we can use any name for it) will contain an error object with details about what happened.

![](try-catch-flow.svg)

So, an error inside the `try {...}` block does not kill the script -- we have a chance to handle it in `catch`.

Let's look at some examples.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

- Пример без ошибок: выведет  `alert` `(1)` и `(2)`:

    ```js run
    try {

      alert('Начало блока try');  // *!*(1) <--*/!*

      // ...код без ошибок

      alert('Конец блока try');   // *!*(2) <--*/!*

    } catch (err) {

      alert('Catch игнорируется, так как нет ошибок'); // (3)

    }
    ```
- Пример с ошибками: выведет `(1)` и `(3)`:

    ```js run
    try {

      alert('Начало блока try');  // *!*(1) <--*/!*

    *!*
      lalala; // ошибка, переменная не определена!
    */!*

      alert('Конец блока try (никогда не выполнится)');  // (2)

    } catch (err) {

      alert(`Возникла ошибка!`); // *!*(3) <--*/!*

    }
    ```


<<<<<<< HEAD
````warn header="`try..catch` работает только для ошибок, возникающих во время выполнения кода"
Чтобы `try..catch` работал, код должен быть выполнимым. Другими словами, это должен быть корректный JavaScript-код.
=======
````warn header="`try...catch` only works for runtime errors"
For `try...catch` to work, the code must be runnable. In other words, it should be valid JavaScript.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Он не сработает, если код синтаксически неверен, например, содержит несовпадающее количество фигурных скобок:

```js run
try {
  {{{{{{{{{{{{
<<<<<<< HEAD
} catch(e) {
  alert("Движок не может понять этот код, он некорректен");
=======
} catch (err) {
  alert("The engine can't understand this code, it's invalid");
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
}
```

JavaScript-движок сначала читает код, а затем исполняет его. Ошибки, которые возникают во время фазы чтения, называются ошибками парсинга. Их нельзя обработать (изнутри этого кода), потому что движок не понимает код.

<<<<<<< HEAD
Таким образом, `try..catch` может обрабатывать только ошибки, которые возникают в корректном коде. Такие ошибки называют "ошибками во время выполнения", а иногда "исключениями".
````


````warn header="`try..catch` работает синхронно"
Исключение, которое произойдёт в коде, запланированном "на будущее", например в `setTimeout`, `try..catch` не поймает:
=======
So, `try...catch` can only handle errors that occur in valid code. Such errors are called "runtime errors" or, sometimes, "exceptions".
````


````warn header="`try...catch` works synchronously"
If an exception happens in "scheduled" code, like in `setTimeout`, then `try...catch` won't catch it:
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js run
try {
  setTimeout(function() {
    noSuchVariable; // скрипт упадёт тут
  }, 1000);
<<<<<<< HEAD
} catch (e) {
  alert( "не сработает" );
}
```

Это потому, что функция выполняется позже, когда движок уже покинул конструкцию `try..catch`.

Чтобы поймать исключение внутри запланированной функции, `try..catch` должен находиться внутри самой этой функции:
```js run
setTimeout(function() {
  try {    
    noSuchVariable; // try..catch обрабатывает ошибку!
=======
} catch (err) {
  alert( "won't work" );
}
```

That's because the function itself is executed later, when the engine has already left the `try...catch` construct.

To catch an exception inside a scheduled function, `try...catch` must be inside that function:
```js run
setTimeout(function() {
  try {    
    noSuchVariable; // try...catch handles the error!
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
  } catch {
    alert( "ошибка поймана!" );
  }
}, 1000);
```
````

## Объект ошибки

Когда возникает ошибка, JavaScript генерирует объект, содержащий её детали. Затем этот объект передаётся как аргумент в блок `catch`:

```js
try {
  // ...
<<<<<<< HEAD
} catch(err) { // <-- объект ошибки, можно использовать другое название вместо err
=======
} catch (err) { // <-- the "error object", could use another word instead of err
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
  // ...
}
```

Для всех встроенных ошибок этот объект имеет два основных свойства:

`name`
: Имя ошибки. Например, для неопределённой переменной это `"ReferenceError"`.

`message`
: Текстовое сообщение о деталях ошибки.

В большинстве окружений доступны и другие, нестандартные свойства. Одно из самых широко используемых и поддерживаемых - это:

`stack`
: Текущий стек вызова: строка, содержащая информацию о последовательности вложенных вызовов, которые привели к ошибке. Используется в целях отладки.

Например:

```js run untrusted
try {
*!*
  lalala; // ошибка, переменная не определена!
*/!*
} catch (err) {
  alert(err.name); // ReferenceError
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at (...стек вызовов)

  // Можем также просто вывести ошибку целиком
  // Ошибка приводится к строке вида "name: message"
  alert(err); // ReferenceError: lalala is not defined
}
```

## Блок "catch" без переменной

[recent browser=new]

Если нам не нужны детали ошибки, в `catch` можно её пропустить:

```js
try {
  // ...
} catch { //  <-- без (err)
  // ...
}
```

<<<<<<< HEAD
## Использование "try..catch"

Давайте рассмотрим реальные случаи использования `try..catch`.
=======
## Using "try...catch"

Let's explore a real-life use case of `try...catch`.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Как мы уже знаем, JavaScript поддерживает метод [JSON.parse(str)](mdn:js/JSON/parse) для чтения JSON.

Обычно он используется для декодирования данных, полученных по сети, от сервера или из другого источника.

Мы получаем их и вызываем `JSON.parse` вот так:

```js run
let json = '{"name":"John", "age": 30}'; // данные с сервера

*!*
let user = JSON.parse(json); // преобразовали текстовое представление в JS-объект
*/!*

// теперь user - объект со свойствами из строки
alert( user.name ); // John
alert( user.age );  // 30
```

Вы можете найти более детальную информацию о JSON в главе <info:json>.

**Если `json` некорректен, `JSON.parse` генерирует ошибку, то есть скрипт "падает".**

<<<<<<< HEAD
Устроит ли нас такое поведение? Конечно нет!
=======
Should we be satisfied with that? Of course not!
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Получается, что если вдруг что-то не так с данными, то посетитель никогда (если, конечно, не откроет консоль) об этом не узнает. А люди очень не любят, когда что-то "просто падает" без всякого сообщения об ошибке.

<<<<<<< HEAD
Давайте используем `try..catch` для обработки ошибки:
=======
Let's use `try...catch` to handle the error:
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js run
let json = "{ некорректный JSON }";

try {

*!*
  let user = JSON.parse(json); // <-- тут возникает ошибка...
*/!*
  alert( user.name ); // не сработает

} catch (err) {
*!*
<<<<<<< HEAD
  // ...выполнение прыгает сюда
  alert( "Извините, в данных ошибка, мы попробуем получить их ещё раз." );
  alert( e.name );
  alert( e.message );
=======
  // ...the execution jumps here
  alert( "Our apologies, the data has errors, we'll try to request it one more time." );
  alert( err.name );
  alert( err.message );
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
*/!*
}
```

Здесь мы используем блок `catch` только для вывода сообщения, но мы также можем сделать гораздо больше: отправить новый сетевой запрос, предложить посетителю альтернативный способ, отослать информацию об ошибке на сервер для логирования, ... Всё лучше, чем просто "падение".

## Генерация собственных ошибок

Что если `json` синтаксически корректен, но не содержит необходимого свойства `name`?

Например, так:

```js run
let json = '{ "age": 30 }'; // данные неполны

try {

  let user = JSON.parse(json); // <-- выполнится без ошибок
*!*
  alert( user.name ); // нет свойства name!
*/!*

<<<<<<< HEAD
} catch (e) {
  alert( "не выполнится" );
=======
} catch (err) {
  alert( "doesn't execute" );
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
}
```

Здесь `JSON.parse` выполнится без ошибок, но на самом деле отсутствие свойства `name` для нас ошибка.

Для того, чтобы унифицировать обработку ошибок, мы воспользуемся оператором `throw`.

### Оператор "throw"

Оператор `throw` генерирует ошибку.

Синтаксис:

```js
throw <объект ошибки>
```

Технически в качестве объекта ошибки можно передать что угодно. Это может быть даже примитив, число или строка, но всё же лучше, чтобы это был объект, желательно со свойствами `name` и `message` (для совместимости со встроенными ошибками).

В JavaScript есть множество встроенных конструкторов для стандартных ошибок: `Error`, `SyntaxError`, `ReferenceError`, `TypeError` и другие. Можно использовать и их для создания объектов ошибки.  

Их синтаксис:

```js
let error = new Error(message);
// или
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...
```

Для встроенных ошибок (не для любых объектов, только для ошибок), свойство `name` -- это в точности имя конструктора. А свойство `message` берётся из аргумента.  

Например:

```js run
let error = new Error(" Ого, ошибка! o_O");

alert(error.name); // Error
alert(error.message); //  Ого, ошибка! o_O
```

Давайте посмотрим, какую ошибку генерирует `JSON.parse`:

```js run
try {
  JSON.parse("{ bad json o_O }");
} catch (err) {
*!*
  alert(err.name); // SyntaxError
*/!*
<<<<<<< HEAD
  alert(e.message); // Unexpected token b in JSON at position 2
=======
  alert(err.message); // Unexpected token b in JSON at position 2
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
}
```

Как мы видим, это `SyntaxError`.

В нашем случае отсутствие свойства `name` - это ошибка, ведь пользователи должны иметь имена.

Сгенерируем её:

```js run
let json = '{ "age": 30 }'; // данные неполны

try {

  let user = JSON.parse(json); // <-- выполнится без ошибок

  if (!user.name) {
*!*
    throw new SyntaxError("Данные неполны: нет имени"); // (*)
*/!*
  }

  alert( user.name );

<<<<<<< HEAD
} catch(e) {
  alert( "JSON Error: " + e.message ); // JSON Error: Данные неполны: нет имени
=======
} catch (err) {
  alert( "JSON Error: " + err.message ); // JSON Error: Incomplete data: no name
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
}
```

В строке `(*)` оператор `throw` генерирует ошибку `SyntaxError` с сообщением `message`. Точно такого же вида, как генерирует сам JavaScript. Выполнение блока `try` немедленно останавливается, и поток управления прыгает в `catch`.

Теперь блок `catch` становится единственным местом для обработки всех ошибок: и для `JSON.parse` и для других случаев.

## Проброс исключения

<<<<<<< HEAD
В примере выше мы использовали `try..catch` для обработки некорректных данных. А что, если в блоке `try {...}` возникнет *другая неожиданная ошибка*? Например, программная (неопределённая переменная) или какая-то ещё, а не ошибка, связанная с некорректными данными.

Пример:
=======
In the example above we use `try...catch` to handle incorrect data. But is it possible that *another unexpected error* occurs within the `try {...}` block? Like a programming error (variable is not defined) or something else, not just this "incorrect data" thing.

For example:
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js run
let json = '{ "age": 30 }'; // данные неполны

try {
  user = JSON.parse(json); // <-- забыл добавить "let" перед user

  // ...
} catch (err) {
  alert("JSON Error: " + err); // JSON Error: ReferenceError: user is not defined
  // (не JSON ошибка на самом деле)
}
```

Конечно, возможно все! Программисты совершают ошибки. Даже в утилитах с открытым исходным кодом, используемых миллионами людей на протяжении десятилетий -- вдруг может быть обнаружена ошибка, которая приводит к ужасным взломам.

<<<<<<< HEAD
В нашем случае `try..catch` предназначен для выявления ошибок, связанных с некорректными данными. Но по своей природе `catch` получает *все* свои ошибки из `try`. Здесь он получает неожиданную ошибку, но всё также показывает то же самое сообщение `"JSON Error"`. Это неправильно и затрудняет отладку кода.

К счастью, мы можем выяснить, какую ошибку мы получили, например, по её свойству `name`:
=======
In our case, `try...catch` is placed to catch "incorrect data" errors. But by its nature, `catch` gets *all* errors from `try`. Here it gets an unexpected error, but still shows the same `"JSON Error"` message. That's wrong and also makes the code more difficult to debug.

To avoid such problems, we can employ the "rethrowing" technique. The rule is simple:

**Catch should only process errors that it knows and "rethrow" all others.**

The "rethrowing" technique can be explained in more detail as:

1. Catch gets all errors.
2. In the `catch (err) {...}` block we analyze the error object `err`.
3. If we don't know how to handle it, we do `throw err`.

Usually, we can check the error type using the `instanceof` operator:
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js run
try {
  user = { /*...*/ };
} catch (err) {
*!*
<<<<<<< HEAD
  alert(e.name); // "ReferenceError" из-за неопределённой переменной
=======
  if (err instanceof ReferenceError) {
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
*/!*
    alert('ReferenceError'); // "ReferenceError" for accessing an undefined variable
  }
}
```

<<<<<<< HEAD
Есть простое правило:

**Блок `catch` должен обрабатывать только те ошибки, которые ему известны, и "пробрасывать" все остальные.**

Техника "проброс исключения" выглядит так:

1. Блок `catch` получает все ошибки.
2. В блоке `catch(err) {...}` мы анализируем объект ошибки `err`.
3. Если мы не знаем как её обработать, тогда делаем `throw err`.
=======
We can also get the error class name from `err.name` property. All native errors have it. Another option is to read `err.constructor.name`.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

В коде ниже мы используем проброс исключения, `catch` обрабатывает только `SyntaxError`:

```js run
let json = '{ "age": 30 }'; // данные неполны
try {

  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError("Данные неполны: нет имени");
  }

*!*
  blabla(); // неожиданная ошибка
*/!*

  alert( user.name );

} catch (err) {

*!*
  if (err instanceof SyntaxError) {
    alert( "JSON Error: " + err.message );
  } else {
<<<<<<< HEAD
    throw e; // проброс (*)
=======
    throw err; // rethrow (*)
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
  }
*/!*

}
```

<<<<<<< HEAD
Ошибка в строке `(*)` из блока `catch` "выпадает наружу" и может быть поймана другой внешней конструкцией `try..catch` (если есть), или "убьёт" скрипт.
=======
The error throwing on line `(*)` from inside `catch` block "falls out" of `try...catch` and can be either caught by an outer `try...catch` construct (if it exists), or it kills the script.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Таким образом, блок `catch` фактически обрабатывает только те ошибки, с которыми он знает, как справляться, и пропускает остальные.

<<<<<<< HEAD
Пример ниже демонстрирует, как такие ошибки могут быть пойманы с помощью ещё одного уровня `try..catch`:
=======
The example below demonstrates how such errors can be caught by one more level of `try...catch`:
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js run
function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
*!*
    blabla(); // ошибка!
*/!*
  } catch (err) {
    // ...
    if (!(err instanceof SyntaxError)) {
*!*
<<<<<<< HEAD
      throw e; // проброс исключения (не знаю как это обработать)
=======
      throw err; // rethrow (don't know how to deal with it)
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
*/!*
    }
  }
}

try {
  readData();
} catch (err) {
*!*
<<<<<<< HEAD
  alert( "Внешний catch поймал: " + e ); // поймал!
=======
  alert( "External catch got: " + err ); // caught it!
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
*/!*
}
```

<<<<<<< HEAD
Здесь `readData` знает только, как обработать `SyntaxError`, тогда как внешний блок `try..catch` знает, как обработать всё.
=======
Here `readData` only knows how to handle `SyntaxError`, while the outer `try...catch` knows how to handle everything.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

## try...catch...finally

Подождите, это ещё не всё.

<<<<<<< HEAD
Конструкция `try..catch` может содержать ещё одну секцию: `finally`.
=======
The `try...catch` construct may have one more code clause: `finally`.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Если секция есть, то она выполняется в любом случае:

- после `try`, если не было ошибок,
- после `catch`, если ошибки были.

Расширенный синтаксис выглядит следующим образом:

```js
*!*try*/!* {
<<<<<<< HEAD
   ... пробуем выполнить код...
} *!*catch*/!*(e) {
   ... обрабатываем ошибки ...
=======
   ... try to execute the code ...
} *!*catch*/!* (err) {
   ... handle errors ...
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
} *!*finally*/!* {
   ... выполняем всегда ...
}
```

Попробуйте запустить такой код:

```js run
try {
  alert( 'try' );
<<<<<<< HEAD
  if (confirm('Сгенерировать ошибку?')) BAD_CODE();
} catch (e) {
=======
  if (confirm('Make an error?')) BAD_CODE();
} catch (err) {
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
  alert( 'catch' );
} finally {
  alert( 'finally' );
}
```

У кода есть два пути выполнения:

1. Если вы ответите на вопрос "Сгенерировать ошибку?" утвердительно, то `try -> catch -> finally`.
2. Если ответите отрицательно, то `try -> finally`.

Секцию `finally` часто используют, когда мы начали что-то делать и хотим завершить это вне зависимости от того, будет ошибка или нет.

Например, мы хотим измерить время, которое занимает функция чисел Фибоначчи `fib(n)`. Естественно, мы можем начать измерения до того, как функция начнёт выполняться и закончить после. Но что делать, если при вызове функции возникла ошибка? В частности, реализация `fib(n)` в коде ниже возвращает ошибку для отрицательных и для нецелых чисел.

Секция `finally` отлично подходит для завершения измерений несмотря ни на что.

Здесь `finally` гарантирует, что время будет измерено корректно в обеих ситуациях - и в случае успешного завершения `fib` и в случае ошибки:

```js run
let num = +prompt("Введите положительное целое число?", 35)

let diff, result;

function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("Должно быть целое неотрицательное число");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
  result = fib(num);
} catch (err) {
  result = 0;
*!*
} finally {
  diff = Date.now() - start;
}
*/!*

alert(result || "возникла ошибка");

alert( `Выполнение заняло ${diff}ms` );
```

Вы можете это проверить, запустив этот код и введя `35` в `prompt` -- код завершится нормально, `finally` выполнится после `try`. А затем введите `-1` -- незамедлительно произойдёт ошибка, выполнение займёт `0ms`. Оба измерения выполняются корректно.

Другими словами, неважно как завершилась функция: через `return` или `throw`. Секция `finally` срабатывает в обоих случаях.


<<<<<<< HEAD
```smart header="Переменные внутри `try..catch..finally` локальны"
Обратите внимание, что переменные `result` и `diff` в коде выше объявлены *до* `try..catch`.
=======
```smart header="Variables are local inside `try...catch...finally`"
Please note that `result` and `diff` variables in the code above are declared *before* `try...catch`.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Если переменную объявить в блоке, например, в `try`, то она не будет доступна после него.
```

<<<<<<< HEAD
````smart header="`finally` и `return`"
Блок `finally` срабатывает при *любом* выходе из `try..catch`, в том числе и `return`.
=======
````smart header="`finally` and `return`"
The `finally` clause works for *any* exit from `try...catch`. That includes an explicit `return`.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

В примере ниже из `try` происходит `return`, но `finally` получает управление до того, как контроль возвращается во внешний код.

```js run
function func() {

  try {
*!*
    return 1;
*/!*

  } catch (err) {
    /* ... */
  } finally {
*!*
    alert( 'finally' );
*/!*
  }
}

alert( func() ); // сначала срабатывает alert из finally, а затем этот код
```
````

````smart header="`try...finally`"

<<<<<<< HEAD
Конструкция `try..finally` без секции `catch` также полезна. Мы применяем её, когда не хотим здесь обрабатывать ошибки (пусть выпадут), но хотим быть уверены, что начатые процессы завершились.
=======
The `try...finally` construct, without `catch` clause, is also useful. We apply it when we don't want to handle errors here (let them fall through), but want to be sure that processes that we started are finalized.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js
function func() {
  // начать делать что-то, что требует завершения (например, измерения)
  try {
    // ...
  } finally {
    // завершить это, даже если все упадёт
  }
}
```
В приведённом выше коде ошибка всегда выпадает наружу, потому что тут нет блока `catch`. Но `finally` отрабатывает до того, как поток управления выйдет из функции.
````

## Глобальный catch

```warn header="Зависит от окружения"
Информация из данной секции не является частью языка JavaScript.
```

<<<<<<< HEAD
Давайте представим, что произошла фатальная ошибка (программная или что-то ещё ужасное) снаружи `try..catch`, и скрипт упал.

Существует ли способ отреагировать на такие ситуации? Мы можем захотеть залогировать ошибку, показать что-то пользователю (обычно они не видят сообщение об ошибке) и т.д.

Такого способа нет в спецификации, но обычно окружения предоставляют его, потому что это весьма полезно. Например, в Node.js для этого есть [`process.on("uncaughtException")`](https://nodejs.org/api/process.html#process_event_uncaughtexception). А в браузере мы можем присвоить функцию специальному свойству [window.onerror](mdn:api/GlobalEventHandlers/onerror), которая будет вызвана в случае необработанной ошибки.
=======
Let's imagine we've got a fatal error outside of `try...catch`, and the script died. Like a programming error or some other terrible thing.

Is there a way to react on such occurrences? We may want to log the error, show something to the user (normally they don't see error messages), etc.

There is none in the specification, but environments usually provide it, because it's really useful. For instance, Node.js has [`process.on("uncaughtException")`](https://nodejs.org/api/process.html#process_event_uncaughtexception) for that. And in the browser we can assign a function to the special [window.onerror](mdn:api/GlobalEventHandlers/onerror) property, that will run in case of an uncaught error.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Синтаксис:

```js
window.onerror = function(message, url, line, col, error) {
  // ...
};
```

`message`
: Сообщение об ошибке.

`url`
: URL скрипта, в котором произошла ошибка.

`line`, `col`
: Номера строки и столбца, в которых произошла ошибка.

`error`
: Объект ошибки.

Пример:

```html run untrusted refresh height=1
<script>
*!*
  window.onerror = function(message, url, line, col, error) {
    alert(`${message}\n В ${line}:${col} на ${url}`);
  };
*/!*

  function readData() {
    badFunc(); // Ой, что-то пошло не так!
  }

  readData();
</script>
```

Роль глобального обработчика `window.onerror` обычно заключается не в восстановлении выполнения скрипта -- это скорее всего невозможно в случае программной ошибки, а в отправке сообщения об ошибке разработчикам.

Существуют также веб-сервисы, которые предоставляют логирование ошибок для таких случаев, такие как <https://errorception.com> или <http://www.muscula.com>.

Они работают так:

1. Мы регистрируемся в сервисе и получаем небольшой JS-скрипт (или URL скрипта) от них для вставки на страницы.
2. Этот JS-скрипт ставит свою функцию `window.onerror`.
3. Когда возникает ошибка, она выполняется и отправляет сетевой запрос с информацией о ней в сервис.
4. Мы можем войти в веб-интерфейс сервиса и увидеть ошибки.

## Итого

<<<<<<< HEAD
Конструкция `try..catch` позволяет обрабатывать ошибки во время исполнения кода. Она позволяет запустить код и перехватить ошибки, которые могут в нём возникнуть.
=======
The `try...catch` construct allows to handle runtime errors. It literally allows to "try" running the code and "catch" errors that may occur in it.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Синтаксис:

```js
try {
<<<<<<< HEAD
  // исполняем код
} catch(err) {
  // если случилась ошибка, прыгаем сюда
  // err - это объект ошибки
=======
  // run this code
} catch (err) {
  // if an error happened, then jump here
  // err is the error object
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
} finally {
  // выполняется всегда после try/catch
}
```

<<<<<<< HEAD
Секций `catch` или `finally` может не быть, то есть более короткие конструкции `try..catch` и `try..finally` также корректны.
=======
There may be no `catch` section or no `finally`, so shorter constructs `try...catch` and `try...finally` are also valid.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Объекты ошибок содержат следующие свойства:

- `message` -- понятное человеку сообщение.
- `name` -- строка с именем ошибки (имя конструктора ошибки).
- `stack` (нестандартное, но хорошо поддерживается) -- стек на момент ошибки.

<<<<<<< HEAD
Если объект ошибки не нужен, мы можем пропустить его, используя `catch {` вместо `catch(err) {`.
=======
If an error object is not needed, we can omit it by using `catch {` instead of `catch (err) {`.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Мы можем также генерировать собственные ошибки, используя оператор `throw`. Аргументом `throw` может быть что угодно, но обычно это объект ошибки, наследуемый от встроенного класса `Error`. Подробнее о расширении ошибок см. в следующей главе.  

*Проброс исключения* -- это очень важный приём обработки ошибок: блок `catch` обычно ожидает и знает, как обработать определённый тип ошибок, поэтому он должен пробрасывать дальше ошибки, о которых он не знает.

<<<<<<< HEAD
Даже если у нас нет `try..catch`, большинство сред позволяют настроить "глобальный" обработчик ошибок, чтобы ловить ошибки, которые "выпадают наружу". В браузере это `window.onerror`.
=======
Even if we don't have `try...catch`, most environments allow us to setup a "global" error handler to catch errors that "fall out". In-browser, that's `window.onerror`.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
