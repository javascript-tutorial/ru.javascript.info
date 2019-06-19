# Дата и время

Рассмотрим новый встроенный объект: [Date](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date). Он хранит в себе дату, время и предоставляет методы управления датой/временем.

Например, его можно использовать для хранения времени создания/изменения, для измерения времени или просто для вывода текущей даты.

## Создание

Для создания нового объекта `Date` нужно вызвать конструктор `new Date()` с одним из следующих аргументов:

`new Date()`
: Без аргументов -- создаёт объект `Date` на текущие дату и время:

    ```js run
    let now = new Date();
    alert( now ); // показывает текущие дату и время
    ```

`new Date(milliseconds)`
: Создаёт объект `Date` с временем, равным количеству миллисекунд (тысячная доля секунды), прошедших с 1 января 1970 года UTC+0.    

    ```js run
    // 0 означает 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // теперь добавим 24 часа и получим 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    Количество миллисекунд, прошедших с начала 1970 года, называется *отметкой времени* (англ. timestamp).

    Это легковесное численное представление даты. Всегда можно получить дату из таймстемпа с помощью `new Date(timestamp)` и привести существующий объект `Date` к таймстемпу, используя метод `date.getTime()` (см. ниже).

`new Date(datestring)`
: Если аргумент всего один, и это строка, то она обрабатывается(?) алгоритмом `Date.parse` (см. ниже).


    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // Временная составляющая даты по умолчанию соответствует полночи по Гринвичу и 
    // смещается в соответствии с часовой зоной места выполнения кода
    // Так что в результате можно получить
    // Thu Jan 26 2017 11:00:00 GMT+1100 (восточноавстралийское время)
    // или
    // Wed Jan 25 2017 16:00:00 GMT-0800 (тихоокеанское время)
    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
: Создаёт объект `Date` с заданными компонентами в местной временной зоне. Обязательны только первые два аргумента.

    Учтите:

    - `year` должен состоять из четырёх цифр: значение `2013` корректно, `98` -- нет.
    - `month` начинается с `0` (январь) по `11` (декабрь).
    - Параметр `date` здесь представляет собой день месяца. Если параметр не задан, то принимается значение `1`.
    - Если параметры `hours/minutes/seconds/ms` отсутствуют, их значением становится `0`.

    Например:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // то же самое, так как часы и проч. равны 0
    ```

    Минимальная точность – 1 мс (1/1000 секунды):

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## Получение компонентов даты

Существует множество методов получения года, месяца и т.д. из объекта `Date`. Но если их классифицировать, то они легко запоминаются:

[getFullYear()](mdn:js/Date/getFullYear)
: Получаем год (4 цифры)

[getMonth()](mdn:js/Date/getMonth)
: Получаем месяц, **от 0 до 11**.

[getDate()](mdn:js/Date/getDate)
: Получаем день месяца, от 1 до 31, что несколько противоречит названию метода.

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: Получаем, соответственно, часы, минуты, секунды или миллисекунды.

```warn header="Not `getYear()`, but `getFullYear()`"
Во многих интерпретаторах JavaScript предусмотрен нестандартный и устаревший метод `getYear()`, который порой возвращает год в виде двух цифр. Пожалуйста, обходите его стороной. Если нужно значение года, используйте `getFullYear()`.
```

Кроме того, можно получить определённый день недели:

[getDay()](mdn:js/Date/getDay)
: Возвращает день недели от `0` (воскресенье) до `6` (суббота). Несмотря на то, что в ряде стран за первый день недели принят понедельник, в JavaScript начало недели приходится на воскресенье.

**Все вышеперечисленные методы возвращают значения в соответствии с местной часовой зоной.**

Однако существуют и их UTC-вариации, возвращающие день, месяц, год для часовой зоны UTC+0: [getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). Для их использования требуется перед `"get"` подставить `"UTC"`.

Если ваша местная часовая зона смещена относительно UTC, то следующий код вернёт разные значения:

```js run
// текущая дата
let date = new Date();

// час в вашей текущей часовой зоне
alert( date.getHours() );

// час в часовой зоне UTC+0 (лондонское время без перехода на летнее время)
alert( date.getUTCHours() );
```

