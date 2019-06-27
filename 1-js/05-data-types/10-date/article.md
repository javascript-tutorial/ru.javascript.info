# Дата и время

Рассмотрим новый встроенный объект: [Date](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date). Он хранит в себе дату и время, а также располагает методами управления ими.

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

    Количество миллисекунд, прошедших с начала 1970 года, называется *меткой времени* (англ. timestamp).

    Это легковесное численное представление даты. Всегда можно получить дату из метки времени с помощью `new Date(timestamp)` и преобразовать существующий объект `Date` в метку времени, используя метод `date.getTime()` (см. ниже).

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

[getFullYear()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear)
: Получаем год (4 цифры)

[getMonth()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth)
: Получаем месяц, **от 0 до 11**.

[getDate()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate)
: Получаем день месяца, от 1 до 31, что несколько противоречит названию метода.

[getHours()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours), [getMinutes()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes), [getSeconds()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getSeconds), [getMilliseconds()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getMilliseconds)
: Получаем, соответственно, часы, минуты, секунды или миллисекунды.

```warn header="Not `getYear()`, but `getFullYear()`"
Во многих интерпретаторах JavaScript предусмотрен нестандартный и устаревший метод `getYear()`, который порой возвращает год в виде двух цифр. Пожалуйста, обходите его стороной. Если нужно значение года, используйте `getFullYear()`.
```

Кроме того, можно получить определённый день недели:

[getDay()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay)
: Возвращает день недели от `0` (воскресенье) до `6` (суббота). Несмотря на то, что в ряде стран за первый день недели принят понедельник, в JavaScript начало недели приходится на воскресенье.

**Все вышеперечисленные методы возвращают значения в соответствии с местной часовой зоной.**

Однако существуют и их UTC-вариации, возвращающие день, месяц, год для часовой зоны UTC+0: [getUTCFullYear()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear), [getUTCMonth()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMonth), [getUTCDay()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDay). Для их использования требуется перед `"get"` подставить `"UTC"`.

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

[getTime()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)
: Для заданной даты возвращает метку времени -- количество миллисекунд, прошедших с 1 января 1970 года UTC+0.

[getTimezoneOffset()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)
: Возвращает разницу в минутах между местной часовой зоной и UTC:

    ```js run
    // если вы в часовой зоне UTC-1, то выводится 60
    // если вы в часовой зоне UTC+3, выводится -180
    alert( new Date().getTimezoneOffset() );

    ```

## Задание компонентов времени

Следующие методы позволяют задать компоненты даты/времени:

- [`setFullYear(year [, month, date])`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/setFullYear)
- [`setMonth(month [, date])`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth)
- [`setDate(date)`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate)
- [`setHours(hour [, min, sec, ms])`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours)
- [`setMinutes(min [, sec, ms])`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/setMinutes)
- [`setSeconds(sec [, ms])`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/setSeconds)
- [`setMilliseconds(ms)`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/setMilliseconds)
- [`setTime(milliseconds)`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/setTime) (задаёт дату в виде целого количества миллисекунд, прошедших с 01.01.1970 UTC)

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

## Объект Date как число, разницы дат

Если объект `Date` преобразовать в число, то получим метку времени, по аналогии с `date.getTime()`:

```js run
let date = new Date();
alert(+date); // количество миллисекунд, по аналогии с date.getTime()
```

Важное побочное явление: даты можно вычитать, в результате получаем разницу в миллисекундах.

Этот приём используется для измерения времени:

```js run
let start = new Date(); // начинаем считать

// выполняем некоторые действия
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // заканчиваем считать

alert( `Цикл отработал за ${end - start} миллисекунд` );
```

## Date.now()

Если нужно просто получить разницу между датами, объект `Date` нам для этого не нужен.

Существует специальный метод `Date.now()`, возвращающий текущую метку времени.

Семантически он эквивалентен `new Date().getTime()`, однако метод не создаёт промежуточный объект `Date`. Так что этот способ работает быстрее и не нагружает сборщик мусора.

Данный метод удобен в использовании и также полезен, когда важно быстродействие, например, при разработке игр на JavaScript или других специализированных приложений.

Вероятно, предыдущий пример лучше переписать так:

```js run
*!*
let start = Date.now(); // счёт в миллисекундах с 1 января 1970 года
*/!*

// выполняем некоторые действия
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // заканчиваем считать
*/!*

alert( `Цикл отработал за ${end - start} миллисекунд` ); // вычитаются числа, а не даты
```

## Тестирование производительности

К вопросам надёжного тестирования производительности функций, требовательных к ресурсам ЦП, нужно подходить с осторожностью.

Например, сравним две функции, вычисляющие разницу между двумя датами: какая сработает быстрее?

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

