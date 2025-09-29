
# Деструктурирующее присваивание

<<<<<<< HEAD
В JavaScript есть две чаще всего используемые структуры данных - это `Object` и `Array`.

- Объекты позволяют нам создавать одну сущность, которая хранит элементы данных по ключам.
- Массивы позволяют нам собирать элементы данных в упорядоченный список.

Но когда мы передаём их в функцию, то ей может понадобиться не объект/массив целиком, а элементы по отдельности.
=======
- Objects allow us to create a single entity that stores data items by key.
- Arrays allow us to gather data items into an ordered list.

However, when we pass these to a function, we may not need all of it. The function might only require certain elements or properties.

*Destructuring assignment* is a special syntax that allows us to "unpack" arrays or objects into a bunch of variables, as sometimes that's more convenient.

Destructuring also works well with complex functions that have a lot of parameters, default values, and so on. Soon we'll see that.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

*Деструктурирующее присваивание* -- это специальный синтаксис, который позволяет нам "распаковать" массивы или объекты в несколько переменных, так как иногда они более удобны.

<<<<<<< HEAD
Деструктуризация также прекрасно работает со сложными функциями, которые имеют много параметров, значений по умолчанию и так далее. Скоро мы увидим это.

## Деструктуризация массива

Вот пример деструктуризации массива на переменные:

```js
// у нас есть массив с именем и фамилией
let arr = ["Ilya", "Kantor"];
=======
Here's an example of how an array is destructured into variables:

```js
// we have an array with a name and surname
let arr = ["John", "Smith"]
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

*!*
// деструктурирующее присваивание
// записывает firstName = arr[0]
// и surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // John
alert(surname);  // Smith
```

Теперь мы можем использовать переменные вместо элементов массива.

Отлично смотрится в сочетании со `split` или другими методами, возвращающими массив:

<<<<<<< HEAD
```js
let [firstName, surname] = "Ilya Kantor".split(' ');
alert(firstName); // Ilya
alert(surname);  // Kantor
```

Как вы можете видеть, синтаксис прост. Однако есть несколько странных моментов. Давайте посмотрим больше примеров, чтобы лучше понять это.

````smart header="\"Деструктуризация\" не означает \"разрушение\"."
"Деструктурирующее присваивание" не уничтожает массив. Оно вообще ничего не делает с правой частью присваивания, его задача - только скопировать нужные значения в переменные.

Это просто короткий вариант записи:
=======
```js run
let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith
```

As you can see, the syntax is simple. There are several peculiar details though. Let's see more examples to understand it better.

````smart header="\"Destructuring\" does not mean \"destructive\"."
It's called "destructuring assignment," because it "destructurizes" by copying items into variables. However, the array itself is not modified.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="Пропускайте элементы, используя запятые"
Нежелательные элементы массива также могут быть отброшены с помощью дополнительной запятой:

```js run
*!*
// второй элемент не нужен
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Consul
```

<<<<<<< HEAD
В примере выше второй элемент массива пропускается, а третий присваивается переменной `title`, оставшиеся элементы массива также пропускаются (так как для них нет переменных).
=======
In the code above, the second element of the array is skipped, the third one is assigned to `title`, and the rest of the array items are also skipped (as there are no variables for them).
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
````

````smart header="Работает с любым перебираемым объектом с правой стороны"
...На самом деле мы можем использовать любой перебираемый объект, не только массивы:

```js
let [a, b, c] = "abc";
let [one, two, three] = new Set([1, 2, 3]);
```
<<<<<<< HEAD
````


````smart header="Присваивайте чему угодно с левой стороны"
Мы можем использовать что угодно "присваивающее" с левой стороны.

Например, можно присвоить свойству объекта:
=======
That works, because internally a destructuring assignment works by iterating over the right value. It's a kind of syntax sugar for calling `for..of` over the value to the right of `=` and assigning the values.
````


````smart header="Assign to anything at the left-side"
We can use any "assignables" on the left side.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

<<<<<<< HEAD
alert(user.name); // Ilya
alert(user.surname); // Kantor
=======
alert(user.name); // John
alert(user.surname); // Smith
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
```
````

<<<<<<< HEAD
````smart header="Цикл с .entries()"
В предыдущей главе мы видели метод [Object.entries(obj)](mdn:js/Object/entries).

Мы можем использовать его с деструктуризацией для цикличного перебора ключей и значений объекта:
=======
````smart header="Looping with .entries()"
In the previous chapter, we saw the [Object.entries(obj)](mdn:js/Object/entries) method.

