
<<<<<<< HEAD
# Тип данных Symbol

По спецификации, в качестве ключей для свойств объекта могут использоваться только строки или символы. Ни числа, ни логические значения не подходят, разрешены только эти два типа данных.

До сих пор мы видели только строки. Теперь давайте разберём символы, увидим, что хорошего они нам дают.

## Символы

"Символ" представляет собой уникальный идентификатор.

Создаются новые символы с помощью функции `Symbol()`:

```js
// Создаём новый символ - id  
let id = Symbol();
```

При создании, символу можно дать описание (также называемое имя), в основном использующееся для отладки кода:

```js run
// Создаём символ id с описанием (именем) "id"
let id = Symbol("id");
```

Символы гарантированно уникальны. Даже если мы создадим множество символов с одинаковым описанием, это всё равно будут разные символы. Описание -- это просто метка, которая ни на что не влияет.

Например, вот два символа с одинаковым описанием -- но они не равны:
=======
# Symbol type

By specification, only two primitive types may serve as object property keys:

- string type, or
- symbol type.

Otherwise, if one uses another type, such as number, it's autoconverted to string. So that `obj[1]` is the same as `obj["1"]`, and `obj[true]` is the same as `obj["true"]`.

Until now we've been using only strings.

Now let's explore symbols, see what they can do for us.

## Symbols

A "symbol" represents a unique identifier.

A value of this type can be created using `Symbol()`:

```js
let id = Symbol();
```

Upon creation, we can give symbols a description (also called a symbol name), mostly useful for debugging purposes:

```js
// id is a symbol with the description "id"
let id = Symbol("id");
```

Symbols are guaranteed to be unique. Even if we create many symbols with exactly the same description, they are different values. The description is just a label that doesn't affect anything.

For instance, here are two symbols with the same description -- they are not equal:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

<<<<<<< HEAD
Если вы знаете Ruby или какой-то другой язык программирования, в котором есть своего рода "символы" -- пожалуйста, будьте внимательны. Символы в JavaScript имеют свои особенности, и не стоит думать о них, как о символах в Ruby или в других языках.

````warn header="Символы не преобразуются автоматически в строки"
Большинство типов данных в JavaScript могут быть неявно преобразованы в строку. Например, функция `alert` принимает практически любое значение, автоматически преобразовывает его в строку, а затем выводит это значение, не сообщая об ошибке. Символы же особенные и не преобразуются автоматически.

К примеру, `alert` ниже выдаст ошибку:
=======
If you are familiar with Ruby or another language that also has some sort of "symbols" -- please don't be misguided. JavaScript symbols are different.

So, to summarize, a symbol is a "primitive unique value" with an optional description. Let's see where we can use them.

````warn header="Symbols don't auto-convert to a string"
Most values in JavaScript support implicit conversion to a string. For instance, we can `alert` almost any value, and it will work. Symbols are special. They don't auto-convert.

For instance, this `alert` will show an error:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

<<<<<<< HEAD
Это -- языковая "защита" от путаницы, ведь строки и символы -- принципиально разные типы данных и не должны неконтролируемо преобразовываться друг в друга.

Если же мы действительно хотим вывести символ с помощью `alert`, то необходимо явно преобразовать его с помощью метода `.toString()`, вот так:
=======
That's a "language guard" against messing up, because strings and symbols are fundamentally different and should not accidentally convert one into another.

If we really want to show a symbol, we need to explicitly call `.toString()` on it, like here:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
let id = Symbol("id");
*!*
<<<<<<< HEAD
alert(id.toString()); // Symbol(id), теперь работает
*/!*
```

Или мы можем обратиться к свойству `symbol.description`, чтобы вывести только описание:
=======
alert(id.toString()); // Symbol(id), now it works
*/!*
```

Or get `symbol.description` property to show the description only:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

<<<<<<< HEAD
## "Скрытые" свойства

Символы позволяют создавать "скрытые" свойства объектов, к которым нельзя нечаянно обратиться и перезаписать их из других частей программы.

Например, мы работаем с объектами `user`, которые принадлежат стороннему коду. Мы хотим добавить к ним идентификаторы.

Используем для этого символьный ключ:

