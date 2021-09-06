# Пользовательские ошибки, расширение Error

Когда что-то разрабатываем, то нам часто необходимы собственные классы ошибок для разных вещей, которые могут пойти не так в наших задачах. Для ошибок при работе с сетью может понадобиться `HttpError`, для операций с базой данных `DbError`, для поиска - `NotFoundError` и т.д.

<<<<<<< HEAD
Наши ошибки должны поддерживать базовые свойства, такие как `message`, `name` и, желательно, `stack`. Но также они могут иметь свои собственные свойства. Например, объекты `HttpError` могут иметь свойство `statusCode` со значениями `404`, `403` или `500`.
=======
Our errors should support basic error properties like `message`, `name` and, preferably, `stack`. But they also may have other properties of their own, e.g. `HttpError` objects may have a `statusCode` property with a value like `404` or `403` or `500`.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

JavaScript позволяет вызывать `throw` с любыми аргументами, то есть технически наши классы ошибок не нуждаются в наследовании от `Error`. Но если использовать наследование, то появляется возможность идентификации объектов ошибок посредством `obj instanceof Error`. Так что лучше применять наследование.

<<<<<<< HEAD
По мере роста приложения, наши собственные ошибки образуют иерархию, например, `HttpTimeoutError` может наследовать от ` HttpError` и так далее.
=======
As the application grows, our own errors naturally form a hierarchy. For instance, `HttpTimeoutError` may inherit from `HttpError`, and so on.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

## Расширение Error

В качестве примера рассмотрим функцию `readUser(json)`, которая должна читать данные пользователя в формате JSON.

Пример того, как может выглядеть корректный `json`:
```js
let json = `{ "name": "John", "age": 30 }`;
```

Внутри будем использовать `JSON.parse`. При получении некорректного `json` он будет генерировать ошибку `SyntaxError`. Но даже если `json` синтаксически верен, то это не значит, что это будет корректный пользователь, верно? Могут быть пропущены необходимые данные. Например, могут отсутствовать свойства `name`и `age`, которые являются необходимыми для наших пользователей.

Наша функция `readUser(json)` будет не только читать JSON-данные, но и проверять их ("валидировать"). Если необходимые поля отсутствуют или данные в неверном формате, то это будет ошибкой. Но не синтаксической ошибкой `SyntaxError`, потому что данные синтаксически корректны. Это будет другая ошибка.

<<<<<<< HEAD
Назовём её ошибкой валидации `ValidationError` и создадим для неё класс. Ошибка этого вида должна содержать информацию о поле, которое является источником ошибки.

Наш класс `ValidationError` должен наследовать от встроенного класса `Error`.

Класс `Error` встроенный, вот его примерный код, просто чтобы мы понимали, что расширяем:
=======
Our `ValidationError` class should inherit from the `Error` class.

The `Error` class is built-in, but here's its approximate code so we can understand what we're extending:
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js
// "Псевдокод" встроенного класса Error, определённого самим JavaScript
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (разные имена для разных встроенных классов ошибок)
    this.stack = <стек вызовов>; // нестандартное свойство, но обычно поддерживается
  }
}
```

Теперь давайте унаследуем от него `ValidationError` и попробуем новый класс в действии:

```js run untrusted
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Упс!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Упс!
  alert(err.name); // ValidationError
  alert(err.stack); // список вложенных вызовов с номерами строк для каждого
}
```

Обратите внимание: в строке `(1)` вызываем родительский конструктор. JavaScript требует от нас вызова `super` в дочернем конструкторе, так что это обязательно. Родительский конструктор устанавливает свойство `message`.

Родительский конструктор также устанавливает свойство `name` для `"Error"`, поэтому в строке `(2)` мы сбрасываем его на правильное значение.

Попробуем использовать его в `readUser(json)`:

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Использование
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("Нет поля: age");
  }
  if (!user.name) {
    throw new ValidationError("Нет поля: name");
  }

  return user;
}

// Рабочий пример с try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Некорректные данные: " + err.message); // Некорректные данные: Нет поля: name
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("JSON Ошибка Синтаксиса: " + err.message);
  } else {
    throw err; // неизвестная ошибка, пробросить исключение (**)
  }
}
```

