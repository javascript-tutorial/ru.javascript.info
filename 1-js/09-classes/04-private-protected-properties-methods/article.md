# Приватные и защищенне методы и свойства

Один из важнейших принципов объектно-ориентированного программирования -- разделение внутреннего и внешнего интерфесов.

Это обязательная практика в разработке чего-либо сложнее, чем "hello world".

Чтобы понять этот принцип, давайте на секунду забудем о программировании и обратим взгляд на реальный мир.

Устройства, которыми мы пользуемся, обычно довольно сложно устроены. Но разделение внутреннего и внешнего интерфейсов позволяет нам пользоваться ими без каких-либо проблем.

## Пример из реальной жизни

Например, кофеварка. Простая снаружи: кнопка, экран, несколько отверстий... И, конечно, как результат -- прекрасный кофе ! :)

![](coffee.jpg)

Но внутри... (картинка из инструкции по ремонту)

![](coffee-inside.jpg)

Множество деталей. Но мы можем пользоваться ею ничего об этом не зная.

Кофеварки довольно надежны, не так ли? Мы можем пользоваться ими годами, и если что то пойдет не так - отнесем в ремонт.

Секрет надежности и простоты кофемашины -- все детали хорошо отлажены и *спрятаны* внутри.

Если мы снимем защитную крышку с кофемашины, то пользоваться ею будет гораздо сложнее (куда нажимать?) и опасно (может привести к поражению электрическим током).

Как мы увидим, в программировании объекты похожи на кофемашины.

Но чтобы скрыть внутренние детали, мы будем использовать не защитную крышку, а специальный синтаксис языка и соглашения.

## Внутренный и внешнией интерфейсыъ

В объектно-ориентированном программировании свойства и методы разделены на 2 группы:

- *Внутренний интерфейс* -- методы и свойства доступны из других методов класса, но не доступны снаружи класса.
- *Внешний интерфейс* -- методы и свойства доступны снаружи класса.

Если мы продолжаем аналогию с кофеваркой -- что скрыто внутри: трубка кипятильника, нагревательный элемент и т.д. -- это внутренний интерфейс.

Внутренний интерфейс используется для работы объекта, его детали используют друг друга. Например, трубка кипятильника прикреплена к нагревательному элементу.

Но снаружи кофемашина закрыта защитной крышкой, так что никто этого не может до этого добраться. Детали скрыты и недоступны. Мы можем использовать их функции через внешний интерфейс. 

Итак, все, что нам нужно для использования объекта, это знать его внешний интерфейс. Мы можем совершенно не знать, как это работает внутри, и это здорово.

Это было общее введение.

В JavaScript есть три типа свойств и членов:

- Публичные: доступны отовсюду. Они составляют внешний интерфейс. До этого момента мы использовали только публичные свойства и методы.
- Приватные: доступны только внутри класса. Они для внутреннего интерфейса.

Во многих других языках также существуют «защищенные» поля: доступные только внутри класса и тех, которые его расширяют. Они также полезны для внутреннего интерфейса. В некотором смысле они более распространены, чем частные, потому что мы обычно хотим, чтобы наследующие классы получали доступ для правильного выполнения расширения.

Защищенные поля не представлены в JavaScript на уровне языка, но на практике они очень удобны, поэтому их эмулируют. 

В следующей главе мы будем делать кофеварку на JavaScript со всеми этими типами свойств. Кофеварка имеет множество деталей, мы не будем их моделировать для простоты примера (хотя могли бы).

## Защищенное свойство "waterAmount"

Давайте для начала создадим простой класс Кофеварка:

```js run
class CoffeeMachine {
  waterAmount = 0; // количество воды внутри

  constructor(power) {
    this.power = power;
    alert( `Создана кофеварка, мощность: ${power}` );
  }

}

// создаем кофеварку
let coffeeMachine = new CoffeeMachine(100);

// добавляем воды
coffeeMachine.waterAmount = 200;
```

Прямо сейчас своства `waterAmount` и `power` публичные. Мы можем легко получать и устанавливать их в любое значение извне.

Давайте изменим свойство `waterAmount` на защищенное, чтобы иметь больше контроля над ним. Например, мы не хотим, чтобы кто-либо устанавливал его ниже нуля.

**Защищенные свойства обычно начинаются с префикса `_`.**

Это не применяется на уровне языка, но существует соглашение, что такие свойства и методы не должны быть доступны извне. Большинство программистов следуют этому.

So our property will be called `_waterAmount`:

```js run
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) throw new Error("Negative water");
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

// add water
coffeeMachine.waterAmount = -10; // Error: Negative water
```

Now the access is under control, so setting the water below zero fails.

## Read-only "power"

For `power` property, let's make it read-only. It sometimes happens that a property must be set at creation time only, and then never modified.

That's exactly the case for a coffee machine: power never changes.

To do so, we only need to make getter, but not the setter:

```js run
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }

}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

alert(`Power is: ${coffeeMachine.power}W`); // Power is: 100W

coffeeMachine.power = 25; // Error (no setter)
```

