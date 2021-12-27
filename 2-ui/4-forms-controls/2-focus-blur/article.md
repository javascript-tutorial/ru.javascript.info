# Фокусировка: focus/blur

<<<<<<< HEAD
Элемент получает фокус, когда пользователь кликает по нему или использует клавишу `key:Tab`. Также существует HTML-атрибут `autofocus`, который устанавливает фокус на элемент, когда страница загружается. Есть и другие способы получения фокуса, о них - далее.
=======
An element receives the focus when the user either clicks on it or uses the `key:Tab` key on the keyboard. There's also an `autofocus` HTML attribute that puts the focus onto an element by default when a page loads and other means of getting the focus.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Фокусировка обычно означает: "приготовься к вводу данных на этом элементе", это хороший момент, чтобы инициализовать или загрузить что-нибудь.

Момент потери фокуса ("blur") может быть важнее. Это момент, когда пользователь кликает куда-то ещё или нажимает `key:Tab`, чтобы переключиться на следующее поле формы. Есть другие причины потери фокуса, о них - далее.

Потеря фокуса обычно означает "данные введены", и мы можем выполнить проверку введённых данных или даже отправить эти данные на сервер и так далее.

В работе с событиями фокусировки есть важные особенности. Мы постараемся разобрать их далее.

## События focus/blur

Событие `focus` вызывается в момент фокусировки, а `blur` -- когда элемент теряет фокус.

Используем их для валидации(проверки) введённых данных.

В примере ниже:

<<<<<<< HEAD
- Обработчик `blur` проверяет, введён ли email, и если нет -- показывает ошибку.
- Обработчик `focus` скрывает это сообщение об ошибке (в момент потери фокуса проверка повторится):
=======
- The `blur` handler checks if the field has an email entered, and if not -- shows an error.
- The `focus` handler hides the error message (on `blur` it will be checked again):
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```html run autorun height=60
<style>
  .invalid { border-color: red; }
  #error { color: red }
</style>

Ваш email: <input type="email" id="input">

<div id="error"></div>

<script>
*!*input.onblur*/!* = function() {
  if (!input.value.includes('@')) { // не email
    input.classList.add('invalid');
    error.innerHTML = 'Пожалуйста, введите правильный email.'
  }
};

*!*input.onfocus*/!* = function() {
  if (this.classList.contains('invalid')) {
    // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
```

<<<<<<< HEAD
Современный HTML позволяет делать валидацию с помощью атрибутов `required`, `pattern` и т.д. Иногда - это всё, что нам нужно. JavaScript можно использовать, когда мы хотим больше гибкости. А ещё мы могли бы отправлять изменённое значение на сервер, если оно правильное.
=======
Modern HTML allows us to do many validations using input attributes: `required`, `pattern` and so on. And sometimes they are just what we need. JavaScript can be used when we want more flexibility. Also we could automatically send the changed value to the server if it's correct.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c


## Методы focus/blur

Методы `elem.focus()` и `elem.blur()` устанавливают/снимают фокус.

Например, запретим посетителю переключаться с поля ввода, если введённое значение не прошло валидацию:

```html run autorun height=80
<style>
  .error {
    background: red;
  }
</style>

Ваш email: <input type="email" id="input">
<input type="text" style="width:280px" placeholder="введите неверный email и кликните сюда">

<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // не email
      // показать ошибку
      this.classList.add("error");
*!*
      // ...и вернуть фокус обратно
      input.focus();
*/!*
    } else {
      this.classList.remove("error");
    }
  };
</script>
```

Это сработает во всех браузерах, кроме Firefox ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=53579)).

Если мы что-нибудь введём и нажмём `key:Tab` или кликнем в другое место, тогда `onblur` вернёт фокус обратно.

Отметим, что мы не можем "отменить потерю фокуса", вызвав `event.preventDefault()` в обработчике `onblur` потому, что `onblur` срабатывает *после* потери фокуса элементом.

```warn header="Потеря фокуса, вызванная JavaScript"
Потеря фокуса может произойти по множеству причин.

Одна из них - когда посетитель кликает куда-то ещё. Но и JavaScript может быть причиной, например:

- `alert` переводит фокус на себя - элемент теряет фокус (событие `blur`), а когда `alert` закрывается - элемент получает фокус обратно (событие `focus`).
- Если элемент удалить из DOM, фокус также будет потерян. Если элемент добавить обратно, то фокус не вернётся.

Из-за этих особенностей обработчики `focus/blur` могут сработать тогда, когда это не требуется.  

Используя эти события, нужно быть осторожным. Если мы хотим отследить потерю фокуса, которую инициировал пользователь, тогда нам следует избегать её самим.
```
## Включаем фокусировку на любом элементе: tabindex

<<<<<<< HEAD
Многие элементы по умолчанию не поддерживают фокусировку.
=======
By default, many elements do not support focusing.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Какие именно - зависит от браузера, но одно всегда верно: поддержка `focus/blur` гарантирована для элементов, с которыми посетитель может взаимодействовать: `<button>`, `<input>`, `<select>`, `<a>` и т.д.

