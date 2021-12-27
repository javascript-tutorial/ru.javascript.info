# Введение в браузерные события

*Событие* - это сигнал от браузера о том, что что-то произошло. Все DOM-узлы подают такие сигналы (хотя события бывают и не только в DOM).

Вот список самых часто используемых DOM-событий, пока просто для ознакомления:

**События мыши:**
- `click` -- происходит, когда кликнули на элемент левой кнопкой мыши (на устройствах с сенсорными экранами оно происходит при касании).
- `contextmenu` -- происходит, когда кликнули на элемент правой кнопкой мыши.
- `mouseover` / `mouseout` -- когда мышь наводится на / покидает элемент.
- `mousedown` / `mouseup` -- когда нажали / отжали кнопку мыши на элементе.
- `mousemove` -- при движении мыши.

<<<<<<< HEAD
**События на элементах управления:**
- `submit` -- пользователь отправил форму `<form>`.
- `focus` -- пользователь фокусируется на элементе, например нажимает на `<input>`.

**Клавиатурные события:**
- `keydown` и `keyup` -- когда пользователь нажимает / отпускает клавишу.

**События документа:**
- `DOMContentLoaded` -- когда HTML загружен и обработан, DOM документа полностью построен и доступен.
=======
**Keyboard events:**
- `keydown` and `keyup` -- when a keyboard key is pressed and released.

**Form element events:**
- `submit` -- when the visitor submits a `<form>`.
- `focus` --  when the visitor focuses on an element, e.g. on an `<input>`.

**Document events:**
- `DOMContentLoaded` -- when the HTML is loaded and processed, DOM is fully built.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

**CSS events:**
- `transitionend` -- когда CSS-анимация завершена.

Существует множество других событий. Мы подробно разберём их в последующих главах.

## Обработчики событий

Событию можно назначить *обработчик*, то есть функцию, которая сработает, как только событие произошло.

Именно благодаря обработчикам JavaScript-код может реагировать на действия пользователя.

Есть несколько способов назначить событию обработчик. Сейчас мы их рассмотрим, начиная с самого простого.

### Использование атрибута HTML

Обработчик может быть назначен прямо в разметке, в атрибуте, который называется `on<событие>`.

Например, чтобы назначить обработчик события `click` на элементе `input`, можно использовать атрибут `onclick`, вот так:

```html run
<input value="Нажми меня" *!*onclick="alert('Клик!')"*/!* type="button">
```

При клике мышкой на кнопке выполнится код, указанный в атрибуте `onclick`.

Обратите внимание, для содержимого атрибута `onclick` используются одинарные кавычки, так как сам атрибут находится в двойных. Если мы забудем об этом и поставим двойные кавычки внутри атрибута, вот так: `onclick="alert("Click!")"`, код не будет работать.

Атрибут HTML-тега - не самое удобное место для написания большого количества кода, поэтому лучше создать отдельную JavaScript-функцию и вызвать её там.

Следующий пример по клику запускает функцию `countRabbits()`:

```html autorun height=50
<script>
  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert("Кролик номер " + i);
    }
  }
</script>

<input type="button" *!*onclick="countRabbits()"*/!* value="Считать кроликов!">
```

Как мы помним, атрибут HTML-тега не чувствителен к регистру, поэтому `ONCLICK` будет работать так же, как `onClick` и `onCLICK`... Но, как правило, атрибуты пишут в нижнем регистре: `onclick`.

### Использование свойства DOM-объекта

Можно назначать обработчик, используя свойство DOM-элемента `on<событие>`.

К примеру, `elem.onclick`:

```html autorun
<input id="elem" type="button" value="Нажми меня!">
<script>
*!*
  elem.onclick = function() {
    alert('Спасибо');
  };
*/!*
</script>
```

Если обработчик задан через атрибут, то браузер читает HTML-разметку, создаёт новую функцию из содержимого атрибута и записывает в свойство.

Этот способ, по сути, аналогичен предыдущему.

<<<<<<< HEAD
**Обработчик всегда хранится в свойстве DOM-объекта, а атрибут – лишь один из способов его инициализации.**

Эти два примера кода работают одинаково:
=======
These two code pieces work the same:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

1. Только HTML:

    ```html autorun height=50
    <input type="button" *!*onclick="alert('Клик!')"*/!* value="Кнопка">
    ```
2. HTML + JS:

    ```html autorun height=50
    <input type="button" id="button" value="Кнопка">
    <script>
    *!*
      button.onclick = function() {
        alert('Клик!');
      };
    */!*
    </script>
    ```

