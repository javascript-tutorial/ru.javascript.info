
# Класс: базовый синтаксис

```quote author="Википедия"
В объектно-ориентированном программировании *класс* - это расширяемый шаблон кода для создания объектов, который устанавливает в них начальные значения (свойства) и реализацию поведения (методы).
```

На практике нам часто надо создавать много объектов одного вида, например пользователей, товары или что-то ещё.

Как мы уже знаем из главы <info:constructor-new>, с этим может помочь `new function`.

Но в современном JavaScript есть и более продвинутая конструкция "class", которая предоставляет новые возможности, полезные для объектно-ориентированного программирования.

## Синтаксис "class"

Базовый синтаксис выглядит так:
```js
class MyClass {
  // методы класса
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

Затем используйте вызов `new MyClass()` для создания нового объекта со всеми перечисленными методами.

При этом автоматически вызывается метод `constructor()`, в нём мы можем инициализировать объект.   

Например:

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// Использование:
let user = new User("Иван");
user.sayHi();
```
Когда вызывается `new User("Иван")`:
1. Создаётся новый объект.
2. `constructor` запускается с заданным аргументом и сохраняет его в `this.name`.

<<<<<<< HEAD
...Затем можно вызывать на объекте методы, такие как `user.sayHi()`.
=======
When `new User("John")` is called:
1. A new object is created.
2. The `constructor` runs with the given argument and assigns it to `this.name`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c


```warn header="Методы в классе не разделяются запятой"
Частая ошибка начинающих разработчиков - ставить запятую между методами класса, что приводит к синтаксической ошибке.

Синтаксис классов отличается от литералов объектов, не путайте их. Внутри классов запятые не требуются.
```

## Что такое класс?

Итак, что же такое `class`?  Это не полностью новая языковая сущность, как может показаться на первый взгляд.

Давайте развеем всю магию и посмотрим, что такое класс на самом деле. Это поможет в понимании многих сложных аспектов.

<<<<<<< HEAD
В JavaScript класс - это разновидность функции.
=======
In JavaScript, a class is a kind of function.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Взгляните:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// доказательство: User - это функция
*!*
alert(typeof User); // function
*/!*
```

Вот что на самом деле делает конструкция `class User {...}`:

1. Создаёт функцию с именем `User`, которая становится результатом объявления класса. Код функции берётся из метода `constructor` (она будет пустой, если такого метода нет).
2. Сохраняет все методы, такие как `sayHi`, в `User.prototype`.

<<<<<<< HEAD
При вызове метода объекта `new User` он будет взят из прототипа, как описано в главе <info:function-prototype>. Таким образом, объекты `new User` имеют доступ к методам класса.
=======
After `new User` object is created, when we call its method, it's taken from the prototype, just as described in the chapter <info:function-prototype>. So the object has access to class methods.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

На картинке показан результат объявления `class User`:

![](class-user.svg)

Можно проверить вышесказанное и при помощи кода:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// класс - это функция
alert(typeof User); // function

// ...или, если точнее, это метод constructor
alert(User === User.prototype.constructor); // true

<<<<<<< HEAD
// Методы находятся в User.prototype, например:
alert(User.prototype.sayHi); // alert(this.name);
=======
// The methods are in User.prototype, e.g:
alert(User.prototype.sayHi); // the code of the sayHi method
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

// в прототипе ровно 2 метода
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

<<<<<<< HEAD
## Не просто синтаксический сахар

Иногда говорят, что `class` - это просто "синтаксический сахар" в JavaScript (синтаксис для улучшения читаемости кода, но не делающий ничего принципиально нового), потому что мы можем сделать всё то же самое без конструкции `class`:
=======
## Not just a syntactic sugar

Sometimes people say that `class` is a "syntactic sugar" (syntax that is designed to make things easier to read, but doesn't introduce anything new), because we could actually declare the same without `class` keyword at all:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
// перепишем класс User на чистых функциях

// 1. Создаём функцию constructor
function User(name) {
  this.name = name;
}
<<<<<<< HEAD
// каждый прототип функции имеет свойство constructor по умолчанию,
// поэтому нам нет необходимости его создавать
=======
// a function prototype has "constructor" property by default,
// so we don't need to create it
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

// 2. Добавляем метод в прототип
User.prototype.sayHi = function() {
  alert(this.name);
};

// Использование:
let user = new User("Иван");
user.sayHi();
```
Результат этого кода очень похож. Поэтому, действительно, есть причины, по которым `class` можно считать синтаксическим сахаром для определения конструктора вместе с методами прототипа.

<<<<<<< HEAD
Однако есть важные отличия:

1. Во-первых, функция, созданная с помощью `class`, помечена специальным внутренним свойством `[[FunctionKind]]:"classConstructor"`. Поэтому это не совсем то же самое, что создавать её вручную.

    В отличие от обычных функций, конструктор класса не может быть вызван без `new`:
=======
The result of this definition is about the same. So, there are indeed reasons why `class` can be considered a syntactic sugar to define a constructor together with its prototype methods.

Still, there are important differences.

1. First, a function created by `class` is labelled by a special internal property `[[IsClassConstructor]]: true`. So it's not entirely the same as creating it manually.

    The language checks for that property in a variety of places. For example, unlike a regular function, it must be called with `new`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    ```js run
    class User {
      constructor() {}
    }

    alert(typeof User); // function
    User(); // Error: Class constructor User cannot be invoked without 'new'
    ```
    Кроме того, строковое представление конструктора класса в большинстве движков JavaScript начинается с "class ..."

    ```js run
    class User {
      constructor() {}
    }

    alert(User); // class User { ... }
    ```
    There are other differences, we'll see them soon.

