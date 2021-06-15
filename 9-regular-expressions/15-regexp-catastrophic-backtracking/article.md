# Катастрофический возврат

<<<<<<< HEAD
Некоторые регулярные выражения, простые с виду, могут выполняться оооочень долго, и даже "подвешивать" интерпретатор JavaScript.

Рано или поздно с этим сталкивается любой разработчик, потому что нечаянно создать такое регулярное выражение –- проще простого.

Типичный симптом: регулярное выражение обычно работает нормально, но иногда, с некоторыми строками, "подвешивает" интерпретатор и потребляет 100% процессора.
=======
Some regular expressions are looking simple, but can execute a veeeeeery long time, and even "hang" the JavaScript engine.

Sooner or later most developers occasionally face such behavior. The typical symptom -- a regular expression works fine sometimes, but for certain strings it "hangs", consuming 100% of CPU.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Как правило, веб-браузер при этом предлагает "убить" скрипт и перезагрузить зависшую страницу. Явно плохая ситуация.

<<<<<<< HEAD
Ну а для серверного JavaScript это может стать серьёзной уязвимостью, если регулярные выражения используются для обработки пользовательских данных.
=======
For server-side JavaScript such a regexp may hang the server process, that's even worse. So we definitely should take a look at it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Пример

<<<<<<< HEAD
Допустим, у нас есть строка, и мы хотим проверить, что она состоит из слов `pattern:\w+`, после каждого слова может быть пробел `pattern:\s?`.

Используем регулярное выражение `pattern:^(\w+\s?)*$`, которое задаёт 0 или более таких слов.
=======
Let's say we have a string, and we'd like to check if it consists of words `pattern:\w+` with an optional space `pattern:\s?` after each.

An obvious way to construct a regexp would be to take a word followed by an optional space `pattern:\w+\s?` and then repeat it with `*`.

That leads us to the regexp `pattern:^(\w+\s?)*$`, it specifies zero or more such words, that start at the beginning `pattern:^` and finish at the end `pattern:$` of the line.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Проверим, чтобы убедиться, что оно работает:

```js run
let regexp = /^(\w+\s?)*$/;

alert( regexp.test("A good string") ); // true
alert( regexp.test("Bad characters: $@#") ); // false
```

<<<<<<< HEAD
Результат верный. Однако, на некоторых строках оно выполняется очень долго. Так долго, что интерпретатор JavaScript "зависает" с потреблением 100% процессора.

Если вы запустите пример ниже, то, скорее всего, ничего не увидите, так как JavaScript "подвиснет". В браузере он перестанет реагировать на другие события и, скорее всего, понадобится перезагрузить страницу, так что осторожно с этим:
=======
The regexp seems to work. The result is correct. Although, on certain strings it takes a lot of time. So long that JavaScript engine "hangs" with 100% CPU consumption.

If you run the example below, you probably won't see anything, as JavaScript will just "hang". A web-browser will stop reacting on events, the UI will stop working (most browsers allow only scrolling). After some time it will suggest to reload the page. So be careful with this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let regexp = /^(\w+\s?)*$/;
let str = "An input string that takes a long time or even makes this regexp hang!";

// этот поиск будет выполняться очень, очень долго
alert( regexp.test(str) );
```

<<<<<<< HEAD
Некоторые движки регулярных выражений могут справиться с таким поиском, но большинство из них -- нет.
=======
To be fair, let's note that some regular expression engines can handle such a search effectively, for example V8 engine version starting from 8.8 can do that (so Google Chrome 88 doesn't hang here), while Firefox browser does hang. 
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Упрощённый пример

<<<<<<< HEAD
В чём же дело? Почему регулярное выражение "зависает"?
=======
What's the matter? Why does the regular expression hang?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Чтобы это понять, упростим пример: уберём из него пробелы `pattern:\s?`. Получится `pattern:^(\w+)*$`.

И, для большей наглядности, заменим `pattern:\w` на `pattern:\d`. Получившееся регулярное выражение тоже будет "зависать", например:

```js run
let regexp = /^(\d+)*$/;

let str = "012345678901234567890123456789z";

