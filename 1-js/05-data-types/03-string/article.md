
# Строки

В JavaScript любые текстовые данные являются строками. Не существует отдельного типа "символ", который есть в ряде других языков.

Внутренний формат для строк — всегда [UTF-16](https://ru.wikipedia.org/wiki/UTF-16), вне зависимости от кодировки страницы.

## Кавычки

В JavaScript есть разные типы кавычек.

Строку можно создать с помощью одинарных, двойных либо обратных кавычек:

```js
let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`;
```

Одинарные и двойные кавычки работают, по сути, одинаково, а если использовать обратные кавычки, то в такую строку мы сможем вставлять произвольные выражения, обернув их в `${…}`:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Ещё одно преимущество обратных кавычек — они могут занимать более одной строки, вот так:

```js run
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // список гостей, состоящий из нескольких строк
```

Выглядит вполне естественно, не правда ли? Что тут такого? Но если попытаться использовать точно так же одинарные или двойные кавычки, то будет ошибка:

```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";
```

<<<<<<< HEAD
Одинарные и двойные кавычки в языке с незапамятных времён: тогда потребность в многострочных строках не учитывалась. Что касается обратных кавычек, они появились существенно позже, и поэтому они гибче.

Обратные кавычки также позволяют задавать "шаблонную функцию" перед первой обратной кавычкой. Используемый синтаксис: <code>func&#96;string&#96;</code>. Автоматически вызываемая функция `func` получает строку и встроенные в неё выражения и может их обработать. Подробнее об этом можно прочитать в [документации](mdn:/JavaScript/Reference/template_strings#%D0%A2%D0%B5%D0%B3%D0%BE%D0%B2%D1%8B%D0%B5_%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD%D1%8B). Если перед строкой есть выражение, то шаблонная строка называется "теговым шаблоном". Это позволяет использовать свою шаблонизацию для строк, но на практике теговые шаблоны применяются редко.
=======
Single and double quotes come from ancient times of language creation, when the need for multiline strings was not taken into account. Backticks appeared much later and thus are more versatile.

Backticks also allow us to specify a "template function" before the first backtick. The syntax is: <code>func&#96;string&#96;</code>. The function `func` is called automatically, receives the string and embedded expressions and can process them. This feature is called "tagged templates", it's rarely seen, but you can read about it in the MDN: [Template literals](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

## Спецсимволы

Многострочные строки также можно создавать с помощью одинарных и двойных кавычек, используя так называемый "символ перевода строки", который записывается как `\n`:

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

<<<<<<< HEAD
alert(guestList); // список гостей, состоящий из нескольких строк
```

В частности, эти две строки эквивалентны, просто записаны по-разному:
=======
alert(guestList); // a multiline list of guests, same as above
```

As a simpler example, these two lines are equal, just written differently:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
// перевод строки добавлен с помощью символа перевода строки
let str1 = "Hello\nWorld";

// многострочная строка, созданная с использованием обратных кавычек
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

<<<<<<< HEAD
Есть и другие, реже используемые спецсимволы. Вот список:

| Символ | Описание |
|-----------|-------------|
|`\n`|Перевод строки|
|`\r`|В текстовых файлах Windows для перевода строки используется комбинация символов `\r\n`, а на других ОС это просто `\n`. Это так по историческим причинам, ПО под Windows обычно понимает и просто `\n`. |
|`\'`,&nbsp;`\"`,&nbsp;<code>\\`</code>|Кавычки|
|`\\`|Обратный слеш|
|`\t`|Знак табуляции|
|`\b`, `\f`, `\v`| Backspace, Form Feed и Vertical Tab — оставлены для обратной совместимости, сейчас не используются. |

Как вы можете видеть, все спецсимволы начинаются с обратного слеша, `\` — так называемого "символа экранирования".

Он также используется, если необходимо вставить в строку кавычку.

К примеру:
=======
There are other, less common special characters:

| Character | Description |
|-----------|-------------|
|`\n`|New line|
|`\r`|In Windows text files a combination of two characters `\r\n` represents a new break, while on non-Windows OS it's just `\n`. That's for historical reasons, most Windows software also understands `\n`. |
|`\'`,&nbsp;`\"`,&nbsp;<code>\\`</code>|Quotes|
|`\\`|Backslash|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- mentioned for completeness, coming from old times, not used nowadays (you can forget them right now). |

As you can see, all special characters start with a backslash character `\`. It is also called an "escape character".

Because it's so special, if we need to show an actual backslash `\` within the string, we need to double it:

```js run
alert( `The backslash: \\` ); // The backslash: \
```

So-called "escaped" quotes `\'`, `\"`, <code>\\`</code> are used to insert a quote into the same-quoted string.

For instance:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Здесь перед входящей в строку кавычкой необходимо добавить обратный слеш — `\'` — иначе она бы обозначала окончание строки.

<<<<<<< HEAD
Разумеется, требование экранировать относится только к таким же кавычкам, как те, в которые заключена строка. Так что мы можем применить и более элегантное решение, использовав для этой строки двойные или обратные кавычки:
=======
Of course, only the quotes that are the same as the enclosing ones need to be escaped. So, as a more elegant solution, we could switch to double quotes or backticks instead:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
alert( "I'm the Walrus!" ); // I'm the Walrus!
```

<<<<<<< HEAD
Заметим, что обратный слеш `\` служит лишь для корректного прочтения строки интерпретатором, но он не записывается в строку после её прочтения. Когда строка сохраняется в оперативную память, в неё не добавляется символ `\`. Вы можете явно видеть это в выводах `alert` в примерах выше.

Но что, если нам надо добавить в строку собственно сам обратный слеш `\`?

Это можно сделать, добавив перед ним… ещё один обратный слеш!

```js run
alert( `The backslash: \\` ); // The backslash: \
```
=======
Besides these special characters, there's also a special notation for Unicode codes `\u…`, it's rarely used and is covered in the optional chapter about [Unicode](info:unicode).
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

## Длина строки

Свойство `length` содержит длину строки:

```js run
alert( `My\n`.length ); // 3
```

Обратите внимание, `\n` — это один спецсимвол, поэтому тут всё правильно: длина строки `3`.

```warn header="`length` — это свойство"
Бывает так, что люди с практикой в других языках случайно пытаются вызвать его, добавляя круглые скобки: они пишут `str.length()` вместо `str.length`. Это не работает.

<<<<<<< HEAD
Так как `str.length` — это числовое свойство, а не функция, добавлять скобки не нужно.
=======
Please note that `str.length` is a numeric property, not a function. There is no need to add parenthesis after it. Not `.length()`, but `.length`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
```

## Доступ к символам

<<<<<<< HEAD
Получить символ, который занимает позицию `pos`, можно с помощью квадратных скобок: `[pos]`. Также можно использовать метод [str.at(pos)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at). Первый символ занимает нулевую позицию:
=======
To get a character at position `pos`, use square brackets `[pos]` or call the method [str.at(pos)](mdn:js/String/at). The first character starts from the zero position:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
let str = `Hello`;

// получаем первый символ
alert( str[0] ); // H
alert( str.at(0) ); // H

// получаем последний символ
alert( str[str.length - 1] ); // o
<<<<<<< HEAD
alert( str.at(-1) ); // o
```

Как вы можете видеть, преимущество метода `.at(pos)` заключается в том, что он допускает отрицательную позицию. Если `pos` -- отрицательное число, то отсчет ведется от конца строки.

Таким образом, `.at(-1)` означает последний символ, а `.at(-2)` -- тот, что перед ним, и т.д.

Квадратные скобки всегда возвращают `undefined` для отрицательных индексов. Например:
=======
alert( str.at(-1) );
```

As you can see, the `.at(pos)` method has a benefit of allowing negative position. If `pos` is negative, then it's counted from the end of the string.

So `.at(-1)` means the last character, and `.at(-2)` is the one before it, etc.

The square brackets always return `undefined` for negative indexes, for instance:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
let str = `Hello`;

alert( str[-2] ); // undefined
alert( str.at(-2) ); // l
```

Также можно перебрать строку посимвольно, используя `for..of`:

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char — сначала "H", потом "e", потом "l" и т.д.)
}
```

## Строки неизменяемы

Содержимое строки в JavaScript нельзя изменить. Нельзя взять символ посередине и заменить его. Как только строка создана — она такая навсегда.

Давайте попробуем так сделать, и убедимся, что это не работает:

```js run
let str = 'Hi';