<<<<<<< HEAD
**Так как у элемента DOM может быть только одно свойство с именем `onclick`, то назначить более одного обработчика так нельзя.**
=======
In the first example, the HTML attribute is used to initialize the `button.onclick`, while in the second example -- the script, that's all the difference.

**As there's only one `onclick` property, we can't assign more than one event handler.**
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

В примере ниже назначение через JavaScript перезапишет обработчик из атрибута:

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Было')" value="Нажми меня">
<script>
*!*
  elem.onclick = function() { // перезапишет существующий обработчик
    alert('Станет'); // выведется только это
  };
*/!*
</script>
```

<<<<<<< HEAD
Кстати, обработчиком можно назначить и уже существующую функцию:

```js
function sayThanks() {
  alert('Спасибо!');
}

elem.onclick = sayThanks;
```

Убрать обработчик можно назначением `elem.onclick = null`.
=======
To remove a handler -- assign `elem.onclick = null`.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

## Доступ к элементу через this

Внутри обработчика события `this` ссылается на текущий элемент, то есть на тот, на котором, как говорят, "висит" (т.е. назначен) обработчик.

В коде ниже `button` выводит своё содержимое, используя `this.innerHTML`:

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Нажми меня</button>
```

## Частые ошибки

<<<<<<< HEAD
Если вы только начинаете работать с событиями, обратите внимание на следующие моменты.

**Функция должна быть присвоена как `sayThanks`, а не `sayThanks()`.**
=======
If you're starting to work with events -- please note some subtleties.

We can set an existing function as a handler:

```js
function sayThanks() {
  alert('Thanks!');
}

elem.onclick = sayThanks;
```

But be careful: the function should be assigned as `sayThanks`, not `sayThanks()`.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js
// правильно
button.onclick = sayThanks;

// неправильно
button.onclick = sayThanks();
```

<<<<<<< HEAD
Если добавить скобки, то `sayThanks()` -- это уже вызов функции, результат которого (равный `undefined`, так как функция ничего не возвращает) будет присвоен `onclick`. Так что это не будет работать.
=======
If we add parentheses, then `sayThanks()` becomes a function call. So the last line actually takes the *result* of the function execution, that is `undefined` (as the function returns nothing), and assigns it to `onclick`. That doesn't work.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

...А вот в разметке, в отличие от свойства, скобки нужны:

```html
<input type="button" id="button" onclick="sayThanks()">
```

<<<<<<< HEAD
Это различие просто объяснить. При создании обработчика браузером из атрибута, он автоматически создаёт функцию с *телом из значения атрибута*: `sayThanks()`.
=======
The difference is easy to explain. When the browser reads the attribute, it creates a handler function with body from the attribute content.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Так что разметка генерирует такое свойство:
```js
button.onclick = function() {
*!*
<<<<<<< HEAD
  sayThanks(); // содержимое атрибута
=======
  sayThanks(); // <-- the attribute content goes here
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
*/!*
};
```

<<<<<<< HEAD
**Используйте именно функции, а не строки.**

Назначение обработчика строкой `elem.onclick = "alert(1)"` также сработает. Это сделано из соображений совместимости, но делать так не рекомендуется.

**Не используйте `setAttribute` для обработчиков.**
=======
**Don't use `setAttribute` for handlers.**
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Такой вызов работать не будет:

```js run no-beautify
// при нажатии на body будут ошибки,
// атрибуты всегда строки, и функция станет строкой
document.body.setAttribute('onclick', function() { alert(1) });
```

**Регистр DOM-свойства имеет значение.**

Используйте `elem.onclick`, а не `elem.ONCLICK`, потому что DOM-свойства чувствительны к регистру.

## addEventListener

Фундаментальный недостаток описанных выше способов назначения обработчика – невозможность повесить несколько обработчиков на одно событие.

<<<<<<< HEAD
Например, одна часть кода хочет при клике на кнопку делать её подсвеченной, а другая – выдавать сообщение.
=======
Let's say, one part of our code wants to highlight a button on click, and another one wants to show a message on the same click.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Мы хотим назначить два обработчика для этого. Но новое DOM-свойство перезапишет предыдущее:

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // заменит предыдущий обработчик
```

<<<<<<< HEAD
Разработчики стандартов достаточно давно это поняли и предложили альтернативный способ назначения обработчиков при помощи специальных методов `addEventListener` и `removeEventListener`. Они свободны от указанного недостатка.
=======
Developers of web standards understood that long ago and suggested an alternative way of managing handlers using special methods `addEventListener` and `removeEventListener`. They are free of such a problem.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Синтаксис добавления обработчика:

```js
element.addEventListener(event, handler, [options]);
```

`event`
: Имя события, например `"click"`.

`handler`
: Ссылка на функцию-обработчик.

`options`
<<<<<<< HEAD
: Дополнительный объект со свойствами:
    - `once`: если `true`, тогда обработчик будет автоматически удалён после выполнения.
    - `capture`: фаза, на которой должен сработать обработчик, подробнее об этом будет рассказано в главе <info:bubbling-and-capturing>. Так исторически сложилось, что `options` может быть `false/true`, это то же самое, что `{capture: false/true}`.
    - `passive`: если `true`, то указывает, что обработчик никогда не вызовет `preventDefault()`, подробнее об этом будет рассказано в главе <info:default-browser-action>.

=======
: An additional optional object with properties:
    - `once`: if `true`, then the listener is automatically removed after it triggers.
    - `capture`: the phase where to handle the event, to be covered later in the chapter <info:bubbling-and-capturing>. For historical reasons, `options` can also be `false/true`, that's the same as `{capture: false/true}`.
    - `passive`: if `true`, then the handler will not call `preventDefault()`, we'll explain that later in <info:default-browser-action>.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Для удаления обработчика следует использовать `removeEventListener`:

```js
element.removeEventListener(event, handler, [options]);
```

````warn header="Удаление требует именно ту же функцию"
Для удаления нужно передать именно ту функцию-обработчик которая была назначена.

<<<<<<< HEAD
Вот так не сработает:
=======
This doesn't work:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js no-beautify
elem.addEventListener( "click" , () => alert('Спасибо!'));
// ....
elem.removeEventListener( "click", () => alert('Спасибо!'));
```

<<<<<<< HEAD
Обработчик не будет удалён, т.к. в `removeEventListener` передана не та же функция, а другая, с одинаковым кодом, но это не важно.
=======
The handler won't be removed, because `removeEventListener` gets another function -- with the same code, but that doesn't matter, as it's a different function object.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Вот так правильно:

```js
function handler() {
  alert( 'Спасибо!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

Обратим внимание -- если функцию обработчик не сохранить где-либо, мы не сможем её удалить. Нет метода, который позволяет получить из элемента обработчики событий, назначенные через `addEventListener`.
````

Метод `addEventListener` позволяет добавлять несколько обработчиков на одно событие одного элемента, например:

```html run no-beautify
<input id="elem" type="button" value="Нажми меня"/>

<script>
  function handler1() {
    alert('Спасибо!');
  };

  function handler2() {
    alert('Спасибо ещё раз!');
  }

*!*
  elem.onclick = () => alert("Привет");
  elem.addEventListener("click", handler1); // Спасибо!
  elem.addEventListener("click", handler2); // Спасибо ещё раз!
*/!*
</script>
```

Как видно из примера выше, можно одновременно назначать обработчики и через DOM-свойство и через `addEventListener`. Однако, во избежание путаницы, рекомендуется выбрать один способ.

<<<<<<< HEAD
````warn header="Обработчики некоторых событий можно назначать только через `addEventListener`"
Существуют события, которые нельзя назначить через DOM-свойство, но можно через `addEventListener`.

Например, таково событие `DOMContentLoaded`, которое срабатывает, когда завершена загрузка и построение DOM документа.

```js
document.onDOMContentLoaded = function() {
  alert("DOM построен"); // не будет работать
=======
````warn header="For some events, handlers only work with `addEventListener`"
There exist events that can't be assigned via a DOM-property. Only with `addEventListener`.

For instance, the `DOMContentLoaded` event, that triggers when the document is loaded and DOM is built.

```js
// will never run
document.onDOMContentLoaded = function() {
  alert("DOM built");
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
};
```

```js
<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM построен"); // а вот так сработает
});
```
Так что `addEventListener` более универсален. Хотя заметим, что таких событий меньшинство, это скорее исключение, чем правило.
=======
// this way it works
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM built");
});
```
So `addEventListener` is more universal. Although, such events are an exception rather than the rule.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
````

## Объект события

<<<<<<< HEAD
Чтобы хорошо обработать событие, могут понадобиться детали того, что произошло. Не просто "клик" или "нажатие клавиши", а также -- какие координаты указателя мыши, какая клавиша нажата и так далее.
=======
To properly handle an event we'd want to know more about what's happened. Not just a "click" or a "keydown", but what were the pointer coordinates? Which key was pressed? And so on.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Когда происходит событие,  браузер создаёт *объект события*, записывает в него детали и передаёт его в качестве аргумента функции-обработчику.

