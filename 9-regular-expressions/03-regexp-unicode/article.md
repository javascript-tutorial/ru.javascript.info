# Юникод: флаг "u" и класс \p{...}

<<<<<<< HEAD
В JavaScript для строк используется кодировка [Юникод](https://ru.wikipedia.org/wiki/Юникод). Обычно символы кодируются с помощью 2 байтов, что позволяет закодировать максимум 65536 символов.
=======
JavaScript uses [Unicode encoding](https://en.wikipedia.org/wiki/Unicode) for strings. Most characters are encoded with 2 bytes, but that allows to represent at most 65536 characters.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Этого диапазона не хватает для того, чтобы закодировать все символы. Поэтому некоторые редкие символы кодируются с помощью 4 байтов, например `𝒳` (математический X) или `😄` (смайлик), некоторые иероглифы, и т.п.

<<<<<<< HEAD
В таблице ниже приведены Юникоды нескольких символов:

| Символ  | Юникод | Количество байт в Юникоде  |
=======
Here are the Unicode values of some characters:

| Character  | Unicode | Bytes count in Unicode  |
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
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

В отличие от строк, у регулярных выражений есть специальный флаг `pattern:u`, который исправляет эту проблему. При его наличии регулярное выражение работает с 4-байтными символами правильно. И, кроме того, становится доступным поиск по Юникодным свойствам, который мы рассмотрим далее.

## Юникодные свойства \p{...}

<<<<<<< HEAD
Каждому символу в кодировке Юникод соответствует множество свойств. Они описывают к какой "категории" относится символ, содержат различную информацию о нём.

Например, свойство `Letter` у символа означает, что это буква какого-то алфавита, причём любого. А свойство `Number` означает, что это цифра: возможно, арабская или китайская, и т.д.

В регулярном выражении можно искать символ с заданным свойством, указав его в `pattern:\p{…}`. Для таких регулярных выражений обязательно использовать флаг `pattern:u`.
=======
Every character in Unicode has a lot of properties. They describe what "category" the character belongs to, contain miscellaneous information about it.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Например, `\p{Letter}` обозначает букву в любом языке. Также можно использовать запись `\p{L}`, так как `L` - это псевдоним `Letter`. Существуют короткие записи почти для всех свойств.

<<<<<<< HEAD
В примере ниже будут найдены английская, грузинская и корейская буквы:
=======
We can search for characters with a property, written as `pattern:\p{…}`. To use `pattern:\p{…}`, a regular expression must have flag `pattern:u`.

For instance, `\p{Letter}` denotes a letter in any language. We can also use `\p{L}`, as `L` is an alias of `Letter`. There are shorter aliases for almost every property.

In the example below three kinds of letters will be found: English, Georgian and Korean.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js run
let str = "A ბ ㄱ";

alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
<<<<<<< HEAD
alert( str.match(/\p{L}/g) ); // null (ничего не нашло, так как \p не работает без флага "u")
=======
alert( str.match(/\p{L}/g) ); // null (no matches, \p doesn't work without the flag "u")
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```

Вот основные категории символов и их подкатегории:

<<<<<<< HEAD
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
  - валюты `Sc`,
  - модификаторы `Sk`, 
  - математические `Sm`, 
  - прочие `So`.
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
=======
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
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

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

Например, давайте поищем шестнадцатеричные числа, записанные в формате `xFF`, где вместо `F` может быть любая шестнадцатеричная цифра (0..9 или A..F).

<<<<<<< HEAD
Шестнадцатеричная цифра может быть обозначена как `pattern:\p{Hex_Digit}`:
=======
For instance, let's look for hexadecimal numbers, written as `xFF`, where `F` is a hex digit (0..9 or A..F).

A hex digit can be denoted as `pattern:\p{Hex_Digit}`:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

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
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Для поиска символов в нужной системе мы должны установить `pattern:Script=<значение>`, например для поиска кириллических букв: `pattern:\p{sc=Cyrillic}`, для китайских иероглифов: `pattern:\p{sc=Han}`, и так далее:

```js run
let regexp = /\p{sc=Han}/gu; // вернёт китайские иероглифы

let str = `Hello Привет 你好 123_456`;

alert( str.match(regexp) ); // 你,好
```

### Пример: валюта

<<<<<<< HEAD
Символы, обозначающие валюты, такие как `$`, `€`, `¥`, имеют свойство `pattern:\p{Currency_Symbol}`, короткая запись: `pattern:\p{Sc}`.
=======
Characters that denote a currency, such as `$`, `€`, `¥`, have Unicode property  `pattern:\p{Currency_Symbol}`, the short alias: `pattern:\p{Sc}`.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Используем его, чтобы поискать цены в формате "валюта, за которой идёт цифра":

```js run
let regexp = /\p{Sc}\d/gu;

<<<<<<< HEAD
let  str = `Цены: $2, €1, ¥9`;
=======
let str = `Prices: $2, €1, ¥9`;
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

alert( str.match(regexp) ); // $2,€1,¥9
```

Позже, в главе <info:regexp-quantifiers> мы изучим, как искать числа из любого количества цифр.

## Итого

Флаг `pattern:u` включает поддержку Юникода в регулярных выражениях.

Конкретно, это означает, что:

1. Символы из 4 байт воспринимаются как единое целое, а не как два символа по 2 байта.
2. Работает поиск по Юникодным свойствам `\p{…}`.

С помощью Юникодных свойств мы можем искать слова на нужных языках, специальные символы (кавычки, обозначения валюты) и так далее.
