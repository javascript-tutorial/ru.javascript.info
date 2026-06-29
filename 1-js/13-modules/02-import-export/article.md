# Экспорт и импорт

Директивы экспорт и импорт имеют несколько вариантов вызова.

<<<<<<< HEAD
В предыдущей главе мы видели простое использование, давайте теперь посмотрим больше примеров.
=======
In the previous article we saw a simple use, now let's explore more examples.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

## Экспорт до объявления

Мы можем пометить любое объявление как экспортируемое, разместив `export` перед ним, будь то переменная, функция или класс.

Например, все следующие экспорты допустимы:

```js
// экспорт массива
*!*export*/!* let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// экспорт константы
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// экспорт класса
*!*export*/!* class User {
  constructor(name) {
    this.name = name;
  }
}
```

<<<<<<< HEAD
````smart header="Не ставится точка с запятой после экспорта класса/функции"
Обратите внимание, что `export` перед классом или функцией не делает их [функциональным выражением](info:function-expressions). Это всё также объявление функции, хотя и экспортируемое.
=======
````smart header="No semicolons after export class/function"
Please note that `export` before a class or a function does not make it a [function expression](info:function-expressions). It's still a function declaration, albeit exported.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

Большинство руководств по стилю кода в JavaScript не рекомендуют ставить точку с запятой после объявлений функций или классов.

Поэтому в конце `export class` и `export function` не нужна точка с запятой:

```js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
} *!* // без ; в конце */!*
```

````

## Экспорт отдельно от объявления

Также можно написать `export` отдельно.

Здесь мы сначала объявляем, а затем экспортируем:

```js
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

*!*
export {sayHi, sayBye}; // список экспортируемых переменных
*/!*
```

...Или, технически, мы также можем расположить `export` выше функций.

## Импорт *

Обычно мы располагаем список того, что хотим импортировать, в фигурных скобках `import {...}`, например вот так:

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

Но если импортировать нужно много чего, мы можем импортировать всё сразу в виде объекта, используя `import * as <obj>`. Например:

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

На первый взгляд "импортировать всё" выглядит очень удобно, не надо писать лишнего, зачем нам вообще может понадобиться явно перечислять список того, что нужно импортировать?

Для этого есть несколько причин.

