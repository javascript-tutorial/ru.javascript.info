In order to insert after the `<body>` tag, we must first find it. We can use the regular expression pattern `pattern:<body.*?>` for that.

<<<<<<< HEAD
Для того, чтобы вставить после тега `<body>`, нужно вначале его найти. Мы можем использовать регулярное выражение `pattern:<body.*?>` для этого.

В этом задании нам не нужно изменять `<body>` тег. Нам нужно только добавить текст после него.

Вот как мы можем это сделать:
=======
In this task, we don't need to modify the `<body>` tag. We only need to add the text after it.

Here's how we can do it:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let str = '...<body style="...">...';
str = str.replace(/<body.*?>/, '$&<h1>Hello</h1>');

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

<<<<<<< HEAD
В строке замены `$&` означает само совпадение, то есть мы заменяем ту часть текста которая соответствует `pattern:<body.*?>`. Совпадение заменяется на самого себя плюс `<h1>Hello</h1>`.
=======
In the replacement string `$&` means the match itself, that is, the part of the source text that corresponds to `pattern:<body.*?>`. It gets replaced by itself plus `<h1>Hello</h1>`.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

An alternative is to use lookbehind:

```js run
let str = '...<body style="...">...';
str = str.replace(/(?<=<body.*?>)/, `<h1>Hello</h1>`);

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

<<<<<<< HEAD
Как вы можете видеть, в этом регулярном выражении есть только ретроспективная часть.

Это работает вот так:
- В каждой позиции текста.
- Проверяет не предшествует ли ему `pattern:<body.*?>`.
- Если это так, то мы встретили совпадение.

Тег `pattern:<body.*?>` не вернётся. Результатом этого регулярного выражения является буквально пустая строка, но она совпадает только в позициях, которым предшествует `pattern:<body.*?>`.

Происходит замена "пустой строки", которой предшествует `pattern:<body.*?>` на `<h1>Hello</h1>`. Что, как раз, и есть вставка этой строки после `<body>`.

P.S. Флаги регулярных выражений, такие как `pattern:s` и `pattern:i`, также могут быть полезны: `pattern:/<body.*?>/si`. Флаг `pattern:s` создает точечный `pattern:.` соответствует символу новой строки, а флаг `pattern:i` делает `pattern:<body>` также соответствующим `match:<BODY>` без учета регистра.
=======
As you can see, there's only lookbehind part in this regexp.

It works like this:
- At every position in the text.
- Check if it's preceded by `pattern:<body.*?>`.
- If it's so, then we have the match.

The tag `pattern:<body.*?>` won't be returned. The result of this regexp is literally an empty string, but it matches only at positions preceded by `pattern:<body.*?>`.

So it replaces the "empty line", preceded by `pattern:<body.*?>`, with `<h1>Hello</h1>`. That's the insertion after `<body>`.

P.S. Regexp flags, such as `pattern:s` and `pattern:i` can also be useful: `pattern:/<body.*?>/si`. The `pattern:s` flag makes the dot `pattern:.` match a newline character, and `pattern:i` flag makes `pattern:<body>` also match `match:<BODY>` case-insensitively.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
