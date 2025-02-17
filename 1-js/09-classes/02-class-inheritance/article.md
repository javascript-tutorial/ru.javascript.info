
# Наследование классов

<<<<<<< HEAD
Наследование классов - это способ расширения одного класса другим классом.

Таким образом, мы можем добавить новый функционал к уже существующему.

## Ключевое слово "extends"

Допустим, у нас есть класс `Animal`:
=======
Class inheritance is a way for one class to extend another class.

So we can create new functionality on top of the existing.

## The "extends" keyword

Let's say we have class `Animal`:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
<<<<<<< HEAD
    alert(`${this.name} бежит со скоростью ${this.speed}.`);
=======
    alert(`${this.name} runs with speed ${this.speed}.`);
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} стоит неподвижно.`);
  }
}

let animal = new Animal("Мой питомец");
```

<<<<<<< HEAD
Вот как мы можем представить объект `animal` и класс `Animal` графически:

![](rabbit-animal-independent-animal.svg)

...И мы хотели бы создать ещё один `class Rabbit`.

Поскольку кролики - это животные, класс `Rabbit` должен быть основан на `Animal`, и иметь доступ к методам животных, так чтобы кролики могли делать то, что могут делать "общие" животные.

Синтаксис для расширения другого класса следующий: `class Child extends Parent`.

Давайте создадим `class Rabbit`, который наследуется от `Animal`:
=======
Here's how we can represent `animal` object and `Animal` class graphically:

![](rabbit-animal-independent-animal.svg)

...And we would like to create another `class Rabbit`.

As rabbits are animals, `Rabbit` class should be based on `Animal`, have access to animal methods, so that rabbits can do what "generic" animals can do.

The syntax to extend another class is: `class Child extends Parent`.

Let's create `class Rabbit` that inherits from `Animal`:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
*!*
class Rabbit extends Animal {
*/!*
  hide() {
    alert(`${this.name} прячется!`);
  }
}

let rabbit = new Rabbit("Белый кролик");

rabbit.run(5); // Белый кролик бежит со скоростью 5.
rabbit.hide(); // Белый кролик прячется!
```

<<<<<<< HEAD
Объект класса `Rabbit` имеет доступ как к методам `Rabbit`, таким как `rabbit.hide()`, так и к методам `Animal`, таким как `rabbit.run()`.

Внутри ключевое слово `extends` работает по старой доброй механике прототипов. Оно устанавливает `Rabbit.prototype.[[Prototype]]` в `Animal.prototype`. Таким образом, если метода не оказалось в `Rabbit.prototype`, JavaScript берет его из `Animal.prototype`.

![](animal-rabbit-extends.svg)

Например, чтобы найти метод `rabbit.run`, движок проверяет (снизу вверх на картинке):
1. Объект `rabbit` (не имеет `run`).
2. Его прототип, то есть `Rabbit.prototype` (имеет `hide`, но не имеет `run`).
3. Его прототип, то есть (вследствие `extends`) `Animal.prototype`, в котором, наконец, есть метод `run`.

Как мы помним из главы <info:native-prototypes>, сам JavaScript использует наследование на прототипах для встроенных объектов. Например, `Date.prototype.[[Prototype]]` является `Object.prototype`, поэтому у дат есть универсальные методы объекта.
=======
Object of `Rabbit` class have access both to `Rabbit` methods, such as `rabbit.hide()`, and also to `Animal` methods, such as `rabbit.run()`.

Internally, `extends` keyword works using the good old prototype mechanics. It sets `Rabbit.prototype.[[Prototype]]` to `Animal.prototype`. So, if a method is not found in `Rabbit.prototype`, JavaScript takes it from `Animal.prototype`.

![](animal-rabbit-extends.svg)

For instance, to find `rabbit.run` method, the engine checks (bottom-up on the picture):
1. The `rabbit` object (has no `run`).
2. Its prototype, that is `Rabbit.prototype` (has `hide`, but not `run`).
3. Its prototype, that is (due to `extends`) `Animal.prototype`, that finally has the `run` method.

As we can recall from the chapter <info:native-prototypes>, JavaScript itself uses prototypal inheritance for built-in objects. E.g. `Date.prototype.[[Prototype]]` is `Object.prototype`. That's why dates have access to generic object methods.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

````smart header="После `extends` разрешены любые выражения"
Синтаксис создания класса допускает указывать после `extends` не только класс, но и любое выражение.

Пример вызова функции, которая генерирует родительский класс:

```js run
function f(phrase) {
  return class {
    sayHi() { alert(phrase); }
  };
}

