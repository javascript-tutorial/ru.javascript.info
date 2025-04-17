
# Статические свойства и методы

<<<<<<< HEAD
Мы также можем присвоить метод самому классу. Такие методы называются *статическими*.

В объявление класса они добавляются с помощью ключевого слова `static`, например:
=======
We can also assign a method to the class as a whole. Such methods are called *static*.

In a class declaration, they are prepended by `static` keyword, like this:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
class User {
*!*
  static staticMethod() {
*/!*
    alert(this === User);
  }
}

User.staticMethod(); // true
```

Это фактически то же самое, что присвоить метод напрямую как свойство функции:

<<<<<<< HEAD
```js
=======
```js run
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
class User { }

User.staticMethod = function() {
  alert(this === User);
};

User.staticMethod(); // true
```

Значением `this` при вызове `User.staticMethod()` является сам конструктор класса `User` (правило "объект до точки").

<<<<<<< HEAD
Обычно статические методы используются для реализации функций, которые будут принадлежать классу в целом, но не какому-либо его конкретному объекту.

Звучит не очень понятно? Сейчас все встанет на свои места.

Например, есть объекты статей `Article`, и нужна функция для их сравнения.

Естественное решение – сделать для этого статический метод `Article.compare`:
=======
Usually, static methods are used to implement functions that belong to the class as a whole, but not to any particular object of it.

For instance, we have `Article` objects and need a function to compare them.

A natural solution would be to add `Article.compare` static method:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
*/!*
}

// использование
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // CSS
```

<<<<<<< HEAD
Здесь метод `Article.compare` стоит "над" статьями, как средство для их сравнения. Это метод не отдельной статьи, а всего класса.

Другим примером может быть так называемый "фабричный" метод.
=======
Here `Article.compare` method stands "above" articles, as a means to compare them. It's not a method of an article, but rather of the whole class.

Another example would be a so-called "factory" method.

Let's say, we need multiple ways to create an article:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Скажем, нам нужно несколько способов создания статьи:

1. Создание через заданные параметры (`title`, `date` и т. д.).
2. Создание пустой статьи с сегодняшней датой.
3. ...или как-то ещё.

<<<<<<< HEAD
Первый способ может быть реализован через конструктор. А для второго можно использовать статический метод класса.

Такой как `Article.createTodays()` в следующем примере:
=======
Such as `Article.createTodays()` here:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
    // помним, что this = Article
    return new this("Сегодняшний дайджест", new Date());
  }
*/!*
}

let article = Article.createTodays();

alert( article.title ); // Сегодняшний дайджест
```

Теперь каждый раз, когда нам нужно создать сегодняшний дайджест, нужно вызывать `Article.createTodays()`. Ещё раз, это не метод одной статьи, а метод всего класса.

Статические методы также используются в классах, относящихся к базам данных, для поиска/сохранения/удаления вхождений в базу данных, например:

```js
<<<<<<< HEAD
// предположим, что Article - это специальный класс для управления статьями
// статический метод для удаления статьи по id:
Article.remove({id: 12345});
```

````warn header="Статические методы недоступны для отдельных объектов"
Статические методы могут вызываться для классов, но не для отдельных объектов.

Например. такой код не будет работать:
=======
// assuming Article is a special class for managing articles
// static method to remove the article by id:
Article.remove({id: 12345});
```

````warn header="Static methods aren't available for individual objects"
Static methods are callable on classes, not on individual objects.

E.g. such code won't work:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js
// ...
article.createTodays(); /// Error: article.createTodays is not a function
```
````

<<<<<<< HEAD
## Статические свойства
=======
## Static properties
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

[recent browser=Chrome]

Статические свойства также возможны, они выглядят как свойства класса, но с `static` в начале:

```js run
class Article {
  static publisher = "Илья Кантор";
}

alert( Article.publisher ); // Илья Кантор
```

Это то же самое, что и прямое присваивание `Article`:

```js
Article.publisher = "Илья Кантор";
```

<<<<<<< HEAD
## Наследование статических свойств и методов [#statics-and-inheritance]

Статические свойства и методы наследуются.

Например, метод `Animal.compare` в коде ниже наследуется и доступен как `Rabbit.compare`:
=======
## Inheritance of static properties and methods [#statics-and-inheritance]

Static properties and methods are inherited.

For instance, `Animal.compare` and `Animal.planet` in the code below are inherited and accessible as `Rabbit.compare` and `Rabbit.planet`:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
class Animal {
  static planet = "Earth";

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} бежит со скоростью ${this.speed}.`);
  }

*!*
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
*/!*

}

// Наследует от Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} прячется!`);
  }
}

let rabbits = [
  new Rabbit("Белый кролик", 10),
  new Rabbit("Чёрный кролик", 5)
];

*!*
rabbits.sort(Rabbit.compare);
*/!*

<<<<<<< HEAD
rabbits[0].run(); // Чёрный кролик бежит со скоростью 5.
```

Мы можем вызвать `Rabbit.compare`, при этом будет вызван унаследованный `Animal.compare`.
=======
rabbits[0].run(); // Black Rabbit runs with speed 5.

alert(Rabbit.planet); // Earth
```

Now when we call `Rabbit.compare`, the inherited `Animal.compare` will be called.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Как это работает? Снова с использованием прототипов. Как вы уже могли предположить, `extends` даёт `Rabbit` ссылку `[[Prototype]]` на `Animal`.

![](animal-rabbit-static.svg)

Так что `Rabbit extends Animal` создаёт две ссылки на прототип:

1. Функция `Rabbit` прототипно наследует от функции `Animal`.
2. `Rabbit.prototype` прототипно наследует от `Animal.prototype`.

<<<<<<< HEAD
В результате наследование работает как для обычных, так и для статических методов.
=======
As a result, inheritance works both for regular and static methods.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Давайте это проверим кодом:

```js run
class Animal {}
class Rabbit extends Animal {}

// для статики
alert(Rabbit.__proto__ === Animal); // true

<<<<<<< HEAD
// для обычных методов
=======
// for regular methods
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
```

## Итого

<<<<<<< HEAD
Статические методы используются для функциональности, принадлежат классу "в целом", а не относятся к конкретному объекту класса.
=======
Static methods are used for the functionality that belongs to the class "as a whole". It doesn't relate to a concrete class instance.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Например, метод для сравнения двух статей `Article.compare(article1, article2)` или фабричный метод `Article.createTodays()`.

В объявлении класса они помечаются ключевым словом `static`.

Статические свойства используются в тех случаях, когда мы хотели бы сохранить данные на уровне класса, а не какого-то одного объекта.

Синтаксис:

```js
class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
```

Технически, статическое объявление - это то же самое, что и присвоение классу:

```js
MyClass.property = ...
MyClass.method = ...
```

Статические свойства и методы наследуются.

Для `class B extends A` прототип класса `B` указывает на `A`: `B.[[Prototype]] = A`. Таким образом, если поле не найдено в `B`, поиск продолжается в `A`.
