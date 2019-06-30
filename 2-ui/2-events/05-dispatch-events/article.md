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

## Custom events

For our own, custom events like `"hello"` we should use `new CustomEvent`. Technically [CustomEvent](https://dom.spec.whatwg.org/#customevent) is the same as `Event`, with one exception.

In the second argument (object) we can add an additional property `detail` for any custom information that we want to pass with the event.

For instance:

```html run refresh
<h1 id="elem">Hello for John!</h1>

<script>
  // additional details come with the event to the handler
  elem.addEventListener("hello", function(event) {
    alert(*!*event.detail.name*/!*);
  });

  elem.dispatchEvent(new CustomEvent("hello", {
*!*
    detail: { name: "John" }
*/!*
  }));
</script>
```

The `detail` property can have any data. Technically we could live without, because we can assign any properties into a regular `new Event` object after its creation. But `CustomEvent` provides the special `detail` field for it to evade conflicts with other event properties.

The event class tells something about "what kind of event" it is, and if the event is custom, then we should use `CustomEvent` just to be clear about what it is.

## event.preventDefault()

We can call `event.preventDefault()` on a script-generated event if `cancelable:true` flag is specified.

Of course, if the event has a non-standard name, then it's not known to the browser, and there's no "default browser action" for it.

But the event-generating code may plan some actions after `dispatchEvent`.

The call of `event.preventDefault()` is a way for the handler to send a signal that those actions shouldn't be performed.

In that case the call to `elem.dispatchEvent(event)` returns `false`. And the event-generating code knows that the processing shouldn't continue.

For instance, in the example below there's a `hide()` function. It generates the `"hide"` event on the element `#rabbit`, notifying all interested parties that the rabbit is going to hide.

A handler set by `rabbit.addEventListener('hide',...)` will learn about that and, if it wants, can prevent that action by calling `event.preventDefault()`. Then the rabbit won't hide:

```html run refresh
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>

<script>
  // hide() will be called automatically in 2 seconds
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // without that flag preventDefault doesn't work
    });
    if (!rabbit.dispatchEvent(event)) {
      alert('the action was prevented by a handler');
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("Call preventDefault?")) {
      event.preventDefault();
    }
  });

  // hide in 2 seconds
  setTimeout(hide, 2000);

</script>
```


## Events-in-events are synchronous

Usually events are processed asynchronously. That is: if the browser is processing `onclick` and in the process a new event occurs, then it awaits till `onclick` processing is finished.

The exception is when one event is initiated from within another one.

Then the control jumps to the nested event handler, and after it goes back.

For instance, here the nested `menu-open` event is processed synchronously, during the `onclick`:

```html run
<button id="menu">Menu (click me)</button>

<script>
  // 1 -> nested -> 2
  menu.onclick = function() {
    alert(1);

    // alert("nested")
    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('nested'));
</script>
```    

Please note that the nested event `menu-open` bubbles up and is handled on the `document`. The propagation of the nested event is fully finished before the processing gets back to the outer code (`onclick`).

That's not only about `dispatchEvent`, there are other cases. JavaScript in an event handler can call methods that lead to other events -- they are too processed synchronously.

If we don't like it, we can either put the `dispatchEvent` (or other event-triggering call) at the end of `onclick` or wrap it in zero-delay `setTimeout`:

```html run
<button id="menu">Menu (click me)</button>

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
