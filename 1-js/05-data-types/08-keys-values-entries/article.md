
# Методы Object.keys, values, entries

Давайте отойдем от отдельных структур данных и поговорим об их итерировании.

В предыдущей главе мы видели методы `map.keys()`, `map.values()`, `map.entries()`.

Это универсальные методы и существует общее соглашение использовать их для структур данных. Если бы мы создали собственную структуру данных, мы также должны были бы их реализовать.

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

Почему так? Основная причина - гибкость. Помните, что объекты являются основой всех сложных структур в JavaScript. У нас может быть объект `order`, который реализует свой собственный метод `order.values()`. И мы всё ещё можем на нем вызвать метод `Object.values(order)`.

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

## Object.keys/values/entries игнорируют символьные свойства

Подобно циклу `for..in`, эти методы игнорируют свойства, которые используют `Symbol(...)` в качестве ключей.

Обычно это удобно. Но если нам всё же нужны символьные ключи, то есть отдельный метод [Object.getOwnPropertySymbols](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols), который возвращает массив только символьных ключей. А также метод [Reflect.ownKeys(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys), который возвращает *все* ключи.
