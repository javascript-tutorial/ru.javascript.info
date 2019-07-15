# Проверка класса: "instanceof"

Оператор `instanceof` позволяет проверить, какому классу принадлежит объект, с учётом наследования.

Такая проверка может потребоваться во многих случаях. Здесь мы будем использовать её для создания *полиморфной* функции, которая использует аргументы по-разному в зависимости от их типа.

## Оператор instanceof [#ref-instanceof]

Синтаксис:
```js
obj instanceof Class
```

Оператор вернёт `true`, если `obj` принадлежит классу `Class` (или класс наследуется от него).

Например:

```js run
class Rabbit {}
let rabbit = new Rabbit();

// это объект класса Rabbit?
*!*
alert( rabbit instanceof Rabbit ); // true
*/!*
```

Также это работает с функциями-конструкторами:

```js run
*!*
// вместо класса
function Rabbit() {}
*/!*

alert( new Rabbit() instanceof Rabbit ); // true
```

...И для встроенных классов, таких как `Array`:

```js run
let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
```

Пожалуйста, обратите внимание, что `arr` также принадлежит классу `Object`, потому что `Array` наследуется от `Object`.

<<<<<<< HEAD
Оператор `instanceof` просматривает цепочку прототипов для проверки, и может быть настроен при помощи статического метода `Symbol.hasInstance`.
=======
The `instanceof` operator examines the prototype chain for the check, but we can set a custom logic in the static method `Symbol.hasInstance`.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

Алгоритм работы `obj instanceof Class` работает примерно так:

1. Если имеется статический метод `Symbol.hasInstance`, тогда вызвать его: `Class[Symbol.hasInstance](obj)`. Он должен вернут либо `true`, либо `false`. Конец. Пример:

    ```js run
    // предполагаем, все, что может есть, - животное
    class Animal {
      static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
      }
    }

    let obj = { canEat: true };
    alert(obj instanceof Animal); // true: вызван Animal[Symbol.hasInstance](obj)
    ```

<<<<<<< HEAD
2. Большая часть классов не имеет метода `Symbol.hasInstance`. В этом случае проверяется, равен ли `Class.prototype` одному из прототипов в прототипной цепочке `obj`.
=======
2. Most classes do not have `Symbol.hasInstance`. In that case, the standard logic is used: `obj instanceOf Class` checks whether `Class.prototype` equals to one of prototypes in the `obj` prototype chain.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

    Другими словами, сравнивается:
    ```js
    obj.__proto__ === Class.prototype
    obj.__proto__.__proto__ === Class.prototype
    obj.__proto__.__proto__.__proto__ === Class.prototype
    ...
    ```

    В примере выше `Rabbit.prototype === rabbit.__proto__`, так что результат будет получен немедленно.

    В случае с наследованием, `rabbit` также является экземпляром своего родительского класса:

    ```js run
    class Animal {}
    class Rabbit extends Animal {}

    let rabbit = new Rabbit();
    *!*
    alert(rabbit instanceof Animal); // true
    */!*
    // rabbit.__proto__ === Rabbit.prototype
    // rabbit.__proto__.__proto__ === Animal.prototype (совпадение!)
    ```

Вот иллюстрация того как `rabbit instanceof Animal` сравнивается с `Animal.prototype`:

![](instanceof.png)

Кстати, есть метод [objA.isPrototypeOf(objB)], которые возвращает `true`, если объект `objA` есть где-то в прототипной цепочке объекта `objB`. Так что `obj instanceof Class` можно перефразировать как `Class.prototype.isPrototypeOf(obj)`.

Забавно, но сам конструктор `Class` не участвует в процессе проверки! Важна только цепочка прототипов `Class.prototype`.

Это может приводить к интересным последствиям при изменении `prototype`.

Как, например, тут:

```js run
function Rabbit() {}
let rabbit = new Rabbit();

// заменяем прототип
Rabbit.prototype = {};

// ...больше не rabbit!
*!*
alert( rabbit instanceof Rabbit ); // false
*/!*
```

Это одна из причин избегать изменения `prototype`. Просто для безопасности.

## Бонус: Object.prototype.toString возвращает тип

Мы уже знаем, что обычные объекты преобразуется к строке как `[object Object]`:

```js run
let obj = {};

alert(obj); // [object Object]
alert(obj.toString()); // то же самое
```

Так работает реализация метода `toString`. Но у `toString` имеются скрытые возможности, которые делают метод гораздо более мощным. Мы можем использовать его как расширенную версию `typeof` и как альтернативу `instanceof`.

Звучит странно? Так и есть. Давайте развеем мистику.

Согласно [спецификации](https://tc39.github.io/ecma262/#sec-object.prototype.tostring) встроенный метод `toString` может бы позаимствован у объекта и вызван в контексте любого другого значения. И результат зависит от типа этого значения.

- Для числа это будет `[object Number]`
- Для булева типа это будет `[object Boolean]`
- Для `null`: `[object Null]`
- Для `undefined`: `[object Undefined]`
- Для массивов: `[object Array]`
- ...и т.д. (поведение настраивается).

Давайте продемонстрируем:

```js run
// скопируем метод toString в переменную для удобства
let objectToString = Object.prototype.toString;

// Какой это тип?
let arr = [];

alert( objectToString.call(arr) ); // [object Array]
```

В примере мы использовали [call](mdn:js/function/call), как описано в главе [](info:call-apply-decorators), чтобы выполнить функцию `objectToString` в контексте `this=arr`.

Внутри, алгоритм метода `toString` анализирует контекст вызова `this` и возвращает соответствующий результат. Больше примеров:

```js run
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

### Symbol.toStringTag

Поведение метода объектов `toString` можно настраивать, используя специальное свойство объекта `Symbol.toStringTag`.

Например:

```js run
let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
```

Такое свойство есть у большей части объектов, специфичных для определённых окружений. Вот несколько примеров для браузера:

```js run
// toStringTag для браузерного объекта и класса
alert( window[Symbol.toStringTag]); // window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```

Как вы можете видеть, результат -- это значение `Symbol.toStringTag` (если он имеется) обёрнутое в `[object ...]`.

В итоге мы получили "typeof на стероидах", который не только работает с примитивными типами данных, но также и со встроенными объектами, и даже может быть настроен.

Он может использоваться вместо `instanceof` для встроенных объектов, когда мы хотим получить тип в виде строки, а не просто сделать проверку.

## Итого

Давайте вспомним, какие методы для проверки типа мы знаем: 

|               | работает для   |  возвращает      |
|---------------|----------------|------------------|
| `typeof`      | примитивы      |  строка          |
| `{}.toString` | примитивы, встроенные объекты, объекты с `Symbol.toStringTag`   |       строка |
| `instanceof`  | объекты        |  true/false      |

Как мы можем видеть, технически `{}.toString` "более продвинут", чем `typeof`.

А оператор instanceof - отличный выбор, когда мы работаем с иерархией классов и хотим делать проверки с учётом наследования.
