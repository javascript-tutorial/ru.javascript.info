
<<<<<<< HEAD
# Преобразование объектов в примитивы

Что произойдёт, если сложить два объекта `obj1 + obj2`, вычесть один из другого `obj1 - obj2` или вывести их на экран, воспользовавшись `alert(obj)`?

JavaScript совершенно не позволяет настраивать, как операторы работают с объектами. В отличие от некоторых других языков программирования, таких как Ruby или C++, мы не можем реализовать специальный объектный метод для обработки сложения (или других операторов).

В случае таких операций, объекты автоматически преобразуются в примитивы, затем выполняется сама операция над этими примитивами, и на выходе мы получим примитивное значение.

Это важное ограничение: результатом `obj1 + obj2` (или другой математической операции) не может быть другой объект!

К примеру, мы не можем создавать объекты, представляющие векторы или матрицы (или достижения или может ещё что-то), складывать их и ожидать в качестве результата "суммированный" объект. Такие архитектурные ходы автоматически оказываются "за бортом".

Итак, поскольку мы технически здесь мало что можем сделать, в реальных проектах нет математики с объектами. Если она всё же происходит, то за редким исключением, это из-за ошибок в коде.

В этой главе мы рассмотрим, как объект преобразуется в примитив и как это можно настроить.

У нас есть две цели:

1. Это позволит нам понять, что происходит в случае ошибок в коде, когда такая операция произошла случайно.
2. Есть исключения, когда такие операции возможны и вполне уместны. Например, вычитание или сравнение дат (`Date` объекты). Мы встретимся с ними позже.

## Правила преобразования

В главе <info:type-conversions> мы рассмотрели правила для числовых, строковых и логических преобразований примитивов. Но мы оставили пробел для объектов. Теперь, когда мы уже знаем о методах и символах, пришло время заполнить этот пробел.

1. Не существует преобразования к логическому значению. В логическом контексте все объекты являются `true`, всё просто. Существует лишь их числовое и строковое преобразование.
2. Числовое преобразование происходит, когда мы вычитаем объекты или применяем математические функции. Например, объекты `Date` (которые будут рассмотрены в главе <info:date>) могут быть вычтены, и результатом `date1 - date2` будет разница во времени между двумя датами.
3. Что касается преобразований к строке -- оно обычно происходит, когда мы выводим на экран объект при помощи `alert(obj)` и в подобных контекстах.

Мы можем реализовать свои преобразования к строкам и числам, используя специальные объектные методы.

Теперь давайте углубимся в детали. Это единственный путь для того, чтобы разобраться в нюансах этой темы.

## Хинты

Как JavaScript решает, какое преобразование применить?

