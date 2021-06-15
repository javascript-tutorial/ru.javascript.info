<<<<<<< HEAD
# События указателя

События указателя (Pointer events) - это современный способ обработки ввода с помощью различных указывающих устройств, таких как мышь, перо/стилус, сенсорный экран и так далее.

## Краткая история

Сделаем небольшой обзор, чтобы вы поняли общую картину и место событий указателя среди других типов событий.

- Давным-давно, в прошлом, существовали только события мыши

    Затем получили широкое распространение сенсорные устройства, в частности телефоны и планшеты. Чтобы скрипты корректно работали, они генерировали (и до сих пор генерируют) события мыши. Например, касание сенсорного экрана генерирует событие `mousedown`. Таким образом, сенсорные устройства позволяли работать с существующими веб-страницами.
    
    Но сенсорные устройства во многих аспектах мощнее, чем мышь. Например, они позволяют касаться экрана сразу в нескольких местах ("мульти-тач"). Однако, события мыши не имеют необходимых свойств для обработки таких прикосновений.

- Поэтому появились события касания (Touch events), такие как `touchstart`, `touchend`, `touchmove`, которые имеют специфичные для касаний свойства (мы не будем здесь рассматривать их подробно, потому что события указателя ещё лучше).

    Но и этих событий оказалось недостаточно, так как существует много других устройств, таких как перо, у которых есть свои особенности. Кроме того, универсальный код, который отслеживал бы и события касаний и события мыши, неудобно писать.

- Для решения этих задач был внедрён стандарт Pointer Events ("События Указателя"). Он предоставляет единый набор событий для всех типов указывающих устройств.