<<<<<<< HEAD
// этот поиск будет выполняться очень, очень долго
=======
// will take a very long time (careful!)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
alert( regexp.test(str) );
```

В чём же дело, что не так с регулярным выражением?

Внимательный читатель, посмотрев на `pattern:(\d+)*`, наверняка удивится, ведь оно какое-то странное. Квантификатор `pattern:*` здесь выглядит лишним. Если хочется найти число, то с тем же успехом можно искать `pattern:\d+`.

<<<<<<< HEAD
Действительно, это регулярное выражение носит искусственный характер, но, разобравшись с ним, мы поймём и практический пример, данный выше. Причина их медленной работы одинакова. Поэтому оставим как есть.

Что же происходит во время поиска `pattern:^(\d+)*$` в строке `subject:123456789!` (укоротим для ясности), почему всё так долго?

1. Первым делом, движок регулярных выражений пытается найти `pattern:\d+`. Плюс `pattern:+` является жадным по умолчанию, так что он хватает все цифры, какие может:
=======
Indeed, the regexp is artificial; we got it by simplifying the previous example. But the reason why it is slow is the same. So let's understand it, and then the previous example will become obvious.

What happens during the search of `pattern:^(\d+)*$` in the line `subject:123456789z` (shortened a bit for clarity, please note a non-digit character `subject:z` at the end, it's important), why does it take so long?

Here's what the regexp engine does:

1. First, the regexp engine tries to find the content of the parentheses: the number `pattern:\d+`. The plus `pattern:+` is greedy by default, so it consumes all digits:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    ```
    \d+.......
    (123456789)!
    ```

<<<<<<< HEAD
    Затем движок пытается применить квантификатор `pattern:*`, но больше цифр нет, так что звёздочка ничего не даёт.

    Далее по шаблону ожидается конец строки `pattern:$`, а в тексте символ `subject:!`, так что соответствий нет:
=======
    After all digits are consumed, `pattern:\d+` is considered found (as `match:123456789`).

    Then the star quantifier `pattern:(\d+)*` applies. But there are no more digits in the text, so the star doesn't give anything.

    The next character in the pattern is the string end `pattern:$`. But in the text we have `subject:z` instead, so there's no match:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    ```
               X
    \d+........$
    (123456789)z
    ```

2. Так как соответствие не найдено, то "жадный" квантификатор `pattern:+` уменьшает количество повторений, возвращается на один символ назад.

<<<<<<< HEAD
    Теперь `pattern:\d+` – это все цифры, за исключением последней:
=======
    Now `pattern:\d+` takes all digits except the last one (`match:12345678`):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    ```
    \d+.......
    (12345678)9z
    ```
<<<<<<< HEAD
3. Далее движок снова пытается продолжить поиск, начиная уже с позиции (`9`).

    Звёздочка `pattern:(\d+)*` теперь может быть применена - она даёт второе число `match:9`:
=======
3. Then the engine tries to continue the search from the next position (right after `match:12345678`).

    The star `pattern:(\d+)*` can be applied -- it gives one more match of `pattern:\d+`, the number `match:9`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    ```

    \d+.......\d+
    (12345678)(9)z
    ```

<<<<<<< HEAD
    Затем движок ожидает найти `pattern:$`, но это ему не удаётся, ведь строка оканчивается на `subject:!`:
=======
    The engine tries to match `pattern:$` again, but fails, because it meets `subject:z` instead:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    ```
                 X
    \d+.......\d+
    (12345678)(9)!
    ```

4. Так как совпадения нет, то поисковый движок продолжает отступать назад. Общее правило таково: последний жадный квантификатор уменьшает количество повторений до тех пор, пока это возможно. Затем понижается предыдущий "жадный" квантификатор и т.д.

<<<<<<< HEAD
    Перебираются все возможные комбинации. Вот их примеры.
=======
4. There's no match, so the engine will continue backtracking, decreasing the number of repetitions. Backtracking generally works like this: the last greedy quantifier decreases the number of repetitions until it reaches the minimum. Then the previous greedy quantifier decreases, and so on.

    All possible combinations are attempted. Here are their examples.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    Когда первое число `pattern:\d+` содержит 7 цифр, а дальше число из 2 цифр:

    ```
                 X
    \d+......\d+
    (1234567)(89)z
    ```

    Когда первое число содержит 7 цифр, а дальше два числа по 1 цифре:

    ```
                   X
    \d+......\d+\d+
    (1234567)(8)(9)z
    ```

    Когда первое число содержит 6 цифр, а дальше одно число из 3 цифр:

    ```
                 X
    \d+.......\d+
    (123456)(789)z
    ```

    Когда первое число содержит 6 цифр, а затем два числа:

    ```
                   X
    \d+.....\d+ \d+
    (123456)(78)(9)z
    ```

    ...И так далее.


<<<<<<< HEAD
Существует много способов как разбить на числа набор цифр `123456789`. Если быть точным, их <code>2<sup>n</sup>-1</code>, где `n` - длина набора.

В случае `n=20` их порядка миллиона, при `n=30` - ещё в тысячу раз больше. На их перебор и тратится время.

Что же делать?

Может нам стоит использовать "ленивый" режим?

К сожалению, нет: если мы заменим `pattern:\d+` на `pattern:\d+?`, то регулярное выражение всё ещё будет "зависать". Поменяется только порядок перебора, но не общее количество комбинаций.

Некоторые движки регулярных выражений содержат хитрые проверки и конечные автоматы, которые позволяют избежать полного перебора в таких ситуациях или кардинально ускорить его, но не все движки и не всегда.
=======
There are many ways to split a sequence of digits `123456789` into numbers. To be precise, there are <code>2<sup>n</sup>-1</code>, where `n` is the length of the sequence.

- For `123456789` we have `n=9`, that gives 511 combinations.
- For a longer sequence with `n=20` there are about one million (1048575) combinations.
- For `n=30` - a thousand times more (1073741823 combinations).

Trying each of them is exactly the reason why the search takes so long.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Назад к словам и строкам

<<<<<<< HEAD
В начальном примере, когда мы ищем слова по шаблону `pattern:^(\w+\s?)*$` в строке вида `subject:An input that hangs!`, происходит то же самое.
=======
The similar thing happens in our first example, when we look for words by pattern `pattern:^(\w+\s?)*$` in the string `subject:An input that hangs!`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Дело в том, что каждое слово может быть представлено как в виде одного `pattern:\w+`, так и нескольких:

```
(input)
(inpu)(t)
(inp)(u)(t)
(in)(p)(ut)
...
```

Человеку очевидно, что совпадения быть не может, так как эта строка заканчивается на восклицательный знак `!`, а по регулярному выражению в конце должен быть символ `pattern:\w` или пробел `pattern:\s`. Но движок этого не знает.

<<<<<<< HEAD
Он перебирает все комбинации того, как регулярное выражение `pattern:(\w+\s?)*` может "захватить" каждое слово, включая варианты как с пробелами `pattern:(\w+\s)*`, так и без `pattern:(\w+)*` (пробелы `pattern:\s?` ведь не обязательны). Этих вариантов очень много, отсюда и сверхдолгое время выполнения.
=======
It tries all combinations of how the regexp `pattern:(\w+\s?)*` can "consume" the string, including variants with spaces `pattern:(\w+\s)*` and without them `pattern:(\w+)*` (because spaces `pattern:\s?` are optional). As there are many such combinations (we've seen it with digits), the search takes a lot of time.

What to do?

Should we turn on the lazy mode?

Unfortunately, that won't help: if we replace `pattern:\w+` with `pattern:\w+?`, the regexp will still hang. The order of combinations will change, but not their total count.

Some regular expression engines have tricky tests and finite automations that allow to avoid going through all combinations or make it much faster, but most engines don't, and it doesn't always help.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Как исправить?

Есть два основных подхода, как это исправить.

Первый - уменьшить количество возможных комбинаций.

<<<<<<< HEAD
Перепишем регулярное выражение так: `pattern:^(\w+\s)*\w*` - то есть, будем искать любое количество слов с пробелом `pattern:(\w+\s)*`, после которых идёт (но не обязательно) обычное слово `pattern:\w*`.
=======
Let's make the space non-optional by rewriting the regular expression as `pattern:^(\w+\s)*\w*$` - we'll look for any number of words followed by a space `pattern:(\w+\s)*`, and then (optionally) a final word `pattern:\w*`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Это регулярное выражение эквивалентно предыдущему (ищет то же самое), и на этот раз всё работает:

```js run
let regexp = /^(\w+\s)*\w*$/;
let str = "An input string that takes a long time or even makes this regex hang!";

