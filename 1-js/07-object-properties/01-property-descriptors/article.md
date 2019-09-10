
# Флаги и дескрипторы свойств

Как мы знаем, объекты могут содержать свойства.

До этого момента мы рассматривали свойство только как пару "ключ-значение". Но на самом деле свойство объекта гораздо мощнее и гибче.

В этой главе мы изучим дополнительные флаги конфигурации для свойств, а в следующей -- увидим, как можно незаметно превратить их в специальные функции - геттеры и сеттеры.

## Флаги свойств

Помимо значения **`value`**, свойства объекта имеют три специальных атрибута (так называемые "флаги").

- **`writable`** -- если `true`, свойство можно изменить, иначе оно только для чтения.
- **`enumerable`** -- если `true`, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
- **`configurable`** -- если `true`, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.

Мы ещё не встречали эти атрибуты, потому что обычно они скрыты. Когда мы создаём свойство "обычным способом", все они имеют значение `true`. Но мы можем изменить их в любое время.

Сначала посмотрим, как получить их текущие значения.

Метод [Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) позволяет получить *полную* информацию о свойстве.

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

Чтобы изменить флаги, мы можем использовать метод [Object.defineProperty](mdn:js/Object/defineProperty).

Его синтаксис:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
: Объект и его свойство, для которого нужно применить дескриптор.

`descriptor`
: Применяемый дескриптор.

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

```smart header="Ошибки появляются только в строгом режиме"
В нестрогом режиме, без `use strict`, мы не увидим никаких ошибок при записи в свойства "только для чтения" и т.п. Но эти операции всё равно не будут выполнены успешно. Действия, нарушающие ограничения флагов, в нестрогом режиме просто молча игнорируются.
```

Вот тот же пример, но свойство создано "с нуля":

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "John",
  // для нового свойства необходимо явно указывать все флаги, для которых значение true
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // John
user.name = "Pete"; // Ошибка
```

## Неперечислимое свойство

Теперь добавим собственный метод `toString` к объекту `user`.

Встроенный метод `toString` в объектах - неперечислимый, его не видно в цикле `for..in`. Но если мы напишем свой собственный метод `toString`, цикл `for..in` будет выводить его по умолчанию:

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

Если мы этого не хотим, можно установить для свойства `enumerable:false`. Тогда оно перестанет появляться в цикле `for..in` аналогично встроенному `toString`:

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

Неконфигурируемое свойство не может быть удалено или изменено с помощью `defineProperty`.

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
Math.PI = 3; // Ошибка

// delete Math.PI тоже не сработает
```

Определение свойства как неконфигурируемого - это дорога в один конец. Мы не сможем отменить это действие, потому что `defineProperty` не работает с неконфигурируемыми свойствами.

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

```smart header="Ошибки отображаются только в строгом режиме"
В нестрогом режиме мы не увидим никаких ошибок при записи в свойства "только для чтения" и т.п. Эти операции всё равно не будут выполнены успешно. Действия, нарушающие ограничения флагов, в нестрогом режиме просто молча игнорируются.
```

## Метод Object.defineProperties

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

Другое отличие в том, что `for..in` игнорирует символьные свойства, а `Object.getOwnPropertyDescriptors` возвращает дескрипторы *всех* свойств, включая свойства-символы.

## Глобальное запечатывание объекта

Дескрипторы свойств работают на уровне конкретных свойств.

Но ещё есть методы, которые ограничивают доступ ко *всему* объекту:

[Object.preventExtensions(obj)](mdn:js/Object/preventExtensions)
: Запрещает добавлять новые свойства в объект.

[Object.seal(obj)](mdn:js/Object/seal)
: Запрещает добавлять/удалять свойства. Устанавливает `configurable: false` для всех существующих свойств.

[Object.freeze(obj)](mdn:js/Object/freeze)
: Запрещает добавлять/удалять/изменять свойства. Устанавливает `configurable: false, writable: false` для всех существующих свойств.

А также есть методы для их проверки:

[Object.isExtensible(obj)](mdn:js/Object/isExtensible)
: Возвращает `false`, если добавление свойств запрещено, иначе `true`.

[Object.isSealed(obj)](mdn:js/Object/isSealed)
: Возвращает `true`, если добавление/удаление свойств запрещено и для всех существующих свойств установлено `configurable: false`.

[Object.isFrozen(obj)](mdn:js/Object/isFrozen)
: Возвращает `true`, если добавление/удаление/изменение свойств запрещено, и для всех текущих свойств установлено `configurable: false, writable: false`.

На практике эти методы используются редко.
