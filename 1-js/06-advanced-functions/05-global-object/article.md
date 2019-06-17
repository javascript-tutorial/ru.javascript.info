
# Глобальный объект

Глобальный объект предоставляет переменные и функции, доступные в любом месте программы. В основном те, что встроены в язык или среду исполнения.

В браузере он называется "window", в Node.js — "global", в другой среде исполнения может называться иначе.

Недавно, `globalThis` был добавлен в язык как стандартизированное имя для глобального объекта, которое должно поддерживаться в любом окружении. В некоторых браузерах, а именно, в Edge не на Chromium движке `globalThis` ещё не поддерживается, но может быть легко реализован с помощью полифила. Recently, `globalThis` was added to the language, as a standartized name for a global object, that should be supported across all environments. In some browsers, namely non-Chromium Edge, `globalThis` is not yet supported, but can be easily polyfilled.

Все свойства глобального объекта могут быть достигнуты на прямую. All properties of the global object can be accessed directly:

```js run
alert("Привет");

// то же самое, что и
window.alert("Привет");
```

В браузере, глобальные переменные, объявленные, с помощью `var`, становятся свойствами глобального объекта. In a browser, global variables declared with `var` become the property of the global object:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (становится свойством глобального объекта) 5 (became a property of the global object)
```

Пожалуйста, не полагайтесь на это. Такое поведение существует по причинам совместимости. Современные скрипты используют JavaScript-модули, где такого не происходит. Мы разберём их позже в главе  [](info:modules). Please don't rely on that! This behavior exists for compatibility reasons. Modern scripts use JavaScript modules where such thing doesn't happen. We'll cover them later in the chapter  [](info:modules).

Кроме того, более современные объявления переменных `let` и `const` вообще не проявляют такого поведения. Also, more modern variable declarations `let` and `const` do not exhibit such behavior at all:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (не становится свойством глобального объекта) undefined (doesn't become a property of the global object)
```

Если свойство настольно важное, что вы хотете сделать его доступным глобально, запишите его напрямую, как свойство глобального объекта. If a value is so important that you'd like to make it available globally, write it directly as a property:

```js run
*!*
// сделать информацию о текущем пользователе глобальной, для предоставления доступа к ней всем скриптам make current user information global, to let all scripts access it
window.currentUser = {
  name: "John"
};
*/!*

// где угодно в коде somewhere else in code
alert(currentUser.name);  // John

// или, если у нас есть локальная переменная с именем "value" or, if we have a local variable with the name "value"
// полумим её из window явно (безопасно!) get it from window explicitly (safe!)
alert(window.currentUser.name); // John
```

Тем не менее, обычно не рекумендуется использование глобальных перемнныех. Следует пременять из как можно реже. Код, где функция на вход получает переменные и выдаёт определённый результат, чище, надёжней и удобней для тестирования. That said, using global variables is generally discouraged. There should be as few global variables as possible. The code design where a function gets "input" variables and produces certain "outcome" is  clearer, less prone to errors and easier to test.

## Использование полифилов Using for polyfills

Мы можем проверить, поддерживает ли глобальный объект современные возможности языка.

    Например, проверить наличие встроенного объекта `Promise` (такая поддержка отсутствует в очень старых браузерах):
    ```js run
    if (!window.Promise) {
      alert("Ваш браузер очень старый!");
    }
    ```

Если нет (скажем, используется старый браузер), мы можем создать полифил: добавить функции, которые не поддерживаются окружением, но существуют в современном стандарте.  If there's none (say, we're in an old browser), we can create "polyfills": add functions that are not supported by the environment, but exist in the modern standard.

```js run
if (!window.Promise) {
  window.Promise = ... // собственная реализация современной возможности языка custom implementation of the modern language feature
}
```

## Итого Summary

- Глобальный объект хранит переменные, которые должны быть доступны в любом месте программы. The global object holds variables that should be available everywhere.

    Это включает в себя как встроенные конструкции, например, `Array`, так и характерные для окружения свойства, например, `window.innerHeight` -- высота окна браузера.  That includes JavaScript built-ins, such as `Array` and environment-specific values, such as `window.innerHeight` -- the window height in the browser.
- Глобальный объект имеет универсальное (общее??) имя -- `globalThis`. The global object has a universal name `globalThis`.

    ...Но чаще на него ссылаются по-старому, используя имя окружения, такое как `window` (браузер) и `global` (Node.js). Так как `globalThis` появился недавно, он не поддерживается браузерами, созданными не на движке Chromium (можно использовать полифил). But more often is referred by "old-school" environment-specific names, such as `window` (browser) and `global` (Node.js). As `globalThis` is a recent proposal, it's not supported in non-Chromium Edge (but can be polyfilled).
- Следует хранить значения в глобальном объекте, только если они действительно глобальны для нашего проекта. И стараться свести их количество к минимуму. We should store values in the global object only if they're truly global for our project. And keep their number at minimum.
- В браузерах, если только мы не используем [modules](info:modules), глобальные переменные, объявленные с помощью `var`, становятся свойствами глобального объекта. In-browser, unless we're using [modules](info:modules), a global variable declared with `var` becomes a property of the global object.

    Для того, чтобы код был проще и его легче было поддерживать в будущем, следует обращаться к свойствам глобального объекта напрямую: `window.x = ...` вместо `var x = ...`. To make the code easier to understand and more future-proof, we should operate directly on the properties of the global object: `window.x = ...` instead of `var x = ...`.

