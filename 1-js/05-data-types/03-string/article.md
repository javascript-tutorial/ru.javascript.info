# Строки

В JavaScript любые текстовые данные являются строками. Не существует отдельного типа «символ», который есть в ряде других языков.

Внутренний формат для строк — всегда [UTF-16](https://ru.wikipedia.org/wiki/UTF-16), вне зависимости от кодировки страницы.

## Кавычки

В JavaScript есть разные типы кавычек.

Строку можно создать с помощью одинарных и двойных кавычек, а также обратных апострофов:

```js
let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`;
```

Одинарные и двойные кавычки при этом используются для обычных строк, а если взять строку в обратные апострофы, то в такой строке может содержаться любое выражение, включая вызовы функций:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Ещё одна интересная особенность строк, использующих обратные апострофы, в том, что они могут быть многострочными:

```js run
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // список гостей, состоящий из нескольких строк
```

Если попытаться использовать точно так же одинарные или двойные кавычки, то будет ошибка:
```js run
let guestList = "Guests:  // Error: Unexpected token ILLEGAL
  * John";
```

Одинарные и двойные кавычки в языке с незапамятных времён: тогда потребность в многострочных строках не учитывалась. Что касается обратных апострофов, они появились существенно позже и поэтому они гибче.

Обратные апострофы также позволяют задавать «шаблонную функцию» перед первым обратным апострофом. Используемый синтаксис: <code>func&#96;string&#96;</code>. Автоматически вызываемая функция `func` получает строку и встроенные в неё выражения и может их обработать. Подробнее об этом можно прочитать в [документации](mdn:/JavaScript/Reference/Template_literals#Tagged_template_literals). Если перед строкой есть выражение, то шаблонная строка называется «теговым шаблоном». Это позволяет упростить шаблонизацию и легче манипулировать строками, но сейчас эта возможность используется редко.


## Спецсимволы

Многострочные строки возможно создавать и с помощью одинарных кавычек, используя так называемый символ переноса строки, который пишется `\n` и обозначает перенос строки:

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // список гостей, состоящий из нескольких строк
```

Например, здесь в первом и втором примере мы получим одинаковое сообщение:

```js run
// перенос строки добавлен с помощью символа переноса строки
alert( "Hello\nWorld" );

// многострочная строка, созданная с использованием обратных апострофов
alert( `Hello
World` );
```

Ничего также не мешает добавлять и любые другие спецсимволы. Вот несколько примеров:

| Character | Description |
|-----------|-------------|
|`\b`|Backspace|
|`\f`|Form feed|
|`\n`|New line|
|`\r`|Carriage return|
|`\t`|Tab|
|`\uNNNN`|Символ в кодировке Юникод с шестнадцатеричным кодом `NNNN`, например, `\u00A9` — юникодное представление знака копирайта, `©`. Код должен состоять ровно из 4 шестнадцатеричных цифр. |
|`\u{NNNNNNNN}`|Некоторые редкие символы кодируются двумя юникодными символами, занимая до 4 байтов. В таких случаях код необходимо поместить в фигурные скобки.|

Примеры с Юникодом:

```js run
// ©
alert( "\u00A9" );

// Длинные юникодные коды
// 佫, редкий китайский иероглиф
alert( "\u{20331}" );
// 😍, лицо с улыбкой и глазами в форме сердец
alert( "\u{1F60D}" );
```

Все спецсимволы начинаются с обратного слэша, `\`. Он также называется «символом экранирования».

Он также используется, если необходимо вставить в строку кавычку.

К примеру:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Здесь перед входящей внутрь строки кавычкой необходимо добавить обратный слэш — `\'` — иначе она бы обозначала окончание строки.

Разумеется, это относится только к кавычкам, соответствующим тем, в которые окружена строка. Так что мы можем применить и более элегантное решение, использовав для этой строки двойные кавычки или обратные слэши:

```js run
alert( `I'm the Walrus!` ); // I'm the Walrus!
```

Надо отметить, что обратный слэш служит лишь для корректного прочтения строки интерпретатором, но он не записывается в строку после её прочтения. Когда строка сохраняется в оперативную память, в неё не добавляется символ `\`. Это можно легко продемонстрировать с помощью `alert` в примерах выше.

Но что, если нам надо добавить в строку обратный слэш?

Это можно сделать, добавив перед ним… ещё один обратный слэш!

```js run
alert( `The backslash: \\` ); // The backslash: \
```

## Длина строки


Свойство `length` показывает длину строки:

```js run
alert( `My\n`.length ); // 3
```

Обратите внимание, `\n` — это спецсимвол, поэтому тут всё правильно: длина строки `3`.

```warn header="`length` — это свойство"
Бывает так, что люди с практикой в других языках случайно пытаются вызвать length, добавляя круглые скобки: они пишут `str.length()` вместо `str.length`. Это не работает.

Запомните, `str.length` — это числовое свойство, а не функция. Поэтому добавлять скобки не нужно.
```

## Доступ к символам

Получить символ, который занимает позицию `pos`, можно с помощью квадратных скобок: `[pos]`. Также можно использовать метод `charAt`: [str.charAt(pos)](mdn:js/String/charAt). Первый символ занимает нулевую позицию:

```js run
let str = `Hello`;

// получаем первый символ
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// получаем последний символ
alert( str[str.length - 1] ); // o
```

Квадратные скобки — современный способ получить символ, в то время как `charAt` существует в основном по историческим причинам.

Разница только в том, что если символ с такой позицией отсутствует, тогда `[]` вернёт `undefined`, а `charAt` — пустую строку:

```js run
let str = `Hello`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (пустая строка)
```

Также можно проитерировать строку посимвольно, используя `for..of`:

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char — сначала "H", потом "e", потом "l" и т. д.)
}
```

## Строки неизменяемы


Содержимое строки в JavaScript нельзя изменить. Нельзя взять символ посередине и заменить его. Как только строка создана — она такая навсегда.

Давайте продемонстрируем, что это не работает:

```js run
let str = 'Hi';

str[0] = 'h'; // ошибка
alert( str[0] ); // не работает
```

Можно создать новую строку и записать её в ту же самую переменную вместо старой.

Например:

```js run
let str = 'Hi';

str = 'h' + str[1];  // заменяем строку

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

```js
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

Необязательный второй аргумент позволяет начать поиск с определённой позиции.

Например, первое вхождение `"id"` — на позиции `1`. Для того, чтобы найти следующее, начнём поиск с позиции `2`:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

Чтобы найти все вхождения подстроки, нужно запустить `indexOf` в цикле. Каждый раз, получив очередную позицию, начинаем следующий поиск со следующей:


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

Есть некоторое неудобство с `indexOf` в условии `if`. Такое условие не будет работать:

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

````smart header="Фокус с побитовым НЕ"
Существует старый фокус с использованием [побитового оператора НЕ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) — `~`. Он преобразует число в 32-разрядное целое со знаком — signed 32-bit integer. Десятичная дробь, в случае, если она присутствует, отбрасывается. Все биты числа инвертируются.

Для 32-разрядных целых `~n` означает то же, что `-(n+1)` (согласно формату IEEE-754).

В частности:

```js run
alert( ~2 ); // -3, то же, что -(2+1)
alert( ~1 ); // -2, то же, что -(1+1)
alert( ~0 ); // -1, то же, что -(0+1)
*!*
alert( ~-1 ); // 0, the same as -(-1+1)
*/!*
```

Таким образом, `~n` равняется 0 только при `n == -1`.

Соответственно, проверка `if ( ~str.indexOf("...") )` означает, что результат `indexOf` отличен от `-1`, совпадение есть.

Это можно использовать, чтобы сделать проверку `indexOf` компактнее:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Совпадение есть' ); // работает
}
```

Обычно использовать возможности языка каким-либо неочевидным образом не рекомендуется, но этот фокус широко используется в старом коде, поэтому его важно понимать.

Просто запомните: `if (~str.indexOf(...))` означает «если найдено».
````

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
alert( "Widget".startsWith("Wid") ); // true, "Wid" — начало "Widget"
alert( "Widget".endsWith("get") ); // true, "get" — окончание "Widget"
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
    alert( str.slice(2) ); // ringify, просто отбросили всё, что до позиции `2`
    ```

    Также для `start/end` можно задавать отрицательные значения. Это означает, что позиция определена как некоторое количество символов с конца строки:

    ```js run
    let str = "strin*!*gif*/!*y";

    // начинаем с позиции 4 справа, а заканчиваем на позиции 1 справа
    alert( str.slice(-4, -1) ); // gif
    ```