Обе функции делают буквально одно и то же, только одна использует явный метод `date.getTime()` для получения даты в миллисекундах, а другая полагается на преобразование даты в число. Результат их работы всегда будет одним и тем же.

Но какая функция быстрее?

Для начала можно запустить их много раз подряд и засечь разницу. В нашем случае функции очень простые, так что потребуется где-то 100000 повторений.

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

Представьте, что при выполнении `bench(diffSubtract)` ЦП параллельно работал над чём-то ещё, также потребляющим ресурсы. А когда началось выполнение `bench(diffGetTime)`, процесс уже завершился.

Достаточно реалистичный сценарий для современных многопроцессорных операционных систем.

В результате, у первого бенчмарка окажется меньше ресурсов ЦП, чем у второго. Это может исказить результаты.

**Для получения наиболее достоверные результаты тестирования производительности весь набор бенчмарков нужно запускать по несколько раз.**

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
// bench(upperSlice) и bench(upperLoop) запускаются по очереди 10 раз
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Итоговое время diffSubtract: ' + time1 );
alert( 'Итоговое время diffGetTime: ' + time2 );
```

Современные интерпретаторы JavaScript начинают применять современные оптимизации только к "горячему коду", выполняющемуся несколько раз (незачем оптимизировать то, что выполняется редко). Так что в примере выше первые запуски не оптимизированы должным образом. Нелишним будет добавить следующий код для разогрева:

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

```warn header="Тестируйте производительность с осторожностью"
Современные интерпретаторы JavaScript выполняют множество оптимизаций. Они могут повлиять на результаты "искусственных тестов" по сравнению с "нормальным использованием", особенно если мы тестируем что-то немасштабное. Поэтому если хотите серьёзно понять производительность, пожалуйста, изучите, как работают интерпретаторы JavaScript. И тогда вам, вероятно, совершенно не понадобятся микробенчмарки.

Огромный набор статей о V8 можно найти здесь <http://mrale.ph>.
```

## Date.parse from a string

Метод [Date.parse(str)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) может выделить дату из строки.

Формат строки должен быть следующим: `YYYY-MM-DDTHH:mm:ss.sssZ`, где:

- `YYYY-MM-DD` -- это дата: год-месяц-день.
- Символ `"T"` используется в качестве разделителя.
- `HH:mm:ss.sss` -- время: часы, минуты, секунды и миллисекунды.
- Необязательная часть `'Z'` обозначает часовую зону в формате `+-hh:mm`. Если указать просто букву `Z`, то получим UTC+0.

Возможны и более короткие варианты, например, `YYYY-MM-DD` или `YYYY-MM` или даже `YYYY`.

Вызов `Date.parse(str)` обрабатывает строку в заданном формате и возвращает метку времени (количество миллисекунд с 1 января 1970 года UTC+0). Если формат неправильный, возвращается `NaN`.

Например:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (метка времени)
```

Можно мгновенно воздать объект `new Date` из метки времени:

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);  
```

## Итого

- Дата и время в JavaScript представлены объектом [Date](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date). Нельзя создать "только дату" или "только время": объекты `Date` всегда содержат и то, и другое.
- Счёт месяцев начинается с нуля (да, январь -- это нулевой месяц).
- Дни недели в `getDay()` также отсчитываются с нуля, что соответствует воскресенью.
- Объект `Date` самокорректируется при введении значений, выходящих за рамки допустимых значений. Это полезно для сложения/вычитания дней/месяцев/недель.
- Даты можно вычитать и разница возвращается в миллисекундах. Так происходит, потому что при преобразовании в число объект `Date` становится меткой времени.
- Используйте `Date.now()` для быстрого получения текущей метки времени.

Учтите, что в отличие от других систем, метки времени в JavaScript измеряются в миллисекундах, а не в секундах.

Также порой нам нужно более точно измерить время. Собственными средствами JavaScript измерять время в микросекундах (одна миллионная секунды) нельзя, но в большинстве сред такая возможность есть. К примеру, в браузерах есть метод [performance.now()](https://developer.mozilla.org/ru/docs/Web/API/Performance/now), возвращающих количество миллисекунд с начала загрузки страницы с точностью до микросекунд (3 цифры после точки):

```js run
alert(`Загрузка началась ${performance.now()}мс назад`);
// Получаем что-то вроде: "Загрузка началась 34731.26000000001мс назад"
// .26 –- это микросекунды (260 микросекунд)
// корректными являются только первые три цифры после точки, а остальные -- это ошибка точности
```

В Node.js для этого предусмотрен модуль `microtime` и ряд других способов. Технически, любое устройство или среда позволяет добиться большей точности, просто её нет в объекте `Date`.
