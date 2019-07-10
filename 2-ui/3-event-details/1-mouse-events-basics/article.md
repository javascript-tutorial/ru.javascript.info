# Основые события мыши

События мыши исходят не только от "манипуляторов мыши", но и эмулируются на сенсорных устройствах, чтобы сделать их совместимыми.

В этой главе мы глубже разберем события мыши и рассмотрим их свойства.

## Типы событий мыши

События мыши можно разделить на две категории: "простые" и "комплексные"

### Простые события

Наиболее часто используемые простые события:

`mousedown/mouseup`
: Кнопка мыши нажата/отпущена над элементом.

`mouseover/mouseout`
: Указатель мыши появился/ушел с элемента.

`mousemove`
: Каждое движение мыши над элементом вызывает это событие.

...Есть еще несколько типов событий, мы рассмотрим их позже.

### Комплексные события

`click`
: Вызывается при клике мышью, то есть при `mousedown`, а затем `mouseup` на одном элементе, если была использована левая кнопка мыши.

`contextmenu`
: Вызывается при `mousedown` правой кнопкой мыши по элементу.

`dblclick`
: Вызывается при двойном клике по элементу.

Комплексные события состоят из простых, так что в теории, мы могли бы обходится и без них. Но они значительно облегчают нашу жизнь.

### Порядок срабатывания событий

Одно действие может вызывать несолько событий.

Например, клик мыши сперва вызывает событие `mousedown`, когда кнопка мыши была нажата, потом `mouseup` и `click`, когда кнопка была отпущена.

В случаях, когда одно действие инициирует несколько событий, их порядок фиксируется. То есть обработчики вызываются в порядке `mousedown` -> `mouseup` -> `click`. События обрабтаываются в той же послежовательности: `onmouseup` завершается до запуска `onclick`.

```online
Кликните по кнопке ниже, чтобы увидеть в каком порядке срабатывают события. Попробуйте также двойной клик.

На тест-стенде ниже все события мыши записываются, а если между событиями проходит больше 1 секунды, они разделяются горизонтальной линией.

Так же мы можем видеть свойство `which`, которое показывает какая именно кнопка мыши была использована.

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click me with the right or the left mouse button" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## Получене информации о кнопке: which

События, связанные с кликом, всегда имеют свойство `which`, которое позволяет получить точную кнопку мыши.

Это совйство не использутеся для событий `click` и `contextmenu`, потому что первое событие происходит только при нажатии левой кнопки, а второе только при нажатии правой кнопки соответственно.

Но если мы отслеживаем `mousedown` и `mouseup`, тогда нам нужно это знать, потому что эти события срабатывают на нажатие любой кнопки мыши. В таком случае `which` позволяет нам различать, например, нажатие левой кнопки от правой.

Возможны следующие значения:

- `event.which == 1` -- левая кнопка
- `event.which == 2` - средняя кнопка
- `event.which == 3` - правая кнопка

Средняя кнопка мыши используется гораздо реже остальных.

## Модификаторы: shift, alt, ctrl и meta

 Во всех событиях мыши присутствует информация о нажатых клавишах-модификаторах.
 
 Соответствующие свойства:

- `shiftKey`
- `altKey`
- `ctrlKey`
- `metaKey` (`key:Cmd` для Mac)

Например, кнопка ниже сработает только на `key:Alt+Shift`+клик:

```html autorun height=60
<button id="button">Alt+Shift+Кликни меня!</button>

<script>
  button.onclick = function(event) {
*!*
    if (event.altKey && event.shiftKey) {
*/!*
      alert('Урааа!');
    }
  };
</script>
```

```warn header="Внимание: на Mac используется `Cmd` вместо `Ctrl`"

На компьютерах под управлением Windows и Linux есть клавиши `key:Alt`, `key:Shift` и `key:Ctrl`. На Mac есть еще одна клавиша `key:Cmd`, которой соответствует свойство `metaKey`.

В большинстве случаев там, где под Windows/Linux используется `key:Ctrl`, на Mac используется `key:Cmd`. Там, где пользователь Windows нажимает `key:Ctrl+Enter` или `key:Ctrl+A`, пользователь Mac нажмёт `key:Cmd+Enter` или `key:Cmd+A`, и так далее, почти всегда `key:Cmd` вместо `key:Ctrl`.

Поэтому, если мы хотим поддерживать сочетание `key:Ctrl`+click или другие подобные, то под Mac имеет смысл использовать `key:Cmd`+click. Пользователям Mac это будет гораздо комфортнее.

