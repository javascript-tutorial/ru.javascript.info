# Классы символов

Рассмотрим практическую задачу - у нас есть номер телефона `"+7 (903) -123-45-67"`, и нам нужно превратить его в строку только из чисел: `79035419441`.

Для этого мы можем найти и удалить все, что не является числом. Классы символов могут помочь с этим.

Класс символов - это специальное обозначение, которое соответствует любому символу из определенного набора.

Для начала давайте рассмотрим класс "цифр". Он обозначается как `\d`. Мы помещаем это обозначение в регулярное выражение, что соответствует "любой одной цифре".

Например, давайте найдем первую цифру в номере телефона:

```js run
let str = "+7(903)-123-45-67";

let reg = /\d/;

alert( str.match(reg) ); // 7
```

Без флага `g` регулярное выражение ищет только первое совпадение, то есть первую цифру `\ d`.

Давайте добавим флаг `g`, чтобы найти все цифры:

```js run
let str = "+7(903)-123-45-67";

let reg = /\d/g;

alert( str.match(reg) ); // массив совпадений: 7,9,0,3,1,2,3,4,5,6,7

alert( str.match(reg).join('') ); // 79035419441
```

Это был класс символов для цифр. Есть и другие подобные классы.

Наиболее используемые:

`\d` ("d": от английского "digit" – "цифра")
: Цифра: символ от `0` до `9`.

`\s` ("s": от английского "space" – "пробел")
: Символ пробела: включает пробелы, символы табуляции, переводы строк.

`\w` ("w": от английского "word" – "слово")
: Символ «слова», а точнее – буква латинского алфавита или цифра или подчёркивание '_'. Не-английские буквы не являются частью `\w`, то есть русская буква не подходит.

Для примера, `pattern:\d\s\w` обозначает цифру, за которой идёт пробельный символ, а затем символ слова, как в строке `"1 a"`.

**Регулярное выражение может содержать как обычные символы, так и классы символов.**

Например, `pattern:CSS\d` соответствует строке` match:CSS` с цифрой после нее:

```js run
let str = "Стандарт CSS4 - это здорово";
let reg = /CSS\d/

alert( str.match(reg) ); // CSS4
```

Также мы можем использовать несколько классов символов одновременно:

```js run
alert( "Я люблю HTML5!".match(/\s\w\w\w\w\d/) ); // 'HTML5'
```

Соответствие (каждому классу символов соответствует один символ результата):

![](love-html5-classes.png)

## Граница слова: \b

Граница слова `pattern:\b` - это специальный символьный класс.

Он обозначает не какой-то конкретный символ, а границу между символами.

Например, `pattern:\bJava\b` соответствует` match:Java` в строке `subject:Hello,Java!`, но не в сценарии `subject: Hello, JavaScript!`.

```js run
alert( "Привет, Java!".match(/\bJava\b/) ); // Java
alert( "Привет, JavaScript!".match(/\bJava\b/) ); // null
```

Граница имеет "нулевую ширину" в том смысле, что обычно класс символов означает символ в результате (например, символ или цифру), но не в этом случае.

Граница – это проверка.

Когда механизм регулярных выражений выполняет поиск, он перемещается по строке в попытке найти совпадение. В каждой позиции строки он пытается найти шаблон.

Когда шаблон содержит `pattern:\b`, он проверяет, что позиция в строке является границей слова, то есть одним из трех вариантов:

- Внутри текста, если с одной стороны `\w`, а с другой – не `\w`.
- Начало текста, если первый символ `\w`.
- Конец текста, если последний символ `\w`.

Например, в строке `subject:Привет, Java!` Следующие позиции соответствуют `\b`:

![](hello-java-boundaries.png)

Так что это соответствует `pattern:\bПривет\b`, потому что:

1. В начале строки совпадает первый тест `\b`.
2. Далее слово `Привет` совпадает.
3. Далее `\b` снова совпадает, так как мы находимся между `т` и пробелом.

Pattern `pattern:\bJava\b` also matches. But not `pattern:\bHell\b` (because there's no word boundary after `l`) and not `Java!\b` (because the exclamation sign is not a wordly character, so there's no word boundary after it).
Pattern `pattern:\bJava\b` также совпадает. Но не `pattern:\bПривед\b` (потому что после `д` нет границы слова), и не `Java!\b` (потому что восклицательный знак не является словесным символом, поэтому после него нет границы слова).


```js run
alert( "Привет, Java!".match(/\bПривет\b/) ); // Привет
alert( "Привет, Java!".match(/\bJava\b/) );  // Java
alert( "Привет, Java!".match(/\bПривед\b/) );  // null (no match)
alert( "Привет, Java!".match(/\bJava!\b/) ); // null (no match)
```