`str.substring(start [, end])`
: Возвращает часть строки *между* `start` и `end`.

    Это — почти то же, что и `slice`, но можно задавать `start` больше `end`.

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

    Отрицательные значения `substring`, в отличие от `slice`, не поддерживает, они равнозначны `0`.


`str.substr(start [, length])`
: Возвращает часть строки от `start` длины `length`.

    В противоположность предыдущим методам, этот позволяет указать длину вместо конечной позиции:

    ```js run
    let str = "st*!*ring*/!*ify";
    // ring, получаем 4 символа начиная с позиции 2
    alert( str.substr(2, 4) );
    ```

    Значение первого аргумента может быть отрицательным, тогда позиция определяется с конца:

    ```js run
    let str = "strin*!*gi*/!*fy";
    // gi, получаем 2 символа начиная с позиции 4 с конца строки
    alert( str.substr(-4, 2) );
    ```

Давайте прорезюмируем, как работают эти методы, чтобы было проще не запутаться:

| метод | выбирает… | отрицательные значения |
|--------|-----------|-----------|
| `slice(start, end)` | от `start` до `end` (не включая `end`) | можно передавать отрицательные значения |
| `substring(start, end)` | между `start` и `end` | отрицательные значения равнозначны `0` |
| `substr(start, length)` | `length` символов начиная от `start` | значение `start` может быть отрицательным |