<<<<<<< HEAD
С другой стороны, элементы форматирования `<div>`, `<span>`, `<table>` -- по умолчанию не могут получить фокус. Метод `elem.focus()` не работает для них, и события `focus/blur` никогда не срабатывают.
=======
On the other hand, elements that exist to format something, such as `<div>`, `<span>`, `<table>` -- are unfocusable by default. The method `elem.focus()` doesn't work on them, and `focus/blur` events are never triggered.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Это можно изменить HTML-атрибутом `tabindex`.

Любой элемент поддерживает фокусировку, если имеет `tabindex`. Значение этого атрибута - порядковый номер элемента, когда клавиша `key:Tab` (или что-то аналогичное) используется для переключения между элементами.

То есть: если у нас два элемента, первый имеет `tabindex="1"`, а второй `tabindex="2"`, то находясь в первом элементе и нажав `key:Tab` -- мы переместимся во второй.

Порядок перебора таков: сначала идут элементы со значениями `tabindex` от `1` и выше, в порядке `tabindex`, а затем элементы без `tabindex` (например, обычный `<input>`).

<<<<<<< HEAD
При совпадающих `tabindex` элементы перебираются в том порядке, в котором идут в документе.
=======
Elements without matching `tabindex` are switched in the document source order (the default order).
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Есть два специальных значения:

- `tabindex="0"` ставит элемент в один ряд с элементами без `tabindex`. То есть, при переключении такие элементы будут после элементов с `tabindex ≥ 1`.

    Обычно используется, чтобы включить фокусировку на элементе, но не менять порядок переключения. Чтобы элемент мог участвовать в форме наравне с обычными `<input>`.
- `tabindex="-1"` позволяет фокусироваться на элементе только программно. Клавиша `key:Tab` проигнорирует такой элемент, но метод `elem.focus()` будет действовать.

Например, список ниже. Кликните первый пункт в списке и нажмите `key:Tab`:

```html autorun no-beautify
<<<<<<< HEAD
Кликните первый пункт в списке и нажмите Tab. Продолжайте следить за порядком. Обратите внимание, что много последовательных нажатий Tab могут вывести фокус из iframe с примером.
=======
Click the first item and press Tab. Keep track of the order. Please note that many subsequent Tabs can move the focus out of the iframe in the example.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
<ul>
  <li tabindex="1">Один</li>
  <li tabindex="0">Ноль</li>
  <li tabindex="2">Два</li>
  <li tabindex="-1">Минус один</li>
</ul>

<style>
  li { cursor: pointer; }
  :focus { outline: 1px dashed green; }
</style>
```

Порядок такой: `1 - 2 - 0`. Обычно `<li>` не поддерживает фокусировку, но `tabindex` включает её, а также события и стилизацию псевдоклассом `:focus`.

```smart header="Свойство `elem.tabIndex` тоже работает"
Мы можем добавить `tabindex` из JavaScript, используя свойство `elem.tabIndex`. Это даст тот же эффект.
```

## События focusin/focusout

События `focus` и `blur` не всплывают.

Например, мы не можем использовать `onfocus` на `<form>`, чтобы подсветить её:

```html autorun height=80
<!-- добавить класс при фокусировке на форме -->
<form *!*onfocus="this.className='focused'"*/!*>
  <input type="text" name="name" value="Имя">
  <input type="text" name="surname" value="Фамилия">
</form>

<style> .focused { outline: 1px solid red; } </style>
```

Пример выше не работает, потому что когда пользователь перемещает фокус на `<input>`, событие `focus` срабатывает только на этом элементе. Это событие не всплывает. Следовательно, `form.onfocus` никогда не срабатывает.

У этой проблемы два решения.

Первое: забавная особенность --  `focus/blur` не всплывают, но передаются вниз на фазе перехвата.

Это сработает:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Имя">
  <input type="text" name="surname" value="Фамилия">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  // установить обработчик на фазе перехвата (последний аргумент true)
  form.addEventListener("focus", () => form.classList.add('focused'), true);
  form.addEventListener("blur", () => form.classList.remove('focused'), true);
*/!*
</script>
```

Второе решение: события `focusin` и `focusout` -- такие же, как и `focus/blur`, но они всплывают.

Заметьте, что эти события должны использоваться с `elem.addEventListener`, но не с `on<event>`.

Второй рабочий вариант:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Имя">
  <input type="text" name="surname" value="Фамилия">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  form.addEventListener("focusin", () => form.classList.add('focused'));
  form.addEventListener("focusout", () => form.classList.remove('focused'));
*/!*
</script>
```

## Итого

<<<<<<< HEAD
События `focus` и `blur` срабатывают на фокусировке/потере фокуса элемента.
=======
Events `focus` and `blur` trigger on an element focusing/losing focus.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Их особенности:
- Они не всплывают. Но можно использовать фазу перехвата или `focusin/focusout`.
- Большинство элементов не поддерживают фокусировку по умолчанию. Используйте `tabindex`, чтобы сделать фокусируемым любой элемент.

Текущий элемент с фокусом можно получить из `document.activeElement`.
