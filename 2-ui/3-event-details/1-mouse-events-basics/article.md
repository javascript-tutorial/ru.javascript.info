<<<<<<< HEAD
# Основы событий мыши
=======
# Mouse events
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

В этой главе мы более детально рассмотрим события мыши и их свойства.

Сразу заметим: эти события бывают не только из-за мыши, но и эмулируются на других устройствах, в частности, на мобильных, для совместимости.

## Типы событий мыши

<<<<<<< HEAD
Мы можем разделить события мыши на две категории: "простые" и "комплексные".

### Простые события

Самые часто используемые простые события:
=======
We've already seen some of these events:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`mousedown/mouseup`
: Кнопка мыши нажата/отпущена над элементом.

`mouseover/mouseout`
: Курсор мыши появляется над элементом и уходит с него.

`mousemove`
: Каждое движение мыши над элементом генерирует это событие.

<<<<<<< HEAD
`contextmenu`
: Вызывается при попытке открытия контекстного меню, как правило, нажатием правой кнопки мыши. Но, заметим, это не совсем событие мыши, оно может вызываться и специальной клавишей клавиатуры.

...Есть также несколько иных типов событий, которые мы рассмотрим позже.

### Комплексные события

`click`
: Вызывается при `mousedown` , а затем `mouseup`  над одним и тем же элементом, если использовалась левая кнопка мыши.

`dblclick`
: Вызывается двойным кликом на элементе.

Комплексные события состоят из простых, поэтому в теории мы могли бы без них обойтись. Но хорошо, что они существуют, потому что работать с ними очень удобно.

### Порядок событий

Одно действие может вызвать несколько событий.

Например, клик мышью вначале вызывает `mousedown`, когда кнопка нажата, затем `mouseup` и `click`, когда она отпущена.
=======
`click`
: Triggers after `mousedown` and then `mouseup` over the same element if the left mouse button was used.

`dblclick`
: Triggers after two clicks on the same element within a short timeframe. Rarely used nowadays.

`contextmenu`
: Triggers when the right mouse button is pressed. There are other ways to open a context menu, e.g. using a special keyboard key, it triggers in that case also, so it's not exactly the mouse event.

...There are several other events too, we'll cover them later.

## Events order

As you can see from the list above, a user action may trigger multiple events.

For instance, a left-button click first triggers `mousedown`, when the button is pressed, then `mouseup` and `click` when it's released.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

В случае, когда одно действие инициирует несколько событий, порядок их выполнения фиксирован. То есть обработчики событий вызываются в следующем порядке: `mousedown` -> `mouseup` -> `click`.

```online
Кликните на кнопку ниже, и вы увидите события. Также попробуйте двойной клик.

<<<<<<< HEAD
В окне теста ниже все события мыши записываются, и если задержка между ними более 1 секунды, то они разделяются горизонтальной чертой.

При этом мы также можем увидеть свойство `which`, которое позволяет определить, какая кнопка мыши была нажата.
=======
On the teststand below all mouse events are logged, and if there is more than a 1 second delay between them they are separated by a horizontal ruler.

Also we can see the `button` property that allows to detect the mouse button, it's explained below.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Кликни меня левой или правой кнопкой мыши" type="button"> <input onclick="logClear('test')" value="Очистить" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

<<<<<<< HEAD
## Получение информации о кнопке: which

События, связанные с кликом, всегда имеют свойство `which`, которое позволяет определить нажатую кнопку мыши.

Это свойство не используется для событий `click` и `contextmenu`, поскольку первое происходит только при нажатии левой кнопкой мыши, а второе -- правой.

Но если мы отслеживаем `mousedown` и `mouseup`, то оно нам нужно, потому что эти события срабатывают на любой кнопке, и `which` позволяет различать между собой "нажатие правой кнопки" и "нажатие левой кнопки".

Есть три возможных значения:

- `event.which == 1` -- левая кнопка
- `event.which == 2` -- средняя кнопка
- `event.which == 3` -- правая кнопка

Средняя кнопка сейчас -- скорее экзотика, и используется очень редко.
=======
## Mouse button

Click-related events always have the `button` property, which allows to get the exact mouse button.

We usually don't use it for `click` and `contextmenu` events, because the former happens only on left-click, and the latter -- only on right-click.

From the other hand, `mousedown` and `mouseup` handlers may need `event.button`, because these events trigger on any button, so `button` allows to distinguish between "right-mousedown" and "left-mousedown".

The possible values of `event.button` are:

| Button state | `event.button` |
|--------------|----------------|
| Left button (primary) | 0 |
| Middle button (auxiliary) | 1 |
| Right button (secondary) | 2 |
| X1 button (back) | 3 |
| X2 button (forward) | 4 |

Most mouse devices only have the left and right buttons, so possible values are `0` or `2`. Touch devices also generate similar events when one taps on them.

Also there's `event.buttons` property that has all currently pressed buttons as an integer, one bit per button. In practice this property is very rarely used, you can find details at [MDN](mdn:/api/MouseEvent/buttons) if you ever need it.

```warn header="The outdated `event.which`"
Old code may use `event.which` property that's an old non-standard way of getting a button, with possible values:

- `event.which == 1` – left button,
- `event.which == 2` – middle button,
- `event.which == 3` – right button.

As of now, `event.which` is deprecated, we shouldn't use it.
```
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Модификаторы: shift, alt, ctrl и meta

Все события мыши включают в себя информацию о нажатых клавишах-модификаторах.

Свойства объекта события:

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (или `key:Opt` для Mac)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: `key:Cmd` для Mac

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

```warn header="Внимание: обычно на Mac используется клавиша `Cmd` вместо `Ctrl`"
В Windows и Linux клавишами-модификаторами являются `key:Alt`, `key:Shift` и `key:Ctrl`. На Mac есть ещё одна: `key:Cmd`, которой соответствует свойство `metaKey`.

В большинстве приложений, когда в Windows/Linux используется `key:Ctrl`, на Mac используется `key:Cmd`.

То есть, когда пользователь Windows нажимает `key:Ctrl+Enter` и `key:Ctrl+A`, пользователь Mac нажимает `key:Cmd+Enter` или `key:Cmd+A`, и так далее.

Поэтому, если мы хотим поддерживать такие комбинации, как `key:Ctrl`+клик, то для Mac имеет смысл использовать `key:Cmd`+клик. Это удобней для пользователей Mac.

Даже если мы и хотели бы заставить людей на Mac использовать именно `key:Ctrl`+клик, это довольно сложно. Проблема в том, что левый клик в сочетании с `key:Ctrl` интерпретируется как *правый клик* на MacOS и генерирует событие `contextmenu`, а не `click` как на Windows/Linux.

<<<<<<< HEAD
Поэтому, если мы хотим, чтобы пользователям всех операционных систем было удобно, то вместе с `ctrlKey` нам нужно проверять `metaKey`.
=======
So if we want users of all operating systems to feel comfortable, then together with `ctrlKey` we should check `metaKey`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Для JS-кода это означает, что мы должны проверить `if (event.ctrlKey || event.metaKey)`.
```

<<<<<<< HEAD
```warn header="Не забывайте про мобильные устройства"
Комбинации клавиш на клавиатуре -- это хорошее дополнение к рабочему процессу. Если у пользователя есть клавиатура -- они работают. Ну а если на его устройстве её нет -- должен быть другой способ сделать то же самое.
=======
```warn header="There are also mobile devices"
Keyboard combinations are good as an addition to the workflow. So that if the visitor uses a keyboard -- they work. 

But if their device doesn't have it -- then there should be a way to live without modifier keys.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

## Координаты: clientX/Y, pageX/Y

<<<<<<< HEAD
Все события мыши имеют координаты двух видов:
=======
All mouse events provide coordinates in two flavours:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

1. Относительно окна: `clientX` и `clientY`.
2. Относительно документа: `pageX` и `pageY`.

<<<<<<< HEAD
Например, если у нас есть окно размером 500x500, и курсор мыши находится в левом верхнем углу, то значения `clientX` и `clientY` равны `0`. А если мышь находится в центре окна, то значения `clientX` и `clientY` равны `250` независимо от того, в каком месте документа она находится и до какого места документ прокручен. В этом они похожи на `position:fixed`.
=======
We already covered the difference between them in the chapter <info:coordinates>.

In short, document-relative coordinates `pageX/Y` are counted from the left-upper corner of the document, and do not change when the page is scrolled, while `clientX/Y` are counted from the current window left-upper corner. When the page is scrolled, they change.

For instance, if we have a window of the size 500x500, and the mouse is in the left-upper corner, then `clientX` and `clientY` are `0`, no matter how the page is scrolled. 

And if the mouse is in the center, then `clientX` and `clientY` are `250`, no matter what place in the document it is. They are similar to `position:fixed` in that aspect.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

````online
Наведите курсор мыши на поле ввода, чтобы увидеть `clientX/clientY` (пример находится в `iframe`, поэтому координаты определяются относительно этого `iframe`):

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Наведи на меня мышь">
```
````