Блок  `try..catch` в коде выше обрабатывает и нашу `ValidationError`, и встроенную `SyntaxError` из `JSON.parse`.

Обратите внимание, как мы используем `instanceof` для проверки конкретного типа ошибки в строке `(*)`.

Мы можем также проверить тип, используя `err.name`:

```js
// ...
// вместо (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```

Версия с `instanceof` гораздо лучше, потому что в будущем мы собираемся расширить `ValidationError`, сделав его подтипы, такие как `PropertyRequiredError`. И проверка `instanceof` продолжит работать для новых наследованных классов. Так что это на будущее.

<<<<<<< HEAD
Также важно, что если `catch` встречает неизвестную ошибку, то он пробрасывает её в строке `(**)`. Блок`catch` знает, только как обрабатывать ошибки валидации и синтаксические ошибки, а другие виды ошибок (из-за опечаток в коде и другие непонятные) он должен выпустить наружу.
=======
Also it's important that if `catch` meets an unknown error, then it rethrows it in the line `(**)`. The `catch` block only knows how to handle validation and syntax errors, other kinds (caused by a typo in the code or other unknown reasons) should fall through.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

## Дальнейшее наследование

<<<<<<< HEAD
Класс `ValidationError` является слишком общим. Много что может пойти не так. Свойство может отсутствовать или иметь неверный формат (например, строка как значение возраста `age`). Поэтому для отсутствующих свойств сделаем более конкретный класс `PropertyRequiredError`. Он будет нести дополнительную информацию о свойстве, которое отсутствует.
=======
The `ValidationError` class is very generic. Many things may go wrong. The property may be absent or it may be in a wrong format (like a string value for `age` instead of a number). Let's make a more concrete class `PropertyRequiredError`, exactly for absent properties. It will carry additional information about the property that's missing.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("Нет свойства: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// Применение
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// Рабочий пример с try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Неверные данные: " + err.message); // Неверные данные: Нет свойства: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("Ошибка синтаксиса JSON: " + err.message);
  } else {
    throw err; // неизвестная ошибка, повторно выбросит исключение
  }
}
```

Новый класс `PropertyRequiredError` очень просто использовать: необходимо указать только имя свойства `new PropertyRequiredError(property)`. Сообщение для пользователя `message` генерируется конструктором.

<<<<<<< HEAD
Обратите внимание, что свойство `this.name` в конструкторе `PropertyRequiredError` снова присвоено вручную. Правда, немного утомительно -- присваивать `this.name = <class name>` в каждом классе пользовательской ошибки. Можно этого избежать, если сделать наш собственный  "базовый" класс ошибки, который будет ставить `this.name = this.constructor.name`. И затем наследовать все ошибки уже от него.
=======
Please note that `this.name` in `PropertyRequiredError` constructor is again assigned manually. That may become a bit tedious -- to assign `this.name = <class name>` in every custom error class. We can avoid it by making our own "basic error" class that assigns `this.name = this.constructor.name`. And then inherit all our custom errors from it.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Давайте назовём его `MyError`.

Вот упрощённый код с `MyError` и другими пользовательскими классами ошибок:

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("Нет свойства: " + property);
    this.property = property;
  }
}

// name корректное
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

Теперь пользовательские ошибки стали намного короче, особенно `ValidationError`,
так как мы избавились от строки `"this.name = ..."`  в конструкторе.

## Обёртывание исключений

Назначение функции `readUser` в приведённом выше коде - это "чтение данных пользователя". В процессе могут возникнуть различные виды ошибок.  Сейчас у нас есть `SyntaxError` и `ValidationError`, но в будущем функция `readUser` может расшириться и, возможно, генерировать другие виды ошибок.

Код, который вызывает `readUser`, должен обрабатывать эти ошибки.

<<<<<<< HEAD
Сейчас в нём используются проверки `if` в блоке `catch`, которые проверяют класс и обрабатывают известные ошибки и пробрасывают дальше неизвестные. Но если функция `readUser` генерирует несколько видов ошибок, то мы должны спросить себя: действительно ли мы хотим проверять все типы ошибок поодиночке во всех местах в коде, где вызывается `readUser`?

Часто ответ "Нет": внешний код хочет быть на один уровень выше всего этого.  Он хочет иметь какую-то обобщённую ошибку чтения данных.  Почему именно это произошло -- часто не имеет значения (об этом говорится в сообщении об ошибке).  Или даже лучше, если есть способ получить подробности об ошибке, но только если нам это нужно.

Итак, давайте создадим новый класс `ReadError` для представления таких ошибок.  Если ошибка возникает внутри `readUser`, мы её перехватим и сгенерируем `ReadError`.  Мы также сохраним ссылку на исходную ошибку в свойстве `cause`.  Тогда внешний код должен будет только проверить наличие `ReadError`.
=======
The code which calls `readUser` should handle these errors. Right now it uses multiple `if`s in the `catch` block, that check the class and handle known errors and rethrow the unknown ones.

The scheme is like this:

```js
try {
  ...
  readUser()  // the potential error source
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // handle validation errors
  } else if (err instanceof SyntaxError) {
    // handle syntax errors
  } else {
    throw err; // unknown error, rethrow it
  }
}
```

In the code above we can see two types of errors, but there can be more.

If the `readUser` function generates several kinds of errors, then we should ask ourselves: do we really want to check for all error types one-by-one every time?

Often the answer is "No": we'd like to be "one level above all that". We just want to know if there was a "data reading error" -- why exactly it happened is often irrelevant (the error message describes it). Or, even better, we'd like to have a way to get the error details, but only if we need to.

The technique that we describe here is called "wrapping exceptions".

1. We'll make a new class `ReadError` to represent a generic "data reading" error.
2. The function `readUser` will catch data reading errors that occur inside it, such as `ValidationError` and `SyntaxError`, and generate a `ReadError` instead.
3. The `ReadError` object will keep the reference to the original error in its `cause` property.

Then the code that calls `readUser` will only have to check for `ReadError`, not for every kind of data reading errors. And if it needs more details of an error, it can check its `cause` property.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Этот код определяет ошибку `ReadError` и демонстрирует её использование в `readUser`и `try..catch`:

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Синтаксическая ошибка", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Ошибка валидации", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // Исходная ошибка: SyntaxError:Unexpected token b in JSON at position 1
    alert("Исходная ошибка: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

В приведённом выше коде `readUser` работает так, как описано - функция распознаёт синтаксические ошибки и ошибки валидации и выдаёт вместо них ошибки `ReadError` (неизвестные ошибки, как обычно, пробрасываются).

<<<<<<< HEAD
Внешний код проверяет только `instanceof ReadError`.  Не нужно перечислять все возможные типы ошибок

Этот подход называется "обёртывание исключений", потому что мы берём "исключения низкого уровня" и "оборачиваем" их в `ReadError`, который является более абстрактным и более удобным для использования в вызывающем коде.  Такой подход широко используется в объектно-ориентированном программировании.
=======
So the outer code checks `instanceof ReadError` and that's it. No need to list all possible error types.

The approach is called "wrapping exceptions", because we take "low level" exceptions and "wrap" them into `ReadError` that is more abstract. It is widely used in object-oriented programming.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

## Итого

<<<<<<< HEAD
- Мы можем наследовать свои классы ошибок от  `Error` и других встроенных классов ошибок, но нужно позаботиться о свойстве `name` и не забыть вызвать `super`.
- Мы можем использовать `instanceof` для проверки типа ошибок. Это также работает с наследованием. Но иногда у нас объект ошибки, возникшей в сторонней библиотеке, и нет простого способа получить класс. Тогда для проверки типа ошибки можно использовать свойство `name`.
- Обёртывание исключений является распространённой техникой: функция ловит низкоуровневые исключения и создаёт одно "высокоуровневое" исключение вместо разных низкоуровневых. Иногда низкоуровневые исключения становятся свойствами этого объекта, как `err.cause` в примерах выше, но это не обязательно.
=======
- We can inherit from `Error` and other built-in error classes normally. We just need to take care of the `name` property and don't forget to call `super`.
- We can use `instanceof` to check for particular errors. It also works with inheritance. But sometimes we have an error object coming from a 3rd-party library and there's no easy way to get its class. Then `name` property can be used for such checks.
- Wrapping exceptions is a widespread technique: a function handles low-level exceptions and creates higher-level errors instead of various low-level ones. Low-level exceptions sometimes become properties of that object like `err.cause` in the examples above, but that's not strictly required.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