Существует три варианта преобразования типов, которые происходят в различных ситуациях. Они называются "хинтами", как описано в [спецификации](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string"`
: Для преобразования объекта к строке, когда мы выполняем операцию над объектом, которая ожидает строку, например `alert`:

    ```js
    // вывод
    alert(obj);

    // используем объект в качестве ключа
=======
# Object to primitive conversion

What happens when objects are added `obj1 + obj2`, subtracted `obj1 - obj2` or printed using `alert(obj)`?

JavaScript doesn't allow you to customize how operators work on objects. Unlike some other programming languages, such as Ruby or C++, we can't implement a special object method to handle addition (or other operators).

In case of such operations, objects are auto-converted to primitives, and then the operation is carried out over these primitives and results in a primitive value.

That's an important limitation: the result of `obj1 + obj2` (or another math operation) can't be another object!

E.g. we can't make objects representing vectors or matrices (or achievements or whatever), add them and expect a "summed" object as the result. Such architectural feats are automatically "off the board".

So, because we can't technically do much here, there's no maths with objects in real projects. When it happens, with rare exceptions, it's because of a coding mistake.

In this chapter we'll cover how an object converts to primitive and how to customize it.

We have two purposes:

1. It will allow us to understand what's going on in case of coding mistakes, when such an operation happened accidentally.
2. There are exceptions, where such operations are possible and look good. E.g. subtracting or comparing dates (`Date` objects). We'll come across them later.

## Conversion rules

In the chapter <info:type-conversions> we've seen the rules for numeric, string and boolean conversions of primitives. But we left a gap for objects. Now, as we know about methods and symbols it becomes possible to fill it.

1. There's no conversion to boolean. All objects are `true` in a boolean context, as simple as that. There exist only numeric and string conversions.
2. The numeric conversion happens when we subtract objects or apply mathematical functions. For instance, `Date` objects (to be covered in the chapter <info:date>) can be subtracted, and the result of `date1 - date2` is the time difference between two dates.
3. As for the string conversion -- it usually happens when we output an object with `alert(obj)` and in similar contexts.

We can implement string and numeric conversion by ourselves, using special object methods.

Now let's get into technical details, because it's the only way to cover the topic in-depth.

## Hints

How does JavaScript decide which conversion to apply?

There are three variants of type conversion, that happen in various situations. They're called "hints", as described in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string"`
: For an object-to-string conversion, when we're doing an operation on an object that expects a string, like `alert`:

    ```js
    // output
    alert(obj);

    // using object as a property key
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
    anotherObj[obj] = 123;
    ```

`"number"`
<<<<<<< HEAD
: Для преобразования объекта к числу, в случае математических операций:

    ```js
    // явное преобразование
    let num = Number(obj);

    // математические (не считая бинарного плюса)
    let n = +obj; // унарный плюс
    let delta = date1 - date2;

    // сравнения больше/меньше
    let greater = user1 > user2;
    ```

    Большинство встроенных математических функций также включают в себя такое преобразование.

`"default"`
: Происходит редко, когда оператор "не уверен", какой тип ожидать.

    Например, бинарный плюс `+` может работать как со строками (объединяя их в одну), так и с числами (складывая их). Поэтому, если бинарный плюс получает объект в качестве аргумента, он использует хинт `"default"` для его преобразования.

    Также, если объект сравнивается с помощью `==` со строкой, числом или символом, тоже неясно, какое преобразование следует выполнить, поэтому используется хинт `"default"`.

    ```js
    // бинарный плюс использует хинт "default"
    let total = obj1 + obj2;

    // obj == number использует хинт "default"
    if (user == 1) { ... };
    ```

    Операторы сравнения больше/меньше, такие как `<` `>`, также могут работать как со строками, так и с числами. Тем не менее, по историческим причинам, они используют хинт `"number"`, а не `"default"`.

Впрочем на практике, всё немного проще.

Все встроенные объекты, за исключением одного (объект `Date`, который мы рассмотрим позже), реализуют `"default"` преобразование тем же способом, что и `"number"`. И нам следует поступать так же.

**Чтобы выполнить преобразование, JavaScript пытается найти и вызвать три следующих  метода объекта:**

1. Вызвать `obj[Symbol.toPrimitive](hint)` - метод с символьным ключом `Symbol.toPrimitive` (системный символ), если такой метод существует,
2. Иначе, если хинт равен `"string"`
    - попробовать вызвать `obj.toString()` или `obj.valueOf()`, смотря какой из них существует.
3. Иначе, если хинт равен `"number"` или `"default"`
    - попробовать вызвать `obj.valueOf()` или `obj.toString()`, смотря какой из них существует.

## Symbol.toPrimitive

Давайте начнём с первого метода. Есть встроенный символ с именем `Symbol.toPrimitive`, который следует использовать для обозначения метода преобразования, вот так:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // вот код для преобразования этого объекта в примитив
  // он должен вернуть примитивное значение
  // hint = чему-то из "string", "number", "default"
};
```

Если метод `Symbol.toPrimitive` существует, он используется для всех хинтов, и больше никаких методов не требуется.

Например, здесь объект `user` реализует его:
=======
: For an object-to-number conversion, like when we're doing maths:

    ```js
    // explicit conversion
    let num = Number(obj);

    // maths (except binary plus)
    let n = +obj; // unary plus
    let delta = date1 - date2;

    // less/greater comparison
    let greater = user1 > user2;
    ```

    Most built-in mathematical functions also include such conversion.

`"default"`
: Occurs in rare cases when the operator is "not sure" what type to expect.

    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them). So if a binary plus gets an object as an argument, it uses the `"default"` hint to convert it.

    Also, if an object is compared using `==` with a string, number or a symbol, it's also unclear which conversion should be done, so the `"default"` hint is used.

    ```js
    // binary plus uses the "default" hint
    let total = obj1 + obj2;

    // obj == number uses the "default" hint
    if (user == 1) { ... };
    ```

    The greater and less comparison operators, such as `<` `>`, can work with both strings and numbers too. Still, they use the `"number"` hint, not `"default"`. That's for historical reasons.

In practice though, things are a bit simpler.

All built-in objects except for one case (`Date` object, we'll learn it later) implement `"default"` conversion the same way as `"number"`. And we probably should do the same.

Still, it's important to know about all 3 hints, soon we'll see why.

**To do the conversion, JavaScript tries to find and call three object methods:**

1. Call `obj[Symbol.toPrimitive](hint)` - the method with the symbolic key `Symbol.toPrimitive` (system symbol), if such method exists,
2. Otherwise if hint is `"string"`
    - try calling `obj.toString()` or `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try calling `obj.valueOf()` or `obj.toString()`, whatever exists.

