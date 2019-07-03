# Дата и время

Встречайте новый встроенный объект: [Date](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date). Он содержит дату и время, а также предоставляет методы управления ими.

Например, его можно использовать для хранения времени создания/изменения, для измерения времени или просто для вывода текущей даты.

## Создание

Для создания нового объекта `Date` нужно вызвать конструктор `new Date()` с одним из следующих аргументов:

`new Date()`
: Без аргументов -- создать объект `Date` с текущими датой и временем:

    ```js run
    let now = new Date();
    alert( now ); // показывает текущие дату и время
    ```

`new Date(milliseconds)`
: Создать объект `Date` с временем, равным количеству миллисекунд (тысячная доля секунды), прошедших с 1 января 1970 года UTC+0.    

    ```js run
    // 0 соответствует 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // теперь добавим 24 часа и получим 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    Количество миллисекунд, прошедших с начала 1970 года, называется *таймстамп* (англ. timestamp).

    Это легковесное численное представление даты. Из таймстампа всегда можно получить дату с помощью `new Date(timestamp)` и преобразовать существующий объект `Date` в таймстамп, используя метод `date.getTime()` (см. ниже).

`new Date(datestring)`
: Если аргумент всего один, и это строка, то её разбор производится по алгоритму `Date.parse` (см. ниже).


    ```js run
    let date = new Date("2017-01-26");
    alert(date);
<<<<<<< HEAD
    // Время не указано, поэтому оно ставится в полночь по Гринвичу и 
    // меняется в соответствии с временной зоной места выполнения кода
    // Так что в результате можно получить
    // Thu Jan 26 2017 11:00:00 GMT+1100 (восточноавстралийское время)
    // или
    // Wed Jan 25 2017 16:00:00 GMT-0800 (тихоокеанское время)
    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
: Создать объект `Date` с заданными компонентами в местной временной зоне. Обязательны только первые два аргумента.

    - `year` должен состоять из четырёх цифр: значение `2013` корректно, `98` -- нет.
    - `month` начинается с `0` (январь) по `11` (декабрь).
    - Параметр `date` здесь представляет собой день месяца. Если параметр не задан, то принимается значение `1`.
    - Если параметры `hours/minutes/seconds/ms` отсутствуют, их значением становится `0`.
=======
    // The time is not set, so it's assumed to be midnight GMT and
    // is adjusted according to the timezone the code is run in
    // So the result could be
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // or
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)
    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
: Create the date with the given components in the local time zone. Only the first two arguments are obligatory.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

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

<<<<<<< HEAD
Существуют методы получения года, месяца и т.д. из объекта `Date`:
=======
There are methods to access the year, month and so on from the `Date` object:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

[getFullYear()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear)
: Получить год (4 цифры)

[getMonth()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth)
: Получить месяц, **от 0 до 11**.

[getDate()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate)
: Получить день месяца, от 1 до 31, что несколько противоречит названию метода.

[getHours()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours), [getMinutes()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes), [getSeconds()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getSeconds), [getMilliseconds()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getMilliseconds)
: Получить, соответственно, часы, минуты, секунды или миллисекунды.

```warn header="Никакого `getYear()`. Только `getFullYear()`"
Многие интерпретаторы JavaScript реализуют нестандартный и устаревший метод `getYear()`, который порой возвращает год в виде двух цифр. Пожалуйста, обходите его стороной. Если нужно значение года, используйте `getFullYear()`.
```

Кроме того, можно получить определённый день недели:

[getDay()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay)
: Вернуть день недели от `0` (воскресенье) до `6` (суббота). Несмотря на то, что в ряде стран за первый день недели принят понедельник, в JavaScript начало недели приходится на воскресенье.

**Все вышеперечисленные методы возвращают значения в соответствии с местной временной зоной.**

Однако существуют и их UTC-варианты, возвращающие день, месяц, год для временной зоны UTC+0: [getUTCFullYear()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear), [getUTCMonth()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMonth), [getUTCDay()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDay). Для их использования требуется после `"get"` подставить `"UTC"`.

Если ваша местная временная зона смещена относительно UTC, то следующий код покажет разные часы:

```js run
// текущая дата
let date = new Date();

// час в вашей текущей временной зоне
alert( date.getHours() );

// час во временной зоне UTC+0 (лондонское время без перехода на летнее время)
alert( date.getUTCHours() );
```

Помимо вышеприведённых методов, существуют два особых метода без UTC-варианта:

[getTime()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)
: Для заданной даты возвращает таймстамп - количество миллисекунд, прошедших с 1 января 1970 года UTC+0.

[getTimezoneOffset()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)
: Возвращает разницу в минутах между местной временной зоной и UTC:

    ```js run
    // если вы во временной зоне UTC-1, то выводится 60
    // если вы во временной зоне UTC+3, выводится -180
    alert( new Date().getTimezoneOffset() );

    ```

## Установка компонентов даты

Следующие методы позволяют установить компоненты даты и времени:

- [`setFullYear(year [, month, date])`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/setFullYear)
- [`setMonth(month [, date])`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth)
- [`setDate(date)`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate)
- [`setHours(hour [, min, sec, ms])`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours)
- [`setMinutes(min [, sec, ms])`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/setMinutes)
- [`setSeconds(sec [, ms])`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/setSeconds)
- [`setMilliseconds(ms)`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/setMilliseconds)
- [`setTime(milliseconds)`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/setTime) (устанавливает дату в виде целого количества миллисекунд, прошедших с 01.01.1970 UTC)

У всех этих методов, кроме `setTime()`, есть UTC-вариант, например: `setUTCHours()`.

Как мы видим, некоторые методы могут устанавливать сразу несколько компонентов даты, например: `setHours`. Если какая-то компонента не указана, она не меняется.

Пример:

```js run
let today = new Date();

today.setHours(0);
alert(today); // выводится сегодняшняя дата, но значение часа будет 0

today.setHours(0, 0, 0, 0);
alert(today); // всё ещё выводится сегодняшняя дата, но время будет ровно 00:00:00.
```

## Автоисправление даты

*Автоисправление* -- это очень полезная особенность объектов `Date`. Можно устанавливать компоненты даты вне обычного диапазона значений, а объект сам себя исправит.

Пример:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Jan 2013 ?!?
alert(date); // ...1st Feb 2013!
```

Неправильные компоненты даты автоматически распределяются по остальным.

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

alert( date ); // выводит правильную дату
```

Также можно установить нулевые или даже отрицательные значения. Например:

```js run
let date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // задать первое число месяца
alert( date );

date.setDate(0); // первый день месяца -- это 1, так что выводится последнее число предыдущего месяца
alert( date ); // 31 Dec 2015
```

## Преобразование к числу, разность дат

Если объект `Date` преобразовать в число, то получим таймстамп, по аналогии с `date.getTime()`:

```js run
let date = new Date();
alert(+date); // количество миллисекунд, то же самое, что date.getTime()
```

Важный побочный эффект: даты можно вычитать, в результате получаем разность в миллисекундах.

Этот приём можно использовать для измерения времени:

```js run
<<<<<<< HEAD
let start = new Date(); // начинаем отсчёт времени
=======
let start = new Date(); // start measuring time
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

// выполняем некоторые действия
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

<<<<<<< HEAD
let end = new Date(); // заканчиваем отсчёт времени
=======
let end = new Date(); // end measuring time
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

alert( `Цикл отработал за ${end - start} миллисекунд` );
```

## Date.now()

<<<<<<< HEAD
Если нужно просто померить время, объект `Date` нам не нужен.
=======
If we only want to measure time, we don't need the `Date` object.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Существует особый метод `Date.now()`, возвращающий текущий таймстамп.

Семантически он эквивалентен `new Date().getTime()`, однако метод не создаёт промежуточный объект `Date`. Так что этот способ работает быстрее и не нагружает сборщик мусора.

Данный метод используется из соображений удобства или когда важно быстродействие, например, при разработке игр на JavaScript или других специализированных приложений.

Вероятно, предыдущий пример лучше переписать так:

```js run
*!*
let start = Date.now(); // количество миллисекунд с 1 января 1970 года
*/!*

// выполняем некоторые действия
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // заканчиваем отсчёт времени
*/!*

alert( `Цикл отработал за ${end - start} миллисекунд` ); // вычитаются числа, а не даты
```

## Бенчмаркинг

Будьте внимательны, если хотите точно протестировать производительность функции, которая зависит от процессора.

Например, сравним две функции, вычисляющие разницу между двумя датами: какая сработает быстрее?

Подобные вычисления, замеряющие производительность, также называют "бенчмарками" (benchmark). 

Such performance measurements are often called "benchmarks".

```js
// есть date1 и date2, какая функция быстрее вернёт разницу между ними в миллисекундах?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// или
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

Обе функции делают буквально одно и то же, только одна использует явный метод `date.getTime()` для получения даты в миллисекундах, а другая полагается на преобразование даты в число. Результат их работы всегда один и тот же.

Но какая функция быстрее?

<<<<<<< HEAD
Для начала можно запустить их много раз подряд и засечь разницу. В нашем случае функции очень простые, так что потребуется хотя бы 100000 повторений.
=======
The first idea may be to run them many times in a row and measure the time difference. For our case, functions are very simple, so we have to do it at least 100000 times.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Проведём измерения:

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

alert( 'Время diffSubtract: ' + bench(diffSubtract) + 'мс' );
alert( 'Время diffGetTime: ' + bench(diffGetTime) + 'мс' );
```

Вот это да! Метод `getTime()` работает ощутимо быстрее! Всё потому, что не производится преобразование типов и интерпретаторам такое намного легче оптимизировать.

Замечательно, это уже что-то. Но до хорошего бенчмарка нам ещё далеко.

<<<<<<< HEAD
Представьте, что при выполнении `bench(diffSubtract)` процессор параллельно делал что-то ещё, также потребляющее ресурсы. А к началу выполнения `bench(diffGetTime)`, он это уже завершил.
=======
Imagine that at the time of running `bench(diffSubtract)` CPU was doing something in parallel, and it was taking resources. And by the time of running `bench(diffGetTime)` that work has finished.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Достаточно реалистичный сценарий в современных многопроцессорных операционных системах.

