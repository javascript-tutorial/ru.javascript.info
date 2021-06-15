# Поиск на заданной позиции, флаг "y"

Флаг `pattern:y` позволяет произвести поиск на определённой позиции в исходной строке.

Чтобы разобрать флаг `pattern:y` и понять, чем же он хорош, рассмотрим практический пример.

<<<<<<< HEAD
Одна из часто встречающихся задач регулярных выражений - лексический разбор: мы имеем текст, например, на каком-то языке программирования и получаем его структурные элементы.

Например, в HTML есть теги и атрибуты, в JavaScript-коде - переменные и функции, и т.п.

Мы не будем погружаться глубоко в тему написания таких анализаторов (это специализированная область со своим набором инструментов и алгоритмов). Но в процессе их работы, вообще, в процессе анализа текста, очень часто возникает задача "прочитать что-то на заданной позиции".
=======
To grasp the use case of `pattern:y` flag, and better understand the ways of regexps, let's explore a practical example.

One of common tasks for regexps is "lexical analysis": we get a text, e.g. in a programming language, and need to find its structural elements. For instance, HTML has tags and attributes, JavaScript code has functions, variables, and so on.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Например, у нас есть строка кода `subject:let varName = "value"`, и нам надо прочитать из неё имя переменной, которое начинается с позиции `4`.

Имя переменной будем искать как слово `pattern:\w+`. Вообще, в языке JavaScript для имени переменной нужно чуть более сложное регулярное выражение, но здесь это не важно.

Вызов `str.match(/\w+/)` найдёт только первое слово в строке или все слова (с флагом `pattern:g`), а нам нужно одно слово именно на позиции `4`.

<<<<<<< HEAD
Для поиска, начиная с нужной позиции, можно использовать метод `regexp.exec(str)`.

Если у регулярного выражения `regexp` нет флагов `pattern:g` или `pattern:y`, то этот метод ищет первое совпадение в строке `str`, точно так же, как `str.match(regexp)`. Здесь нас этот простейший вариант без флагов не интересует.

Если флаг `pattern:g` есть, то он осуществляет поиск в строке `str`, начиная с позиции, заданной свойством `regexp.lastIndex`. И, когда находит, обновляет `regexp.lastIndex` на позицию после совпадения.

При создании регулярного выражения его свойство `lastIndex` равно `0`.

Так что повторные вызовы `regexp.exec` возвращают совпадения по очереди, одно за другим.

Например (с флагом `pattern:g`):
=======
- A call to `str.match(/\w+/)` will find only the first word in the line (`let`). That's not it.
- We can add the flag `pattern:g`. But then the call `str.match(/\w+/g)` will look for all words in the text, while we need one word at position `4`. Again, not what we need.

**So, how to search for a regexp exactly at the given position?**

Let's try using method `regexp.exec(str)`.

For a `regexp` without flags `pattern:g` and `pattern:y`, this method looks only for the first match, it works exactly like `str.match(regexp)`.

...But if there's flag `pattern:g`, then it performs the search in `str`, starting from position stored in the `regexp.lastIndex` property. And, if it finds a match, then sets `regexp.lastIndex` to the index immediately after the match.

In other words, `regexp.lastIndex` serves as a starting point for the search, that each `regexp.exec(str)` call resets to the new value ("after the last match"). That's only if there's `pattern:g` flag, of course.

So, successive calls to `regexp.exec(str)` return matches one after another.

Here's an example of such calls:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let str = 'let varName'; // Let's find all words in this string
let regexp = /\w+/g;
<<<<<<< HEAD
alert(regexp.lastIndex); // 0 (при создании lastIndex=0)
=======

alert(regexp.lastIndex); // 0 (initially lastIndex=0)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

let word1 = regexp.exec(str);
alert(word1[0]); // let (первое слово)
alert(regexp.lastIndex); // 3 (позиция за первым совпадением)

let word2 = regexp.exec(str);
alert(word2[0]); // varName (второе слово)
alert(regexp.lastIndex); // 11 (позиция за вторым совпадением)