alert( regexp.test(str) ); // false
```

Почему же проблема исчезла?

<<<<<<< HEAD
Теперь звёздочка `pattern:*` стоит после `pattern:\w+\s` вместо `pattern:\w+\s?`. Стало невозможно разбить одно слово на несколько разных `pattern:\w+`. Исчезли и потери времени на перебор таких комбинаций.

Например, с предыдущим шаблоном `pattern:(\w+\s?)*` слово `subject:string` могло быть представлено как два подряд `pattern:\w+`:
=======
That's because now the space is mandatory.

The previous regexp, if we omit the space, becomes `pattern:(\w+)*`, leading to many combinations of `\w+` within a single word

So `subject:input` could be matched as two repetitions of `pattern:\w+`, like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```
\w+  \w+
(inp)(ut)
```

<<<<<<< HEAD
Предыдущий шаблон из-за необязательности `pattern:\s` допускал варианты `pattern:\w+`, `pattern:\w+\s`, `pattern:\w+\w+` и т.п.

С переписанным шаблоном `pattern:(\w+\s)*`, такое невозможно: может быть `pattern:\w+\s` или `pattern:\w+\s\w+\s`, но не `pattern:\w+\w+`. Так что общее количество комбинаций сильно уменьшается.
=======
The new pattern is different: `pattern:(\w+\s)*` specifies repetitions of words followed by a space! The `subject:input` string can't be matched as two repetitions of `pattern:\w+\s`, because the space is mandatory.

The time needed to try a lot of (actually most of) combinations is now saved.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Запрет возврата

<<<<<<< HEAD
Переписывать регулярное выражение не всегда удобно, и не всегда очевидно, как это сделать.

Альтернативный подход заключается в том, чтобы запретить возврат для квантификатора.

Движок регулярных выражений проверяет множество вариантов, которые для человека являются очевидно ошибочными.
=======
It's not always convenient to rewrite a regexp though. In the example above it was easy, but it's not always obvious how to do it.

Besides, a rewritten regexp is usually more complex, and that's not good. Regexps are complex enough without extra efforts.

Luckily, there's an alternative approach. We can forbid backtracking for the quantifier.

The root of the problem is that the regexp engine tries many combinations that are obviously wrong for a human.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Например, в шаблоне `pattern:(\d+)*$` для человека очевидно, что в `pattern:(\d+)*` не нужно "откатывать" `pattern:+`. От того, что вместо одного `pattern:\d+` у нас будет два независимых `pattern:\d+\d+`, ничего не изменится:

```
\d+........
(123456789)!

