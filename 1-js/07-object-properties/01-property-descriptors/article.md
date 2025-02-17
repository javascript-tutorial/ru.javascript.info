
# Флаги и дескрипторы свойств

Как мы знаем, объекты могут содержать свойства.

<<<<<<< HEAD
До этого момента мы рассматривали свойство только как пару "ключ-значение". Но на самом деле свойство объекта гораздо мощнее и гибче.
=======
Until now, a property was a simple "key-value" pair to us. But an object property is actually a more flexible and powerful thing.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

В этой главе мы изучим дополнительные флаги конфигурации для свойств, а в следующей -- увидим, как можно незаметно превратить их в специальные функции - геттеры и сеттеры.

## Флаги свойств

Помимо значения **`value`**, свойства объекта имеют три специальных атрибута (так называемые "флаги").

- **`writable`** -- если `true`, свойство можно изменить, иначе оно только для чтения.
- **`enumerable`** -- если `true`, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
- **`configurable`** -- если `true`, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.

Мы ещё не встречали эти атрибуты, потому что обычно они скрыты. Когда мы создаём свойство "обычным способом", все они имеют значение `true`. Но мы можем изменить их в любое время.

Сначала посмотрим, как получить их текущие значения.

<<<<<<< HEAD
Метод [Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) позволяет получить *полную* информацию о свойстве.
=======
The method [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) allows to query the *full* information about a property.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Его синтаксис:
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: Объект, из которого мы получаем информацию.

`propertyName`
: Имя свойства.

Возвращаемое значение - это объект, так называемый "дескриптор свойства": он содержит значение свойства и все его флаги.

Например:

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* дескриптор свойства:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

<<<<<<< HEAD
Чтобы изменить флаги, мы можем использовать метод [Object.defineProperty](mdn:js/Object/defineProperty).
=======
To change the flags, we can use [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Его синтаксис:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
: Объект и его свойство, для которого нужно применить дескриптор.

`descriptor`
<<<<<<< HEAD
: Применяемый дескриптор.
=======
: Property descriptor object to apply.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Если свойство существует, `defineProperty` обновит его флаги. В противном случае метод создаёт новое свойство с указанным значением и флагами; если какой-либо флаг не указан явно, ему присваивается значение `false`.

Например, здесь создаётся свойство `name`, все флаги которого имеют значение `false`:

```js run
let user = {};

*!*
Object.defineProperty(user, "name", {
  value: "John"
});
*/!*

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
```

Сравните это с предыдущим примером, в котором мы создали свойство `user.name` "обычным способом": в этот раз все флаги имеют значение `false`. Если это не то, что нам нужно, надо присвоить им значения `true` в параметре `descriptor`.

Теперь давайте рассмотрим на примерах, что нам даёт использование флагов.

## Только для чтения

Сделаем свойство `user.name` доступным только для чтения. Для этого изменим флаг `writable`:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
*!*
  writable: false
*/!*
});

*!*
user.name = "Pete"; // Ошибка: Невозможно изменить доступное только для чтения свойство 'name'
*/!*
```

Теперь никто не сможет изменить имя пользователя, если только не обновит соответствующий флаг новым вызовом `defineProperty`.

<<<<<<< HEAD
```smart header="Ошибки появляются только в строгом режиме"
В нестрогом режиме, без `use strict`, мы не увидим никаких ошибок при записи в свойства "только для чтения" и т.п. Но эти операции всё равно не будут выполнены успешно. Действия, нарушающие ограничения флагов, в нестрогом режиме просто молча игнорируются.
=======
```smart header="Errors appear only in strict mode"
In non-strict mode, no errors occur when writing to non-writable properties and such. But the operation still won't succeed. Flag-violating actions are just silently ignored in non-strict.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```

Вот тот же пример, но свойство создано "с нуля":

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "John",
<<<<<<< HEAD
  // для нового свойства необходимо явно указывать все флаги, для которых значение true
=======
  // for new properties we need to explicitly list what's true
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // John
user.name = "Pete"; // Ошибка
```

## Неперечислимое свойство

Теперь добавим собственный метод `toString` к объекту `user`.

<<<<<<< HEAD
Встроенный метод `toString` в объектах - неперечислимый, его не видно в цикле `for..in`. Но если мы напишем свой собственный метод `toString`, цикл `for..in` будет выводить его по умолчанию:
=======
Normally, a built-in `toString` for objects is non-enumerable, it does not show up in `for..in`. But if we add a `toString` of our own, then by default it shows up in `for..in`, like this:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// По умолчанию оба свойства выведутся:
for (let key in user) alert(key); // name, toString
```

<<<<<<< HEAD
Если мы этого не хотим, можно установить для свойства `enumerable:false`. Тогда оно перестанет появляться в цикле `for..in` аналогично встроенному `toString`:
=======
If we don't like it, then we can set `enumerable:false`. Then it won't appear in a `for..in` loop, just like the built-in one:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
// Теперь наше свойство toString пропало из цикла:
*/!*
for (let key in user) alert(key); // name
```

Неперечислимые свойства также не возвращаются `Object.keys`:

```js
alert(Object.keys(user)); // name
```

## Неконфигурируемое свойство

Флаг неконфигурируемого свойства (`configurable:false`) иногда предустановлен для некоторых встроенных объектов и свойств.

<<<<<<< HEAD
Неконфигурируемое свойство не может быть удалено, его атрибуты не могут быть изменены.
=======
A non-configurable property can't be deleted, its attributes can't be modified.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Например, свойство `Math.PI` - только для чтения, неперечислимое и неконфигурируемое:

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```
То есть программист не сможет изменить значение `Math.PI` или перезаписать его.

