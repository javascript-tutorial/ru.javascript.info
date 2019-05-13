
# Флаги свойств и дескрипторы

Как мы знаем, объекты могут содержать свойства.

До этого момента, мы рассматривали свойство только как пару "ключ-значение". Но на самом деле, свойство объекта - это гораздо более гибкое и мощное понятие.

В этой главе мы изучим дополнительные средства их конфигурации, а в следующей увидим, как легко превратить их в специальные функции - геттеры и сеттеры.

## Флаги свойств

Помимо **`значения`**, свойства объекта имеют три специальных атрибута (так называемые "флаги").

- **`writable`** -- если значение `true`, свойство можно изменить, иначе оно только для чтения.
- **`enumerable`** -- если `true`, свойство работает в циклах, в противном случае циклы его игнорируют.
- **`configurable`** -- если `true`, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.

Мы еще не встречали эти атрибуты, потому что они имеют скрытую реализацию. Когда мы создаем свойство "обычным способом", все эти атрибуты имеют значение `true`. Но мы можем изменить их в любое время.

Сначала посмотрим, как получить эти флаги.

Метод [Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) позволяет получить *полную* информацию о свойстве.

Его синтаксис:
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: Объект, из которого мы получаем информацию.

`propertyName`
: Имя свойства.

Возвращенный объект - это так называемый "дескриптор свойства": он содержит значение свойства и все его флаги.

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

Чтобы изменить флаги, мы можем использовать метод [Object.defineProperty](mdn:js/Object/defineProperty).

Его синтаксис:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
: Объект и свойство, с которыми мы будем работать.

`descriptor`
: Дескриптор, который описывает поведение свойства.

Если свойство существует, `defineProperty` обновит его флаги. В противном случае, метод создает новое свойство с указанным значением и флагами; в этом случае, если какой-либо флаг не указан явно, ему присваивается значение `false`.

Например, все флаги свойства `name` в коде ниже создаются со значением `false`: 

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

Сравните этот способ с `user.name`, который мы создали выше "обычным способом": в этот раз все флаги имеют значение `false`. Если это не то, что нам нужно, надо присвоить им значения `true` в `дескрипторе`.

Давайте рассмотрим на примерах, что нам дает использование флагов.

## Только для чтения

Давайте сделаем свойство `user.name` доступным только для чтения. Для этого изменим флаг `writable`:

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
user.name = "Pete"; // Ошибка: Невозможно изменить доступное только для чтения свойство 'name'...
*/!*
```

Никто не сможет изменить имя пользователя, пока не переопределит наш метод `defineProperty` своим.

Вот та же самая операция, но в ситуации, когда свойство не существует:

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "Pete",
  // для нового свойства необходимо явно указать значение true
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // Pete
user.name = "Alice"; // Ошибка
```


## Неперечисляемое свойство

Теперь добавим собственный метод `toString` к объекту `user`.

Обычно, встроенный метод `toString` в объектах - неперечисляемый, он не работает в цикле `for..in`. Но если мы напишем свой собственный метод `toString`, он будет работать в цикле `for..in` по умолчанию:

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// По умолчанию, оба свойства работают в цикле:
for (let key in user) alert(key); // name, toString
```

Если мы этого не хотим, можно установить для свойства `enumerable:false`. Тогда это свойство не будет работать в цикле `for..in`, как и его встроенный аналог:

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

Неперечисляемые свойства также исключаются из `Object.keys`:

```js
alert(Object.keys(user)); // name
```

## Неконфигурируемое свойство

Флаг неконфигурируемого свойства (`configurable:false`) иногда предустановлен для некоторых встроенных объектов и свойств.

Неконфигурируемое свойство не может быть удалено или изменено с помощью `defineProperty`.

Например, свойство `Math.PI` - только для чтения, неперечисляемое и неконфигурируемое:

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
То есть, программист не сможет изменить значение `Math.PI` или перезаписать его.

```js run
Math.PI = 3; // Ошибка

// удаление Math.PI также не будет работать
```

Определение свойства как неконфигурируемого - это дорога в один конец. Мы не сможем поменять это обратно, потому что `defineProperty` не работает с неконфигуриремыми свойствами.

В коде ниже мы делаем `user.name` "навечно запечатанной" константой:

```js run
let user = { };

Object.defineProperty(user, "name", {
  value: "John",
  writable: false,
  configurable: false
});

*!*
// теперь невозможно изменить user.name или его флаги
// всё это не будет работать:
//   user.name = "Pete"
//   delete user.name
//   defineProperty(user, "name", ...)
Object.defineProperty(user, "name", {writable: true}); // Ошибка
*/!*
```

```smart header="Ошибки отображаются только в режиме use strict"
В режиме non-strict, мы не увидим никаких ошибок при записи в свойства "только для чтения" и т.п. Но эти операции все равно не будут выполнены успешно. Действия, нарущающие ограничения флагов свойств, в режиме non-strict просто тихо игнорируются.
```

## Object.defineProperties

Существует метод [Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties), который позволяет определять множество свойств сразу.

Его синтаксис:

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

Чтобы получить все дескрипторы свойств сразу, можно воспользоваться методом [Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors).

Вместе с `Object.defineProperties`, этот метод можно использовать для клонирования объекта вместе с его флагами:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

При клонировании объекта мы обычно используем присваивание, чтобы скопировать его свойства. Примерно так:

```js
for (let key in user) {
  clone[key] = user[key]
}
```

...Но это не копирует флаги. Так что если нам нужен клон "получше", предпочтительнее использовать `Object.defineProperties`.

Другое отличие в том, что `for..in` игнорирует символические свойства, а `Object.getOwnPropertyDescriptors` возвращает дескрипторы *всех* свойств, включая символические.

## Глобальное запечатывание объекта

Дескрипторы свойств работают на уровне конкретных свойств.

Но еще есть методы, которые ограничивают доступ ко *всему* объекту:

[Object.preventExtensions(obj)](mdn:js/Object/preventExtensions)
: Запрещает добавлять новые свойства в объект.

[Object.seal(obj)](mdn:js/Object/seal)
: Запрещает добавлять/удалять свойства. Устанавливает `configurable: false` для всех существующих свойств.

[Object.freeze(obj)](mdn:js/Object/freeze)
: Запрещает добавлять/удалять/изменять свойства. Устанавливает `configurable: false, writable: false` для всех существующих свойств.
А также есть методы для их проверки:

[Object.isExtensible(obj)](mdn:js/Object/isExtensible)
: Возвращает `false` если добавление свойств запрещено, иначе `true`.

[Object.isSealed(obj)](mdn:js/Object/isSealed)
: Возвращает `true` если добавление/удаление свойств запрещено и для всех существующих свойств установлено `configurable: false`.

[Object.isFrozen(obj)](mdn:js/Object/isFrozen)
: Возвращает `true` если добавление/удаление/изменение свойств запрещено, и для всех текущих свойств установлено `configurable: false, writable: false`.

На практике эти методы используются редко.
