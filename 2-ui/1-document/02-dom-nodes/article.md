libs:
  - d3
  - domtree

---

# DOM дерево

Основой HTML-документа являются теги.

<<<<<<< HEAD
В соответствии с объектной моделью документа ("Document Object Mode", коротко DOM), каждый HTML-тег является объектом. Вложенные теги являются "детьми" родительского элемента. Текст, который находится внутри тега, также является объектом.

Все эти объекты доступны при помощи JavaScript, мы можем использовать их для изменения страницы.

Например, `document.body` - объект для тега `<body>`.
=======
According to Document Object Model (DOM), every HTML-tag is an object. Nested tags are  "children" of the enclosing one. The text inside a tag it is an object as well.

All these objects are accessible using JavaScript, we can use them to modify the page.

For example, `document.body` is the object representing `<body>` tag.

Running this code will make the `<body>` red for 3 seconds:

```js run
document.body.style.background = 'red'; // make the background red

setTimeout(() => document.body.style.background = '', 3000); // return back
```

That was just a glimpse of DOM power. Soon we'll learn more ways to manipulate DOM, but first we need to know about its structure.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Если запустить этот код, то `<body>` станет красным на 3 секунды:

<<<<<<< HEAD
```js run
document.body.style.background = 'red'; // сделать фон красным

setTimeout(() => document.body.style.background = '', 3000); // вернуть назад
```

Это был лишь небольшой пример того, что может DOM. Скоро мы изучим много способов работать с DOM, но сначала нужно познакомиться с его структурой.

## Пример DOM

Начнём с такого, простого, документа:
=======
Let's start with the following simple docment:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```html run no-beautify
<!DOCTYPE HTML>
<html>
<head>
  <title>О лосях</title>
</head>
<body>
  Правда о лосях.
</body>
</html>
```

DOM -- это представление HTML-документа в виде дерева тегов. Вот как оно выглядит:

<div class="domtree"></div>

<script>
let node1 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n    "},{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"О лосях"}]},{"name":"#text","nodeType":3,"content":"\n  "}]},{"name":"#text","nodeType":3,"content":"\n  "},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  Правда о лосях."}]}]}

drawHtmlTree(node1, 'div.domtree', 690, 320);
</script>

```online
На рисунке выше, узлы-элементы можно кликать, и их дети будут скрываться и раскрываться.
```

<<<<<<< HEAD
Каждый узел этого дерева - это объект.

Теги являются *узлами-элементами* (или просто элементами). Они образуют структуру дерева: `<html>` -- это корневой узел, `<head>` и `<body>` его дочерние узлы, и т.д.
=======
Every tree node is an object.

Tags are *element nodes* (or just elements), they form the tree structure: `<html>` is at the root, then `<head>` and `<body>` are its children, etc.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Текст внутри элементов образует *текстовые узлы*, обозначенные как `#text`. Текстовый узел содержит в себе только строку текста. У него не может быть потомков, т.е. он находится всегда на самом нижнем уровне.

Например, в теге `<title>` есть текстовый узел `"О лосях"`.

Обратите внимание на специальные символы в текстовых узлах:

- перевод строки: `↵` (в JavaScript он обозначается как `\n`)
- пробел: `␣`

<<<<<<< HEAD
Пробелы и переводы строки -- это полноправные символы, как буквы и цифры. Они образуют текстовые узлы и становятся частью дерева DOM. Так, в примере выше в теге `<head>` есть несколько пробелов перед `<title>`, которые образуют текстовый узел `#text` (он содержит в себе только перенос строки и несколько пробелов).
=======
Spaces and newlines -- are totally valid characters, like letters and digits. They form text nodes and become a part of the DOM. So, for instance, in the example above the `<head>` tag contains some spaces before `<title>`, and that text becomes a `#text` node (it contains a newline and some spaces only).
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Существует всего два исключения из этого правила:
1. По историческим причинам пробелы и перевод строки перед тегом `<head>` игнорируются
2. Если мы записываем что-либо после закрывающего тега `</body>`, браузер автоматически перемещает эту запись в конец `body`, поскольку спецификация HTML требует чтобы все содержимое было внутри `<body>`. Поэтому после закрывающего тега `</body>` не может быть никаких пробелов.

В остальных случаях все просто -- если в документе есть пробелы (или любые другие символы), они становятся текстовыми узлами дерева DOM, и если мы их удалим, то в DOM их тоже не будет.

Здесь пробельных текстовых узлов нет:

```html no-beautify
<!DOCTYPE HTML>
<html><head><title>О лосях</title></head><body>Правда о лосях.</body></html>
```

<div class="domtree"></div>

<script>
let node2 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"О лосях"}]}]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Правда о лосях."}]}]}

drawHtmlTree(node2, 'div.domtree', 690, 210);
</script>

