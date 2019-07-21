libs:
  - d3
  - domtree

---

# Selection и Range

В этой главе мы рассмотрим выделение текста.

JavaScript может делать с ним все что угодно: получать существующее выделение, выделять и снимать выделение одной или нескольких частей текста, убирать выделенную часть из документа, оборачивать в тег и так далее.

Вы можете использовать готовые решения в секции "Итого" в конце статьи, но вы узнаете гораздо больше, если продолжите читать. Используемые встроенные объекты `Range` и `Selection` просты для понимания, и после изучения вы сможете гибко использовать эти объекты для решения ваших задач, не прибегая к использованию готовых решений.

## Диапазон

Базовый концепт выборки текста это [Диапазон](https://dom.spec.whatwg.org/#ranges): проще говоря, пара "границ диапазона": начало диапазона и его конец.

Каждая граница представлена как родительский DOM узел с относительным смещением от начала последнего. Для узла DOM элемента, смещение - это номер дочернего элемента, для текстового узла - это позиция в тексте.

Для начала, мы можем создать диапазон (конструктор не имеет параметров):

```js
let range = new Range();
```

Затем мы можем установить границы используя `range.setStart(node, offset)` и `range.setEnd(node, offset)`.

К примеру, рассмотрим этот фрагмент HTML кода:

```html
<p id="p">Example: <i>italic</i> and <b>bold</b></p>
```

Взглянем на его DOM структуру, заметьте, что здесь текстовые имеют для нас значение:

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

Давайте выберем `"Example: <i>italic</i>"`. Это первые два ребенка тэга `<p>` (учитывая текстовые узлы):

![](range-example-p-0-1.png)

```html run
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
*!*
  let range = new Range();

  range.setStart(p, 0);
  range.setEnd(p, 2);
*/!*

  // toString, вызванный у диапазона, возвращает его содержимое в виде текста (без тэгов)
  alert(range); // Example: italic

  // применим этот диапазон к выборке документа (объясняется далее)
  document.getSelection().addRange(range);
</script>
```

- `range.setStart(p, 0)` -- устанавливает начало диапазона на 0ом ребенке тэга `<p>` (Это текстовый узел `"Example: "`).
- `range.setEnd(p, 2)` -- расширяет диапазон до (но не включая) 2го ребенка тэга `<p>` (это текстовый узел `" и "`, но так как конец не включен, последний включенный узел - это тэг `<i>`).

Ниже представлен более расширенный пример, в котором вы можете 'пощупать' функционал более детально:

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

    // применим выборку, объясняется далее
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
  };
</script>
```

К примеру, выборка с `1` до `4` возвращает следующий диапазон `<i>italic</i> and <b>bold</b>`.

![](range-example-p-1-3.png)

Мы не должны использовать один и тот же узел в `setStart` и `setEnd`. Диапазон может охватывать множество не связанных между собой узлов.

### Выборка частей текстовых узлов

Давайте выделим текст частично, как показано ниже:

![](range-example-p-2-b-3.png)

Это так же возможно,  нужно просто установить начала и конец как относительное смещение в текстовых узлах.

Нам нужно создать диапазон, который:
- начинается со второй позиции первого ребенка тэга `<p>` (захватывающий все, кроме первых двух букв "Ex<b>ample:</b> ")
- заканчивается на 3 позиции первого ребенка тэга `<b>` (захватывающий первые три буквы "<b>bol</b>d"):

```html run
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();

  range.setStart(p.firstChild, 2);
  range.setEnd(p.querySelector('b').firstChild, 3);

  alert(range); // ample: italic and bol

  // используем этот диапазон для выборки (объясняется далее)
  window.getSelection().addRange(range);