<<<<<<< HEAD
1. Современные инструменты сборки ([webpack](https://webpack.js.org) и другие) собирают модули вместе и оптимизируют их, ускоряя загрузку и удаляя неиспользуемый код.

    Предположим, мы добавили в наш проект стороннюю библиотеку `say.js` с множеством функций:
    ```js
    // 📁 say.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
    ```

    Теперь, если из этой библиотеки в проекте мы используем только одну функцию:
    ```js
    // 📁 main.js
    import {sayHi} from './say.js';
    ```
    ...Тогда оптимизатор увидит, что другие функции не используются, и удалит остальные из собранного кода, тем самым делая код меньше. Это называется "tree-shaking".

2. Явно перечисляя то, что хотим импортировать, мы получаем более короткие имена функций: `sayHi()` вместо `say.sayHi()`.
3. Явное перечисление импортов делает код более понятным, позволяет увидеть, что именно и где используется. Это упрощает поддержку и рефакторинг кода.
=======
1. Explicitly listing what to import gives shorter names: `sayHi()` instead of `say.sayHi()`.
2. Explicit list of imports gives better overview of the code structure: what is used and where. It makes code support and refactoring easier.

```smart header="Don't be afraid to import too much"
Modern build tools, such as [webpack](https://webpack.js.org/) and others, bundle modules together and optimize them to speedup loading. They also remove unused imports.

For instance, if you `import * as library` from a huge code library, and then use only few methods, then unused ones [will not be included](https://github.com/webpack/webpack/tree/main/examples/harmony-unused#examplejs) into the optimized bundle.
```
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

## Импорт "как"

Мы также можем использовать `as`, чтобы импортировать под другими именами.

Например, для краткости импортируем `sayHi` в локальную переменную `hi`, а  `sayBye` импортируем как `bye`:

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

## Экспортировать "как"

Аналогичный синтаксис существует и для `export`.

Давайте экспортируем функции, как `hi` и `bye`:

```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

Теперь `hi` и `bye` -- официальные имена для внешнего кода, их нужно использовать при импорте:

```js
// 📁 main.js
import * as say from './say.js';

say.*!*hi*/!*('John'); // Hello, John!
say.*!*bye*/!*('John'); // Bye, John!
```

## Экспорт по умолчанию

На практике модули встречаются в основном одного из двух типов:

<<<<<<< HEAD
1. Модуль, содержащий библиотеку или набор функций, как `say.js` выше.
2. Модуль, который объявляет что-то одно, например модуль `user.js` экспортирует только `class User`.
=======
1. Modules that contain a library, pack of functions, like `say.js` above.
2. Modules that declare a single entity, e.g. a module `user.js` exports only `class User`.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

По большей части, удобнее второй подход, когда каждая "вещь" находится в своём собственном модуле.

<<<<<<< HEAD
Естественно, требуется много файлов, если для всего делать отдельный модуль, но это не проблема. Так даже удобнее: навигация по проекту становится проще, особенно, если у файлов хорошие имена, и они структурированы по папкам.

Модули предоставляют специальный синтаксис `export default` ("экспорт по умолчанию") для второго подхода.
=======
Naturally, that requires a lot of files, as everything wants its own module, but that's not a problem at all. Actually, code navigation becomes easier if files are well-named and structured into folders.

Modules provide a special `export default` ("the default export") syntax to make the "one thing per module" way look better.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

Ставим `export default` перед тем, что нужно экспортировать:

```js
// 📁 user.js
export *!*default*/!* class User { // просто добавьте "default"
  constructor(name) {
    this.name = name;
  }
}
```

Заметим, в файле может быть не более одного `export default`.

...И потом импортируем без фигурных скобок:

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // не {User}, просто User

new User('John');
```

Импорты без фигурных скобок выглядят красивее. Обычная ошибка начинающих: забывать про фигурные скобки. Запомним: фигурные скобки необходимы в случае именованных экспортов, для `export default` они не нужны.

| Именованный экспорт | Экспорт по умолчанию |
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

Технически в одном модуле может быть как экспорт по умолчанию, так и именованные экспорты, но на практике обычно их не смешивают. То есть, в модуле находятся либо именованные экспорты, либо один экспорт по умолчанию.

Так как в файле может быть максимум один `export default`, то экспортируемая сущность не обязана иметь имя.

Например, всё это -- полностью корректные экспорты по умолчанию:

```js
export default class { // у класса нет имени
  constructor() { ... }
}
```

```js
export default function(user) { // у функции нет имени
  alert(`Hello, ${user}!`);
}
```

```js
// экспортируем значение, не создавая переменную
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

<<<<<<< HEAD
Это нормально, потому что может быть только один `export default` на файл, так что `import` без фигурных скобок всегда знает, что импортировать.

Без `default` такой экспорт выдал бы ошибку:
=======
Not giving a name is fine, because there is only one `export default` per file, so `import` without curly braces knows what to import.

Without `default`, such an export would give an error:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js
export class { // Ошибка! (необходимо имя, если это не экспорт по умолчанию)
  constructor() {}
}
```

### Имя "default"

В некоторых ситуациях для обозначения экспорта по умолчанию в качестве имени используется `default`.

Например, чтобы экспортировать функцию отдельно от её объявления:

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// то же самое, как если бы мы добавили "export default" перед функцией
export {sayHi as default};
```

<<<<<<< HEAD
Или, ещё ситуация, давайте представим следующее: модуль `user.js` экспортирует одну сущность "по умолчанию" и несколько именованных (редкий, но возможный случай):
=======
Or, another situation, let's say a module `user.js` exports one main "default" thing, and a few named ones (rarely the case, but it happens):
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

Вот как импортировать экспорт по умолчанию вместе с именованным экспортом:

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

И, наконец, если мы импортируем всё как объект `import *`, тогда его свойство `default` - как раз и будет экспортом по умолчанию:

```js
// 📁 main.js
import * as user from './user.js';

let User = user.default; // экспорт по умолчанию
new User('John');
```

### Довод против экспортов по умолчанию

<<<<<<< HEAD
Именованные экспорты "включают в себя" своё имя. Эта информация является частью модуля, говорит нам, что именно экспортируется.

Именованные экспорты вынуждают нас использовать правильное имя при импорте:
=======
Named exports are explicit. They exactly name what they import, so we have that information from them; that's a good thing.

Named exports force us to use exactly the right name to import:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js
import {User} from './user.js';
// import {MyUser} не сработает, должно быть именно имя {User}
```

...В то время как для экспорта по умолчанию мы выбираем любое имя при импорте:

```js
<<<<<<< HEAD
import User from './user.js'; // сработает
import MyUser from './user.js'; // тоже сработает
// можно импортировать с любым именем, и это будет работать
=======
import User from './user.js'; // works
import MyUser from './user.js'; // works too
// could be import Anything... and it'll still work
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
```

Так что члены команды могут использовать разные имена для импорта одной и той же вещи, и это не очень хорошо.

Обычно, чтобы избежать этого и соблюсти единообразие кода, есть правило: имена импортируемых переменных должны соответствовать именам файлов. Вот так:

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

Тем не менее, в некоторых командах это считают серьёзным доводом против экспортов по умолчанию и предпочитают использовать именованные экспорты везде. Даже если экспортируется только одна вещь, она всё равно экспортируется с именем, без использования `default`.

Это также немного упрощает реэкспорт (смотрите ниже).

## Реэкспорт

Синтаксис "реэкспорта" `export ... from ... ` позволяет импортировать что-то и тут же экспортировать, возможно под другим именем, вот так:

```js
export {sayHi} from './say.js'; // реэкспортировать sayHi

export {default as User} from './user.js'; // реэкспортировать default
```

<<<<<<< HEAD
Зачем это нужно? Рассмотрим практический пример использования.

Представим, что мы пишем "пакет": папку со множеством модулей, из которой часть функциональности экспортируется наружу (инструменты вроде NPM позволяют нам публиковать и распространять такие пакеты), а многие модули - просто вспомогательные, для внутреннего использования в других модулях пакета.
=======
Why would that be needed? Let's see a practical use case.

Imagine, we're writing a "package": a folder with a lot of modules, with some of the functionality exported outside (tools like NPM allow us to publish and distribute such packages, but we don't have to use them), and many modules are just "helpers", for internal use in other package modules.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

Структура файлов может быть такой:
```
auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
```

<<<<<<< HEAD
Мы бы хотели сделать функциональность нашего пакета доступной через единую точку входа: "главный файл" `auth/index.js`. Чтобы можно было использовать её следующим образом:
=======
We'd like to expose the package functionality via a single entry point.

In other words, a person who would like to use our package, should import only from the "main file" `auth/index.js`.

Like this:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js
import {login, logout} from 'auth/index.js'
```

<<<<<<< HEAD
Идея в том, что внешние разработчики, которые будут использовать наш пакет, не должны разбираться с его внутренней структурой, рыться в файлах внутри нашего пакета. Всё, что нужно, мы экспортируем в `auth/index.js`, а остальное скрываем от любопытных взглядов.
=======
The "main file", `auth/index.js` exports all the functionality that we'd like to provide in our package.

The idea is that outsiders, other programmers who use our package, should not meddle with its internal structure, search for files inside our package folder. We export only what's necessary in `auth/index.js` and keep the rest hidden from prying eyes.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

Так как нужная функциональность может быть разбросана по модулям нашего пакета, мы можем импортировать их в `auth/index.js` и тут же экспортировать наружу.

```js
// 📁 auth/index.js

// импортировать login/logout и тут же экспортировать
import {login, logout} from './helpers.js';
export {login, logout};

// импортировать экспорт по умолчанию как User и тут же экспортировать
import User from './user.js';
export {User};
...
```

Теперь пользователи нашего пакета могут писать `import {login} from "auth/index.js"`.

Запись `export ... from ...`-- это просто более короткий вариант такого импорта-экспорта:

```js
// 📁 auth/index.js
<<<<<<< HEAD

// импортировать login/logout и тут же экспортировать
export {login, logout} from './helpers.js';

// импортировать экспорт по умолчанию как User и тут же экспортировать
=======
// re-export login/logout
export {login, logout} from './helpers.js';

// re-export the default export as User
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
export {default as User} from './user.js';
...
```

<<<<<<< HEAD
### Реэкспорт экспорта по умолчанию
=======
The notable difference of `export ... from` compared to `import/export` is that re-exported modules aren't available in the current file. So inside the above example of `auth/index.js` we can't use re-exported `login/logout` functions.

### Re-exporting the default export
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

При реэкспорте экспорт по умолчанию нужно обрабатывать особым образом.

<<<<<<< HEAD
Например, у нас есть `user.js`, из которого мы хотим реэкспортировать класс `User`:
=======
Let's say we have `user.js` with the `export default class User` and would like to re-export it:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js
// 📁 user.js
export default class User {
  // ...
}
```

<<<<<<< HEAD
1. `export User from './user.js'` не будет работать. Казалось бы, что такого? Но возникнет синтаксическая ошибка!

    Чтобы реэкспортировать экспорт по умолчанию, мы должны написать `export {default as User}`, как в примере выше. Такая вот особенность синтаксиса.

2. `export * from './user.js'` реэкспортирует только именованные экспорты, исключая экспорт по умолчанию.

    Если мы хотим реэкспортировать и именованные экспорты и экспорт по умолчанию, то понадобятся две инструкции:
=======
We can come across two problems with it:

1. `export User from './user.js'` won't work. That would lead to a syntax error.

    To re-export the default export, we have to write `export {default as User}`, as in the example above.

2. `export * from './user.js'` re-exports only named exports, but ignores the default one.

    If we'd like to re-export both named and default exports, then two statements are needed:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
    ```js
    export * from './user.js'; // для реэкспорта именованных экспортов
    export {default} from './user.js'; // для реэкспорта по умолчанию
    ```

<<<<<<< HEAD
Такое особое поведение реэкспорта с экспортом по умолчанию - одна из причин того, почему некоторые разработчики их не любят.
=======
Such oddities of re-exporting a default export are one of the reasons why some developers don't like default exports and prefer named ones.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

## Итого

<<<<<<< HEAD
Вот все варианты `export`, которые мы разобрали в этой и предыдущей главах.
=======
Here are all types of `export` that we covered in this and previous articles.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

Вы можете проверить себя, читая их и вспоминая, что они означают:

- Перед объявлением класса/функции/...:
  - `export [default] class/function/variable ...`
- Отдельный экспорт:
  - `export {x [as y], ...}`.
- Реэкспорт:
  - `export {x [as y], ...} from "module"`
  - `export * from "module"` (не реэкспортирует `export default`).
  - `export {default [as y]} from "module"` (реэкспортирует только `export default`).

Импорт:

<<<<<<< HEAD
- Именованные экспорты из модуля:
  - `import {x [as y], ...} from "module"`
- Импорт по умолчанию:  
  - `import x from "module"`
  - `import {default as x} from "module"`
- Всё сразу:
  - `import * as obj from "module"`
- Только подключить модуль (его код запустится), но не присваивать его переменной:
=======
- Importing named exports:
  - `import {x [as y], ...} from "module"`
- Importing the default export:
  - `import x from "module"`
  - `import {default as x} from "module"`
- Import all:
  - `import * as obj from "module"`
- Import the module (its code runs), but do not assign any of its exports to variables:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
  - `import "module"`

Мы можем поставить `import/export` в начало или в конец скрипта, это не имеет значения.

То есть, технически, такая запись вполне корректна:
```js
sayHi();

// ...

import {sayHi} from './say.js'; // импорт в конце файла
```

<<<<<<< HEAD
На практике импорты, чаще всего, располагаются в начале файла. Но это только для большего удобства.
=======
In practice imports are usually at the start of the file, but that's only for more convenience.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

**Обратите внимание, что инструкции import/export не работают внутри `{...}`.**

Условный импорт, такой как ниже, работать не будет:
```js
if (something) {
  import {sayHi} from "./say.js"; // Ошибка: импорт должен быть на верхнем уровне
}
```

...Но что, если нам в самом деле нужно импортировать что-либо в зависимости от условий? Или в определённое время? Например, загрузить модуль, только когда он станет нужен?

<<<<<<< HEAD
Мы рассмотрим динамические импорты в следующей главе.
=======
We'll see dynamic imports in the next article.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
