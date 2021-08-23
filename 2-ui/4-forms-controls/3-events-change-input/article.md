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

Они относятся к классу [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) и обеспечивают доступ к копируемым/вставляемым данным.

Мы также можем использовать `event.preventDefault()` для предотвращения действия по умолчанию, и в итоге ничего не скопируется/не вставится.

Например, код, приведённый ниже, предотвращает все подобные события и показывает, что мы пытаемся вырезать/копировать/вставить:

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.oncut = input.oncopy = input.onpaste = function(event) {
    alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
    return false;
  };
</script>
```

Технически, мы можем скопировать/вставить всё. Например, мы можем скопировать файл из файловой системы и вставить его.

<<<<<<< HEAD
Существует список методов [в спецификации](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer) для работы с различными типами данных, чтения/записи в буфер обмена.

Но обратите внимание, что буфер обмена работает глобально, на уровне ОС. Большинство браузеров в целях безопасности разрешают доступ на чтение/запись в буфер обмена только в рамках определённых действий пользователя, к примеру, в обработчиках событий `onclick`.

Также запрещается генерировать "пользовательские" события буфера обмена при помощи `dispatchEvent` во всех браузерах, кроме Firefox.
=======
That's because `clipboardData` implements `DataTransfer` interface, commonly used for drag'n'drop and copy/pasting. It's bit beyond our scope now, but you can find its methods [in the specification](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

```warn header="ClipboardAPI: user safety restrictions"
The clipboard is a "global" OS-level thing. So most browsers allow read/write access to the clipboard only in the scope of certain user actions for the safety, e.g. in `onclick` event handlers.

Also it's forbidden to generate "custom" clipboard events with `dispatchEvent` in all browsers except Firefox.
```
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

## Итого

События изменения данных:

| Событие | Описание | Особенности |
|---------|----------|-------------|
| `change`| Значение было изменено. | Для текстовых полей срабатывает при потере фокуса. |
| `input` | Срабатывает при каждом изменении значения. | Запускается немедленно, в отличие от `change`. |
| `cut/copy/paste` | Действия по вырезанию/копированию/вставке. | Действие можно предотвратить. Свойство `event.clipboardData` предоставляет доступ на чтение/запись в буфер обмена.. |
