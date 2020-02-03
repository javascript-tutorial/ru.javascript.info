<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
# Остаточные параметры и оператор расширения
=======
# Rest parameters and spread syntax
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Многие встроенные функции JavaScript поддерживают произвольное количество аргументов.

Например:

- `Math.max(arg1, arg2, ..., argN)` – вычисляет максимальное число из переданных.
- `Object.assign(dest, src1, ..., srcN)` – копирует свойства из исходных объектов `src1..N` в целевой объект `dest`.
- ...и так далее.

В этой главе мы узнаем, как сделать то же самое c нашими собственными функциями и как передавать таким функциям параметры в виде массива.

## Остаточные параметры (`...`)

Вызывать функцию можно с любым количеством аргументов независимо от того, как она была определена.

Например:
```js run
function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
```

Лишние аргументы не вызовут ошибку. Но, конечно, посчитаются только первые два.

*Остаточные параметры* могут быть обозначены через три точки `...`. Буквально это значит: "собери оставшиеся параметры и положи их в массив".

Например, соберём все аргументы в массив `args`:

```js run
function sumAll(...args) { // args — имя массива
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

Мы можем положить первые несколько параметров в переменные, а остальные -- собрать в массив.

В примере ниже первые два аргумента функции станут именем и фамилией, а третий и последующие превратятся в массив `titles`:

```js run
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Юлий Цезарь

  // Оставшиеся параметры пойдут в массив
  // titles = ["Консул", "Император"]
  alert( titles[0] ); // Консул
  alert( titles[1] ); // Император
  alert( titles.length ); // 2
}

showName("Юлий", "Цезарь", "Консул", "Император");
```

````warn header="Остаточные параметры должны располагаться в конце"
Остаточные параметры собирают все остальные аргументы, поэтому бессмысленно писать что-либо после них. Это вызовет ошибку:

```js
function f(arg1, ...rest, arg2) { // arg2 после ...rest ?!
  // Ошибка
}
```

`...rest` должен всегда быть последним.
````

## Переменная "arguments" [#the-arguments-variable]

Все аргументы функции находятся в псевдомассиве `arguments` под своими порядковыми номерами.

Например:

```js run
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // Объект arguments можно перебирать
  // for (let arg of arguments) alert(arg);
}

// Вывод: 2, Юлий, Цезарь
showName("Юлий", "Цезарь");

// Вывод: 1, Илья, undefined (второго аргумента нет)
showName("Илья");
```

Раньше в языке не было остаточных параметров, и получить все аргументы функции можно было только с помощью `arguments`. Этот способ всё ещё работает, мы можем найти его в старом коде.

Но у него есть один недостаток. Хотя `arguments` похож на массив, и его тоже можно перебирать, это всё же не массив. Он не поддерживает методы массивов, поэтому мы не можем, например, вызвать `arguments.map(...)`.

К тому же, `arguments` всегда содержит все аргументы функции — мы не можем получить их часть. А остаточные параметры позволяют это сделать.

Соответственно, для более удобной работы с аргументами лучше использовать остаточные параметры.

````smart header="Стрелочные функции не имеют `\"arguments\"`"
Если мы обратимся к `arguments` из стрелочной функции, то получим аргументы внешней "нормальной" функции.

Пример:

```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg(2);
}

f(1); // 1
```

Как мы помним, у стрелочных функций нет собственного `this`. Теперь мы знаем, что нет и своего объекта `arguments`.
````


<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
## Оператор расширения [#spread-operator]
=======
## Spread syntax [#spread-syntax]
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Мы узнали, как получить массив из списка параметров.

Но иногда нужно сделать в точности противоположное.

Например, есть встроенная функция [Math.max](mdn:js/Math/max). Она возвращает наибольшее число из списка:

```js run
alert( Math.max(3, 5, 1) ); // 5
```

Допустим, у нас есть массив чисел `[3, 5, 1]`. Как вызвать для него `Math.max`?

Просто так их не вставишь — `Math.max` ожидает получить список чисел, а не один массив.

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

