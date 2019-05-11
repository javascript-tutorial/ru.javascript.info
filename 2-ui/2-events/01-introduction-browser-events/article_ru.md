# Введение в браузерные события

Для реакции на действия посетителя и внутреннего взаимодействия скриптов существуют *события*.

*Событие* это сигнал от браузера вашему коду о том, что что-то произошло. Все DOM узлы генерируют такие сигналы(но события не ограничены DOM-ом).

Ниже представлен список наиболее часто используемых DOM событий:

**События мыши:**
- `click` -- нажатие левой кнопки мыши по определённому элементу (сенсорные устройства генерируют их по нажатию на экран);
- `contextmenu` -- нажатие правой кнопки мыши по элементу;
- `mouseover` / `mouseout` -- наведение мыши / убрать мышь с элемента;
- `mousedown` / `mouseup` -- нажатие кнопки мыши / отпускание кнопки мыши на элементе;
- `mousemove` -- движение мышки;

**События на элементах формы:**
- `submit` -- когда пользователь нажимает кнопку отправления формы;
- `focus` --  когда пользователь фокусируется на элементе формы, например на поле ввода -- `<input>`.

**События клавиатуры:**
- `keydown` и `keyup` -- когда пользователь нажал и отпустил кнопку клавиатуры.

**События документа:**
- `DOMContentLoaded` -- когда HTML загружен и DOM полностью построен.

**События CSS:**
- `transitionend` -- когда закончилась CSS-анимация.

Вообще существует много различных событий. Некоторые из них мы рассмотрим более детально в следующих главах.

## Обработчики событий

Что-бы отреагировать на событие мы можем назначить *обработчик* -- функцию, которая запускается как только событие произошло.

Обработчики - это способ запустить определённый JavaScript код в случае тех или иных действий пользователя.

Существует несколько способов назначить обработчик. Рассмотрим их все, и начнём с самого простого.

### Использование HTML-атрибута  

Обработчик может быть установлен как часть HTML кода с атрибутом `on<event>`.

Например, что-бы назначить обработчик нажатия мышкой -- `click` по кнопке `input`, мы можем использовать атрибут `onclick`:

```html run
<input value="Нажми меня" *!*onclick="alert('Клик!')"*/!* type="button">
```

При нажатии мышкой на кнопку "Нажми меня" выполниться код внутри атрибута `onclick`.

Следует помнить, что внутри атрибута `onclick` мы используем одинарные кавычки, поскольку сам атрибут в двойных. Если использовать двойные кавычки внутри, как это указано здесь: `onclick="alert("Click!")"` то такой код не сработает.

Очевидным недостатком использования HTML-атрибута является неудобство поддержки при большом количестве кода. 
В таком случае лучше использовать JavaScript функцию, как это показано в примере ниже:

Нажатие на кнопку "Сосчитать кроликов!" запустит функцию `countRabbits()`:

```html autorun height=50
<script>
  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert("Кролик номер " + i);
    }
  }
</script>

<input type="button" *!*onclick="countRabbits()"*/!* value="Сосчитать кроликов!">
```

Как известно, имена HTML атрибутов не чувствительны к регистру, таким образом `ONCLICK` работает так же как и `onClick` и `onCLICK`... Но, как правило, атрибуты пишут в нижнем регистре: `onclick`.

### Использование свойства DOM-объекта

Ещё один способ назначения обработчика через свойство DOM-элемента `on<event>`.

Например, `elem.onclick`:

```html autorun
<input id="elem" type="button" value="Нажми меня">
<script>
*!*
  elem.onclick = function() {
    alert('Спасибо');
  };
*/!*
</script>
```

Если обработчик назначен через HTML-атрибут, тогда браузер читает его, создаёт новую функцию из содержимого этого атрибута и записывает её в свойство DOM-элемента. 

В целом, этот способ аналогичен предыдущему.

**Обработчик всегда хранится в DOM-свойстве, а атрибут – лишь один из способов его инициализации.**

Следующие два примера работают одинаково:

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

**Поскольку уже используется одно свойство `onclick`, в данном случае мы не можем назначить более одного обработчика событий.**

В следующем примере обработчик добавленый из JavaScript кода перезапишет существующий обработчик:

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('До')" value="Click me">
<script>
*!*
  elem.onclick = function() { // перезаписывает существующий обработчик
    alert('После'); // только это будет показано
  };
*/!*
</script>
```

Мы также можем назначить существующую функцию в качестве обработчика событий:

```js
function sayThanks() {
  alert('Спасибо!');
}