<<<<<<< HEAD
```smart header="Пробелы по краям строк и пробельные текстовые узлы скрыты в инструментах разработки"
Когда мы работаем с деревом DOM, используя инструменты разработчика в браузере (которые мы рассмотрим позже), пробелы в начале/конце текста и пустые текстовые узлы (переносы строк) между тегами обычно не отображаются.

Таким образом инструменты разработки экономят место на экране.

В дальнейших иллюстрациях DOM мы также будем для краткости пропускать пробельные текстовые узлы там, где они не имеют значения. Обычно они не влияют на то, как отображается документ.
```

## Автоисправление

Если браузер сталкивается с некорректно написанным HTML-кодом, он автоматически корректирует его при построении DOM.
=======
```smart header="Spaces at string start/end and space-only text nodes are usually hidden in tools"
Browser tools (to be covered soon) that work with DOM usually do not show spaces at the start/end of the text and empty text nodes (line-breaks) between tags.

Developer tools save screen space this way.

On further DOM pictures we'll sometimes omit them when they are irrelevant. Such spaces usually do not affect how the document is displayed.
```

## Autocorrection
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Например, в начале документа всегда должен быть тег `<html>`. Даже если его нет в документе -- он будет в дереве DOM, браузер его создаст. То же самое касается и тега `<body>`.

Например, если HTML-файл состоит из единственного слова `"Привет"`, браузер обернёт его в теги `<html>` и `<body>`, добавит необходимый тег `<head>`, и DOM будет выглядеть так:


<div class="domtree"></div>

<script>
let node3 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Привет"}]}]}

drawHtmlTree(node3, 'div.domtree', 690, 150);
</script>

При генерации DOM браузер самостоятельно обрабатывает ошибки в документе, закрывает теги и так далее.

Такой документ с незакрытыми тегами:

```html no-beautify
<p>Привет
<li>Мама
<li>и
<li>Папа
```

...Но DOM будет нормальным, потому что браузер сам закроет теги и восстановит отсутствующие детали:

<div class="domtree"></div>

<script>
let node4 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"P","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Привет"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Мама"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"и"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Папа"}]}]}]}

drawHtmlTree(node4, 'div.domtree', 690, 360);
</script>

````warn header="Таблицы всегда содержат `<tbody>`"
Важный "особый случай" -- работа с таблицами. По стандарту DOM у них должен быть `<tbody>`, но в HTML их можно написать (официально) без него . В этом случае браузер добавляет `<tbody>` в DOM самостоятельно.

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

Видите? Из пустоты появился `<tbody>`, как будто документ был таким. Важно знать об этом, иначе при работе с таблицами возможны сюрпризы.
````

## Другие типы узлов

Есть и некоторые другие типы узлов, кроме элементов и текстовых узлов.

<<<<<<< HEAD
Например, узел-комментарий:
=======
There are some other node types besides elements and text nodes.

For example, comments:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```html
<!DOCTYPE HTML>
<html>
<body>
  Правда о лосях.
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
let node6 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  Правда о лосях.\n    "},{"name":"OL","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n      "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Лось -- животное хитрое"}]},{"name":"#text","nodeType":3,"content":"\n      "},{"name":"#comment","nodeType":8,"content":"comment"},{"name":"#text","nodeType":3,"content":"\n      "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"...и коварное!"}]},{"name":"#text","nodeType":3,"content":"\n    "}]},{"name":"#text","nodeType":3,"content":"\n  \n"}]}]};

drawHtmlTree(node6, 'div.domtree', 690, 500);
</script>

<<<<<<< HEAD
Здесь мы видим новый узел нового типа -- *комментарий*, обозначенный как `#comment`, между двумя текстовыми узлами.
=======
We can see here a new tree node type -- *comment node*, labeled as `#comment`, between two text nodes.

We may think -- why is a comment added to the DOM? It doesn't affect the visual representation in any way. But there's a rule -- if something's in HTML, then it also must be in the DOM tree.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Казалось бы -- зачем комментарий в DOM? Он никак не влияет на визуальное отображение. Но есть важное правило: если что-то есть в HTML, то оно должно быть в DOM-дереве.

**Все, что есть в HTML, даже комментарии, является частью DOM.**

Даже директива `<!DOCTYPE...>`, которую мы ставим в начале HTML, тоже является DOM-узлом. Она находится в дереве DOM прямо перед `<html>`. Мы не будем рассматривать этот узел, мы даже не рисуем его на наших диаграммах, но он существует.

Даже объект `document`, представляющий весь документ, формально, является DOM узлом.

