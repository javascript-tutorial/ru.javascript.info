libs:
  - d3
  - domtree

---

# DOM-дерево

<<<<<<< HEAD
Основой HTML-документа являются теги.

В соответствии с объектной моделью документа ("Document Object Model", коротко DOM), каждый HTML-тег является объектом. Вложенные теги являются "детьми" родительского элемента. Текст, который находится внутри тега, также является объектом.

Все эти объекты доступны при помощи JavaScript, мы можем использовать их для изменения страницы.

Например, `document.body` - объект для тега `<body>`.
=======
The backbone of an HTML document is tags.

According to the Document Object Model (DOM), every HTML tag is an object. Nested tags are  "children" of the enclosing one. The text inside a tag is an object as well.

All these objects are accessible using JavaScript, and we can use them to modify the page.

For example, `document.body` is the object representing the `<body>` tag.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Если запустить этот код, то `<body>` станет красным на 3 секунды:

```js run
document.body.style.background = 'red'; // сделать фон красным

setTimeout(() => document.body.style.background = '', 3000); // вернуть назад
```

<<<<<<< HEAD
Это был лишь небольшой пример того, что может DOM. Скоро мы изучим много способов работать с DOM, но сначала нужно познакомиться с его структурой.

## Пример DOM

Начнём с такого, простого, документа:
=======
Here we used `style.background` to change the background color of `document.body`, but there are many other properties, such as:

- `innerHTML` -- HTML contents of the node.
- `offsetWidth` -- the node width (in pixels)
- ...and so on.

Soon we'll learn more ways to manipulate the DOM, but first we need to know about its structure.

## An example of the DOM

Let's start with the following simple document:
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

```html run no-beautify
<!DOCTYPE HTML>
<html>
<head>
<<<<<<< HEAD
  <title>О лосях</title>
</head>
<body>
  Правда о лосях.
=======
  <title>About elk</title>
</head>
<body>
  The truth about elk.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425
</body>
</html>
```

DOM -- это представление HTML-документа в виде дерева тегов. Вот как оно выглядит:

<div class="domtree"></div>

<script>
<<<<<<< HEAD
let node1 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n    "},{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"О лосях"}]},{"name":"#text","nodeType":3,"content":"\n  "}]},{"name":"#text","nodeType":3,"content":"\n  "},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  Правда о лосях.\n"}]}]}
=======
let node1 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  "},{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"About elk"}]},{"name":"#text","nodeType":3,"content":"\n"}]},{"name":"#text","nodeType":3,"content":"\n"},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  The truth about elk.\n"}]}]}
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

drawHtmlTree(node1, 'div.domtree', 690, 320);
</script>

```online
На рисунке выше узлы-элементы можно кликать, и их дети будут скрываться и раскрываться.
```

Каждый узел этого дерева - это объект.

<<<<<<< HEAD
Теги являются *узлами-элементами* (или просто элементами). Они образуют структуру дерева: `<html>` -- это корневой узел, `<head>` и `<body>` его дочерние узлы и т.д.
=======
Tags are *element nodes* (or just elements) and form the tree structure: `<html>` is at the root, then `<head>` and `<body>` are its children, etc.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Текст внутри элементов образует *текстовые узлы*, обозначенные как `#text`. Текстовый узел содержит в себе только строку текста. У него не может быть потомков, т.е. он находится всегда на самом нижнем уровне.

<<<<<<< HEAD
Например, в теге `<title>` есть текстовый узел `"О лосях"`.
=======
For instance, the `<title>` tag has the text `"About elk"`.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Обратите внимание на специальные символы в текстовых узлах:

- перевод строки: `↵` (в JavaScript он обозначается как `\n`)
- пробел: `␣`

<<<<<<< HEAD
Пробелы и переводы строки -- это полноправные символы, как буквы и цифры. Они образуют текстовые узлы и становятся частью дерева DOM. Так, в примере выше в теге `<head>` есть несколько пробелов перед `<title>`, которые образуют текстовый узел `#text` (он содержит в себе только перенос строки и несколько пробелов).

Существует всего два исключения из этого правила:
1. По историческим причинам пробелы и перевод строки перед тегом `<head>` игнорируются
2. Если мы записываем что-либо после закрывающего тега `</body>`, браузер автоматически перемещает эту запись в конец `body`, поскольку спецификация HTML требует, чтобы всё содержимое было внутри `<body>`. Поэтому после закрывающего тега `</body>` не может быть никаких пробелов.

В остальных случаях всё просто -- если в документе есть пробелы (или любые другие символы), они становятся текстовыми узлами дерева DOM, и если мы их удалим, то в DOM их тоже не будет.
=======
Spaces and newlines are totally valid characters, like letters and digits. They form text nodes and become a part of the DOM. So, for instance, in the example above the `<head>` tag contains some spaces before `<title>`, and that text becomes a `#text` node (it contains a newline and some spaces only).