<<<<<<< HEAD
Координаты относительно документа `pageX`, `pageY` отсчитываются не от окна, а от левого верхнего угла документа. Подробнее о координатах вы можете узнать в главе <info:coordinates>.

## Отключаем выделение

Двойной клик мыши имеют побочный эффект, который может быть неудобен в некоторых интерфейсах: он выделяет текст.

Например, двойной клик на текст ниже выделяет его в дополнение к нашему обработчику:
=======
## Preventing selection on mousedown

Double mouse click has a side-effect that may be disturbing in some interfaces: it selects text.

For instance, double-clicking on the text below selects it in addition to our handler:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```html autorun height=50
<span ondblclick="alert('dblclick')">Сделайте двойной клик на мне</span>
```

Если зажать левую кнопку мыши и, не отпуская кнопку, провести мышью, то также будет выделение, которое в интерфейсах может быть "не кстати".

Есть несколько способов запретить выделение, о которых вы можете прочитать в главе <info:selection-range>.

В данном случае самым разумным будет отменить действие браузера по умолчанию при событии `mousedown`, это отменит оба этих выделения:

```html autorun height=50
До...
<b ondblclick="alert('Клик!')" *!*onmousedown="return false"*/!*>
  Сделайте двойной клик на мне
</b>
...После
```

Теперь выделенный жирным элемент не выделяется при двойном клике, а также на нём нельзя начать выделение, зажав кнопку мыши.

Заметим, что текст внутри него по-прежнему можно выделить, если начать выделение не на самом тексте, а до него или после. Обычно это нормально воспринимается пользователями.

````smart header="Предотвращение копирования"
Если мы хотим отключить выделение для защиты содержимого страницы от копирования, то мы можем использовать другое событие: `oncopy`.

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Копирование запрещено!');return false"*/!*>
  Уважаемый пользователь,
  Копирование информации запрещено для вас.
  Если вы знаете JS или HTML, вы можете найти всю нужную вам информацию в исходном коде страницы.
</div>
```
Если вы попытаетесь скопировать текст в `<div>`, у вас это не получится, потому что срабатывание события `oncopy` по умолчанию запрещено.

Конечно, пользователь имеет доступ к HTML-коду страницы и может взять текст оттуда, но не все знают, как это сделать.
````

## Итого

События мыши имеют следующие свойства:

<<<<<<< HEAD
- Кнопка: `which`.
- Клавиши-модификаторы (`true` если нажаты): `altKey`, `ctrlKey`, `shiftKey` и `metaKey` (Mac).
  - Если вы планируете обработать `key:Ctrl`, то не забудьте, что пользователи Mac обычно используют `key:Cmd`, поэтому лучше проверить `if (e.metaKey || e.ctrlKey)`.
=======
- Button: `button`.
- Modifier keys (`true` if pressed): `altKey`, `ctrlKey`, `shiftKey` and `metaKey` (Mac).
  - If you want to handle `key:Ctrl`, then don't forget Mac users, they usually use `key:Cmd`, so it's better to check `if (e.metaKey || e.ctrlKey)`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- Координаты относительно окна: `clientX/clientY`.
- Координаты относительно документа: `pageX/pageY`.

Действие по умолчанию события `mousedown` - начало выделения, если в интерфейсе оно скорее мешает, его можно отменить.

В следующей главе мы поговорим о событиях, которые возникают при передвижении мыши, и об отслеживании смены элементов под указателем.
