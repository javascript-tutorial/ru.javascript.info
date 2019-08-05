
# Расширение встроенных классов

От встроенных классов, таких как `Array`, `Map` и других, тоже можно наследовать.

Например, в этом примере `PowerArray` наследуется от встроенного `Array`:

```js run
// добавим один метод (можно более одного)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```

<<<<<<< HEAD
Обратите внимание на интересный момент: встроенные методы, такие как `filter`, `map` и другие возвращают новые объекты унаследованного класса `PowerArray`. Их внутренняя реализация такова, что для этого они используют свойство объекта `constructor`.
=======
Please note a very interesting thing. Built-in methods like `filter`, `map` and others -- return new objects of exactly the inherited type `PowerArray`. Their internal implementation uses object `constructor` property for that.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

В примере выше,
```js
arr.constructor === PowerArray
```

<<<<<<< HEAD
Поэтому при вызове метода `arr.filter()` он внутри создаёт массив результатов, именно используя `arr.constructor`, а не обычный массив. Это замечательно, поскольку можно продолжать использовать методы `PowerArray` далее на результатах.
=======
When `arr.filter()` is called, it internally creates the new array of results using exactly `arr.constructor`, not basic `Array`. That's actually very cool, because we can keep using `PowerArray` methods further on the result.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Более того, мы можем настроить это поведение.

При помощи специального статического геттера `Symbol.species` можно вернуть конструктор, который JavaScript будет использовать в `filter`, `map` и других методах для создания новых объектов.

Если бы мы хотели, чтобы методы `map`, `filter` и т. д. возвращали обычные массивы, мы могли бы вернуть `Array` в `Symbol.species`, вот так:

```js run
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

*!*
  // встроенные методы массива будут использовать этот метод как конструктор
  static get [Symbol.species]() {
    return Array;
  }
*/!*
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter создаст новый массив, используя arr.constructor[Symbol.species] как конструктор
let filteredArr = arr.filter(item => item >= 10);

*!*
// filteredArr не является PowerArray, это Array
*/!*
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
```

Как вы видите, теперь `.filter` возвращает `Array`. Расширенная функциональность не будет передаваться далее.

<<<<<<< HEAD
```smart header="Аналогично работают другие коллекции"
Другие коллекции, такие как `Map`, `Set`, работают аналогично. Они также исполуют `Symbol.species`.
```

## Отсутствие статического наследования встроенных классов
=======
```smart header="Other collections work similarly"
Other collections, such as `Map` and `Set`, work alike. They also use `Symbol.species`.
```

## No static inheritance in built-ins
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

У встроенных объектов есть собственные статические методы, например `Object.keys`, `Array.isArray` и т. д.

Как мы уже знаем, встроенные классы расширяют друг друга.

Обычно, когда один класс наследует другому, то наследуются и статические методы. Это было подробно разъяснено в главе [](info:static-properties-methods#statics-and-inheritance).

Но встроенные классы - исключение. Они не наследуют статические методы друг друуга.

Например, и `Array` и `Date` наследуют от `Object`, так что в их экземплярах доступны методы из `Object.prototype`. Но `Array.[[Prototype]]` не ссылается на `Object`, поэтому нет методов `Array.keys()` или `Date.keys()`.

Ниже вы видите структуру `Date` и `Object`:

![](object-date-inheritance.svg)

<<<<<<< HEAD
Как видите, нет связи между `Date` и `Object`. Они независимы, только `Date.prototype` наследует от `Object.prototype`.

В этом важное отличие наследования встроенных объектов от того, что мы получаем с использованием `extends`.
=======
As you can see, there's no link between `Date` and `Object`. They are independent, only `Date.prototype` inherits from `Object.prototype`.

That's an important difference of inheritance between built-in objects compared to what we get with `extends`.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