```js run
<<<<<<< HEAD
Math.PI = 3; // Ошибка, потому что writable: false
=======
Math.PI = 3; // Error, because it has writable: false
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

// delete Math.PI тоже не сработает
```
<<<<<<< HEAD
Мы также не можем изменить `writable`:

```js run
// Ошибка, из-за configurable: false
Object.defineProperty(Math, "PI", { writable: true });
```
Мы абсолютно ничего не можем сделать с `Math.PI`.

Определение свойства как неконфигурируемого - это дорога в один конец. Мы не можем изменить его обратно с помощью `defineProperty`.

**Обратите внимание: `configurable: false` не даст изменить флаги свойства, а также не даст его удалить. При этом можно изменить значение свойства.**

В коде ниже свойство `user.name` является неконфигурируемым, но мы все ещё можем изменить его значение (т.к. `writable: true`).
=======

We also can't change `Math.PI` to be `writable` again:

```js run
// Error, because of configurable: false
Object.defineProperty(Math, "PI", { writable: true });
```

There's absolutely nothing we can do with `Math.PI`.

Making a property non-configurable is a one-way road. We cannot change it back with `defineProperty`.

**Please note: `configurable: false` prevents changes of property flags and its deletion, while allowing to change its value.**

Here `user.name` is non-configurable, but we can still change it (as it's writable):
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

<<<<<<< HEAD
user.name = "Pete"; // работает
delete user.name; // Ошибка
```
А здесь мы делаем `user.name` "навечно запечатанной" константой, как и встроенный `Math.PI`:
=======
user.name = "Pete"; // works fine
delete user.name; // Error
```

And here we make `user.name` a "forever sealed" constant, just like the built-in `Math.PI`:

>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

<<<<<<< HEAD
// теперь невозможно изменить user.name или его флаги
// всё это не будет работать:
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
``` 

```smart header="Ошибки отображаются только в строгом режиме"
В нестрогом режиме мы не увидим никаких ошибок при записи в свойства "только для чтения" и т.п. Эти операции всё равно не будут выполнены успешно. Действия, нарушающие ограничения флагов, в нестрогом режиме просто молча игнорируются.
```

## Метод Object.defineProperties

Существует метод [Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties), который позволяет определять множество свойств сразу.

Его синтаксис:
=======
// won't be able to change user.name or its flags
// all this won't work:
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
```

```smart header="The only attribute change possible: writable true -> false"
There's a minor exception about changing flags.

We can change `writable: true` to `false` for a non-configurable property, thus preventing its value modification (to add another layer of protection). Not the other way around though.
```

## Object.defineProperties

There's a method [Object.defineProperties(obj, descriptors)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) that allows to define many properties at once.

The syntax is:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

Например:

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

Таким образом, мы можем определить множество свойств одной операцией.

## Object.getOwnPropertyDescriptors

<<<<<<< HEAD
Чтобы получить все дескрипторы свойств сразу, можно воспользоваться методом [Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors).
=======
To get all property descriptors at once, we can use the method [Object.getOwnPropertyDescriptors(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors).
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Вместе с `Object.defineProperties` этот метод можно использовать для клонирования объекта вместе с его флагами:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

Обычно при клонировании объекта мы используем присваивание, чтобы скопировать его свойства:

```js
for (let key in user) {
  clone[key] = user[key]
}
```

...Но это не копирует флаги. Так что если нам нужен клон "получше", предпочтительнее использовать `Object.defineProperties`.

<<<<<<< HEAD
Другое отличие в том, что `for..in` игнорирует символьные и неперечислимые свойства, а `Object.getOwnPropertyDescriptors` возвращает дескрипторы *всех* свойств.
=======
Another difference is that `for..in` ignores symbolic and non-enumerable properties, but `Object.getOwnPropertyDescriptors` returns *all* property descriptors including symbolic and non-enumerable ones.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## Глобальное запечатывание объекта

Дескрипторы свойств работают на уровне конкретных свойств.

Но ещё есть методы, которые ограничивают доступ ко *всему* объекту:

<<<<<<< HEAD
[Object.preventExtensions(obj)](mdn:js/Object/preventExtensions)
: Запрещает добавлять новые свойства в объект.

[Object.seal(obj)](mdn:js/Object/seal)
: Запрещает добавлять/удалять свойства. Устанавливает `configurable: false` для всех существующих свойств.

[Object.freeze(obj)](mdn:js/Object/freeze)
: Запрещает добавлять/удалять/изменять свойства. Устанавливает `configurable: false, writable: false` для всех существующих свойств.
=======
[Object.preventExtensions(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
: Forbids the addition of new properties to the object.

[Object.seal(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
: Forbids adding/removing of properties. Sets `configurable: false` for all existing properties.

[Object.freeze(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
: Forbids adding/removing/changing of properties. Sets `configurable: false, writable: false` for all existing properties.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

А также есть методы для их проверки:

<<<<<<< HEAD
[Object.isExtensible(obj)](mdn:js/Object/isExtensible)
: Возвращает `false`, если добавление свойств запрещено, иначе `true`.

[Object.isSealed(obj)](mdn:js/Object/isSealed)
: Возвращает `true`, если добавление/удаление свойств запрещено и для всех существующих свойств установлено `configurable: false`.

[Object.isFrozen(obj)](mdn:js/Object/isFrozen)
: Возвращает `true`, если добавление/удаление/изменение свойств запрещено, и для всех текущих свойств установлено `configurable: false, writable: false`.
=======
[Object.isExtensible(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
: Returns `false` if adding properties is forbidden, otherwise `true`.

[Object.isSealed(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
: Returns `true` if adding/removing properties is forbidden, and all existing properties have `configurable: false`.

[Object.isFrozen(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
: Returns `true` if adding/removing/changing properties is forbidden, and all current properties are `configurable: false, writable: false`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

На практике эти методы используются редко.