```smart header="Какой метод выбрать?"
Все эти методы эффективно выполняют задачу. Формально у метода `substr` есть небольшой недостаток: он описан не в собственно спецификации JavaScript, а в приложении к ней — Annex B. Это приложение описывает возможности языка для использования в браузерах, существующие в основном по историческим причинам. Таким образом, в другом окружении, отличном от браузера, он может не поддерживаться. Однако на практике он работает везде.

Автор учебника в основном предпочитает использовать `slice`.
```

## Comparing strings

As we know from the chapter <info:comparison>, strings are compared character-by-character in alphabetical order.

Although, there are some oddities.

1. A lowercase letter is always greater than the uppercase:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Letters with diacritical marks are "out of order":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    This may lead to strange results if we sort these country names. Usually people would expect `Zealand` to come after `Österreich` in the list.

To understand what happens, let's review the internal representation of strings in JavaScript.

All strings are encoded using [UTF-16](https://en.wikipedia.org/wiki/UTF-16). That is: each character has a corresponding numeric code. There are special methods that allow to get the character for the code and back.

`str.codePointAt(pos)`
: Returns the code for the character at position `pos`:

    ```js run
    // different case letters have different codes
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: Creates a character by its numeric `code`

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

    We can also add unicode characters by their codes using `\u` followed by the hex code:

    ```js run
    // 90 is 5a in hexadecimal system
    alert( '\u005a' ); // Z
    ```

Now let's see the characters with codes `65..220` (the latin alphabet and a little bit extra) by making a string of them:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

See? Capital characters go first, then a few special ones, then lowercase characters.

Now it becomes obvious why `a > Z`.

The characters are compared by their numeric code. The greater code means that the character is greater. The code for `a` (97) is greater than the code for `Z` (90).

- All lowercase letters go after uppercase letters because their codes are greater.
- Some letters like `Ö` stand apart from the main alphabet. Here, it's code is greater than anything from `a` to `z`.


### Correct comparisons

The "right" algorithm to do string comparisons is more complex than it may seem, because alphabets are different for different languages. The same-looking letter may be located differently in different alphabets.

So, the browser needs to know the language to compare.

Luckily, all modern browsers (IE10- requires the additional library [Intl.JS](https://github.com/andyearnshaw/Intl.js/)) support the internationalization standard [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

It provides a special method to compare strings in different languages, following their rules.

The call [str.localeCompare(str2)](mdn:js/String/localeCompare):

- Returns `1` if `str` is greater than `str2` according to the language rules.
- Returns `-1` if `str` is less than `str2`.
- Returns `0` if they are equal.

For instance:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

This method actually has two additional arguments specified in [the documentation](mdn:js/String/localeCompare), which allows it to specify the language (by default taken from the environment) and setup additional rules like case sensitivity or should `"a"` and `"á"` be treated as the same etc.

## Internals, Unicode

```warn header="Advanced knowledge"
The section goes deeper into string internals. This knowledge will be useful for you if you plan to deal with emoji, rare mathematical or hieroglyphic characters or other rare symbols.

You can skip the section if you don't plan to support them.
```

### Surrogate pairs

Most symbols have a 2-byte code. Letters in most european languages, numbers, and even most hieroglyphs, have a 2-byte representation.

But 2 bytes only allow 65536 combinations and that's not enough for every possible symbol. So rare symbols are encoded with a pair of 2-byte characters called "a surrogate pair".

The length of such symbols is `2`:

```js run
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare chinese hieroglyph
```

Note that surrogate pairs did not exist at the time when JavaScript was created, and thus are not correctly processed by the language!

We actually have a single symbol in each of the strings above, but the `length` shows a length of `2`.

`String.fromCodePoint` and `str.codePointAt` are few rare methods that deal with surrogate pairs right. They recently appeared in the language. Before them, there were only [String.fromCharCode](mdn:js/String/fromCharCode) and [str.charCodeAt](mdn:js/String/charCodeAt). These methods are actually the same as `fromCodePoint/codePointAt`, but don't work with surrogate pairs.

But, for instance, getting a symbol can be tricky, because surrogate pairs are treated as two characters:

```js run
alert( '𝒳'[0] ); // strange symbols...
alert( '𝒳'[1] ); // ...pieces of the surrogate pair
```

Note that pieces of the surrogate pair have no meaning without each other. So the alerts in the example above actually display garbage.

Technically, surrogate pairs are also detectable by their codes: if a character has the code in the interval of `0xd800..0xdbff`, then it is the first part of the surrogate pair. The next character (second part) must have the code in interval `0xdc00..0xdfff`. These intervals are reserved exclusively for surrogate pairs by the standard.

In the case above:

```js run
// charCodeAt is not surrogate-pair aware, so it gives codes for parts

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, between 0xd800 and 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, between 0xdc00 and 0xdfff
```

You will find more ways to deal with surrogate pairs later in the chapter <info:iterable>. There are probably special libraries for that too, but nothing famous enough to suggest here.

### Diacritical marks and normalization

In many languages there are symbols that are composed of the base character with a mark above/under it.

For instance, the letter `a` can be the base character for: `àáâäãåā`. Most common "composite" character have their own code in the UTF-16 table. But not all of them, because there are too many possible combinations.

To support arbitrary compositions, UTF-16 allows us to use several unicode characters. The base character and one or many "mark" characters that "decorate" it.

For instance, if we have `S` followed by the special "dot above" character (code `\u0307`), it is shown as Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

If we need an additional mark above the letter (or below it) -- no problem, just add the necessary mark character.

For instance, if we append a character "dot below" (code `\u0323`), then we'll have "S with dots above and below": `Ṩ`.

For example:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

This provides great flexibility, but also an interesting problem: two characters may visually look the same, but be represented with different unicode compositions.

For instance:

```js run
alert( 'S\u0307\u0323' ); // Ṩ, S + dot above + dot below
alert( 'S\u0323\u0307' ); // Ṩ, S + dot below + dot above

alert( 'S\u0307\u0323' == 'S\u0323\u0307' ); // false
```

To solve this, there exists a "unicode normalization" algorithm that brings each string to the single "normal" form.

It is implemented by [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

It's funny that in our situation `normalize()` actually brings together a sequence of 3 characters to one: `\u1e68` (S with two dots).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

In reality, this is not always the case. The reason being that the symbol `Ṩ` is "common enough", so UTF-16 creators included it in the main table and gave it the code.

If you want to learn more about normalization rules and variants -- they are described in the appendix of the Unicode standard: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), but for most practical purposes the information from this section is enough.


## Summary

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions.
- Strings in JavaScript are encoded using UTF-16.
- We can use special characters like `\n` and insert letters by their unicode using `\u...`.
- To get a character, use: `[]`.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.

There are several other helpful methods in strings:

- `str.trim()` -- removes ("trims") spaces from the beginning and end of the string.
- `str.repeat(n)` -- repeats the string `n` times.
- ...and more. See the [manual](mdn:js/String) for details.

Strings also have methods for doing search/replace with regular expressions. But that topic deserves a separate chapter, so we'll return to that later.
