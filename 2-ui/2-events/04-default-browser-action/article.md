# Действия браузера по умолчанию

Многие события автоматически влекут за собой действие браузера.

Например:

- Клик по ссылке инициирует переход на новый URL.
- Нажатие на кнопку "отправить" в форме – отсылку её на сервер.
- Зажатие кнопки мыши над текстом и её движение в таком состоянии – инициирует его выделение.

Если мы обрабатываем событие в JavaScript, то зачастую такое действие браузера нам не нужно. К счастью, его можно отменить.

## Отмена действия браузера

Есть два способа отменить действие браузера:

<<<<<<< HEAD
- Основной способ – это воспользоваться объектом `event`. Для отмены действия браузера существует стандартный метод `event.preventDefault()`.
- Если же обработчик назначен через `on<событие>` (не через `addEventListener`), то также можно вернуть `false` из обработчика.
=======
- The main way is to use the `event` object. There's a method `event.preventDefault()`.
- If the handler is assigned using `on<event>` (not by `addEventListener`), then we can also return `false` from it.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

В следующем примере при клике по ссылке переход не произойдет:

```html autorun height=60 no-beautify
<a href="/" onclick="return false">Нажми здесь</a>
или
<a href="/" onclick="event.preventDefault()">здесь</a>
```

```warn header="Возвращать `true` не нужно"
Обычно значение, которое возвращает обработчик события, игнорируется.

Единственное исключение – это `return false` из обработчика, назначенного через `on<событие>`.

<<<<<<< HEAD
В других случаях `return` не нужен, он никак не обрабатываются.
=======
In all other cases, `return` is not needed and it's not processed anyhow.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
```

### Пример: меню

Рассмотрим меню для сайта, например:

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```

Данный пример при помощи CSS может выглядеть так:

[iframe height=70 src="menu" link edit]

В HTML-разметке все элементы меню являются не кнопками, а ссылками, то есть тегами `<a>`. В этом подходе есть некоторые преимущества, например:

- Некоторые посетители очень любят сочетание "правый клик – открыть в новом окне". Если мы будем использовать `<button>` или `<span>`, то данное сочетание работать не будет.
- Поисковые движки переходят по ссылкам `<a href="...">` при индексации.

Поэтому в разметке мы используем `<a>`. Но нам необходимо обрабатывать клики в JavaScript, а стандартное действие браузера (переход по ссылке) - отменить.

Например, вот так:

```js
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // может быть подгрузка с сервера, генерация интерфейса и т.п.

*!*
  return false; // отменить действие браузера (переход по ссылке)
