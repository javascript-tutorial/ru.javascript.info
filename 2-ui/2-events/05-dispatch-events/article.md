# Генерация пользовательских событий

Можно не только назначать обработчики, но и генерировать события из JavaScript-кода.

<<<<<<< HEAD
Пользовательские события могут быть использованы при создании графических компонентов. Например, корневой элемент нашего меню, реализованного при помощи JavaScript, может генерировать события, относящиеся к этому меню: `open` (меню раскрыто), `select` (выбран пункт меню) и т.п. А другой код может слушать эти события и узнавать, что происходит с меню.
=======
Custom events can be used to create "graphical components". For instance, a root element of our own JS-based menu may trigger events telling what happens with the menu: `open` (menu open), `select` (an item is selected) and so on. Another code may listen for the events and observe what's happening with the menu.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Можно генерировать не только совершенно новые, придуманные нами события, но и встроенные, такие как `click`, `mousedown` и другие. Это бывает полезно для автоматического тестирования.

## Конструктор Event

<<<<<<< HEAD
Встроенные классы для событий формируют иерархию аналогично классам для DOM-элементов. Её корнем является встроенный класс [Event](http://www.w3.org/TR/dom/#event).
=======
Built-in event classes form a hierarchy, similar to DOM element classes. The root is the built-in [Event](http://www.w3.org/TR/dom/#event) class.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Событие встроенного класса `Event` можно создать так:

```js
let event = new Event(type[, options]);
```

Где:

- *type* -- тип события, строка, например `"click"` или же любой придуманный нами --  `"my-event"`.
- *options* -- объект с тремя необязательными свойствами:
  - `bubbles: true/false` -- если `true`, тогда событие всплывает.
  - `cancelable: true/false` -- если `true`, тогда можно отменить действие по умолчанию. Позже мы разберём, что это значит для пользовательских событий.
  - `composed: true/false` -- если `true`, тогда событие будет всплывать наружу за пределы Shadow DOM. Позже мы разберём это в [разделе Веб-компоненты](https://learn.javascript.ru/shadow-dom-events#generatsiya-sobytiy).

По умолчанию все три свойства установлены в **false**: `{bubbles: false, cancelable: false, composed: false}`.

## Метод dispatchEvent

После того, как объект события создан, мы должны запустить его на элементе, вызвав метод `elem.dispatchEvent(event)`.

Затем обработчики отреагируют на него, как будто это обычное браузерное событие. Если при создании указан флаг `bubbles`, то оно будет всплывать.

В примере ниже событие `click` инициируется JavaScript-кодом так, как будто кликнули по кнопке:

```html run no-beautify
<button id="elem" onclick="alert('Клик!');">Автоклик</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

```smart header="event.isTrusted"
Можно легко отличить "настоящее" событие от сгенерированного кодом.

Свойство `event.isTrusted` принимает значение `true` для событий, порождаемых реальными действиями пользователя, и `false` для генерируемых кодом.
```

## Пример всплытия

Мы можем создать всплывающее событие с именем `"hello"` и поймать его на `document`.

Всё, что нужно сделать -- это установить флаг `bubbles` в `true`:

```html run no-beautify
<h1 id="elem">Привет из кода!</h1>

<script>
  // ловим на document...
  document.addEventListener("hello", function(event) { // (1)
    alert("Привет от " + event.target.tagName); // Привет от H1
  });

  // ...запуск события на элементе!
  let event = new Event("hello", {bubbles: true}); // (2)
  elem.dispatchEvent(event);

  // обработчик на document сработает и выведет сообщение.

</script>
```

Обратите внимание:

1. Мы должны использовать `addEventListener` для наших собственных событий, т.к. `on<event>`-свойства существуют только для встроенных событий, то есть `document.onhello` не сработает.
2. Мы обязаны передать флаг `bubbles:true`, иначе наше событие не будет всплывать.

Механизм всплытия идентичен как для встроенного события (`click`), так и для пользовательского события (`hello`). Также одинакова работа фаз всплытия и погружения.

## MouseEvent, KeyboardEvent и другие

Для некоторых конкретных типов событий есть свои специфические конструкторы. Вот небольшой список конструкторов для различных событий пользовательского интерфейса, которые можно найти в спецификации [UI Event](https://www.w3.org/TR/uievents):

- `UIEvent`
- `FocusEvent`
- `MouseEvent`
- `WheelEvent`
- `KeyboardEvent`
- ...

Стоит использовать их вместо `new Event`, если мы хотим создавать такие события. К примеру, `new MouseEvent("click")`.

Специфический конструктор позволяет указать стандартные свойства для данного типа события.

Например, `clientX/clientY` для события мыши:

```js run
let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // 100
*/!*
```

Обратите внимание: этого нельзя было бы сделать с обычным конструктором `Event`.

Давайте проверим:

```js run
let event = new Event("click", {
  bubbles: true, // только свойства bubbles и cancelable
  cancelable: true, // работают в конструкторе Event
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // undefined, неизвестное свойство проигнорировано!
*/!*
```

Впрочем, использование конкретного конструктора не является обязательным, можно обойтись `Event`,  а свойства записать в объект отдельно, после создания, вот так: `event.clientX=100`. Здесь это скорее вопрос удобства и желания следовать правилам. События, которые генерирует браузер, всегда имеют правильный тип.

Полный список свойств по типам событий вы найдёте в спецификации, например, [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent).

## Пользовательские события

Для генерации событий совершенно новых типов, таких как `"hello"`, следует использовать конструктор  `new CustomEvent`. Технически [CustomEvent](https://dom.spec.whatwg.org/#customevent) абсолютно идентичен `Event` за исключением одной небольшой детали.

У второго аргумента-объекта есть дополнительное свойство `detail`, в котором можно указывать информацию для передачи в событие.

Например:

```html run refresh
<h1 id="elem">Привет для Васи!</h1>

<script>
  // дополнительная информация приходит в обработчик вместе с событием
  elem.addEventListener("hello", function(event) {
    alert(*!*event.detail.name*/!*);
  });

  elem.dispatchEvent(new CustomEvent("hello", {
*!*
    detail: { name: "Вася" }
*/!*
  }));
</script>
```

Свойство `detail` может содержать любые данные. Надо сказать, что никто не мешает и в обычное `new Event` записать любые свойства. Но `CustomEvent` предоставляет специальное поле `detail` во избежание конфликтов с другими свойствами события.

Кроме того, класс события описывает, что это за событие, и если оно не браузерное, а пользовательское, то лучше использовать `CustomEvent`, чтобы явно об этом сказать.

## event.preventDefault()

<<<<<<< HEAD
Для многих браузерных событий есть "действия по умолчанию", такие как переход по ссылке, выделение и т.п.
=======
Many browser events have a "default action", such as navigating to a link, starting a selection, and so on.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Для новых, пользовательских событий браузерных действий, конечно, нет, но код, который генерирует такое событие, может предусматривать какие-то свои действия после события.

Вызов `event.preventDefault()` является возможностью для обработчика события сообщить в сгенерировавший событие код, что эти действия надо отменить.

Тогда вызов `elem.dispatchEvent(event)` возвратит `false`. И код, сгенерировавший событие, узнает, что продолжать не нужно.

Посмотрим практический пример - прячущегося кролика (могло бы быть скрывающееся меню или что-то ещё).

Ниже вы можете видеть кролика `#rabbit` и функцию `hide()`, которая при вызове генерирует на нём событие `"hide"`, уведомляя всех интересующихся, что кролик собирается спрятаться.

<<<<<<< HEAD
Любой обработчик может узнать об этом, подписавшись на событие `hide` через `rabbit.addEventListener('hide',...)` и, при желании, отменить действие по умолчанию через `event.preventDefault()`. Тогда кролик не исчезнет:
=======
Any handler can listen for that event with `rabbit.addEventListener('hide',...)` and, if needed, cancel the action using `event.preventDefault()`. Then the rabbit won't disappear:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```html run refresh autorun
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>
<button onclick="hide()">Hide()</button>

<script>
<<<<<<< HEAD
  // hide() будет вызван автоматически через 2 секунды
=======
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // без этого флага preventDefault не сработает
    });
    if (!rabbit.dispatchEvent(event)) {
      alert('Действие отменено обработчиком');
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("Вызвать preventDefault?")) {
      event.preventDefault();
    }
  });
</script>
```

<<<<<<< HEAD
Обратите внимание: событие должно содержать флаг `cancelable: true`. Иначе, вызов `event.preventDefault()` будет проигнорирован.
=======
Please note: the event must have the flag `cancelable: true`, otherwise the call `event.preventDefault()` is ignored.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Вложенные события обрабатываются синхронно

<<<<<<< HEAD
Обычно события обрабатываются асинхронно. То есть, если браузер обрабатывает `onclick` и в процессе этого произойдёт новое событие, то оно ждёт, пока закончится обработка `onclick`.

Исключением является ситуация, когда событие инициировано из обработчика другого события.

Тогда управление сначала переходит в обработчик вложенного события и уже после этого возвращается назад.

В примере ниже событие `menu-open` обрабатывается синхронно во время обработки `onclick`:
=======
Usually events are processed in a queue. That is: if the browser is processing `onclick` and a new event occurs, e.g. mouse moved, then it's handling is queued up, corresponding `mousemove` handlers will be called after `onclick` processing is finished.

The notable exception is when one event is initiated from within another one, e.g. using `dispatchEvent`. Such events are processed immediately: the new event handlers are called, and then the current event handling is resumed.

For instance, in the code below the `menu-open` event is triggered during the `onclick`.

It's processed immediately, without waiting for `onclick` handler to end:

>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```html run autorun
<button id="menu">Меню (нажми меня)</button>

<script>
  menu.onclick = function() {
    alert(1);

<<<<<<< HEAD
    // alert("вложенное событие")
=======
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

<<<<<<< HEAD
  document.addEventListener('menu-open', () => alert('вложенное событие'))
=======
  // triggers between 1 and 2
  document.addEventListener('menu-open', () => alert('nested'));
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
</script>
```

Порядок вывода: 1 -> вложенное событие -> 2.

<<<<<<< HEAD
Обратите внимание, что вложенное событие `menu-open` успевает всплыть и запустить обработчик на `document`. Обработка вложенного события полностью завершается до того, как управление возвращается во внешний код (`onclick`).

Это справедливо не только для `dispatchEvent`, но и для других ситуаций. JavaScript в обработчике события может вызвать другие методы, которые приведут к другим событиям -- они тоже обрабатываются синхронно.

Если нам это не подходит, то мы можем либо поместить `dispatchEvent` (или любой другой код, инициирующий события) в конец обработчика `onclick`, либо, если это неудобно, можно обернуть генерацию события в `setTimeout` с нулевой задержкой:
=======
Please note that the nested event `menu-open` is caught on the `document`. The propagation and handling of the nested event is finished before the processing gets back to the outer code (`onclick`).

That's not only about `dispatchEvent`, there are other cases. If an event handler calls methods that trigger other events -- they are processed synchronously too, in a nested fashion.

Let's say we don't like it. We'd want `onclick` to be fully processed first, independently from `menu-open` or any other nested events.

Then we can either put the `dispatchEvent` (or another event-triggering call) at the end of `onclick` or, maybe better, wrap it in the zero-delay `setTimeout`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```html run
<button id="menu">Меню (нажми меня)</button>

<script>
  menu.onclick = function() {
    alert(1);

    setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    })));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('вложенное событие'))
