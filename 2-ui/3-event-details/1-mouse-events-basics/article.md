# Основы событий мыши

<<<<<<< HEAD
В этой главе мы более детально рассмотрим события мыши и их свойства.

Сразу заметим: эти события бывают не только из-за мыши, но и эмулируются на других устройствах, в частности, на мобильных, для совместимости.

## Типы событий мыши
=======
In this chapter we'll get into more details about mouse events and their properties.

Please note: such events may come not only from "mouse devices", but are also from other devices, such as phones and tablets, where they are emulated for compatibility.

## Mouse event types
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

Мы можем разделить события мыши на две категории: "простые" и "комплексные".

### Простые события

Самые часто используемые простые события:

`mousedown/mouseup`
: Кнопка мыши нажата/отпущена над элементом.

`mouseover/mouseout`
: Курсор мыши появляется над элементом и уходит с него.

`mousemove`
: Каждое движение мыши над элементом генерирует это событие.

...Есть также несколько иных типов событий, которые мы рассмотрим позже.

### Комплексные события

`click`
: Вызывается при `mousedown` , а затем `mouseup`  над одним и тем же элементом, если использовалась левая кнопка мыши.

`contextmenu`
: Вызывается при `mousedown` правой кнопкой мыши.

`dblclick`
: Вызывается двойным кликом на элементе.

Комплексные события состоят из простых, поэтому в теории мы могли бы без них обойтись. Но хорошо, что они существуют, потому что работать с ними очень удобно.

### Порядок событий

Одно действие может вызвать несколько событий.

Например, клик мышью вначале вызывает `mousedown`, когда кнопка нажата, затем `mouseup` и `click`, когда она отпущена.

<<<<<<< HEAD
В случае, когда одно действие инициирует несколько событий, порядок их выполнения фиксирован. То есть обработчики событий вызываются в следующем порядке: `mousedown` -> `mouseup` -> `click`.
=======
In cases when a single action initiates multiple events, their order is fixed. That is, the handlers are called in the order `mousedown` -> `mouseup` -> `click`.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```online
Кликните на кнопку ниже, и вы увидите события. Также попробуйте двойной клик.

В окне теста ниже все события мыши записываются, и если задержка между ними более 1 секунды, то они разделяются горизонтальной чертой.

При этом мы также можем увидеть свойство `which`, которое позволяет определить, какая кнопка мыши была нажата.

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Кликни меня левой или правой кнопкой мыши" type="button"> <input onclick="logClear('test')" value="Очистить" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## Получение информации о кнопке: which

События, связанные с кликом, всегда имеют свойство `which`, которое позволяет определить нажатую кнопку мыши.

Это свойство не используется для событий `click` и `contextmenu`, поскольку первое происходит только при нажатии левой кнопкой мыши, а второе -- правой.

Но если мы отслеживаем `mousedown` и `mouseup`, то оно нам нужно, потому что эти события срабатывают на любой кнопке, и `which` позволяет различать между собой "нажатие правой кнопки" и "нажатие левой кнопки".

Есть три возможных значения:

- `event.which == 1` -- левая кнопка
- `event.which == 2` -- средняя кнопка
- `event.which == 3` -- правая кнопка

Средняя кнопка сейчас -- скорее экзотика, и используется очень редко.

## Модификаторы: shift, alt, ctrl и meta

Все события мыши включают в себя информацию о нажатых клавишах-модификаторах.

<<<<<<< HEAD
Свойства объекта события:

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (или `key:Opt` для Mac)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: `key:Cmd` для Mac
=======
Event properties:

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (or `key:Opt` for Mac)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: `key:Cmd` for Mac

They are `true` if the corresponding key was pressed during the event.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

Они равны `true`, если во время события была нажата соответствующая клавиша.

Например, кнопка внизу работает только при комбинации `key:Alt+Shift`+клик:

```html autorun height=60
<button id="button">Нажми Alt+Shift+Click на мне!</button>

<script>
  button.onclick = function(event) {
*!*
    if (event.altKey && event.shiftKey) {
*/!*
      alert('Ура!');
    }
  };