There are only two top-level exclusions:
1. Spaces and newlines before `<head>` are ignored for historical reasons.
2. If we put something after `</body>`, then that is automatically moved inside the `body`, at the end, as the HTML spec requires that all content must be inside `<body>`. So there can't be any spaces after `</body>`.

In other cases everything's straightforward -- if there are spaces (just like any character) in the document, then they become text nodes in the DOM, and if we remove them, then there won't be any.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Здесь пробельных текстовых узлов нет:

```html no-beautify
<!DOCTYPE HTML>
<<<<<<< HEAD
<html><head><title>О лосях</title></head><body>Правда о лосях.</body></html>
=======
<html><head><title>About elk</title></head><body>The truth about elk.</body></html>
>>>>>>> a82915575863d33db6b892087975f84dea6cb425
```

<div class="domtree"></div>

<script>
<<<<<<< HEAD
let node2 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"О лосях"}]}]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Правда о лосях."}]}]}
=======
let node2 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"About elk"}]}]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"The truth about elk."}]}]}
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

drawHtmlTree(node2, 'div.domtree', 690, 210);
</script>

```smart header="Пробелы по краям строк и пробельные текстовые узлы скрыты в инструментах разработки"
Когда мы работаем с деревом DOM, используя инструменты разработчика в браузере (которые мы рассмотрим позже), пробелы в начале/конце текста и пустые текстовые узлы (переносы строк) между тегами обычно не отображаются.

Таким образом инструменты разработки экономят место на экране.

В дальнейших иллюстрациях DOM мы также будем для краткости пропускать пробельные текстовые узлы там, где они не имеют значения. Обычно они не влияют на то, как отображается документ.
```

## Автоисправление

<<<<<<< HEAD
Если браузер сталкивается с некорректно написанным HTML-кодом, он автоматически корректирует его при построении DOM.

Например, в начале документа всегда должен быть тег `<html>`. Даже если его нет в документе -- он будет в дереве DOM, браузер его создаст. То же самое касается и тега `<body>`.

Например, если HTML-файл состоит из единственного слова `"Привет"`, браузер обернёт его в теги `<html>` и `<body>`, добавит необходимый тег `<head>`, и DOM будет выглядеть так:
=======
If the browser encounters malformed HTML, it automatically corrects it when making the DOM.

For instance, the top tag is always `<html>`. Even if it doesn't exist in the document, it will exist in the DOM, because the browser will create it. The same goes for `<body>`.

As an example, if the HTML file is the single word `"Hello"`, the browser will wrap it into `<html>` and `<body>`, and add the required `<head>`, and the DOM will be:
>>>>>>> a82915575863d33db6b892087975f84dea6cb425


<div class="domtree"></div>

<script>
let node3 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Привет"}]}]}

drawHtmlTree(node3, 'div.domtree', 690, 150);
</script>

При генерации DOM браузер самостоятельно обрабатывает ошибки в документе, закрывает теги и так далее.

<<<<<<< HEAD
Есть такой документ с незакрытыми тегами:
=======
A document with unclosed tags:
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

```html no-beautify
<p>Привет
<li>Мама
<li>и
<li>Папа
```

<<<<<<< HEAD
...Но DOM будет нормальным, потому что браузер сам закроет теги и восстановит отсутствующие детали:
=======
...will become a normal DOM as the browser reads tags and restores the missing parts:
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

<div class="domtree"></div>

<script>
let node4 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"P","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Привет"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Мама"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"и"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Папа"}]}]}]}

drawHtmlTree(node4, 'div.domtree', 690, 360);
</script>

<<<<<<< HEAD
````warn header="Таблицы всегда содержат `<tbody>`"
Важный "особый случай" -- работа с таблицами. По стандарту DOM у них должен быть `<tbody>`, но в HTML их можно написать (официально) без него. В этом случае браузер добавляет `<tbody>` в DOM самостоятельно.
=======
````warn header="Tables always have `<tbody>`"
An interesting "special case" is tables. By DOM specification they must have `<tbody>` tag, but HTML text may omit it. Then the browser creates `<tbody>` in the DOM automatically.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Для такого HTML:

```html no-beautify
<table id="table"><tr><td>1</td></tr></table>
```

DOM-структура будет такой:
<div class="domtree"></div>

