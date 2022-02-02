# Все значения свойства display

Свойство `display` имеет много разных значений. Обычно, используются только три из них: `none`, `inline` и `block`, потому что когда-то браузеры другие не поддерживали.

Но после ухода IE7-, стало возможным использовать и другие значения тоже. Рассмотрим здесь весь список.

## Значение none

Самое простое значение. Элемент не показывается, вообще. Как будто его и нет.

```html autorun height=40
<div style="border:1px solid black">
Невидимый div (
  <div style="*!*display: none*/!*">Я - невидим!</div>
) Стоит внутри скобок
</div>
```

## Значение block

- Блочные элементы располагаются один над другим, вертикально (если нет особых свойств позиционирования, например `float`).
- Блок стремится расшириться на всю доступную ширину. Можно указать ширину и высоту явно.

Это значение `display` многие элементы имеют по умолчанию: `<div>`, заголовок `<h1>`, параграф `<p>`.

```html autorun height=80
<div style="border:1px solid black">
  <div style="border:1px solid blue; width: 50%">Первый</div>
  <div style="border:1px solid red">Второй</div>
</div>
```

Блоки прилегают друг к другу вплотную, если у них нет `margin`.

## Значение inline

- Элементы располагаются на той же строке, последовательно.
- Ширина и высота элемента определяются по содержимому. Поменять их нельзя.

Например, инлайновые элементы по умолчанию: `<span>`, `<a>`.

```html autorun height=40 no-beautify
<span style="border:1px solid black">
  <span style="border:1px solid blue; width:50%">Ширина</span>
  <a style="border:1px solid red">Игнорируется</a>
</span>
```

Если вы присмотритесь внимательно к примеру выше, то увидите, что между внутренними `<span>` и `<a>` есть пробел. Это потому, что он есть в HTML.

Если расположить элементы вплотную -- его не будет:

```html autorun height=40
<span style="border:1px solid black">
  <span style="border:1px solid blue; width:50%">Без</span><a style="border:1px solid red">Пробела</a>
</span>
```

Содержимое инлайн-элемента может переноситься на другую строку.

При этом каждая строка в смысле отображения является отдельным прямоугольником ("line box"). Так что инлайн-элемент состоит из объединения прямоугольников, но в целом, в отличие от блока, прямоугольником не является.

Это проявляется, например, при назначении фона.

Например, три прямоугольника подряд:

```html autorun height=80 no-beautify
<div style="width:400px">
...<span style="background: lightgreen">
  Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля
  Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля Ля
</span>...
</div>
```

Если инлайн-элемент граничит с блоком, то между ними обязательно будет перенос строки:

```html autorun height=80
<div style="border:1px solid black">
  <span style="border:1px solid red">Инлайн</span>
  <div style="border:1px solid blue; width:50%">Блок</div>
  <span style="border:1px solid red">Инлайн</span>
</div>
```

## Значение inline-block

Это значение -- означает элемент, который продолжает находиться в строке (`inline`), но при этом может иметь важные свойства блока.

Как и инлайн-элемент:

- Располагается в строке.
- Размер устанавливается по содержимому.

Во всём остальном -- это блок, то есть:

- Элемент всегда прямоугольный.
- Работают свойства `width/height`.

Это значение `display` используют, чтобы отобразить в одну строку блочные элементы, в том числе разных размеров.

Например:

```html autorun height=160 no-beautify
<style>
li {
*!*
  display: inline-block;
*/!*
  list-style: none;
  border: 1px solid red;
}
</style>

<ul style="border:1px solid black; padding:0">
  <li>Инлайн Блок<br>3 строки<br>высота/ширина явно не заданы</li>
  <li style="width:100px;height:100px">Инлайн<br>Блок 100x100</li>
  <li style="width:60px;height:60px">Инлайн<br>Блок 60x60</li>
  <li style="width:100px;height:60px">Инлайн<br>Блок 100x60</li>
  <li style="width:60px;height:100px">Инлайн<br>Блок 60x100</li>
</ul>
```

Свойство `vertical-align` позволяет выровнять такие элементы внутри внешнего блока:

```html autorun height=160 no-beautify
<style>
li {
  display: inline-block;
  list-style: none;
  border:1px solid red;
*!*
  vertical-align: middle;
*/!*
}
</style>

<ul style="border:1px solid black; padding:0">
  <li>Инлайн Блок<br>3 строки<br>высота/ширина явно не заданы</li>
  <li style="width:100px;height:100px">Инлайн<br>Блок 100x100</li>
  <li style="width:60px;height:60px">Инлайн<br>Блок 60x60</li>
  <li style="width:100px;height:60px">Инлайн<br>Блок 100x60</li>
  <li style="width:60px;height:100px">Инлайн<br>Блок 60x100</li>
</ul>
```