str[0] = 'h'; // ошибка
alert( str[0] ); // не работает
```

Можно создать новую строку и записать её в ту же самую переменную вместо старой.

Например:

```js run
let str = 'Hi';

str = 'h' + str[1]; // заменяем строку

alert( str ); // hi
```

В последующих разделах мы увидим больше примеров.

## Изменение регистра

Методы [toLowerCase()](mdn:js/String/toLowerCase) и [toUpperCase()](mdn:js/String/toUpperCase) меняют регистр символов:

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

Если мы захотим перевести в нижний регистр какой-то конкретный символ:

```js run
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## Поиск подстроки

Существует несколько способов поиска подстроки.

### str.indexOf

Первый метод — [str.indexOf(substr, pos)](mdn:js/String/indexOf).

Он ищет подстроку `substr` в строке `str`, начиная с позиции `pos`, и возвращает позицию, на которой располагается совпадение, либо `-1` при отсутствии совпадений.

Например:

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, потому что подстрока 'Widget' найдена в начале
alert( str.indexOf('widget') ); // -1, совпадений нет, поиск чувствителен к регистру

alert( str.indexOf("id") ); // 1, подстрока "id" найдена на позиции 1 (..idget with id)
```

<<<<<<< HEAD
Необязательный второй аргумент позволяет начать поиск с определённой позиции.
=======
The optional second parameter allows us to start searching from a given position.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Например, первое вхождение `"id"` — на позиции `1`. Для того, чтобы найти следующее, начнём поиск с позиции `2`:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

Чтобы найти все вхождения подстроки, нужно запустить `indexOf` в цикле. Каждый раз, получив очередную позицию, начинаем новый поиск со следующей:

```js run
let str = 'Ослик Иа-Иа посмотрел на виадук';

