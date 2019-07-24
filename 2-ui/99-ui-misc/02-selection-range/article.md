libs:
  - d3
  - domtree

---

# Selection и Range

В этой главе мы рассмотрим выделение текста.

JavaScript может делать с текстом всё, что угодно: получать существующее выделение, выделять и снимать выделение одной или нескольких частей текста, убирать выделенную часть из документа, оборачивать в тег и так далее.

Вы можете использовать готовые решения в секции "Итого" в конце статьи, но вы узнаете гораздо больше, если продолжите читать. Используемые встроенные объекты `Range` и `Selection` просты для понимания, и после изучения вы сможете гибко использовать эти объекты для решения ваших задач, не прибегая к использованию готовых решений.

## Range

В основе выделения текста лежит [Range](https://dom.spec.whatwg.org/#ranges) -- диапазон. Он представляет собой пару "граничных точек": начало и конец диапазона.

Каждая точка представлена как родительский DOM-узел с относительным смещением от начала. Для DOM-элемента смещение - это номер дочернего элемента, для текстового узла - это позиция в тексте.

Для начала мы создадим диапазон (конструктор не имеет параметров):

```js
let range = new Range();
```

Затем мы установим границы, используя `range.setStart(node, offset)` и `range.setEnd(node, offset)`.

Например, рассмотрим этот фрагмент HTML-кода:

```html
<p id="p">Example: <i>italic</i> and <b>bold</b></p>
```

Взглянем на его DOM-структуру, обратите внимание на текстовые узлы, они важны для нас:

<div class="select-p-domtree"></div>

<script>
let selectPDomtree = {
  "name": "P",
  "nodeType": 1,
  "children": [{
    "name": "#text",
    "nodeType": 3,
    "content": "Example: "
  }, {
    "name": "I",
    "nodeType": 1,
    "children": [{
      "name": "#text",
      "nodeType": 3,
      "content": "italic"
    }]
  }, {
    "name": "#text",
    "nodeType": 3,
    "content": " and "
  }, {
    "name": "B",
    "nodeType": 1,
    "children": [{
      "name": "#text",
      "nodeType": 3,
      "content": "bold"
    }]
  }]
}

drawHtmlTree(selectPDomtree, 'div.select-p-domtree', 690, 320);
</script>

Выделим `"Example: <i>italic</i>"`. Это первые два дочерних элемента тега `<p>` (учитывая текстовые узлы):

![](range-example-p-0-1.png)

```html run
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
*!*
  let range = new Range();

  range.setStart(p, 0);
  range.setEnd(p, 2);
*/!*

  // toString, вызванный у экземпляра Range, возвращает его содержимое в виде текста (без тегов)
  alert(range); // Example: italic

  // применим этот диапазон к выделению документа (объясняется далее)
  document.getSelection().addRange(range);
</script>
```

- `range.setStart(p, 0)` -- устанавливает начало диапазона на нулевом дочернем элементе тега `<p>` (Это текстовый узел `"Example: "`).
- `range.setEnd(p, 2)` -- расширяет диапазон до 2го (но не включая его) дочернего элемента тега `<p>` (это текстовый узел `" and "`, но так как конец не включён, последний включённый узел - это тег `<i>`).

Ниже представлен расширенный пример, в котором вы можете попробовать другие варианты:

```html run autorun
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

From <input id="start" type="number" value=1> – To <input id="end" type="number" value=4>
<button id="button">Click to select</button>
<script>
  button.onclick = () => {
  *!*
    let range = new Range();

    range.setStart(p, start.value);
    range.setEnd(p, end.value);
  */!*

    // применим выделение, объясняется далее
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
  };
</script>
```

К примеру, выделение с `1` до `4` возвращает следующий диапазон `<i>italic</i> and <b>bold</b>`.

![](range-example-p-1-3.png)

Не обязательно использовать один и тот же элемент в `setStart` и `setEnd`. Диапазон может охватывать множество не связанных между собой элементов.

### Выделение частей текстовых узлов

Давайте выделим текст частично, как показано ниже:

![](range-example-p-2-b-3.png)

Это также возможно, нужно просто установить начало и конец как относительное смещение в текстовых узлах.

Нам нужно создать диапазон, который:
- начинается со второй позиции первого дочернего элемента тега `<p>` (захватывающий всё, кроме первых двух букв "Ex<b>ample:</b> ")
- заканчивается на 3 позиции первого дочернего элемента тега `<b>` (захватывающий первые три буквы "<b>bol</b>d"):

```html run
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();

  range.setStart(p.firstChild, 2);
  range.setEnd(p.querySelector('b').firstChild, 3);

  alert(range); // ample: italic and bol

  // используем этот диапазон для выделения (объясняется далее)
  window.getSelection().addRange(range);
</script>
```

Объект диапазона Range имеет следующие свойства:

![](range-example-p-2-b-3-range.png)

- `startContainer`, `startOffset` -- узел и начальное смещение,
  - в примере выше: первый текстовый узел внутри тега `<p>` и `2`.
- `endContainer`, `endOffset` -- узел и конечное смещение,
  - в примере выше: первый текстовый узел внутри тега `<b>` и `3`.
- `collapsed` -- boolean, `true`, если диапазон начинается и заканчивается на одном и том же месте (следовательно, в диапазон ничего не входит),
  - в примере выше: `false`
- `commonAncestorContainer` -- ближайший общий предок всех узлов в пределах диапазона,
  - в примере выше: `<p>`

## Методы Range

Существует множество удобных методов для манипулирования диапазонами.

Установить начало диапазона:

- `setStart(node, offset)` установить начальную границу в позицию `offset` в `node`
- `setStartBefore(node)` установить начальную границу прямо перед `node`
- `setStartAfter(node)` установить начальную границу прямо после `node`

Установить конец диапазона (похожи на предыдущие методы):

- `setEnd(node, offset)` установить конечную границу в позицию `offset` в `node`
- `setEndBefore(node)` установить конечную границу прямо перед `node`
- `setEndAfter(node)` установить конечную границу прямо после `node`

**Как было показано, `node` может быть как текстовым узлом, так и элементом: для текстовых узлов `offset` пропускает указанное количество символов, в то время как для элементов - указанное количество дочерних узлов.**

Другие:
- `selectNode(node)` выделить `node` целиком
- `selectNodeContents(node)` выделить всё содержимое `node`
- `collapse(toStart)` если указано `toStart=true`, установить конечную границу в начало, иначе установить начальную границу в конец, схлопывая таким образом диапазон
- `cloneRange()` создать новый диапазон с идентичными границами

Чтобы манипулировать содержимым в пределах диапазона:

- `deleteContents()` - удалить содержимое диапазона из документа
- `extractContents()` - удалить содержимое диапазона из документа и вернуть как [DocumentFragment](info:modifying-document#document-fragment)
- `cloneContents()` - склонировать содержимое диапазона и вернуть как [DocumentFragment](info:modifying-document#document-fragment)
- `insertNode(node)` -- вставить `node` в документ в начале диапазона
- `surroundContents(node)` -- обернуть `node` вокруг содержимого диапазона. Чтобы этот метод сработал, диапазон должен содержать как открывающие, так и закрывающие теги для всех элементов внутри себя: не допускаются частичные диапазоны по типу `<i>abc`.

Используя эти методы, мы можем делать с выбранными узлами что угодно.

Проверим описанные методы в действии:

```html run autorun height=260
Нажмите на кнопку, чтобы соответствующий метод отработал на выделении, или на "resetExample", чтобы восстановить выделение как было.

<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<p id="result"></p>
<script>
  let range = new Range();

  // Каждый описанный метод представлен здесь:
  let methods = {
    deleteContents() {
      range.deleteContents()
    },
    extractContents() {
      let content = range.extractContents();
      result.innerHTML = "";
      result.append("Извлечено: ", content);
    },
    cloneContents() {
      let content = range.cloneContents();
      result.innerHTML = "";
      result.append("Клонировано: ", content);
    },
    insertNode() {
      let newNode = document.createElement('u');
      newNode.innerHTML = "НОВЫЙ УЗЕЛ";
      range.insertNode(newNode);
    },
    surroundContents() {
      let newNode = document.createElement('u');
      try {
        range.surroundContents(newNode);
      } catch(e) { alert(e) }
    },
    resetExample() {
      p.innerHTML = `Example: <i>italic</i> and <b>bold</b>`;
      result.innerHTML = "";

      range.setStart(p.firstChild, 2);
      range.setEnd(p.querySelector('b').firstChild, 3);

      window.getSelection().removeAllRanges();  
      window.getSelection().addRange(range);  
    }
  };

  for(let method in methods) {
    document.write(`<div><button onclick="methods.${method}()">${method}</button></div>`);
  }

  methods.resetExample();
</script>
```

Также существуют методы сравнения диапазонов, но они редко используются. Когда они вам понадобятся, вы можете прочитать о них в [спецификации](https://dom.spec.whatwg.org/#interface-range) или [статье MDN](https://developer.mozilla.org/ru/docs/Web/API/Range).


## Selection

`Range` это общий объект для управления диапазонами выделения. Мы можем создавать и передавать подобные объекты. Сами по себе они ничего визуально не выделяют.

Выделение в документе представлено объектом `Selection`, который может быть получен как `window.getSelection()` или `document.getSelection()`.

Выделение может включать ноль или более диапазонов. По крайней мере, так утверждается в [Спецификации Selection API](https://www.w3.org/TR/selection-api/). На практике же выбрать несколько диапазонов в документе можно только в Firefox, используя `key:Ctrl+click` (`key:Cmd+click` для Mac).

Ниже представлен скриншот выделения с 3 диапазонами, сделанный в Firefox:

![](selection-firefox.png)

Остальные браузеры поддерживают максимум 1 диапазон для каждого выделения. Как мы увидим далее, некоторые методы `Selection` подразумевают, что может быть несколько диапазонов, но, как было сказано ранее, во всех браузерах кроме Firefox может быть не более одного диапазона.

## Свойства Selection

Аналогично диапазону, выделение имеет начальную границу, именуемую "якорем", и конечную, называемую "фокусом".

Основные свойства выделения:

- `anchorNode` -- узел, с которого начинается выделение,
- `anchorOffset` -- смещение в  `anchorNode`, где начинается выделение,
- `focusNode` -- узел, на котором выделение заканчивается,
- `focusOffset` -- смещение в  `focusNode`, где выделение заканчивается,
- `isCollapsed` -- `true`, если диапазон выделения пуст, или не существует.
- `rangeCount` -- количество диапазонов в выделении, максимум `1` во всех браузерах кроме Firefox.

````smart header="Конечная граница выделения может находиться в документе до начальной границы"
Существует несколько методов выбрать содержимое в зависимости от устройства пользователя: мышь, горячие клавиши, нажатия на мобильном и другие.

Некоторые из них, такие как мышь, позволяют создавать выделение в обоих направлениях: слева направо и справа налево.

Если начало (якорь) выделения идёт в документе перед концом (фокус), говорят, что такое выделение имеет "прямое" направление.

К примеру, если пользователь начинает выделение с помощью мыши в направлении от "Example" до "italic":

![](selection-direction-forward.png)

Иначе, если выделение идёт от "italic" до "Example", выделение идёт в "обратном" направлении, её фокус будет перед якорем:

![](selection-direction-backward.png)

Это отличается от объектов `Range`, которые всегда направлены вперёд: начало диапазона не может стоять после его конца.
````

## События Selection

Существуют события, позволяющие отслеживать выборку:

- `elem.onselectstart` -- когда начинается выделение.
    - Работет на любом элементе.
    - preventDefault() отменяет начало выделения.
- `document.onselectionchange` -- когда выделение изменено.
    - Работет только на `document`.

## Демо отслеживания Selection

Ниже представлено небольшое демо.
В нём границы выделения выводятся динамически по мере того, как оно меняется:

```html run height=80
<p id="p">Выдели меня: <i>курсив</i> и <b>жирный</b></p>

От <input id="from" disabled> – До <input id="to" disabled>
<script>
  document.onselectionchange = function() {
    let {anchorNode, anchorOffset, focusNode, focusOffset} = document.getSelection();

    from.value = `${anchorNode && anchorNode.data}:${anchorOffset}`;
    to.value = `${focusNode && focusNode.data}:${focusOffset}`;
  };
</script>
```

Чтобы получить всё выделение:
- Как текст: просто вызовите `document.getSelection().toString()`.
- Как DOM-элементы: получите выделенные диапазоны и вызовите их метод `cloneContents()` (только первый диапазон, если мы не используем Firefox).

Ниже представлено демо получения выделение как в виде текста, так и в виде DOM-узлов:

```html run height=100
<p id="p">Выдели меня: <i>курсив</i> и <b>жирный</b></p>

Склонировано: <span id="cloned"></span>
<br>
Как текст: <span id="astext"></span>

<script>
  document.onselectionchange = function() {
    let selection = document.getSelection();

    cloned.innerHTML = astext.innerHTML = "";

    // Клонируем DOM-элеменьы из диапазонов (здесь мы поддерживаем множественное выделение)
    for (let i = 0; i < selection; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }

    // Получаем как текст
    astext.innerHTML += selection;
  };
</script>
```

## Методы Selection

Методы Selection для добавления и удаления диапазонов:

- `getRangeAt(i)` -- взять i-ый диапазон, начиная с `0`. Во всех браузерах кроме Firefox используется только `0`.
- `addRange(range)` -- добавить `range` в выделение. Все браузеры кроме Firefox проигнорируют этот вызов, если в выделении уже есть связанный диапазон.
- `removeRange(range)` -- удалить `range` из выделения.
- `removeAllRanges()` -- удалить все диапазоны.
- `empty()` -- сокращение для `removeAllRanges`.

Также существуют методы управления диапазонами выделения напрямую:

- `collapse(node, offset)` -- заменить выбранный диапазон новым, который начинается и заканчивается на данном `node`, на позиции `offset`.
- `setPosition(node, offset)` -- сокращение для `collapse`.
- `collapseToStart()` - схлопнуть (заменить на пустой диапазон) к началу выделения,
- `collapseToEnd()` - схлопнуть диапазон к концу выделения,
- `extend(node, offset)` - переместить фокус выделения к данному `node`, с позиции `offset`,
- `setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)` - заменить диапазон выделения на данные якорь и фокус. Будет выделено всё содержимое между этими границами.
- `selectAllChildren(node)` -- выделить все дочерние элементы данного `node`.
- `deleteFromDocument()` -- удалить содержимое выделения из документа.
- `containsNode(node, allowPartialContainment = false)` -- проверяет, содержит ли выделение `node` (частично, если второй аргумент равен `true`)

Так что для многих задач мы можем вызывать методы `Selection`, не обращаясь к связанному объекту `Range`.

К примеру, выделение всего параграфа:

```html run
<p id="p">Выдели меня: <i>курсив</i> и <b>жирный</b></p>

<script>
  // выделить всё содержимое от нулевого потомка тега <p> до последнего
  document.getSelection().setBaseAndExtent(p, 0, p, p.childNodes.length);
</script>
```

То же самое с помощью `Range`:

```html run
<p id="p">Выдели меня: <i>курсив</i> и <b>жирный</b></p>

<script>
  let range = new Range();
  range.selectNodeContents(p); // или selectNode(p), чтобы выделить и тег <p>

  document.getSelection().removeAllRanges(); // очистить текущее выделение, если оно существует
  document.getSelection().addRange(range);
</script>
```

```smart header="Чтобы что-то выделить, сначала снимите текущее выделение"
Если выделение уже существует, сначала снимите его, используя `removeAllRanges()`, и только затем добавляйте новые диапазоны. В противном случае все браузеры кроме Firefox проигнорируют добавление.

Исключением являются некоторые методы выделения, которые заменяют существующее выделение, например, `setBaseAndExtent`.
```

## Selection in form controls

Элементы формы, такие как `input` и `textarea`, предоставляют [API для выделения в их значениях](https://html.spec.whatwg.org/#textFieldSelection).

Properties:
- `input.selectionStart` -- position of selection start (writeable),
- `input.selectionEnd` -- position of selection start (writeable),
- `input.selectionDirection` -- selection direction, one of: "forward", "backward" or "none" (if e.g. selected with a double mouse click),

Events:
- `input.onselect` -- triggers when something is selected.

Methods:

- `input.select()` -- selects everything in the text control (can be `textarea` instead of `input`),
- `input.setSelectionRange(start, end, [direction])` -- change the selection to span from position `start` till `end`, in the given direction (optional).
- `input.setRangeText(replacement, [start], [end], [selectionMode])` -- replace a range of text with the new text.

    Optional arguments `start` and `end`, if provided, set the range start and end, otherwise user selection is used.

    The last argument, `selectionMode`, determines how the selection will be set after the text has been replaced. The possible values are:

    - `"select"` -- the newly inserted text will be selected.
    - `"start"` -- the selection range collapses just before the inserted text.
    - `"end"` -- the selection range collapses just after the inserted text.
    - `"preserve"` -- attempts to preserve the selection. This is the default.

Now let's see these methods in action.

### Example: tracking selection

For example, this code uses `onselect` event to track selection:

```html run autorun
<textarea id="area" style="width:80%;height:60px">
Selecting in this text updates values below.
</textarea>
<br>
От <input id="from" disabled> – До <input id="to" disabled>

<script>
  area.onselect = function() {
    from.value = area.selectionStart;
    to.value = area.selectionEnd;
  };
</script>
```

Please note:
- `onselect` triggers when something is selected, but not when the selection is removed.
- `document.onselectionchange` event should not trigger for selections inside a form control, according to the [spec](https://w3c.github.io/selection-api/#dfn-selectionchange), as it's not related to `document` selection and ranges. Some browsers generate it, but we shouldn't rely on it.


### Example: moving cursor

We can change `selectionStart` and `selectionEnd`, that sets the selection.

An important edge case is when `selectionStart` and `selectionEnd` equal each other. Then it's exactly the cursor position. Or, to rephrase, when nothing is selected, the selection is collapsed at the cursor position.

So, by setting `selectionStart` and `selectionEnd` to the same value, we move the cursor.

For example:

```html run autorun
<textarea id="area" style="width:80%;height:60px">
Переведите фокус на меня, курсор окажется на 10-й позиции
</textarea>

<script>
  area.onfocus = () => {
    // нулевая задержка setTimeout нужна, чтобы это сработало после получения фокуса элементом формы
    setTimeout(() => {
      // мы можем задать любое выделение
      // если начало и конец совпадают, курсор устанавливается на этом месте
      area.selectionStart = area.selectionEnd = 10;
    });
  };
</script>
```

### Example: modifying selection

To modify the content of the selection, we can use `input.setRangeText`. Of course, we can read `selectionStart/End` and can just change `value`, but `setRangeText` is more powerful.

That's a somewhat complex method. In its simplest one-argument form it replaces the user selected range and removes the selection.

For example, here the user selection will be wrapped by `*...*`:

```html run autorun
<input id="input" style="width:200px" value="Select here and click the button">
<button id="button">Wrap selection in stars *...*</button>

<script>
button.onclick = () => {
  if (input.selectionStart == input.selectionEnd) {
    return; // nothing is selected
  }

  let selected = input.value.slice(input.selectionStart, input.selectionEnd);
  input.setRangeText(`*${selected}*`);
};
</script>
```

With more arguments, we can set range `start` and `end`.

In this example we find `"THIS"` in the input text, replace it and keep the replacement selected:

```html run autorun
<input id="input" style="width:200px" value="Replace THIS in text">
<button id="button">Replace THIS</button>

<script>
button.onclick = () => {
  let pos = input.value.indexOf("THIS");
  if (pos >= 0) {
    input.setRangeText("*THIS*", pos, pos + 4, "select");
    input.focus(); // focus to make selection visible
  }
};
</script>
```

### Example: insert at cursor

If nothing is selected, or we use equal `start` and `end` in `setRangeText`, then the new text is just inserted, nothing is removed.

We can also insert something "at the cursor" using `setRangeText`.

Here's an button that inserts `"HELLO"` at the cursor position and puts the cursor immediately after it. If the selection is not empty, then it gets replaced (we can do detect in by comparing `selectionStart=selectionEnd` and do something else instead):

```html run autorun
<input id="input" style="width:200px" value="Text Text Text Text Text">
<button id="button">Insert "HELLO" at cursor</button>

<script>
  button.onclick = () => {
    input.setRangeText("HELLO", input.selectionStart, input.selectionEnd, "end");
    input.focus();
  };    
</script>
```


## Сделать что-то невыделяемым

Существуют три способа сделать что-то невыделяемым:

1. Используйте CSS-свойство `user-select: none`.

    ```html run
    <style>
    #elem {
      user-select: none;
    }
    </style>
    <div>Можно выделить <div id="elem">Нельзя выделить</div> Можно выделить</div>
    ```

    Это свойство не позволяет начать выделение с `elem`, но пользователь может начать выделять с другого места и включить `elem`.

    После этого `elem` станет частью `document.getSelection()`, так что на самом деле выделение происходит, но его содержимое обычно игнорируется при копировании и вставке.


2. Предотвратить действие по умолчанию в событии `onselectstart` или `mousedown`.

    ```html run
    <div>Можно выделить <div id="elem">Нельзя выделить</div> Можно выделить</div>

    <script>
      elem.onselectstart = () => false;
    </script>
    ```

    Этот способ также не даёт начать выделение с `elem`, но пользователь может начать с другого элемента, а затем расширить выборку до `elem`.

    Это удобно, когда есть другой обработчик события на том же событии, которое запускает выделение. Так что мы отключаем выделение, чтобы избежать конфликта.

    Содержимое `elem` всё ещё может быть скопировано.

3. Мы также можем очистить выборку после срабатывания с помощью `document.getSelection().empty()`. Этот способ используется редко, так как он вызывает нежелаемое мерцание при появлении и исчезновении выделения.

## Ссылки

- [Спецификация DOM: Range](https://dom.spec.whatwg.org/#ranges)
- [Selection API](https://www.w3.org/TR/selection-api/#dom-globaleventhandlers-onselectstart)
- [Спецификация HTML: API для выделения в элементах управления текстом](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#textFieldSelection)


## Итого

Мы подробно рассмотрели два разных API для выделения:

1. Для документа: объекты `Selection` и `Range`.
2. Для `input`, `textarea`: дополнительные методы и свойства.

Второе API очень простое, так как работает с текстом.

Самые используемые готовые решения:

1. Получить выделение:
    ```js run
    let selection = document.getSelection();

    // затем применяем методы Range к selection.getRangeAt(0)
    // или же ко всем диапазонам, если поддерживается множественное выделение
    for (let i = 0; i < selection; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }
    ```
2. Установить выборку:
    ```js run
    let selection = document.getSelection();

    // напрямую:
    selection.setBaseAndExtent(...from...to...);

    // или создадим диапазон и:
    selection.removeAllRanges();
    selection.addRange(range);
    ```

Ещё одна важная деталь о выделении: позиция курсора в редактируемых элементах, таких как `<textarea>`, всегда стоит в начале или конце выделения.

Мы можем использовать это, чтобы получить позицию курсора и переместить его, установив `elem.selectionStart` и `elem.selectionEnd`.