<script>
let node5 = {"name":"TABLE","nodeType":1,"children":[{"name":"TBODY","nodeType":1,"children":[{"name":"TR","nodeType":1,"children":[{"name":"TD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"1"}]}]}]}]};

drawHtmlTree(node5,  'div.domtree', 600, 200);
</script>

<<<<<<< HEAD
Видите? Из пустоты появился `<tbody>`, как будто документ и был таким. Важно знать об этом, иначе при работе с таблицами возможны сюрпризы.
=======
You see? The `<tbody>` appeared out of nowhere. We should keep this in mind while working with tables to avoid surprises.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425
````

## Другие типы узлов

Есть и некоторые другие типы узлов, кроме элементов и текстовых узлов.

Например, узел-комментарий:

```html
<!DOCTYPE HTML>
<html>
<body>
<<<<<<< HEAD
  Правда о лосях.
=======
  The truth about elk.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425
  <ol>
    <li>Лось -- животное хитрое</li>
*!*
    <!-- комментарий -->
*/!*
    <li>...и коварное!</li>
  </ol>
</body>
</html>
```

<div class="domtree"></div>

<script>
<<<<<<< HEAD
let node6 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  Правда о лосях.\n    "},{"name":"OL","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n      "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Лось -- животное хитрое"}]},{"name":"#text","nodeType":3,"content":"\n      "},{"name":"#comment","nodeType":8,"content":"комментарий"},{"name":"#text","nodeType":3,"content":"\n      "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"...и коварное!"}]},{"name":"#text","nodeType":3,"content":"\n    "}]},{"name":"#text","nodeType":3,"content":"\n  \n"}]}]};
=======
let node6 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  The truth about elk.\n  "},{"name":"OL","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n    "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"An elk is a smart"}]},{"name":"#text","nodeType":3,"content":"\n    "},{"name":"#comment","nodeType":8,"content":"comment"},{"name":"#text","nodeType":3,"content":"\n    "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"...and cunning animal!"}]},{"name":"#text","nodeType":3,"content":"\n  "}]},{"name":"#text","nodeType":3,"content":"\n\n\n"}]}]};
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

drawHtmlTree(node6, 'div.domtree', 690, 500);
</script>

Здесь мы видим узел нового типа -- *комментарий*, обозначенный как `#comment`, между двумя текстовыми узлами.

Казалось бы -- зачем комментарий в DOM? Он никак не влияет на визуальное отображение. Но есть важное правило: если что-то есть в HTML, то оно должно быть в DOM-дереве.

**Все, что есть в HTML, даже комментарии, является частью DOM.**

<<<<<<< HEAD
Даже директива `<!DOCTYPE...>`, которую мы ставим в начале HTML, тоже является DOM-узлом. Она находится в дереве DOM прямо перед `<html>`. Мы не будем рассматривать этот узел, мы даже не рисуем его на наших диаграммах, но он существует.
=======
Even the `<!DOCTYPE...>` directive at the very beginning of HTML is also a DOM node. It's in the DOM tree right before `<html>`. Few people know about that. We are not going to touch that node, we even don't draw it on diagrams, but it's there.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Даже объект `document`, представляющий весь документ, формально является DOM-узлом.

