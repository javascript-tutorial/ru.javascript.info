# Страница: DOMContentLoaded, load, beforeunload, unload

У жизненного цикла HTML-страницы есть три важных события:

<<<<<<< HEAD
- `DOMContentLoaded` -- браузер полностью загрузил HTML, было построено DOM-дерево, но внешние ресурсы, такие как картинки `<img>` и стили, могут быть ещё не загружены.
- `load` -- браузер загрузил HTML и внешние ресурсы (картинки, стили и т.д.).
- `beforeunload/unload` -- пользователь покидает страницу.
=======
- `DOMContentLoaded` -- the browser fully loaded HTML, and the DOM tree is built, but external resources like pictures `<img>` and stylesheets may not yet have loaded.
- `load` -- not only HTML is loaded, but also all the external resources: images, styles etc.
- `beforeunload/unload` -- the user is leaving the page.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Каждое из этих событий может быть полезно:

- Событие `DOMContentLoaded` -- DOM готов, так что обработчик может искать DOM-узлы и инициализировать интерфейс.
- Событие `load` -- внешние ресурсы были загружены, стили применены, размеры картинок известны и т.д.
- Событие `beforeunload` -- пользователь покидает страницу. Мы можем проверить, сохранил ли он изменения и спросить, на самом ли деле он хочет уйти.
- `unload` -- пользователь почти ушёл, но мы всё ещё можем запустить некоторые операции, например, отправить статистику.

Давайте рассмотрим эти события подробнее.

## DOMContentLoaded

Событие `DOMContentLoaded` срабатывает на объекте `document`.

Мы должны использовать `addEventListener`, чтобы поймать его:

```js
document.addEventListener("DOMContentLoaded", ready);
// не "document.onDOMContentLoaded = ..."
```

Например:

```html run height=200 refresh
<script>
  function ready() {
    alert('DOM готов');

<<<<<<< HEAD
    // изображение ещё не загружено (если не было закешировано), так что размер будет 0x0
    alert(`Размер изображения: ${img.offsetWidth}x${img.offsetHeight}`);
=======
    // image is not yet loaded (unless it was cached), so the size is 0x0
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
  }

*!*
  document.addEventListener("DOMContentLoaded", ready);
*/!*
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

<<<<<<< HEAD
В этом примере обработчик `DOMContentLoaded` запустится, когда документ загрузится, так что он увидит все элементы, включая расположенный ниже `<img>`.
=======
In the example, the `DOMContentLoaded` handler runs when the document is loaded, so it can see all the elements, including `<img>` below.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Но он не дожидается, пока загрузится изображение. Поэтому `alert` покажет нулевой размер.

<<<<<<< HEAD
На первый взгляд событие `DOMContentLoaded` очень простое. DOM-дерево готово -- получаем событие. Хотя тут есть несколько особенностей.
=======
At first sight, the `DOMContentLoaded` event is very simple. The DOM tree is ready -- here's the event. There are few peculiarities though.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

### DOMContentLoaded и скрипты

Когда браузер обрабатывает HTML-документ и встречает тег `<script>`, он должен выполнить его перед тем, как продолжить строить DOM. Это делается на случай, если скрипт захочет изменить DOM или даже дописать в него (`document.write`), так что `DOMContentLoaded` должен подождать.

Поэтому DOMContentLoaded определённо случится после таких скриптов:

```html run
<script>
  document.addEventListener("DOMContentLoaded", () => {
    alert("DOM готов!");
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

<script>
  alert("Библиотека загружена, встроенный скрипт выполнен");
</script>
```

В примере выше мы сначала увидим "Библиотека загружена...", а затем "DOM готов!" (все скрипты выполнены).

<<<<<<< HEAD
```warn header="Скрипты, которые не блокируют DOMContentLoaded"
Есть два исключения из этого правила:
1. Скрипты с атрибутом `async`, который мы рассмотрим [немного позже](info:script-async-defer), не блокируют DOMContentLoaded. 
2. Скрипты, сгенерированные динамически при помощи `document.createElement('script')` и затем добавленные на страницу, также не блокируют это событие.
=======
```warn header="Scripts that don't block DOMContentLoaded"
There are two exceptions from this rule:
1. Scripts with the `async` attribute, that we'll cover [a bit later](info:script-async-defer), don't block `DOMContentLoaded`.
2. Scripts that are generated dynamically with `document.createElement('script')` and then added to the webpage also don't block this event.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
```

### DOMContentLoaded и стили

Внешние таблицы стилей не затрагивают DOM, поэтому `DOMContentLoaded` их не ждёт.

Но здесь есть подводный камень. Если после стилей у нас есть скрипт, то этот скрипт должен дождаться, пока загрузятся стили:

```html run
<link type="text/css" rel="stylesheet" href="style.css">
<script>
  // скрипт не выполняется, пока не загрузятся стили
  alert(getComputedStyle(document.body).marginTop);
</script>
```

<<<<<<< HEAD
Причина в том, что скрипту может понадобиться получить координаты или другие свойства элементов, зависящих от стилей, как в примере выше. Естественно, он должен дождаться, пока стили загрузятся.
=======
The reason for this is that the script may want to get coordinates and other style-dependent properties of elements, like in the example above. Naturally, it has to wait for styles to load.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Так как `DOMContentLoaded` дожидается скриптов, то теперь он так же дожидается и стилей перед ними.

### Встроенное в браузер автозаполнение

Firefox, Chrome и Opera автоматически заполняют поля при наступлении `DOMContentLoaded`.

Например, если на странице есть форма логина и пароля и браузер запомнил значения, то при наступлении `DOMContentLoaded` он попытается заполнить их (если получил разрешение от пользователя).

Так что, если `DOMContentLoaded` откладывается из-за долгой загрузки скриптов, в свою очередь -- откладывается автозаполнение. Вы наверняка замечали, что на некоторых сайтах (если вы используете автозаполнение в браузере) поля логина и пароля не заполняются мгновенно, есть некоторая задержка до полной загрузки страницы. Это и есть ожидание события `DOMContentLoaded`.


## window.onload [#window-onload]

<<<<<<< HEAD
Событие `load` на объекте `window` наступает, когда загрузилась вся страница, включая стили, картинки и другие ресурсы.
=======
The `load` event on the `window` object triggers when the whole page is loaded including styles, images and other resources. This event is available via the `onload` property.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

В примере ниже правильно показаны размеры картинки, потому что `window.onload` дожидается всех изображений:

```html run height=200 refresh
<script>
<<<<<<< HEAD
  window.onload = function() {
    alert('Страница загружена');
=======
  window.onload = function() { // can also use window.addEventListener('load', (event) => {
    alert('Page loaded');
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

    // к этому моменту страница загружена
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

## window.onunload

Когда посетитель покидает страницу, на объекте `window` генерируется событие `unload`. В этот момент стоит совершать простые действия, не требующие много времени, вроде закрытия связанных всплывающих окон.

Обычно здесь отсылают статистику.

Предположим, мы собрали данные о том, как используется страница: клики, прокрутка, просмотры областей страницы и так далее.

Естественно, событие `unload` -- это тот момент, когда пользователь нас покидает и мы хотим сохранить эти данные.

Для этого существует специальный метод `navigator.sendBeacon(url, data)`, описанный в спецификации <https://w3c.github.io/beacon/>.

Он посылает данные в фоне. Переход к другой странице не задерживается: браузер покидает страницу, но всё равно выполняет `sendBeacon`.

Его можно использовать вот так:
```js
let analyticsData = { /* объект с собранными данными */ };

window.addEventListener("unload", function() {
  navigator.sendBeacon("/analytics", JSON.stringify(analyticsData));
});
```

- Отсылается POST-запрос.
- Мы можем послать не только строку, но так же формы и другие форматы, как описано в главе <info:fetch>, но обычно это строковый объект.
- Размер данных ограничен 64 Кб.

К тому моменту, как `sendBeacon` завершится, браузер наверняка уже покинет страницу, так что возможности обработать ответ сервера не будет (для статистики он обычно пустой).

Для таких запросов с закрывающейся страницей есть специальный флаг `keepalive` в методе [fetch](info:fetch) для общих сетевых запросов. Вы можете найти больше информации в главе <info:fetch-api>.

<<<<<<< HEAD
Если мы хотим отменить переход на другую страницу, то здесь мы этого сделать не сможем. Но сможем в другом месте -- в событии `onbeforeunload`.
=======
If we want to cancel the transition to another page, we can't do it here. But we can use another event -- `onbeforeunload`.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

## window.onbeforeunload [#window.onbeforeunload]

Если посетитель собирается уйти со страницы или закрыть окно, обработчик `beforeunload` попросит дополнительное подтверждение.

Если мы отменим это событие, то браузер спросит посетителя, уверен ли он.

Вы можете попробовать это, запустив следующий код и затем перезагрузив страницу:

```js run
window.onbeforeunload = function() {
  return false;
};
```

<<<<<<< HEAD
По историческим причинам возврат непустой строки так же считается отменой события. Когда-то браузеры использовали её в качестве сообщения, но, как указывает [современная спецификация](https://html.spec.whatwg.org/#unloading-documents), они не должны этого делать. 
=======
For historical reasons, returning a non-empty string also counts as canceling the event. Some time ago browsers used to show it as a message, but as the [modern specification](https://html.spec.whatwg.org/#unloading-documents) says, they shouldn't.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

Вот пример:

```js run
window.onbeforeunload = function() {
  return "Есть несохранённые изменения. Всё равно уходим?";
};
```

Поведение было изменено, потому что некоторые веб-разработчики злоупотребляли этим обработчиком события, показывая вводящие в заблуждение и надоедливые сообщения. Так что, прямо сейчас старые браузеры всё ещё могут показывать строку как сообщение, но в остальных -- нет возможности настроить показ сообщения пользователям.

## readyState

Что произойдёт, если мы установим обработчик `DOMContentLoaded` после того, как документ загрузился?

Естественно, он никогда не запустится.

Есть случаи, когда мы не уверены, готов документ или нет. Мы бы хотели, чтобы наша функция исполнилась, когда DOM загрузился, будь то сейчас или позже.

Свойство `document.readyState` показывает нам текущее состояние загрузки.

Есть три возможных значения:

- `"loading"` -- документ загружается.
- `"interactive"` -- документ был полностью прочитан.
- `"complete"` -- документ был полностью прочитан и все ресурсы (такие как изображения) были тоже загружены.

Так что мы можем проверить `document.readyState` и, либо установить обработчик, либо, если документ готов, выполнить код сразу же.

Например, вот так:

```js
function work() { /*...*/ }

if (document.readyState == 'loading') {
<<<<<<< HEAD
  // ещё загружается, ждём события
=======
  // still loading, wait for the event
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
  document.addEventListener('DOMContentLoaded', work);
} else {
  // DOM готов!
  work();
}
```

<<<<<<< HEAD
Также есть событие `readystatechange`, которое генерируется при изменении состояния, так что мы можем вывести все эти состояния таким образом:
=======
There's also the `readystatechange` event that triggers when the state changes, so we can print all these states like this:
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js run
// текущее состояние
console.log(document.readyState);

// вывести изменения состояния
document.addEventListener('readystatechange', () => console.log(document.readyState));
```

Событие `readystatechange` -- альтернативный вариант отслеживания состояния загрузки документа, который появился очень давно. На сегодняшний день он используется редко.

Для полноты картины давайте посмотрим на весь поток событий:

Здесь документ с `<iframe>`, `<img>` и обработчиками, которые логируют события:

```html
<script>
  log('начальный readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="http://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>
```

Рабочий пример есть [в песочнице](sandbox:readystate).

Типичный вывод:
1. [1] начальный readyState:loading
2. [2] readyState:interactive
3. [2] DOMContentLoaded
4. [3] iframe onload
5. [4] img onload
6. [4] readyState:complete
7. [4] window onload

Цифры в квадратных скобках обозначают примерное время события. События, отмеченные одинаковой цифрой, произойдут примерно в одно и то же время (+- несколько миллисекунд).

- `document.readyState` станет `interactive` прямо перед `DOMContentLoaded`. Эти две вещи, на самом деле, обозначают одно и то же.
- `document.readyState` станет `complete`, когда все ресурсы (`iframe` и `img`) загрузятся. Здесь мы видим, что это произойдёт примерно в одно время с `img.onload` (`img` последний ресурс) и `window.onload`. Переключение на состояние `complete` означает то же самое, что и `window.onload`. Разница заключается в том, что `window.onload` всегда срабатывает после всех `load` других обработчиков.


## Итого

События загрузки страницы:

<<<<<<< HEAD
- `DOMContentLoaded` генерируется на `document`, когда DOM готов. Мы можем применить JavaScript к элементам на данном этапе.
  - Скрипты, вроде `<script>...</script>` или `<script src="..."></script>` блокируют DOMContentLoaded, браузер ждёт, пока они выполнятся.
  - Изображения и другие ресурсы тоже всё ещё могут продолжать загружаться.
- Событие `load` на `window` генерируется, когда страница и все ресурсы загружены. Мы редко его используем, потому что обычно нет нужды ждать так долго.
- Событие `beforeunload` на `window` генерируется, когда пользователь покидает страницу. Если мы отменим событие, браузер спросит, на самом ли деле пользователь хочет уйти (например, у нас есть несохранённые изменения).
- Событие `unload` на `window` генерируется, когда пользователь окончательно уходит, в обработчике мы можем делать только простые вещи, которые ни о чём не спрашивают пользователя и не заставляют его ждать. Из-за этих ограничений оно редко используется. Мы можем послать сетевой запрос с помощью `navigator.sendBeacon`.
- `document.readyState` -- текущее состояние документа, изменения можно отследить с помощью события `readystatechange`:
  - `loading` -- документ грузится.
  - `interactive` -- документ прочитан, происходит примерно в то же время, что и `DOMContentLoaded`, но до него.
  - `complete` -- документ и ресурсы загружены, происходит примерно в то же время, что и `window.onload`, но до него.
=======
- The `DOMContentLoaded` event triggers on `document` when the DOM is ready. We can apply JavaScript to elements at this stage.
  - Script such as `<script>...</script>` or `<script src="..."></script>` block DOMContentLoaded, the browser waits for them to execute.
  - Images and other resources may also still continue loading.
- The `load` event on `window` triggers when the page and all resources are loaded. We rarely use it, because there's usually no need to wait for so long.
- The `beforeunload` event on `window` triggers when the user wants to leave the page. If we cancel the event, browser asks whether the user really wants to leave (e.g we have unsaved changes).
- The `unload` event on `window` triggers when the user is finally leaving, in the handler we can only do simple things that do not involve delays or asking a user. Because of that limitation, it's rarely used. We can send out a network request with `navigator.sendBeacon`.
- `document.readyState` is the current state of the document, changes can be tracked in the `readystatechange` event:
  - `loading` -- the document is loading.
  - `interactive` -- the document is parsed, happens at about the same time as `DOMContentLoaded`, but before it.
  - `complete` -- the document and resources are loaded, happens at about the same time as `window.onload`, but before it.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