````smart header="Getter/setter functions"
Here we used getter/setter syntax.

But most of the time `get.../set...` functions are preferred, like this:

```js
class CoffeeMachine {
  _waterAmount = 0;

  *!*setWaterAmount(value)*/!* {
    if (value < 0) throw new Error("Negative water");
    this._waterAmount = value;
  }

  *!*getWaterAmount()*/!* {
    return this.waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
```

That looks a bit longer, but functions are more flexible. They can accept multiple arguments (even if we don't need them right now). So, for the future, just in case we need to refactor something, functions are a safer choise.

Surely, there's a tradeoff. On the other hand, get/set syntax is shorter, so ultimately there's no strict rule, it's up to you to decide.
````

```smart header="Protected fields are inherited"
If we inherit `class MegaMachine extends CoffeeMachine`, then nothing prevents us from accessing `this._waterAmount` or `this._power` from the methods of the new class.

So protected fields are naturally inheritable. Unlike private ones that we'll see below.
```

## Private "#waterLimit"

[recent browser=none]

There's a finished JavaScript proposal, almost in the standard, that provides language-level support for private properties and methods.

Privates should start with `#`. They are only accessible from inside the class.

For instance, here we add a private `#waterLimit` property and extract the water-checking logic into a separate method:

```js
class CoffeeMachine {
*!*
  #waterLimit = 200;
*/!*

*!*
  #checkWater(value) {
    if (value < 0) throw new Error("Negative water");
    if (value > this.#waterLimit) throw new Error("Too much water");
  }
*/!*

  _waterAmount = 0;

  set waterAmount(value) {
*!*
    this.#checkWater(value);
*/!*
    this._waterAmount = value;
  }

  get waterAmount() {
    return this.waterAmount;
  }

}

let coffeeMachine = new CoffeeMachine();

*!*
coffeeMachine.#checkWater(); // Error
coffeeMachine.#waterLimit = 1000; // Error
*/!*

coffeeMachine.waterAmount = 100; // Works
```

On the language level, `#` is a special sign that the field is private. We can't access it from outside or from inheriting classes.

Private fields do not conflict with public ones. We can have both private `#waterAmount` and public `waterAmount` fields at the same time.

For instance, let's make `waterAmount` an accessor for `#waterAmount`:

```js run
class CoffeeMachine {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) throw new Error("Negative water");
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // Error
```

Unlike protected ones, private fields are enforced by the language itself. That's a good thing.

But if we inherit from `CoffeeMachine`, then we'll have no direct access to `#waterAmount`. We'll need to rely on `waterAmount` getter/setter:

```js
class CoffeeMachine extends CoffeeMachine() {
  method() {
*!*
    alert( this.#waterAmount ); // Error: can only access from CoffeeMachine
*/!*
  }
}
```

In many scenarios such limitation is too severe. If we extend a `CoffeeMachine`, we may have legitimate reason to access its internals. That's why protected fields are used most of the time, even though they are not supported by the language syntax.

````warn
Private fields are special.

Remember, usually we can access fields by this[name]:

```js
class User {
  ...
  sayHi() {
    let fieldName = "name";
    alert(`Hello, ${this[fieldName]}`);
  }
}
```

With private fields that's impossible: `this['#name']` doesn't work. That's a syntax limitation to ensure privacy.
````

## Summary

In terms of OOP, delimiting of the internal interface from the external one is called [encapsulation]("https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)").

It gives the following benefits:

Protection for users, so that they don't shoot themselves in the feet
: Imagine, there's a team of developers using a coffee machine. It was made by the "Best CoffeeMachine" company, and works fine, but a protective cover was removed. So the internal interface is exposed.

    All developers are civilized -- they use the coffee machine as intended. But one of them, John, decided that he's the smartest one, and made some tweaks in the coffee machine internals. So the coffee machine failed two days later.

    That's surely not John's fault, but rather the person who removed the protective cover and let John do his manipulations.

    The same in programming. If a user of a class will change things not intended to be changed from the outside -- the consequences are unpredictable.

Supportable
: The situation in programming is more complex than with a real-life coffee machine, because we don't just buy it once. The code constantly undergoes development and improvement.

    **If we strictly delimit the internal interface, then the developer of the class can freely change its internal properties and methods, even without informing the users..**

    It's much easier to develop, if you know that certain methods can be renamed, their parameters can be changed, and even removed, because no external code depends on them.

    For users, when a new version comes out, it may be a total overhaul, but still simple to upgrade if the external interface is the same.

Hiding complexity
: People adore to use things that are simple. At least from outside. What's inside is a different thing.

    Programmers are not an exception.

    **It's always convenient when implementation details are hidden, and a simple, well-documented external interface is available.**

To hide internal interface we use either protected or public properties:

- Protected fields start with `_`. That's a well-known convention, not enforced at the language level. Programmers should only access a field starting with `_` from its class and classes inheriting from it.
- Private fields start with `#`. JavaScript makes sure we only can access those from inside the class.

Right now, private fields are not well-supported among browsers, but can be polyfilled.
