# Прототипное наследование

В программировании мы часто хотим взять что-то и расширить.

Например, у нас есть объект `user` со своими свойствами и методами, и мы хотим создать обьекты `admin` и `guest` как его слегка измененные варианты. Мы хотели бы повторно использовать то, что есть у обьекта `user`, не копировать/переопределять его методы, но просто создать новый объект поверх него.

*Прототипное наследование* — это особенность языка, которая помогает в этом.

## [[Prototype]]

В JavaScript объекты имеют специальное скрытое свойство `[[Prototype]]` (как указано в спецификации), которое либо равно `null`, либо ссылается на другой объект. Этот объект называется "прототип":

![prototype](object-prototype-empty.png)

Этот `[[Prototype]]` имеет "магическое" значение. Когда мы хотим прочитать свойство из `объекта`, а оно отсутствует, JavaScript автоматически берет его из прототипа. В программировании такой механизм называется "прототипным наследованием". Многие интересные возможности языка и техники программирования основываются на нем.

Свойство `[[Prototype]]` является внутренним и скрытым, но есть много способов задать его самостоятельно.

Одним из них является использование `__proto__`, например так:

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal;
*/!*
```

```smart header="Свойство `__proto__` — историчеси геттер/сеттер для `[[Prototype]]`"
Обратите внимание, что `__proto__` — *не то же самое*, что `[[Prototype]]`. Это геттер/сеттер для него.

Он существует по историческим причинам, в современном языке его заменяют функции `Object.getPrototypeOf / Object.setPrototypeOf`, которые также получают/устанавливают прототип. Мы рассмотрим причины этого и эти функции позже.

По спецификации `__proto__` должен поддерживаться только браузерами, но на самом деле все среды, включая серверную, поддерживают его. На данный момент, поскольку нотация `__proto__` немного более понятна, мы будем использовать ее в примерах.
```

Если мы ищем свойство в `rabbit`, и оно отсутствует, JavaScript автоматически берет его из `animal`.

Например:

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // (*)
*/!*

// теперь мы можем найти оба свойства в rabbit:
*!*
alert( rabbit.eats ); // true (**)
*/!*
alert( rabbit.jumps ); // true
```

Здесь линия `(*)` устанавливает `animal` как прототип для `rabbit`.

Затем, когда `alert` пытается прочитать свойство `rabbit.eats` `(**)`, его нет в `rabbit`, поэтому JavaScript следует по ссылке `[[Prototype]]` и находит ее в `animal` (смотрите снизу вверх):

![](proto-animal-rabbit.png)

Здесь иы можем сказать, что "`animal` является прототипом `rabbit`" или "`rabbit` прототипно наследуется от `animal`".

Так что если у `animal` много полезных свойств и методов, то они автоматически становятся доступными у `rabbit`. Такие свойства называются "унаследованными".

If we have a method in `animal`, it can be called on `rabbit`:

```js run
let animal = {
  eats: true,
*!*
  walk() {
    alert("Animal walk");
  }
*/!*
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// walk is taken from the prototype
*!*
rabbit.walk(); // Animal walk
*/!*
```

The method is automatically taken from the prototype, like this:

![](proto-animal-rabbit-walk.png)

The prototype chain can be longer:


```js run
let animal = {
  eats: true,
  walk() {
    alert("Animal walk");
  }
};

let rabbit = {
  jumps: true,
*!*
  __proto__: animal
*/!*
};

let longEar = {
  earLength: 10,
*!*
  __proto__: rabbit
*/!*
};

// walk is taken from the prototype chain
longEar.walk(); // Animal walk
alert(longEar.jumps); // true (from rabbit)
```

![](proto-animal-rabbit-chain.png)

There are actually only two limitations:

1. The references can't go in circles. JavaScript will throw an error if we try to assign `__proto__` in a circle.
2. The value of `__proto__` can be either an object or `null`, other types (like primitives) are ignored.

Also it may be obvious, but still: there can be only one `[[Prototype]]`. An object may not inherit from two others.

## Writing doesn't use prototype

The prototype is only used for reading properties.

Write/delete operations work directly with the object.

In the example below, we assign its own `walk` method to `rabbit`:

```js run
let animal = {
  eats: true,
  walk() {
    /* this method won't be used by rabbit */  
  }
};

let rabbit = {
  __proto__: animal
};

*!*
rabbit.walk = function() {
  alert("Rabbit! Bounce-bounce!");
};
*/!*

rabbit.walk(); // Rabbit! Bounce-bounce!
```

From now on, `rabbit.walk()` call finds the method immediately in the object and executes it, without using the prototype:

![](proto-animal-rabbit-walk-2.png)

That's for data properties only, not for accessors. If a property is a getter/setter, then it behaves like a function: getters/setters are looked up in the prototype.

For that reason `admin.fullName` works correctly in the code below:

```js run
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

alert(admin.fullName); // John Smith (*)

// setter triggers!
admin.fullName = "Alice Cooper"; // (**)
```

Here in the line `(*)` the property `admin.fullName` has a getter in the prototype `user`, so it is called. And in the line `(**)` the property has a setter in the prototype, so it is called.

## The value of "this"

An interesting question may arise in the example above: what's the value of `this` inside `set fullName(value)`? Where the properties `this.name` and `this.surname` are written: into `user` or `admin`?

The answer is simple: `this` is not affected by prototypes at all.

**No matter where the method is found: in an object or its prototype. In a method call, `this` is always the object before the dot.**

So, the setter call `admin.fullName=` uses `admin` as `this`, not `user`.

That is actually a super-important thing, because we may have a big object with many methods and inherit from it. Then inherited objects can run its methods, and they will modify the state of these objects, not the big one.

For instance, here `animal` represents a "method storage", and `rabbit` makes use of it.

The call `rabbit.sleep()` sets `this.isSleeping` on the `rabbit` object:

```js run
// animal has methods
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "White Rabbit",
  __proto__: animal
};

// modifies rabbit.isSleeping
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (no such property in the prototype)
```

The resulting picture:

![](proto-animal-rabbit-walk-3.png)

If we had other objects like `bird`, `snake` etc inheriting from `animal`, they would also gain access to methods of `animal`. But `this` in each method would be the corresponding object, evaluated at the call-time (before dot), not `animal`. So when we write data into `this`, it is stored into these objects.

As a result, methods are shared, but the object state is not.

## Summary

- In JavaScript, all objects have a hidden `[[Prototype]]` property that's either another object or `null`.
- We can use `obj.__proto__` to access it (a historical getter/setter, there are other ways, to be covered soon).
- The object referenced by `[[Prototype]]` is called a "prototype".
- If we want to read a property of `obj` or call a method, and it doesn't exist, then JavaScript tries to find it in the prototype. Write/delete operations work directly on the object, they don't use the prototype (unless the property is actually a setter).
- If we call `obj.method()`, and the `method` is taken from the prototype, `this` still references `obj`. So methods always work with the current object even if they are inherited.
