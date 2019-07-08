
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

Обратите внимание на интересный момент: встроенные методы, такие как `filter`, `map` и другие возвращают новые объекты созданного пользовательского типа. Для этого они используют свойство `constructor`.

В примере выше,
```js
arr.constructor === PowerArray
```

Таким образом, при вызове метода `arr.filter()` он внутри создаёт массив результатов, именно используя `new PowerArray`, а не обычный массив.
Это замечательно, поскольку можно продолжать использовать методы `PowerArray` далее на результатах.

Более того, мы можем настроить это поведение.

При помощи специального статического геттера `Symbol.species` можно вернуть конструктор, который JavaScript будет использовать в `filter`, `map` и других методах для создания новых объектов.

<<<<<<< HEAD
Если бы мы хотели, чтобы методы `map`, `filter` и т. д. возвращали обычные массивы, мы можем вернуть `Array` в `Symbol.species`, вот так:
=======
If we'd like built-in methods like `map` or `filter` to return regular arrays, we can return `Array` in `Symbol.species`, like here:
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

```js run
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

*!*
  // встроенные методы будут использовать этот метод как конструктор
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

## Отсутствие статического наследования встроенных классов

У встроенных объектов есть собственные статические методы, например `Object.keys`, `Array.isArray` и т. д.

Как мыы уже знаем, встроенные классы расширяют друг друга.
Мы уже говорили ранее о встроенных классах, которые расширяют друг друга: `Array.[[Prototype]] = Object`.

Но статические методы - исключение. Встроенные классы не наследуют статические методы друг друга.

Другими словами, прототип встроенного конструктора `Array` не содержит указателя на `Object`. Таким образом, `Array` и `Date` не содержат `Array.keys` или `Date.keys`. И это выглядит естественно.

<<<<<<< HEAD
Ниже вы видите структуру `Date` и `Object`:
=======
1. `Rabbit.methods` are callable for `Animal.methods`, because `Rabbit.[[Prototype]] = Animal`.
2. `new Rabbit().methods` are also available, because `Rabbit.prototype.[[Prototype]] = Animal.prototype`.

That's thoroughly explained in the chapter [](info:static-properties-methods#statics-and-inheritance).

But built-in classes are an exception. They don't inherit statics from each other.

For example, both `Array` and `Date` inherit from `Object`, so their instances have methods from `Object.prototype`. But  `Array.[[Prototype]]` does not point to `Object`. So there's `Object.keys()`, but not `Array.keys()` and `Date.keys()`.

Here's the picture structure for `Date` and `Object`:
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

![](object-date-inheritance.png)

Следует отметить, что здесь нет связи между `Date` и `Object`. Как `Object`, так и `Date` существуют независимо. `Date.prototype` наследуется только от `Object.prototype`.
