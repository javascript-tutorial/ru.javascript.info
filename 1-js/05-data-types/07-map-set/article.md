
# Map и Set

<<<<<<< HEAD
Сейчас мы знаем о следующих сложных структурах данных:

- Объекты для хранения именованных коллекций.
- Массивы для хранения упорядоченных коллекций.
=======
Till now, we've learned about the following complex data structures:

- Objects are used for storing keyed collections.
- Arrays are used for storing ordered collections.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Но этого не всегда достаточно для решения повседневных задач. Поэтому также существуют `Map` и `Set`.

## Map

[Map](mdn:js/Map) -- это коллекция ключ/значение, как и `Object`. Но основное отличие в том, что `Map` позволяет использовать ключи любого типа.

Методы и свойства:

- `new Map()` -- создаёт коллекцию.
- `map.set(key, value)` -- записывает по ключу `key` значение `value`.
- `map.get(key)` -- возвращает значение по ключу или `undefined`, если ключ `key` отсутствует.
- `map.has(key)` -- возвращает `true`, если ключ `key` присутствует в коллекции, иначе `false`.
- `map.delete(key)` -- удаляет элемент по ключу `key`.
- `map.clear()` -- очищает коллекцию от всех элементов.
- `map.size` -- возвращает текущее количество элементов.

Например:

```js run
let map = new Map();

map.set("1", "str1");    // строка в качестве ключа
map.set(1, "num1");      // цифра как ключ
map.set(true, "bool1");  // булево значение как ключ

// помните, обычный объект Object приводит ключи к строкам?
// Map сохраняет тип ключей, так что в этом случае сохранится 2 разных значения:
alert(map.get(1)); // "num1"
alert(map.get("1")); // "str1"

alert(map.size); // 3
```

Как мы видим, в отличие от объектов, ключи не были приведены к строкам. Можно использовать любые типы данных для ключей.

<<<<<<< HEAD
**Map может использовать объекты в качестве ключей.**
=======
```smart header="`map[key]` isn't the right way to use a `Map`"
Although `map[key]` also works, e.g. we can set `map[key] = 2`, this is treating `map` as a plain JavaScript object, so it implies all corresponding limitations (only string/symbol keys and so on).

So we should use `map` methods: `set`, `get` and so on.
```

**Map can also use objects as keys.**
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Например:

```js run
let john = { name: "John" };

// давайте сохраним количество посещений для каждого пользователя
let visitsCountMap = new Map();

// объект john - это ключ для значения в объекте Map
visitsCountMap.set(john, 123);

alert(visitsCountMap.get(john)); // 123
```

<<<<<<< HEAD
Использование объектов в качестве ключей -- это одна из известных и часто применяемых возможностей объекта `Map`. При строковых ключах обычный объект `Object` может подойти, но для ключей-объектов - уже нет.
=======
Using objects as keys is one of the most notable and important `Map` features. The same does not count for `Object`. String as a key in `Object` is fine, but we can't use another `Object` as a key in `Object`.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Попробуем заменить `Map` на `Object` в примере выше:

```js run
let john = { name: "John" };
let ben = { name: "Ben" };

let visitsCountObj = {}; // попробуем использовать объект

<<<<<<< HEAD
visitsCountObj[john] = 123; // возьмём объект john как ключ

*!*
// Вот как это было записано!
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

Так как `visitsCountObj` -- это объект, то все ключи он автоматически преобразует к строке, в итоге получился строковой ключ `"[object Object]"`. Это не то, чего мы хотим.
=======
visitsCountObj[ben] = 234; // try to use ben object as the key
visitsCountObj[john] = 123; // try to use john object as the key, ben object will get replaced

*!*
// That's what got written!
alert( visitsCountObj["[object Object]"] ); // 123 
*/!*
```

As `visitsCountObj` is an object, it converts all `Object` keys, such as `john` and `ben` above, to same string `"[object Object]"`. Definitely not what we want.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

```smart header="Как объект `Map` сравнивает ключи"
Чтобы сравнивать ключи, объект `Map` использует алгоритм [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). Это почти такое же сравнение, что и `===`, с той лишь разницей, что `NaN` считается равным `NaN`. Так что `NaN` также может использоваться в качестве ключа.

Этот алгоритм не может быть заменён или модифицирован.
```

````smart header="Цепочка вызовов"
Каждый вызов `map.set` возвращает объект map, так что мы можем объединить вызовы в цепочку:

```js
map.set("1", "str1")
  .set(1, "num1")
  .set(true, "bool1");
```
````

## Перебор Map

Для перебора коллекции `Map` есть 3 метода:

- `map.keys()` -- возвращает итерируемый объект по ключам,
- `map.values()` -- возвращает итерируемый объект по значениям,
- `map.entries()` -- возвращает итерируемый объект по парам вида `[ключ, значение]`, этот вариант используется по умолчанию в `for..of`.

Например:

```js run
let recipeMap = new Map([
  ["огурец", 500],
  ["помидор", 350],
  ["лук",    50]
]);

// перебор по ключам (овощи)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // огурец, помидор, лук
}

// перебор по значениям (числа)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// перебор по элементам в формате [ключ, значение]
for (let entry of recipeMap) { // то же самое, что и recipeMap.entries()
  alert(entry); // огурец,500 (и так далее)
}
```

```smart header="Используется порядок вставки"
В отличие от обычных объектов `Object`, в `Map` перебор происходит в том же  порядке, в каком происходило добавление элементов.
```

Кроме этого, `Map` имеет встроенный метод `forEach`, схожий со встроенным методом массивов `Array`:

```js
// выполняем функцию для каждой пары (ключ, значение)
recipeMap.forEach((value, key, map) => {
  alert(`${key}: ${value}`); // огурец: 500 и так далее
});
```

## Object.entries: Map из Object

При создании `Map` мы можем указать массив (или другой итерируемый объект) с парами ключ-значение для инициализации, как здесь:

```js run
// массив пар [ключ, значение]
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

Если у нас уже есть обычный объект, и мы хотели бы создать `Map` из него, то поможет встроенный метод [Object.entries(obj)](mdn:js/Object/entries), который получает объект и возвращает массив пар ключ-значение для него, как раз в этом формате.

Так что мы можем создать `Map` из обычного объекта следующим образом:

```js
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*
```

Здесь `Object.entries` возвращает массив пар ключ-значение: `[ ["name","John"], ["age", 30] ]`. Это именно то, что нужно для создания `Map`.


## Object.fromEntries: Object из Map

Мы только что видели, как создать `Map` из обычного объекта при помощи `Object.entries(obj)`.

Есть метод `Object.fromEntries`, который делает противоположное: получив массив пар вида `[ключ, значение]`, он создаёт из них объект:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

<<<<<<< HEAD
Мы можем использовать `Object.fromEntries`, чтобы получить обычный объект из `Map`.
=======
We can use `Object.fromEntries` to get a plain object from `Map`.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

К примеру, у нас данные в `Map`, но их нужно передать в сторонний код, который ожидает обычный объект.

Вот как это сделать:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // создаём обычный объект (*)
*/!*

// готово!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

<<<<<<< HEAD
Вызов `map.entries()` возвращает итерируемый объект пар ключ/значение, как раз в нужном формате для `Object.fromEntries`.

Мы могли бы написать строку `(*)` ещё короче:
=======
A call to `map.entries()` returns an iterable of key/value pairs, exactly in the right format for `Object.fromEntries`.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

```js
let obj = Object.fromEntries(map); // убрать .entries()
```

Это то же самое, так как `Object.fromEntries` ожидает перебираемый объект в качестве аргумента, не обязательно массив. А перебор `map` как раз возвращает пары ключ/значение, так же, как и `map.entries()`. Так что в итоге у нас будет обычный объект с теми же ключами/значениями, что и в `map`.

## Set

Объект `Set` -- это особый вид коллекции: "множество" значений (без ключей), где каждое значение может появляться только один раз.

Его основные методы это:

- `new Set(iterable)` -- создаёт `Set`, и если в качестве аргумента был предоставлен итерируемый объект (обычно это массив), то копирует его значения в новый `Set`.
- `set.add(value)` -- добавляет значение (если оно уже есть, то ничего не делает), возвращает тот же объект `set`.
- `set.delete(value)` -- удаляет значение, возвращает `true`, если `value` было в множестве на момент вызова, иначе `false`.
- `set.has(value)` -- возвращает `true`, если значение присутствует в множестве, иначе `false`.
- `set.clear()` -- удаляет все имеющиеся значения.
- `set.size` -- возвращает количество элементов в множестве.

Основная "изюминка" - это то, что при повторных вызовах `set.add()` с одним и тем же значением ничего не происходит, за счёт этого как раз и получается, что каждое значение появляется один раз.

Например, мы ожидаем посетителей, и нам необходимо составить их список. Но повторные визиты не должны приводить к дубликатам. Каждый посетитель должен появиться в списке только один раз.

Множество `Set` - как раз то, что нужно для этого:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// считаем гостей, некоторые приходят несколько раз
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set хранит только 3 уникальных значения
alert(set.size); // 3

for (let user of set) {
  alert(user.name); // John (потом Pete и Mary)
}
```

