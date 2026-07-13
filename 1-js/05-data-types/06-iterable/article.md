
# Перебираемые объекты

<<<<<<< HEAD
*Перебираемые* (или *итерируемые*) объекты - это обобщение массивов. Концепция, которая позволяет использовать любой объект в цикле `for..of`.
=======
*Iterable* objects are a generalization of arrays. That's a concept that allows us to make any object useable in a `for..of` loop.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

Конечно же, сами массивы являются перебираемыми объектами. Но есть и много других встроенных перебираемых объектов, например, строки.

Если объект не является массивом, но представляет собой коллекцию каких-то элементов (список, набор), то удобно использовать цикл `for..of` для их перебора, так что давайте посмотрим, как это сделать.

## Symbol.iterator

Мы легко поймём принцип устройства перебираемых объектов, создав один из них.

<<<<<<< HEAD
Например, у нас есть объект. Это не массив, но он выглядит подходящим для `for..of`.
=======
For instance, we have an object that is not an array, but looks suitable for `for..of`.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

Например, объект `range`, который представляет собой диапазон чисел:

```js
let range = {
  from: 1,
  to: 5
};

// Мы хотим, чтобы работал for..of:
// for(let num of range) ... num=1,2,3,4,5
```

<<<<<<< HEAD
Чтобы сделать `range` итерируемым (и позволить `for..of` работать с ним), нам нужно добавить в объект метод с именем `Symbol.iterator` (специальный встроенный `Symbol`, созданный как раз для этого).

1. Когда цикл `for..of` запускается, он вызывает этот метод один раз (или выдаёт ошибку, если метод не найден). Этот метод должен вернуть *итератор* -- объект с методом `next`.
2. Дальше `for..of` работает *только с этим возвращённым объектом*.
3. Когда `for..of` хочет получить следующее значение, он вызывает метод `next()` этого объекта.
4. Результат вызова `next()` должен иметь вид `{done: Boolean, value: any}`, где `done=true` означает, что цикл завершён, в противном случае `value` содержит очередное значение.
=======
To make the `range` object iterable (and thus let `for..of` work) we need to add a method to the object named `Symbol.iterator` (a special built-in symbol just for that).

1. When `for..of` starts, it calls that method once (or errors if not found). The method must return an *iterator* -- an object with the method `next`.
2. Onward, `for..of` works *only with that returned object*.
3. When `for..of` wants the next value, it calls `next()` on that object.
4. The result of `next()` must have the form `{done: Boolean, value: any}`, where `done=true` means that the loop is finished, otherwise `value` is the next value.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

Вот полная реализация `range` с пояснениями:

```js run
let range = {
  from: 1,
  to: 5
};

// 1. вызов for..of сначала вызывает эту функцию
range[Symbol.iterator] = function() {

<<<<<<< HEAD
  // ...она возвращает объект итератора:
  // 2. Далее, for..of работает только с этим итератором,
  // запрашивая у него новые значения
=======
  // ...it returns the iterator object:
  // 2. Onward, for..of works only with the iterator object below, asking it for next values
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
  return {
    current: this.from,
    last: this.to,

    // 3. next() вызывается на каждой итерации цикла for..of
    next() {
      // 4. он должен вернуть значение в виде объекта {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// теперь работает!
for (let num of range) {
  alert(num); // 1, затем 2, 3, 4, 5
}
```

Обратите внимание на ключевую особенность итераторов: разделение ответственности.

- У самого `range` нет метода `next()`.
- Вместо этого другой объект, так называемый "итератор", создаётся вызовом `range[Symbol.iterator]()`, и именно его `next()` генерирует значения.

Таким образом, объект итератор отделён от самого итерируемого объекта.

Технически мы можем объединить их и использовать сам `range` как итератор, чтобы упростить код.

Например, вот так:

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, затем 2, 3, 4, 5
}
```

Теперь `range[Symbol.iterator]()` возвращает сам объект `range`: у него есть необходимый метод `next()`, и он запоминает текущее состояние итерации в `this.current`. Короче? Да. И иногда такой способ тоже хорош.

Недостаток такого подхода в том, что теперь мы не можем использовать этот объект в двух параллельных циклах `for..of`: у них будет общее текущее состояние итерации, потому что теперь существует лишь один итератор -- сам объект. Но необходимость в двух циклах `for..of`, выполняемых одновременно, возникает редко, даже при наличии асинхронных операций.

```smart header="Бесконечные итераторы"
Можно сделать бесконечный итератор. Например, `range` будет бесконечным при `range.to = Infinity`. Или мы можем создать итерируемый объект, который генерирует бесконечную последовательность псевдослучайных чисел. Это бывает полезно.