We can use it with destructuring to loop over the keys-and-values of an object:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let user = {
  name: "John",
  age: 30
};

<<<<<<< HEAD
// цикл по ключам и значениям
=======
// loop over the keys-and-values
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, затем age:30
}
```

<<<<<<< HEAD
...то же самое для map:
=======
The similar code for a `Map` is simpler, as it's iterable:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
<<<<<<< HEAD
// Map перебирает как пары [ключ, значение], что очень удобно для деструктурирования
=======
// Map iterates as [key, value] pairs, very convenient for destructuring
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, затем age:30
}
```
````
<<<<<<< HEAD

````smart header="Трюк обмена переменных"
Существует хорошо известный трюк для обмена значений двух переменных с использованием деструктурирующего присваивания:

```js run
let guest = "Jane";
let admin = "Pete";

// Давайте поменяем местами значения: сделаем guest = "Pete", а admin = "Jane"
*!*
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane (успешно заменено!)
```

Здесь мы создаём временный массив из двух переменных и немедленно деструктурируем его в порядке замены.

Таким образом, мы можем поменять местами даже более двух переменных.
````

### Остаточные параметры "..."

Обычно, если массив длиннее, чем список слева, "лишние" элементы опускаются.

Например, здесь берутся только первые два элемента, а остальные просто игнорируются:
=======

````smart header="Swap variables trick"
There's a well-known trick for swapping values of two variables using a destructuring assignment:

```js run
let guest = "Jane";
let admin = "Pete";

// Let's swap the values: make guest=Pete, admin=Jane
*!*
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane (successfully swapped!)
```

Here we create a temporary array of two variables and immediately destructure it in swapped order.

We can swap more than two variables this way.
````

### The rest '...'

Usually, if the array is longer than the list at the left, the "extra" items are omitted.

For example, here only two items are taken, and the rest is just ignored:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
<<<<<<< HEAD
// Дальнейшие элементы нигде не присваиваются
```

Если мы хотим не просто получить первые значения, но и собрать все остальные, то мы можем добавить ещё один параметр, который получает остальные значения, используя оператор "остаточные параметры" -- троеточие (`"..."`):
=======
// Further items aren't assigned anywhere
```

If we'd like also to gather all that follows -- we can add one more parameter that gets "the rest" using three dots `"..."`:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

*!*
<<<<<<< HEAD
// rest это массив элементов, начиная с 3-го
=======
// rest is an array of items, starting from the 3rd one
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

<<<<<<< HEAD
Переменная `rest` является массивом из оставшихся элементов.
=======
The value of `rest` is the array of the remaining array elements.

We can use any other variable name in place of `rest`, just make sure it has three dots before it and goes last in the destructuring assignment.

```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// now titles = ["Consul", "of the Roman Republic"]
```
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Вместо `rest` можно использовать любое другое название переменной, просто убедитесь, что перед переменной есть три точки и она стоит на последнем месте в деструктурирующем присваивании.

<<<<<<< HEAD
```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// теперь titles = ["Consul", "of the Roman Republic"]
```

### Значения по умолчанию

Если в массиве меньше значений, чем в присваивании, то ошибки не будет. Отсутствующие значения считаются неопределёнными:
=======
If the array is shorter than the list of variables on the left, there will be no errors. Absent values are considered undefined:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

Если мы хотим, чтобы значение "по умолчанию" заменило отсутствующее, мы можем указать его с помощью `=`:

```js run
*!*
// значения по умолчанию
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (из массива)
alert(surname); // Anonymous (значение по умолчанию)
```

Значения по умолчанию могут быть гораздо более сложными выражениями или даже функциями. Они выполняются, только если значения отсутствуют.