*!*
class User extends f("Привет") {}
*/!*

new User().sayHi(); // Привет
```
Здесь `class User` наследует от результата вызова `f("Привет")`.

Это может быть полезно для продвинутых приёмов проектирования, где мы можем использовать функции для генерации классов в зависимости от многих условий и затем наследовать их.
````

## Переопределение методов

<<<<<<< HEAD
Теперь давайте продвинемся дальше и переопределим метод. По умолчанию все методы, не указанные в классе `Rabbit`, берутся непосредственно "как есть" из класса `Animal`.

Но если мы укажем в `Rabbit` собственный метод, например `stop()`, то он будет использован вместо него:
=======
Now let's move forward and override a method. By default, all methods that are not specified in `class Rabbit` are taken directly "as is" from `class Animal`.

But if we specify our own method in `Rabbit`, such as `stop()` then it will be used instead:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
class Rabbit extends Animal {
  stop() {
<<<<<<< HEAD
    // ...теперь это будет использоваться для rabbit.stop()
    // вместо stop() из класса Animal
=======
    // ...now this will be used for rabbit.stop()
    // instead of stop() from class Animal
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
  }
}
```

<<<<<<< HEAD
Впрочем, обычно мы не хотим полностью заменить родительский метод, а скорее хотим сделать новый на его основе, изменяя или расширяя его функциональность. Мы делаем что-то в нашем методе и вызываем родительский метод до/после или в процессе.
=======
Usually, however, we don't want to totally replace a parent method, but rather to build on top of it to tweak or extend its functionality. We do something in our method, but call the parent method before/after it or in the process.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

У классов есть ключевое слово `"super"` для таких случаев.

- `super.method(...)` вызывает родительский метод.
- `super(...)` для вызова родительского конструктора (работает только внутри нашего конструктора).

Пусть наш кролик автоматически прячется при остановке:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
<<<<<<< HEAD
    alert(`${this.name} бежит со скоростью ${this.speed}.`);
=======
    alert(`${this.name} runs with speed ${this.speed}.`);
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} стоит.`);
  }

}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} прячется!`);
  }

*!*
  stop() {
    super.stop(); // вызываем родительский метод stop
    this.hide(); // и затем hide
  }
*/!*
}

let rabbit = new Rabbit("Белый кролик");

<<<<<<< HEAD
rabbit.run(5); // Белый кролик бежит со скоростью 5.
rabbit.stop(); // Белый кролик стоит. Белый кролик прячется!
=======
rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stands still. White Rabbit hides!
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```

Теперь у класса `Rabbit` есть метод `stop`, который вызывает родительский `super.stop()` в процессе выполнения.

````smart header="У стрелочных функций нет `super`"
Как упоминалось в главе <info:arrow-functions>, стрелочные функции не имеют `super`.

При обращении к `super` стрелочной функции он берётся из внешней функции:

<<<<<<< HEAD
=======
If accessed, it's taken from the outer function. For instance:

>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // вызывает родительский stop после 1 секунды
  }
}
```

В примере `super` в стрелочной функции тот же самый, что и в  `stop()`, поэтому метод отрабатывает как и ожидается. Если бы мы указали здесь "обычную" функцию, была бы ошибка:

```js
// Unexpected super
setTimeout(function() { super.stop() }, 1000);
```
````

<<<<<<< HEAD
## Переопределение конструктора

С конструкторами немного сложнее.
=======
## Overriding constructor
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

До сих пор у `Rabbit` не было своего конструктора.

<<<<<<< HEAD
Согласно [спецификации](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation), если класс расширяет другой класс и не имеет конструктора, то автоматически создаётся такой "пустой" конструктор:
=======
Until now, `Rabbit` did not have its own `constructor`.

According to the [specification](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation), if a class extends another class and has no `constructor`, then the following "empty" `constructor` is generated:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
class Rabbit extends Animal {
  // генерируется для классов-потомков, у которых нет своего конструктора
*!*
  constructor(...args) {
    super(...args);
  }
*/!*
}
```

Как мы видим, он просто вызывает конструктор родительского класса. Так будет происходить, пока мы не создадим собственный конструктор.

Давайте добавим конструктор для `Rabbit`. Он будет устанавливать `earLength` в дополнение к `name`:

```js run
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}