let word3 = regexp.exec(str);
alert(word3); // null (больше совпадений нет)
alert(regexp.lastIndex); // 0 (сбрасывается по окончании поиска)
```

<<<<<<< HEAD
Заметим, что каждое совпадение возвращается в виде массива, со всеми скобочными группами и дополнительными свойствами.

Можно перебрать все совпадения в цикле:
=======
We can get all matches in the loop:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let str = 'let varName';
let regexp = /\w+/g;

let result;

while (result = regexp.exec(str)) {
  alert( `Найдено ${result[0]} на позиции ${result.index}` );
  // Найдено let на позиции 0, затем
  // Найдено varName на позиции 4
}
```

<<<<<<< HEAD
Такое использование `regexp.exec` представляет собой альтернативу методу `str.matchAll`.

Таким образом, последовательные вызовы `regexp.exec` могут найти все совпадения, представляя собой альтернативу методам `str.match/matchAll`.

Но, в отличие от других методов, мы можем поставить самостоятельно `lastIndex`, начав тем самым поиск именно с нужной позиции.

Например, найдём слово, начиная с позиции `4`:
=======
Such use of `regexp.exec` is an alternative to method `str.matchAll`, with a bit more control over the process.

Let's go back to our task.

We can manually set `lastIndex` to `4`, to start the search from the given position!

Like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g; // без флага g свойство lastIndex игнорируется

*!*
regexp.lastIndex = 4;
*/!*

let word = regexp.exec(str);
alert(word); // varName
```

<<<<<<< HEAD
Поиск `pattern:\w+` произведён, начиная с позиции `regexp.lastIndex = 4`.

Заметим, что такой поиск лишь начинается с позиции `lastIndex` и идёт дальше. Если слова на позиции `lastIndex` нет, но оно есть позже, оно всё равно будет найдено:
=======
Hooray! Problem solved! 

We performed a search of `pattern:\w+`, starting from position `regexp.lastIndex = 4`.

The result is correct.

...But wait, not so fast.

Please note: the `regexp.exec` call starts searching at position `lastIndex` and then goes further. If there's no word at position `lastIndex`, but it's somewhere after it, then it will be found:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g;

*!*
// start the search from position 3
regexp.lastIndex = 3;
*/!*

let word = regexp.exec(str); 
// found the match at position 4
alert(word[0]); // varName
alert(word.index); // 4
```

<<<<<<< HEAD
...То есть, при флаге `pattern:g` свойство `lastIndex` задаёт начальную позицию поиска.

**Флаг `pattern:y` заставляет `regexp.exec` искать ровно на позиции `lastIndex`, ни до и ни после.**
=======
For some tasks, including the lexical analysis, that's just wrong. We need to find a match exactly at the given position at the text, not somewhere after it. And that's what the flag `y` is for.

**The flag `pattern:y` makes `regexp.exec` to search exactly at position `lastIndex`, not "starting from" it.**
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Вот тот же поиск с флагом `pattern:y`:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/y;

regexp.lastIndex = 3;
alert( regexp.exec(str) ); // null (на позиции 3 пробел, а не слово)

regexp.lastIndex = 4;
alert( regexp.exec(str) ); // varName (слово на позиции 4)
```

Как можно видеть, регулярное выражение `pattern:/\w+/y` не найдено на позиции `3` (в отличие от флага `pattern:g`), но найдено на позиции `4`.

<<<<<<< HEAD
Представим себе, что у нас большой текст, и в нём нет ни одного совпадения. В таком случае регулярное выражение с флагом `pattern:g` будет идти до самого конца текста, и это займёт гораздо больше времени, чем поиск с флагом `pattern:y`.

В задачах, подобных лексическому анализу, обычно много поисков на конкретной позиции. Использование флага `pattern:y` - ключ к хорошей производительности.
=======
Not only that's what we need, there's an important performance gain when using flag `pattern:y`.

Imagine, we have a long text, and there are no matches in it, at all. Then a search with flag `pattern:g` will go till the end of the text and find nothing, and this will take significantly more time than the search with flag `pattern:y`, that checks only the exact position.

In tasks like lexical analysis, there are usually many searches at an exact position, to check what we have there. Using flag `pattern:y` is the key for correct implementations and a good performance.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
