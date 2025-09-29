
# Object.keys, values, entries

Давайте отойдём от отдельных структур данных и поговорим об их переборе вообще.

В предыдущей главе мы видели методы `map.keys()`, `map.values()`, `map.entries()`.

Это универсальные методы, и существует общее соглашение использовать их для структур данных. Если бы мы делали собственную структуру данных, нам также следовало бы их реализовать.

Методы поддерживаются для структур:

- `Map`
- `Set`
- `Array`

Простые объекты также можно перебирать похожими методами, но синтаксис немного отличается.

## Object.keys, values, entries

Для простых объектов доступны следующие методы:

- [Object.keys(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) -- возвращает массив ключей.
- [Object.values(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/values) -- возвращает массив значений.
- [Object.entries(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) -- возвращает массив пар `[ключ, значение]`.

Обратите внимание на различия (по сравнению с `map`, например):

|                  | Map                | Object                                 |
|------------------|--------------------|----------------------------------------|
| Синтаксис вызова | `map.keys()`       | `Object.keys(obj)`, не `obj.keys()`  |
| Возвращает       | перебираемый объект | "реальный" массив                      |

Первое отличие в том, что мы должны вызвать `Object.keys(obj)`, а не `obj.keys()`.

Почему так? Основная причина - гибкость. Помните, что объекты являются основой всех сложных структур в JavaScript. У нас может быть объект `data`, который реализует свой собственный метод `data.values()`. И мы всё ещё можем применять к нему стандартный метод `Object.values(data)`.

Второе отличие в том, что методы вида `Object.*` возвращают "реальные" массивы, а не просто итерируемые объекты. Это в основном по историческим причинам.

Например:

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

Вот пример использования `Object.values` ​​для перебора значений свойств в цикле:

```js run
let user = {
  name: "John",
  age: 30
};

// перебор значений
for (let value of Object.values(user)) {
  alert(value); // John, затем 30
}
```

```warn header="Object.keys/values/entries игнорируют символьные свойства"
Так же, как и цикл `for..in`, эти методы игнорируют свойства, использующие `Symbol(...)` в качестве ключей.

Обычно это удобно. Но если требуется учитывать и символьные ключи, то для этого существует отдельный метод [Object.getOwnPropertySymbols](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols), возвращающий массив только символьных ключей. Также, существует метод [Reflect.ownKeys(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys), который возвращает *все* ключи.
```

## Трансформации объекта

У объектов нет множества методов, которые есть в массивах, например `map`, `filter` и других.

Если мы хотели бы их применить, то можно использовать `Object.entries` с последующим вызовом `Object.fromEntries`:

<<<<<<< HEAD
1. Вызов `Object.entries(obj)` возвращает массив пар ключ/значение для `obj`.
2. На нём вызываем методы массива, например, `map`.
3. Используем `Object.fromEntries(array)` на результате, чтобы преобразовать его обратно в объект.

Например, у нас есть объект с ценами, и мы хотели бы их удвоить:
=======
If we'd like to apply them, then we can use `Object.entries` followed by `Object.fromEntries`:

1. Use `Object.entries(obj)` to get an array of key/value pairs from `obj`.
2. Use array methods on that array, e.g. `map`, to transform these key/value pairs.
3. Use `Object.fromEntries(array)` on the resulting array to turn it back into an object.

For example, we have an object with prices, and would like to double them:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
<<<<<<< HEAD
  // преобразовать в массив, затем map, затем fromEntries (обратно в объект)
  Object.entries(prices).map(([key, value]) => [key, value * 2])
=======
  // convert prices to array, map each key/value pair into another pair
  // and then fromEntries gives back the object
  Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
);
*/!*

alert(doublePrices.meat); // 8
```

<<<<<<< HEAD
Это может выглядеть сложным на первый взгляд, но становится лёгким для понимания после нескольких раз использования.

Можно делать и более сложные "однострочные" преобразования таким путём. Важно только сохранять баланс, чтобы код при этом был достаточно простым для понимания.
=======
It may look difficult at first sight, but becomes easy to understand after you use it once or twice. We can make powerful chains of transforms this way.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
