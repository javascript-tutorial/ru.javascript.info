# Примеси

В JavaScript можно наследовать только от одного объекта. Объект имеет единственный `[[Prototype]]`. И класс может расширить только один другой класс.

Иногда это может ограничивать нас. Например, у нас есть класс `StreetSweeper` и класс `Bicycle`, а мы хотим создать `StreetSweepingBicycle`.

<<<<<<< HEAD
Или, говоря о программировании, у нас есть класс `User`, который реализует пользователей, и класс `EventEmitter`, реализующий события. Мы хотели бы добавить функционал класса `EventEmitter` к `User`, чтобы пользователи могли легко генерировать события.
=======
Or, talking about programming, we have a class `User` and a class `EventEmitter` that implements event generation, and we'd like to add the functionality of `EventEmitter` to `User`, so that our users can emit events.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Для таких случаев существуют "примеси".

По определению из Википедии, [примесь](https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%81%D1%8C_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)) - это класс, методы которого предназначены для использования в других классах, причём без наследования от примеси.

Другими словами, *примесь* определяет методы, которые реализуют определённое поведение. Мы не используем примесь саму по себе, она нужна, чтобы добавить другим классам больше функционала.

## Пример примеси

Простейший способ сделать примесь в JavaScript - это создать объект с полезными методами, которые затем могут быть легко добавлены в прототип любого класса.

В примере ниже примесь `sayHiMixin` имеет методы для придания объектам класса `User` возможности вести разговор:

```js run
*!*
// примесь
*/!*
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};

*!*
// использование:
*/!*
class User {
  constructor(name) {
    this.name = name;
  }
}

// копируем методы
Object.assign(User.prototype, sayHiMixin);

// сейчас User может сказать Hello
new User("Dude").sayHi(); // Hello Dude!
```

<<<<<<< HEAD
Это не наследование, а просто копирование методов. Таким образом, класс `User` может наследовать от другого класса, но при этом также включать в себя примеси, "подмешивающие" другие методы.

Например:
=======
There's no inheritance, but a simple method copying. So `User` may inherit from another class and also include the mixin to "mix-in" the additional methods, like this:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js
class User extends Person {
// ...
}