2. Методы класса являются неперечислимыми.
    Определение класса устанавливает флаг `enumerable` в` false` для всех методов в `"prototype"`.

    И это хорошо, так как если мы проходимся циклом `for..in` по объекту, то обычно мы не хотим при этом получать методы класса.

3. Классы всегда используют `use strict`.
    Весь код внутри класса автоматически находится в строгом режиме.

Также в дополнение к основной, описанной выше, функциональности, синтаксис `class` даёт ряд других интересных возможностей, с которыми мы познакомимся чуть позже.

## Class Expression

<<<<<<< HEAD
Как и функции, классы можно определять внутри другого выражения, передавать, возвращать, присваивать и т.д.
=======
Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Пример Class Expression (по аналогии с Function Expression):

```js
let User = class {
  sayHi() {
    alert("Привет");
  }
};
```

Аналогично Named Function Expression, Class Expression может иметь имя.

Если у Class Expression есть имя, то оно видно только внутри класса:

```js run
// "Named Class Expression"
// (в спецификации нет такого термина, но происходящее похоже на Named Function Expression)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // имя MyClass видно только внутри класса
  }
};

new User().sayHi(); // работает, выводит определение MyClass

alert(MyClass); // ошибка, имя MyClass не видно за пределами класса
```

<<<<<<< HEAD
Мы даже можем динамически создавать классы "по запросу":
=======
We can even make classes dynamically "on-demand", like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function makeClass(phrase) {
  // объявляем класс и возвращаем его
  return class {
    sayHi() {
      alert(phrase);
    }
  };
}

// Создаём новый класс
let User = makeClass("Привет");

new User().sayHi(); // Привет
```


<<<<<<< HEAD
## Геттеры/сеттеры, другие сокращения
=======
## Getters/setters
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Как и в литеральных объектах, в классах можно объявлять вычисляемые свойства, геттеры/сеттеры и т.д.

Вот пример `user.name`, реализованного с использованием `get/set`:

```js run
class User {

  constructor(name) {
    // вызывает сеттер
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Имя слишком короткое.");
      return;
    }
    this._name = value;
  }

}

let user = new User("Иван");
alert(user.name); // Иван

<<<<<<< HEAD
user = new User(""); // Имя слишком короткое.
```

При объявлении класса геттеры/сеттеры создаются на `User.prototype`, вот так:
=======
user = new User(""); // Name is too short.
```

Technically, such class declaration works by creating getters and setters in `User.prototype`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Computed names [...]

<<<<<<< HEAD
Пример с вычисляемым свойством в скобках `[...]`:
=======
Here's an example with a computed method name using brackets `[...]`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
class User {

  ['say' + 'Hi']() {
    alert("Привет");
  }

}

new User().sayHi();
```

<<<<<<< HEAD
## Свойства классов

```warn header="Старым браузерам может понадобиться полифил"
Свойства классов добавлены в язык недавно.
```
В приведённом выше примере у класса `User` были только методы. Давайте добавим свойство:
=======
Such features are easy to remember, as they resemble that of literal objects.

## Class fields

```warn header="Old browsers may need a polyfill"
Class fields are a recent addition to the language.
```

Previously, our classes only had methods.

"Class fields" is a syntax that allows to add any properties.

For instance, let's add `name` property to `class User`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
class User {
*!*
<<<<<<< HEAD
  name = "Аноним";
=======
  name = "John";
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*/!*

  sayHi() {
    alert(`Привет, ${this.name}!`);
  }
}

new User().sayHi(); // Hello, John!
```

So, we just write "<property name> = <value>" in the declaration, and that's it.

The important difference of class fields is that they are set on individual objects, not `User.prototype`:

```js run
class User {
*!*
  name = "John";
*/!*
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

We can also assign values using more complex expressions and function calls:

```js run
class User {
*!*
  name = prompt("Name, please?", "John");
*/!*
}

let user = new User();
alert(user.name); // John
```

<<<<<<< HEAD
Свойство `name` не устанавливается в `User.prototype`. Вместо этого оно создаётся оператором `new` перед запуском конструктора, это именно свойство объекта.
=======

### Making bound methods with class fields

As demonstrated in the chapter <info:bind> functions in JavaScript have a dynamic `this`. It depends on the context of the call.

So if an object method is passed around and called in another context, `this` won't be a reference to its object any more.

For instance, this code will show `undefined`:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

*!*
setTimeout(button.click, 1000); // undefined
*/!*
```

The problem is called "losing `this`".

There are two approaches to fixing it, as discussed in the chapter <info:bind>:

1. Pass a wrapper-function, such as `setTimeout(() => button.click(), 1000)`.
2. Bind the method to object, e.g. in the constructor.

Class fields provide another, quite elegant syntax:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }
*!*
  click = () => {
    alert(this.value);
  }
*/!*
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
```

The class field `click = () => {...}` is created on a per-object basis, there's a separate function for each `Button` object, with `this` inside it referencing that object. We can pass `button.click` around anywhere, and the value of `this` will always be correct.

That's especially useful in browser environment, for event listeners.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Итого

Базовый синтаксис для классов выглядит так:

```js
class MyClass {
  prop = value; // свойство
  constructor(...) { // конструктор
    // ...
  }
  method(...) {} // метод
  get something(...) {} // геттер
  set something(...) {} // сеттер
  [Symbol.iterator]() {} // метод с вычисляемым именем (здесь - символом)
  // ...
}
```

<<<<<<< HEAD
`MyClass` технически является функцией (той, которую мы определяем как `constructor`), в то время как методы, геттеры и сеттеры записываются в `MyClass.prototype`.
=======
`MyClass` is technically a function (the one that we provide as `constructor`), while methods, getters and setters are written to `MyClass.prototype`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

В следующих главах мы узнаем больше о классах, включая наследование и другие возможности.