let target = 'Иа'; // цель поиска

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Найдено тут: ${foundPos}` );
  pos = foundPos + 1; // продолжаем со следующей позиции
}
```

Тот же алгоритм можно записать и короче:

```js run
let str = "Ослик Иа-Иа посмотрел на виадук";
let target = "Иа";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(substr, position)`"
Также есть похожий метод [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf), который ищет с конца строки к её началу.

Он используется тогда, когда нужно получить самое последнее вхождение: перед концом строки или начинающееся до (включительно) определённой позиции.
```

При проверке `indexOf` в условии `if` есть небольшое неудобство. Такое условие не будет работать:

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("Совпадение есть"); // не работает
}
```

Мы ищем подстроку `"Widget"`, и она здесь есть, прямо на позиции `0`. Но `alert` не показывается, т. к. `str.indexOf("Widget")` возвращает `0`, и `if` решает, что тест не пройден.

Поэтому надо делать проверку на `-1`:

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("Совпадение есть"); // теперь работает
}
```

<<<<<<< HEAD
#### Трюк с побитовым НЕ
Существует старый трюк с использованием [побитового оператора НЕ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT) — `~`. Он преобразует число в 32-разрядное целое со знаком (signed 32-bit integer). Дробная часть, в случае, если она присутствует, отбрасывается. Затем все биты числа инвертируются.

На практике это означает простую вещь: для 32-разрядных целых чисел значение `~n` равно `-(n+1)`.

В частности:

```js run
alert( ~2 ); // -3, то же, что -(2+1)
alert( ~1 ); // -2, то же, что -(1+1)
alert( ~0 ); // -1, то же, что -(0+1)
*!*
alert( ~-1 ); // 0, то же, что -(-1+1)
*/!*
```

Таким образом, `~n` равняется 0 только при `n == -1` (для любого `n`, входящего в 32-разрядные целые числа со знаком).

Соответственно, прохождение проверки `if ( ~str.indexOf("…") )` означает, что результат `indexOf` отличен от `-1`, совпадение есть.

Это иногда применяют, чтобы сделать проверку `indexOf` компактнее:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Совпадение есть' ); // работает
}
```

Обычно использовать возможности языка каким-либо неочевидным образом не рекомендуется, но этот трюк широко используется в старом коде, поэтому его важно понимать.

Просто запомните: `if (~str.indexOf(…))` означает "если найдено".

Впрочем, если быть точнее, из-за того, что большие числа обрезаются до 32 битов оператором `~`, существуют другие числа, для которых результат тоже будет `0`, самое маленькое из которых — `~4294967295=0`. Поэтому такая проверка будет правильно работать только для строк меньшей длины.

