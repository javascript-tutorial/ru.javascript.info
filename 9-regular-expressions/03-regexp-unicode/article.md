# Юникод: флаг "u" и класс \p{...}

<<<<<<< HEAD
В JavaScript для строк используется кодировка [Юникод](https://ru.wikipedia.org/wiki/Юникод). Обычно символы кодируются с помощью 2 байтов, что позволяет закодировать максимум 65536 символов.
=======
JavaScript uses [Unicode encoding](https://en.wikipedia.org/wiki/Unicode) for strings. Most characters are encoded with 2 bytes, but that allows to represent at most 65536 characters.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Этого диапазона не хватает для того, чтобы закодировать все символы. Поэтому некоторые редкие символы кодируются с помощью 4 байтов, например `𝒳` (математический X) или `😄` (смайлик), некоторые иероглифы, и т.п.

<<<<<<< HEAD
В таблице ниже приведены юникоды нескольких символов:

| Символ  | Юникод | Количество байт в юникоде  |
=======
Here are the Unicode values of some characters:

| Character  | Unicode | Bytes count in Unicode  |
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
|------------|---------|--------|
| a | `0x0061` | 2 |
| ≈ | `0x2248` | 2 |
|𝒳| `0x1d4b3` | 4 |
|𝒴| `0x1d4b4` | 4 |
|😄| `0x1f604` | 4 |

Таким образом, символы типа `a` и `≈` занимают по 2 байта, а коды для `𝒳`, `𝒴` и `😄` - длиннее, в них 4 байта.

Когда-то давно, на момент создания языка JavaScript, кодировка Юникод была проще: символов в 4 байта не существовало. И, хотя это время давно прошло, многие строковые функции всё ещё могут работать некорректно.

Например, свойство `length` считает, что здесь два символа:

```js run
alert('😄'.length); // 2
alert('𝒳'.length); // 2
```

...Но мы видим, что только один, верно? Дело в том, что свойство `length` воспринимает 4-байтовый символ как два символа по 2 байта. Это неверно, потому что эти два символа должны восприниматься как единое целое (так называемая "суррогатная пара", вы также можете прочитать об этом в главе <info:string>).

Регулярные выражения также по умолчанию воспринимают 4-байтные "длинные символы" как пары 2-байтных. Как и со строками, это может приводить к странным результатам. Мы увидим примеры чуть позже, в главе <info:regexp-character-sets-and-ranges>.

В отличие от строк, у регулярных выражений есть специальный флаг `pattern:u`, который исправляет эту проблему. При его наличии регулярное выражение работает с 4-байтными символами правильно. И, кроме того, становится доступным поиск по юникодным свойствам, который мы рассмотрим далее.

## Юникодные свойства \p{...}

<<<<<<< HEAD
```warn header="Не поддерживается в некоторых старых браузерах"
Несмотря на то, что это часть стандарта с 2018 года, юникодные свойства не поддерживаются в Firefox до 78 версии и в Edge до 79 версии.

Существует библиотека [XRegExp](http://xregexp.com), которая реализует "расширенные" регулярные выражения с кросс-браузерной поддержкой юникодных свойств.
```

Каждому символу в кодировке Юникод соответствует множество свойств. Они описывают к какой "категории" относится символ, содержат различную информацию о нём.
=======
Every character in Unicode has a lot of properties. They describe what "category" the character belongs to, contain miscellaneous information about it.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Например, свойство `Letter` у символа означает, что это буква какого-то алфавита, причём любого. А свойство `Number` означает, что это цифра - арабская или китайская, и т.п, на каком-то из языков.

В регулярном выражении можно искать символ с заданным свойством, указав его в `pattern:\p{…}`. Для таких регулярных выражений обязательно использовать флаг `pattern:u`.

<<<<<<< HEAD
Например, `pattern:\p{Letter}` обозначает букву в любом языке. Также можно использовать запись `pattern:\p{L}`, так как `L` - это псевдоним `Letter`. Существуют короткие записи почти для всех свойств.

В примере ниже будут найдены английская, грузинская и корейская буквы:
=======
For instance, `\p{Letter}` denotes a letter in any language. We can also use `\p{L}`, as `L` is an alias of `Letter`. There are shorter aliases for almost every property.

In the example below three kinds of letters will be found: English, Georgian and Korean.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js run
let str = "A ბ ㄱ";

alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
<<<<<<< HEAD
alert( str.match(/\p{L}/g) ); // null (ничего не нашло, так как нет флага "u")
```

Вот основные категории символов и их подкатегории:

- Буквы `L`:
  - в нижнем регистре `Ll`,
  - модификаторы `Lm`,
  - заглавные буквы `Lt`,
  - в верхнем регистре `Lu`,
  - прочие `Lo`.
- Числа `N`:
  - десятичная цифра `Nd`,
  - цифры обозначаемые буквами (римские) `Nl`,
  - прочие `No`.
- Знаки пунктуации `P`:
  - соединители `Pc`,
  - тире `Pd`,
  - открывающие кавычки `Pi`,
  - закрывающие кавычки `Pf`,
  - открывающие скобки `Ps`,
  - закрывающие скобки `Pe`,
  - прочее `Po`.
- Отметки `M` (например, акценты):
  - двоеточия `Mc`,
  - вложения `Me`,
  - апострофы `Mn`.
- Символы `S`:
  - валюты `Sc`, модификаторы `Sk`, математические `Sm`, прочие `So`.
- Разделители `Z`:
  - линия `Zl`,
  - параграф `Zp`,
  - пробел `Zs`.
- Прочие `C`:
  - контрольные `Cc`,
  - форматирование `Cf`,
  - не назначенные `Cn`,
  - для приватного использования `Co`,
  - суррогаты `Cs`.

Так что, например, если нам нужны буквы в нижнем регистре, то можно написать `pattern:\p{Ll}`, знаки пунктуации: `pattern:\p{P}` и так далее.

Есть и другие категории -- производные, например:
- `Alphabetic` (`Alpha`), включающая в себя буквы `L`, плюс "буквенные цифры" `Nl` (например Ⅻ - символ для римской записи числа 12), и некоторые другие символы `Other_Alphabetic` (`OAlpha`).
- `Hex_Digit` включает символы для шестнадцатеричных чисел: `0-9`, `a-f`.
- И так далее.

Юникод поддерживает много различных свойств, их полное перечисление потребовало бы очень много места, поэтому вот ссылки:

- По символу посмотреть его свойства: <https://unicode.org/cldr/utility/character.jsp>.
- По свойству посмотреть символы с ним: <https://unicode.org/cldr/utility/list-unicodeset.jsp>.
- Короткие псевдонимы для свойств: <https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt>.
- Полная база Юникод-символов в текстовом формате вместе со всеми свойствами, находится здесь: <https://www.unicode.org/Public/UCD/latest/ucd/>.

### Пример: шестнадцатеричные числа

Например, давайте поищем шестнадцатеричные числа, записанные в формате `xFF`, где вместо `F` может быть любая шестнадцатеричная цифра (0..1 или A..F).

Шестнадцатеричная цифра может быть обозначена как `pattern:\p{Hex_Digit}`:
=======
alert( str.match(/\p{L}/g) ); // null (no matches, \p doesn't work without the flag "u")
```

Here's the main character categories and their subcategories:

- Letter `L`:
  - lowercase `Ll`
  - modifier `Lm`,
  - titlecase `Lt`,
  - uppercase `Lu`,
  - other `Lo`.
- Number `N`:
  - decimal digit `Nd`,
  - letter number `Nl`,
  - other `No`.
- Punctuation `P`:
  - connector `Pc`,
  - dash `Pd`,
  - initial quote `Pi`,
  - final quote `Pf`,
  - open `Ps`,
  - close `Pe`,
  - other `Po`.
- Mark `M` (accents etc):
  - spacing combining `Mc`,
  - enclosing `Me`,
  - non-spacing `Mn`.
- Symbol `S`:
  - currency `Sc`,
  - modifier `Sk`,
  - math `Sm`,
  - other `So`.
- Separator `Z`:
  - line `Zl`,
  - paragraph `Zp`,
  - space `Zs`.
- Other `C`:
  - control `Cc`,
  - format `Cf`,
  - not assigned `Cn`,
  - private use `Co`,
  - surrogate `Cs`.


So, e.g. if we need letters in lower case, we can write `pattern:\p{Ll}`, punctuation signs: `pattern:\p{P}` and so on.

There are also other derived categories, like:
- `Alphabetic` (`Alpha`), includes Letters `L`, plus letter numbers `Nl` (e.g. Ⅻ - a character for the roman number 12), plus some other symbols `Other_Alphabetic` (`OAlpha`).
- `Hex_Digit` includes hexadecimal digits: `0-9`, `a-f`.
- ...And so on.

Unicode supports many different properties, their full list would require a lot of space, so here are the references:

- List all properties by a character: <https://unicode.org/cldr/utility/character.jsp>.
- List all characters by a property: <https://unicode.org/cldr/utility/list-unicodeset.jsp>.
- Short aliases for properties: <https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt>.
- A full base of Unicode characters in text format, with all properties, is here: <https://www.unicode.org/Public/UCD/latest/ucd/>.

### Example: hexadecimal numbers

For instance, let's look for hexadecimal numbers, written as `xFF`, where `F` is a hex digit (0..9 or A..F).

A hex digit can be denoted as `pattern:\p{Hex_Digit}`:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js run
let regexp = /x\p{Hex_Digit}\p{Hex_Digit}/u;

alert("число: xAF".match(regexp)); // xAF
```

### Пример: китайские иероглифы

Поищем китайские иероглифы.

<<<<<<< HEAD
В Юникоде есть свойство `Script` (система написания), которое может иметь значения `Cyrillic` (Кириллическая), `Greek` (Греческая), `Arabic` (Арабская), `Han` (Китайская) и так далее, [здесь полный список](https://en.wikipedia.org/wiki/Script_(Unicode)).
=======
There's a Unicode property `Script` (a writing system), that may have a value: `Cyrillic`, `Greek`, `Arabic`, `Han` (Chinese) and so on, [here's the full list](https://en.wikipedia.org/wiki/Script_(Unicode)).
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Для поиска символов в нужной системе мы должны установить `pattern:Script=<значение>`, например для поиска кириллических букв: `pattern:\p{sc=Cyrillic}`, для китайских иероглифов: `pattern:\p{sc=Han}`, и так далее:

```js run
let regexp = /\p{sc=Han}/gu; // вернёт китайские иероглифы

let str = `Hello Привет 你好 123_456`;

alert( str.match(regexp) ); // 你,好
```

### Пример: валюта

<<<<<<< HEAD
Символы, обозначающие валюты, такие как `$`, `€`, `¥` и другие, имеют свойство `pattern:\p{Currency_Symbol}`, короткая запись `pattern:\p{Sc}`.
=======
Characters that denote a currency, such as `$`, `€`, `¥`, have Unicode property  `pattern:\p{Currency_Symbol}`, the short alias: `pattern:\p{Sc}`.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Используем его, чтобы поискать цены в формате "валюта, за которой идёт цифра":

```js run
let regexp = /\p{Sc}\d/gu;

let  str = `Цены: $2, €1, ¥9`;

alert( str.match(regexp) ); // $2,€1,¥9
```

Позже, в главе <info:regexp-quantifiers> мы изучим, как искать числа из любого количества цифр.

## Итого

Флаг `pattern:u` включает поддержку Юникода в регулярных выражениях.

Конкретно, это означает, что:

1. Символы из 4 байт воспринимаются как единое целое, а не как два символа по 2 байта.
2. Работает поиск по юникодным свойствам `pattern:\p{…}`.

С помощью юникодных свойств мы можем искать слова на нужных языках, специальные символы (кавычки, обозначения валюты) и так далее.