Метод `next` не имеет ограничений, он может возвращать всё новые и новые значения, это нормально.

Конечно же, цикл `for..of` с таким итерируемым объектом будет бесконечным. Но мы всегда можем прервать его, используя `break`.
```

## Строка - перебираемый объект

Среди встроенных перебираемых объектов наиболее широко используются массивы и строки.

Для строки `for..of` перебирает символы:

```js run
for (let char of "test") {
  // срабатывает 4 раза: по одному для каждого символа
  alert( char ); // t, затем e, затем s, затем t
}
```

И он работает корректно даже с суррогатными парами!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, а затем 😂
}
```

## Явный вызов итератора

<<<<<<< HEAD
Чтобы понять устройство итераторов чуть глубже, давайте посмотрим, как их использовать явно.

Мы будем перебирать строку точно так же, как цикл `for..of`, но вручную, прямыми вызовами. Нижеприведённый код получает строковый итератор и берёт из него значения:
=======
For deeper understanding, let's see how to use an iterator explicitly.

We'll iterate over a string in exactly the same way as `for..of`, but with direct calls. This code creates a string iterator and gets values from it "manually":
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js run
let str = "Hello";

// делает то же самое, что и
// for (let char of str) alert(char);

*!*
let iterator = str[Symbol.iterator]();
*/!*

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // выводит символы один за другим
}
```

Такое редко бывает необходимо, но это даёт нам больше контроля над процессом, чем `for..of`. Например, мы можем разбить процесс итерации на части: перебрать немного элементов, затем остановиться, сделать что-то ещё и потом продолжить.

## Итерируемые объекты и псевдомассивы [#array-like]

<<<<<<< HEAD
Есть два официальных термина, которые очень похожи, но в то же время сильно различаются. Поэтому убедитесь, что вы как следует поняли их, чтобы избежать путаницы.
=======
Two official terms look similar, but are very different. Please make sure you understand them well to avoid the confusion.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

- *Итерируемые объекты* - это объекты, которые реализуют метод `Symbol.iterator`, как было описано выше.
- *Псевдомассивы* - это объекты, у которых есть индексы и свойство `length`, то есть, они выглядят как массивы.

<<<<<<< HEAD
При использовании JavaScript в браузере или других окружениях мы можем встретить объекты, которые являются итерируемыми или псевдомассивами, или и тем, и другим.
=======
When we use JavaScript for practical tasks in a browser or any other environment, we may meet objects that are iterables or array-likes, or both.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

Например, строки итерируемы (для них работает `for..of`) и являются псевдомассивами (они индексированы и есть `length`).

<<<<<<< HEAD
Но итерируемый объект может не быть псевдомассивом. И наоборот: псевдомассив может не быть итерируемым.
=======
But an iterable may not be array-like. And vice versa an array-like may not be iterable.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

Например, объект `range` из примера выше - итерируемый, но не является псевдомассивом, потому что у него нет индексированных свойств и `length`.

А вот объект, который является псевдомассивом, но его нельзя итерировать:

```js run
let arrayLike = { // есть индексы и свойство length => псевдомассив
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Ошибка (отсутствует Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

Что у них общего? И итерируемые объекты, и псевдомассивы - это обычно *не массивы*, у них нет методов `push`, `pop` и т.д. Довольно неудобно, если у нас есть такой объект и мы хотим работать с ним как с массивом. Например, мы хотели бы работать с `range`, используя методы массивов. Как этого достичь?

## Array.from

Есть универсальный метод [Array.from](mdn:js/Array/from), который принимает итерируемый объект или псевдомассив и делает из него "настоящий" `Array`. После этого мы уже можем использовать методы массивов.

Например:

```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // World (метод работает)
```

<<<<<<< HEAD
`Array.from` в строке `(*)` принимает объект, проверяет, является ли он итерируемым объектом или псевдомассивом, затем создаёт новый массив и копирует туда все элементы.
=======
`Array.from` at the line `(*)` takes the object, examines it for being an iterable or array-like, then makes a new array and copies all items to it.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

То же самое происходит с итерируемым объектом:

```js run
// range взят из примера в начале статьи

<<<<<<< HEAD
=======
```js run
// assuming that range is taken from the example above
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (преобразование массива через toString работает)
```

<<<<<<< HEAD
Полный синтаксис `Array.from` позволяет указать необязательную "трансформирующую" функцию:

=======
The full syntax for `Array.from` also allows us to provide an optional "mapping" function:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
```js
Array.from(obj[, mapFn, thisArg])
```

<<<<<<< HEAD
Необязательный второй аргумент может быть функцией, которая будет применена к каждому элементу перед добавлением в массив, а `thisArg` позволяет установить `this` для этой функции.
=======
The optional second argument `mapFn` can be a function that will be applied to each element before adding it to the array, and `thisArg` allows us to set `this` for it.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

Например:

```js run
<<<<<<< HEAD
// range взят из примера в начале статьи
=======
// assuming that range is taken from the example above
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

// возводим каждое число в квадрат
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

Здесь мы используем `Array.from`, чтобы превратить строку в массив её элементов:

```js run
let str = '𝒳😂';

// разбивает строку на массив её элементов
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

В отличие от `str.split`, этот метод в работе опирается на итерируемость строки, и поэтому, как и `for..of`, он корректно работает с суррогатными парами.

Технически это то же самое, что и:

```js run
let str = '𝒳😂';

let chars = []; // Array.from внутри себя выполняет тот же цикл
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

<<<<<<< HEAD
...Но гораздо короче.
=======
...But it is shorter.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

Мы можем даже создать `slice`, который поддерживает суррогатные пары:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// а вот встроенный метод не поддерживает суррогатные пары
alert( str.slice(1, 3) ); // мусор (две части различных суррогатных пар)
```

## Итого

Объекты, которые можно использовать в цикле `for..of`, называются *итерируемыми*.

<<<<<<< HEAD
- Технически итерируемые объекты должны иметь метод `Symbol.iterator`.
    - Результат вызова `obj[Symbol.iterator]` называется *итератором*. Он управляет процессом итерации.
    - Итератор должен иметь метод `next()`, который возвращает объект `{done: Boolean, value: any}`, где `done:true` сигнализирует об окончании процесса итерации, в противном случае `value` - следующее значение.
- Метод `Symbol.iterator` автоматически вызывается циклом `for..of`, но можно вызвать его и напрямую.
- Встроенные итерируемые объекты, такие как строки или массивы, также реализуют метод `Symbol.iterator`.
- Строковый итератор знает про суррогатные пары.
=======
Objects that can be used in `for..of` are called *iterable*.

- Technically, iterables must implement the method named `Symbol.iterator`.
    - The result of `obj[Symbol.iterator]()` is called an *iterator*. It handles further iteration process.
    - An iterator must have the method named `next()` that returns an object `{done: Boolean, value: any}`, here `done:true` denotes the end of the iteration process, otherwise the `value` is the next value.
- The `Symbol.iterator` method is called automatically by `for..of`, but we also can do it directly.
- Built-in iterables like strings or arrays, also implement `Symbol.iterator`.
- String iterator knows about surrogate pairs.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf


Объекты, имеющие индексированные свойства и `length`, называются *псевдомассивами*. Они также могут иметь другие свойства и методы, но у них нет встроенных методов массивов.

Если мы заглянем в спецификацию, мы увидим, что большинство встроенных методов рассчитывают на то, что они будут работать с итерируемыми объектами или псевдомассивами вместо "настоящих" массивов, потому что эти объекты более абстрактны.

<<<<<<< HEAD
`Array.from(obj[, mapFn, thisArg])` создаёт настоящий `Array` из итерируемого объекта или псевдомассива `obj`, и затем мы можем применять к нему методы массивов. Необязательные аргументы `mapFn` и `thisArg` позволяют применять функцию с задаваемым контекстом к каждому элементу.
=======
`Array.from(obj[, mapFn, thisArg])` makes a real `Array` from an iterable or array-like `obj`, and we can then use array methods on it. The optional arguments `mapFn` and `thisArg` allow us to apply a function to each item.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