На данный момент такой трюк можно встретить только в старом коде, потому что в новом он просто не нужен: есть метод `.includes` (см. ниже).

=======
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
### includes, startsWith, endsWith

Более современный метод [str.includes(substr, pos)](mdn:js/String/includes) возвращает `true`, если в строке `str` есть подстрока `substr`, либо `false`, если нет.

Это — правильный выбор, если нам необходимо проверить, есть ли совпадение, но позиция не нужна:

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

Необязательный второй аргумент `str.includes` позволяет начать поиск с определённой позиции:

```js run
alert( "Midget".includes("id") ); // true
alert( "Midget".includes("id", 3) ); // false, поиск начат с позиции 3
```

Методы [str.startsWith](mdn:js/String/startsWith) и [str.endsWith](mdn:js/String/endsWith) проверяют, соответственно, начинается ли и заканчивается ли строка определённой строкой:

```js run
<<<<<<< HEAD
alert( "*!*Wid*/!*get".startsWith("Wid") ); // true, "Wid" — начало "Widget"
alert( "Wid*!*get*/!*".endsWith("get") ); // true, "get" — окончание "Widget"
=======
alert( "*!*Wid*/!*get".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Wid*!*get*/!*".endsWith("get") ); // true, "Widget" ends with "get"
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
```

## Получение подстроки

В JavaScript есть 3 метода для получения подстроки: `substring`, `substr` и `slice`.

`str.slice(start [, end])`
: Возвращает часть строки от `start` до (не включая) `end`.

    Например:

    ```js run
    let str = "stringify";
    // 'strin', символы от 0 до 5 (не включая 5)
    alert( str.slice(0, 5) );
    // 's', от 0 до 1, не включая 1, т. е. только один символ на позиции 0
    alert( str.slice(0, 1) );
    ```

    Если аргумент `end` отсутствует, `slice` возвращает символы до конца строки:

    ```js run
    let str = "st*!*ringify*/!*";
<<<<<<< HEAD
    alert( str.slice(2) ); // ringify, с позиции 2 и до конца
=======
    alert( str.slice(2) ); // 'ringify', from the 2nd position till the end
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
    ```

    Также для `start/end` можно задавать отрицательные значения. Это означает, что позиция определена как заданное количество символов *с конца строки*:

    ```js run
    let str = "strin*!*gif*/!*y";

<<<<<<< HEAD
    // начинаем с позиции 4 справа, а заканчиваем на позиции 1 справа
    alert( str.slice(-4, -1) ); // gif
    ```

`str.substring(start [, end])`
: Возвращает часть строки *между* `start` и `end` (не включая) `end`.

    Это — почти то же, что и `slice`, но можно задавать `start` больше `end`.  
    Если `start` больше `end`, то метод `substring` сработает так, как если бы аргументы были поменяны местами.
=======
    // start at the 4th position from the right, end at the 1st from the right
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])`
: Returns the part of the string *between* `start` and `end` (not including `end`).

    This is almost the same as `slice`, but it allows `start` to be greater than `end` (in this case it simply swaps `start` and `end` values).
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

    Например:

    ```js run
    let str = "st*!*ring*/!*ify";

    // для substring эти два примера — одинаковы
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // …но не для slice:
    alert( str.slice(2, 6) ); // "ring" (то же самое)
    alert( str.slice(6, 2) ); // "" (пустая строка)

    ```

    Отрицательные значения `substring`, в отличие от `slice`, не поддерживает, они интерпретируются как `0`.

`str.substr(start [, length])`
: Возвращает часть строки от `start` длины `length`.

    В противоположность предыдущим методам, этот позволяет указать длину вместо конечной позиции:

    ```js run
    let str = "st*!*ring*/!*ify";
<<<<<<< HEAD
    // ring, получаем 4 символа, начиная с позиции 2
    alert( str.substr(2, 4) );
=======
    alert( str.substr(2, 4) ); // 'ring', from the 2nd position get 4 characters
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
    ```

    Значение первого аргумента может быть отрицательным, тогда позиция определяется с конца:

    ```js run
    let str = "strin*!*gi*/!*fy";
