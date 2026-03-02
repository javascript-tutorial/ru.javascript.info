
# Модули, введение

<<<<<<< HEAD
По мере роста нашего приложения, мы обычно хотим разделить его на много файлов, так называемых "модулей". Модуль обычно содержит класс или библиотеку с функциями.
=======
As our application grows bigger, we want to split it into multiple files, so called "modules". A module may contain a class or a library of functions for a specific purpose.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Долгое время в JavaScript отсутствовал синтаксис модулей на уровне языка. Это не было проблемой, потому что первые скрипты были маленькими и простыми. В модулях не было необходимости.

Но со временем скрипты становились всё более и более сложными, поэтому сообщество придумало несколько вариантов организации кода в модули. Появились библиотеки для динамической подгрузки модулей.

<<<<<<< HEAD
Например:

- [AMD](https://ru.wikipedia.org/wiki/Asynchronous_module_definition) -- одна из самых старых модульных систем, изначально реализована библиотекой [require.js](https://requirejs.org/).
- [CommonJS](https://wiki.commonjs.org/wiki/Modules/1.1) -- модульная система, созданная для сервера Node.js.
- [UMD](https://github.com/umdjs/umd) -- ещё одна модульная система, предлагается как универсальная, совместима с AMD и CommonJS.

Теперь все они постепенно становятся частью истории, хотя их и можно найти в старых скриптах.

Система модулей на уровне языка появилась в стандарте JavaScript в 2015 году и постепенно эволюционировала. На данный момент она поддерживается большинством браузеров и Node.js. Далее мы будем изучать именно её.
=======
To name some (for historical reasons):

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- one of the most ancient module systems, initially implemented by the library [require.js](https://requirejs.org/).
- [CommonJS](https://wiki.commonjs.org/wiki/Modules/1.1) -- the module system created for Node.js server.
- [UMD](https://github.com/umdjs/umd) -- one more module system, suggested as a universal one, compatible with AMD and CommonJS.

Now these all slowly became a part of history, but we still can find them in old scripts.

The language-level module system appeared in the standard in 2015, gradually evolved since then, and is now supported by all major browsers and in Node.js. So we'll study the modern JavaScript modules from now on.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

## Что такое модуль?

<<<<<<< HEAD
Модуль - это просто файл. Один скрипт - это один модуль.
=======
A module is just a file. One script is one module. As simple as that.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Модули могут загружать друг друга и использовать директивы `export` и `import`, чтобы обмениваться функциональностью, вызывать функции одного модуля из другого:

<<<<<<< HEAD
- `export` отмечает переменные и функции, которые должны быть доступны вне текущего модуля.
- `import` позволяет импортировать функциональность из других модулей.
=======
- `export` keyword labels variables and functions that should be accessible from outside the current module.
- `import` allows the import of functionality from other modules.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Например, если у нас есть файл `sayHi.js`, который экспортирует функцию:

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

...Тогда другой файл может импортировать её и использовать:

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
```

<<<<<<< HEAD
Директива `import` загружает модуль по пути `./sayHi.js` относительно текущего файла и записывает экспортированную функцию `sayHi` в соответствующую переменную.
=======
The `import` directive loads the module by path `./sayHi.js` relative to the current file, and assigns exported function `sayHi` to the corresponding variable.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Давайте запустим пример в браузере.

<<<<<<< HEAD
Так как модули поддерживают ряд специальных ключевых слов, и у них есть ряд особенностей, то необходимо явно сказать браузеру, что скрипт является модулем, при помощи атрибута `<script type="module">`.
=======
As modules support special keywords and features, we must tell the browser that a script should be treated as a module, by using the attribute `<script type="module">`.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Вот так:

[codetabs src="say" height="140" current="index.html"]

Браузер автоматически загрузит и запустит импортированный модуль (и те, которые он импортирует, если надо), а затем запустит скрипт.

<<<<<<< HEAD
```warn header="Модули не работают локально. Только через HTTP(s)"
Если вы попытаетесь открыть веб-страницу локально, через протокол `file://`, вы обнаружите, что директивы `import/export` не работают. Для тестирования модулей используйте локальный веб-сервер, например, [static-server](https://www.npmjs.com/package/static-server#getting-started) или используйте возможности "живого сервера" вашего редактора, например, расширение [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) для VS Code.
```
=======
```warn header="Modules work only via HTTP(s), not locally"
If you try to open a web-page locally, via `file://` protocol, you'll find that `import/export` directives don't work. Use a local web-server, such as [static-server](https://www.npmjs.com/package/static-server#getting-started) or use the "live server" capability of your editor, such as VS Code [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to test modules.
```

## Core module features
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

## Основные возможности модулей

Чем отличаются модули от "обычных" скриптов?

Есть основные возможности и особенности, работающие как в браузере, так и в серверном JavaScript.

<<<<<<< HEAD
### Всегда "use strict"

В модулях всегда используется режим `use strict`. Например, присваивание к необъявленной переменной вызовет ошибку.
=======
Modules always work in strict mode. E.g. assigning to an undeclared variable will give an error.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```html run
<script type="module">
  a = 5; // ошибка
</script>
```

### Своя область видимости переменных

Каждый модуль имеет свою собственную область видимости. Другими словами, переменные и функции, объявленные в модуле, не видны в других скриптах.

<<<<<<< HEAD
В следующем примере импортированы 2 скрипта, и `hello.js` пытается использовать переменную `user`, объявленную в `user.js`. В итоге ошибка:

[codetabs src="scopes" height="140" current="index.html"]

Модули должны экспортировать функциональность, предназначенную для использования извне. А другие модули могут её импортировать.

Так что нам надо импортировать `user.js` в `hello.js` и взять из него нужную функциональность, вместо того чтобы полагаться на глобальные переменные.

Правильный вариант:

[codetabs src="scopes-working" height="140" current="hello.js"]

В браузере также существует независимая область видимости для каждого скрипта `<script type="module">`:
=======
In the example below, two scripts are imported, and `hello.js` tries to use `user` variable declared in `user.js`. It fails, because it's a separate module (you'll see the error in the console):

[codetabs src="scopes" height="140" current="index.html"]

Modules should `export` what they want to be accessible from outside and `import` what they need.

- `user.js` should export the `user` variable.
- `hello.js` should import it from `user.js` module.

In other words, with modules we use import/export instead of relying on global variables.

This is the correct variant:

[codetabs src="scopes-working" height="140" current="hello.js"]

In the browser, if we talk about HTML pages, independent top-level scope also exists for each `<script type="module">`.

Here are two scripts on the same page, both `type="module"`. They don't see each other's top-level variables:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```html run
<script type="module">
  // Переменная доступна только в этом модуле
  let user = "John";
</script>

<script type="module">
  *!*
  alert(user); // Error: user is not defined
  */!*
</script>
```

<<<<<<< HEAD
Если нам нужно сделать глобальную переменную уровня всей страницы, можно явно присвоить её объекту `window`, тогда получить значение переменной можно обратившись к `window.user`. Но это должно быть исключением, требующим веской причины.
=======
```smart
In the browser, we can make a variable window-level global by explicitly assigning it to a `window` property, e.g. `window.user = "John"`. 

Then all scripts will see it, both with `type="module"` and without it. 

That said, making such global variables is frowned upon. Please try to avoid them.
```
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

### Код в модуле выполняется только один раз при импорте

<<<<<<< HEAD
Если один и тот же модуль используется в нескольких местах, то его код выполнится только один раз, после чего экспортируемая функциональность передаётся всем импортёрам.

Это очень важно для понимания работы модулей. Давайте посмотрим примеры.
=======
If the same module is imported into multiple other modules, its code is executed only once, upon the first import. Then its exports are given to all further importers.

The one-time evaluation has important consequences, that we should be aware of. 

Let's see a couple of examples.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Во-первых, если при запуске модуля возникают побочные эффекты, например выдаётся сообщение, то импорт модуля в нескольких местах покажет его только один раз - при первом импорте:

```js
// 📁 alert.js
alert("Модуль выполнен!");
```

```js
// Импорт одного и того же модуля в разных файлах

// 📁 1.js
import `./alert.js`; // Модуль выполнен!

// 📁 2.js
import `./alert.js`; // (ничего не покажет)
```

<<<<<<< HEAD
На практике, задача кода модуля - это обычно инициализация, создание внутренних структур данных, а если мы хотим, чтобы что-то можно было использовать много раз, то экспортируем это.

Теперь более продвинутый пример.
=======
The second import shows nothing, because the module has already been evaluated.

There's a rule: top-level module code should be used for initialization, creation of module-specific internal data structures. If we need to make something callable multiple times - we should export it as a function, like we did with `sayHi` above.

Now, let's consider a deeper example.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Давайте представим, что модуль экспортирует объект:

```js
// 📁 admin.js
export let admin = {
  name: "John"
};
```

Если модуль импортируется в нескольких файлах, то код модуля будет выполнен только один раз, объект `admin` будет создан и в дальнейшем будет передан всем импортёрам.

Все импортёры получат один-единственный объект `admin`:

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
<<<<<<< HEAD
// Оба файла, 1.js и 2.js, импортируют один и тот же объект
// Изменения, сделанные в 1.js, будут видны в 2.js
*/!*
```

Ещё раз заметим -- модуль выполняется только один раз. Генерируется экспорт и после передаётся всем импортёрам, поэтому, если что-то изменится в объекте `admin`, то другие модули тоже увидят эти изменения.

Такое поведение позволяет *конфигурировать* модули при первом импорте. Мы можем установить его свойства один раз, и в дальнейших импортах он будет уже настроенным.

Например, модуль `admin.js` предоставляет определённую функциональность, но ожидает передачи учётных данных в объект `admin` извне:
=======
// Both 1.js and 2.js reference the same admin object
// Changes made in 1.js are visible in 2.js
*/!*
```

As you can see, when `1.js` changes the `name` property in the imported `admin`, then `2.js` can see the new `admin.name`.

That's exactly because the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the `admin` object, other importers will see that.

**Such behavior is actually very convenient, because it allows us to *configure* modules.**

In other words, a module can provide a generic functionality that needs a setup. E.g. authentication needs credentials. Then it can export a configuration object expecting the outer code to assign to it.

Here's the classical pattern:
1. A module exports some means of configuration, e.g. a configuration object.
2. On the first import we initialize it, write to its properties. The top-level application script may do that.
3. Further imports use the module.

For instance, the `admin.js` module may provide certain functionality (e.g. authentication), but expect the credentials to come into the `config` object from outside:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
// 📁 admin.js
export let config = { };

export function sayHi() {
  alert(`Ready to serve, ${config.user}!`);
}
```

<<<<<<< HEAD
В `init.js`, первом скрипте нашего приложения, мы установим `admin.name`. Тогда все это увидят, включая вызовы, сделанные из самого `admin.js`:
=======
Here, `admin.js` exports the `config` object (initially empty, but may have default properties too).

Then in `init.js`, the first script of our app, we import `config` from it and set `config.user`:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
// 📁 init.js
import {config} from './admin.js';
config.user = "Pete";
```

<<<<<<< HEAD
Другой модуль тоже увидит `admin.name`:
=======
...Now the module `admin.js` is configured. 

Further importers can call it, and it correctly shows the current user:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
// 📁 another.js
import {sayHi} from './admin.js';

sayHi(); // Ready to serve, *!*Pete*/!*!
```


### import.meta

Объект `import.meta` содержит информацию о текущем модуле.

<<<<<<< HEAD
Содержимое зависит от окружения. В браузере он содержит ссылку на скрипт или ссылку на текущую веб-страницу, если модуль встроен в HTML:

```html run height=0
<script type="module">
  alert(import.meta.url); // ссылка на html страницу для встроенного скрипта
=======
Its content depends on the environment. In the browser, it contains the URL of the script, or a current webpage URL if inside HTML:

```html run height=0
<script type="module">
  alert(import.meta.url); // script URL
  // for an inline script - the URL of the current HTML-page
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
</script>
```

### В модуле "this" не определён

Это незначительная особенность, но для полноты картины нам нужно упомянуть об этом.

В модуле на верхнем уровне `this` не определён (undefined).

Сравним с не-модульными скриптами, там `this` - глобальный объект:

```html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

## Особенности в браузерах

Есть и несколько других, именно браузерных особенностей скриптов с `type="module"` по сравнению с обычными скриптами.

<<<<<<< HEAD
Если вы читаете материал в первый раз или, если не собираетесь использовать модули в браузерах, то сейчас можете пропустить эту секцию.
=======
You may want to skip this section for now if you're reading for the first time, or if you don't use JavaScript in a browser.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

### Модули являются отложенными (deferred)

Модули *всегда* выполняются в отложенном (deferred) режиме, точно так же, как скрипты с атрибутом `defer` (описан в главе [](info:script-async-defer)). Это верно и для внешних и встроенных скриптов-модулей.

<<<<<<< HEAD
Другими словами:
- загрузка внешних модулей, таких как `<script type="module" src="...">`, не блокирует обработку HTML.
- модули, даже если загрузились быстро, ожидают полной загрузки HTML документа, и только затем выполняются.
- сохраняется относительный порядок скриптов: скрипты, которые идут раньше в документе, выполняются раньше.

Как побочный эффект, модули всегда видят полностью загруженную HTML-страницу, включая элементы под ними.
=======
In other words:
- downloading external module scripts `<script type="module" src="...">` doesn't block HTML processing, they load in parallel with other resources.
- module scripts wait until the HTML document is fully ready (even if they are tiny and load faster than HTML), and then run.
- relative order of scripts is maintained: scripts that go first in the document, execute first.

As a side effect, module scripts always "see" the fully loaded HTML-page, including HTML elements below them.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Например:

```html run
<script type="module">
*!*
  alert(typeof button); // object: скрипт может 'видеть' кнопку под ним
*/!*
  // так как модули являются отложенными, то скрипт начнёт выполнятся только после полной загрузки страницы
</script>

Сравните с обычным скриптом ниже:

<script>
*!*
<<<<<<< HEAD
  alert(typeof button); // Ошибка: кнопка не определена, скрипт не видит элементы под ним
=======
  alert(typeof button); // button is undefined, the script can't see elements below
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
*/!*
  // обычные скрипты запускаются сразу, не дожидаясь полной загрузки страницы
</script>

<button id="button">Кнопка</button>
```

<<<<<<< HEAD
Пожалуйста, обратите внимание: второй скрипт выполнится раньше, чем первый! Поэтому мы увидим сначала `undefined`, а потом `object`.

Это потому, что модули начинают выполняться после полной загрузки страницы. Обычные скрипты запускаются сразу же, поэтому сообщение из обычного скрипта мы видим первым.

При использовании модулей нам стоит иметь в виду, что HTML-страница будет показана браузером до того, как выполнятся модули и JavaScript-приложение будет готово к работе. Некоторые функции могут ещё не работать. Нам следует разместить "индикатор загрузки" или что-то ещё, чтобы не смутить этим посетителя.
=======
Please note: the second script actually runs before the first! So we'll see `undefined` first, and then `object`.

That's because modules are deferred, so we wait for the document to be processed. The regular script runs immediately, so we see its output first.

When using modules, we should be aware that the HTML page shows up as it loads, and JavaScript modules run after that, so the user may see the page before the JavaScript application is ready. Some functionality may not work yet. We should put "loading indicators", or otherwise ensure that the visitor won't be confused by that.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

### Атрибут async работает во встроенных скриптах

<<<<<<< HEAD
Для не-модульных скриптов атрибут `async` работает только на внешних скриптах. Скрипты с ним запускаются сразу по готовности, они не ждут другие скрипты или HTML-документ.

Для модулей атрибут `async` работает на любых скриптах.

Например, в скрипте ниже есть `async`, поэтому он выполнится сразу после загрузки, не ожидая других скриптов.

Скрипт выполнит импорт (загрузит `./analytics.js`) и сразу запустится, когда будет готов, даже если HTML документ ещё не будет загружен, или если другие скрипты ещё загружаются.
=======
For non-module scripts, the `async` attribute only works on external scripts. Async scripts run immediately when ready, independently of other scripts or the HTML document.

For module scripts, it works on inline scripts as well.

For example, the inline script below has `async`, so it doesn't wait for anything.

It performs the import (fetches `./analytics.js`) and runs when ready, even if the HTML document is not finished yet, or if other scripts are still pending.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Это очень полезно, когда модуль ни с чем не связан, например для счётчиков, рекламы, обработчиков событий.

```html
<!-- загружаются зависимости (analytics.js) и скрипт запускается -->
<!-- модуль не ожидает загрузки документа или других тэгов <script> -->
<script *!*async*/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### Внешние скрипты

Внешние скрипты с атрибутом `type="module"` имеют два отличия:

<<<<<<< HEAD
1. Внешние скрипты с одинаковым атрибутом `src` запускаются только один раз:
=======
1. External scripts with the same `src` run only once:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
    ```html
    <!-- скрипт my.js загрузится и будет выполнен только один раз -->
    <script type="module" src="my.js"></script>
    <script type="module" src="my.js"></script>
    ```

2. Внешний скрипт, который загружается с другого домена, требует указания заголовков [CORS](mdn:Web/HTTP/CORS). Другими словами, если модульный скрипт загружается с другого домена, то удалённый сервер должен установить заголовок `Access-Control-Allow-Origin` означающий, что загрузка скрипта разрешена.
    ```html
    <!-- another-site.com должен указать заголовок Access-Control-Allow-Origin -->
    <!-- иначе, скрипт не выполнится -->
    <script type="module" src="*!*http://another-site.com/their.js*/!*"></script>
    ```

    Это обеспечивает лучшую безопасность по умолчанию.

### Не допускаются "голые" модули

В браузере `import` должен содержать относительный или абсолютный путь к модулю. Модули без пути называются "голыми" (bare). Они не разрешены в `import`.

Например, этот `import` неправильный:
```js
import {sayHi} from 'sayHi'; // Ошибка, "голый" модуль
// путь должен быть, например './sayHi.js' или абсолютный
```

<<<<<<< HEAD
Другие окружения, например Node.js, допускают использование "голых" модулей, без путей, так как в них есть свои правила, как работать с такими модулями и где их искать. Но браузеры пока не поддерживают "голые" модули.
=======
Certain environments, like Node.js or bundle tools allow bare modules, without any path, as they have their own ways for finding modules and hooks to fine-tune them. But browsers do not support bare modules yet.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

### Совместимость, "nomodule"

<<<<<<< HEAD
Старые браузеры не понимают атрибут `type="module"`. Скрипты с неизвестным атрибутом `type` просто игнорируются. Мы можем сделать для них "резервный" скрипт при помощи атрибута `nomodule`:
=======
Old browsers do not understand `type="module"`. Scripts of an unknown type are just ignored. For them, it's possible to provide a fallback using the `nomodule` attribute:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```html run
<script type="module">
  alert("Работает в современных браузерах");
</script>

<script nomodule>
  alert("Современные браузеры понимают оба атрибута - и type=module, и nomodule, поэтому пропускают этот тег script")
  alert("Старые браузеры игнорируют скрипты с неизвестным атрибутом type=module, но выполняют этот.");
</script>
```

## Инструменты сборки

В реальной жизни модули в браузерах редко используются в "сыром" виде. Обычно, мы объединяем модули вместе, используя специальный инструмент, например [Webpack](https://webpack.js.org/) и после выкладываем код на рабочий сервер.

Одно из преимуществ использования сборщика -- он предоставляет больший контроль над тем, как модули ищутся, позволяет использовать "голые" модули и многое другое "своё", например CSS/HTML-модули.

Сборщик делает следующее:

<<<<<<< HEAD
1. Берёт "основной" модуль, который мы собираемся поместить в `<script type="module">` в HTML.
2. Анализирует зависимости (импорты, импорты импортов и так далее)
3. Собирает один файл со всеми модулями (или несколько файлов, это можно настроить), перезаписывает встроенный `import` функцией импорта от сборщика, чтобы всё работало. "Специальные" типы модулей, такие как HTML/CSS тоже поддерживаются.
4. В процессе могут происходить и другие трансформации и оптимизации кода:
    - Недостижимый код удаляется.
    - Неиспользуемые экспорты удаляются ("tree-shaking").
    - Специфические операторы для разработки, такие как `console` и `debugger`, удаляются.
    - Современный синтаксис JavaScript также может быть трансформирован в предыдущий стандарт, с похожей функциональностью, например, с помощью [Babel](https://babeljs.io/).
    - Полученный файл можно минимизировать (удалить пробелы, заменить названия переменных на более короткие и т.д.).
=======
1. Take a "main" module, the one intended to be put in `<script type="module">` in HTML.
2. Analyze its dependencies: imports and then imports of imports etc.
3. Build a single file with all modules (or multiple files, that's tunable), replacing native `import` calls with bundler functions, so that it works. "Special" module types like HTML/CSS modules are also supported.
4. In the process, other transformations and optimizations may be applied:
    - Unreachable code removed.
    - Unused exports removed ("tree-shaking").
    - Development-specific statements like `console` and `debugger` removed.
    - Modern, bleeding-edge JavaScript syntax may be transformed to older one with similar functionality using [Babel](https://babeljs.io/).
    - The resulting file is minified (spaces removed, variables replaced with shorter names, etc).
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Если мы используем инструменты сборки, то они объединяют модули вместе в один или несколько файлов, и заменяют `import/export` на свои вызовы. Поэтому итоговую сборку можно подключать и без атрибута `type="module"`, как обычный скрипт:

```html
<!-- Предположим, что мы собрали bundle.js, используя например утилиту Webpack -->
<script src="bundle.js"></script>
```

Хотя и "как есть" модули тоже можно использовать, а сборщик настроить позже при необходимости.

## Итого

Подводя итог, основные понятия:

1. Модуль - это файл. Чтобы работал `import/export`, нужно для браузеров указывать атрибут `<script type="module">`. У модулей есть ряд особенностей:
    - Отложенное (deferred) выполнение по умолчанию.
    - Атрибут async работает во встроенных скриптах.
    - Для загрузки внешних модулей с другого источника, он должен ставить заголовки CORS.
    - Дублирующиеся внешние скрипты игнорируются.
2. У модулей есть своя область видимости, обмениваться функциональностью можно через `import/export`.
3. В модулях всегда включена директива `use strict`.
4. Код в модулях выполняется только один раз. Экспортируемая функциональность создаётся один раз и передаётся всем импортёрам.

<<<<<<< HEAD
Когда мы используем модули, каждый модуль реализует свою функциональность и экспортирует её. Затем мы используем `import`, чтобы напрямую импортировать её туда, куда необходимо. Браузер загружает и анализирует скрипты автоматически.
=======
When we use modules, each module implements the functionality and exports it. Then we use `import` to directly import it where it's needed. The browser loads and evaluates the scripts automatically.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

В реальной жизни часто используется сборщик [Webpack](https://webpack.js.org), чтобы объединить модули: для производительности и других "плюшек".

В следующей главе мы увидим больше примеров и вариантов импорта/экспорта.