Помимо вышеприведённых методов, существует два особенных метода, не имеющих варианта с UTC:

[getTime()](mdn:js/Date/getTime)
: Для заданной даты возвращает отметку времени -- количество миллисекунд, прошедших с 1 января 1970 года UTC+0.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: Возвращает разницу в минутах между местной часовой зоной и UTC:

    ```js run
    // если вы в часовой зоне UTC-1, то выводится 60
    // если вы в часовой зоне UTC+3, выводится -180
    alert( new Date().getTimezoneOffset() );

    ```

## Задание компонентов времени

Следующие методы позволяют задать компоненты даты/времени:

- [`setFullYear(year [, month, date])`](mdn:js/Date/setFullYear)
- [`setMonth(month [, date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour [, min, sec, ms])`](mdn:js/Date/setHours)
- [`setMinutes(min [, sec, ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec [, ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (sets the whole date by milliseconds since 01.01.1970 UTC)

У всех методов, кроме `setTime()`, есть вариант для UTC, например: `setUTCHours()`.

Как видим, некоторые методы могут задавать сразу несколько компонентов, например: `setHours`. Компоненты, не указанные выше, изменять нельзя. The components that are not mentioned are not modified.

Пример:

```js run
let today = new Date();

today.setHours(0);
alert(today); // всё равно выводится сегодняшняя дата, но значение часа будет 0

today.setHours(0, 0, 0, 0);
alert(today); // всё равно выводится сегодняшняя дата, но время будет 00:00:00.
```

## Автоисправление

*Автоисправление* -- это очень полезная возможность объектов `Date`. Можно задать значения, выходящие за рамки формата, и эти значения будут автоматически откорректированы.

Пример:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Jan 2013 ?!?
alert(date); // ...1st Feb 2013!
```

Out-of-range date components are distributed automatically.

Предположим, нам требуется увеличить дату "28 февраля 2016" на два дня. В зависимости от того, високосный это год или нет, результатом будет "2 марта" или "1 марта". Нам об этом думать не нужно. Просто прибавляем два дня. Объект `Date` позаботится об остальном:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

Эту возможность часто используют, чтобы получить дату по прошествии заданного отрезка времени. Например, получим дату "спустя 70 секунд с текущего момента":

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // показывает правильную дату
```

Также можно задавать нулевые или даже отрицательные значения. Например:

```js run
let date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // задаёт первый день месяца set day 1 of month
alert( date );

date.setDate(0); // min day is 1, so the last day of the previous month is assumed
alert( date ); // 31 Dec 2015
```

## Приведение даты к числу, разницы дат

Если объект `Date` привести к числовому значению, то получим отметку времени, по аналогии с `date.getTime()`:

```js run
let date = new Date();
alert(+date); // количество миллисекунд, по аналогии с date.getTime()
```

Важное побочное явление: даты можно вычитать, в результате получаем разницу в миллисекундах.

Этот приём используется для измерения времени:

```js run
let start = new Date(); // начинаем считать

// производим некие вычисления
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // заканчиваем считать

alert( `Цикл отработал за ${end - start} миллисекунд` );
```

## Date.now()

If we only want to measure the difference, we don't need the `Date` object.

There's a special method `Date.now()` that returns the current timestamp.

It is semantically equivalent to `new Date().getTime()`, but it doesn't create an intermediate `Date` object. So it's faster and doesn't put pressure on garbage collection.

It is used mostly for convenience or when performance matters, like in games in JavaScript or other specialized applications.

So this is probably better:

```js run
*!*
let start = Date.now(); // milliseconds count from 1 Jan 1970
*/!*

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // done
*/!*

alert( `The loop took ${end - start} ms` ); // вычитаются числа, а не даты
```

## Benchmarking

If we want a reliable benchmark of CPU-hungry function, we should be careful.

For instance, let's measure two functions that calculate the difference between two dates: which one is faster?

```js
// we have date1 and date2, which function faster returns their difference in ms?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// or
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

These two do exactly the same thing, but one of them uses an explicit `date.getTime()` to get the date in ms, and the other one relies on a date-to-number transform. Their result is always the same.

So, which one is faster?

The first idea may be to run them many times in a row and measure the time difference. For our case, functions are very simple, so we have to do it around 100000 times.

Let's measure:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

Wow! Using `getTime()` is so much faster! That's because there's no type conversion, it is much easier for engines to optimize.

Okay, we have something. But that's not a good benchmark yet.

Imagine that at the time of running `bench(diffSubtract)` CPU was doing something in parallel, and it was taking resources. And by the time of running `bench(diffGetTime)` the work has finished.

A pretty real scenario for a modern multi-process OS.

As a result, the first benchmark will have less CPU resources than the second. That may lead to wrong results.

**For more reliable benchmarking, the whole pack of benchmarks should be rerun multiple times.**

Here's the code example:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// run bench(upperSlice) and bench(upperLoop) each 10 times alternating
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

Modern JavaScript engines start applying advanced optimizations only to "hot code" that executes many times (no need to optimize rarely executed things). So, in the example above, first executions are not well-optimized. We may want to add a heat-up run:

```js
// added for "heating up" prior to the main loop
bench(diffSubtract);
bench(diffGetTime);

// now benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Be careful doing microbenchmarking"
Modern JavaScript engines perform many optimizations. They may tweak results of "artificial tests" compared to "normal usage", especially when we benchmark something very small. So if you seriously want to understand performance, then please study how the JavaScript engine works. And then you probably won't need microbenchmarks at all.

The great pack of articles about V8 can be found at <http://mrale.ph>.
```

## Date.parse from a string

The method [Date.parse(str)](mdn:js/Date/parse) can read a date from a string.

The string format should be: `YYYY-MM-DDTHH:mm:ss.sssZ`, where:

- `YYYY-MM-DD` -- is the date: year-month-day.
- The character `"T"` is used as the delimiter.
- `HH:mm:ss.sss` -- is the time: hours, minutes, seconds and milliseconds.
- The optional `'Z'` part denotes the time zone in the format `+-hh:mm`. A single letter `Z` that would mean UTC+0.

Shorter variants are also possible, like `YYYY-MM-DD` or `YYYY-MM` or even `YYYY`.

The call to `Date.parse(str)` parses the string in the given format and returns the timestamp (number of milliseconds from 1 Jan 1970 UTC+0). If the format is invalid, returns `NaN`.

For instance:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (timestamp)
```

We can instantly create a `new Date` object from the timestamp:

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);  
```

## Итого

- Дата и время в JavaScript представлены объектом [Date](mdn:js/Date). Нельзя создать "только дату" или "только время": объекты `Date` всегда содержат и то, и другое.
- Счёт месяцев начинается с нуля (да, январь -- это нулевой месяц).
- Дни недели в `getDay()` также отсчитываются с нуля, что соответствует воскресенью.
- Объект `Date` самокорректируется при введении значений out-of-range components are set. Good for adding/subtracting days/months/hours.
- Даты можно вычитать и разница возвращается в миллисекундах. Так происходит, потому что при конвертировании в число объект `Date` становится отметкой времени.
- Используйте `Date.now()` для быстрого получения текущей отметки времени.

Учтите, что в отличие от других систем, отметки времени в JavaScript измеряются в миллисекундах, а не в секундах.

Также порой требуются более точные измерения времени. JavaScript itself does not have a way to measure time in microseconds (1 millionth of a second), but most environments provide it. For instance, browser has [performance.now()](mdn:api/Performance/now) that gives the number of milliseconds from the start of page loading with microsecond precision (3 digits after the point):

```js run
alert(`Loading started ${performance.now()}ms ago`);
// Something like: "Loading started 34731.26000000001ms ago"
// .26 is microseconds (260 microseconds)
// more than 3 digits after the decimal point are precision errors, but only the first 3 are correct
```

Node.js has `microtime` module and other ways. Technically, any device and environment allows to get more precision, it's just not in `Date`.
