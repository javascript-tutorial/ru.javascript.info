# Переменная

Большую часть времени, приложению написанному на JavaScript необходимо работать с информацией. Вот два примера:
1. Интернет магазин -- информация может включать продаваемые товары и корзину покупок.
2. Чат -- информация может включать пользователей, сообщения и многое другое.

Переменные используются для хранения этой информации.

## Переменная

[Переменная](https://en.wikipedia.org/wiki/Variable_(computer_science)) -- это "именованное хранилище" для данных. Мы можем использовать переменные для хранения товаров, посетителей, и других данных.

Для создания переменной в JavaScript, используйте ключевое слово `let`.

Приведенная ниже инструкция создает (другими словами: *объявляет* или *определяет*) переменную с именем "message":

```js
let message;
```

Теперь, мы можем поместить в неё некоторые данные, используя оператор присваивания `=`:

```js
let message;

*!*
message = 'Hello'; // хранит строку
*/!*
```

Строка сохраняется в области памяти, связанной с переменной. Мы можем получить к ней доступ, используя имя переменной:

```js run
let message;
message = 'Hello!';

*!*
alert(message); // показывает содержимое переменной
*/!*
```

Для краткости можно совместить объявление переменной и запись данных в одну строку:

```js run
let message = 'Hello!'; // определяем переменную и присваиваем ей значение

alert(message); // Hello!
```

Мы также можем объявить несколько переменных в одной строке:

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

Это может показаться короче, но мы так делать не рекомендуем. Для лучшей читаемости, пожалуйста, используйте одну строку на переменную.

Многострочный вариант немного длиннее, но легче для чтения:

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

Некоторые люди также определяют несколько переменных в многострочном стиле:
```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hello';
```

...Или даже в стиле с запятой в начале строки:

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hello';
```

Технически, все эти варианты делают одно и тоже. Так что это вопрос личного вкуса и эстетики.


````smart header="`var` вместо `let`"
В старых сценариях вы также можете найти другое ключевое слово: `var` вместо `let`:

```js
*!*var*/!* message = 'Hello';
```

Ключевое слово `var` *почти* такое же, как `let`. Оно объявляет переменную, но немного по-другому, "олдскукльным" способом.

Есть тонкие различия между `let` и `var`, но они пока не имеют для нас значения. Мы подробно рассмотрим их в этой главе <info:var>.
````

## Аналогия из жизни

Мы легко поймем концепцию "переменной", если представим ее в виде "коробки" для данных, с уникальным названием на ней.

Например, переменную `message` можно представить, как коробку с названием `"message"` и значением `"Hello!"` внутри:

![](variable.png)

Мы можем положить любое значение в коробку.

Мы также можем изменить его столько раз, сколько захотим:
```js run
let message;

message = 'Hello!';

message = 'World!'; // значение изменено

alert(message);
```

При изменении значения старые данные удаляются из переменной:

![](variable-change.png)

Мы также можем объявить две переменные и скопировать данные из одной в другую.

```js run
let hello = 'Hello world!';

let message;

*!*
// копируем значение 'Hello world' из переменной hello в переменную message
message = hello;
*/!*

// теперь две переменные содержат одинаковые данные
alert(hello); // Hello world!
alert(message); // Hello world!
```

```smart header="Функциональные языки программирования"
Интересно отметить, что [функциональные](https://en.wikipedia.org/wiki/Functional_programming) языки программирования, такие как [Scala](http://www.scala-lang.org/) или [Erlang](http://www.erlang.org/), запрещают измененять значения в переменной.

В таких языках, однажды сохраненное "в коробку" значение, остается там навсегда. Если нам нужно сохранить что-то другое, язык засталяет нас создать новую коробку (объявить новую переменную). Мы не можем использовать старую переменную.

Хотя на первый взгляд это может показаться немного странным, эти языки вполне подходят для серьезной разработки. Более того, есть такие области, как параллельные вычисления, где это ограничение дает определенные преимущества. Изучение такого языка (даже если вы не планируете использовать его в ближайшее время) рекомендуется для расширения кругозора.
```

## Имена переменных [#variable-naming]

В JavaScript существует два ограничения на имена переменных :

1. Имя переменной должно содержать только буквы, цифры, или символы `$` и `_`.
2. Первый символ не должен быть цифрой.

Примеры допустимых имен:

```js
let userName;
let test123;
```

Если имя содержит несколько слов, обычно используется [верблюжья нотация](https://en.wikipedia.org/wiki/CamelCase). То есть слова идут одно за другим, и каждое слово начинается с заглавной буквы: `myVeryLongName`.

Что интересно -- знак доллара `'$'` и подчеркивание `'_'` также можно использовать в названиях. Это обычные символы, как и буквы, без какого-либо особого значения.

Эти имена являются допустимыми:

```js run untrusted
let $ = 1; // объявили переменную с именем "$"
let _ = 2; // а теперь переменную с именем "_"

alert($ + _); // 3
```

Примеры неправильных имен переменных:

```js no-beautify
let 1a; // не может начинаться с цифры

let my-name; // дефис '-' не разрешен в имени
```

```smart header="Регистр имеет значение"
Переменные с именами `apple` and `AppLE` -- это две разные переменные.
```

````smart header="Не английские буквы разрешены, но не рекомендуются"
Можно использовать любой язык, включая кириллицу или даже иероглифы, например:

```js
let имя = '...';
let 我 = '...';
```

Технически здесь нет ошибки, такие имена разрешены, но есть международная традиция использовать английский язык в именах переменных. Даже если мы пишем небольшой сценарий, у него может быть долгая жизнь впереди. Людям из других стран, возможно, придется прочесть его не один раз.
````

````warn header="Зарезервированные имена"
Существует [список зарезервированных слов](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), которые нельзя использовать в качестве имен переменных, потому что они используются самим языком.

Например: `let`, `class`, `return`, и `function` зарезервированы.

Приведенный ниже код дает синтаксическую ошибку:

```js run no-beautify
let let = 5; // нельзя назвать переменную "let", ошибка!
let return = 5; // также нельзя назвать переменную "return", ошибка!
```
````

````warn header="Создание переменной без использования `use strict`"

Обычно нам нужно определить переменную перед ее использованием. Но в старые времена было технически возможно создать переменную простым присвоением значения без использования `let`. Это все еще работает, если мы не ставим `use strict` в наших файлах для поддержания совместимости со старыми сценариями.

```js run no-strict
// заметка: "use strict" в этом примере не используется

num = 5; // если переменная "num" не существовала, она создается

alert(num); // 5
```

Это плохая практика и приведет к ошибке в строгом режиме:

```js
"use strict";

*!*
num = 5; // error: num is not defined
*/!*
```
````

## Константы

Чтобы объявить константу (неиспользуемую) переменную, используйте `const` вместо `let`:

```js
const myBirthday = '18.04.1982';
```

Переменные объявленные с помощью `const` называются "константами". Их нельзя изменить. Попытка сделать это приведет к ошибке:

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // ошибка, константу невозможно переназначить!
```

Когда программист уверен, что переменная никогда не будет меняться, он может объявить ее используя ключевое слово `const`, гарантировать это и наглядно донести это до каждого.


### Uppercase constants

There is a widespread practice to use constants as aliases for difficult-to-remember values that are known prior to execution.

Such constants are named using capital letters and underscores.

Like this:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...when we need to pick a color
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Benefits:

- `COLOR_ORANGE` is much easier to remember than `"#FF7F00"`.
- It is much easier to mistype `"#FF7F00"` than `COLOR_ORANGE`.
- When reading the code, `COLOR_ORANGE` is much more meaningful than `#FF7F00`.

When should we use capitals for a constant and when should we name it normally? Let's make that clear.

Being a "constant" just means that a variable's value never changes. But there are constants that are known prior to execution (like a hexadecimal value for red) and there are constants that are *calculated* in run-time, during the execution, but do not change after their initial assignment.

For instance:
```js
const pageLoadTime = /* time taken by a webpage to load */;
```

The value of `pageLoadTime` is not known prior to the page load, so it's named normally. But it's still a constant because it doesn't change after assignment.

In other words, capital-named constants are only used as aliases for "hard-coded" values.  

## Name things right

Talking about variables, there's one more extremely important thing.

Please name your variables sensibly. Take time to think about this.

Variable naming is one of the most important and complex skills in programming. A quick glance at variable names can reveal which code was written by a beginner versus an experienced developer.

In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely separate from scratch. When we return to some code after doing something else for a while, it's much easier to find information that is well-labeled. Or, in other words, when the variables have good names.

Please spend time thinking about the right name for a variable before declaring it. Doing so will repay you handsomely.

Some good-to-follow rules are:

- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, `c`, unless you really know what you're doing.
- Make names maximally descriptive and concise. Examples of bad names are `data` and `value`. Such names say nothing. It's only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your own mind. If a site visitor is called a "user" then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.

Sounds simple? Indeed it is, but creating descriptive and concise variable names in practice is not. Go for it.

```smart header="Reuse or create?"
And the last note. There are some lazy programmers who, instead of declaring new variables, tend to reuse existing ones.

As a result, their variables are like boxes into which people throw different things without changing their stickers. What's inside the box now? Who knows? We need to come closer and check.

Such programmers save a little bit on variable declaration but lose ten times more on debugging.

An extra variable is good, not evil.

Modern JavaScript minifiers and browsers optimize code well enough, so it won't create performance issues. Using different variables for different values can even help the engine optimize your code.
```

## Summary

We can declare variables to store data by using the `var`, `let`, or `const` keywords.

- `let` -- is a modern variable declaration. The code must be in strict mode to use `let` in Chrome (V8).
- `var` -- is an old-school variable declaration. Normally we don't use it at all, but we'll cover subtle differences from `let` in the chapter <info:var>, just in case you need them.
- `const` -- is like `let`, but the value of the variable can't be changed.

Variables should be named in a way that allows us to easily understand what's inside them.