<<<<<<< HEAD
    // gi, получаем 2 символа, начиная с позиции 4 с конца строки
    alert( str.substr(-4, 2) );
    ```

    Этот метод находится в [Annex B](https://tc39.es/ecma262/#sec-string.prototype.substr) спецификации языка. Это означает, что его должны поддерживать только браузерные движки JavaScript, и использовать его не рекомендуется. Но на практике он поддерживается везде.
=======
    alert( str.substr(-4, 2) ); // 'gi', from the 4th position get 2 characters
    ```

    This method resides in the [Annex B](https://tc39.es/ecma262/#sec-string.prototype.substr) of the language specification. It means that only browser-hosted Javascript engines should support it, and it's not recommended to use it. In practice, it's supported everywhere.

Let's recap these methods to avoid any confusion:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Давайте подытожим, как работают эти методы, чтобы не запутаться:

| метод | выбирает… | отрицательные значения |
|--------|-----------|-----------|
<<<<<<< HEAD
| `slice(start, end)` | от `start` до `end` (не включая `end`) | можно передавать отрицательные значения |
| `substring(start, end)` | между `start` и `end` (не включая `end`) | отрицательные значения равнозначны `0` |
| `substr(start, length)` | `length` символов, начиная от `start` | значение `start` может быть отрицательным |
=======
| `slice(start, end)` | from `start` to `end` (not including `end`) | allows negatives |
| `substring(start, end)` | between `start` and `end` (not including `end`)| negative values mean `0` |
| `substr(start, length)` | from `start` get `length` characters | allows negative `start` |
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```smart header="Какой метод выбрать?"
Все эти методы эффективно выполняют задачу. Формально у метода `substr` есть небольшой недостаток: он описан не в собственно спецификации JavaScript, а в приложении к ней — Annex B. Это приложение описывает возможности языка для использования в браузерах, существующие в основном по историческим причинам. Таким образом, в другом окружении, отличном от браузера, он может не поддерживаться. Однако на практике он работает везде.

<<<<<<< HEAD
Из двух других вариантов, `slice` более гибок, он поддерживает отрицательные аргументы, и его короче писать. Так что, в принципе, можно запомнить только его.
=======
Of the other two variants, `slice` is a little bit more flexible, it allows negative arguments and shorter to write.

So, for practical use it's enough to remember only `slice`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
```

## Сравнение строк

Как мы знаем из главы <info:comparison>, строки сравниваются посимвольно в алфавитном порядке.

Тем не менее, есть некоторые нюансы.

1. Строчные буквы больше заглавных:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Буквы, имеющие диакритические знаки, идут "не по порядку":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    Это может привести к своеобразным результатам при сортировке названий стран: нормально было бы ожидать, что `Zealand` будет после `Österreich` в списке.

<<<<<<< HEAD
Чтобы разобраться, что происходит, давайте ознакомимся с внутренним представлением строк в JavaScript.

Строки кодируются в [UTF-16](https://ru.wikipedia.org/wiki/UTF-16). Таким образом, у любого символа есть соответствующий код. Есть специальные методы, позволяющие получить символ по его коду и наоборот.

`str.codePointAt(pos)`
: Возвращает код для символа, находящегося на позиции `pos`:

    ```js run
    // одна и та же буква в нижнем и верхнем регистре
    // будет иметь разные коды
    alert( "z".codePointAt(0) ); // 122
=======
To understand what happens, we should be aware that strings in Javascript are encoded using [UTF-16](https://en.wikipedia.org/wiki/UTF-16). That is: each character has a corresponding numeric code.

There are special methods that allow to get the character for the code and back:

`str.codePointAt(pos)`
: Returns a decimal number representing the code for the character at position `pos`:

    ```js run
    // different case letters have different codes
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
    alert( "Z".codePointAt(0) ); // 90
    alert( "z".codePointAt(0) ); // 122
    alert( "z".codePointAt(0).toString(16) ); // 7a (if we need a hexadecimal value)
    ```

`String.fromCodePoint(code)`
: Создаёт символ по его коду `code`

    ```js run
    alert( String.fromCodePoint(90) ); // Z
<<<<<<< HEAD
    ```

Давайте сделаем строку, содержащую символы с кодами от `65` до `220` — это латиница и ещё некоторые распространённые символы:
=======
    alert( String.fromCodePoint(0x5a) ); // Z (we can also use a hex value as an argument)
    ```

Now let's see the characters with codes `65..220` (the latin alphabet and a little bit extra) by making a string of them:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// Output:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Как видите, сначала идут заглавные буквы, затем несколько спецсимволов, затем строчные и `Ö` ближе к концу вывода.

Теперь очевидно, почему `a > Z`.

Символы сравниваются по их кодам. Больший код — больший символ. Код `a` (97) больше кода `Z` (90).

<<<<<<< HEAD
- Все строчные буквы идут после заглавных, так как их коды больше.
- Некоторые буквы, такие как `Ö`, вообще находятся вне основного алфавита. У этой буквы код больше, чем у любой буквы от `a` до `z`.

### Правильное сравнение [#correct-comparisons]
=======
- All lowercase letters go after uppercase letters because their codes are greater.
- Some letters like `Ö` stand apart from the main alphabet. Here, its code is greater than anything from `a` to `z`.

### Correct comparisons [#correct-comparisons]
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

"Правильный" алгоритм сравнения строк сложнее, чем может показаться, так как разные языки используют разные алфавиты.

Поэтому браузеру нужно знать, какой язык использовать для сравнения.

<<<<<<< HEAD
К счастью, все современные браузеры (для IE10− нужна дополнительная библиотека [Intl.JS](https://github.com/andyearnshaw/Intl.js/)) поддерживают стандарт [ECMA 402](https://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf), обеспечивающий правильное сравнение строк на разных языках с учётом их правил.
=======
Luckily, modern browsers support the internationalization standard [ECMA-402](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/).
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Для этого есть соответствующий метод.

Вызов [str.localeCompare(str2)](mdn:js/String/localeCompare) возвращает число, которое показывает, какая строка больше в соответствии с правилами языка:

- Отрицательное число, если `str` меньше `str2`.
- Положительное число, если `str` больше `str2`.
- `0`, если строки равны.

Например:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

У этого метода есть два дополнительных аргумента, которые указаны в [документации](mdn:js/String/localeCompare). Первый позволяет указать язык (по умолчанию берётся из окружения) — от него зависит порядок букв. Второй — определить дополнительные правила, такие как чувствительность к регистру, а также следует ли учитывать различия между `"a"` и `"á"`.

<<<<<<< HEAD
## Итого

- Есть три типа кавычек. Строки, использующие обратные кавычки, могут занимать более одной строки в коде и включать выражения `${…}`.
- Строки в JavaScript кодируются в UTF-16.
- Есть специальные символы, такие как разрыв строки `\n`.
- Для получения символа используйте `[]` или метод `at`.
- Для получения подстроки используйте `slice` или `substring`.
- Для того, чтобы перевести строку в нижний или верхний регистр, используйте `toLowerCase/toUpperCase`.
- Для поиска подстроки используйте `indexOf` или `includes/startsWith/endsWith`, когда надо только проверить, есть ли вхождение.
- Чтобы сравнить строки с учётом правил языка, используйте `localeCompare`.

Строки также имеют ещё кое-какие полезные методы:

- `str.trim()` — убирает пробелы в начале и конце строки.
- `str.repeat(n)` — повторяет строку `n` раз.
- …и другие, которые вы можете найти в [справочнике](mdn:js/String).

Для строк предусмотрены методы для поиска и замены с использованием регулярных выражений. Но это отдельная большая тема, поэтому ей посвящена отдельная глава учебника <info:regular-expressions>. 

Также, на данный момент важно знать, что строки основаны на кодировке Юникод, и поэтому иногда могут возникать проблемы со сравнениями. Подробнее о Юникоде в главе <info:unicode>.
=======
## Summary

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions `${…}`.
- We can use special characters, such as a line break `\n`.
- To get a character, use: `[]` or `at` method.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.

There are several other helpful methods in strings:

- `str.trim()` -- removes ("trims") spaces from the beginning and end of the string.
- `str.repeat(n)` -- repeats the string `n` times.
- ...and more to be found in the [manual](mdn:js/String).

Strings also have methods for doing search/replace with regular expressions. But that's big topic, so it's explained in a separate tutorial section <info:regular-expressions>.

Also, as of now it's important to know that strings are based on Unicode encoding, and hence there're issues with comparisons. There's more about Unicode in the chapter <info:unicode>.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