</script>
```

<<<<<<< HEAD
```warn header="Внимание: обычно на Mac используется клавиша `Cmd` вместо `Ctrl`"
В Windows и Linux клавишами-модификаторами являются `key:Alt`, `key:Shift` и `key:Ctrl`. На Mac есть ещё одна: `key:Cmd`, которой соответствует свойство `metaKey`.

В большинстве приложений, когда в Windows/Linux используется `key:Ctrl`, на Mac используется `key:Cmd`.

То есть, когда пользователь Windows нажимает `key:Ctrl+Enter` и `key:Ctrl+A`, пользователь Mac нажимает `key:Cmd+Enter` или `key:Cmd+A`, и так далее.

Поэтому, если мы хотим поддерживать такие комбинации, как `key:Ctrl`+клик, то для Mac имеет смысл использовать `key:Cmd`+клик. Это удобней для пользователей Mac.

Даже если мы и хотели бы заставить людей на Mac использовать именно `key:Ctrl`+клик, это довольно сложно. Проблема в том, что левый клик в сочетании с `key:Ctrl` интерпретируется как *правый клик* на MacOS и генерирует событие `contextmenu`, а не `click` как на Windows/Linux.

Поэтому, если мы хотим, чтобы пользователям всех операционных систем было удобно, то вместе с `ctrlKey` нам нужно проверять `metaKey`.
=======
```warn header="Attention: on Mac it's usually `Cmd` instead of `Ctrl`"
On Windows and Linux there are modifier keys `key:Alt`, `key:Shift` and `key:Ctrl`. On Mac there's one more: `key:Cmd`, corresponding to the property `metaKey`.

In most applications, when Windows/Linux uses `key:Ctrl`, on Mac `key:Cmd` is used.

That is: where a Windows user presses `key:Ctrl+Enter` or `key:Ctrl+A`, a Mac user would press `key:Cmd+Enter` or `key:Cmd+A`, and so on.

So if we want to support combinations like `key:Ctrl`+click, then for Mac it makes sense to use `key:Cmd`+click. That's more comfortable for Mac users.

Even if we'd like to force Mac users to `key:Ctrl`+click -- that's kind of difficult. The problem is: a left-click with `key:Ctrl` is interpreted as a *right-click* on MacOS, and it generates the `contextmenu` event, not `click` like Windows/Linux.

So if we want users of all operational systems to feel comfortable, then together with `ctrlKey` we should check `metaKey`.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

Для JS-кода это означает, что мы должны проверить `if (event.ctrlKey || event.metaKey)`.
```

```warn header="Не забывайте про мобильные устройства"
Комбинации клавиш на клавиатуре -- это хорошее дополнение к рабочему процессу. Если у пользователя есть клавиатура -- они работают. Ну а если на его устройстве её нет -- должен быть другой способ сделать то же самое.
```

## Координаты: clientX/Y, pageX/Y

Все события мыши имеют координаты двух видов:

1. Относительно окна: `clientX` и `clientY`.
2. Относительно документа: `pageX` и `pageY`.

Например, если у нас есть окно размером 500x500, и курсор мыши находится в левом верхнем углу, то значения `clientX` и `clientY` равны `0`. А если мышь находится в центре окна, то значения `clientX` и `clientY` равны `250` независимо от того, в каком месте документа она находится и до какого места документ прокручен. В этом они похожи на `position:fixed`.