Конечно, мы можем вводить числа вручную : `Math.max(arr[0], arr[1], arr[2])`. Но, во-первых, это плохо выглядит, а, во-вторых, мы не всегда знаем, сколько будет аргументов. Их может быть как очень много, так и не быть совсем.

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
И тут нам поможет *оператор расширения*. Он похож на остаточные параметры – тоже использует `...`, но делает совершенно противоположное.
=======
*Spread syntax* to the rescue! It looks similar to rest parameters, also using `...`, but does quite the opposite.
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Когда `...arr` используется при вызове функции, он "расширяет" перебираемый объект `arr` в список аргументов.

Для `Math.max`:

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (оператор "раскрывает" массив в список аргументов)
```

Этим же способом мы можем передать несколько итерируемых объектов:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Мы даже можем комбинировать оператор расширения с обычными значениями:
=======
We can even combine the spread syntax with normal values:

>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Оператор расширения можно использовать и для слияния массивов:
=======
Also, the spread syntax can be used to merge arrays:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, затем arr, затем 2, в конце arr2)
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
В примерах выше мы использовали массив, чтобы продемонстрировать свойства оператора расширения, но он работает с любым перебираемым объектом.

Например, оператор расширения подойдёт для того, чтобы превратить строку в массив символов:
=======
In the examples above we used an array to demonstrate the spread syntax, but any iterable will do.

For instance, here we use the spread syntax to turn the string into array of characters:
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

```js run
let str = "Привет";

alert( [...str] ); // П,р,и,в,е,т
```

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Посмотрим, что происходит. Под капотом оператор расширения использует итераторы, чтобы перебирать элементы. Так же, как это делает `for..of`.
=======
The spread syntax internally uses iterators to gather elements, the same way as `for..of` does.
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Цикл `for..of` перебирает строку как последовательность символов, поэтому из `...str` получается `"П", "р", "и", "в", "е", "т"`. Получившиеся символы собираются в массив при помощи стандартного объявления массива: `[...str]`.

Для этой задачи мы можем использовать и `Array.from`. Он тоже преобразует перебираемый объект (такой как строка) в массив:

```js run
let str = "Привет";

// Array.from преобразует перебираемый объект в массив
alert( Array.from(str) ); // П,р,и,в,е,т
```

Результат аналогичен `[...str]`.

Но между `Array.from(obj)` и `[...obj]` есть разница:

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
- `Array.from` работает как с псевдомассивами, так и с итерируемыми объектами
- Оператор расширения работает только с итерируемыми объектами
=======
- `Array.from` operates on both array-likes and iterables.
- The spread syntax works only with iterables.
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Выходит, что если нужно сделать из чего угодно массив, то `Array.from` — более универсальный метод.


## Итого

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
Когда мы видим `"..."` в коде, это могут быть как остаточные параметры, так и оператор расширения.
=======
When we see `"..."` in the code, it is either rest parameters or the spread syntax.
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Как отличить их друг от друга:

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
- Если `...` располагается в конце списка аргументов функции, то это "остаточные параметры". Он собирает остальные неуказанные аргументы и делает из них массив.
- Если `...` встретился в вызове функции или где-либо ещё, то это "оператор расширения". Он извлекает элементы из массива.
=======
- When `...` is at the end of function parameters, it's "rest parameters" and gathers the rest of the list of arguments into an array.
- When `...` occurs in a function call or alike, it's called a "spread syntax" and expands an array into a list.
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Полезно запомнить:

<<<<<<< HEAD:1-js/06-advanced-functions/02-rest-parameters-spread-operator/article.md
- Остаточные параметры используются, чтобы создавать новые функции с неопределённым числом аргументов.
- С помощью оператора расширения можно вставить массив в функцию, которая по умолчанию работает с обычным списком аргументов.
=======
- Rest parameters are used to create functions that accept any number of arguments.
- The spread syntax is used to pass an array to functions that normally require a list of many arguments.
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4:1-js/06-advanced-functions/02-rest-parameters-spread/article.md

Вместе эти конструкции помогают легко преобразовывать наборы значений в массивы и обратно.

К аргументам функции можно обращаться и по-старому — через псевдомассив `arguments`.