## Symbol.toPrimitive

Let's start from the first method. There's a built-in symbol named `Symbol.toPrimitive` that should be used to name the conversion method, like this:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // here goes the code to convert this object to a primitive
  // it must return a primitive value
  // hint = one of "string", "number", "default"
};
```

If the method `Symbol.toPrimitive` exists, it's used for all hints, and no more methods are needed.

For instance, here `user` object implements it:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

<<<<<<< HEAD
// демонстрация результатов преобразований:
=======
// conversions demo:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

<<<<<<< HEAD
Как мы можем видеть из кода, `user` становится либо строкой со своим описанием, либо  суммой денег в зависимости от преобразования. Единый метод `user[Symbol.toPrimitive]` обрабатывает все случаи преобразования.


## toString/valueOf

Если нет `Symbol.toPrimitive`, тогда JavaScript пытается найти методы `toString` и `valueOf`:

- Для хинта `"string"`: вызвать метод `toString`, а если он не существует или возвращает объект вместо примитивного значения, то `valueOf` (таким образом, `toString` имеет приоритет при строковом преобразовании).
- Для других хинтов: вызвать метод `valueOf`, а если он не существует или возвращает объект вместо примитивного значения, то `toString` (таким образом, `valueOf` имеет приоритет для математических операций).

Методы `toString` и `valueOf` берут своё начало с древних времён. Это не символы (символов тогда ещё не было), а скорее просто "обычные" методы со строковыми именами. Они предоставляют альтернативный "старомодный" способ реализации преобразования.

Эти методы должны возвращать примитивное значение. Если `toString` или `valueOf` возвращает объект, то он игнорируется (так же, как если бы метода не было).

По умолчанию обычный объект имеет следующие методы `toString` и `valueOf`:

- Метод `toString` возвращает строку `"[object Object]"`.
- Метод `valueOf` возвращает сам объект.

Взгляните на пример:
=======
As we can see from the code, `user` becomes a self-descriptive string or a money amount, depending on the conversion. The single method `user[Symbol.toPrimitive]` handles all conversion cases.

## toString/valueOf

If there's no `Symbol.toPrimitive` then JavaScript tries to find methods `toString` and `valueOf`:

- For the `"string"` hint: call `toString` method, and if it doesn't exist or if it returns an object instead of a primitive value, then call `valueOf` (so `toString` has the priority for string conversions).
- For other hints: call `valueOf`, and if it doesn't exist or if it returns an object instead of a primitive value, then call `toString` (so `valueOf` has the priority for maths).

Methods `toString` and `valueOf` come from ancient times. They are not symbols (symbols did not exist that long ago), but rather "regular" string-named methods. They provide an alternative "old-style" way to implement the conversion.

These methods must return a primitive value. If `toString` or `valueOf` returns an object, then it's ignored (same as if there were no method).

By default, a plain object has following `toString` and `valueOf` methods:

- The `toString` method returns a string `"[object Object]"`.
- The `valueOf` method returns the object itself.

Here's the demo:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

<<<<<<< HEAD
Таким образом, если мы попытаемся использовать объект в качестве строки, как например в `alert` или вроде того, то по умолчанию мы увидим `[object Object]`.

Значение по умолчанию `valueOf` упоминается здесь только для полноты картины, чтобы избежать какой-либо путаницы. Как вы можете видеть, он возвращает сам объект и поэтому игнорируется. Не спрашивайте меня почему, это по историческим причинам. Так что мы можем предположить, что его не существует.

Давайте применим эти методы для настройки преобразования.

Для примера, используем их в реализации всё того же объекта `user`. Но уже используя комбинацию `toString` и `valueOf` вместо `Symbol.toPrimitive`:
=======
So if we try to use an object as a string, like in an `alert` or so, then by default we see `[object Object]`.

The default `valueOf` is mentioned here only for the sake of completeness, to avoid any confusion. As you can see, it returns the object itself, and so is ignored. Don't ask me why, that's for historical reasons. So we can assume it doesn't exist.

Let's implement these methods to customize the conversion.

For instance, here `user` does the same as above using a combination of `toString` and `valueOf` instead of `Symbol.toPrimitive`:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let user = {
  name: "John",
  money: 1000,

<<<<<<< HEAD
  // для хинта равного "string"
=======
  // for hint="string"
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
  toString() {
    return `{name: "${this.name}"}`;
  },

<<<<<<< HEAD
  // для хинта равного "number" или "default"
=======
  // for hint="number" or "default"
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

<<<<<<< HEAD
Как видим, получилось то же поведение, что и в предыдущем примере с `Symbol.toPrimitive`.

Довольно часто нам нужно единое "универсальное" место для обработки всех примитивных преобразований. В этом случае мы можем реализовать только `toString`:
=======
As we can see, the behavior is the same as the previous example with `Symbol.toPrimitive`.

Often we want a single "catch-all" place to handle all primitive conversions. In this case, we can implement `toString` only, like this:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

<<<<<<< HEAD
В отсутствие `Symbol.toPrimitive` и `valueOf`, `toString` обработает все примитивные преобразования.

### Преобразование может вернуть любой примитивный тип

Важная вещь, которую следует знать обо всех методах преобразования примитивов, заключается в том, что они не обязательно возвращают подсказанный хинтом примитив.

Нет никакого контроля над тем, вернёт ли `toString` именно строку, или чтобы метод `Symbol.toPrimitive` возвращал именно число для хинта `"number"`.

Единственное обязательное условие: эти методы должны возвращать примитив, а не объект.

```smart header="Историческая справка"
По историческим причинам, если `toString` или `valueOf` вернёт объект, то ошибки не будет, но такое значение будет проигнорировано (как если бы метода вообще не существовало). Это всё потому, что в древние времена в JavaScript не было хорошей концепции "ошибки".