````online
<<<<<<< HEAD
Наведите курсор мыши на поле ввода, чтобы увидеть `clientX/clientY` (пример находится в `iframe`, поэтому координаты определяются относительно этого `iframe`):
=======
Move the mouse over the input field to see `clientX/clientY` (the example is in the `iframe`, so coordinates are relative to that `iframe`):
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Наведи на меня мышь">
```
````

<<<<<<< HEAD
Координаты относительно документа `pageX`, `pageY` отсчитываются не от окна, а от левого верхнего угла документа. Подробнее о координатах вы можете узнать в главе <info:coordinates>.

## Отключаем выделение

Двойной клик мыши имеют побочный эффект, который может быть неудобен в некоторых интерфейсах: он выделяет текст.

Например, двойной клик на текст ниже выделяет его в дополнение к нашему обработчику:

```html autorun height=50
<span ondblclick="alert('dblclick')">Сделайте двойной клик на мне</span>
```

Если зажать левую кнопку мыши и, не отпуская кнопку, провести мышью, то также будет выделение, которое в интерфейсах может быть "не кстати".

Есть несколько способов запретить выделение, о которых вы можете прочитать в главе <info:selection-range>.

В данном случае самым разумным будет отменить действие браузера по умолчанию при событии `mousedown`, это отменит оба этих выделения:
=======
Document-relative coordinates `pageX`, `pageY` are counted from the left-upper corner of the document, not the window. You can read more about coordinates in the chapter <info:coordinates>.

## Disabling selection

Double mouse click has a side-effect that may be disturbing in some interfaces: it selects the text.

For instance, a double-click on the text below selects it in addition to our handler:

```html autorun height=50
<span ondblclick="alert('dblclick')">Double-click me</span>
```

If one presses the left mouse button and, without releasing it, moves the mouse, that also makes the selection, often unwanted.

There are multiple ways to prevent the selection, that you can read in the chapter <info:selection-range>.

In this particular case the most reasonable way is to prevent the browser action on `mousedown`. It prevents both these selections:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```html autorun height=50
До...
<b ondblclick="alert('Клик!')" *!*onmousedown="return false"*/!*>
  Сделайте двойной клик на мне
</b>
...После
```

<<<<<<< HEAD
Теперь выделенный жирным элемент не выделяется при двойном клике, а также на нём нельзя начать выделение, зажав кнопку мыши.

Заметим, что текст внутри него по прежнему можно выделить, если начать выделение не на самом тексте, а до него или после. Обычно это нормально воспринимается пользователями.

````smart header="Предотвращение копирования"
Если мы хотим отключить выделение для защиты содержимого страницы от копирования, то мы можем использовать другое событие: `oncopy`.
=======
Now the bold element is not selected on double clicks, and pressing the left button on it won't start the selection.

Please note: the text inside it is still selectable. However, the selection should start not on the text itself, but before or after it. Usually that's fine for users.

````smart header="Preventing copying"
If we want to disable selection to protect our page content from copy-pasting, then we can use another event: `oncopy`.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Копирование запрещено!');return false"*/!*>
  Уважаемый пользователь,
  Копирование информации запрещено для вас.
  Если вы знаете JS или HTML, вы можете найти всю нужную вам информацию в исходном коде страницы.
</div>
```
Если вы попытаетесь скопировать текст в `<div>`, у вас это не получится, потому что срабатывание события `oncopy` по умолчанию запрещено.

<<<<<<< HEAD
Конечно, пользователь имеет доступ к HTML-коду страницы и может взять текст оттуда, но не все знают, как это сделать.
=======
Surely the user has access to HTML-source of the page, and can take the content from there, but not everyone knows how to do it.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
````

## Итого

<<<<<<< HEAD
События мыши имеют следующие свойства:
=======
- Button: `which`.
- Modifier keys (`true` if pressed): `altKey`, `ctrlKey`, `shiftKey` and `metaKey` (Mac).
  - If you want to handle `key:Ctrl`, then don't forget Mac users, they usually use `key:Cmd`, so it's better to check `if (e.metaKey || e.ctrlKey)`.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

- Кнопка: `which`.
- Клавиши-модификаторы (`true` если нажаты): `altKey`, `ctrlKey`, `shiftKey` и `metaKey` (Mac).
  - Если вы планируете обработать `key:Ctrl`, то не забудьте, что пользователи Mac обычно используют `key:Cmd`, поэтому лучше проверить `if (e.metaKey || e.ctrlKey)`.

<<<<<<< HEAD
- Координаты относительно окна: `clientX/clientY`.
- Координаты относительно документа: `pageX/pageY`.

Действие по умолчанию события `mousedown` - начало выделения, если в интерфейсе оно скорее мешает, его можно отменить.

В следующей главе мы поговорим о событиях, которые возникают при передвижении мыши, и об отслеживании смены элементов под указателем.
=======
The default browser action of `mousedown` is text selection, if it's not good for the interface, then it should be prevented.

In the next chapter we'll see more details about events that follow pointer movement and how to track element changes under it.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
