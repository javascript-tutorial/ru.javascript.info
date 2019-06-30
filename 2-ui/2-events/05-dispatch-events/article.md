# Генерация событий на элементах

Можно не только назначать обработчики на события, но и генерировать их самому прямо из JavaScript кода.

Такие события могут быть использованы при создании "графических компонент". К примеру, меню, генерирует события, к этому меню относящиеся: `open` (меню раскрыто), `select` (выбран пункт меню) и другие.

Также можно генерировать встроенные события, такие как `click`, `mousedown` и другие, что бывает полезно для автоматического тестирования.

## Конструктор Event

События формируют иерархию, которая подобна той, что мы уже видели на примере классов DOM-элементов. Корневой встроенный класс -- [Event](http://www.w3.org/TR/dom/#event).

Вот так можно создать событие, с помощью класса `Event`:

```js
let event = new Event(тип события[, флаги]);
```

Где:

- *Тип события* -- строка, например, `"click"` или любая другая `"hey-ho!"`.
- *Флаги* -- объект с двумя не обязательными свойствами:
  - `bubbles: true/false` -- если `true`, тогда событие всплывает.
  - `cancelable: true/false` -- если `true`, тогда можно отменить действие по умолчанию. Позже мы разберём, что это значит для пользовательский событий.

  По умолчанию они оба false: `{bubbles: false, cancelable: false}`.

## Метод dispatchEvent

После того, как объект события создан, мы должны инициировать его на элементе вызвав метод `elem.dispatchEvent(event)`.

После чего обработчики отработают будто это обычное встроенное событие. Если при создании указан флаг `bubbles`, то оно будет всплывать.

В примере ниже событие `click` инициируется JavaScript кодом. Обработчик отработает также, если бы кликнули по кнопке:

```html run no-beautify
<button id="elem" onclick="alert('Клик!');">Автоклик</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

```smart header="event.isTrusted"
В тоже время, можно легко отличить "настоящее" событие от сгенерированного кодом.

Свойство `event.isTrusted` принимает значение `true` для событий, создаваемых реальными действиями пользователя, и `false` для генерируемых кодом.
```

## Пример всплытия

Мы можем создать событие, которое всплывает, с именем `"hello"` и поймать его на `document`.

Всё, что нужно сделать -- это установить флаг `bubbles` в `true`:

```html run no-beautify
<h1 id="elem">Привет из кода!</h1>

<script>
  // ловим на document...
  document.addEventListener("hello", function(event) { // (1)
    alert("Привет от " + event.target.tagName); // Привет от H1
  });

  // ...инициализация события на элементе!
  let event = new Event("hello", {bubbles: true}); // (2)
  elem.dispatchEvent(event);
</script>
```

Обратите внимание::

1. Мы должны использовать `addEventListener` для наших собственных событий, т.к. `on<event>`-свойства существуют только для встроенных событий, `document.onhello` не сработает.
2. Мы обязаны передать флаг `bubbles:true`, иначе наше событие не будет всплывать.

Механизм всплытия идентичен как для встроенного события (`click`), так и для пользовательского события (`hello`). Также одинакова работа фаз всплытия и погружения.

## MouseEvent, KeyboardEvent и другие

Для некоторых конкретных типов событий есть свои, специфические, конструкторы. Вот список конструкторов для различных событий интерфейса которые можно найти в спецификации [UI Event](https://www.w3.org/TR/uievents):

- `UIEvent`
- `FocusEvent`
- `MouseEvent`
- `WheelEvent`
- `KeyboardEvent`
- ...

Стоит использовать их вместе `new Event` если мы хотим создавать такие события. К примеру, `new MouseEvent("click")`.

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

Обратите внимание: это нельзя было бы сделать с обычным конструктором `Event`.

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

Полный список свойств по типам событий вы найдёте в спецификации, например для [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent).

## Свои события

Для генерации своих событий, таких как `"hello"` стоит использовать конструктор  `new CustomEvent`. Технически, [CustomEvent](https://dom.spec.whatwg.org/#customevent) абсолютно идентичен `Event`, кроме небольшой детали.

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

По конструктору, с помощью которого мы создаём событие, можно определить какое именно это событие, и если оно не браузерное, а своё, стоит всё-таки использовать `CustomEvent` просто для того, чтобы было понятнее.

## event.preventDefault()

На сгенерированном событии обработчик может вызвать метод `event.preventDefault()` если задан флаг `cancelable:true`.

В случае, если событие придумано нами, имеет нестандартное имя – никакого действия браузера по умолчанию, конечно, нет.

Но код, который генерирует событие, может предусматривать какие-то ещё действия после `dispatchEvent`.

Вызов `event.preventDefault()` является возможностью для обработчика события сообщить в сгенерировавший событие код, что эти действия продолжать не надо.

Тогда вызов `elem.dispatchEvent(event)` возвратит `false`. И код сгенерировавший событие узнает, что продолжать не нужно.

В примере ниже есть функция `hide()`, которая при вызове генерирует событие `"hide"` на элементе `#rabbit`, уведомляя всех интересующихся, что кролик собирается спрятаться.

Любой обработчик может узнать об этом, подписавшись на событие через `rabbit.addEventListener('hide',...)` и, при желании, отменить действие по умолчанию через `event.preventDefault()`. Тогда кролик не исчезнет:

```html run refresh
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>

<script>
  // hide() будет вызван автоматически через 2 секунды
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // без этого флага preventDefault не сработает
    });
    if (!rabbit.dispatchEvent(event)) {
      alert('действие отменено обработчиком');
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("Вызвать preventDefault?")) {
      event.preventDefault();
    }
  });

  // прячемся через 2 секунды
  setTimeout(hide, 2000);

</script>
```


## События-в-событиях работают синхронно

Обычно события обрабатываются асинхронно. Это значит, что если браузер обрабатывает `onclick` и где-то по пути произойдет новое событие, то оно ждёт пока закончится обработка `onclick`.

Исключение, когда событие инициировано из обработчика другого события.

Тогда управление переходит во вложенный обработчик, и уже после него возвращается назад.

В примере ниже событие `menu-open` обрабатывается синхронно во время обработки `onclick`:

```html run
<button id="menu">Меню (нажми меня)</button>

<script>
  // 1 -> вложенный -> 2
  menu.onclick = function() {
    alert(1);

    // alert("вложенный")
    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('nested'));
</script>
```    

Обратите внимание, что вложенное событие `menu-open` всплывает и обрабатывается на `document`. Обработка вложенного события полностью завершается до того, как управление возвращается во внешний код (`onclick`).

Это справедливо не только для `dispatchEvent`, существуют другие сценарии. JavaScript в обработчике события может вызвать другие методы, которые приведут к другим событиям -- они тоже обрабатываются синхронно.

Если нам это не подходит, мы можем либо поставить `dispatchEvent` (или любой другой код инициирующий событие) в конец обработчика `onclick`, либо, если это удобно, обернуть его в `setTimeout` с нулевой задержкой:

```html run
<button id="menu">Меню (нажми меня)</button>

<script>
  // Now the result is: 1 -> 2 -> nested
  menu.onclick = function() {
    alert(1);

    // alert(2)
    setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    })));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('nested'));
</script>
```    

Now `dispatchEvent` runs asynchronously after the current code execution is finished, including `mouse.onclick`, so event handlers are totally separate.

## Summary

To generate an event, we first need to create an event object.

The generic `Event(name, options)` constructor accepts an arbitrary event name and the `options` object with two properties:
  - `bubbles: true` if the event should bubble.
  - `cancelable: true` if the `event.preventDefault()` should work.

Other constructors of native events like `MouseEvent`, `KeyboardEvent` and so on accept properties specific to that event type. For instance, `clientX` for mouse events.

For custom events we should use `CustomEvent` constructor. It has an additional option named `detail`, we should assign the event-specific data to it. Then all handlers can access it as `event.detail`.

Despite the technical possibility to generate browser events like `click` or `keydown`, we should use with the great care.

We shouldn't generate browser events as it's a hacky way to run handlers. That's a bad architecture most of the time.

Native events might be generated:

- As a dirty hack to make 3rd-party libraries work the needed way, if they don't provide other means of interaction.
- For automated testing, to "click the button" in the script and see if the interface reacts correctly.

Custom events with our own names are often generated for architectural purposes, to signal what happens inside our menus, sliders, carousels etc.
