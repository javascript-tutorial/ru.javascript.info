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

Once again let's note that `pattern:\b` makes the searching engine to test for the boundary, so that `pattern:Java\b` finds `match:Java` only when followed by a word boundary, but it does not add a letter to the result.

Usually we use `\b` to find standalone English words. So that if we want `"Java"` language then `pattern:\bJava\b` finds exactly a standalone word and ignores it when it's a part of `"JavaScript"`.

Another example: a regexp `pattern:\b\d\d\b` looks for standalone two-digit numbers. In other words, it requires that before and after `pattern:\d\d` must be a symbol different from `\w` (or beginning/end of the string).

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
```

```warn header="Word boundary doesn't work for non-English alphabets"
The word boundary check `\b` tests for a boundary between `\w` and something else. But `\w` means an English letter (or a digit or an underscore), so the test won't work for other characters (like cyrillic or hieroglyphs).
```


## Inverse classes

For every character class there exists an "inverse class", denoted with the same letter, but uppercased.

The "reverse" means that it matches all other characters, for instance:

`\D`
: Non-digit: any character except `\d`, for instance a letter.

`\S`
: Non-space: any character except `\s`, for instance a letter.

`\W`
: Non-wordly character: anything but `\w`.

`\B`
: Non-boundary: a test reverse to `\b`.

In the beginning of the chapter we saw how to get all digits from the phone `subject:+7(903)-123-45-67`.

One way was to match all digits and join them:

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

An alternative, shorter way is to find non-digits `\D` and remove them from the string:


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