</script>
```

Объект [Range] имеет следующие свойства:

![](range-example-p-2-b-3-range.png)

- `startContainer`, `startOffset` -- узел и начальное смещение,
  - в примере выше: первый текстовый узел внутри тэга `<p>` и `2`.
- `endContainer`, `endOffset` -- узел и конечное смещение,
  - в примере выше: первый текстовый узел внутри тэга `<b>` и `3`.
- `collapsed` -- boolean, `true` если диапазон начинается и заканчивается на одном и том же месте (следовательно, диапазон не имеет никакого содержимого),
  - в примере выше: `false`
- `commonAncestorContainer` -- ближайший общий предок всех узлов в пределах диапазона,
  - в примере выше: `<p>`

## Методы Range

Существует множество удобных методов для манипулирования диапазонами.

Установить начало диапазона:

- `setStart(node, offset)` установить начало в: позиция `offset` в `node`
- `setStartBefore(node)` установить начало в: прямо перед `node`
- `setStartAfter(node)` установить начало в: прямо после `node`

Установить конец диапазона (похожие методы):

- `setEnd(node, offset)` установить конец в: позиция `offset` в `node`
- `setEndBefore(node)` установить конец в: прямо перед `node`
- `setEndAfter(node)` установить конец в: прямо после `node`

**Как было продемонстрировано, `node` может быть как и текстовым узлом так и элементом: для текстовых узлов `offset` пропускает указанное количество символов, в то время как для элементов - указанное кол-во дочерних узлов.**

Другие:
- `selectNode(node)` указать, что диапазон охватит целый `node`
- `selectNodeContents(node)` указать, что диапазон охватит все содержимое `node`
- `collapse(toStart)` если `toStart=true` установить конец=начало, иначе установить начало=конец, таким образом сливая диапазон
- `cloneRange()` создать новый диапазон с идентичными конец/начало

Чтобы манипулировать содержимым в пределах диапазона:

- `deleteContents()` - удалить содержимое диапазона из документа
- `extractContents()` - удалить содержимое диапазона из документа и вернуть как [DocumentFragment](info:modifying-document#document-fragment)
- `cloneContents()` - склонировать содержимое диапазона и вернуть как [DocumentFragment](info:modifying-document#document-fragment)
- `insertNode(node)` -- вставить `node` в документ в начале диапазона
- `surroundContents(node)` -- обернуть `node` вокруг содержимого диапазона. Чтобы этот метод сработал, диапазон должен содержать как открывающие так и закрывающие тэги для всех элементов внутри себя: не допускаются частичные диапазоны по типу `<i>abc`.

С этими методами мы можем делать фактически всё с выбранными узлами.

Ниже представлен тест этих методов:

```html run autorun height=260
Нажмите на кнопку, чтобы запустить метод на выборку, "resetExample" чтобы перезапустить пример.

