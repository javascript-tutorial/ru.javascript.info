
# Глобальный объект

Глобальный объект предоставляет переменные и функции, доступные в любом месте программы. В основном те, что встроенны в язык или среду исполнения. The global object provides variables and functions that are available anywhere. Mostly, the ones that are built into the language or the host environment.

В браузере он назыается "window", в Node.js — "global", в другой среде исполнения глобальный объект может называться иначе. In a browser it is named "window", for Node.js it is "global", for other environments it may have another name.

Например, мы можем вызвать `alert` как метод `window`: For instance, we can call `alert` as a method of `window`:

```js run
alert("Hello");

// the same as
window.alert("Hello");
```

Мы можем ссылаться на другие встроенные функции типа `Array` как `window.Array` или создавать свои собственные свойства глобального объекта.  We can reference other built-in functions like `Array` as `window.Array` and create our own properties on it.

## Браузер: объект "window" Browser: the "window" object

По историческим причинам, браузерный объект `window` выглядит слегка запутанно. For historical reasons, in-browser `window` object is a bit messed up.

1. Он предоставляет инструменты для работы с окном браузера, а также играет роль глобального объекта.  It provides the "browser window" functionality, besides playing the role of a global object.

    Мы можем использовать `window` для доступа к свойствам и методам характерным для окна браузера. We can use `window` to access properties and methods, specific to the browser window:

    ```js run
    alert(window.innerHeight); // выводит высоту окна браузера  shows the browser window height

    window.open('http://google.com'); // открывает новое окно браузера opens a new browser window
    ```

2. Если переменные, объявленные с помощью `var` или декларации функиций находятся на верхнем уровне программы, то они автоматически становятся свойствами `window`. Top-level `var` variables and function declarations automatically become properties of `window`.

    Например For instance:
    ```js untrusted run no-strict refresh
    var x = 5;

    alert(window.x); // 5 (var x становиться свойством window) 5 (var x becomes a property of window)

    window.x = 0;

    alert(x); // 0, переменная изменена variable modified
    ```

    Обратите внимание, что этого не происходит с более современными `let/const` объявлениями. Please note, that doesn't happen with more modern `let/const` declarations:

    ```js untrusted run no-strict refresh
    let x = 5;

    alert(window.x); // undefined ("let" не создаёт свойства window) undefined ("let" doesn't create a window property)
    ```

3. Кроме того, все скрипты имеют общюю глобальную область видимотси, поэтому переменные, объявленные в одном теге `<script>` становятся видимыми в других. Also, all scripts share the same global scope, so variables declared in one `<script>` become visible in  another ones:

    ```html run
    <script>
      var a = 1;
      let b = 2;
    </script>

    <script>
      alert(a); // 1
      alert(b); // 2
    </script>
    ```

4. Мелочь, но всё же, значение `this` в глобальной области видимости — `window`. And, a minor thing, but still: the value of `this` in the global scope is `window`.

    ```js untrusted run no-strict refresh
    alert(this); // window
    ```

Почему было сделано так? На момент создания языка, объединение нескольких аспектов в одном объекте `window`, должно было "упростить" работу. Но с тех пор многое изменилось. Крошечные скрипты превратились в крупные приложения, требующие правльной архитектуры.  Why was it made like this? At the time of the language creation, the idea to merge multiple aspects into a single `window` object was to "make things simple". But since then many things changed. Tiny scripts became big applications that require proper architecture.

Хорошо ли, что разные скрипты (возможно из разных источников) "видят" переменные друг друга? Is it good that different scripts (possibly from different sources) see variables of each other?

Нет, потому что это может привести к конфликту имён: одинаковые имена переменных могут использоваться двумя скриптами для различных целей и эти переменные будут конфликтовать между собой.  No, it's not, because it may lead to naming conflicts: the same variable name can be used in two scripts for different purposes, so they will conflict with each other.

Сейчас, многоцелевой `window` считается ошибкой проектирования языка. As of now, the multi-purpose `window` is considered a design mistake in the language.

К счастью, есть "дорога из ада" — JavaScript модули. Luckily, there's a "road out of hell", called "JavaScript modules".

Если мы установим тегу `<script>` атрибут `type="module"`, такой скрипт будет считаться отдельным модулем сосбственной областью видимости верхнего уровня (лексическим окружением) не пересекающейся с `window`.  If we set `type="module"` attribute on a `<script>` tag, then such script is considered a separate "module" with its own top-level scope (lexical environment), not interfering with `window`.

- В модуле `var x` не станет свойством `window`:  - In a module, `var x` does not become a property of `window`:

    ```html run
    <script type="module">
      var x = 5;

      alert(window.x); // undefined
    </script>
    ```

- Два модуля, которые не видят переменные друг друга: - Two modules that do not see variables of each other:

    ```html run
    <script type="module">
      let x = 5;
    </script>

    <script type="module">
      alert(window.x); // undefined
      alert(x); // Ошибка: переменная не объявлена Error: undeclared variable
    </script>
    ```

- И последнее, в модуле значение `this` на верхнем уровне равно `undefined` (действительно, почему должно быть `window`?): - And, the last minor thing, the top-level value of `this` in a module is `undefined` (why should it be `window` anyway?):

    ```html run
    <script type="module">
      alert(this); // undefined
    </script>
    ```

**Используйте `<script type="module">`, чтобы исправить недостаток проектирования языка, отделяя область видимости верхнего уровня от `window`. Using `<script type="module">` fixes the design flaw of the language by separating top-level scope from `window`.**

Мы рассмотрим другие свойства модулей позже в главе  We'll cover more features of modules later, in the chapter [](info:modules).

## Допустимое (правильное?) использование глобального объекта  Valid uses of the global object

1. Обычно не рекомендуется использовать глобальные переменные. Желатьльно, применать как можно мешьше таких переменных. Однако, если нужно поместить что-либо в глобальную область видимости, мы можем захотеть добавить это в `window` (или `global` в Node.js) Using global variables is generally discouraged. There should be as few global variables as possible, but if we need to make something globally visible, we may want to put it into `window` (or `global` in Node.js).

    Мы помещаем информацию о текущем пользователе в глобальный объект, чтобы она была доступна другим скриптам. Here we put the information about the current user into a global object, to be accessible from all other scripts:

    ```js run
    // явное назначение свойства `window`  explicitly assign it to `window`
    window.currentUser = {
      name: "John",
      age: 30
    };

    // далее, где угодно в другом скрипте  then, elsewhere, in another script
    alert(window.currentUser.name); // John
    ```

2. Мы можем проверить, поддерживает ли глобальный объект современные возможности языка.  We can test the global object for support of modern language features.

    Например, проверить наличие встроенного объекта `Promise` (такая поддержка отсутствует в очень старых браузерах). For instance, test if a build-in `Promise` object exists (it doesn't in really old browsers):
    ```js run
    if (!window.Promise) {
      alert("Ваш браузер очень старый!"); alert("Your browser is really old!");
    }
    ```

3. Мы можем создать полифилл: добавить функции, которые не поддерживаются окружением (скажем, старым браузером), но сущемтвуют в современном стандарте.  We can create "polyfills": add functions that are not supported by the environment (say, an old browser), but exist in the modern standard.

    ```js run
    if (!window.Promise) {
      window.Promise = ... // собственная реализация современной возможности языка custom implementation of the modern language feature
    }
    ```

...И конечно, если в браузере мы используем `window` для доступа к функциям окна браузера (не как глобального объекта) это вполне нормально.  And of course, if we're in a browser, using `window` to access browser window features (not as a global object) is completely fine.