<<<<<<< HEAD
Пример ниже демонстрирует получение координат мыши из объекта события:
=======
Here's an example of getting pointer coordinates from the event object:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```html run
<input type="button" value="Нажми меня" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // вывести тип события, элемент и координаты клика
    alert(event.type + " на " + event.currentTarget);
    alert("Координаты: " + event.clientX + ":" + event.clientY);
  };
</script>
```

Некоторые свойства объекта `event`:

`event.type`
: Тип события, в данном случае `"click"`.

`event.currentTarget`
: Элемент, на котором сработал обработчик. Значение -- обычно такое же, как и у `this`, но если обработчик является функцией-стрелкой или при помощи `bind` привязан другой объект в качестве `this`, то мы можем получить элемент из `event.currentTarget`.

`event.clientX / event.clientY`
<<<<<<< HEAD
: Координаты курсора в момент клика относительно окна, для событий мыши.

Есть также и ряд других свойств, в зависимости от типа событий, которые мы разберём в дальнейших главах.

````smart header="Объект события доступен и в HTML"
При назначении обработчика в HTML, тоже можно использовать объект `event`, вот так:
=======
: Window-relative coordinates of the cursor, for pointer events.

There are more properties. Many of them depend on the event type: keyboard events have one set of properties, pointer events - another one, we'll study them later when we come to different events in details.

````smart header="The event object is also available in HTML handlers"
If we assign a handler in HTML, we can also use the `event` object, like this:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Тип события">
```

Это возможно потому, что когда браузер из атрибута создаёт функцию-обработчик, то она выглядит так: `function(event) { alert(event.type) }`. То есть, её первый аргумент называется `"event"`, а тело взято из атрибута.
````


## Объект-обработчик: handleEvent

Мы можем назначить обработчиком не только функцию, но и объект при помощи `addEventListener`. В этом случае, когда происходит событие, вызывается метод объекта `handleEvent`.

К примеру:


```html run
<button id="elem">Нажми меня</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " на " + event.currentTarget);
    }
  };

  elem.addEventListener('click', obj);
</script>
```

<<<<<<< HEAD
Как видим, если `addEventListener` получает объект в качестве обработчика, он вызывает `object.handleEvent(event)`, когда происходит событие.
=======
As we can see, when `addEventListener` receives an object as the handler, it calls `obj.handleEvent(event)` in case of an event.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Мы также можем использовать класс для этого:


```html run
<button id="elem">Нажми меня</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Нажата кнопка мыши";
          break;
        case 'mouseup':
          elem.innerHTML += "...и отжата.";
          break;
      }
    }
  }

*!*
  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
*/!*
</script>
```

Здесь один и тот же объект обрабатывает оба события. Обратите внимание, мы должны явно назначить оба обработчика через `addEventListener`. Тогда объект `menu` будет получать события `mousedown` и `mouseup`, но не другие (не назначенные) типы событий.

Метод `handleEvent` не обязательно должен выполнять всю работу сам. Он может вызывать другие методы, которые заточены под обработку конкретных типов событий, вот так:

```html run
<button id="elem">Нажми меня</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Кнопка мыши нажата";
    }

    onMouseup() {
      elem.innerHTML += "...и отжата.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

Теперь обработка событий разделена по методам, что упрощает поддержку кода.

## Итого

Есть три способа назначения обработчиков событий:

1. Атрибут HTML: `onclick="..."`.
2. DOM-свойство: `elem.onclick = function`.
3. Специальные методы: `elem.addEventListener(event, handler[, phase])` для добавления, `removeEventListener` для удаления.

HTML-атрибуты используются редко потому, что JavaScript в HTML-теге выглядит немного странно. К тому же много кода там не напишешь.

DOM-свойства вполне можно использовать, но мы не можем назначить больше одного обработчика на один тип события. Во многих случаях с этим ограничением можно мириться.

<<<<<<< HEAD
Последний способ самый гибкий, однако нужно писать больше всего кода. Есть несколько типов событий, которые работают только через него, к примеру `transitionend` и `DOMContentLoaded`. Также `addEventListener` поддерживает объекты в качестве обработчиков событий. В этом случае вызывается метод объекта `handleEvent`.
=======
The last way is the most flexible, but it is also the longest to write. There are few events that only work with it, for instance `transitionend` and `DOMContentLoaded` (to be covered). Also `addEventListener` supports objects as event handlers. In that case the method `handleEvent` is called in case of the event.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Не важно, как вы назначаете обработчик -- он получает объект события первым аргументом. Этот объект содержит подробности о том, что произошло.

Мы изучим больше о событиях и их типах в следующих главах.