```js run
let user = {
  name: "Вася"
=======
## "Hidden" properties


Symbols allow us to create "hidden" properties of an object, that no other part of code can accidentally access or overwrite.

For instance, if we're working with `user` objects, that belong to a third-party code. We'd like to add identifiers to them.

Let's use a symbol key for it:

```js run
let user = { // belongs to another code
  name: "John"
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
};

let id = Symbol("id");

user[id] = 1;

<<<<<<< HEAD
alert( user[id] ); // мы можем получить доступ к данным по ключу-символу
```

Почему же лучше использовать `Symbol("id")`, а не строку `"id"`?

Так как объект `user` принадлежит стороннему коду, и этот код также работает с ним, то нам не следует добавлять к нему какие-либо поля. Это небезопасно. Но к символу сложно нечаянно обратиться, сторонний код вряд ли его вообще увидит, и, скорее всего, добавление поля к объекту не вызовет никаких проблем.

Кроме того, предположим, что другой скрипт для каких-то своих целей хочет записать собственный идентификатор в объект `user`. Этот скрипт может быть какой-то JavaScript-библиотекой, абсолютно не связанной с нашим скриптом.

Сторонний код может создать для этого свой символ `Symbol("id")`:
=======
alert( user[id] ); // we can access the data using the symbol as the key
```

What's the benefit of using `Symbol("id")` over a string `"id"`?

As `user` objects belong to another codebase, it's unsafe to add fields to them, since we might affect pre-defined behavior in that other codebase. However, symbols cannot be accessed accidentally. The third-party code won't be aware of newly defined symbols, so it's safe to add symbols to the `user` objects.

Also, imagine that another script wants to have its own identifier inside `user`, for its own purposes.

Then that script can create its own `Symbol("id")`, like this:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js
// ...
let id = Symbol("id");

<<<<<<< HEAD
user[id] = "Их идентификатор";
```

Конфликта между их и нашим идентификатором не будет, так как символы всегда уникальны, даже если их имена совпадают.

А вот если бы мы использовали строку `"id"` вместо символа, то тогда *был бы* конфликт:

```js run
let user = { name: "Вася" };

// Объявляем в нашем скрипте свойство "id"
user.id = "Наш идентификатор";

// ...другой скрипт тоже хочет свой идентификатор...

user.id = "Их идентификатор"
// Ой! Свойство перезаписано сторонней библиотекой!
```

### Символы в литеральном объекте

Если мы хотим использовать символ при литеральном объявлении объекта `{...}`, его необходимо заключить в квадратные скобки.

Вот так:
=======
user[id] = "Their id value";
```

There will be no conflict between our and their identifiers, because symbols are always different, even if they have the same name.

...But if we used a string `"id"` instead of a symbol for the same purpose, then there *would* be a conflict:

```js
let user = { name: "John" };

// Our script uses "id" property
user.id = "Our id value";

// ...Another script also wants "id" for its purposes...

user.id = "Their id value"
// Boom! overwritten by another script!
```

### Symbols in an object literal

If we want to use a symbol in an object literal `{...}`, we need square brackets around it.

Like this:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js
let id = Symbol("id");

let user = {
<<<<<<< HEAD
  name: "Вася",
*!*
  [id]: 123 // просто "id: 123" не сработает
*/!*
};
```
Это вызвано тем, что нам нужно использовать значение переменной `id` в качестве ключа, а не строку "id".

### Символы игнорируются циклом for..in

Свойства, чьи ключи -- символы, не перебираются циклом `for..in`.

Например:
=======
  name: "John",
*!*
  [id]: 123 // not "id": 123
*/!*
};
```
That's because we need the value from the variable `id` as the key, not the string "id".

### Symbols are skipped by for..in

Symbolic properties do not participate in `for..in` loop.

For instance:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
let id = Symbol("id");
let user = {
<<<<<<< HEAD
  name: "Вася",
=======
  name: "John",
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
  age: 30,
  [id]: 123
};

*!*
<<<<<<< HEAD
for (let key in user) alert(key); // name, age (свойства с ключом-символом нет среди перечисленных)
*/!*

// хотя прямой доступ по символу работает
alert( "Напрямую: " + user[id] );
```

Это -- часть общего принципа "сокрытия символьных свойств". Если другая библиотека или скрипт будут работать с нашим объектом, то при переборе они не получат ненароком наше символьное свойство. `Object.keys(user)` также игнорирует символы.

А вот [Object.assign](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), в отличие от цикла `for..in`, копирует и строковые, и символьные свойства:
=======
for (let key in user) alert(key); // name, age (no symbols)
*/!*

// the direct access by the symbol works
alert( "Direct: " + user[id] ); // Direct: 123
```