Альтернативой множеству `Set` может выступать массив для хранения гостей и дополнительный код для проверки уже имеющегося элемента с помощью [arr.find](mdn:js/Array/find). Но в этом случае будет хуже производительность, потому что `arr.find` проходит весь массив для проверки наличия элемента. Множество `Set` лучше оптимизировано для добавлений, оно автоматически проверяет на уникальность.

## Перебор объекта Set

Мы можем перебрать содержимое объекта set как с помощью метода `for..of`, так и используя `forEach`:

```js run
let set = new Set(["апельсин", "яблоко", "банан"]);

for (let value of set) alert(value);

// то же самое с forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Заметим забавную вещь. Функция в `forEach` у `Set` имеет 3 аргумента: значение `value`, потом *снова то же самое значение* `valueAgain`, и только потом целевой объект. Это действительно так, значение появляется в списке аргументов дважды.

Это сделано для совместимости с объектом `Map`, в котором колбэк `forEach` имеет 3 аргумента. Выглядит немного странно, но в некоторых случаях может помочь легко заменить `Map` на `Set` и наоборот.

`Set` имеет те же встроенные методы, что и `Map`:

- `set.values()` -- возвращает перебираемый объект для значений,
- `set.keys()` -- то же самое, что и `set.values()`, присутствует для обратной совместимости с `Map`,
- `set.entries()` -- возвращает перебираемый объект для пар вида `[значение, значение]`, присутствует для обратной совместимости с `Map`.

## Итого

`Map` -- коллекция пар ключ-значение.

Методы и свойства:

<<<<<<< HEAD
- `new Map([iterable])` -- создаёт коллекцию, можно указать перебираемый объект (обычно массив) из пар `[ключ,значение]` для инициализации.
- `map.set(key, value)` -- записывает по ключу `key` значение `value`.
- `map.get(key)` -- возвращает значение по ключу или `undefined`, если ключ `key` отсутствует.
- `map.has(key)` -- возвращает `true`, если ключ `key` присутствует в коллекции, иначе `false`.
- `map.delete(key)` -- удаляет элемент по ключу `key`.
- `map.clear()` -- очищает коллекцию от всех элементов.
- `map.size` -- возвращает текущее количество элементов.
=======
- `new Map([iterable])` -- creates the map, with optional `iterable` (e.g. array) of `[key,value]` pairs for initialization.
- `map.set(key, value)` -- stores the value by the key, returns the map itself.
- `map.get(key)` -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- `map.has(key)` -- returns `true` if the `key` exists, `false` otherwise.
- `map.delete(key)` -- removes the value by the key, returns `true` if `key` existed at the moment of the call, otherwise `false`.
- `map.clear()` -- removes everything from the map.
- `map.size` -- returns the current element count.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Отличия от обычного объекта `Object`:

- Что угодно может быть ключом, в том числе и объекты.
- Есть дополнительные методы, свойство `size`.

`Set` -- коллекция уникальных значений, так называемое "множество".

Методы и свойства:

- `new Set([iterable])` -- создаёт `Set`, можно указать перебираемый объект со значениями для инициализации.
- `set.add(value)` -- добавляет значение (если оно уже есть, то ничего не делает), возвращает тот же объект `set`.
- `set.delete(value)` -- удаляет значение, возвращает `true` если `value` было в множестве на момент вызова, иначе `false`.
- `set.has(value)` -- возвращает `true`, если значение присутствует в множестве, иначе `false`.
- `set.clear()` -- удаляет все имеющиеся значения.
- `set.size` -- возвращает количество элементов в множестве.

Перебор `Map` и `Set` всегда осуществляется в порядке добавления элементов, так что нельзя сказать, что это -- неупорядоченные коллекции, но поменять порядок элементов или получить элемент напрямую по его номеру нельзя.