А вот `Symbol.toPrimitive` уже "четче", этот метод *обязан* возвращать примитив, иначе будет ошибка.
```

## Дальнейшие преобразования

Как мы уже знаем, многие операторы и функции выполняют преобразования типов, например, умножение `*` преобразует операнды в числа.

Если мы передаём объект в качестве аргумента, то в вычислениях будут две стадии:
1. Объект преобразуется в примитив (с использованием правил, описанных выше).
2. Если необходимо для дальнейших вычислений, этот примитив преобразуется дальше.

Например:

```js run
let obj = {
  // toString обрабатывает все преобразования в случае отсутствия других методов
=======
In the absence of `Symbol.toPrimitive` and `valueOf`, `toString` will handle all primitive conversions.

### A conversion can return any primitive type

The important thing to know about all primitive-conversion methods is that they do not necessarily return the "hinted" primitive.

There is no control whether `toString` returns exactly a string, or whether `Symbol.toPrimitive` method returns a number for the hint `"number"`.

The only mandatory thing: these methods must return a primitive, not an object.

```smart header="Historical notes"
For historical reasons, if `toString` or `valueOf` returns an object, there's no error, but such value is ignored (like if the method didn't exist). That's because in ancient times there was no good "error" concept in JavaScript.

In contrast, `Symbol.toPrimitive` is stricter, it *must* return a primitive, otherwise there will be an error.
```

## Further conversions

As we know already, many operators and functions perform type conversions, e.g. multiplication `*` converts operands to numbers.

If we pass an object as an argument, then there are two stages of calculations:
1. The object is converted to a primitive (using the rules described above).
2. If necessary for further calculations, the resulting primitive is also converted.

For instance:

```js run
let obj = {
  // toString handles all conversions in the absence of other methods
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
  toString() {
    return "2";
  }
};

<<<<<<< HEAD
alert(obj * 2); // 4, объект был преобразован к примитиву "2", затем умножение сделало его числом
```

1. Умножение `obj * 2` сначала преобразует объект в примитив (это строка `"2"`).
2. Затем `"2" * 2` становится `2 * 2` (строка преобразуется в число).

А вот, к примеру, бинарный плюс в подобной ситуации соединил бы строки, так как он совсем не брезгует строк:
=======
alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
```

1. The multiplication `obj * 2` first converts the object to primitive (that's a string `"2"`).
2. Then `"2" * 2` becomes `2 * 2` (the string is converted to number).

Binary plus will concatenate strings in the same situation, as it gladly accepts a string:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let obj = {
  toString() {
    return "2";
  }
};

<<<<<<< HEAD
alert(obj + 2); // "22" ("2" + 2), преобразование к примитиву вернуло строку => конкатенация
```

## Итого

Преобразование объекта в примитив вызывается автоматически многими встроенными функциями и операторами, которые ожидают примитив в качестве значения.

Существует всего 3 типа (хинта) для этого:
- `"string"` (для `alert` и других операций, которым нужна строка)
- `"number"` (для математических операций)
- `"default"` (для некоторых других операторов, обычно объекты реализуют его как `"number"`)

Спецификация явно описывает для каждого оператора, какой ему следует использовать хинт.

Алгоритм преобразования таков:

1. Сначала вызывается метод `obj[Symbol.toPrimitive](hint)`, если он существует,
2. В случае, если хинт равен `"string"`
    - происходит попытка вызвать `obj.toString()` и `obj.valueOf()`, смотря что есть.
3. В случае, если хинт равен `"number"` или `"default"`
    - происходит попытка вызвать `obj.valueOf()` и `obj.toString()`, смотря что есть.

Все эти методы должны возвращать примитив (если определены).

На практике часто бывает достаточно реализовать только `obj.toString()` в качестве универсального метода для преобразований к строке, который должен возвращать удобочитаемое представление объекта для целей логирования или отладки.
=======
alert(obj + 2); // "22" ("2" + 2), conversion to primitive returned a string => concatenation
```

## Summary

The object-to-primitive conversion is called automatically by many built-in functions and operators that expect a primitive as a value.

There are 3 types (hints) of it:
- `"string"` (for `alert` and other operations that need a string)
- `"number"` (for maths)
- `"default"` (few operators, usually objects implement it the same way as `"number"`)

The specification describes explicitly which operator uses which hint.

The conversion algorithm is:

1. Call `obj[Symbol.toPrimitive](hint)` if the method exists,
2. Otherwise if hint is `"string"`
    - try calling `obj.toString()` or `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try calling `obj.valueOf()` or `obj.toString()`, whatever exists.

All these methods must return a primitive to work (if defined).

In practice, it's often enough to implement only `obj.toString()` as a "catch-all" method for string conversions that should return a "human-readable" representation of an object, for logging or debugging purposes.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