class Rabbit extends Animal {

*!*
  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }
*/!*

  // ...
}

*!*
// Не работает!
let rabbit = new Rabbit("Белый кролик", 10); // Error: this is not defined.
*/!*
```

Упс! При создании кролика - ошибка! Что не так?

<<<<<<< HEAD
Если коротко, то:
=======
The short answer is:

- **Constructors in inheriting classes must call `super(...)`, and (!) do it before using `this`.**
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

- **Конструкторы в наследуемых классах должны обязательно вызывать `super(...)`, и (!) делать это перед использованием `this`.**

...Но почему? Что происходит? Это требование кажется довольно странным.

<<<<<<< HEAD
Конечно, всему есть своё объяснение. Давайте углубимся в детали, чтобы вы действительно поняли, что происходит.

В JavaScript существует различие между "функцией-конструктором наследующего класса" и всеми остальными. В наследующем классе соответствующая функция-конструктор помечена специальным внутренним свойством `[[ConstructorKind]]:"derived"`.

Разница в следующем:

- Когда выполняется обычный конструктор, он создаёт пустой объект и присваивает его `this` .
- Когда запускается конструктор унаследованного класса, он этого не делает. Вместо этого он ждёт, что это сделает конструктор родительского класса.

Поэтому, если мы создаём собственный конструктор, мы должны вызвать `super`, в противном случае объект для `this` не будет создан, и мы получим ошибку.

Чтобы конструктор `Rabbit` работал, он должен вызвать `super()` до того, как использовать `this`, чтобы не было ошибки:
=======
In JavaScript, there's a distinction between a constructor function of an inheriting class (so-called "derived constructor") and other functions. A derived constructor has a special internal property `[[ConstructorKind]]:"derived"`. That's a special internal label.

That label affects its behavior with `new`.

- When a regular function is executed with `new`, it creates an empty object and assigns it to `this`.
- But when a derived constructor runs, it doesn't do this. It expects the parent constructor to do this job.

So a derived constructor must call `super` in order to execute its parent (base) constructor, otherwise the object for `this` won't be created. And we'll get an error.

For the `Rabbit` constructor to work, it needs to call `super()` before using `this`, like here:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {
*!*
    super(name);
*/!*
    this.earLength = earLength;
  }

  // ...
}

*!*
// теперь работает
let rabbit = new Rabbit("Белый кролик", 10);
alert(rabbit.name); // Белый кролик
alert(rabbit.earLength); // 10
*/!*
```

<<<<<<< HEAD
### Переопределение полей класса: тонкое замечание
=======
### Overriding class fields: a tricky note

```warn header="Advanced note"
This note assumes you have a certain experience with classes, maybe in other programming languages.

It provides better insight into the language and also explains the behavior that might be a source of bugs (but not very often).

If you find it difficult to understand, just go on, continue reading, then return to it some time later.
```

We can override not only methods, but also class fields.

Although, there's a tricky behavior when we access an overridden field in parent constructor, quite different from most other programming languages.

Consider this example:

```js run
class Animal {
  name = 'animal';

  constructor() {
    alert(this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit';
}

new Animal(); // animal
*!*
new Rabbit(); // animal
*/!*
```

Here, class `Rabbit` extends `Animal` and overrides the `name` field with its own value.

There's no own constructor in `Rabbit`, so `Animal` constructor is called.

What's interesting is that in both cases: `new Animal()` and `new Rabbit()`, the `alert` in the line `(*)` shows `animal`.

**In other words, the parent constructor always uses its own field value, not the overridden one.**

What's odd about it?

If it's not clear yet, please compare with methods.

Here's the same code, but instead of `this.name` field we call `this.showName()` method:

```js run
class Animal {
  showName() {  // instead of this.name = 'animal'
    alert('animal');
  }

  constructor() {
    this.showName(); // instead of alert(this.name);
  }
}

class Rabbit extends Animal {
  showName() {
    alert('rabbit');
  }
}

new Animal(); // animal
*!*
new Rabbit(); // rabbit
*/!*
```

Please note: now the output is different.

And that's what we naturally expect. When the parent constructor is called in the derived class, it uses the overridden method.