Object.assign(User.prototype, sayHiMixin);
```

Примеси могут наследовать друг другу.

В примере ниже `sayHiMixin` наследует от `sayMixin`:

```js run
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
  __proto__: sayMixin, // (или мы можем использовать Object.create для задания прототипа)

  sayHi() {
    *!*
    // вызываем метод родителя
    */!*
    super.say(`Hello ${this.name}`);
  },
  sayBye() {
    super.say(`Bye ${this.name}`);
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

// копируем методы
Object.assign(User.prototype, sayHiMixin);

// сейчас User может сказать Hello
new User("Dude").sayHi(); // Hello Dude!
```

Обратим внимание, что при вызове родительского метода `super.say()` из `sayHiMixin` этот метод ищется в прототипе самой примеси, а не класса.

![](mixin-inheritance.png)

<<<<<<< HEAD
Это связано с тем, что методы `sayHi` и `sayBye` были изначально созданы в объекте `sayHiMixin`. Так что их внутреннее свойство `[[HomeObject]]` ссылается на `sayHiMixin`, как показано на картинке выше.
=======
That's because methods `sayHi` and `sayBye` were initially created in `sayHiMixin`. So their `[[HomeObject]]` internal property references `sayHiMixin`, as shown on the picture above.

As `super` looks for parent methods in `[[HomeObject]].[[Prototype]]`, that means it searches `sayHiMixin.[[Prototype]]`, not `User.[[Prototype]]`.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Так как `super` ищет родительские методы в `[[HomeObject]].[[Prototype]]`, это означает `sayHiMixin.[[Prototype]]`, а не `User.[[Prototype]]`.

## EventMixin

<<<<<<< HEAD
А сейчас давайте создадим примесь, полезную в реальной жизни.

Многие объекты в браузерной разработке (и не только) обладают важной способностью - они могут генерировать события. События - отличный способ передачи информации всем, кто в ней заинтересован. Давайте создадим примесь, которая позволит легко добавлять функционал по работе с событиями любым классам/объектам.

- Примесь добавит метод `.trigger(name, [data])` для генерации события. Аргумент `name` - это имя события, за которым могут следовать другие аргументы с данными для события.
- Также будет добавлен метод `.on(name, handler)`, который назначает обработчик для события с заданным именем. Обработчик будет вызван, когда произойдёт событие с указанным именем `name`, и получит данные из `.trigger`.
- ...и метод `.off(name, handler)`, который удаляет обработчик указанного события.

После того, как все методы примеси будут добавлены, объект `user` сможет сгенерировать событие `"login"` после входа пользователя в личный кабинет. А другой объект, к примеру, `calendar` сможет использовать это событие, чтобы показывать зашедшему пользователю актуальный для него календарь.

Или `menu` может генерировать событие `"select"`, когда элемент меню выбран, а другие объекты могут назначать обработчики, чтобы реагировать на это событие, и т.п.

Вот код примеси:
=======
The important feature of many browser objects (not only) can generate events. Events is a great way to "broadcast information" to anyone who wants it. So let's make a mixin that allows to easily add event-related functions to any class/object.

- The mixin will provide a method `.trigger(name, [...data])` to "generate an event" when something important happens to it. The `name` argument is a name of the event, optionally followed by additional arguments with event data.
- Also the method `.on(name, handler)` that adds `handler` function as the listener to events with the given name. It will be called when an event with the given `name` triggers, and get the arguments from `.trigger` call.
- ...And the method `.off(name, handler)` that removes `handler` listener.

After adding the mixin, an object `user` will become able to generate an event `"login"` when the visitor logs in. And another object, say, `calendar` may want to listen to such events to load the calendar for the logged-in person.

Or, a `menu` can generate the event `"select"` when a menu item is selected, and other objects may assign handlers to react on that event. And so on.

Here's the code:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
let eventMixin = {
  /**
   * Подписаться на событие, использование:
   * menu.on('select', function(item) { ... }
   */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * Отменить подписку, использование:
   * menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers && this._eventHandlers[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
<<<<<<< HEAD
   * Сгенерировать событие с указанным именем и данными
   * this.trigger('select', data1, data2);
=======
   * Generate an event with the given name and data
   *  this.trigger('select', data1, data2);
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return; // обработчиков для этого события нет
    }

    // вызовем обработчики
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
```

<<<<<<< HEAD
Итак, у нас есть 3 метода:

1. `.on(eventName, handler)` -- назначает функцию `handler`, чтобы обработать событие с заданным именем. Обработчики хранятся в свойстве  `_eventHandlers`, представляющим собой объект, в котором имя события является ключом, а массив обработчиков - значением.

2. `.off(eventName, handler)` -- убирает функцию из списка обработчиков.

3. `.trigger(eventName, ...args)` -- генерирует событие: все назначенные обработчики из `_eventHandlers[eventName]` вызываются, и `...args` передаются им в качестве аргументов.
=======

- `.on(eventName, handler)` -- assigns function `handler` to run when the event with that name happens. Technically, there's `_eventHandlers` property, that stores an array of handlers for each event name. So it just adds it to the list.
- `.off(eventName, handler)` -- removes the function from the handlers list.
- `.trigger(eventName, ...args)` -- generates the event: all handlers from `_eventHandlers[eventName]` are called, with a list of arguments `...args`.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Использование:

```js run
// Создадим класс
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
<<<<<<< HEAD
// Добавим примесь с методами для событий
=======
// Add the mixin with event-related methods
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

<<<<<<< HEAD
// Добавить обработчик, который будет вызван при событии "select":
=======
// add a handler, to be called on selection:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
*!*
menu.on("select", value => alert(`Выбранное значение: ${value}`));
*/!*

<<<<<<< HEAD
// Генерирует событие => обработчик выше запускается и выводит:
menu.choose("123"); // Выбранное значение: 123
```

Теперь если у нас есть код, заинтересованный в событии `"select"`, то он может слушать его с помощью `menu.on(...)`.

А `eventMixin` позволяет легко добавить такое поведение в любой класс без вмешательства в цепочку наследования.
=======
// triggers the event => the handler above runs and shows:
// Value selected: 123
menu.choose("123");
```

Now if we'd like any code to react on menu selection, we can listen to it with `menu.on(...)`.

And `eventMixin` mixin makes it easy to add such behavior to as many classes as we'd like, without interfering with the inheritance chain.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## Итого

*Примесь* -- общий термин в объектно-ориентированном программировании: класс, который содержит в себе методы для других классов.

<<<<<<< HEAD
В других языках (например, Python) разрешается создавать примеси, используя множественное наследование. JavaScript не поддерживает множественное наследование, но с помощью примесей мы можем реализовать нечто похожее, скопировав методы в прототип.
=======
Some other languages like e.g. Python allow to create mixins using multiple inheritance. JavaScript does not support multiple inheritance, but mixins can be implemented by copying methods into prototype.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

Мы можем использовать примеси для расширения функционала классов, например, для обработки событий, как мы сделали это выше.

<<<<<<< HEAD
С примесями могут возникнуть проблемы, если они перезаписывают существующие методы класса. Стоит помнить об этом и быть внимательнее при выборе имён для методов примеси, чтобы избежать конфликтов.
=======
Mixins may become a point of conflict if they occasionally overwrite existing class methods. So generally one should think well about the naming methods of a mixin, to minimize the probability of that.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
