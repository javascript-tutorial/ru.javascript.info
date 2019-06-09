# Скобочные группы

Часть шаблона можно заключить в скобки `pattern:(...)`. Это называется "скобочная группа".

У такого выделения есть два эффекта:

1. Позволяет поместить часть совпадения в отдельный массив.
2. Если установить квантификтор после скобок, то он будет применяться к всему содержимому скобки, а не к одному символу.

## Пример

В примере ниже шаблон `pattern:(go)+` один или более `match:'go'`:

```js run
alert( 'Gogogo now!'.match(/(go)+/i) ); // "Gogogo"
```

Без скобок, шаблон `pattern:/go+/` означает `subject:g` и, идущий после него, `subject:o`, который повторяется один или более раз. Например, `match:goooo` или `match:gooooooooo`.

Скобки группирую символы в слово `pattern:(go)`.

Сделаем что-то более сложное -- регулярное выражение, которое соответствует адресу электронной почты.

Пример такой почты:

```
my@mail.com
john.smith@site.com.uk
```

Шаблон: `pattern:[-.\w]+@([\w-]+\.)+[\w-]{2,20}`.

1. Первая часть `pattern:[-.\w]+` (перед `@`) может включать любые числовые или буквенные символы, точку и тире, чтобы соответствовать `match:john.smith`.
2. Затем идет `pattern:@` и домен. Это может быть поддомен (например, `host.site.com.uk`), поэтому мы сопоставляем его как слово, за которым следует точка `pattern:([\w-]+\.)` (повторяется). Затем в конце должно быть слово: `match:com` или `match:uk` (но не очень длинное: 2-20 символов).

Это выражение не идеально, но достаточно хорошее для исправления ошибок и опечаток.

Например,  мы можем найти все электронные адреса в строке:

```js run
let reg = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}/g;

alert("my@mail.com @ his@site.com.uk".match(reg)); // my@mail.com, his@site.com.uk
```

В примере скобки используются для создания повторяющейся группы `pattern:(...)+`. Но есть и другие применения. Посмотрим на них.

## Содержимое скобок  

Группы скобок нумируются слева направо. Поисковый движок запоминает содержимое в каждой группе и позволяет ссылаться на него в шаблоне регулярного выражения или строке для замены.

Например, мы хотим найти HTML теги `pattern:<.*?>` и обрадотать их.

Давайте заключим внутреннее содержимое в круглые скобки: `pattern:<(.*?)>`.

Соберем их в массив:

```js run
let str = '<h1>Hello, world!</h1>';
let reg = /<(.*?)>/;

alert( str.match(reg) ); // Array: ["<h1>", "h1"]
```