<<<<<<< HEAD
Например, здесь мы используем функцию `prompt` для указания двух значений по умолчанию.
=======
For instance, here we use the `prompt` function for two defaults:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
// prompt запустится только для surname
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (из массива)
alert(surname); // результат prompt
```

<<<<<<< HEAD
Обратите внимание, `prompt` будет запущен только для пропущенного значения (`surname`).

## Деструктуризация объекта
=======
Please note: the `prompt` will run only for the missing value (`surname`).
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Деструктурирующее присваивание также работает с объектами.

Синтаксис:

```js
let {var1, var2} = {var1:…, var2:…}
```

<<<<<<< HEAD
У нас есть существующий объект с правой стороны, который мы хотим разделить на переменные. Левая сторона содержит "шаблон" для соответствующих свойств. В простом случае это список названий переменных в `{...}`.
=======
We should have an existing object on the right side, that we want to split into variables. The left side contains an object-like "pattern" for corresponding properties. In the simplest case, that's a list of variable names in `{...}`.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Например:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

<<<<<<< HEAD
Свойства `options.title`, `options.width` и `options.height` присваиваются соответствующим переменным. 

Порядок не имеет значения. Вот так - тоже работает:
=======
Properties `options.title`, `options.width` and `options.height` are assigned to the corresponding variables.

The order does not matter. This works too:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
// изменён порядок в let {...}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

Шаблон с левой стороны может быть более сложным и определять соответствие между свойствами и переменными.

<<<<<<< HEAD
Если мы хотим присвоить свойство объекта переменной с другим названием, например, свойство `options.width` присвоить переменной `w`, то мы можем использовать двоеточие:
=======
If we want to assign a property to a variable with another name, for instance, make `options.width` go into the variable named `w`, then we can set the variable name using a colon:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

Двоеточие показывает "что : куда идёт". В примере выше свойство `width` сохраняется в переменную `w`, свойство `height` сохраняется в `h`, а `title` присваивается одноимённой переменной.

Для потенциально отсутствующих свойств мы можем установить значения по умолчанию, используя `"="`, как здесь:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

Как и в случае с массивами, значениями по умолчанию могут быть любые выражения или даже функции. Они выполнятся, если значения отсутствуют.

В коде ниже `prompt` запросит `width`, но не `title`:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (результат prompt)
```

Мы также можем совмещать `:` и `=`:

```js run
let options = {
  title: "Menu"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

Если у нас есть большой объект с множеством свойств, можно взять только то, что нужно:

```js
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// взять только title, игнорировать остальное
let { title } = options;

alert(title); // Menu
```

### Остаток объекта "..."

Что если в объекте больше свойств, чем у нас переменных? Можем ли мы взять необходимые нам, а остальные присвоить куда-нибудь?

Можно использовать троеточие, как и для массивов. В некоторых старых браузерах (IE) это не поддерживается, используйте Babel для полифила.

Выглядит так:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = свойство с именем title
// rest = объект с остальными свойствами
let {title, ...rest} = options;
*/!*

// сейчас title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="Обратите внимание на `let`"
В примерах выше переменные были объявлены в присваивании: `let {…} = {…}`. Конечно, мы могли бы использовать существующие переменные и не указывать `let`, но тут есть подвох.

Вот так не будет работать:
```js run
let title, width, height;

// ошибка будет в этой строке
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

Проблема в том, что JavaScript обрабатывает `{...}` в основном потоке кода (не внутри другого выражения) как блок кода. Такие блоки кода могут быть использованы для группировки операторов, например:

```js run
{
  // блок кода
  let message = "Hello";
  // ...
  alert( message );
}
```

<<<<<<< HEAD
Так что здесь JavaScript считает, что видит блок кода, отсюда и ошибка. На самом-то деле у нас деструктуризация.
=======
So here JavaScript assumes that we have a code block, that's why there's an error. We want destructuring instead.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Чтобы показать JavaScript, что это не блок кода, мы можем заключить выражение в скобки `(...)`:

