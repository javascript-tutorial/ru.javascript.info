# Intl: интернационализация в JavaScript

Общая проблема строк, дат, чисел в JavaScript -- они "не в курсе" языка и особенностей стран, где находится посетитель.

В частности:

Строки
: При сравнении сравниваются коды символов, а это неправильно, к примеру, в русском языке оказывается, что `"ё" > "я"` и `"а" > "Я"`, хотя всем известно, что `я` -- последняя буква алфавита и это она должна быть больше любой другой.

Даты
: В разных странах принята разная запись дат. Где-то пишут 31.12.2014 (Россия), а где-то 12/31/2014 (США), где-то иначе.

Числа
: В одних странах выводятся цифрами, в других -- иероглифами, длинные числа разделяются где-то пробелом, где-то запятой.

Все современные браузеры, кроме IE10 (но есть библиотеки и для него) поддерживают стандарт [ECMA 402](https://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf), предназначенный решить эти проблемы навсегда.

## Основные объекты

`Intl.Collator`
: Умеет правильно сравнивать и сортировать строки.

`Intl.DateTimeFormat`
: Умеет форматировать дату и время в соответствии с нужным языком.

`Intl.NumberFormat`
: Умеет форматировать числа в соответствии с нужным языком.

## Локаль

*Локаль* -- первый и самый важный аргумент всех методов, связанных с интернационализацией.

Локаль описывается строкой из трёх компонентов, которые разделяются дефисом:

1. Код языка.
2. Код способа записи.
3. Код страны.

На практике не всегда указаны три, обычно меньше:

1. `ru` -- русский язык, без уточнений.
2. `en-GB` -- английский язык, используемый в Англии (`GB`).
3. `en-US` -- английский язык, используемый в США (`US`).
4. `zh-Hans-CN` -- китайский язык (`zh`), записываемый упрощённой иероглифической письменностью (`Hans`), используемый в Китае.

Также через суффикс `-u-*` можно указать расширения локалей, например `"th-TH-u-nu-thai"` -- тайский язык (`th`), используемый в Таиланде (`TH`), с записью чисел тайскими буквами (๐, ๑, ๒, ๓, ๔, ๕, ๖, ๗, ๘, ๙) .

Стандарт, который описывает локали -- [RFC 5646](https://datatracker.ietf.org/doc/html/rfc5646), языки описаны в [IANA language registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry).

Все методы принимают локаль в виде строки или массива, содержащего несколько локалей в порядке предпочтения.

Если локаль не указана или `undefined` -- берётся локаль по умолчанию, установленная в окружении (браузере).

### Подбор локали localeMatcher

`localeMatcher` -- вспомогательная настройка, которую тоже можно везде указать, она определяет способ подбора локали, если желаемая недоступна.

У него два значения:

- `"lookup"` -- означает простейший порядок поиска путём обрезания суффикса, например `zh-Hans-CN` -> `zh-Hans` -> `zh` -> локаль по умолчанию.
- `"best fit"` -- использует встроенные алгоритмы и предпочтения браузера (или другого окружения) для выбора подходящей локали.

**По умолчанию стоит `"best fit"`.**

Если локалей несколько, например `["zh-Hans-CN", "ru-RU"]` то `localeMatcher` пытается подобрать наиболее подходящую локаль для первой из списка (китайская), если не получается -- переходит ко второй (русской) и так далее. Если ни одной не нашёл, например на компьютере не совсем поддерживается ни китайский ни русский, то используется локаль по умолчанию.

Как правило, `"best fit"` является здесь наилучшим выбором.

## Строки, Intl.Collator [#intl-collator]

Синтаксис:

```js
// создание
let collator = new Intl.Collator([locales, [options]])
```

Параметры:

`locales`
: Локаль, одна или массив в порядке предпочтения.

`options`
: Объект с дополнительными настройками:

    - `localeMatcher` -- алгоритм выбора подходящей локали.
    - `usage` -- цель сравнения: сортировка `"sort"` или поиск `"search"`, по умолчанию `"sort"`.
    - `sensitivity` -- чувствительность: какие различия в символах учитывать, а какие -- нет, варианты:
        - `base` -- учитывать только разные символы, без диакритических знаков и регистра, например: `а ≠ б`, `е = ё`, `а = А`.
        - `accent` -- учитывать символы и диакритические знаки, например: `а ≠ б`, `е ≠ ё`, `а = А`.
        - `case` --  учитывать символы и регистр, например: `а ≠ б`, `е = ё`, `а ≠ А`.
        - `variant` -- учитывать всё: символ, диакритические знаки, регистр, например: `а ≠ б`, `е ≠ ё`, `а ≠ А`, используется по умолчанию.

    - `ignorePunctuation` -- игнорировать знаки пунктуации: `true/false`, по умолчанию `false`.
    - `numeric` -- использовать ли численное сравнение: `true/false`, если `true`, то будет `12 > 2`, иначе `12 < 2`.
    - `caseFirst` -- в сортировке должны идти первыми прописные или строчные буквы,  варианты: `"upper"` (прописные), `"lower"` (строчные) или `"false"` (стандартное для локали, также является значением по умолчанию). Не поддерживается IE11.

В подавляющем большинстве случаев подходят стандартные параметры, то есть `options` указывать не нужно.

Использование:

```js
let result = collator.compare(str1, str2);
```

Результат `compare` имеет значение `1` (больше), `0` (равно) или `-1` (меньше).

Например:

```js run
let collator = new Intl.Collator();

alert( "ёжик" > "яблоко" ); // true (ёжик больше, что неверно)
alert( collator.compare("ёжик", "яблоко") ); // -1 (ёжик меньше, верно)
```

Выше были использованы полностью стандартные настройки. Они различают регистр символа, но это различие можно убрать, если настроить чувствительность `sensitivity`:

```js run
let collator1 = new Intl.Collator();
alert( collator1.compare("ЁжиК", "ёжик") ); // 1, разные

let collator2 = new Intl.Collator(undefined, {
  sensitivity: "accent"
});
alert( collator2.compare("ЁжиК", "ёжик") ); // 0, одинаковые
```

## Даты, Intl.DateTimeFormat [#intl-datetimeformat]

Синтаксис:

```js
// создание
let formatter = new Intl.DateTimeFormat([locales, [options]])
```

Первый аргумент -- такой же, как и в `Collator`, а в объекте `options` мы можем определить, какие именно части даты показывать (часы, месяц, год...) и в каком формате.

Полный список свойств `options`:
<table>
<thead>
<tr>
    <th>Свойство</th>
    <th>Описание</th>
    <th>Возможные значения</th>
    <th>По умолчанию</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td><code>localeMatcher</code> </td>
    <td> Алгоритм подбора локали</td>
    <td>
      <code>lookup</code>, <code>best fit</code>
    </td>
    <td>
      <code>best fit</code>
    </td>
  </tr>
  <tr>
    <td><code>formatMatcher</code> </td>
    <td>
      Алгоритм подбора формата
    </td>
    <td> <code>basic</code>, <code>best fit</code> </td>
    <td> <code>best fit</code> </td>
  </tr>
  <tr>
    <td><code>hour12</code></td>
    <td>Включать ли время в 12-часовом формате</td>
    <td><code>true</code> -- 12-часовой формат, <code>false</code> -- 24-часовой</td>
    <td></td>
  </tr>
  <tr>
    <td><code>timeZone</code></td>
    <td>Временная зона</td>
    <td>Временная зона, например <code>Europe/Moscow</code></td>
    <td><code>UTC</code></td>
  </tr>
  <tr>
    <td><code>weekday</code></td>
    <td>День недели</td>
    <td><code>narrow</code>, <code>short</code>, <code>long</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>era</code></td>
    <td>Эра</td>
    <td><code>narrow</code>, <code>short</code>, <code>long</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>year</code></td>
    <td>Год</td>
    <td><code>2-digit</code>, <code>numeric</code></td>
    <td><code>undefined</code> или <code>numeric</code></td>
  </tr>
  <tr>
    <td><code>month</code></td>
    <td>Месяц</td>
    <td><code>2-digit</code>, <code>numeric</code>, <code>narrow</code>, <code>short</code>, <code>long</code> </td>
    <td><code>undefined</code> или <code>numeric</code></td>
  </tr>
  <tr>
    <td><code>day</code></td>
    <td>День</td>
    <td><code>2-digit</code>, <code>numeric</code></td>
    <td><code>undefined</code> или <code>numeric</code></td>
  </tr>
  <tr>
    <td><code>hour</code></td>
    <td>Час</td>
    <td> <code>2-digit</code>, <code>numeric</code> </td>
    <td></td>
  </tr>
  <tr>
    <td><code>minute</code></td>
    <td>Минуты </td>
    <td> <code>2-digit</code>, <code>numeric</code> </td>
    <td></td>
  </tr>
  <tr>
    <td><code>second</code></td>
    <td>Секунды</td>
    <td><code>2-digit</code>, <code>numeric</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>timeZoneName</code></td>
    <td>Название таймзоны (нет в IE11)</td>
    <td><code>short</code>, <code>long</code></td>
    <td></td>
  </tr>
  </tbody>
</table>

**Все локали обязаны поддерживать следующие наборы настроек:**

- weekday, year, month, day, hour, minute, second
- weekday, year, month, day
- year, month, day
- year, month
- month, day
- hour, minute, second

Если указанный формат не поддерживается, то настройка `formatMatcher` задаёт алгоритм подбора наиболее близкого формата: `basic` -- по [стандартным правилам](https://www.ecma-international.org/ecma-402/1.0/#BasicFormatMatcher) и `best fit` -- по умолчанию, на усмотрение окружения (браузера).

Использование:

```js
let dateString = formatter.format(date);
```

Например:

```js run
let date = new Date(2014, 11, 31, 12, 30, 0);

let formatter1 = new Intl.DateTimeFormat("ru");
alert( formatter1.format(date) ); // 31.12.2014

let formatter2 = new Intl.DateTimeFormat("en-US");
alert( formatter2.format(date) ); // 12/31/2014
```

Длинная дата, с настройками:

```js run
let date = new Date(2014, 11, 31, 12, 30, 0);

let formatter = new Intl.DateTimeFormat("ru", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});

alert( formatter.format(date) ); // среда, 31 декабря 2014 г.
```

Только время:

```js run
let date = new Date(2014, 11, 31, 12, 30, 0);

let formatter = new Intl.DateTimeFormat("ru", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
});

alert( formatter.format(date) ); // 12:30:00
```

## Числа, Intl.NumberFormat

Форматтер `Intl.NumberFormat` умеет красиво форматировать не только числа, но и валюту, а также проценты.

Синтаксис:

```js
let formatter = new Intl.NumberFormat([locales[, options]]);

formatter.format(number); // форматирование
```

Параметры, как и раньше -- локаль и опции.

Список опций:

<table>
<tr>
    <th>Свойство </th>
    <th>Описание </th>
    <th>Возможные значения </th>
    <th>По умолчанию </th>
  </tr>
  <tr>
    <td> <code>localeMatcher</code> </td>
    <td>Алгоритм подбора локали </td>
    <td> <code>lookup</code>, <code>best fit</code> </td>
    <td> <code>best fit</code> </td>
  </tr>
  <tr>
    <td> <code>style</code> </td>
    <td>Стиль форматирования </td>
    <td> <code>decimal</code>, <code>percent</code>, <code>currency</code> </td>
    <td> <code>decimal</code> </td>
  </tr>
  <tr>
    <td> <code>currency</code> </td>
    <td> Алфавитный код валюты</td>
    <td> См. <a href="https://www.currency-iso.org/en/home/tables/table-a1.html">Список кодов валюты</a>, например <code>USD</code> </td>
    <td> </td>
  </tr>
  <tr>
    <td> <code>currencyDisplay</code> </td>
    <td>Показывать валюту в виде кода, локализованного символа или локализованного названия
    </td>
    <td> <code>code</code>, <code>symbol</code>, <code>name</code> </td>
    <td> <code>symbol</code> </td>
  </tr>
  <tr>
    <td> <code>useGrouping</code> </td>
    <td>Разделять ли цифры на группы</td>
    <td> <code>true</code>, <code>false</code> </td>
    <td> <code>true</code> </td>
  </tr>
  <tr>
    <td><code>minimumIntegerDigits</code></td>
    <td>Минимальное количество цифр целой части</td>
    <td>от <code>1</code> до <code>21</code>
    </td>
    <td><code>21</code></td>
  </tr>
  <tr>
    <td><code>minimumFractionDigits</code> </td>
    <td>Минимальное количество десятичных цифр
    </td>
    <td>от <code>0</code> до <code>20</code> </td>
    <td>для чисел и процентов <code>0</code>, для валюты зависит от кода.</td>
  </tr>
  <tr>
    <td><code>maximumFractionDigits</code></td>
    <td>Максимальное количество десятичных цифр </td>
    <td>от <code>minimumFractionDigits</code> до <code>20</code>. </td>
    <td>для чисел <code>max(minimumFractionDigits, 3)</code>, для процентов <code>0</code>, для валюты зависит от кода.</td>
  </tr>
  <tr>
    <td><code>minimumSignificantDigits</code></td>
    <td>Минимальное количество значимых цифр</td>
    <td>от <code>1</code> до <code>21</code></td>
    <td><code>1</code></td>
  </tr>
  <tr>
    <td><code>maximumSignificantDigits</code></td>
    <td>Максимальное количество значимых цифр</td>
    <td>от <code>minimumSignificantDigits</code> до <code>21</code></td>
    <td><code>21</code></td>
  </tr>
</table>

Пример без опций:

```js run
let formatter = new Intl.NumberFormat("ru");
alert( formatter.format(1234567890.123) ); // 1 234 567 890,123
```

С ограничением значимых цифр (важны только первые 3):

```js run
let formatter = new Intl.NumberFormat("ru", {
  maximumSignificantDigits: 3
});
alert( formatter.format(1234567890.123) ); // 1 230 000 000
```

С опциями для валюты:

```js run
let formatter = new Intl.NumberFormat("ru", {
  style: "currency",
  currency: "GBP"
});

alert( formatter.format(1234.5) ); // 1 234,5 £
```

С двумя цифрами после запятой:

```js run
let formatter = new Intl.NumberFormat("ru", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2
});

alert( formatter.format(1234.5) ); // 1 234,50 £
```

## Методы в Date, String, Number

Методы форматирования также поддерживаются в обычных строках, датах, числах:

`String.prototype.localeCompare(that [, locales [, options]])`
: Сравнивает строку с другой, с учётом локали, например:

    ```js run
    let str = "ёжик";

    alert( str.localeCompare("яблоко", "ru") ); // -1
    ```

`Date.prototype.toLocaleString([locales [, options]])`
: Форматирует дату в соответствии с локалью, например:

    ```js run no-beautify
    let date = new Date(2014, 11, 31, 12, 0);

    alert( date.toLocaleString("ru", { year: 'numeric', month: 'long' }) ); // Декабрь 2014
    ```

`Date.prototype.toLocaleDateString([locales [, options]])`
: То же, что и выше, но опции по умолчанию включают в себя год, месяц, день

`Date.prototype.toLocaleTimeString([locales [, options]])`
: То же, что и выше, но опции по умолчанию включают в себя часы, минуты, секунды

`Number.prototype.toLocaleString([locales [, options]])`
: Форматирует число, используя опции `Intl.NumberFormat`.

Все эти методы при запуске создают соответствующий объект `Intl.*` и передают ему опции, можно рассматривать их как укороченные варианты вызова.

## Старые IE

В IE10 рекомендуется использовать полифил, например библиотеку <https://github.com/andyearnshaw/Intl.js>.