*/!*
};
```

<<<<<<< HEAD
Если мы уберём `return false`, то после выполнения обработчика события браузер выполнит "действие по умолчанию" - переход по адресу из `href`. А это нам здесь не нужно, мы обрабатываем клик сами.

Кстати, использование здесь делегирования событий делает наше меню очень гибким. Мы можем добавить вложенные списки и стилизовать их с помощью CSS – обработчик не потребует изменений.

````smart header="События, вытекающие из других"
Некоторые события естественным образом вытекают друг из друга. Если мы отменим первое событие, то последующие не возникнут.

Например, событие `mousedown` для поля `<input>` приводит к фокусировке на нём и запускает событие `focus`. Если мы отменим событие `mousedown`, то фокусирования не произойдёт.

В следующем примере попробуйте нажать на первом `<input>` -- происходит событие `focus`. Но если вы нажимаете по второму элементу, то события `focus` не будет.
=======
If we omit `return false`, then after our code executes the browser will do its "default action" -- navigating to the URL in `href`. And we don't need that here, as we're handling the click by ourselves.

By the way, using event delegation here makes our menu very flexible. We can add nested lists and style them using CSS to "slide down".

````smart header="Follow-up events"
Certain events flow one into another. If we prevent the first event, there will be no second.

For instance, `mousedown` on an `<input>` field leads to focusing in it, and the `focus` event. If we prevent the `mousedown` event, there's no focus.

Try to click on the first `<input>` below -- the `focus` event happens. But if you click the second one, there's no focus.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```html run autorun
<input value="Фокус работает" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Кликни меня">
```

<<<<<<< HEAD
Это потому, что отменено стандартное действие `mousedown`. Впрочем, фокусировка на элементе всё ещё возможна, если мы будем использовать другой способ. Например, нажатием клавиши `key:Tab` можно перейти от первого поля ввода ко второму. Но только не через клик мышью на элемент, это больше не работает.
=======
That's because the browser action is canceled on `mousedown`. The focusing is still possible if we use another way to enter the input. For instance, the `key:Tab` key to switch from the 1st input into the 2nd. But not with the mouse click any more.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
````

## Опция "passive" для обработчика

Необязательная опция `passive: true` для `addEventListener` сигнализирует браузеру, что обработчик не собирается выполнять `preventDefault()`.

Почему это может быть полезно?

Есть некоторые события, как `touchmove` на мобильных устройствах (когда пользователь перемещает палец по экрану), которое по умолчанию начинает прокрутку, но мы можем отменить это действие, используя `preventDefault()` в обработчике.

Поэтому, когда браузер обнаружит такое событие, он должен для начала запустить все обработчики и после, если `preventDefault` не вызывается нигде, он может начать прокрутку. Это может вызвать ненужные задержки в пользовательском интерфейсе.

Опция `passive: true` сообщает браузеру, что обработчик не собирается отменять прокрутку. Тогда браузер начинает её немедленно, обеспечивая максимально плавный интерфейс, параллельно обрабатывая событие.

Для некоторых браузеров (Firefox, Chrome) опция `passive` по умолчанию включена в `true` для таких событий, как `touchstart` и `touchmove`.


## event.defaultPrevented

Свойство `event.defaultPrevented` установлено в `true`, если действие по умолчанию было предотвращено, и `false`, если нет.

Рассмотрим практическое применение этого свойства для улучшения архитектуры.

Помните, в главе <info:bubbling-and-capturing> мы говорили о `event.stopPropagation()` и упоминали, что останавливать "всплытие" - плохо?

<<<<<<< HEAD
Иногда вместо этого мы можем использовать `event.defaultPrevented`, чтобы просигналить другим обработчикам, что событие обработано.

Давайте посмотрим практический пример.
=======
Sometimes we can use `event.defaultPrevented` instead, to signal other event handlers that the event was handled.

Let's see a practical example.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

По умолчанию браузер при событии `contextmenu` (клик правой кнопкой мыши) показывает контекстное меню со стандартными опциями. Мы можем отменить событие по умолчанию и показать своё меню, как здесь:

```html autorun height=50 no-beautify run
<<<<<<< HEAD
<button>Правый клик вызывает контекстное меню браузера</button>

<button *!*oncontextmenu="alert('Рисуем наше меню'); return false"*/!*>
  Правый клик вызывает наше контекстное меню
</button>
```

Теперь в дополнение к этому контекстному меню реализуем контекстное меню для всего документа.

При правом клике должно показываться ближайшее контекстное меню.
=======
<button>Right-click shows browser context menu</button>

<button *!*oncontextmenu="alert('Draw our menu'); return false"*/!*>
  Right-click shows our context menu
</button>
```

Now, in addition to that context menu we'd like to implement document-wide context menu.

Upon right click, the closest context menu should show up.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```html autorun height=80 no-beautify run
<p>Правый клик здесь вызывает контекстное меню документа</p>
<button id="elem">Правый клик здесь вызывает контекстное меню кнопки</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Контекстное меню кнопки");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Контекстное меню документа");
  };
</script>
```

Проблема заключается в том, что когда мы кликаем по элементу `elem`, то мы получаем два меню: контекстное меню для кнопки и (событие всплывает вверх) контекстное меню для документа.

<<<<<<< HEAD
Как это поправить? Одно из решений - это подумать: "Когда мы обрабатываем правый клик в обработчике на кнопке, остановим всплытие", и вызвать `event.stopPropagation()`:
=======
How to fix it? One of solutions is to think like: "When we handle right-click in the button handler, let's stop its bubbling" and use `event.stopPropagation()`:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```html autorun height=80 no-beautify run
<p>Правый клик вызывает меню документа</p>
<button id="elem">Правый клик вызывает меню кнопки (добавлен event.stopPropagation)</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
*!*
    event.stopPropagation();
*/!*
    alert("Контекстное меню кнопки");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Контекстное меню документа");
  };
</script>
```

Теперь контекстное меню для кнопки работает как задумано. Но цена слишком высока. Мы навсегда запретили доступ к информации о правых кликах для любого внешнего кода, включая счётчики, которые могли бы собирать статистику, и т.п. Это слегка неразумно.

Альтернативным решением было бы проверить в обработчике `document`, было ли отменено действие по умолчанию? Если да, тогда событие было обработано, и нам не нужно на него реагировать.