[Object.keys(user)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) also ignores them. That's a part of the general "hiding symbolic properties" principle. If another script or a library loops over our object, it won't unexpectedly access a symbolic property.

In contrast, [Object.assign](mdn:js/Object/assign) copies both string and symbol properties:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

<<<<<<< HEAD

Здесь нет никакого парадокса или противоречия. Так и задумано. Идея заключается в том, что, когда мы клонируем или объединяем объекты, мы обычно хотим скопировать *все* свойства (включая такие свойства с ключами-символами, как, например, `id` в примере выше).

## Глобальные символы

Итак, как мы видели, обычно все символы уникальны, даже если их имена совпадают. Но иногда мы наоборот хотим, чтобы символы с одинаковыми именами были одной сущностью. Например, разные части нашего приложения хотят получить доступ к символу `"id"`, подразумевая именно одно и то же свойство.

Для этого существует *глобальный реестр символов*. Мы можем создавать в нём символы и обращаться к ним позже, и при каждом обращении нам гарантированно будет возвращаться один и тот же символ.

Для чтения (или, при отсутствии, создания) символа из реестра используется вызов `Symbol.for(key)`.

Он проверяет глобальный реестр и, при наличии в нём символа с именем `key`, возвращает его, иначе же создаётся новый символ `Symbol(key)` и записывается в реестр под ключом `key`.

Например:

```js run
// читаем символ из глобального реестра и записываем его в переменную
let id = Symbol.for("id"); // если символа не существует, он будет создан

// читаем его снова и записываем в другую переменную (возможно, из другого места кода)
let idAgain = Symbol.for("id");

// проверяем -- это один и тот же символ
alert( id === idAgain ); // true
```

Символы, содержащиеся в реестре, называются *глобальными символами*. Если вам нужен символ, доступный везде в коде - используйте глобальные символы.

```smart header="Похоже на Ruby"
В некоторых языках программирования, например, Ruby, на одно имя (описание) приходится один символ, и не могут существовать разные символы с одинаковым именем.

В JavaScript, как мы видим, это утверждение верно только для глобальных символов.
=======
There's no paradox here. That's by design. The idea is that when we clone an object or merge objects, we usually want *all* properties to be copied (including symbols like `id`).

## Global symbols

As we've seen, usually all symbols are different, even if they have the same name. But sometimes we want same-named symbols to be same entities. For instance, different parts of our application want to access symbol `"id"` meaning exactly the same property.

To achieve that, there exists a *global symbol registry*. We can create symbols in it and access them later, and it guarantees that repeated accesses by the same name return exactly the same symbol.

In order to read (create if absent) a symbol from the registry, use `Symbol.for(key)`.

That call checks the global registry, and if there's a symbol described as `key`, then returns it, otherwise creates a new symbol `Symbol(key)` and stores it in the registry by the given `key`.

For instance:

```js run
// read from the global registry
let id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
alert( id === idAgain ); // true
```

Symbols inside the registry are called *global symbols*. If we want an application-wide symbol, accessible everywhere in the code -- that's what they are for.

```smart header="That sounds like Ruby"
In some programming languages, like Ruby, there's a single symbol per name.

In JavaScript, as we can see, that's true for global symbols.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
```

### Symbol.keyFor

<<<<<<< HEAD
Для глобальных символов, кроме `Symbol.for(key)`, который ищет символ по имени, существует обратный метод: `Symbol.keyFor(sym)`, который, наоборот, принимает глобальный символ и возвращает его имя.

К примеру:

```js run
// получаем символ по имени
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// получаем имя по символу
=======
We have seen that for global symbols, `Symbol.for(key)` returns a symbol by name. To do the opposite -- return a name by global symbol -- we can use: `Symbol.keyFor(sym)`:

For instance:

```js run
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

<<<<<<< HEAD
Внутри метода `Symbol.keyFor` используется глобальный реестр символов для нахождения имени символа. Так что этот метод не будет работать для неглобальных символов. Если символ неглобальный, метод не сможет его найти и вернёт `undefined`.

Впрочем, для любых символов доступно свойство `description`.

Например:
=======
The `Symbol.keyFor` internally uses the global symbol registry to look up the key for the symbol. So it doesn't work for non-global symbols. If the symbol is not global, it won't be able to find it and returns `undefined`.

That said, all symbols have the `description` property.

For instance:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

<<<<<<< HEAD
alert( Symbol.keyFor(globalSymbol) ); // name, глобальный символ
alert( Symbol.keyFor(localSymbol) ); // undefined для неглобального символа
=======
alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, not global
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

alert( localSymbol.description ); // name
```

<<<<<<< HEAD
## Системные символы

Существует множество "системных" символов, использующихся внутри самого JavaScript, и мы можем использовать их, чтобы настраивать различные аспекты поведения объектов.

Эти символы перечислены в спецификации в таблице [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols):
=======
## System symbols

There exist many "system" symbols that JavaScript uses internally, and we can use them to fine-tune various aspects of our objects.

They are listed in the specification in the [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) table:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
<<<<<<< HEAD
- ...и так далее.

В частности, `Symbol.toPrimitive` позволяет описать правила для объекта, согласно которым он будет преобразовываться к примитиву. Мы скоро увидим его применение.

С другими системными символами мы тоже скоро познакомимся, когда будем изучать соответствующие возможности языка.

## Итого

Символ (symbol) - примитивный тип данных, использующийся для создания уникальных идентификаторов.

Символы создаются вызовом функции `Symbol()`, в которую можно передать описание (имя) символа.

Даже если символы имеют одно и то же имя, это -- разные символы. Если мы хотим, чтобы одноимённые символы были равны, то следует использовать глобальный реестр: вызов `Symbol.for(key)` возвращает (или создаёт) глобальный символ с `key` в качестве имени. Многократные вызовы команды `Symbol.for` с одним и тем же аргументом возвращают один и тот же символ.

Символы имеют два основных варианта использования:

1. "Скрытые" свойства объектов.

    Если мы хотим добавить свойство в объект, который "принадлежит" другому скрипту или библиотеке, мы можем создать символ и использовать его в качестве ключа. Символьное свойство не появится в `for..in`, так что оно не будет нечаянно обработано вместе с другими. Также оно не будет модифицировано прямым обращением, так как другой скрипт не знает о нашем символе. Таким образом, свойство будет защищено от случайной перезаписи или использования.

    Так что, используя символьные свойства, мы можем спрятать что-то нужное нам, но что другие видеть не должны.

2. Существует множество системных символов, используемых внутри JavaScript, доступных как `Symbol.*`. Мы можем использовать их, чтобы изменять встроенное поведение ряда объектов. Например, в дальнейших главах мы будем использовать `Symbol.iterator` для [итераторов](info:iterable), `Symbol.toPrimitive` для настройки [преобразования объектов в примитивы](info:object-toprimitive) и так далее.

Технически символы скрыты не на 100%. Существует встроенный метод [Object.getOwnPropertySymbols(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)  -- с его помощью можно получить все свойства объекта с ключами-символами. Также существует метод [Reflect.ownKeys(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys), который возвращает *все* ключи объекта, включая символьные. Так что они не совсем спрятаны. Но большинство библиотек, встроенных методов и синтаксических конструкций не используют эти методы.
=======
- ...and so on.

For instance, `Symbol.toPrimitive` allows us to describe object to primitive conversion. We'll see its use very soon.

Other symbols will also become familiar when we study the corresponding language features.

## Summary

`Symbol` is a primitive type for unique identifiers.

Symbols are created with `Symbol()` call with an optional description (name).

Symbols are always different values, even if they have the same name. If we want same-named symbols to be equal, then we should use the global registry: `Symbol.for(key)` returns (creates if needed) a global symbol with `key` as the name. Multiple calls of `Symbol.for` with the same `key` return exactly the same symbol.

Symbols have two main use cases:

1. "Hidden" object properties.

    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.

    So we can "covertly" hide something into objects that we need, but others should not see, using symbolic properties.

2. There are many system symbols used by JavaScript which are accessible as `Symbol.*`. We can use them to alter some built-in behaviors. For instance, later in the tutorial we'll use `Symbol.iterator` for [iterables](info:iterable), `Symbol.toPrimitive` to setup [object-to-primitive conversion](info:object-toprimitive) and so on.

Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys of an object including symbolic ones. But most libraries, built-in functions and syntax constructs don't use these methods.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