К настоящему времени спецификация [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) поддерживается всеми основными браузерами, а [Pointer Events Level 3](https://w3c.github.io/pointerevents/) находится в разработке и почти полностью совместима с Pointer Events Level 2.

Если вы не разрабатываете под старые браузеры, такие как Internet Explorer 10, Safari 12, или более ранние версии, больше нет необходимости использовать события мыши или касаний – можно переходить сразу на события указателя.

При этом ваш код будет корректно работать и с сенсорными устройствами и с мышью. Впрочем, у событий указателя есть важные особенности, которые нужно знать, чтобы их правильно использовать, без лишних сюрпризов. Мы отметим их в этой статье.

## Типы событий указателя

Схема именований событий указателя похожа на события мыши:

| Событие указателя | Аналогичное событие мыши |
=======
# Pointer events

Pointer events are a modern way to handle input from a variety of pointing devices, such as a mouse, a pen/stylus, a touchscreen, and so on.

## The brief history

Let's make a small overview, so that you understand the general picture and the place of Pointer Events among other event types.

- Long ago, in the past, there were only mouse events.

    Then touch devices became widespread, phones and tablets in particular. For the existing scripts to work, they generated (and still generate) mouse events. For instance, tapping a touchscreen generates `mousedown`. So touch devices worked well with web pages.
    
    But touch devices have more capabilities than a mouse. For example, it's possible to touch multiple points at once ("multi-touch"). Although, mouse events don't have necessary properties to handle such multi-touches.

- So touch events were introduced, such as `touchstart`, `touchend`, `touchmove`, that have touch-specific properties (we don't cover them in detail here, because pointer events are even better).

    Still, it wasn't enough, as there are many other devices, such as pens, that have their own features. Also, writing code that listens for both touch and mouse events was cumbersome. 

- To solve these issues, the new standard Pointer Events was introduced. It provides a single set of events for all kinds of pointing devices.

As of now, [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) specification is supported in all major browsers, while the newer [Pointer Events Level 3](https://w3c.github.io/pointerevents/) is in the works and is mostly compartible with Pointer Events level 2. 

Unless you develop for old browsers, such as Internet Explorer 10, or for Safari 12 or below, there's no point in using mouse or touch events any more -- we can switch to pointer events.

Then your code will work well with both touch and mouse devices.

That said, there are some important peculiarities that one should know in order to use Pointer Events correctly and avoid surprises. We'll make note of them in this article.

## Pointer event types

Pointer events are named similarly to mouse events:

| Pointer event | Similar mouse event |
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
|---------------|-------------|
| `pointerdown` | `mousedown` |
| `pointerup` | `mouseup` |
| `pointermove` | `mousemove` |
| `pointerover` | `mouseover` |
| `pointerout` | `mouseout` |
| `pointerenter` | `mouseenter` |
| `pointerleave` | `mouseleave` |
| `pointercancel` | - |
| `gotpointercapture` | - |
| `lostpointercapture` | - |

<<<<<<< HEAD
Как мы видим, для каждого `mouse<события>` есть соответствующее `pointer<событие>`, которое играет аналогичную роль. Также есть 3 дополнительных события указателя, у которых нет соответствующего аналога `mouse...`, скоро мы их разберём.

```smart header="Замена `mouse<событий>` на `pointer<события>` в коде"
Мы можем заменить события `mouse...` на аналогичные `pointer...` в коде и быть уверенными, что с мышью по-прежнему всё будет работать нормально.

При этом поддержка сенсорных устройств "волшебным" образом улучшится. Хотя, возможно, кое-где понадобится добавить `touch-action: none` в CSS. Подробнее мы разберём это ниже, в секции про `pointercancel`.
```

## Свойства событий указателя

События указателя содержат те же свойства, что и события мыши, например `clientX/Y`, `target` и т.п., и несколько дополнительных:

- `pointerId` – уникальный идентификатор указателя, вызвавшего событие.
    
    Идентификатор генерируется браузером. Это свойство позволяет обрабатывать несколько указателей, например сенсорный экран со стилусом и мульти-тач (увидим примеры ниже).
- `pointerType` – тип указывающего устройства. Должен быть строкой с одним из значений: "mouse", "pen" или "touch".

    Мы можем использовать это свойство, чтобы определять разное поведение для разных типов указателей.
- `isPrimary` – равно `true` для основного указателя (первый палец в мульти-тач).

Некоторые устройства измеряют область контакта и степень надавливания, например пальца на сенсорном экране, для этого есть дополнительные свойства:

- `width` - ширина области соприкосновения указателя (например, пальца) с устройством. Если не поддерживается, например мышью, то всегда равно `1`.
- `height` - высота области соприкосновения указателя с устройством. Если не поддерживается, например мышью, то всегда равно `1`.
- `pressure` - степень давления указателя в диапазоне от 0 до 1. Для устройств, которые не поддерживают давление, принимает значение `0.5` (нажато) либо `0`.
- `tangentialPressure` - нормализованное тангенциальное давление.
- `tiltX`, `tiltY`, `twist` - специфичные для пера свойства, описывающие положение пера относительно сенсорной поверхности.

Эти свойства большинством устройств не поддерживаются, поэтому редко используются. При необходимости, подробности о них можно найти в [спецификации](https://w3c.github.io/pointerevents/#pointerevent-interface).

## Мульти-тач

Одной из функций, которую абсолютно не поддерживают события мыши, является мульти-тач: возможность касаться сразу нескольких мест на телефоне или планшете или выполнять специальные жесты.

События указателя позволяют обрабатывать мульти-тач с помощью свойств `pointerId` и `isPrimary`.

Вот что происходит, когда пользователь касается сенсорного экрана в одном месте, а затем в другом:

1. При касании первым пальцем:
    - происходит событие `pointerdown` со свойством `isPrimary=true` и некоторым `pointerId`.
2. При касании вторым и последующими пальцами (при остающемся первом):
    - происходит событие `pointerdown` со свойством `isPrimary=false` и уникальным `pointerId` для каждого касания.

Обратите внимание: `pointerId` присваивается не на всё устройство, а для каждого касающегося пальца. Если коснуться экрана 5 пальцами одновременно, получим 5 событий `pointerdown`, каждое со своими координатами и индивидуальным `pointerId`.

События, связанные с первым пальцем, всегда содержат свойство `isPrimary=true`.

Мы можем отслеживать несколько касающихся экрана пальцев, используя их `pointerId`. Когда пользователь перемещает, а затем убирает палец, получаем события `pointermove` и `pointerup` с тем же `pointerId`, что и при событии `pointerdown`.

```online
Вот небольшое демо, выводящее события `pointerdown` и `pointerup`:

[iframe src="multitouch" edit height=200]

Обратите внимание: чтобы увидеть разницу в `pointerId/isPrimary`, вам нужно использовать устройство с сенсорным экраном, такое как телефон или планшет. Для устройств без поддержки мульти-тач, таких как мышь, всегда будет один и тот же `pointerId` со свойством `isPrimary=true`, для всех событий указателя.
```

## Событие: pointercancel

Событие `pointercancel` происходит, когда текущее действие с указателем по какой-то причине прерывается, и события указателя больше не генерируются.

К таким причинам можно отнести: 
- Указывающее устройство было физически выключено.
- Изменилась ориентация устройства (перевернули планшет). 
- Браузер решил сам обработать действие, считая его жестом мыши, масштабированием и т.п.

Мы продемонстрируем `pointercancel` на практическом примере, чтобы увидеть, как это влияет на нас.

Допустим, мы реализуем перетаскивание ("drag-and-drop") для нашего мяча, как в начале статьи <info:mouse-drag-and-drop>.

Вот последовательность действий пользователя и соответствующие события:

1) Пользователь нажимает на изображении, чтобы начать перетаскивание
    - происходит событие `pointerdown`
2) Затем он перемещает указатель, двигая изображение
    - происходит событие `pointermove` (возможно, несколько раз)
3) И тут происходит сюрприз! Браузер имеет встроенную поддержку "Drag'n'Drop" для изображений, которая запускает и перехватывает процесс перетаскивания, генерируя при этом событие `pointercancel`.
    - Теперь браузер сам обрабатывает перетаскивание изображения. У пользователя есть возможность перетащить изображение мяча даже за пределы браузера, в свою почтовую программу или файловый менеджер.
    - Событий `pointermove` для нас больше не генерируется.

Таким образом, браузер "перехватывает" действие: в начале переноса drag-and-drop запускается событие `pointercancel`, и после этого события `pointermove` больше не генерируются.

```online
Вот демо drag'n'drop с записью событий указателя (только `up/down`, `move` и `cancel`) в `textarea`:
=======
As we can see, for every `mouse<event>`, there's a `pointer<event>` that plays a similar role. Also there are 3 additional pointer events that don't have a corresponding `mouse...` counterpart, we'll explain them soon. 

```smart header="Replacing `mouse<event>` with `pointer<event>` in our code"
We can replace `mouse<event>` events with `pointer<event>` in our code and expect things to continue working fine with mouse.

The support for touch devices will also "magically" improve. Although, we may need to add `touch-action: none` in some places in CSS. We'll cover it below in the section about `pointercancel`. 
```

## Pointer event properties

Pointer events have the same properties as mouse events, such as `clientX/Y`, `target`, etc., plus some others:

- `pointerId` - the unique identifier of the pointer causing the event.
    
    Browser-generated. Allows us to handle multiple pointers, such as a touchscreen with stylus and multi-touch (examples will follow).
- `pointerType` - the pointing device type. Must be a string, one of: "mouse", "pen" or "touch". 

    We can use this property to react differently on various pointer types.
- `isPrimary` - is `true` for the primary pointer (the first finger in multi-touch).

Some pointer devices measure contact area and pressure, e.g. for a finger on the touchscreen, there are additional properties for that:

- `width` - the width of the area where the pointer (e.g. a finger) touches the device. Where unsupported, e.g. for a mouse, it's always `1`. 
- `height` - the height of the area where the pointer touches the device. Where unsupported, it's always `1`.
- `pressure` - the pressure of the pointer tip, in range from 0 to 1. For devices that don't support pressure must be either `0.5` (pressed) or `0`.
- `tangentialPressure` - the normalized tangential pressure.
- `tiltX`, `tiltY`, `twist` - pen-specific properties that describe how the pen is positioned relative the surface.

These properties aren't supported by most devices, so they are rarely used. You can find the details about them in the [specification](https://w3c.github.io/pointerevents/#pointerevent-interface) if needed.

## Multi-touch

One of the things that mouse events totally don't support is multi-touch: a user can touch in several places at once on their phone or tablet, or perform special gestures.

Pointer Events allow handling multi-touch with the help of the `pointerId` and `isPrimary` properties.

Here's what happens when a user touches a touchscreen in one place, then puts another finger somewhere else on it:

1. At the first finger touch:
    - `pointerdown` with `isPrimary=true` and some `pointerId`.
2. For the second finger and more fingers (assuming the first one is still touching):
    - `pointerdown` with `isPrimary=false` and a different `pointerId` for every finger.

Please note: the `pointerId` is assigned not to the whole device, but for each touching finger. If we use 5 fingers to simultaneously touch the screen, we have 5 `pointerdown` events, each with their respective coordinates and a different `pointerId`.

The events associated with the first finger always have `isPrimary=true`.

We can track multiple touching fingers using their `pointerId`. When the user moves and then removes a finger, we get `pointermove` and `pointerup` events with the same `pointerId` as we had in `pointerdown`.

```online
Here's the demo that logs `pointerdown` and `pointerup` events:

[iframe src="multitouch" edit height=200]

Please note: you must be using a touchscreen device, such as a phone or a tablet, to actually see the difference in `pointerId/isPrimary`. For single-touch devices, such as a mouse, there'll be always same `pointerId` with `isPrimary=true`, for all pointer events.
```

## Event: pointercancel

The `pointercancel` event fires when there's an ongoing pointer interaction, and then something happens that causes it to be aborted, so that no more pointer events are generated. 

Such causes are: 
- The pointer device hardware was physically disabled.
- The device orientation changed (tablet rotated). 
- The browser decided to handle the interaction on its own, considering it a mouse gesture or zoom-and-pan action or something else.

We'll demonstrate `pointercancel` on a practical example to see how it affects us.

Let's say we're impelementing drag'n'drop for a ball, just as in the beginning of the article <info:mouse-drag-and-drop>.

Here is the flow of user actions and the corresponding events:

1) The user presses on an image, to start dragging
    - `pointerdown` event fires
2) Then they start moving the pointer (thus dragging the image)
    - `pointermove` fires, maybe several times
3) And then the surprise happens! The browser has native drag'n'drop support for images, that kicks in and takes over the drag'n'drop process, thus generating `pointercancel` event.
    - The browser now handles drag'n'drop of the image on its own. The user may even drag the ball image out of the browser, into their Mail program or a File Manager.
    - No more `pointermove` events for us.

So the issue is that the browser "hijacks" the interaction: `pointercancel` fires in the beginning of the "drag-and-drop" process, and no more `pointermove` events are generated.

```online
Here's the drag'n'drop demo with loggin of pointer events (only `up/down`, `move` and `cancel`) in the `textarea`: 
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

[iframe src="ball" height=240 edit]
```

<<<<<<< HEAD
Мы бы хотели реализовать перетаскивание самостоятельно, поэтому давайте скажем браузеру не перехватывать его.

**Предотвращайте действие браузера по умолчанию, чтобы избежать `pointercancel`.**

Нужно сделать две вещи:

1. Предотвратить запуск встроенного drag'n'drop
    - Мы можем сделать это, задав `ball.ondragstart = () => false`, как описано в статье <info:mouse-drag-and-drop>.
    - Это работает для событий мыши.
2. Для устройств с сенсорным экраном существуют другие действия браузера, связанные с касаниями, кроме drag'n'drop. Чтобы с ними не возникало проблем:
    - Мы можем предотвратить их, добавив в CSS свойство `#ball { touch-action: none }`.
    - Затем наш код начнёт корректно работать на устройствах с сенсорным экраном

После того, как мы это сделаем, события будут работать как и ожидается, браузер не будет перехватывать процесс и не будет вызывать событие `pointercancel`.

```online
В данном демо произведены нужные действия:

[iframe src="ball-2" height=240 edit]

Как вы можете видеть, событие `pointercancel` больше не срабатывает.
```

Теперь мы можем добавить код для перемещения мяча и наш drag'n'drop будет работать и для мыши и для устройств с сенсорным экраном.

## Захват указателя

Захват указателя - особая возможность событий указателя.

Общая идея очень проста, но поначалу может показаться странной, так как для других событий ничего подобного просто нет.

Основной метод:
- `elem.setPointerCapture(pointerId)` - привязывает события с данным `pointerId` к `elem`. После такого вызова все события указателя с таким `pointerId` будут иметь `elem` в качестве целевого элемента (как будто произошли над `elem`), вне зависимости от того, где в документе они произошли.

Другими словами, `elem.setPointerCapture(pointerId)` меняет `target` всех дальнейших событий с данным `pointerId` на `elem`.

Эта привязка отменяется:
- автоматически, при возникновении события `pointerup` или `pointercancel`,
- автоматически, если `elem` удаляется из документа,
- при вызове `elem.releasePointerCapture(pointerId)`. 

**Захват указателя используется для упрощения операций с переносом (drag'n'drop) элементов.**

В качестве примера давайте вспомним реализацию слайдера из статьи <info:mouse-drag-and-drop>.

Мы делаем элемент для слайдера - полоску с "ползунком" (`thumb`) внутри.

Затем он работает так:

1. Пользователь сначала нажимает на ползунок - срабатывает `pointerdown`.
2. Затем двигает указателем его - срабатывает `pointermove`, и мы передвигаем ползунок вместе с ним.
    - ...Причём, по мере движения, указатель может покидать ползунок - перемещаться выше или ниже. При этом ползунок должен передвигаться строго по горизонтали, на одной линии с указателем.

Так что для полного отслеживания перемещения указателя, включая ниже и выше ползунка, нам пришлось поставить обработчик  `pointermove` на весь документ `document`.

Такое решение выглядит слегка "грязным". Одна из проблем - это то, что движения указателя по документу могут вызвать сторонние эффекты, заставить сработать другие обработчики, не имеющие отношения к слайдеру.

Захват указателя позволяет привязать `pointermove` к `thumb` и избежать любых подобных проблем:

- Мы можем вызывать `thumb.setPointerCapture(event.pointerId)` в обработчике `pointerdown`,
- Тогда дальнейшие события указателя до `pointerup/cancel` будут привязаны к `thumb`. 
- Затем, когда произойдёт `pointerup` (передвижение завершено), привязка будет автоматически удалена, нам об этом не нужно беспокоиться.

Так что, даже если пользователь будет двигать указателем по всему документу, обработчики событий будут вызваны на `thumb`. Причём все свойства объекта события, такие как `clientX/clientY`, будут корректны - захват указателя влияет только на `target/currentTarget`.

Вот основной код:

```js
thumb.onpointerdown = function(event) {
  // все события указателя перенаправить на thumb (пока не произойдёт 'pointerup')
=======
We'd like to implement the drag'n'drop on our own, so let's tell the browser not to take it over.

**Prevent the default browser action to avoid `pointercancel`.**

We need to do two things:

1. Prevent native drag'n'drop from happening:
    - We can do this by setting `ball.ondragstart = () => false`, just as described in the article <info:mouse-drag-and-drop>.
    - That works well for mouse events.
2. For touch devices, there are other touch-related browser actions (besides drag'n'drop). To avoid problems with them too:
    - Prevent them by setting `#ball { touch-action: none }` in CSS. 
    - Then our code will start working on touch devices.

After we do that, the events will work as intended, the browser won't hijack the process and doesn't emit `pointercancel`.

```online
This demo adds these lines:

[iframe src="ball-2" height=240 edit]

As you can see, there's no `pointercancel` any more.
```

Now we can add the code to actually move the ball, and our drag'n'drop will work for mouse devices and touch devices.

## Pointer capturing

Pointer capturing is a special feature of pointer events.

The idea is very simple, but may seem quite odd at first, as nothing like that exists for any other event type.

The main method is:
- `elem.setPointerCapture(pointerId)` - binds events with the given `pointerId` to `elem`. After the call all pointer events with the same `pointerId` will have `elem` as the target (as if happened on `elem`), no matter where in document they really happened.

In other words, `elem.setPointerCapture(pointerId)` retargets all subsequent events with the given `pointerId` to `elem`.

The binding is removed:
- automatically when `pointerup` or `pointercancel` events occur,
- automatically when `elem` is removed from the document,
- when `elem.releasePointerCapture(pointerId)` is called.

**Pointer capturing can be used to simplify drag'n'drop kind of interactions.**

As an example, let's recall how one can implement a custom slider, described in the <info:mouse-drag-and-drop>.

We make a slider element with the strip and the "runner" (`thumb`) inside it.

Then it works like this:

1. The user presses on the slider `thumb` - `pointerdown` triggers.
2. Then they move the pointer - `pointermove` triggers, and we move the `thumb` along.
    - ...As the pointer moves, it may leave the slider `thumb`: go above or below it. The `thumb` should move strictly horizontally, remaining aligned with the pointer.

So, to track all pointer movements, including when it goes above/below the `thumb`, we had to assign `pointermove` event handler on the whole `document`.

That solution looks a bit "dirty". One of the problems is that pointer movements around the document may cause side effects, trigger other event handlers, totally not related to the slider.

Pointer capturing provides a means to bind `pointermove` to `thumb` and avoid any such problems:

- We can call `thumb.setPointerCapture(event.pointerId)` in `pointerdown` handler,
- Then future pointer events until `pointerup/cancel` will be retargeted to `thumb`. 
- When `pointerup` happens (dragging complete), the binding is removed automatically, we don't need to care about it.

So, even if the user moves the pointer around the whole document, events handlers will be called on `thumb`. Besides, coordinate properties of the event objects, such as `clientX/clientY` will still be correct - the capturing only affects `target/currentTarget`.

Here's the essential code:

```js
thumb.onpointerdown = function(event) {
  // retarget all pointer events (until pointerup) to thumb
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  thumb.setPointerCapture(event.pointerId);
};

thumb.onpointermove = function(event) {
<<<<<<< HEAD
  // перемещение ползунка: все события перенаправлены на этот обработчик
=======
  // moving the slider: listen on the thumb, as all pointer events are retargeted to it
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  let newLeft = event.clientX - slider.getBoundingClientRect().left;
  thumb.style.left = newLeft + 'px';
};

<<<<<<< HEAD
// примечание: нет необходимости вызывать thumb.releasePointerCapture, 
// при срабатывании события 'pointerup' это происходит автоматически
```

```online
Полное демо:
=======
// note: no need to call thumb.releasePointerCapture, 
// it happens on pointerup automatically
```

```online
The full demo:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

[iframe src="slider" height=100 edit]
```

<<<<<<< HEAD
Таким образом, мы имеем два бонуса:
1. Код становится чище, поскольку нам больше не нужно добавлять/удалять обработчики для всего документа. Удаление привязки происходит автоматически.
2. Если в документе есть какие-то другие обработчики `pointermove`, то они не будут нечаянно вызваны, пока пользователь находится в процессе перетаскивания слайдера.

### События при захвате указателя

Существует два связанных с захватом события:

- `gotpointercapture` срабатывает, когда элемент использует `setPointerCapture` для включения захвата.
- `lostpointercapture` срабатывает при освобождении от захвата: явно с помощью `releasePointerCapture` или автоматически, когда происходит событие `pointerup`/`pointercancel`.

## Итого

События указателя позволяют одновременно обрабатывать действия с помощью мыши, касания и пера, в едином фрагменте кода.

События указателя расширяют события мыши. Мы можем заменить `mouse` на `pointer` в названиях событий и код продолжит работать для мыши, при этом получив лучшую поддержку других типов устройств.

При обработке переносов и сложных касаний, которые браузер может попытаться обработать сам, не забывайте отменять действие браузера и ставить `touch-events: none` в CSS для элементов, с которыми мы взаимодействуем. 

Дополнительные возможности событий указателя:

- Поддержка мультитач с помощью `pointerId` и `isPrimary`.
- Особые свойства для определённых устройств, такие как `pressure`, `width/height` и другие.
- Захват указателя: мы можем перенаправить все события указателя на определённый элемент до наступления события `pointerup`/`pointercancel`.

На данный момент события указателя поддерживаются в основных браузерах, поэтому мы можем безопасно переходить на них, особенно если нет необходимости в поддержке IE10 и Safari 12. И даже для этих браузеров есть полифилы, которые добавляют эту поддержку.
=======
At the end, pointer capturing gives us two benefits:
1. The code becomes cleaner as we don't need to add/remove handlers on the whole `document` any more. The binding is released automatically.
2. If there are any `pointermove` handlers in the document, they won't be accidentally triggered by the pointer while the user is dragging the slider.

### Pointer capturing events

There are two associated pointer events:

- `gotpointercapture` fires when an element uses `setPointerCapture` to enable capturing.
- `lostpointercapture` fires when the capture is released: either explicitly with `releasePointerCapture` call, or automatically on `pointerup`/`pointercancel`.

## Summary

Pointer events allow handling mouse, touch and pen events simultaneously, with a single piece of code.

Pointer events extend mouse events. We can replace `mouse` with `pointer` in event names and expect our code to continue working for mouse, with better support for other device types.

For drag'n'drops and complex touch interactions that the browser may decide to hijack and handle on its own - remember to cancel the default action on events and set `touch-events: none` in CSS for elements that we engage.

Additional abilities of pointer events are:

- Multi-touch support using `pointerId` and `isPrimary`.
- Device-specific properties, such as `pressure`, `width/height`, and others.
- Pointer capturing: we can retarget all pointer events to a specific element until `pointerup`/`pointercancel`.

As of now, pointer events are supported in all major browsers, so we can safely switch to them, especially if IE10- and Safari 12- are not needed. And even with those browsers, there are polyfills that enable the support of pointer events.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