...But for class fields it's not so. As said, the parent constructor always uses the parent field.

Why is there a difference?

Well, the reason is the field initialization order. The class field is initialized:
- Before constructor for the base class (that doesn't extend anything),
- Immediately after `super()` for the derived class.

In our case, `Rabbit` is the derived class. There's no `constructor()` in it. As said previously, that's the same as if there was an empty constructor with only `super(...args)`.

So, `new Rabbit()` calls `super()`, thus executing the parent constructor, and (per the rule for derived classes) only after that its class fields are initialized. At the time of the parent constructor execution, there are no `Rabbit` class fields yet, that's why `Animal` fields are used.

This subtle difference between fields and methods is specific to JavaScript.

Luckily, this behavior only reveals itself if an overridden field is used in the parent constructor. Then it may be difficult to understand what's going on, so we're explaining it here.

If it becomes a problem, one can fix it by using methods or getters/setters instead of fields.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```warn header="Продвинутое замечание"
В этом подразделе предполагается, что у вас уже есть определённый опыт работы с классами, возможно, в других языках программирования.

Это даёт лучшее представление о языке, а также объясняет поведение, которое может быть источником ошибок (но не очень часто).

Если вы считаете этот материал слишком трудным для понимания, просто продолжайте читать дальше, а затем вернитесь к нему через некоторое время.
```

Мы можем переопределять не только методы, но и поля класса.

Однако, когда мы получаем доступ к переопределенному полю в родительском конструкторе, это поведение отличается от большинства других языков программирования.

Рассмотрим этот пример:

```js run
class Animal {
  name = 'animal';

  constructor() {
    alert(this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit';
}

new Animal(); // animal
*!*
new Rabbit(); // animal
*/!*
```

Здесь, класс `Rabbit` расширяет `Animal` и переопределяет поле `name` своим собственным значением.

В `Rabbit` нет собственного конструктора, поэтому вызывается конструктор `Animal`.

Что интересно, в обоих случаях: `new Animal()` и `new Rabbit()`, `alert` в строке `(*)` показывает `animal`.

**Другими словами, родительский конструктор всегда использует своё собственное значение поля, а не переопределённое.**

Что же в этом странного?

Если это ещё не ясно, сравните с методами.

Вот тот же код, но вместо поля `this.name`, мы вызываем метод `this.showName()`:

```js run
class Animal {
  showName() {  // вместо this.name = 'animal'
    alert('animal');
  }

  constructor() {
    this.showName(); // вместо alert(this.name);
  }
}

class Rabbit extends Animal {
  showName() {
    alert('rabbit');
  }
}

new Animal(); // animal
*!*
new Rabbit(); // rabbit
*/!*
```

Обратите внимание: теперь результат другой.

И это то, чего мы, естественно, ожидаем. Когда родительский конструктор вызывается в производном классе, он использует переопределённый метод.

...Но для полей класса это не так. Как уже было сказано, родительский конструктор всегда использует родительское поле.

Почему же наблюдается разница?

Что ж, причина заключается в порядке инициализации полей. Поле класса инициализируется:
- Перед конструктором для базового класса (который ничего не расширяет),
- Сразу после `super()` для производного класса.

В нашем случае `Rabbit` - это производный класс. В нем нет конструктора `constructor()`. Как было сказано ранее, это то же самое, как если бы был пустой конструктор, содержащий только `super(...args)`.

Итак, `new Rabbit()` вызывает `super()`, таким образом, выполняя родительский конструктор, и (согласно правилу для производных классов) только после этого инициализируются поля его класса. На момент выполнения родительского конструктора ещё нет полей класса `Rabbit`, поэтому используются поля `Animal`.

Это тонкое различие между полями и методами характерно для JavaScript.

К счастью, такое поведение проявляется только в том случае, когда переопределенное поле используется в родительском конструкторе. Тогда может быть трудно понять, что происходит, поэтому мы объясняем это здесь.

Если это становится проблемой, её можно решить, используя методы или геттеры/сеттеры вместо полей.

## Устройство super, [[HomeObject]]

```warn header="Продвинутая информация"
Если вы читаете учебник первый раз - эту секцию можно пропустить.

Она рассказывает о внутреннем устройстве наследования и вызовe `super`.
```

Давайте заглянем "под капот" `super`. Здесь есть некоторые интересные моменты.

Вообще, исходя из наших знаний до этого момента, `super` вообще не может работать!

Ну правда, давайте спросим себя - как он должен работать, чисто технически? Когда метод объекта выполняется, он получает текущий объект как `this`. Если мы вызываем `super.method()`, то движку необходимо получить `method` из прототипа текущего объекта. И как ему это сделать?

Задача может показаться простой, но это не так. Движок знает текущий `this` и мог бы попытаться получить родительский метод как `this.__proto__.method`. Однако, увы, такой "наивный" путь не работает.

Продемонстрируем проблему. Без классов, используя простые объекты для наглядности.

Вы можете пропустить эту часть и перейти ниже к подсекции `[[HomeObject]]`, если не хотите знать детали. Вреда не будет. Или читайте далее, если хотите разобраться.

В примере ниже `rabbit.__proto__ = animal`. Попробуем в `rabbit.eat()` вызвать `animal.eat()`, используя `this.__proto__`:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} ест.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Кролик",
  eat() {
*!*
    // вот как предположительно может работать super.eat()
    this.__proto__.eat.call(this); // (*)
*/!*
  }
};