```html autorun height=80 no-beautify run
<<<<<<< HEAD
<p>Правый клик вызывает меню документа (добавлена проверка event.defaultPrevented)</p>
<button id="elem">Правый клик вызывает меню кнопки</button>
=======
<p>Right-click for the document menu (added a check for event.defaultPrevented)</p>
<button id="elem">Right-click for the button menu</button>
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Контекстное меню кнопки");
  };

  document.oncontextmenu = function(event) {
*!*
    if (event.defaultPrevented) return;
*/!*

    event.preventDefault();
    alert("Контекстное меню документа");
  };
</script>
```

Сейчас всё работает правильно. Если у нас есть вложенные элементы и каждый из них имеет контекстное меню, то код также будет работать. Просто убедитесь, что проверяете `event.defaultPrevented` в каждом обработчике `contextmenu`.

```smart header="event.stopPropagation() и event.preventDefault()"
Как мы можем видеть, `event.stopPropagation()` и `event.preventDefault()` (также известный как `return false`)  - это две разные функции. Они никак не связаны друг с другом.
```

<<<<<<< HEAD
```smart header="Архитектура вложенных контекстных меню"
Есть также несколько альтернативных путей, чтобы реализовать вложенные контекстные меню. Одним из них является единый глобальный объект с обработчиком `document.oncontextmenu` и методами, позволяющими хранить в нём другие обработчики.
=======
```smart header="Nested context menus architecture"
There are also alternative ways to implement nested context menus. One of them is to have a single global object with a handler for `document.oncontextmenu`, and also methods that allow to store other handlers in it.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Объект будет перехватывать любой клик правой кнопкой мыши, просматривать сохранённые обработчики и запускать соответствующий.

Но при этом каждый фрагмент кода, которому требуется контекстное меню, должен знать об этом объекте и использовать его вместо собственного обработчика `contextmenu`.
```

## Итого

Действий браузера по умолчанию достаточно много:

<<<<<<< HEAD
- `mousedown` -- начинает выделять текст (если двигать мышкой).
- `click` на `<input type="checkbox">` --  ставит или убирает галочку в `input`.
- `submit` -- при нажатии на `<input type="submit">` или при нажатии клавиши `key:Enter` в форме данные отправляются на сервер.
- `keydown` -- при нажатии клавиши в поле ввода появляется символ.
- `contextmenu` -- при правом клике показывается контекстное меню браузера.
- ...и многие другие...
=======
- `mousedown` -- starts the selection (move the mouse to select).
- `click` on `<input type="checkbox">` -- checks/unchecks the `input`.
- `submit` -- clicking an `<input type="submit">` or hitting `key:Enter` inside a form field causes this event to happen, and the browser submits the form after it.
- `keydown` -- pressing a key may lead to adding a character into a field, or other actions.
- `contextmenu` -- the event happens on a right-click, the action is to show the browser context menu.
- ...there are more...
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Все эти действия можно отменить, если мы хотим обработать событие исключительно при помощи JavaScript.

Чтобы отменить действие браузера по умолчанию, используйте `event.preventDefault()` или  `return false`. Второй метод работает, только если обработчик назначен через `on<событие>`.

Опция `passive: true` для `addEventListener` сообщает браузеру, что действие по умолчанию не будет отменено. Это очень полезно для некоторых событий на мобильных устройствах, таких как `touchstart` и `touchmove`, чтобы сообщить браузеру, что он не должен ожидать выполнения всех обработчиков, а ему следует сразу приступать к выполнению действия по умолчанию, например, к прокрутке.

Если событие по умолчанию отменено, то значение `event.defaultPrevented` становится `true`, иначе `false`.

```warn header="Сохраняйте семантику, не злоупотребляйте"
Технически, отменяя действия браузера по умолчанию и добавляя JavaScript, мы можем настроить поведение любого элемента. Например, мы можем заставить ссылку `<a>` работать как кнопку, а кнопку `<button>` вести себя как ссылка (перенаправлять на другой URL).

Но нам следует сохранять семантическое значение HTML элементов. Например, не кнопки, а тег `<a>` должен применяться для переходов по ссылкам.

Помимо того, что это "хорошо", это делает ваш HTML лучше с точки зрения доступности для инвалидов и с особых устройств.

Также, если мы рассматриваем пример с тегом `<a>`, то обратите внимание: браузер предоставляет возможность открывать ссылки в новом окне (кликая правой кнопкой мыши или используя другие возможности). И пользователям это нравится. Но если мы заменим ссылку кнопкой и стилизуем её как ссылку, используя CSS, то специфичные функции браузера для тега `<a>` всё равно работать не будут.
```