Существует [12 типов узлов](https://dom.spec.whatwg.org/#node). Но на практике мы в основном работаем с 4 из них:

1. `document` -- "входная точка" в DOM.
2. узлы-элементы -- HTML-теги, основные строительные блоки.
3. текстовые узлы -- содержат текст.
4. комментарии -- иногда в них можно включить информацию, которая не будет показана, но доступна в DOM для чтения JS.

## Поэкспериментируйте сами

<<<<<<< HEAD
Чтобы посмотреть структуру DOM реальном времени, попробуйте [Live DOM Viewer](http://software.hixie.ch/utilities/js/live-dom-viewer/). Просто введите что-нибудь в поле, и ниже увидите, как меняется DOM.

Другой способ исследовать DOM - это использовать инструменты разработчика браузера. Это то, что мы каждый день делаем при разработке.
=======
Another way to explore the DOM is to use the browser developer tools. Actually, that's what we use when developing.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Для этого откройте страницу [elks.html](elks.html), включите инструменты разработчика и перейдите на вкладку Elements.

Выглядит примерно так:

![](elks.png)

Вы можете увидеть DOM, понажимать на элементы, детально рассмотреть их и так далее.

Обратите внимание, что структура DOM в инструментах разработчика отображается в упрощённом виде. Текстовые узлы показаны как простой текст. И кроме пробелов нет никаких "пустых" текстовых узлов. Ну и отлично, потому что большую часть времени нас будут интересовать узлы-элементы.

Клик по этой <span class="devtools" style="background-position:-328px -124px"></span> кнопке в левом верхнем углу инспектора позволяет при помощи мыши (или другого устройства ввода) выбрать элемент на веб-странице и "проинспектировать" его (браузер сам найдёт и отметит его во вкладке Elements). Этот способ отлично подходит, когда у нас огромная HTML-страница (и соответствующий ей огромный DOM), и мы хотим увидеть, где находится интересующий нас элемент.

Есть и другой способ сделать это, можно кликнуть на странице по элементу правой кнопкой мыши и в контекстном меню выбрать "Inspect".

![](inspect.png)

В правой части инструментов разработчика находятся следующие подразделы:
- **Styles** -- здесь мы видим CSS, применённый к текущему элементу: правило за правилом, включая встроенные стили (выделены серым). Почти все можно отредактировать на месте, включая размеры/внешние и внутренние отступы.
- **Computed** -- здесь мы видим итоговые CSS-свойства элемента, которые он приобрёл в результате применения всего каскада стилей (в том числе унаследованные свойства и т.д.).
- **Event Listeners** -- в этом разделе мы видим обработчики событий, привязанные к DOM-элементам (мы поговорим о них в следующей части учебника).
- ... и т.д.

Лучший способ изучить инструменты разработчика -- это прокликать их. Большинство значений можно менять и тут же смотреть результат.

## Взаимодействие с консолью

<<<<<<< HEAD
При работе с DOM, нам часто требуется применить к нему JavaScript. Например: получить узел и запустить какой-нибудь код для его изменения, чтобы посмотреть результат. Вот несколько подсказок по тому, как перемещаться между вкладками Elements и Console.

Для начала:
=======
As we work the DOM, we also may want to apply JavaScript to it. Like: get a node and run some code to modify it, to see the result. Here are few tips to travel between the Elements tab and the console.

For the start:

1. Select the first `<li>` in the Elements tab.
2. Press `key:Esc` -- it will open console right below the Elements tab.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

1. На вкладке Elements выберите первый элемент `<li>`.
2. Нажмите `key:Esc` -- прямо под вкладкой Elements откроется Console.

Последний элемент, выбранный во вкладке Elements, доступен в консоли как `$0`, предыдущий, выбранный до него, как `$1` и т.д.

Теперь мы можем запускать на них команды. Например `$0.style.background = 'red'` сделает выбранный элемент красным, как здесь:

![](domconsole0.png)

<<<<<<< HEAD
Это мы посмотрели как получить узел из Elements в Console.

Есть и обратный путь: если есть переменная `node`, ссылающаяся на DOM-узел, можно использовать в консоли команду `inspect(node)`, чтобы увидеть этот элемент во вкладке Elements.

Или мы можем просто вывести DOM-узел в консоль и  исследовать "на месте", как `document.body` ниже:
=======
That's how to get a node from Elements in Console.

There's also a road back. If there's a variable referencing a DOM node, then we can use the command `inspect(node)` in Console to see it in the Elements pane.

Or we can just output DOM-node in the console and explore "at-place", like `document.body` below:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

![](domconsole1.png)

Это может быть полезно для отладки. В следующей главе мы рассмотрим доступ и изменение DOM при помощи JavaScript.

Инструменты разработчика браузера отлично помогают в разработке: мы можем исследовать DOM, пробовать с ним что-то делать и смотреть, что идёт не так.

## Итого

HTML/XML документы представлены в браузере в виде DOM-дерева.

- Теги становятся узлами-элементами и формируют структуру документа.
- Текст становится текстовыми узлами.
- ...и т.д., все что записано в HTML есть и в DOM-дереве, даже комментарии.

Для изменения элементов или проверки DOM-дерева мы можем использовать инструменты разработчика в браузере.

Здесь мы рассмотрели основы, наиболее часто используемые и важные действия для начала разработки. Подробную документацию по инструментам разработки Chrome Developer Tools можно найти на странице <https://developers.google.com/web/tools/chrome-devtools>. Лучший способ изучить инструменты походить по разным вкладкам, почитать меню: большинство действий очевидны для пользователя. Позже, когда вы немного их изучите, прочитайте документацию и узнаете то, что осталось.

У DOM-узлов есть свойства и методы, которые позволяют выбирать любой из элементов, изменять, перемещать их на странице и многое другое. Мы вернёмся к ним в в последующих разделах.
