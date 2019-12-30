
# Преобразование объектов в примитивы

Что произойдёт, если сложить два объекта `obj1 + obj2`, вычесть один из другого `obj1 - obj2` или вывести их на экран, воспользовавшись `alert(obj)`?

В этом случае объекты сначала автоматически преобразуются в примитивы, а затем выполняется операция.

В главе <info:type-conversions> мы видели правила для численных, строковых и логических преобразований. Но обделили вниманием объекты. Теперь, поскольку мы уже знаем о методах объектов и символах, можно исправить это упущение.

1. Все объекты в логическом контексте являются `true`. Существуют лишь их численные и строковые преобразования.
2. Численные преобразования происходят, когда мы вычитаем объекты или выполняем математические операции. Например, объекты `Date` (мы рассмотрим их в статье <info:date>) могут вычитаться, и результатом `date1 - date2` будет временной отрезок между двумя датами.
3. Что касается строковых преобразований -- они обычно происходят, когда мы выводим объект `alert(obj)`, а также в других случаях, когда объект используется как строка.

## Преобразование к примитивам

Мы можем тонко настраивать строковые и численные преобразования, используя специальные методы объекта.

Существуют три варианта преобразований ("три хинта"), описанные в [спецификации](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string"`
: Для преобразования объекта к строке, когда операция ожидает получить строку, например `alert`:

    ```js
    // вывод
    alert(obj);

    // используем объект в качестве имени свойства
    anotherObj[obj] = 123;
    ```

`"number"`
: Для преобразования объекта к числу, в случае математических операций:

    ```js
    // явное преобразование
    let num = Number(obj);

    // математическое (исключая бинарный оператор "+")
    let n = +obj; // унарный плюс
    let delta = date1 - date2;

    // сравнения больше/меньше
    let greater = user1 > user2;
    ```

`"default"`
: Происходит редко, когда оператор "не уверен", какой тип ожидать.

<<<<<<< HEAD
    Например, бинарный плюс `+` может работать с обоими типами: строками (объединять их) и числами (складывать). Таким образом, и те, и другие будут вычисляться. Или когда происходит сравнение объектов с помощью нестрогого равенства `==` со строкой, числом или символом, и неясно, какое преобразование должно быть выполнено.

    ```js
    // бинарный плюс
    let total = car1 + car2;
=======
    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them), so both strings and numbers would do. So if the a binary plus gets an object as an argument, it uses the `"default"` hint to convert it.

    Also, if an object is compared using `==` with a string, number or a symbol, it's also unclear which conversion should be done, so the `"default"` hint is used.

    ```js
    // binary plus uses the "default" hint
    let total = obj1 + obj2;
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

    // obj == number uses the "default" hint
    if (user == 1) { ... };
    ```

<<<<<<< HEAD
    Оператор больше/меньше `<>` также может работать как со строками, так и с числами. Однако, по историческим причинам он использует хинт "number", а не "default".

    На практике все встроенные объекты, исключая `Date` (мы познакомимся с ним чуть позже), реализуют `"default"` преобразования тем же способом, что и `"number"`. И нам следует поступать также.

Обратите внимание, что существуют лишь три варианта хинтов. Всё настолько просто. Не существует хинта со значением "boolean" (все объекты являются `true` в логическом контексте) или каких-либо ещё. И если мы считаем `"default"` и `"number"` одинаковыми, как большинство встроенных объектов, то остаются всего два варианта преобразований.
=======
    The greater and less comparison operators, such as `<` `>`, can work with both strings and numbers too. Still, they use the `"number"` hint, not `"default"`. That's for historical reasons.

    In practice though, we don't need to remember these peculiar details, because all built-in objects except for one case (`Date` object, we'll learn it later) implement `"default"` conversion the same way as `"number"`. And we can do the same.

```smart header="No `\"boolean\"` hint"
Please note -- there are only three hints. It's that simple.

There is no "boolean" hint (all objects are `true` in boolean context) or anything else. And if we treat `"default"` and `"number"` the same, like most built-ins do, then there are only two conversions.
```
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

**В процессе преобразования движок JavaScript пытается найти и вызвать три следующих метода объекта:**

1. Вызывает `obj[Symbol.toPrimitive](hint)` - метод с символьным ключом `Symbol.toPrimitive` (системный символ), если такой метод существует, и передаёт ему хинт.
2. Иначе, если хинт равен `"string"`
    - пытается вызвать `obj.toString()`, а если его нет, то `obj.valueOf()`, если он существует.
3. В случае, если хинт равен `"number"` или `"default"`
    - пытается вызвать `obj.valueOf()`, а если его нет, то `obj.toString()`, если он существует.

## Symbol.toPrimitive

Начнём с универсального подхода - символа `Symbol.toPrimitive`: метод с таким названием (если есть) используется для всех преобразований:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // должен вернуть примитивное значение
  // hint равно чему-то одному из: "string", "number" или "default"
};
```

Для примера используем его в реализации объекта `user`:

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// демонстрация результатов преобразований:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

Как мы видим из кода, `user` преобразовывается либо в информативную читаемую строку, либо в денежный счёт в зависимости от значения хинта. Единственный метод `user[Symbol.toPrimitive]` смог обработать все случаи преобразований.


## Методы toString/valueOf

Методы `toString` и `valueOf` берут своё начало с древних времён. Они не символы, так как в то время символов ещё не существовало, а просто обычные методы объектов со строковыми именами. Они предоставляют "устаревший" способ реализации преобразований объектов.

Если нет метода `Symbol.toPrimitive`, движок JavaScript пытается найти эти методы и вызвать их следующим образом:

- `toString -> valueOf` для хинта со значением "string".
- `valueOf -> toString` -- в ином случае.

<<<<<<< HEAD
Для примера, используем их в реализации всё того же объекта `user`. Воспроизведём его поведение комбинацией методов `toString` и `valueOf`:
=======
These methods must return a primitive value. If `toString` or `valueOf` returns an object, then it's ignored (same as if there were no method).

By default, a plain object has following `toString` and `valueOf` methods:

- The `toString` method returns a string `"[object Object]"`.
- The `valueOf` method returns the object itself.

Here's the demo:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

So if we try to use an object as a string, like in an `alert` or so, then by default we see `[object Object]`.

And the default `valueOf` is mentioned here only for the sake of completeness, to avoid any confusion. As you can see, it returns the object itself, and so is ignored. Don't ask me why, that's for historical reasons. So we can assume it doesn't exist.

Let's implement these methods.

For instance, here `user` does the same as above using a combination of `toString` and `valueOf` instead of `Symbol.toPrimitive`:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
let user = {
  name: "John",
  money: 1000,

  // для хинта равного "string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // для хинта равного "number" или "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

Как видим, получилось то же поведение, что и в предыдущем примере с `Symbol.toPrimitive`.

Довольно часто мы хотим описать одно "универсальное" преобразование объекта к примитиву для всех ситуаций. Для этого достаточно создать один `toString`:

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

В отсутствие `Symbol.toPrimitive` и `valueOf`, `toString` обработает все случаи преобразований к примитивам.


## Возвращаемые типы

<<<<<<< HEAD
Важно понимать, что все описанные методы для преобразований объектов не обязаны возвращать именно требуемый "хинтом" тип примитива.
=======
There is no control whether `toString` returns exactly a string, or whether `Symbol.toPrimitive` method returns a number for a hint `"number"`.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

Нет обязательного требования, чтобы `toString()` возвращал именно строку, или чтобы метод `Symbol.toPrimitive` возвращал именно число для хинта "number".

**Единственное обязательное требование: методы должны возвращать примитив, а не объект.**

```smart header="Историческая справка"
По историческим причинам, если `toString` или `valueOf` вернёт объект, то ошибки не будет, но такое значение будет проигнорировано (как если бы метода вообще не существовало).

Метод `Symbol.toPrimitive`, напротив, *обязан* возвращать примитив, иначе будет ошибка.
```

<<<<<<< HEAD
## Последующие операции

Операция, инициировавшая преобразование, получает примитив и затем продолжает работу с ним, производя дальнейшие преобразования, если это необходимо.
=======
## Further conversions

As we know already, many operators and functions perform type conversions, e.g. multiplication `*` converts operands to numbers.

If we pass an object as an argument, then there are two stages:
1. The object is converted to a primitive (using the rules described above).
2. If the resulting primitive isn't of the right type, it's converted.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

Например:

<<<<<<< HEAD
- Математические операции, исключая бинарный плюс, преобразуют примитив к числу:

    ```js run
    let obj = {
      // toString обрабатывает все преобразования в случае отсутствия других методов
      toString() {
        return "2";
      }
    };

    alert(obj * 2); // 4, объект был преобразован к примитиву "2", затем умножение сделало его числом
    ```

- Бинарный плюс `+` в аналогичном случае сложит строки:

    ```js run
    let obj = {
      toString() {
        return "2";
      }
    };

    alert(obj + 2); // 22 (преобразование к примитиву вернуло строку => конкатенация)
    ```
=======
```js run
let obj = {
  // toString handles all conversions in the absence of other methods
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
```

1. The multiplication `obj * 2` first converts the object to primitive (that's a string `"2"`).
2. Then `"2" * 2` becomes `2 * 2` (the string is converted to number).

Binary plus will concatenate strings in the same situation, as it gladly accepts a string:

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22 ("2" + 2), conversion to primitive returned a string => concatenation
```
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

## Итого

Преобразование объектов в примитивы вызывается автоматически многими встроенными функциями и операторами, которые ожидают примитив в качестве аргумента.

Существует всего 3 типа преобразований (хинтов):
- `"string"` (для `alert` и других операций, которым нужна строка)
- `"number"` (для математических операций)
- `"default"` (для некоторых операций)

В спецификации явно указано, какой хинт должен использовать каждый оператор. И существует совсем немного операторов, которые не знают, что ожидать, и используют хинт со значением `"default"`. Обычно для встроенных объектов хинт `"default"` обрабатывается так же, как `"number"`. Таким образом, последние два очень часто объединяют вместе.

Алгоритм преобразований к примитивам следующий:

1. Сначала вызывается метод `obj[Symbol.toPrimitive](hint)`, если он существует.
2. Иначе, если хинт равен `"string"`
    - происходит попытка вызвать `obj.toString()`, затем `obj.valueOf()`, смотря что есть.
3. Иначе, если хинт равен `"number"` или `"default"`
    - происходит попытка вызвать `obj.valueOf()`, затем `obj.toString()`, смотря что есть.

На практике довольно часто достаточно реализовать только `obj.toString()` как "универсальный" метод для всех типов преобразований, возвращающий "читаемое" представление объекта, достаточное для логирования или отладки.
