
# Расширение встроенных классов

Базовые классы, такие как Array, Map и другие могу быть также расширены.

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

Таким образом, при вызове метода `arr.filter()` он внутри создаёт новый массив с результатами так же, как если бы был использован `new PowerArray`.
Это замечательно, поскольку можно продолжать использовать методы `PowerArray` далее на результатах.

Даже более, мы можем изменить поведение.

Специальный статический геттер `Symbol.species`, если существует, возвращает конструктор, который можно использовать в таких случаях.

Если мы решим возвращать обычный массив из встроенных методов, таких как `map`, `filter` и т. д., мы можем вернуть `Array` из `Symbol.species`, как в этом примере:

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

Мы уже говорили ранее о встроенных классах, которые расширяют друг друга: `Array.[[Prototype]] = Object`.

Но статические методы - исключение. Встроенные классы не наследуют статические методы друг друга.

Другими словами, прототип встроенного конструктора `Array` не содержит указателя на `Object`. Таким образом, `Array` и `Date` не содержат `Array.keys` или `Date.keys`. И это выглядит естественно.

Ниже вы видите структуру `Date` и `Object`:

![](object-date-inheritance.png)

Следует отметить, что здесь нет связи между `Date` и `Object`. Как `Object`, так и `Date` существуют независимо. `Date.prototype` наследуется только от `Object.prototype`.