Еще раз отметим, что `pattern:\b` заставляет поисковую систему проверять границы, поэтому `pattern:Java\b` находит `match:Java` только тогда, когда за ней следует граница слова, но не добавляет этот символ к результату.

Обычно мы используем `\b`, чтобы найти отдельные английские слова. Таким образом, если нам нужен `"Java"` язык, то `pattern:\bJava\b` находит только отдельное слово и игнорирует его, когда оно является частью `"JavaScript"`.

Другой пример: регулярное выражение `pattern:\b\d\d\b` ищет отдельностоящие двузначные числа. Другими словами, требуется, чтобы до и после `pattern:\d\d` был символ, отличный от `\w` (или начала/конца строки)

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
```

```warn header="Граница слова не работает для неанглийских алфавитов"
Проверка границы слова `\b` проверяет границу между `\w` и чем-то еще. Но `\w` означает английскую букву (или цифру или знак подчеркивания), поэтому тест не будет работать для других символов (например, кириллицы или иероглифов).
```


## Обратные классы

Для каждого класса символов существует "обратный класс", обозначаемый той же буквой, но в верхнем регистре.

"Обратный" означает, что он соответствует всем другим символам, например:

`\D`
: Не цифра: любой символ, кроме `\d`, например буква.

`\S`
: Не пробел: любой символ, кроме `\s`, например буква.

`\W`
: Любой символ, кроме `\w`, то есть не латинница, не подчёркивание, не цифра. В частности, русские буквы принадлежат этому классу.

`\B`
: Проверка, обратная `\b`.

В начале главы мы увидели, как получить все цифры из строки с номером телефона `subject:+7(903)-123-45-67`.

Один из способов - это сопоставить все цифры и соединить их:

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

Альтернативный, более короткий путь - найти нецифровые символы `\D` и удалить их из строки:


```js run
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

## Spaces are regular characters

Usually we pay little attention to spaces. For us strings `subject:1-5` and `subject:1 - 5` are nearly identical.

But if a regexp doesn't take spaces into account, it may fail to work.

Let's try to find digits separated by a dash:

```js run
alert( "1 - 5".match(/\d-\d/) ); // null, no match!
```

Here we fix it by adding spaces into the regexp `pattern:\d - \d`:

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, now it works
```

**A space is a character. Equal in importance with any other character.**

Of course, spaces in a regexp are needed only if we look for them. Extra spaces (just like any other extra characters) may prevent a match:

```js run
alert( "1-5".match(/\d - \d/) ); // null, because the string 1-5 has no spaces
```

In other words, in a regular expression all characters matter, spaces too.

## A dot is any character

The dot `"."` is a special character class that matches "any character except a newline".

For instance:

```js run
alert( "Z".match(/./) ); // Z
```

Or in the middle of a regexp:

```js run
let reg = /CS.4/;

alert( "CSS4".match(reg) ); // CSS4
alert( "CS-4".match(reg) ); // CS-4
alert( "CS 4".match(reg) ); // CS 4 (space is also a character)
```

Please note that the dot means "any character", but not the "absense of a character". There must be a character to match it:

```js run
alert( "CS4".match(/CS.4/) ); // null, no match because there's no character for the dot
```

### The dotall "s" flag

Usually a dot doesn't match a newline character.

For instance, this doesn't match:

```js run
alert( "A\nB".match(/A.B/) ); // null (no match)

// a space character would match
// or a letter, but not \n
```

Sometimes it's inconvenient, we really want "any character", newline included.

That's what `s` flag does. If a regexp has it, then the dot `"."` match literally any character:

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB (match!)
```


## Summary

There exist following character classes:

- `pattern:\d` -- digits.
- `pattern:\D` -- non-digits.
- `pattern:\s` -- space symbols, tabs, newlines.
- `pattern:\S` -- all but `pattern:\s`.
- `pattern:\w` -- English letters, digits, underscore `'_'`.
- `pattern:\W` -- all but `pattern:\w`.
- `pattern:.` -- any character if with the regexp `'s'` flag, otherwise any except a newline.

...But that's not all!

Modern Javascript also allows to look for characters by their Unicode properties, for instance:

- A cyrillic letter is: `pattern:\p{Script=Cyrillic}` or `pattern:\p{sc=Cyrillic}`.
- A dash (be it a small hyphen `-` or a long dash `—`): `pattern:\p{Dash_Punctuation}` or `pattern:\p{pd}`.
- A currency symbol: `pattern:\p{Currency_Symbol}` or `pattern:\p{sc}`.
- ...And much more. Unicode has a lot of character categories that we can select from.

These patterns require `'u'` regexp flag to work. More about that in the chapter [](info:regexp-unicode).
