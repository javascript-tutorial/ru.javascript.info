# Проверка класса: "instanceof"

Оператор `instanceof` позволяет проверить, к какому классу принадлежит объект, с учётом наследования.

Такая проверка может потребоваться во многих случаях. Здесь мы используем её для создания *полиморфной* функции, которая интерпретирует аргументы по-разному в зависимости от их типа.

## Оператор instanceof [#ref-instanceof]

Синтаксис:
```js
obj instanceof Class
```

<<<<<<< HEAD
Оператор вернёт `true`, если `obj` принадлежит классу `Class` или наследующему от него.
=======
It returns `true` if `obj` belongs to the `Class` or a class inheriting from it.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

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

Пожалуйста, обратите внимание, что `arr` также принадлежит классу `Object`, потому что `Array` наследует от `Object`.

<<<<<<< HEAD
Обычно оператор `instanceof` просматривает для проверки цепочку прототипов. Но это поведение может быть изменено при помощи статического метода `Symbol.hasInstance`.
=======
Normally, `instanceof` operator examines the prototype chain for the check. We can also set a custom logic in the static method `Symbol.hasInstance`.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Алгоритм работы `obj instanceof Class` работает примерно так:

<<<<<<< HEAD
1. Если имеется статический метод `Symbol.hasInstance`, тогда вызвать его: `Class[Symbol.hasInstance](obj)`. Он должен вернуть либо `true`, либо `false`, и это конец. Это как раз и есть возможность ручной настройки `instanceof`.

    Пример:

    ```js run
    // проверка instanceof будет полагать,
    // что всё со свойством canEat - животное Animal
=======
1. If there's a static method `Symbol.hasInstance`, then just call it: `Class[Symbol.hasInstance](obj)`. It should return either `true` or `false`, and we're done. That's how we can customize the behavior of `instanceof`.

    For example:

    ```js run
    // setup instanceOf check that assumes that
    // anything with canEat property is an animal
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
    class Animal {
      static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
      }
    }

    let obj = { canEat: true };
    alert(obj instanceof Animal); // true: вызван Animal[Symbol.hasInstance](obj)
    ```

2. Большая часть классов не имеет метода `Symbol.hasInstance`. В этом случае используется стандартная логика: проверяется, равен ли `Class.prototype` одному из прототипов в прототипной цепочке `obj`.

<<<<<<< HEAD
    Другими словами, сравнивается:
=======
    In other words, compare one after another:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
    ```js
    obj.__proto__ === Class.prototype?
    obj.__proto__.__proto__ === Class.prototype?
    obj.__proto__.__proto__.__proto__ === Class.prototype?
    ...
<<<<<<< HEAD
    // если какой-то из ответов true - возвратить true
    // если дошли до конца цепочки - false
    ```

    В примере выше `rabbit.__proto__ === Rabbit.prototype`, так что результат будет получен немедленно.

    В случае с наследованием, совпадение будет на втором шаге:
=======
    // if any answer is true, return true
    // otherwise, if we reached the end of the chain, return false
    ```

    In the example above `rabbit.__proto__ === Rabbit.prototype`, so that gives the answer immediately.

    In the case of an inheritance, the match will be at the second step:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

    ```js run
    class Animal {}
    class Rabbit extends Animal {}

    let rabbit = new Rabbit();
    *!*
    alert(rabbit instanceof Animal); // true
    */!*

    // rabbit.__proto__ === Rabbit.prototype
    *!*
<<<<<<< HEAD
    // rabbit.__proto__.__proto__ === Animal.prototype (совпадение!)
=======
    // rabbit.__proto__.__proto__ === Animal.prototype (match!)
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
    */!*
    ```

Вот иллюстрация того как `rabbit instanceof Animal` сравнивается с `Animal.prototype`:

![](instanceof.svg)

Кстати, есть метод [objA.isPrototypeOf(objB)](mdn:js/object/isPrototypeOf), которые возвращает `true`, если объект `objA` есть где-то в прототипной цепочке объекта `objB`. Так что `obj instanceof Class` можно перефразировать как `Class.prototype.isPrototypeOf(obj)`.

Забавно, но сам конструктор `Class` не участвует в процессе проверки! Важна только цепочка прототипов `Class.prototype`.

<<<<<<< HEAD
Это может приводить к интересным последствиям при изменении свойства `prototype` после создания объекта.
=======
That can lead to interesting consequences when `prototype` property is changed after the object is created.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

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

<<<<<<< HEAD
## Бонус: Object.prototype.toString возвращает тип
=======
## Bonus: Object.prototype.toString for the type
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

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

// какой это тип?
let arr = [];

alert( objectToString.call(arr) ); // [object *!*Array*/!*]
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

<<<<<<< HEAD
Можно использовать `{}.toString.call` вместо `instanceof` для встроенных объектов, когда мы хотим получить тип в виде строки, а не просто сделать проверку.
=======
We can use `{}.toString.call` instead of `instanceof` for built-in objects when we want to get the type as a string rather than just to check.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

## Итого

<<<<<<< HEAD
Давайте обобщим, какие методы для проверки типа мы знаем:
=======
Let's summarize the type-checking methods that we know:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

|               | работает для   |  возвращает      |
|---------------|----------------|------------------|
| `typeof`      | примитивов     |  строка          |
| `{}.toString` | примитивов, встроенных объектов, объектов с `Symbol.toStringTag`   |       строка |
| `instanceof`  | объектов        |  true/false      |

Как мы можем видеть, технически `{}.toString` "более продвинут", чем `typeof`.

А оператор `instanceof` - отличный выбор, когда мы работаем с иерархией классов и хотим делать проверки с учётом наследования.