---

# Глобальный объект

Глобальный объект предоставляет переменные и функции, доступные в любом месте программы. В основном те, что встроены в язык или среду исполнения.

В браузере он называется "window", в Node.js — "global", в другой среде исполнения может называться иначе.

Например, вызовем `alert` как метод `window`:

```js run
alert("Привет");

// то же самое, что и
window.alert("Привет");
```

Мы можем ссылаться на другие встроенные функции, к примеру, `Array` так: `window.Array`. Или создавать свои собственные свойства глобального объекта.

## Браузер: объект "window"

По историческим причинам браузерный объект `window` выглядит слегка запутанно.

1. Он предоставляет инструменты для работы с окном браузера, а также играет роль глобального объекта.

    Можно использовать `window` для доступа к свойствам и методам характерным для окна браузера:

    ```js run
    alert(window.innerHeight); // выводит высоту окна браузера

    window.open('http://google.com'); // открывает новое окно браузера
    ```

2. Если переменные, объявленные с помощью `var`, или функции типа Function Declaration находятся на верхнем уровне программы, то они автоматически становятся свойствами `window`.

    Например:
    ```js untrusted run no-strict refresh
    var x = 5;

    alert(window.x); // 5 (var x становится свойством window)

    window.x = 0;

    alert(x); // 0, переменная изменена
    ```

    Обратите внимание, что этого не происходит с более современными объявлениями `let/const`:

    ```js untrusted run no-strict refresh
    let x = 5;

    alert(window.x); // undefined ("let" не создаёт свойства window)
    ```

3. Кроме того, все скрипты имеют общую глобальную область видимости, поэтому переменные, объявленные в одном теге `<script>`, становятся доступными в других:

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

4. Мелочь, но всё же стоит сказать, что значение `this` в глобальной области видимости — `window`.

    ```js untrusted run no-strict refresh
    alert(this); // window
    ```

Почему так? На момент создания языка объединение различных данных в одном объекте `window` должно было "упростить" работу. Но с тех пор многое изменилось. Крошечные скрипты превратились в крупные приложения, требующие правильной архитектуры.

Хорошо ли, что разные скрипты (возможно, из разных источников) "видят" переменные друг друга?

Нет, потому что это может привести к конфликту имён: если одинаковые имена переменных используются двумя скриптами — эти переменные будут конфликтовать между собой.

Сейчас "многоцелевой" `window` считается ошибкой проектирования языка.

К счастью, есть "дорога из ада" — JavaScript-модули.

Если мы назначим тегу `<script>` атрибут `type="module"`, такой скрипт будет считаться отдельным модулем с собственной областью видимости верхнего уровня (лексическим окружением), не пересекающейся с `window`.

- В модуле `var x` не станет свойством `window`:

    ```html run
    <script type="module">
      var x = 5;

      alert(window.x); // undefined
    </script>
    ```

- Два модуля, которые не "видят" переменные друг друга:

    ```html run
    <script type="module">
      let x = 5;
    </script>

    <script type="module">
      alert(window.x); // undefined
      alert(x); // Ошибка: переменная не объявлена
    </script>
    ```

- И последнее: в модуле значение `this` на верхнем уровне равно `undefined` (действительно, почему должно быть `window`?):

    ```html run
    <script type="module">
      alert(this); // undefined
    </script>
    ```

**Использование `<script type="module">` исправляет недостаток проектирования языка, отделяя область видимости верхнего уровня от `window`.**

Мы рассмотрим другие свойства модулей позже в главе [](info:modules).

## Допустимое использование глобального объекта

1. Обычно не рекомендуется использовать глобальные переменные. Желательно применять их как можно реже. Однако, если нужно поместить что-либо в глобальную область видимости, мы можем добавить это в `window` (или `global` в Node.js).

    Поместим информацию о текущем пользователе в глобальный объект, чтобы она была доступна другим скриптам:

    ```js run
    // явное назначение свойства `window`
    window.currentUser = {
      name: "John",
      age: 30
    };

    // далее, где угодно в другом скрипте
    alert(window.currentUser.name); // John
    ```

2. Мы можем проверить, поддерживает ли глобальный объект современные возможности языка.

    Например, проверить наличие встроенного объекта `Promise` (такая поддержка отсутствует в очень старых браузерах):
    ```js run
    if (!window.Promise) {
      alert("Ваш браузер очень старый!");
    }
    ```

3. Мы можем создать полифил: добавить функции, которые не поддерживаются окружением (скажем, старым браузером), но существуют в современном стандарте.

    ```js run
    if (!window.Promise) {
      window.Promise = ... // собственная реализация современной возможности языка
    }
    ```

...И, конечно, если в браузере мы используем `window` для доступа к функциям окна браузера (не глобального объекта) — это вполне нормально.