Как и в случае с инлайн-элементами, пробелы между блоками появляются из-за пробелов в HTML. Если элементы списка идут вплотную, например, генерируются в JavaScript -- их не будет.

## Значения table-*

Современные браузеры (IE8+) позволяют описывать таблицу любыми элементами, если поставить им соответствующие значения `display`.

Для таблицы целиком `table`, для строки -- `table-row`, для ячейки -- `table-cell` и т.д.

Пример использования:

```html run autorun
<form style="display: *!*table*/!*">
  <div style="display: *!*table-row*/!*">
    <label style="display: *!*table-cell*/!*">Имя:</label>
    <input style="display: *!*table-cell*/!*">
  </div>
  <div style="display: *!*table-row*/!*">
    <label style="display: *!*table-cell*/!*">Фамилия:</label>
    <input style="display: *!*table-cell*/!*">
  </div>
</form>
```

Важно то, что это действительно полноценная таблица. Используются табличные алгоритмы вычисления ширины и высоты элемента,  [описанные в стандарте](http://www.w3.org/TR/CSS2/tables.html#width-layout).

**Это хорошо для семантической вёрстки и позволяет избавиться от лишних тегов.**

С точки зрения современного CSS, обычные `<table>`, `<tr>`, `<td>` и т.д. -- это просто элементы с предопределёнными значениями `display`:

```css
table    { display: table }
tr       { display: table-row }
thead    { display: table-header-group }
tbody    { display: table-row-group }
tfoot    { display: table-footer-group }
col      { display: table-column }
colgroup { display: table-column-group }
td, th   { display: table-cell }
caption  { display: table-caption }
```

Очень подробно об алгоритмах вычисления размеров и отображении таблиц рассказывает стандарт [CSS 2.1 - Tables](http://www.w3.org/TR/CSS2/tables.html).

### Вертикальное центрирование с table-cell

Внутри ячеек свойство [vertical-align](http://www.w3.org/TR/CSS2/visudet.html#propdef-vertical-align) выравнивает содержимое по вертикали.

Это можно использовать для центрирования:

```html run autorun height=120
<style>
  div { border:1px solid black }
</style>

<div style="height:100px; *!*display: table-cell; vertical-align: middle*/!*">
  <div>Элемент<br>С неизвестной<br>Высотой</div>
</div>
```

CSS не требует, чтобы вокруг `table-cell` была структура таблицы: `table-row` и т.п. Может быть просто такой одинокий `DIV`, это допустимо.

При этом он ведёт себя как ячейка `TD`, то есть подстраивается под размер содержимого и умеет вертикально центрировать его при помощи `vertical-align`.

## Значения list-item, run-in и flex

У свойства `display` есть и другие значения. Они используются реже, поэтому посмотрим на них кратко:

`list-item`
: Этот display по умолчанию используется для элементов списка. Он добавляет к блоку с содержимым ещё и блок с номером(значком) списка, который стилизуется стандартными списочными свойствами:

    ```html autorun height=40
    <div style="*!*display: list-item*/!*; list-style:inside square">Пункт 1</div>
    ```

`run-in`
: Если после `run-in` идёт `block`, то `run-in` становится его первым инлайн-элементом, то есть отображается в начале `block`.

    Если ваш браузер поддерживает это значение, то в примере ниже `h3`, благодаря `display:run-in`, окажется визуально внутри `div`:

    ```html autorun height=100
    <h3 style="*!*display: run-in*/!*; border:2px solid red">Про пчёл.</h3>
    <div style="border:2px solid black">Пчёлы - отличные создания, они делают мёд.</div>
    ```

    Если же вы видите две строки, то ваш браузер НЕ поддерживает `run-in`.

    Вот, для примера, правильный вариант отображения `run-in`, оформленный другим кодом:

    ```html autorun height=60
    <div style="border:2px solid black">
      <h3 style="display: inline; border:2px solid red">Про пчёл.</h3>Пчёлы - отличные создания, они делают мёд.
    </div>
    ```

    Если этот вариант отличается от того, что вы видите выше -- ваш браузер не поддерживает `run-in`. На момент написания этой статьи только IE поддерживал `display:run-in`.

`flex-box`

: Flexbox позволяет удобно управлять дочерними и родительскими элементами на странице, располагая их в необходимом порядке. Официальная спецификация находится здесь: <a href="http://www.w3.org/TR/css3-flexbox/">CSS Flexible Box Layout Module</a>

