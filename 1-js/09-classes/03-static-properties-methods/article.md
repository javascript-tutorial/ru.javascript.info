
# Статические свойства и методы

<<<<<<< HEAD
Мы также можем присвоить метод самой функции-классу, а не её `"prototype"`. Такие методы называются *статическими*.

В классе такие методы обозначаются ключевым словом `static`, например:
=======
We can also assign a method to the class function itself, not to its `"prototype"`. Such methods are called *static*.

In a class, they are prepended by `static` keyword, like this:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

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

<<<<<<< HEAD
Это фактически то же самое, что присвоить метод напрямую как свойство функции:
=======
That actually does the same as assigning it as a property directly:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
class User() { }

User.staticMethod = function() {
  alert(this === User);
};
```

<<<<<<< HEAD
Значением `this` при вызове `User.staticMethod()` является сам конструктор класса `User` (правило "объект до точки").
=======
The value of `this` in `User.staticMethod()` call is the class constructor `User` itself (the "object before dot" rule).
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Обычно статические методы используются для реализации функций, принадлежащих классу, но не к каким-то конкретным его объектам.

<<<<<<< HEAD
Например, есть объекты статей `Article`, и нужна функция для их сравнения. Естественное решение - сделать для этого метод `Article.compare`:
=======
For instance, we have `Article` objects and need a function to compare them. A natural solution would be to add `Article.compare` method, like this:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

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
Здесь метод `Article.compare` стоит "над" статьями, как способ их сравнения. Это метод не отдельной статьи, а всего класса.
=======
Here `Article.compare` stands "above" articles, as a means to compare them. It's not a method of an article, but rather of the whole class.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Другим примером может быть так называемый "фабричный" метод. Представим, что нам нужно создавать статьи различными способами:

<<<<<<< HEAD
1. Создание через заданные параметры (`title`, `date` и т. д.).
2. Создание пустой статьи с сегодняшней датой.
3. ...или как-то ещё.
=======
1. Create by given parameters (`title`, `date` etc).
2. Create an empty article with today's date.
3. ...or else somehow.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Первый способ может быть реализован через конструктор. А для второго можно использовать статический метод класса.

Такой как `Article.createTodays()` в следующем примере:

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
// предположим, что Article - это специальный класс для управления статьями
// статический метод для удаления статьи:
Article.remove({id: 12345});
```

## Статические свойства

[recent browser=Chrome]

<<<<<<< HEAD
Статические свойства также возможны, они выглядят как свойства класса, но с `static` в начале:
=======
Static properties are also possible, they look like regular class properties, but prepended by `static`:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

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
## Наследование статических свойств и методов

Статические свойства и методы наследуются.
=======
## Inheritance of static methods

Static methods are inherited.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Например, метод `Animal.compare` в коде ниже наследуется и доступен как `Rabbit.compare`:

```js run
class Animal {

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

rabbits[0].run(); // Чёрный кролик бежит со скоростью 5.
```

<<<<<<< HEAD
Мы можем вызвать `Rabbit.compare`, при этом будет вызван унаследованный `Animal.compare`.

Как это работает? Снова с использованием прототипов. Как вы уже могли предположить, `extends` даёт `Rabbit` ссылку `[[Prototype]]` на `Animal`.

![](animal-rabbit-static.svg)

Так что `Rabbit extends Animal` создаёт две ссылки на прототип:

1. Функция `Rabbit` прототипно наследует от `Animal` function.
2. `Rabbit.prototype` прототипно наследует от `Animal.prototype`.

В результате наследование работает как для обычных, так и для статических методов.

Давайте это проверим кодом:
=======
Now when we can call `Rabbit.compare`, the inherited `Animal.compare` will be called.

How does it work? Again, using prototypes. As you might have already guessed, `extends` gives `Rabbit` the `[[Prototype]]` reference to `Animal`.

![](animal-rabbit-static.svg)

So, `Rabbit extends Animal` creates two `[[Prototype]]` references:

1. `Rabbit` function prototypally inherits from `Animal` function.
2. `Rabbit.prototype` prototypally inherits from `Animal.prototype`.

As the result, inheritance works both for regular and static methods.

Here, let's check that by code:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js run
class Animal {}
class Rabbit extends Animal {}

<<<<<<< HEAD
// для статики
alert(Rabbit.__proto__ === Animal); // true

// для обычных методов
alert(Rabbit.prototype.__proto__ === Animal.prototype);
```

## Итого

Статические методы используются для функциональности, принадлежит классу "в целом", а не относится к конкретному объекту класса.

Например, метод для сравнения двух статей `Article.compare(article1, article2)` или фабричный метод `Article.createTodays()`.

В объявлении класса они помечаются ключевым словом `static`.
=======
// for statics
alert(Rabbit.__proto__ === Animal); // true

// for regular methods
alert(Rabbit.prototype.__proto__ === Animal.prototype);
```

## Summary

Static methods are used for the functionality that belongs to the class "as a whole", doesn't relate to a concrete class instance.

For example, a method for comparison `Article.compare(article1, article2)` or a factory method `Article.createTodays()`.

They are labeled by the word `static` in class declaration.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

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

<<<<<<< HEAD
Технически, статическое объявление - это то же самое, что и присвоение классу:
=======
Technically, static declaration is the same as assigning to the class itself:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
MyClass.property = ...
MyClass.method = ...
```

<<<<<<< HEAD
Статические свойства и методы наследуются.

Для `class B extends A` прототип класса `B` указывает на `A`: `B.[[Prototype]] = A`. Таким образом, если поле не найдено в `B`, поиск продолжается в `A`.
=======
Static properties and methods are inherited.

For `class B extends A` the prototype of the class `B` itself points to `A`: `B.[[Prototype]] = A`. So if a field is not found in `B`, the search continues in `A`.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