Более того, даже если бы мы хотели бы заставить пользователей Mac использовать именно `key:Ctrl`+click – это было бы затруднительно. Дело в том, что обычный клик с зажатым `key:Ctrl` под Mac работает как *правый клик* и генерирует событие `contextmenu`, а не `click`, как под Windows/Linux.

Поэтому, если мы хотим, чтобы пользователи всех операционных систем чувствовали себя комфортно, то вместе с `ctrl` мы должны использовать `metaKey`.

В JS-коде это означает, что для удобства пользователей Mac нужно проверять if (event.ctrlKey || event.metaKey).

```

```warn header="Не забывайте про мобильные устройства"

Комбинации клавиш хороши как дополнение к рабочему процессу. Так что если у пользователя есть
  клавиатура -- это сработает. Но если у вашего устройства нет клавиатуры -- то есть другой способ сделать то же самое.
```

## Coordinates: clientX/Y, pageX/Y

All mouse events have coordinates in two flavours:

1. Window-relative: `clientX` and `clientY`.
2. Document-relative: `pageX` and `pageY`.

For instance, if we have a window of the size 500x500, and the mouse is in the left-upper corner, then `clientX` and `clientY` are `0`. And if the mouse is in the center, then `clientX` and `clientY` are `250`, no matter what place in the document it is. They are similar to `position:fixed`.

````online
Move the mouse over the input field to see `clientX/clientY` (it's in the `iframe`, so coordinates are relative to that `iframe`):

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
```
````

Document-relative coordinates are counted from the left-upper corner of the document, not the window.
Coordinates `pageX`, `pageY` are similar to `position:absolute` on the document level.

You can read more about coordinates in the chapter <info:coordinates>.

## No selection on mousedown

Mouse clicks have a side-effect that may be disturbing. A double click selects the text.

If we want to handle click events ourselves, then the "extra" selection doesn't look good.

For instance, a double-click on the text below selects it in addition to our handler:

```html autorun height=50
<b ondblclick="alert('dblclick')">Double-click me</b>
```

There's a CSS way to stop the selection: the `user-select` property from [CSS UI Draft](https://www.w3.org/TR/css-ui-4/).

Most browsers support it with prefixes:

```html autorun height=50
<style>
  b {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>

Before...
<b ondblclick="alert('Test')">
  Unselectable
</b>
...After
```

Now if you double-click on "Unselectable", it doesn't get selected. Seems to work.

...But there is a potential problem! The text became truly unselectable. Even if a user starts the selection from "Before" and ends with "After", the selection skips "Unselectable" part. Do we really want to make our text unselectable?

Most of time, we don't. A user may have valid reasons to select the text, for copying or other needs. That may be inconvenient if we don't allow them to do it. So this solution is not that good.

What we want is to prevent the selection on double-click, that's it.

A text selection is the default browser action on `mousedown` event. So the alternative solution would be to handle `mousedown` and prevent it, like this:

```html autorun height=50
Before...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  Double-click me
</b>
...After
```

Now the bold element is not selected on double clicks.

The text inside it is still selectable. However, the selection should start not on the text itself, but before or after it. Usually that's fine though.

````smart header="Canceling the selection"
Instead of *preventing* the selection, we can cancel it "post-factum" in the event handler.

Here's how:

```html autorun height=50
Before...
<b ondblclick="*!*getSelection().removeAllRanges()*/!*">
  Double-click me
</b>
...After
```

If you double-click on the bold element, then the selection appears and then is immediately removed. That doesn't look nice though.
````

````smart header="Preventing copying"
If we want to disable selection to protect our content from copy-pasting, then we can use another event: `oncopy`.

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>
  Dear user,
  The copying is forbidden for you.
  If you know JS or HTML, then you can get everything from the page source though.
</div>
```
If you try to copy a piece of text in the `<div>`, that won't work, because the default action `oncopy` is prevented.

Surely that can't stop the user from opening HTML-source, but not everyone knows how to do it.
````

## Summary

Mouse events have the following properties:

- Button: `which`.
- Modifier keys (`true` if pressed): `altKey`, `ctrlKey`, `shiftKey` and `metaKey` (Mac).
  - If you want to handle `key:Ctrl`, then don't forget Mac users, they use `key:Cmd`, so it's better to check `if (e.metaKey || e.ctrlKey)`.

- Window-relative coordinates: `clientX/clientY`.
- Document-relative coordinates: `pageX/pageY`.

It's also important to deal with text selection as an unwanted side-effect of clicks.

There are several ways to do this, for instance:
1. The CSS-property `user-select:none` (with browser prefixes) completely disables text-selection.
2. Cancel the selection post-factum using `getSelection().removeAllRanges()`.
3. Handle `mousedown` and prevent the default action (usually the best).