Существует [12 типов узлов](https://dom.spec.whatwg.org/#node). Но на практике мы в основном работаем с 4 из них:

<<<<<<< HEAD
1. `document` -- "входная точка" в DOM.
2. узлы-элементы -- HTML-теги, основные строительные блоки.
3. текстовые узлы -- содержат текст.
4. комментарии -- иногда в них можно включить информацию, которая не будет показана, но доступна в DOM для чтения JS.
=======
1. `document` -- the "entry point" into DOM.
2. element nodes -- HTML-tags, the tree building blocks.
3. text nodes -- contain text.
4. comments -- sometimes we can put information there, it won't be shown, but JS can read it from the DOM.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

## Поэкспериментируйте сами

<<<<<<< HEAD
Чтобы посмотреть структуру DOM в реальном времени, попробуйте [Live DOM Viewer](http://software.hixie.ch/utilities/js/live-dom-viewer/). Просто введите что-нибудь в поле, и ниже вы увидите, как меняется DOM.
=======
To see the DOM structure in real-time, try [Live DOM Viewer](http://software.hixie.ch/utilities/js/live-dom-viewer/). Just type in the document, and it will show up as a DOM at an instant.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Другой способ исследовать DOM - это использовать инструменты разработчика браузера. Это то, что мы каждый день делаем при разработке.

<<<<<<< HEAD
Для этого откройте страницу [elks.html](elks.html), включите инструменты разработчика и перейдите на вкладку Elements.
=======
To do so, open the web page [elk.html](elk.html), turn on the browser developer tools and switch to the Elements tab.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Выглядит примерно так:

![](elk.svg)

Вы можете увидеть DOM, понажимать на элементы, детально рассмотреть их и так далее.

Обратите внимание, что структура DOM в инструментах разработчика отображается в упрощённом виде. Текстовые узлы показаны как простой текст. И кроме пробелов нет никаких "пустых" текстовых узлов. Ну и отлично, потому что большую часть времени нас будут интересовать узлы-элементы.

<<<<<<< HEAD
Клик по этой <span class="devtools" style="background-position:-328px -124px"></span> кнопке в левом верхнем углу инспектора позволяет при помощи мыши (или другого устройства ввода) выбрать элемент на веб-странице и "проинспектировать" его (браузер сам найдёт и отметит его во вкладке Elements). Этот способ отлично подходит, когда у нас огромная HTML-страница (и соответствующий ей огромный DOM), и мы хотим увидеть, где находится интересующий нас элемент.
=======
Clicking the <span class="devtools" style="background-position:-328px -124px"></span> button in the left-upper corner allows us to choose a node from the webpage using a mouse (or other pointer devices) and "inspect" it (scroll to it in the Elements tab). This works great when we have a huge HTML page (and corresponding huge DOM) and would like to see the place of a particular element in it.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Есть и другой способ сделать это: можно кликнуть на странице по элементу правой кнопкой мыши и в контекстном меню выбрать "Inspect".

![](inspect.svg)

В правой части инструментов разработчика находятся следующие подразделы:
- **Styles** -- здесь мы видим CSS, применённый к текущему элементу: правило за правилом, включая встроенные стили (выделены серым). Почти всё можно отредактировать на месте, включая размеры, внешние и внутренние отступы.
- **Computed** -- здесь мы видим итоговые CSS-свойства элемента, которые он приобрёл в результате применения всего каскада стилей (в том числе унаследованные свойства и т.д.).
- **Event Listeners** -- в этом разделе мы видим обработчики событий, привязанные к DOM-элементам (мы поговорим о них в следующей части учебника).
- ... и т.д.

Лучший способ изучить инструменты разработчика -- это прокликать их. Большинство значений можно менять и тут же смотреть результат.

## Взаимодействие с консолью

При работе с DOM нам часто требуется применить к нему JavaScript. Например: получить узел и запустить какой-нибудь код для его изменения, чтобы посмотреть результат. Вот несколько подсказок, как перемещаться между вкладками Elements и Console.

Для начала:

1. На вкладке Elements выберите первый элемент `<li>`.
2. Нажмите `key:Esc` -- прямо под вкладкой Elements откроется Console.

Последний элемент, выбранный во вкладке Elements, доступен в консоли как `$0`; предыдущий, выбранный до него, как `$1` и т.д.

Теперь мы можем запускать на них команды. Например `$0.style.background = 'red'` сделает выбранный элемент красным, как здесь:

![](domconsole0.svg)

Это мы посмотрели как получить узел из Elements в Console.

Есть и обратный путь: если есть переменная `node`, ссылающаяся на DOM-узел, можно использовать в консоли команду `inspect(node)`, чтобы увидеть этот элемент во вкладке Elements.

<<<<<<< HEAD
Или мы можем просто вывести DOM-узел в консоль и исследовать "на месте", как `document.body` ниже:
=======
Or we can just output the DOM node in the console and explore "in-place", like `document.body` below:
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

![](domconsole1.svg)

Это может быть полезно для отладки. В следующей главе мы рассмотрим доступ и изменение DOM при помощи JavaScript.

Инструменты разработчика браузера отлично помогают в разработке: мы можем исследовать DOM, пробовать с ним что-то делать и смотреть, что идёт не так.

## Итого

HTML/XML документы представлены в браузере в виде DOM-дерева.

- Теги становятся узлами-элементами и формируют структуру документа.
- Текст становится текстовыми узлами.
- ... и т.д. Всё, что записано в HTML, есть и в DOM-дереве, даже комментарии.

Для изменения элементов или проверки DOM-дерева мы можем использовать инструменты разработчика в браузере.

Здесь мы рассмотрели основы, наиболее часто используемые и важные действия для начала разработки. Подробную документацию по инструментам разработки Chrome Developer Tools можно найти на странице <https://developers.google.com/web/tools/chrome-devtools>. Лучший способ изучить инструменты -- походить по разным вкладкам, почитать меню: большинство действий очевидны для пользователя. Позже, когда вы немного их изучите, прочитайте документацию и узнайте то, что осталось.

<<<<<<< HEAD
У DOM-узлов есть свойства и методы, которые позволяют выбирать любой из элементов, изменять, перемещать их на странице и многое другое. Мы вернёмся к ним в последующих разделах.
=======
DOM nodes have properties and methods that allow us to travel between them, modify them, move around the page, and more. We'll get down to them in the next chapters.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425