elem.onclick = sayThanks;
```

Удалить обработчик можно присвоив значение `null` определённому событию -- `elem.onclick = null`.

## Доступ к элементу через this

`this` -- это элемент, на котором сработал обработчик.

В примере ниже, нажатие на кнопку `button` покажет её содержимое `this.innerHTML`:

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Нажми меня</button>
```

## Возможные ошибки

Если вы только начинаете работать с событиями -- пожалуйста, обратите внимание на некоторые тонкости.

**Функцию-обработчик следует назначать без скобок `sayThanks`. Использование `sayThanks()` - не верно.**

```js
// правильно
button.onclick = sayThanks;

// не верно
button.onclick = sayThanks();
```

Если мы добавляем скобки, тогда `sayThanks()` -- вернёт результат выполнения функции, таким образом `onclick` в последнем примере станет равным `undefined` (как результат выполнения функции), и как следствие код будет не рабочим.

...но, в разметке скобки необходимы:

```html
<input type="button" id="button" onclick="sayThanks()">
```

Различие легко объяснить. Когда браузер читает атрибут, он создаёт функцию-обработчик с телом из его содержимого.

Поэтому, следующий пример аналогичен предыдущему:
```js
button.onclick = function() {
*!*
  sayThanks(); // содержимое атрибута
*/!*
};
```

**Используйте именно функции, а не строки.**

Назначение `elem.onclick = "alert(1)"` тоже будет работать. Это сделано из соображений совместимости, но строго не рекомендуется в использовании.

**Не используйте `setAttribute` для обработчиков.**

Следующий вызов не сработает:

```js run no-beautify
// нажатие по <body> сгенерирует ошибки,
// потому что атрибуты всегда строки, и в данном случае функция становится строкой
document.body.setAttribute('onclick', function() { alert(1) });
```

**Регистр DOM-свойства имеет значение.**

Важно, что DOM-свойства чувствительны к регистру и правильный вызов выглядит: `elem.onclick`, но не `elem.ONCLICK`.

## addEventListener

Основная проблема в вышеперечисленных способах назначения обработчика -- мы не можем назначить несколько обработчиков на одно событие.

Например, одна часть нашего кода подсвечивает кнопку по нажатию на неё, а другая часть -- показывает сообщение.