В результате, у первого бенчмарка окажется меньше ресурсов процессора, чем у второго. Это может исказить результаты.

**Для получения наиболее достоверных результатов тестирования производительности весь набор бенчмарков нужно запускать по несколько раз.**

Рассмотрим пример:

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
// bench(upperSlice) и bench(upperLoop) поочерёдно запускаются 10 раз
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Итоговое время diffSubtract: ' + time1 );
alert( 'Итоговое время diffGetTime: ' + time2 );
```

Современные интерпретаторы JavaScript начинают применять продвинутые оптимизации только к "горячему коду", выполняющемуся несколько раз (незачем оптимизировать то, что редко выполняется). Так что в примере выше первые запуски не оптимизированы должным образом. Нелишним будет добавить предварительный запуск для "разогрева":

```js
// добавляем для "разогрева" перед основным циклом
bench(diffSubtract);
bench(diffGetTime);

// а теперь тестируем производительность
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

<<<<<<< HEAD
```warn header="Внимательно тестируйте производительность"
Современные интерпретаторы JavaScript выполняют множество оптимизаций. Они могут повлиять на результаты "искусственных тестов" по сравнению с "нормальным использованием", особенно если мы тестируем что-то очень маленькое, например, работу оператора или встроенной функции. Поэтому если хотите серьёзно понять производительность, пожалуйста, изучите, как работают интерпретаторы JavaScript. И тогда вам, вероятно, совершенно не понадобятся микробенчмарки.
=======
```warn header="Be careful doing microbenchmarking"
Modern JavaScript engines perform many optimizations. They may tweak results of "artificial tests" compared to "normal usage", especially when we benchmark something very small, such as how an operator works, or a built-in function. So if you seriously want to understand performance, then please study how the JavaScript engine works. And then you probably won't need microbenchmarks at all.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Отличный набор статей о V8 можно найти на <http://mrale.ph>.
```

## Разбор строки с датой

Метод [Date.parse(str)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) считывает дату из строки.

Формат строки должен быть следующим: `YYYY-MM-DDTHH:mm:ss.sssZ`, где:

- `YYYY-MM-DD` -- это дата: год-месяц-день.
- Символ `"T"` используется в качестве разделителя.
- `HH:mm:ss.sss` -- время: часы, минуты, секунды и миллисекунды.
- Необязательная часть `'Z'` обозначает временную зону в формате `+-hh:mm`. Если указать просто букву `Z`, то получим UTC+0.

Возможны и более короткие варианты, например, `YYYY-MM-DD` или `YYYY-MM` или даже `YYYY`.

Вызов `Date.parse(str)` обрабатывает строку в заданном формате и возвращает таймстамп (количество миллисекунд с 1 января 1970 года UTC+0). Если формат неправильный, возвращается `NaN`.

Например:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (таймстамп)
```

Можно тут же создать объект `new Date` из таймстампа:

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);  
```

## Итого

- Дата и время в JavaScript представлены объектом [Date](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date). Нельзя создать "только дату" или "только время": объекты `Date` всегда содержат и то, и другое.
- Счёт месяцев начинается с нуля (да, январь -- это нулевой месяц).
- Дни недели в `getDay()` также отсчитываются с нуля, что соответствует воскресенью.
- Объект `Date` самокорректируется при введении значений, выходящих за рамки допустимых. Это полезно для сложения/вычитания дней/месяцев/недель.
- Даты можно вычитать, и разность возвращается в миллисекундах. Так происходит, потому что при преобразовании в число объект `Date` становится таймстампом.
- Используйте `Date.now()` для быстрого получения текущего времени в формате таймстампа.

Учтите, что, в отличие от некоторых других систем, в JavaScript таймстамп в миллисекундах, а не в секундах.

<<<<<<< HEAD
Порой нам нужно измерить время с большей точностью. Собственными средствами JavaScript измерять время в микросекундах (одна миллионная секунды) нельзя, но в большинстве сред такая возможность есть. К примеру, в браузерах есть метод [performance.now()](https://developer.mozilla.org/ru/docs/Web/API/Performance/now), возвращающий количество миллисекунд с начала загрузки страницы с точностью до микросекунд (3 цифры после точки):
=======
Sometimes we need more precise time measurements. JavaScript itself does not have a way to measure time in microseconds (1 millionth of a second), but most environments provide it. For instance, browser has [performance.now()](mdn:api/Performance/now) that gives the number of milliseconds from the start of page loading with microsecond precision (3 digits after the point):
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```js run
alert(`Загрузка началась ${performance.now()}мс назад`);
// Получаем что-то вроде: "Загрузка началась 34731.26000000001мс назад"
// .26 –- это микросекунды (260 микросекунд)
// корректными являются только первые три цифры после точки, а остальные -- это ошибка точности
```

В Node.js для этого предусмотрен модуль `microtime` и ряд других способов. Технически, любое устройство или среда позволяет добиться большей точности, просто её нет в объекте `Date`.