</script>
```

<<<<<<< HEAD
Теперь `dispatchEvent` запускается асинхронно после исполнения текущего кода, включая `mouse.onclick`, поэтому обработчики полностью независимы.
=======
Now `dispatchEvent` runs asynchronously after the current code execution is finished, including `menu.onclick`, so event handlers are totally separate.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Новый порядок вывода: 1 -> 2 -> вложенное событие.

## Итого

Чтобы сгенерировать событие из кода, вначале надо создать объект события.

Базовый конструктор `Event(name, options)` принимает обязательное имя события и `options` - объект с двумя свойствами:
- `bubbles: true` чтобы событие всплывало.
- `cancelable: true` если мы хотим, чтобы `event.preventDefault()` работал.

Особые конструкторы встроенных событий `MouseEvent`, `KeyboardEvent` и другие принимают специфичные для каждого конкретного типа событий свойства. Например, `clientX` для событий мыши.

Для пользовательских событий стоит применять конструктор `CustomEvent`. У него есть дополнительная опция `detail`, с помощью которой можно передавать информацию в объекте события. После чего все обработчики смогут получить к ней доступ через `event.detail`.

<<<<<<< HEAD
Несмотря на техническую возможность генерировать встроенные браузерные события типа `click` или `keydown`, пользоваться ей стоит с большой осторожностью.

Весьма часто, когда разработчик хочет сгенерировать встроенное событие – это вызвано "кривой" архитектурой кода.
=======
Despite the technical possibility of generating browser events like `click` or `keydown`, we should use them with great care.

We shouldn't generate browser events as it's a hacky way to run handlers. That's bad architecture most of the time.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Как правило, генерация встроенных событий полезна в следующих случаях:

- Либо как явный и грубый хак, чтобы заставить работать сторонние библиотеки, в которых не предусмотрены другие средства взаимодействия.
- Либо для автоматического тестирования, чтобы скриптом "нажать на кнопку" и посмотреть, произошло ли нужное действие.

Пользовательские события со своими именами часто создают для улучшения архитектуры, чтобы сообщить о том, что происходит внутри наших меню, слайдеров, каруселей и т.д.