Первое решение, которое приходит для решения это назначить два обработчика события на один DOM элемент. Но, это решение не сработает, поскольку новое DOM-свойство перезапишет уже существующее:

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // перезапишет предыдущий обработчик
```

Разработчики стандартов достаточно давно это поняли и предложили альтернативный способ назначения и удаления обработчиков при помощи специальных методов `addEventListener` и `removeEventListener`, которые не имеют вышеуказанного недостатка.

Назначение обработчика осуществляется вызовом `addEventListener` с тремя аргументами:

```js
element.addEventListener(event, handler[, options]);
```

`event`
: название события, например: `"click"`;

`handler`
: ссылка на функцию-обработчик;

`options`
: необязательный объект со свойствами:
    - `once`: если `true`, тогда listener(функция назначения обработчика) автоматически удаляется после срабатывания;
    - `capture`: порядок обработки событий, будет рассматриваться далее, в главе <info:bubbling-and-capturing>. По историческим причинам, `options` также может быть `false/true`, это тоже самое что `{capture: false/true}`;
    - `passive`: если `true`, тогда обработчик не сможет вызвать `preventDefault()`, мы рассмотрим это позже, в разделе <info:default-browser-action>.


Для удаления обработчика используется `removeEventListener`:

```js
element.removeEventListener(event, handler[, options]);
```

````warn header="Удаление требует ту же самую функцию"
Для удаления нужно передать именно ту функцию-обработчик которая была назначена.

Не сработает:

```js no-beautify
elem.addEventListener( "click" , () => alert('Спасибо!'));
// ....
elem.removeEventListener( "click", () => alert('Спасибо!'));
```

В `removeEventListener` передана не та же функция, а другая, с одинаковым кодом.

Вот так правильно:

```js
function handler() {
  alert( 'Спасибо!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

Обратим внимание – если функцию не сохранить где-либо, а просто передать в `addEventListener`, как в предыдущем коде, то потом получить её обратно, чтобы снять обработчик, будет невозможно. Нет способа, который позволяет считать обработчики событий, назначенные через `addEventListener`.
````

Метод `addEventListener` позволяет добавлять несколько обработчиков на одно событие одного элемента, например:

```html run no-beautify
<input id="elem" type="button" value="Нажми меня"/>

<script>
  function handler1() {
    alert('Спасибо!');
  };

  function handler2() {
    alert('Снова спасибо!');
  }

*!*
  elem.onclick = () => alert("Привет");
  elem.addEventListener("click", handler1); // Спасибо!
  elem.addEventListener("click", handler2); // Снова спасибо!
*/!*
</script>
```

As we can see in the example above, we can set handlers *both* using a DOM-property and `addEventListener`. But generally we use only one of these ways.

````warn header="For some events, handlers only work with `addEventListener`"
There exist events that can't be assigned via a DOM-property. Must use `addEventListener`.

For instance, the event `transitionend` (CSS animation finished) is like that.

Try the code below. In most browsers only the second handler works, not the first one.

```html run
<style>
  input {
    transition: width 1s;
    width: 100px;
  }

  .wide {
    width: 300px;
  }
</style>

<input type="button" id="elem" onclick="this.classList.toggle('wide')" value="Нажми меня">

<script>
  elem.ontransitionend = function() {
    alert("DOM property"); // не работает
  };

*!*
  elem.addEventListener("transitionend", function() {
    alert("addEventListener"); // сообщение покажется, когда анимация закончится;
  });
*/!*
</script>
```
````

## Event object

To properly handle an event we'd want to know more about what's happened. Not just a "click" or a "keypress", but what were the pointer coordinates? Which key was pressed? And so on.

When an event happens, the browser creates an *event object*, puts details into it and passes it as an argument to the handler.

Here's an example of getting mouse coordinates from the event object:

```html run
<input type="button" value="Нажми меня" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // show event type, element and coordinates of the click
    alert(event.type + " at " + event.currentTarget);
    alert("Coordinates: " + event.clientX + ":" + event.clientY);
  };
</script>
```

Some properties of `event` object:

`event.type`
: Event type, here it's `"click"`.

`event.currentTarget`
: Element that handled the event. That's exactly the same as `this`, unless you bind `this` to something else, and then `event.currentTarget` becomes useful.

`event.clientX / event.clientY`
: Window-relative coordinates of the cursor, for mouse events.

There are more properties. They depend on the event type, so we'll study them later when we come to different events in details.

````smart header="The event object is also accessible from HTML"
If we assign a handler in HTML, we can also use the `event` object, like this:

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Event type">
```

That's possible because when the browser reads the attribute, it creates a handler like this:  `function(event) { alert(event.type) }`. That is: its first argument is called `"event"`, and the body is taken from the attribute.
````


## Object handlers: handleEvent

We can assign an object as an event handler using `addEventListener`. When an event occurs, its `handleEvent` method is called with it.

For instance:


```html run
<button id="elem">Нажми меня</button>

<script>
  elem.addEventListener('click', {
    handleEvent(event) {
      alert(event.type + " at " + event.currentTarget);
    }
  });
</script>
```

In other words, when `addEventListener` receives an object as the handler, it calls `object.handleEvent(event)` in case of an event.

We could also use a class for that:


```html run
<button id="elem">Нажми меня</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Кнопка мыши нажата";
          break;
        case 'mouseup':
          elem.innerHTML += "...и отпущена.";
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

Here the same object handles both events. Please note that we need to explicitly setup the events to listen using `addEventListener`. The `menu` object only gets `mousedown` and `mouseup` here, not any other types of events.

The method `handleEvent` does not have to do all the job by itself. It can call other event-specific methods instead, like this:

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
      elem.innerHTML += "...и отпущена.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

Now event handlers are clearly separated, that may be easier to support.

## Итого

Существует три способа назначения обработчика событий:

1. HTML атрибут: `onclick="..."`.
2. DOM свойство: `elem.onclick = function`.
3. Методы: `elem.addEventListener(event, handler[, phase])` to add, `removeEventListener` to remove.

HTML attributes are used sparingly, because JavaScript in the middle of an HTML tag looks a little bit odd and alien. Also can't write lots of code in there.

DOM properties are ok to use, but we can't assign more than one handler of the particular event. In many cases that limitation is not pressing.

The last way is the most flexible, but it is also the longest to write. There are few events that only work with it, for instance `transtionend` and `DOMContentLoaded` (to be covered). Also `addEventListener` supports objects as event handlers. In that case the method `handleEvent` is called in case of the event.

No matter how you assign the handler -- it gets an event object as the first argument. That object contains the details about what's happened.

We'll learn more about events in general and about different types of events in the next chapters.