rabbit.eat(); // Кролик ест.
```

В строке `(*)` мы берём `eat` из прототипа (`animal`) и вызываем его в контексте текущего объекта. Обратите внимание, что `.call(this)` здесь неспроста: простой вызов `this.__proto__.eat()` будет выполнять родительский `eat` в контексте прототипа, а не текущего объекта.

Приведённый выше код работает так, как задумано: выполняется нужный `alert`.

Теперь давайте добавим ещё один объект в цепочку наследования и увидим, как все сломается:

```js run
let animal = {
  name: "Животное",
  eat() {
    alert(`${this.name} ест.`);
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
    // ...делаем что-то специфичное для кролика и вызываем родительский (animal) метод
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    // ...делаем что-то, связанное с длинными ушами, и вызываем родительский (rabbit) метод
    this.__proto__.eat.call(this); // (**)
  }
};

*!*
longEar.eat(); // Error: Maximum call stack size exceeded
*/!*
```

Теперь код не работает! Ошибка возникает при попытке вызова `longEar.eat()`.

На первый взгляд все не так очевидно, но если мы проследим вызов `longEar.eat()`, то сможем понять причину ошибки. В обеих строках `(*)` и `(**)` значение `this` - это текущий объект (`longEar`). Это важно: для всех методов объекта `this` указывает на текущий объект, а не на прототип или что-то ещё.

Итак, в обеих линиях `(*)` и `(**)` значение `this.__proto__` одно и то же: `rabbit`. В обоих случаях метод `rabbit.eat` вызывается в бесконечном цикле не поднимаясь по цепочке вызовов.

Картина того, что происходит:

![](this-super-loop.svg)

1. Внутри `longEar.eat()` строка `(**)` вызывает `rabbit.eat` со значением `this=longEar`.
    ```js
    // внутри longEar.eat() у нас this = longEar
    this.__proto__.eat.call(this) // (**)
    // становится
    longEar.__proto__.eat.call(this)
    // то же что и
    rabbit.eat.call(this);
    ```
2. В строке `(*)` в `rabbit.eat` мы хотим передать вызов выше по цепочке, но `this=longEar`, поэтому `this.__proto__.eat` снова равен `rabbit.eat`!

    ```js
    // внутри rabbit.eat() у нас также this = longEar
    this.__proto__.eat.call(this) // (*)
    // становится
    longEar.__proto__.eat.call(this)
    // или (снова)
    rabbit.eat.call(this);
    ```

3. ...`rabbit.eat` вызывает себя в бесконечном цикле, потому что не может подняться дальше по цепочке.

Проблема не может быть решена с помощью одного только `this`.

### `[[HomeObject]]`

Для решения этой проблемы в JavaScript было добавлено специальное внутреннее свойство для функций: `[[HomeObject]]`.

Когда функция объявлена как метод внутри класса или объекта, её свойство `[[HomeObject]]` становится равно этому объекту.

Затем `super` использует его, чтобы получить прототип родителя и его методы.

Давайте посмотрим, как это работает - опять же, используя простые объекты:

```js run
let animal = {
  name: "Животное",
  eat() {         // animal.eat.[[HomeObject]] == animal
    alert(`${this.name} ест.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Кролик",
  eat() {         // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "Длинноух",
  eat() {         // longEar.eat.[[HomeObject]] == longEar
    super.eat();
  }
};

*!*
// работает верно
longEar.eat();  // Длинноух ест.
*/!*
```

Это работает как задумано благодаря `[[HomeObject]]`. Метод, такой как `longEar.eat`, знает свой `[[HomeObject]]` и получает метод родителя из его прототипа. Вообще без использования `this`.

### Методы не "свободны"

До этого мы неоднократно видели, что функции в JavaScript "свободны", не привязаны к объектам. Их можно копировать между объектами и вызывать с любым `this`.

<<<<<<< HEAD
Но само существование `[[HomeObject]]` нарушает этот принцип, так как методы запоминают свои объекты. `[[HomeObject]]` нельзя изменить, эта связь - навсегда.
=======
The very existence of `[[HomeObject]]` violates that principle, because methods remember their objects. `[[HomeObject]]` can't be changed, so this bond is forever.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Единственное место в языке, где используется `[[HomeObject]]` - это `super`. Поэтому если метод не использует `super`, то мы все ещё можем считать его свободным и копировать между объектами. А вот если `super` в коде есть, то возможны побочные эффекты.

Вот пример неверного результата `super` после копирования:

```js run
let animal = {
  sayHi() {
<<<<<<< HEAD
    alert("Я животное");
=======
    alert(`I'm an animal`);
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
  }
};

// rabbit наследует от animal
let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
<<<<<<< HEAD
    alert("Я растение");
=======
    alert("I'm a plant");
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
  }
};

