# События: change, input, cut, copy, paste

Давайте рассмотрим различные события, сопутствующие обновлению данных.

## Событие: change

Событие `change` срабатывает по окончании изменения элемента.

Для текстовых `<input>` это означает, что событие происходит при потере фокуса.

Пока мы печатаем в текстовом поле в примере ниже, событие не происходит. Но когда мы перемещаем фокус в другое место, например, нажимая на кнопку, то произойдёт событие `change`:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

Для других элементов: `select`, `input type=checkbox/radio` событие запускается сразу после изменения значения:

```html autorun height=40 run
<select onchange="alert(this.value)">
  <option value="">Выберите что-нибудь</option>
  <option value="1">Вариант 1</option>
  <option value="2">Вариант 2</option>
  <option value="3">Вариант 3</option>
</select>
```

## Событие: input

Событие `input` срабатывает каждый раз при изменении значения.

В отличие от событий клавиатуры, оно работает при любых изменениях значений, даже если они не связаны с клавиатурными действиями: вставка с помощью мыши или распознавание речи при диктовке текста.

Например:

```html autorun height=40 run
<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>
```

Если мы хотим обрабатывать каждое изменение в `<input>`, то это событие является лучшим выбором.

С другой стороны, событие `input` не происходит при вводе с клавиатуры или иных действиях, если при этом не меняется значение в текстовом поле, т.е. нажатия клавиш `key:⇦`, `key:⇨` и подобных при фокусе на текстовом поле не вызовут это событие.

```smart header="Нельзя ничего предотвратить в `oninput`"
Событие `input` происходит после изменения значения.

Поэтому мы не можем использовать `event.preventDefault()` там - будет уже слишком поздно, никакого эффекта не будет.
```

## События: cut, copy, paste

Эти события происходят при вырезании/копировании/вставке данных.

<<<<<<< HEAD
Они относятся к классу [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) и обеспечивают доступ к копируемым/вставляемым данным.
=======
They belong to [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) class and provide access to the data that is cut/copied/pasted.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

Мы также можем использовать `event.preventDefault()` для предотвращения действия по умолчанию, и в итоге ничего не скопируется/не вставится.

<<<<<<< HEAD
Например, код, приведённый ниже, предотвращает все подобные события и показывает, что мы пытаемся вырезать/копировать/вставить:
=======
For instance, the code below prevents all `cut/copy/paste` events and shows the text we're trying to cut/copy/paste:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.onpaste = function(event) {
    alert("paste: " + event.clipboardData.getData('text/plain'));
    event.preventDefault();
  };

  input.oncut = input.oncopy = function(event) {
    alert(event.type + '-' + document.getSelection());
    event.preventDefault();
  };
</script>
```

<<<<<<< HEAD
Технически, мы можем скопировать/вставить всё. Например, мы можем скопировать файл из файловой системы и вставить его.

Существует список методов [в спецификации](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer) для работы с различными типами данных, чтения/записи в буфер обмена.

Но обратите внимание, что буфер обмена работает глобально, на уровне ОС. Большинство браузеров в целях безопасности разрешают доступ на чтение/запись в буфер обмена только в рамках определённых действий пользователя, к примеру, в обработчиках событий `onclick`.

Также запрещается генерировать "пользовательские" события буфера обмена при помощи `dispatchEvent` во всех браузерах, кроме Firefox.
=======
Please note: inside `cut` and `copy` event handlers a call to  `event.clipboardData.getData(...)` returns an empty string. That's because technically the data isn't in the clipboard yet. If we use `event.preventDefault()` it won't be copied at all.

So the example above uses `document.getSelection()` to get the selected text. You can find more details about document selection in the article <info:selection-range>.

It's possible to copy/paste not just text, but everything. For instance, we can copy a file in the OS file manager, and paste it.

That's because `clipboardData` implements `DataTransfer` interface, commonly used for drag'n'drop and copy/pasting. It's a bit beyond our scope now, but you can find its methods in the [DataTransfer specification](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

Also, there's an additional asynchronous API of accessing the clipboard: `navigator.clipboard`. More about it in the specification [Clipboard API and events](https://www.w3.org/TR/clipboard-apis/), [not supported by Firefox](https://caniuse.com/async-clipboard).

### Safety restrictions

The clipboard is a "global" OS-level thing. A user may switch between various applications, copy/paste different things, and a browser page shouldn't see all that.

So most browsers allow seamless read/write access to the clipboard only in the scope of certain user actions, such as copying/pasting etc.

It's forbidden to generate "custom" clipboard events with `dispatchEvent` in all browsers except Firefox. And even if we manage to dispatch such event, the specification clearly states that such "synthetic" events must not provide access to the clipboard.

Even if someone decides to save `event.clipboardData` in an event handler, and then access it later -- it won't work.

To reiterate, [event.clipboardData](https://www.w3.org/TR/clipboard-apis/#clipboardevent-clipboarddata) works solely in the context of user-initiated event handlers.

On the other hand, [navigator.clipboard](https://www.w3.org/TR/clipboard-apis/#h-navigator-clipboard) is the more recent API, meant for use in any context. It asks for user permission, if needed.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## Итого

События изменения данных:

| Событие | Описание | Особенности |
|---------|----------|-------------|
<<<<<<< HEAD
| `change`| Значение было изменено. | Для текстовых полей срабатывает при потере фокуса. |
| `input` | Срабатывает при каждом изменении значения. | Запускается немедленно, в отличие от `change`. |
| `cut/copy/paste` | Действия по вырезанию/копированию/вставке. | Действие можно предотвратить. Свойство `event.clipboardData` предоставляет доступ на чтение/запись в буфер обмена.. |
=======
| `change`| A value was changed. | For text inputs triggers on focus loss. |
| `input` | For text inputs on every change. | Triggers immediately unlike `change`. |
| `cut/copy/paste` | Cut/copy/paste actions. | The action can be prevented. The `event.clipboardData` property gives access to the clipboard. All browsers except Firefox also support `navigator.clipboard`. |
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