```js run
let title, width, height;

// сейчас всё работает
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

## Вложенная деструктуризация

<<<<<<< HEAD
Если объект или массив содержит другие вложенные объекты или массивы, то мы можем использовать более сложные шаблоны с левой стороны, чтобы извлечь более глубокие свойства.

В приведённом ниже коде `options` хранит другой объект в свойстве `size` и массив в свойстве `items`. Шаблон в левой части присваивания имеет такую же структуру, чтобы извлечь данные из них:
=======
If an object or an array contains other nested objects and arrays, we can use more complex left-side patterns to extract deeper portions.

In the code below `options` has another object in the property `size` and an array in the property `items`. The pattern on the left side of the assignment has the same structure to extract values from them:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
<<<<<<< HEAD
  extra: true    
=======
  extra: true
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
};

// деструктуризация разбита на несколько строк для ясности
let {
  size: { // положим size сюда
    width,
    height
  },
  items: [item1, item2], // добавим элементы к items
  title = "Menu" // отсутствует в объекте (используется значение по умолчанию)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

<<<<<<< HEAD
Весь объект `options`, кроме свойства `extra`, которое в левой части отсутствует, присваивается в соответствующие переменные:
=======
All properties of `options` object except `extra` which is absent in the left part, are assigned to corresponding variables:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

![](destructuring-complex.svg)

В итоге у нас есть `width`, `height`, `item1`, `item2` и `title` со значением по умолчанию.

Заметим, что переменные для `size` и `items` отсутствуют, так как мы взяли сразу их содержимое.

## Умные параметры функций

<<<<<<< HEAD
Есть ситуации, когда функция имеет много параметров, большинство из которых не обязательны. Это особенно верно для пользовательских интерфейсов. Представьте себе функцию, которая создаёт меню. Она может иметь ширину, высоту, заголовок, список элементов и так далее.

Вот так - плохой способ писать подобные функции:
=======
There are times when a function has many parameters, most of which are optional. That's especially true for user interfaces. Imagine a function that creates a menu. It may have a width, a height, a title, an item list and so on.

Here's a bad way to write such a function:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

<<<<<<< HEAD
В реальной жизни проблема заключается в том, как запомнить порядок всех аргументов. Обычно IDE пытаются помочь нам, особенно если код хорошо документирован, но всё же... Другая проблема заключается в том, как вызвать функцию, когда большинство параметров передавать не надо, и значения по умолчанию вполне подходят.
=======
In real-life, the problem is how to remember the order of arguments. Usually, IDEs try to help us, especially if the code is well-documented, but still... Another problem is how to call a function when most parameters are ok by default.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Разве что вот так?

```js
// undefined там, где подходят значения по умолчанию
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

Это выглядит ужасно. И становится нечитаемым, когда мы имеем дело с большим количеством параметров.

На помощь приходит деструктуризация!

Мы можем передать параметры как объект, и функция немедленно деструктурирует его в переменные:

```js run
// мы передаём объект в функцию
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...и она немедленно извлекает свойства в переменные
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – взято из options,
  // width, height – используются значения по умолчанию
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

Мы также можем использовать более сложное деструктурирование с вложенными объектами и двоеточием:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // width присваиваем в w
  height: h = 200, // height присваиваем в h
  items: [item1, item2] // первый элемент items присваивается в item1, второй в item2
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

Полный синтаксис - такой же, как для деструктурирующего присваивания:

```js
function showMenu({
  incomingProperty: varName = defaultValue
  ...
})
```

<<<<<<< HEAD
Тогда для объекта с параметрами будет создана переменная `varName` для свойства с именем `incomingProperty` по умолчанию равная `defaultValue`.
=======
Then, for an object of parameters, there will be a variable `varName` for the property `incomingProperty`, with `defaultValue` by default.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Пожалуйста, обратите внимание, что такое деструктурирование подразумевает, что в `showMenu()` будет обязательно передан аргумент. Если нам нужны все значения по умолчанию, то нам следует передать пустой объект:

```js
showMenu({}); // ок, все значения - по умолчанию

showMenu(); // так была бы ошибка
```

Мы можем исправить это, сделав `{}` значением по умолчанию для всего объекта параметров:

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

В приведённом выше коде весь объект аргументов по умолчанию равен `{}`, поэтому всегда есть что-то, что можно деструктурировать.

## Итого

<<<<<<< HEAD
- Деструктуризация позволяет разбивать объект или массив на переменные при присвоении.
- Полный синтаксис для объекта:

    ```js
    let {prop : varName = defaultValue, ...rest} = object
    ```
    
    Cвойство `prop` объекта `object` здесь должно быть присвоено переменной `varName`. Если в объекте отсутствует такое свойство, переменной `varName` присваивается значение по умолчанию.

    Свойства, которые не были упомянуты, копируются в объект `rest`.

- Полный синтаксис для массива:

    ```js
    let [item1 = defaultValue, item2, ...rest] = array
    ```

    Первый элемент отправляется в `item1`; второй отправляется в `item2`, все остальные элементы попадают в массив `rest`.
=======
- Destructuring assignment allows for instantly mapping an object or array onto many variables.
- The full object syntax:
    ```js
    let {prop : varName = defaultValue, ...rest} = object
    ```

    This means that property `prop` should go into the variable `varName` and, if no such property exists, then the `default` value should be used.

    Object properties that have no mapping are copied to the `rest` object.

- The full array syntax:

    ```js
    let [item1 = defaultValue, item2, ...rest] = array
    ```

    The first item goes to `item1`; the second goes into `item2`, and all the rest makes the array `rest`.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

- Можно извлекать данные из вложенных объектов и массивов, для этого левая сторона должна иметь ту же структуру, что и правая.
