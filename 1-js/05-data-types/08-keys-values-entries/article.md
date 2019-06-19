
# Object.keys, values, entries

Давайте отойдем от отдельных структур данных и поговорим об их итерировании.

В предыдущей главе мы видели методы `map.keys()`, `map.values()`, `map.entries()`.

Это универсальные методы, и существует общее соглашение использовать их для структур данных. Если бы мы создали собственную структуру данных, мы также должны были бы их реализовать.

Методы поддерживаются для структур:

- `Map`
- `Set`
- `Array` (кроме `arr.values()`)

Простые объекты также поддерживают подобные методы, но синтаксис немного отличается.

## Object.keys, values, entries

Для простых объектов доступны следующие методы:

- [Object.keys(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) -- возвращает массив ключей.
- [Object.values(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/values) -- возвращает массив значений.
- [Object.entries(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) -- возвращает массив пар `[ключ, значение]`.

... Но, обратите внимание на различия (по сравнению с `map`, например):

|                  | Map                | Object                                 |
|------------------|--------------------|----------------------------------------|
| Синтаксис вызова | `map.keys()`       | `Object.keys(obj)`, не `obj.keys()`  |
| Возвращает       | итерируемый объект | "реальный" массив                      |

Первое отличие в том, что мы должны вызвать `Object.keys(obj)`, а не `obj.keys()`.

Почему так? Основная причина - гибкость. Помните, что объекты являются основой всех сложных структур в JavaScript. У нас может быть объект `order`, который реализует свой собственный метод `order.values()`. И мы всё ещё можем применять к нему метод `Object.values(order)`.

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

## Object.fromEntries для создания объектов

Иногда нам нужно выполнить преобразование обьекта к `Map` и обратно.

Мы можем выполнить `new Map(Object.entries(obj))`, чтобы сделать `Map` из `obj`.

Синтаксис `Object.fromEntries` позволяет сделать это в обратную сторону. Передавая массив из пар `[key, value]`, мы создаём обьект:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// сейчас prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Давайте посмотрим, как это применять на практике.

Для примера, мы хотим создать новый объект с удвоенными ценами на основе существующего объекта.

Для массивов мы имеем метод `.map`, позволяющий трансформировать массив, но для объектов ничего такого нет.

Тогда мы можем использовать цикл:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = {};
for(let [product, price] of Object.entries(prices)) {
  doublePrices[product] = price * 2;
}

alert(doublePrices.meat); // 8
```

...или мы можем представить объект как `Array`, используя `Object.entries`, затем выполнить операцию с использованием `map` (и потенциально других методов массивов), а затем вернуть обратно, используя `Object.fromEntries`.

Давайте сделаем это для нашего объекта:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // сконвертировать в массив, использовать map, а затем fromEntries вернёт нам объект
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
*/!*

alert(doublePrices.meat); // 8
```   

Это может выглядеть сложным на первый взгляд, но становится лёгким для понимания после нескольких раз использования.

Мы также можем использовать `fromEntries` для получения объекта из структуры `Map`.

Представьте, что мы имеем структуру `Map` из цен, но нам необходимо передать её в сторонний код, ожидающий объект.

Вот так:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map);

// теперь obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```