Вызов [String#match](mdn:js/String/match) возвращает группы только если регулярное выражение не имеет флаг `pattern:/.../g`.

Если необходимы все совпадения с их группировкой, то мы можем использовать `.matchAll` или `regexp.exec` как описано в <info:regexp-methods>:

```js run
let str = '<h1>Hello, world!</h1>';

// два совпадения: теги открытия <h1> и закрытия </h1>
let reg = /<(.*?)>/g;

let matches = Array.from( str.matchAll(reg) );

alert(matches[0]); //  Array: ["<h1>", "h1"]
alert(matches[1]); //  Array: ["</h1>", "/h1"]
```

Здесь мы имеем два совпадения для `pattern:<(.*?)>`. Каждый из них является массивом с полным совдаением и группой.

## Вложенные группы

Скобки могут быть и вложенными. В этом случае нумерация также идёт слева направо.

Например, при поиске тега в `subject:<span class="my">` нас может интересовать:

1. Содержимое тега целиком: `match:span class="my"`.
2. Название тега: `match:span`.
3. Аттрибуты тега: `match:class="my"`.

Давайте добавим скобки для них:

```js run
let str = '<span class="my">';

let reg = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(reg);
alert(result); // <span class="my">, span class="my", span, class="my"
```

Вот так выглядят скобочные группы:

![](regexp-nested-groups.png)

At the zero index of the `result` is always the full match.

Then groups, numbered from left to right. Whichever opens first gives the first group `result[1]`. Here it encloses the whole tag content.

Then in `result[2]` goes the group from the second opening `pattern:(` till the corresponding `pattern:)` -- tag name, then we don't group spaces, but group attributes for `result[3]`.

**If a group is optional and doesn't exist in the match, the corresponding `result` index is present (and equals `undefined`).**

For instance, let's consider the regexp `pattern:a(z)?(c)?`. It looks for `"a"` optionally followed by `"z"` optionally followed by `"c"`.

If we run it on the string with a single letter `subject:a`, then the result is:

```js run
let match = 'a'.match(/a(z)?(c)?/);

alert( match.length ); // 3
alert( match[0] ); // a (whole match)
alert( match[1] ); // undefined
alert( match[2] ); // undefined
```

The array has the length of `3`, but all groups are empty.

And here's a more complex match for the string `subject:ack`:

```js run
let match = 'ack'.match(/a(z)?(c)?/)

alert( match.length ); // 3
alert( match[0] ); // ac (whole match)
alert( match[1] ); // undefined, because there's nothing for (z)?
alert( match[2] ); // c
```

The array length is permanent: `3`. But there's nothing for the group `pattern:(z)?`, so the result is `["ac", undefined, "c"]`.

## Named groups

Remembering groups by their numbers is hard. For simple patterns it's doable, but for more complex ones we can give names to parentheses.

That's done by putting `pattern:?<name>` immediately after the opening paren, like this:

```js run
*!*
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
*/!*
let str = "2019-04-30";

let groups = str.match(dateRegexp).groups;

alert(groups.year); // 2019
alert(groups.month); // 04
alert(groups.day); // 30
```

As you can see, the groups reside in the `.groups` property of the match.

We can also use them in replacements, as `pattern:$<name>` (like `$1..9`, but name instead of a digit).

For instance, let's rearrange the date into `day.month.year`:

```js run
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;

let str = "2019-04-30";

let rearranged = str.replace(dateRegexp, '$<day>.$<month>.$<year>');

alert(rearranged); // 30.04.2019
```

If we use a function, then named `groups` object is always the last argument:

```js run
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;

let str = "2019-04-30";

let rearranged = str.replace(dateRegexp,
  (str, year, month, day, offset, input, groups) =>
   `${groups.day}.${groups.month}.${groups.year}`
);

alert(rearranged); // 30.04.2019
```

Usually, when we intend to use named groups, we don't need positional arguments of the function. For the majority of real-life cases we only need `str` and `groups`.

So we can write it a little bit shorter:

```js
let rearranged = str.replace(dateRegexp, (str, ...args) => {
  let {year, month, day} = args.pop();
  alert(str); // 2019-04-30
  alert(year); // 2019
  alert(month); // 04
  alert(day); // 30
});
```


## Non-capturing groups with ?:

Sometimes we need parentheses to correctly apply a quantifier, but we don't want the contents in results.

A group may be excluded by adding `pattern:?:` in the beginning.

For instance, if we want to find `pattern:(go)+`, but don't want to remember the contents (`go`) in a separate array item, we can write: `pattern:(?:go)+`.

In the example below we only get the name "John" as a separate member of the `results` array:

```js run
let str = "Gogo John!";
*!*
// exclude Gogo from capturing
let reg = /(?:go)+ (\w+)/i;
*/!*

let result = str.match(reg);

alert( result.length ); // 2
alert( result[1] ); // John
```

## Summary

- Parentheses can be:
  - capturing `(...)`, ordered left-to-right, accessible by number.
  - named capturing `(?<name>...)`, accessible by name.
  - non-capturing `(?:...)`, used only to apply quantifier to the whole groups.
