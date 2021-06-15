libs:
  - d3
  - domtree

---

# Selection и Range

В этой главе мы рассмотрим выделение как в документе, так и в полях формы, таких как `<input>`.

<<<<<<< HEAD
JavaScript позволяет получать существующее выделение, выделять и снимать выделение как целиком, так и по частям, убирать выделенную часть из документа, оборачивать её в тег и так далее.

Вы можете получить готовые решения в секции "Итого" в конце статьи, но узнаете гораздо больше, если прочитаете главу целиком. Используемые для выделения встроенные объекты `Range` и `Selection` просты для понимания, и после их изучения вам уже не понадобятся "готовые рецепты", чтобы сделать всё, что захотите.

## Range

В основе выделения лежит [Range](https://dom.spec.whatwg.org/#ranges) -- диапазон. Он представляет собой пару "граничных точек": начало и конец диапазона.

Каждая точка представлена как родительский DOM-узел с относительным смещением от начала. Если этот узел - DOM-элемент, то смещение - это номер дочернего элемента, а для текстового узла смещение - позиция в тексте. Скоро будут примеры.

Давайте что-нибудь выделим.

Для начала мы создадим диапазон (конструктор не имеет параметров):
=======
JavaScript can access an existing selection, select/deselect DOM nodes as a whole or partially, remove the selected content from the document, wrap it into a tag, and so on.

You can find some recipes for common tasks at the end of the chapter, in "Summary" section. Maybe that covers your current needs, but you'll get much more if you read the whole text.

The underlying `Range` and `Selection` objects are easy to grasp, and then you'll need no recipes to make them do what you want.

## Range

The basic concept of selection is [Range](https://dom.spec.whatwg.org/#ranges), that is essentially a pair of "boundary points": range start and range end.

A `Range` object is created without parameters:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let range = new Range();
```

Затем мы установим границы выделения, используя `range.setStart(node, offset)` и `range.setEnd(node, offset)`.

<<<<<<< HEAD
Например, рассмотрим этот фрагмент HTML-кода:
=======
As you might guess, further we'll use the `Range` objects for selection, but first let's create few such objects.

### Selecting the text partially

The interesting thing is that the first argument `node` in both methods can be either a text node or an element node, and the meaning of the second argument depends on that.

**If `node` is a text node, then `offset` must be the position in its text.**

For example, given the element `<p>Hello</p>`, we can create the range containing the letters "ll" as follows:

```html run
<p id="p">Hello</p>
<script>
  let range = new Range();
  range.setStart(p.firstChild, 2);
  range.setEnd(p.firstChild, 4);
  
  // toString of a range returns its content as text
  console.log(range); // ll
</script>
```

Here we take the first child of `<p>` (that's the text node) and specify the text positions inside it:

![](range-hello-1.svg)

### Selecting element nodes

**Alternatively, if `node` is an element node, then `offset` must be the child number.** 
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

That's handy for making ranges that contain nodes as a whole, not stop somewhere inside their text.

For example, we have a more complex document fragment:

```html autorun
<p id="p">Example: <i>italic</i> and <b>bold</b></p>
```

<<<<<<< HEAD
Взглянем на его DOM-структуру, обратите внимание на текстовые узлы, они важны для нас:
=======
Here's its DOM structure with both element and text nodes:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
Выделим `"Example: <i>italic</i>"`. Это первые два дочерних узла тега `<p>` (учитывая текстовые узлы):
=======
Let's make a range for `"Example: <i>italic</i>"`.

As we can see, this phrase consists of exactly two children of `<p>`, with indexes `0` and `1`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

![](range-example-p-0-1.svg)

- The starting point has `<p>` as the parent `node`, and `0` as the offset.

    So we can set it as `range.setStart(p, 0)`.
- The ending point also has `<p>` as the parent `node`, but `2` as the offset (it specifies the range up to, but not including `offset`).

    So we can set it as `range.setEnd(p, 2)`.

Here's the demo. If you run it, you can see that the text gets selected:

```html run
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
*!*
  let range = new Range();

  range.setStart(p, 0);
  range.setEnd(p, 2);
*/!*

<<<<<<< HEAD
  // toString, вызванный у экземпляра Range, возвращает его содержимое в виде текста (без тегов)
  alert(range); // Example: italic

  // применим этот диапазон к выделению документа (объясняется далее)
=======
  // toString of a range returns its content as text, without tags
  console.log(range); // Example: italic

  // apply this range for document selection (explained later below)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  document.getSelection().addRange(range);
</script>
```

<<<<<<< HEAD
- `range.setStart(p, 0)` -- устанавливает начало диапазона на нулевом дочернем элементе тега `<p>` (Это текстовый узел `"Example: "`).
- `range.setEnd(p, 2)` -- расширяет диапазон до 2го (но не включая его) дочернего элемента тега `<p>` (это текстовый узел `" and "`, но так как конец не включён, последний включённый узел - это тег `<i>`).

Ниже представлен расширенный пример, в котором вы можете попробовать другие варианты:
=======
Here's a more flexible test stand where you can set range start/end numbers and explore other variants:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
    // применим выделение, объясняется далее
=======
    // apply the selection, explained later below
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
  };
</script>
```

<<<<<<< HEAD
К примеру, выделение с `1` до `4` возвращает следующий диапазон `<i>italic</i> and <b>bold</b>`.

![](range-example-p-1-3.svg)

Не обязательно использовать один и тот же элемент в `setStart` и `setEnd`. Диапазон может охватывать множество не связанных между собой элементов. Важно лишь чтобы конец шёл после начала.

### Выделение частей текстовых узлов

Давайте выделим текст частично, как показано ниже:

![](range-example-p-2-b-3.svg)

Это также возможно, нужно просто установить начало и конец как относительное смещение в текстовых узлах.
=======
E.g. selecting in the same `<p>` from offset `1` to `4` gives us the range `<i>italic</i> and <b>bold</b>`:

![](range-example-p-1-3.svg)

```smart header="Starting and ending nodes can be different"
We don't have to use the same node in `setStart` and `setEnd`. A range may span across many unrelated nodes. It's only important that the end is after the start in the document.
```

### Selecting a bigger fragment

Let's make a bigger selection in our example, like this:

![](range-example-p-2-b-3.svg)

We already know how to do that. We just need to set the start and the end as a relative offset in text nodes.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Нам нужно создать диапазон, который:
- начинается со второй позиции первого дочернего узла тега `<p>` (захватываем всё, кроме первых двух букв "Ex<b>ample:</b> ")
- заканчивается на 3 позиции первого дочернего узла тега `<b>` (захватываем первые три буквы "<b>bol</b>d", но не более):

```html run
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();

  range.setStart(p.firstChild, 2);
  range.setEnd(p.querySelector('b').firstChild, 3);

  console.log(range); // ample: italic and bol

  // применим выделение к документу  (объясняется далее)
  window.getSelection().addRange(range);
</script>
```

<<<<<<< HEAD
Объект диапазона Range имеет следующие свойства:
=======
As you can see, it's fairly easy to make a range of whatever we want.

If we'd like to take nodes as a whole, we can pass elements in `setStart/setEnd`. Otherwise, we can work on the text level. 

## Range properties

The range object that we created in the example above has following properties:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

![](range-example-p-2-b-3-range.svg)

- `startContainer`, `startOffset` -- узел и начальное смещение,
  - в примере выше: первый текстовый узел внутри тега `<p>` и `2`.
- `endContainer`, `endOffset` -- узел и конечное смещение,
  - в примере выше: первый текстовый узел внутри тега `<b>` и `3`.
- `collapsed` -- boolean, `true`, если диапазон начинается и заканчивается на одном и том же месте (следовательно, в диапазон ничего не входит),
  - в примере выше: `false`
- `commonAncestorContainer` -- ближайший общий предок всех узлов в пределах диапазона,
  - в примере выше: `<p>`

<<<<<<< HEAD
## Методы Range
=======

## Range selection methods
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Существует множество удобных методов для манипулирования диапазонами.

<<<<<<< HEAD
Установить начало диапазона:
=======
We've already seen `setStart` and `setEnd`, here are other similar methods.

Set range start:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- `setStart(node, offset)` установить начальную границу в позицию `offset` в `node`
- `setStartBefore(node)` установить начальную границу прямо перед `node`
- `setStartAfter(node)` установить начальную границу прямо после `node`

Установить конец диапазона (похожи на предыдущие методы):

- `setEnd(node, offset)` установить конечную границу в позицию `offset` в `node`
- `setEndBefore(node)` установить конечную границу прямо перед `node`
- `setEndAfter(node)` установить конечную границу прямо после `node`

<<<<<<< HEAD
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
=======
Technically, `setStart/setEnd` can do anything, but more methods provide more convenience.

In all these methods, `node` can be both a text or element node: for text nodes `offset` skips that many of characters, while for element nodes that many child nodes.

Even more methods to create ranges:
- `selectNode(node)` set range to select the whole `node`
- `selectNodeContents(node)` set range to select the whole `node` contents
- `collapse(toStart)` if `toStart=true` set end=start, otherwise set start=end, thus collapsing the range
- `cloneRange()` creates a new range with the same start/end

## Range editing methods

Once the range is created, we can manipulate its content using these methods:

- `deleteContents()` -- remove range content from the document
- `extractContents()` -- remove range content from the document and return as [DocumentFragment](info:modifying-document#document-fragment)
- `cloneContents()` -- clone range content and return as [DocumentFragment](info:modifying-document#document-fragment)
- `insertNode(node)` -- insert `node` into the document at the beginning of the range
- `surroundContents(node)` -- wrap `node` around range content. For this to work, the range must contain both opening and closing tags for all elements inside it: no partial ranges like `<i>abc`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Используя эти методы, мы можем делать с выделенными узлами что угодно.

Проверим описанные методы в действии:

<<<<<<< HEAD
```html run autorun height=260
Нажмите на кнопку, чтобы соответствующий метод отработал на выделении, или на "resetExample", чтобы восстановить выделение как было.
=======
```html run refresh autorun height=260
Click buttons to run methods on the selection, "resetExample" to reset it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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
      } catch(e) { console.log(e) }
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

<<<<<<< HEAD
Также существуют методы сравнения диапазонов, но они редко используются. Когда они вам понадобятся, вы можете прочитать о них в [спецификации](https://dom.spec.whatwg.org/#interface-range) или [справочнике MDN](https://developer.mozilla.org/ru/docs/Web/API/Range).
=======
There also exist methods to compare ranges, but these are rarely used. When you need them, please refer to the [spec](https://dom.spec.whatwg.org/#interface-range) or [MDN manual](mdn:/api/Range).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c


## Selection

<<<<<<< HEAD
`Range` это общий объект для управления диапазонами выделения. Мы можем создавать и передавать подобные объекты. Сами по себе они ничего визуально не выделяют.

Выделение в документе представлено объектом `Selection`, который может быть получен как `window.getSelection()` или `document.getSelection()`.

Выделение может включать ноль или более диапазонов. По крайней мере, так утверждается в [Спецификации Selection API](https://www.w3.org/TR/selection-api/). На практике же выделить несколько диапазонов в документе можно только в Firefox, используя `key:Ctrl+click` (`key:Cmd+click` для Mac).
=======
`Range` is a generic object for managing selection ranges. Although, creating a `Range` doesn't mean that we see a selection on screen.

We may create `Range` objects, pass them around -- they do not visually select anything on their own.

The document selection is represented by `Selection` object, that can be obtained as `window.getSelection()` or `document.getSelection()`. A selection may include zero or more ranges. At least, the [Selection API specification](https://www.w3.org/TR/selection-api/) says so. In practice though, only Firefox allows to select multiple ranges in the document by using `key:Ctrl+click` (`key:Cmd+click` for Mac).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ниже представлен скриншот выделения с 3 диапазонами, сделанный в Firefox:

![](selection-firefox.svg)

Остальные браузеры поддерживают максимум 1 диапазон. Как мы увидим далее, некоторые методы `Selection` подразумевают, что может быть несколько диапазонов, но, как было сказано ранее, во всех браузерах, кроме Firefox, может быть не более одного диапазона.

<<<<<<< HEAD
## Свойства Selection

Аналогично диапазону, выделение имеет начальную границу, именуемую "якорем", и конечную, называемую "фокусом".
=======
Here's a small demo that shows the current selection (select something and click) as text:

<button onclick="alert(document.getSelection())">alert(document.getSelection())</button>

## Selection properties

As said, a selection may in theory contain multiple ranges. We can get these range objects using the method:

- `getRangeAt(i)` -- get i-th range, starting from `0`. In all browsers except Firefox, only `0` is used.

Also, there exist properties that often provide better convenience.

Similar to a range, a selection object has a start, called "anchor", and the end, called "focus".
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Основные свойства выделения:

- `anchorNode` -- узел, с которого начинается выделение,
- `anchorOffset` -- смещение в  `anchorNode`, где начинается выделение,
- `focusNode` -- узел, на котором выделение заканчивается,
- `focusOffset` -- смещение в  `focusNode`, где выделение заканчивается,
- `isCollapsed` -- `true`, если диапазон выделения пуст или не существует.
- `rangeCount` -- количество диапазонов в выделении, максимум `1` во всех браузерах, кроме Firefox.

<<<<<<< HEAD
````smart header="Конец выделения может быть в документе до его начала"
Существует несколько методов выделить содержимое, в зависимости от устройства пользователя: мышь, горячие клавиши, нажатия пальцем и другие.

Некоторые из них, такие как мышь, позволяют создавать выделение в обоих направлениях: слева направо и справа налево.

Если начало (якорь) выделения идёт в документе перед концом (фокус), говорят, что такое выделение "направлено вперёд".
=======
```smart header="Selection end/start vs Range"

There's an important differences of a selection anchor/focus compared with a `Range` start/end.

As we know, `Range` objects always have their start before the end. 

For selections, that's not always the case.

Selecting something with a mouse can be done in both directions: either "left-to-right" or "right-to-left".

In other words, when the mouse button is pressed, and then it moves forward in the document, then its end (focus) will be after its start (anchor).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

К примеру, если пользователь начинает выделение с помощью мыши в направлении от "Example" до "italic":

![](selection-direction-forward.svg)

<<<<<<< HEAD
Иначе, если выделение идёт от "italic" до "Example", выделение идёт в "обратном" направлении, его фокус будет перед якорем:

![](selection-direction-backward.svg)

Это отличается от объектов `Range`, которые всегда направлены вперёд: начало диапазона не может стоять после его конца.
````
=======
...But the same selection could be done backwards: starting from  "italic" to "Example" (backward direction), then its end (focus) will be before the start (anchor):

![](selection-direction-backward.svg)
```
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## События при выделении

Существуют события, позволяющие отслеживать выделение:

<<<<<<< HEAD
- `elem.onselectstart` -- когда с elem начинается выделение, например пользовать начинает двигать мышкой с зажатой кнопкой.
    - preventDefault() отменяет начало выделения.
- `document.onselectionchange` -- когда выделение изменено.
    - Заметьте: этот обработчик можно поставить только на `document`.
=======
- `elem.onselectstart` -- when a selection *starts* specifically on element `elem` (or inside it). For instance, when the user presses the mouse button on it and starts to move the pointer.
    - Preventing the default action cancels the selection start. So starting a selection from this element becomes impossible, but the element is still selectable. The visitor just needs to start the selection from elsewhere.
- `document.onselectionchange` -- whenever a selection changes or starts.
    - Please note: this handler can be set only on `document`, it tracks all selections in it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

### Демо отслеживания выделения

<<<<<<< HEAD
Ниже представлено небольшое демо.
В нём границы выделения выводятся динамически по мере того, как оно меняется:
=======
Here's a small demo. It tracks the current selection on the `document` and shows its boundaries:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```html run height=80
<p id="p">Выдели меня: <i>курсив</i> и <b>жирный</b></p>

От <input id="from" disabled> – До <input id="to" disabled>
<script>
  document.onselectionchange = function() {
    let selection = document.getSelection();

    let {anchorNode, anchorOffset, focusNode, focusOffset} = selection;

    // anchorNode and focusNode are text nodes usually
    from.value = `${anchorNode?.data}, offset ${anchorOffset}`;
    to.value = `${focusNode?.data}, offset ${focusOffset}`;
  };
</script>
```

<<<<<<< HEAD
 ### Демо получения выделения

Чтобы получить всё выделение:
- Как текст: просто вызовите `document.getSelection().toString()`.
- Как DOM-элементы: получите выделенные диапазоны и вызовите их метод `cloneContents()` (только первый диапазон, если мы не поддерживаем мультивыделение в Firefox).

Ниже представлено демо получения выделения как в виде текста, так и в виде DOM-узлов:
=======
### Selection copying demo

There are two approaches to copying the selected content:

1. We can use `document.getSelection().toString()` to get it as text.
2. Otherwise, to copy the full DOM, e.g. if we need to keep formatting, we can get the underlying ranges with `getRangesAt(...)`. A `Range` object, in turn, has `cloneContents()` method that clones its content and returns as `DocumentFragment` object, that we can insert elsewhere.

Here's the demo of copying the selected content both as text and as DOM nodes:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```html run height=100
<p id="p">Выдели меня: <i>курсив</i> и <b>жирный</b></p>

Склонировано: <span id="cloned"></span>
<br>
Как текст: <span id="astext"></span>

<script>
  document.onselectionchange = function() {
    let selection = document.getSelection();

    cloned.innerHTML = astext.innerHTML = "";

    // Клонируем DOM-элементы из диапазонов (здесь мы поддерживаем множественное выделение)
    for (let i = 0; i < selection.rangeCount; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }

    // Получаем как текст
    astext.innerHTML += selection;
  };
</script>
```

## Методы Selection

<<<<<<< HEAD
Методы Selection для добавления и удаления диапазонов:

- `getRangeAt(i)` -- взять i-ый диапазон, начиная с `0`. Во всех браузерах, кроме Firefox, используется только `0`.
- `addRange(range)` -- добавить `range` в выделение. Все браузеры, кроме Firefox, проигнорируют этот вызов, если в выделении уже есть диапазон.
- `removeRange(range)` -- удалить `range` из выделения.
- `removeAllRanges()` -- удалить все диапазоны.
- `empty()` -- сокращение для `removeAllRanges`.

Также существуют методы управления диапазонами выделения напрямую, без обращения к Range:

- `collapse(node, offset)` -- заменить выделенный диапазон новым, который начинается и заканчивается на `node`, на позиции `offset`.
- `setPosition(node, offset)` -- то же самое, что `collapse` (дублирующий метод-псевдоним).
- `collapseToStart()` - схлопнуть (заменить на пустой диапазон) к началу выделения,
- `collapseToEnd()` - схлопнуть диапазон к концу выделения,
- `extend(node, offset)` - переместить фокус выделения к данному `node`, с позиции `offset`,
- `setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)` - заменить диапазон выделения на заданные начало `anchorNode/anchorOffset` и конец `focusNode/focusOffset`. Будет выделено всё содержимое между этими границами
- `selectAllChildren(node)` -- выделить все дочерние узлы данного узла `node`.
- `deleteFromDocument()` -- удалить содержимое выделения из документа.
- `containsNode(node, allowPartialContainment = false)` -- проверяет, содержит ли выделение `node` (частично, если второй аргумент равен `true`)

Так что для многих задач мы можем вызывать методы `Selection`, не обращаясь к связанному объекту `Range`.
=======
We can work with the selection by addding/removing ranges:

- `getRangeAt(i)` -- get i-th range, starting from `0`. In all browsers except Firefox, only `0` is used.
- `addRange(range)` -- add `range` to selection. All browsers except Firefox ignore the call, if the selection already has an associated range.
- `removeRange(range)` -- remove `range` from the selection.
- `removeAllRanges()` -- remove all ranges.
- `empty()` -- alias to `removeAllRanges`.

There are also convenience methods to manipulate the selection range directly, without intermediate `Range` calls:

- `collapse(node, offset)` -- replace selected range with a new one that starts and ends at the given `node`, at position `offset`.
- `setPosition(node, offset)` -- alias to `collapse`.
- `collapseToStart()` - collapse (replace with an empty range) to selection start,
- `collapseToEnd()` - collapse to selection end,
- `extend(node, offset)` - move focus of the selection to the given `node`, position `offset`,
- `setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)` - replace selection range with the given start `anchorNode/anchorOffset` and end `focusNode/focusOffset`. All content in-between them is selected.
- `selectAllChildren(node)` -- select all children of the `node`.
- `deleteFromDocument()` -- remove selected content from the document.
- `containsNode(node, allowPartialContainment = false)` -- checks whether the selection contains `node` (partially if the second argument is `true`)

For most tasks these methods are just fine, there's no need to access the underlying `Range` object.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

К примеру, выделение всего параграфа `<p>`:

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

<<<<<<< HEAD
```smart header="Чтобы что-то выделить, сначала снимите текущее выделение"
Если выделение уже существует, сначала снимите его, используя `removeAllRanges()`, и только затем добавляйте новые диапазоны. В противном случае все браузеры, кроме Firefox, проигнорируют добавление.

Исключением являются некоторые методы выделения, которые заменяют существующее выделение, например, `setBaseAndExtent`.
=======
```smart header="To select something, remove the existing selection first"
If a document selection already exists, empty it first with `removeAllRanges()`. And then add ranges. Otherwise, all browsers except Firefox ignore new ranges.

The exception is some selection methods, that replace the existing selection, such as `setBaseAndExtent`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

## Выделение в элементах форм

Элементы форм, такие как `input` и `textarea`, предоставляют [отдельное API для выделения](https://html.spec.whatwg.org/#textFieldSelection). Так как значения полей представляют собой простой текст, а не HTML, и нам не нужны такие сложные объекты, как `Range` и `Selection`.

<<<<<<< HEAD
Свойства:
- `input.selectionStart` -- позиция начала выделения (это свойство можно изменять),
- `input.selectionEnd` -- позиция конца выделения (это свойство можно изменять),
- `input.selectionDirection` -- направление выделения, одно из: "forward" (вперёд), "backward" (назад) или "none" (без направления, если, к примеру, выделено с помощью двойного клика мыши).
=======
Properties:
- `input.selectionStart` -- position of selection start (writeable),
- `input.selectionEnd` -- position of selection end (writeable),
- `input.selectionDirection` -- selection direction, one of: "forward", "backward" or "none" (if e.g. selected with a double mouse click),
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

События:
- `input.onselect` -- срабатывает, когда начинается выделение.

Методы:

- `input.select()` -- выделяет всё содержимое `input` (может быть `textarea` вместо `input`),
- `input.setSelectionRange(start, end, [direction])` -- изменить выделение, чтобы начиналось с позиции `start`, и заканчивалось `end`, в данном направлении `direction` (необязательный параметр).
- `input.setRangeText(replacement, [start], [end], [selectionMode])` -- заменяет выделенный текст в диапазоне новым.

    Если аргументы `start` и `end` указаны, то они задают начало и конец диапазона, иначе используется текущее выделение.

    Последний аргумент, `selectionMode`, определяет, как будет вести себя выделение после замены текста. Возможные значения:

    - `"select"` -- только что вставленный текст будет выделен.
    - `"start"` -- диапазон выделения схлопнется прямо перед вставленным текстом (так что курсор окажется непосредственно перед ним).
    - `"end"` -- диапазон выделения схлопнется прямо после вставленного текста (курсор окажется сразу после него).
    - `"preserve"` -- пытается сохранить выделение. Значение по умолчанию.

Давайте посмотрим на эти методы в действии.

### Пример: отслеживание выделения

К примеру, этот код использует событие `onselect`, чтобы отслеживать выделение:

```html run autorun
<textarea id="area" style="width:80%;height:60px">
Выделите что-нибудь в этом тексте, чтобы обновить значения ниже.
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

Заметьте:
- `onselect` срабатывает при выделении чего-либо, но не при снятии выделения.
- событие `document.onselectionchange` не должно срабатывать при выделении внутри элемента формы в соответствии со [спецификацией](https://w3c.github.io/selection-api/#dfn-selectionchange), так как оно не является выделением элементов в `document`. Хотя некоторые браузеры генерируют это событие, полагаться на это не стоит.


### Пример: изменение позиции курсора

Мы можем изменять `selectionStart` и `selectionEnd`, устанавливая выделение.

Важный граничный случай - когда `selectionStart` и `selectionEnd` равны друг другу. В этом случае они указывают на позицию курсора. Иными словами, когда ничего не выбрано, выделение схлопнуто на позиции курсора.

Таким образом, задавая `selectionStart` и `selectionEnd` одно и то же значение, мы можем передвигать курсор.

Например:

```html run autorun
<textarea id="area" style="width:80%;height:60px">
Переведите фокус на меня, курсор окажется на 10-й позиции
</textarea>

<script>
  area.onfocus = () => {
    // нулевая задержка setTimeout нужна, чтобы это сработало после получения фокуса элементом формы
    setTimeout(() => {
<<<<<<< HEAD
      // мы можем задать любое выделение
      // если начало и конец совпадают, курсор устанавливается на этом месте
=======
      // we can set any selection
      // if start=end, the cursor is exactly at that place
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
      area.selectionStart = area.selectionEnd = 10;
    });
  };
</script>
```

### Пример: изменение выделения

Чтобы изменять содержимое выделения, мы можем использовать метод `input.setRangeText`. Конечно, мы можем читать `selectionStart/End`  и, зная позиции выделения, изменять соответствующую подстроку в `value`, но `setRangeText` намного мощнее и, зачастую, удобнее.

Это довольно сложный метод. В простейшем случае он принимает один аргумент, заменяет содержание выделенной области и снимает выделение.

В этом примере выделенный текст будет обёрнут в `*...*`:

```html run autorun
<input id="input" style="width:200px" value="Select here and click the button">
<button id="button">Обернуть выделение звёздочками  *...*</button>

<script>
button.onclick = () => {
  if (input.selectionStart == input.selectionEnd) {
    return; // ничего не выделено
  }

  let selected = input.value.slice(input.selectionStart, input.selectionEnd);
  input.setRangeText(`*${selected}*`);
};
</script>
```

Передавая больше параметров, мы можем устанавливать `start` и `end`.

В этом примере мы найдём `"ЭТО"` в поле ввода, заменим его и оставим заменённый текст выделенным:

```html run autorun
<input id="input" style="width:200px" value="Замените ЭТО в тексте">
<button id="button">Заменить ЭТО</button>

<script>
button.onclick = () => {
  let pos = input.value.indexOf("ЭТО");
  if (pos >= 0) {
    input.setRangeText("*ЭТО*", pos, pos + 3, "select");
    input.focus(); // ставим фокус, чтобы выделение было видно
  }
};
</script>
```

### Пример: вставка на месте курсора

Если ничего не выделено, или мы указали одинаковые `start` и `end` в методе `setRangeText`, то текст просто вставляется, и ничего не удаляется.

Мы также можем вставить что-нибудь на текущей позиции курсора, используя `setRangeText`.

<<<<<<< HEAD
Кнопка в примере вставляет `"ПРИВЕТ"` на месте курсора и устанавливает его после вставленного текста. Если какой-то текст был выделен, он будет заменён (мы можем узнать о наличии выделения, проверив `selectionStart!=selectionEnd` и, если выделение есть, сделать что-то ещё):
=======
Here's a button that inserts `"HELLO"` at the cursor position and puts the cursor immediately after it. If the selection is not empty, then it gets replaced (we can detect it by comparing `selectionStart!=selectionEnd` and do something else instead):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```html run autorun
<input id="input" style="width:200px" value="Текст Текст Текст Текст Текст">
<button id="button">Вставить "ПРИВЕТ" на месте курсора</button>

<script>
  button.onclick = () => {
    input.setRangeText("ПРИВЕТ", input.selectionStart, input.selectionEnd, "end");
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

<<<<<<< HEAD
    После этого `elem` станет частью `document.getSelection()`, так что на самом деле выделение произойдёт, но его содержимое обычно игнорируется при копировании и вставке.
=======
    Then `elem` will become a part of `document.getSelection()`, so the selection actually happens, but its content is usually ignored in copy-paste.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c


2. Предотвратить действие по умолчанию в событии `onselectstart` или `mousedown`.

    ```html run
    <div>Можно выделить <div id="elem">Нельзя выделить</div> Можно выделить</div>

    <script>
      elem.onselectstart = () => false;
    </script>
    ```

    Этот способ также не даёт начать выделение с `elem`, но пользователь может начать с другого элемента, а затем расширить выделение до `elem`.

    Это удобно, когда есть другой обработчик события на том действии, которое запускает выделение (скажем, `mousedown`). Так что мы отключаем выделение, чтобы избежать конфликта.

    А содержимое `elem` при этом может быть скопировано.

3. Мы также можем очистить выделение после срабатывания с помощью `document.getSelection().empty()`. Этот способ используется редко, так как он вызывает нежелаемое мерцание при появлении и исчезновении выделения.

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

<<<<<<< HEAD
1. Получить выделение:
    ```js run
=======
1. Getting the selection:
    ```js
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    let selection = document.getSelection();

    let cloned = /* элемент, в который мы хотим скопировать выделенные узлы */;

    // затем применяем методы Range к selection.getRangeAt(0)
    // или, как здесь, ко всем диапазонам, чтобы поддерживать множественное выделение
    for (let i = 0; i < selection.rangeCount; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }
    ```
<<<<<<< HEAD
2. Установить выделение:
    ```js run
=======
2. Setting the selection:
    ```js
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    let selection = document.getSelection();

    // напрямую:
    selection.setBaseAndExtent(...from...to...);

    // или можно создать диапазон range и:
    selection.removeAllRanges();
    selection.addRange(range);
    ```

И пару слов о курсоре. Позиция курсора в редактируемых элементах, таких как `<textarea>`, всегда находится в начале или конце выделения.

Мы можем использовать это, как для того, чтобы получить позицию курсора, так и чтобы переместить его, установив `elem.selectionStart` и `elem.selectionEnd`.

P.S. Если вам нужна поддержка старого IE8-, посмотрите в [архивную статью](info:range-textrange-selection).