// tree наследует от plant
let tree = {
  __proto__: plant,
*!*
  sayHi: rabbit.sayHi // (*)
*/!*
};

*!*
tree.sayHi();  // Я животное (?!?)
*/!*
```

<<<<<<< HEAD
Вызов `tree.sayHi()` показывает "Я животное". Определённо неверно.
=======
A call to `tree.sayHi()` shows "I'm an animal". Definitely wrong.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Причина проста:
- В строке `(*)`, метод `tree.sayHi` скопирован из `rabbit`. Возможно, мы хотели избежать дублирования кода?
- Его `[[HomeObject]]` - это `rabbit`, ведь он был создан в `rabbit`. Свойство `[[HomeObject]]` никогда не меняется.
- В коде `tree.sayHi()` есть вызов `super.sayHi()`. Он идёт вверх от `rabbit` и берёт метод из `animal`.

Вот диаграмма происходящего:

![](super-homeobject-wrong.svg)


### Методы, а не свойства-функции

Свойство `[[HomeObject]]` определено для методов как классов, так и обычных объектов. Но для объектов методы должны быть объявлены именно как `method()`, а не `"method: function()"`.

Для нас различий нет, но они есть для JavaScript.

В приведённом ниже примере используется синтаксис не метода, свойства-функции. Поэтому у него нет `[[HomeObject]]`, и наследование не работает:

```js run
let animal = {
<<<<<<< HEAD
  eat: function() { // намеренно пишем так, а не eat() { ...
=======
  eat: function() { // intentionally writing like this instead of eat() {...
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
    // ...
  }
};

let rabbit = {
  __proto__: animal,
  eat: function() {
    super.eat();
  }
};

*!*
rabbit.eat();  // Ошибка вызова super (потому что нет [[HomeObject]])
*/!*
```


## Итого

<<<<<<< HEAD
1. Чтобы унаследовать от класса: `class Child extends Parent`:
    - При этом `Child.prototype.__proto__` будет равен `Parent.prototype`, так что методы будут унаследованы.
2. При переопределении конструктора:
    - Обязателен вызов конструктора родителя `super()` в конструкторе `Child` до обращения к `this`.
3. При переопределении другого метода:
    - Мы можем вызвать `super.method()` в методе `Child` для обращения к методу родителя `Parent`.
4. Внутренние детали:
    - Методы запоминают свой объект во внутреннем свойстве `[[HomeObject]]`. Благодаря этому работает `super`, он в его прототипе ищет родительские методы.
    - Поэтому копировать метод, использующий `super`, между разными объектами небезопасно.

Также:
- У стрелочных функций нет своего `this` и `super`, поэтому они "прозрачно" встраиваются во внешний контекст.
=======
Also:
- Arrow functions don't have their own `this` or `super`, so they transparently fit into the surrounding context.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