\d+...\d+....
(1234)(56789)!
```

<<<<<<< HEAD
Если говорить об изначальном примере `pattern:^(\w+\s?)*$`, то хорошо бы исключить возврат для `pattern:\w+`. То есть, для `pattern:\w+` нужно искать только одно слово целиком, максимально возможной длины. Не нужно уменьшать количество повторений `pattern:\w+`, пробовать разбить слово на два `pattern:\w+\w+`, и т.п.

В современных регулярных выражениях для решения этой проблемы придумали захватывающие (possessive) квантификаторы, которые такие же как жадные, но не делают возврат (то есть, по сути, они даже проще, чем жадные).
=======
And in the original example `pattern:^(\w+\s?)*$` we may want to forbid backtracking in `pattern:\w+`. That is: `pattern:\w+` should match a whole word, with the maximal possible length. There's no need to lower the repetitions count in `pattern:\w+` or to split it into two words `pattern:\w+\w+` and so on.

Modern regular expression engines support possessive quantifiers for that. Regular quantifiers become possessive if we add `pattern:+` after them. That is, we use `pattern:\d++` instead of `pattern:\d+` to stop `pattern:+` from backtracking.

Possessive quantifiers are in fact simpler than "regular" ones. They just match as many as they can, without any backtracking. The search process without backtracking is simpler.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Также есть "атомарные скобочные группы" -- средство, запрещающее возврат внутри скобок.

<<<<<<< HEAD
К сожалению, в JavaScript они не поддерживаются, но есть другое средство.
=======
...But the bad news is that, unfortunately, in JavaScript they are not supported.

We can emulate them though using a "lookahead transform".
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

### Опережающая проверка в помощь!

<<<<<<< HEAD
Мы можем исключить возврат с помощью опережающей проверки.

Шаблон, захватывающий максимальное количество повторений `pattern:\w` без возврата, выглядит так: `pattern:(?=(\w+))\1`.

Расшифруем его:
- Опережающая проверка `pattern:?=` ищет максимальное количество `pattern:\w+`, доступных с текущей позиции.
- Содержимое скобок вокруг `pattern:?=...` не запоминается движком, поэтому оборачиваем `pattern:\w+` внутри в дополнительные скобки, чтобы движок регулярных выражений запомнил их содержимое.
- ...И чтобы далее в шаблоне на него сослаться обратной ссылкой `pattern:\1`.
=======
So we've come to real advanced topics. We'd like a quantifier, such as `pattern:+` not to backtrack, because sometimes backtracking makes no sense.

The pattern to take as many repetitions of `pattern:\w` as possible without backtracking is: `pattern:(?=(\w+))\1`. Of course, we could take another pattern instead of `pattern:\w`.

That may seem odd, but it's actually a very simple transform.

Let's decipher it:

- Lookahead `pattern:?=` looks forward for the longest word `pattern:\w+` starting at the current position.
- The contents of parentheses with `pattern:?=...` isn't memorized by the engine, so wrap `pattern:\w+` into parentheses. Then the engine will memorize their contents
- ...And allow us to reference it in the pattern as `pattern:\1`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

То есть, мы смотрим вперед - и если там есть слово `pattern:\w+`, то ищем его же `pattern:\1`.

Зачем? Всё дело в том, что опережающая проверка находит слово `pattern:\w+` целиком, и мы захватываем его в шаблон посредством `pattern:\1`. Поэтому мы реализовали, по сути, захватывающий квантификатор `pattern:+`. Такой шаблон захватывает только полностью слово `pattern:\w+`, не его часть.

Например, в слове `subject:JavaScript` он не может захватить только `match:Java`, и оставить `match:Script` для совпадения с остатком шаблона.

Вот, посмотрите, сравнение двух шаблонов:

```js run
alert( "JavaScript".match(/\w+Script/)); // JavaScript
alert( "JavaScript".match(/(?=(\w+))\1Script/)); // null
```

1. В первом варианте `pattern:\w+` сначала забирает слово `subject:JavaScript` целиком, потом `pattern:+` постепенно отступает, чтобы попробовать найти оставшуюся часть шаблона, и в конце концов находит (при этом `pattern:\w+` будет соответствовать `match:Java`).
2. Во втором варианте `pattern:(?=(\w+))` осуществляет опережающую проверку и видит сразу слово `subject:JavaScript`, которое `pattern:\1` целиком захватывает в совпадение, так что уже нет возможности найти `subject:Script`.

Внутрь `pattern:(?=(\w+))\1` можно вместо `pattern:\w` вставить и более сложное регулярное выражение, при поиске которого квантификатор `pattern:+` не должен делать возврат.

```smart
Больше о связи захватывающих квантификаторов и опережающей проверки вы можете найти в статьях [Regex: Emulate Atomic Grouping (and Possessive Quantifiers) with LookAhead](http://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead) и [Mimicking Atomic Groups](http://blog.stevenlevithan.com/archives/mimic-atomic-groups).
```

Перепишем исходный пример, используя опережающую проверку для запрета возврата:

```js run
let regexp = /^((?=(\w+))\2\s?)*$/;

alert( regexp.test("A good string") ); // true

let str = "An input string that takes a long time or even makes this regex hang!";

alert( regexp.test(str) ); // false, работает и быстро
```

Здесь внутри скобок стоит `pattern:\2` вместо `pattern:\1`, так как есть ещё внешние скобки. Чтобы избежать путаницы с номерами скобок, можно дать скобкам имя, например `pattern:(?<word>\w+)`.

```js run
// скобки названы ?<word>, ссылка на них \k<word>
let regexp = /^((?=(?<word>\w+))\k<word>\s?)*$/;

let str = "An input string that takes a long time or even makes this regex hang!";

alert( regexp.test(str) ); // false

alert( regexp.test("A correct string") ); // true
```

Проблему, которой была посвящена эта глава, называют "катастрофический возврат" (catastrophic backtracking).

Мы разобрали два способа её решения:
- Уменьшение возможных комбинаций переписыванием шаблона.
- Запрет возврата.
