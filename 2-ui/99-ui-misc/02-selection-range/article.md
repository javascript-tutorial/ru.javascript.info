libs:
  - d3
  - domtree

---

# Selection и Range

В этой главе мы рассмотрим выделение текста.

JavaScript может делать с ним все что угодно: получать существующее выделение, выделять и снимать выделение одной или нескольких частей текста, убирать выделенную часть из документа, оборачивать в тег и так далее.

Вы можете использовать готовые решения в секции "Итого" в конце статьи, но вы узнаете гораздо больше, если продолжите читать. Используемые встроенные объекты `Range` и `Selection` просты для понимания, и после изучения вы сможете гибко использовать эти объекты для решения ваших задач, не прибегая к использованию готовых решений.

## Range

Базовый концепт выделения текста это [Range](https://dom.spec.whatwg.org/#ranges): по сути, это пара "граничных точек": начало и конец диапазона.

Каждая граница представлена как родительский DOM узел с относительным смещением от начала. Для узла DOM элемента, смещение - это номер дочернего элемента, для текстового узла - это позиция в тексте.

Для начала, мы создадим диапазон (конструктор не имеет параметров):

```js
let range = new Range();
```

Затем мы установим границы используя `range.setStart(node, offset)` и `range.setEnd(node, offset)`.

К примеру, рассмотрим этот фрагмент HTML кода:

```html
<p id="p">Example: <i>italic</i> and <b>bold</b></p>
```

Взглянем на его DOM структуру, обратите внимание на текстовые узлы, они важны для нас:

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

Выберем `"Example: <i>italic</i>"`. Это первые два дочерних элемента тега `<p>` (учитывая текстовые узлы):

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

  // применим этот диапазон к выборке документа (объясняется далее)
  document.getSelection().addRange(range);
</script>
```

- `range.setStart(p, 0)` -- устанавливает начало диапазона на нулевом ребенке тега `<p>` (Это текстовый узел `"Example: "`).
- `range.setEnd(p, 2)` -- расширяет диапазон до 2го (но не включая его) ребенка тега `<p>` (это текстовый узел `" and "`, но так как конец не включен, последний включенный узел - это тег `<i>`).

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

    // применим выборку, объясняется далее
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
  };
</script>
```

К примеру, выделение с `1` до `4` возвращает следующий диапазон `<i>italic</i> and <b>bold</b>`.

![](range-example-p-1-3.png)

Не обязательно использовать один и тот же элемент в `setStart` и `setEnd`. Диапазон может охватывать множество не связанных между собой элементов.

### Выборка частей текстовых узлов

Давайте выделим текст частично, как показано ниже:

![](range-example-p-2-b-3.png)

Это так же возможно, нужно просто установить начало и конец как относительное смещение в текстовых узлах.

Нам нужно создать диапазон, который:
- начинается со второй позиции первого дочернего элемента тега `<p>` (захватывающий все, кроме первых двух букв "Ex<b>ample:</b> ")
- заканчивается на 3 позиции первого дочернего элемента тега `<b>` (захватывающий первые три буквы "<b>bol</b>d"):

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
  - в примере выше: первый текстовый узел внутри тега `<p>` и `2`.
- `endContainer`, `endOffset` -- узел и конечное смещение,
  - в примере выше: первый текстовый узел внутри тега `<b>` и `3`.
- `collapsed` -- boolean, `true` если диапазон начинается и заканчивается на одном и том же месте (следовательно, в диапазон ничего не входит),
  - в примере выше: `false`
- `commonAncestorContainer` -- ближайший общий предок всех узлов в пределах диапазона,
  - в примере выше: `<p>`

## Методы Range

Существует множество удобных методов для манипулирования диапазонами.

Установить начало диапазона:

- `setStart(node, offset)` установить начальную границу в позицию `offset` в `node`
- `setStartBefore(node)` установить начальную границу прямо перед `node`
- `setStartAfter(node)` установить начальную границу прямо после `node`

Установить конец диапазона (похожие методы):

- `setEnd(node, offset)` установить конечную границу в позицию `offset` в `node`
- `setEndBefore(node)` установить конечную границу прямо перед `node`
- `setEndAfter(node)` установить конечную границу прямо после `node`

**Как было показано, `node` может быть как и текстовым узлом так и элементом: для текстовых узлов `offset` пропускает указанное количество символов, в то время как для элементов - указанное количество дочерних узлов.**

Другие:
- `selectNode(node)` выделить `node` целиком
- `selectNodeContents(node)` выделить все содержимое `node`
- `collapse(toStart)` если указано `toStart=true`, установить конечную границу в начало, иначе установить начальную границу в конец, схлапывая таким образом диапазон
- `cloneRange()` создать новый диапазон с идентичными границами

Чтобы манипулировать содержимым в пределах диапазона:

- `deleteContents()` - удалить содержимое диапазона из документа
- `extractContents()` - удалить содержимое диапазона из документа и вернуть как [DocumentFragment](info:modifying-document#document-fragment)
- `cloneContents()` - склонировать содержимое диапазона и вернуть как [DocumentFragment](info:modifying-document#document-fragment)
- `insertNode(node)` -- вставить `node` в документ в начале диапазона
- `surroundContents(node)` -- обернуть `node` вокруг содержимого диапазона. Чтобы этот метод сработал, диапазон должен содержать как открывающие так и закрывающие теги для всех элементов внутри себя: не допускаются частичные диапазоны по типу `<i>abc`.

Исплользуя эти методы, мы можем делать с выбранными узлами что угодно.

Ниже представлен тест этих методов:

```html run autorun height=260
Нажмите на кнопку, чтобы запустить метод на выборку, "resetExample" чтобы перезапустить пример.

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

Выборка может включать ноль или более диапазонов. По крайней мере, так утверждается в [Спецификации API выделения](https://www.w3.org/TR/selection-api/). На практике, выбрать несколько диапазонов в документе можно только в Firefox, используя `key:Ctrl+click` (`key:Cmd+click` для Mac).

Ниже представлен скриншот выделения с 3 диапазонами, сделанный в Firefox:

![](selection-firefox.png)

Остальные браузеры поддерживают максимум 1 диапазон для каждой выборки. Как мы увидим далее, некоторые методы `Selection` подразумевают что может быть несколько диапазонов, но, как было сказано ранее, во всех браузерах кроме Firefox может быть не более одного диапазона.

## Свойства Selection

Аналогично диапазону, выделение имеет начальную границу, именуемую "якорем", и конечную, называемую "фокусом".

Основные свойства выделения:

- `anchorNode` -- узел с которого начинается выделение,
- `anchorOffset` -- смещение в  `anchorNode` где начинается выделение,
- `focusNode` -- узел на котором выделение заканчивается,
- `focusOffset` -- смещение в  `focusNode` где выделение заканчивается,
- `isCollapsed` -- `true` если диапазон выделения пуст, или не существует.
- `rangeCount` -- количество диапазонов в выделении, максимум `1` во всех браузерах кроме Firefox.

````smart header="Конечная граница выделения может находиться в документе до начальной границы"
Существует несколько методов выбрать содержимое, в зависимости от устройства пользователя: мышь, горячие клавиши, нажатия на мобильном и другие.

Некоторые из них, такие как мышь, позволяют создавать выборки в обоих направлениях: слева направо и справа налево.

Если начало (якорь) выделения идет в документе перед концом (фокус), говорят, что такая выборка имеет "прямое" направление.

К примеру, если пользователь начинает выделение с помощью мыши в направлении от "Example" до "italic":

![](selection-direction-forward.png)

Иначе, если выборка идет от "italic" до "Example", выборка идет в "обратном" направлении, её фокус будет перед якорем:

![](selection-direction-backward.png)

Это отличается от объектов `Range`, которые всегда направлены прямо: начало диапазона не может стоять после его конца.
````

## События Selection

Существуют события, позволяющие отслеживать выборку:

- `elem.onselectstart` -- когда начинается выделение.
    - Работет на любом элементе.
    - preventDefault() отменяет начало выделения.
- `document.onselectionchange` -- когда выделение изменено.
    - Работет только на `document`.

## Демо отслеживания Selection

Ниже представлено небольшое демо, в котором границы выделения выводятся динамически по мере того, как она меняется:

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

Чтобы получить все выделение:
- Как текст: просто вызовите `document.getSelection().toString()`.
- Как DOM элементы: получите выделенные диапазоны и вызовите их метод `cloneContents()` (только один диапазон, если мы не используем Firefox).

Ниже представлено демо получения выделение как в виде текста, так и в виде DOM узлов:

```html run height=100
<p id="p">Выдели меня: <i>курсив</i> и <b>жирный</b></p>

Клоны: <span id="cloned"></span>
<br>
Текст: <span id="astext"></span>

<script>
  document.onselectionchange = function() {
    let selection = document.getSelection();

    cloned.innerHTML = astext.innerHTML = "";

    // Клонируем DOM элеменьы из диапазонов (здесь мы поддерживаем мультивыделение в Firefox)
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
- `setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)` - заменить диапазон выделения на данные якорь и фокус. Будет выделено все содержимое между этими границами.
- `selectAllChildren(node)` -- выделить все дочерние элементы данного `node`.
- `deleteFromDocument()` -- удалить содержимое выделения из документа.
- `containsNode(node, allowPartialContainment = false)` -- проверяет содержит ли выделение `node` (частично, если второй аргумент равен `true`)

Так что для многих задач мы можем вызывать методы `Selection`, не обращаясь к связанному объекту `Range`.

К примеру, выделение всего параграфа:

```html run
<p id="p">Выдели меня: <i>курсив</i> и <b>жирный</b></p>

<script>
  // выделить все содержимое от нулевого потомка тега <p> до последнего
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

```smart header="Чтобы что-то выделить, сначала очистите текущее выделение"
Если выделение уже существует, сначала очистите его, используя `removeAllRanges()`, и только затем добавляйте новые диапазоны. В противном случае все браузеры кроме Firefox проигнорируют добавление.

Исключением являются некоторые методы выделения, которые заменяют существующее выделение, например, `setBaseAndExtent`.
```

## Selection в элементах управления форм

Элементы формы, такие как `input` и `textarea`, предоставляют [API для выделения в их значениях](https://html.spec.whatwg.org/#textFieldSelection).

Так как их значения - это не HTML, а просто текст, эти методы не используют объекты `Selection` и `Range`, они намного проще.

- `input.select()` -- выделяет все содержимое `input`,
- `input.selectionStart` -- позиция начала выделения (доступен для записи),
- `input.selectionEnd` -- позиция конца выборки (доступен для записи),
- `input.selectionDirection` -- одно из направлений: "forward", "backward" или "none" (если, к примеру, выделено с помощью двойного клика мыши),
- `input.setSelectionRange(start, end, [direction])` -- изменить диапазон выделения, начиная со `start`, заканчивая `end`, в данном направлении (необязательный параметр).

Для изменения содержимого выделения:

- `input.setRangeText(replacement, [start], [end], [selectionMode])` -- заменяет выделенный текст в диапазоне новым. Если аргументы `start` и `end` не предоставлены, полагается, что диапазон - все выделение.

Последний аргумент, `selectionMode`, определяет как будет вести себя выделение после замены текста. Возможные значения:

- `"select"` -- только что вставленный текст будет выделен.
- `"start"` -- диапазон выделения схлопнется прямо перед вставленным текстом.
- `"end"` -- диапазон выделения схлопнется прямо после вставленного текста.
- `"preserve"` -- пытается сохранить выделение. Значение по умолчанию.

К примеру, этот код использует событие `onselect` чтобы отслеживать выборку:

```html run
<textarea id="area" style="width:80%;height:60px">Выделите этот текст</textarea>
<br>
От <input id="from" disabled> – До <input id="to" disabled>

<script>
  area.onselect = function() {
    from.value = area.selectionStart;
    to.value = area.selectionEnd;
  };
</script>
```

Событие `document.onselectionchange` не должно срабатывать для выделения внутри элемента формы, в соответствии с [спецификацией](https://w3c.github.io/selection-api/#dfn-selectionchange), так как событие не относится к выделению и диапазонам объекта `document`. Тем не менее, некоторые браузеры генерируют это событие.

**Когда ничего не выбрано, `selectionStart` и `selectionEnd` равны позиции курсора.**

Иными словами, когда ничего не выбрано, выборка схлопнута на позиции курсора.

Мы можем использовать это, чтобы передвигать курсор:

```html run
<textarea id="area" style="width:80%;height:60px">
Устанавливаю курсор после 10 символа, когда получаю фокус
</textarea>

<script>
  area.onfocus = () => {
    // нулевая задержка setTimeout нужна
    // чтобы это сработало после действия `browser focus`
    setTimeout(() => {
      // мы можем задать любое выделение
      // если начало и конец совпадают, курсор устанавливается на этом месте
      area.selectionStart = area.selectionEnd = 10;
    });
  };
</script>
```

...Или вставить что-то в том месте, где курсор установлен, используя `setRangeText`.

Ниже представлена кнопка, которая заменяет выделенный текст на `"TEXT"` и устанавливает курсор сразу после вставленного текста. Если ничего не выделено, текст будет вставлен на позиции курсора:

```html run
<textarea id="area" style="width:80%;height:60px">Выделите что-нибудь</textarea>
<br>

<button id="button">Вставить!</button>

<script>
  button.onclick = () => {
    // заменить диапазон на "TEXT" и схлопнуть выделение к концу
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