<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<p id="result"></p>
<script>
  let range = new Range();

  // Каждый продемонстрированный метод представлен здесь:
  let methods = {
    deleteContents() {
      range.deleteContents()
    },
    extractContents() {
      let content = range.extractContents();
      result.innerHTML = "";
      result.append("extracted: ", content);
    },
    cloneContents() {
      let content = range.cloneContents();
      result.innerHTML = "";
      result.append("cloned: ", content);
    },
    insertNode() {
      let newNode = document.createElement('u');
      newNode.innerHTML = "NEW NODE";
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

Также существуют методы сравнения диапазонов, но они редко используются. Когда они вам нужны, пожалуйста, обратитесь к [спецификации](https://dom.spec.whatwg.org/#interface-range) или [руководству MDN](https://developer.mozilla.org/ru/docs/Web/API/Range).


## Selection

`Range` это общий объект для управления диапазонами выборки. Мы можем создавать подобные объекты, передавать их -- сами по себе визуально они ничего не выбирают.

Выборка документа представлена объектом `Selection`, который может быть получен как `window.getSelection()` или `document.getSelection()`.

Выборка может включать ноль или более диапазонов. Как минимум, [Спецификация API выборки](https://www.w3.org/TR/selection-api/) заявляет это. Хотя на практике, только Firefox позволяет выбрать несколько диапазонов в документе используя `key:Ctrl+click` (`key:Cmd+click` для Mac).

Ниже представлен скриншот выборки с 3 диапазонами, сделанный в Firefox:

![](selection-firefox.png)

Остальные браузеры поддерживают максимум 1 диапазон для каждой выборки. Как мы увидим далее, некоторые методы `Selection` подразумевают что может быть много диапазонов, но опять же, во всех браузерах кроме Firefox, максимум может быть только один диапазон.

## Свойства Selection

Аналогично диапазону, выборка имеет начало, именуемое "якорем", и конец, именующийся "фокусом".

Основные свойства выборки:

- `anchorNode` -- узел с которого начинается выборка,
- `anchorOffset` -- смещение в  `anchorNode` где начинается выборка,
- `focusNode` -- узел на котором выборка заканчивается,
- `focusOffset` -- смещение в  `focusNode` где выборка заканчивается,
- `isCollapsed` -- `true` если диапазон выборки пуст, или не существует.
- `rangeCount` -- количество диапазонов в выборке, максимум `1` во всех браузерах кроме Firefox.

````smart header="Selection end may be in the document before start"
Существует много методов выбрать содержимое, в зависимости от устройства управления: мышка, горячие клавиши, нажатия на мобильном и т.д.

Некоторые из них, такие как мышь, позволяют создавать выборки в обоих направлениях: "слева направо" и "справа налево".

Если начало (якорь) выборки идет в документе перед концом (фокус), говорят, что такая выборка имеет "прямое" направление.

К примеру, если пользователь начинает выборку с помощью мыши и идет в направлении от "Example" до "italic":

![](selection-direction-forward.png)

Иначе, если выборка идет от "italic" до "Example", выборка идет в обратном направлении, её фокус будет перед якорем:

![](selection-direction-backward.png)

Это отличается от `Range` объектов которые всегда направлены прямо: начало диапазона не может стоять за его концом.
````

## События Selection

Существуют события, позволяющие отслеживать выборку:

- `elem.onselectstart` -- когда выборка начата.
    - Может сработать на любом элементе.
    - Предотвращение действия по умолчанию (.preventDefault()) отключит возможность выборки текста.
- `document.onselectionchange` -- когда выборку сменили.
    - Срабатывает только на `document`.

## Демо отслеживания Selection

Ниже представлено небольшое демо, демонстрирующее границы выборки
динамически по мере того, как она меняется:

```html run height=80
<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

From <input id="from" disabled> – To <input id="to" disabled>
<script>
  document.onselectionchange = function() {
    let {anchorNode, anchorOffset, focusNode, focusOffset} = document.getSelection();

    from.value = `${anchorNode && anchorNode.data}:${anchorOffset}`;
    to.value = `${focusNode && focusNode.data}:${focusOffset}`;
  };
</script>
```

Чтобы получить целую выборку:
- Как текст: просто вызовите `document.getSelection().toString()`.
- Как DOM узлы: получите основные диапазоны и вызовите их `cloneContents()` метод (только первый диапазон, если мы не используем Firefox).

Ниже представлено демо получения выборки в виде как текста так и DOM узлов:

```html run height=100
<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

Cloned: <span id="cloned"></span>
<br>
As text: <span id="astext"></span>

<script>
  document.onselectionchange = function() {
    let selection = document.getSelection();

    cloned.innerHTML = astext.innerHTML = "";

    // Клонируем DOM узлы из диапазонов (здесь мы поддерживаем множественную выборку)
    for (let i = 0; i < selection; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }

    // Получаем как текст
    astext.innerHTML += selection;
  };
</script>
```

## Методы Selection

Методы Selection, которые служат для добавления/удаления диапазонов:

- `getRangeAt(i)` -- взять i-ый диапазон, начиная с `0`. Во всех браузерах кроме Firefox, только `0` используется.
- `addRange(range)` -- добавить `range` в выборку. Все браузеры кроме Firefox игнорируют этот вызов, если выборка уже имеет связанный диапазон.
- `removeRange(range)` -- удалить `range` из выборки.
- `removeAllRanges()` -- удалить все диапазоны.
- `empty()` -- работает идентично методу `removeAllRanges`.

Также, существуют методы манипулирования диапазонами выборки напрямую:

- `collapse(node, offset)` -- заменить выбранный диапазон новым, который начинается и заканчивается на данном `node`, на позиции `offset`.
- `setPosition(node, offset)` -- работает идентично методу `collapse`.
- `collapseToStart()` - обрушиться (заменить на пустой диапазон) к старту выборки,
- `collapseToEnd()` - обрушиться к концу выборки,
- `extend(node, offset)` - переместить фокус выборки к данному `node`, с позиции `offset`,
- `setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)` - заменить диапазон выборки на данные якорь и фокус. Все содержимое между этими границами выбрано.
- `selectAllChildren(node)` -- выбрать всех детей данного `node`.
- `deleteFromDocument()` -- удалить выбранное содержимое из документа.
- `containsNode(node, allowPartialContainment = false)` -- проверяет содержит ли выборка `node` (частично, если второй аргумент равен `true`)

Следовательно, для многих задач мы можем вызывать методы `Selection`, без надобности доступа к основному `Range` объекту.

К примеру, выборка целого содержимого параграфа:

```html run
<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

<script>
  // select from 0th child of <p> to the last child
  document.getSelection().setBaseAndExtent(p, 0, p, p.childNodes.length);
</script>
```

Та же операция используя диапазоны:

```html run
<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();
  range.selectNodeContents(p); // or selectNode(p) to select the <p> tag too

  document.getSelection().removeAllRanges(); // clear existing selection if any
  document.getSelection().addRange(range);
</script>
```

```smart header="To select, remove the existing selection first"
Если выборка уже существует, сначала сбросьте ее используя `removeAllRanges()`. И затем добавляйте диапазоны. В ином случае, все браузеры кроме Firefox игнорируют новые диапазоны.

Исключением являются некоторые методы выборки, которые заменяют существующую выборку, к примеру `setBaseAndExtent`.
```

## Selection в элементах управления формой

Элементы формы, такие как `input` и `textarea` предоставляют [API для выборки в их собственных значениях](https://html.spec.whatwg.org/#textFieldSelection).

Так как их значения - это просто текст, не HTML, эти методы не используют объекты `Selection` и `Range`, они намного проще.

- `input.select()` -- выбирает все содержимое `input`,
- `input.selectionStart` -- позиция начала выборки (записываемый),
- `input.selectionEnd` -- позиция конца выборки (записываемый),
- `input.selectionDirection` -- направление, одно из: "forward", "backward" или "none" (если, к примеру, выбрано с помощью двойного клика по кнопке мыши),
- `input.setSelectionRange(start, end, [direction])` -- изменить диапазон выборки, начиная со `start`, заканчивая `end`, в данном направлении (опционально).

Чтобы модифицировать содержимое выборки:

- `input.setRangeText(replacement, [start], [end], [selectionMode])` -- заменяет выбранный текст в диапазоне новым. Если аргументы `start` и `end` не предоставлены, полагается, что диапазон - это вся выборка.

Последний аргумент, `selectionMode`, определяет как будет вести себя выборка после замены текста. Возможные значения:

- `"select"` -- только что вставленный текст будет выбран.
- `"start"` -- диапазон выборки 'обрушивается' прямо перед вставленным текстом.
- `"end"` -- диапазон выборки 'обрушивается' прямо после вставленного текста.
- `"preserve"` -- пытается сохранить выборку. Значение по умолчанию.

К примеру, этот код использует событие `onselect` чтобы отслеживать выборку:

```html run
<textarea id="area" style="width:80%;height:60px">Select this text</textarea>
<br>
From <input id="from" disabled> – To <input id="to" disabled>

<script>
  area.onselect = function() {
    from.value = area.selectionStart;
    to.value = area.selectionEnd;
  };
</script>
```

Событие `document.onselectionchange` не должно срабатывать для выборок внутри формы, в соответствии с [спецификацией](https://w3c.github.io/selection-api/#dfn-selectionchange), так как событие не относится к выборке и диапазонам объекта `document`. Хотя некоторые браузеры генерируют это.

**Когда ничего не выбрано, `selectionStart` и `selectionEnd` равны позиции курсора.**

Иными словами, когда ничего не выбрано, выборка 'обрушена' на позиции курсора.

Мы можем использовать следующее, чтобы двигать курсор:

```html run
<textarea id="area" style="width:80%;height:60px">
Focus on me, the cursor will be at position 10.
</textarea>

<script>
  area.onfocus = () => {
    // нужна нулевая задержка setTimeout
    // чтобы это сработало после действия `browser focus`
    setTimeout(() => {
      // мы можем установить любую выборку
      // если начало = конец, то курсор именно на том месте
      area.selectionStart = area.selectionEnd = 10;
    });
  };
</script>
```

...Или вставить что-то "там где курсор" используя `setRangeText`.

Ниже представлена кнопка, которая заменяет выборку текстом - `"TEXT"`, и устанавливает курсор сразу после вставленного текста. Если выборка пуста, текст будет вставлен на позиции курсора:

```html run
<textarea id="area" style="width:80%;height:60px">Select something here</textarea>
<br>

<button id="button">Insert!</button>

<script>
  button.onclick = () => {
    // заменим диапазон текстом TEXT и 'обрушим' выборку на конец текста
    area.setRangeText("TEXT", area.selectionStart, area.selectionEnd, "end");
  };    
</script>
</body>
```


## Невыделяемость

Чтобы сделать что-то невыделяемым, существуют три способа:

1. Используйте CSS свойство `user-select: none`.

    ```html run
    <style>
    #elem {
      user-select: none;
    }
    </style>
    <div>Selectable <div id="elem">Unselectable</div> Selectable</div>
    ```

    Это не позволяет выборке начаться с `elem`. Но пользователь может начать выборку с другого места и включить `elem` в выборку.

    Затем `elem` станет частью `document.getSelection()`, так что на самом деле выборка происходит, но её содержимое обычно игнорируется при копировании/вставке.


2. Предотвратить действие по умолчанию в событии `onselectstart` или `mousedown`.

    ```html run
    <div>Selectable <div id="elem">Unselectable</div> Selectable</div>

    <script>
      elem.onselectstart = () => false;
    </script>
    ```

    Это предотвращает выборку от старта с `elem`, но посетитель может начать с другого элемента, а затем расширить выборку до `elem`.

    Это удобно когда есть another другой обработчик события на том же событии, которое запускает выборку. Так что мы отключаем выборку во избежание конфликта.

    И содержимое `elem` все еще может быть скопировано.

3. Мы также можем очистить выборку 'пост-фактум' после срабатывания `document.getSelection().empty()`. Это используется редко, так как это порождает нежелаемое моргание при появлении/исчезании выборки.

## Ссылки

- [DOM spec: Range](https://dom.spec.whatwg.org/#ranges)
- [Selection API](https://www.w3.org/TR/selection-api/#dom-globaleventhandlers-onselectstart)
- [HTML spec: APIs for the text control selections](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#textFieldSelection)


## Итого

Мы подробно рассмотрели два разных API для выборок:

1. Для документа: объекты `Selection` и `Range`.
2. Для `input`, `textarea`: дополнительные методы и свойства.

Второе API очень простое, так как работает с текстом.

Вероятнее всего самые используемые готовые решения (рецепты):

1. Получить выборку:
    ```js run
    let selection = document.getSelection();

    // затем применяем методы Range к selection.getRangeAt(0)
    // или же ко всем диапазонам если множественная выборка поддерживается
    for (let i = 0; i < selection; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }
    ```
2. Установить выборку:
    ```js run
    let selection = document.getSelection();

    // непосредственно:
    selection.setBaseAndExtent(...from...to...);

    // или создадим диапазон и:
    selection.removeAllRanges();
    selection.addRange(range);
    ```

Еще одна важная деталь о выборке: позиция курсора в изменяемых элементах, таких как `<textarea>` всегда стоит в начале или конце выборки.

Мы можем использовать это чтобы и получить позицию курсора, и переместить курсор путем установки `elem.selectionStart` и `elem.selectionEnd`.