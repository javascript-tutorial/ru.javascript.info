
# MutationObserver: наблюдатель за изменениями

`MutationObserver` - это встроенный объект, наблюдающий за DOM-элементом и запускающий колбэк в случае изменений.

<<<<<<< HEAD
Сначала мы познакомимся с синтаксисом, а затем разберём примеры использования.

## Синтаксис
=======
`MutationObserver` is a built-in object that observes a DOM element and fires a callback when it detects a change.

We'll first take a look at the syntax, and then explore a real-world use case, to see where such thing may be useful.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`MutationObserver` очень прост в использовании.

Сначала мы создаём наблюдатель за изменениями с помощью колбэк-функции:

```js
let observer = new MutationObserver(callback);
```

Потом прикрепляем его к DOM-узлу:

```js
observer.observe(node, config);
```

`config` - это объект с булевыми параметрами "на какие изменения реагировать":
- `childList` -- изменения в непосредственных детях `node`,
- `subtree` -- во всех потомках `node`,
- `attributes` -- в атрибутах `node`,
- `attributeFilter` -- массив имён атрибутов, чтобы наблюдать только за выбранными.
- `characterData` -- наблюдать ли за `node.data` (текстовое содержимое),

И ещё пара опций:
- `characterDataOldValue` -- если `true`, будет передавать и старое и новое значение `node.data` в колбэк (см далее), иначе только новое (также требуется опция `characterData`),
- `attributeOldValue` -- если `true`, будет передавать и старое и новое старое значение атрибута в колбэк (см далее), иначе только новое (также требуется опция `attributes`).

Затем, после изменений, выполняется `callback`, в который изменения передаются первым аргументом как список объектов [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord), а сам наблюдатель идёт вторым аргументом.

Объекты [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) имеют следующие свойства:

- `type` -- тип изменения, один из:
   - `"attributes"` изменён атрибут,
   - `"characterData"` изменены данные `elem.data`, это для текстовых узлов
   - `"childList"` добавлены/удалены дочерние элементы,
- `target` -- где произошло изменение: элемент для `"attributes"`, текстовый узел для `"characterData"` или элемент для `"childList"`,
- `addedNodes/removedNodes`  -- добавленные/удалённые узлы,
- `previousSibling/nextSibling` -- предыдущий или следующий одноуровневый элемент для добавленных/удалённых элементов,
- `attributeName/attributeNamespace` -- имя/пространство имён (для XML) изменённого атрибута,
- `oldValue` -- предыдущее значение, только для изменений атрибута или текста, если включена соответствующая опция `attributeOldValue`/`characterDataOldValue`.

<<<<<<< HEAD
Для примера возьмём `<div>` с атрибутом `contentEditable`. Этот атрибут позволяет нам сфокусироваться на элементе, например, кликнув, и отредактировать содержимое.
=======
For example, here's a `<div>` with a `contentEditable` attribute. That attribute allows us to focus on it and edit.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```html run
<div contentEditable id="elem">Отредактируй <b>меня</b>, пожалуйста</div>

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(изменения)
});

// наблюдать за всем, кроме атрибутов
observer.observe(elem, {
  childList: true, // наблюдать за непосредственными детьми
  subtree: true, // и более глубокими потомками
  characterDataOldValue: true // передавать старое значение в колбэк
});
</script>
```

<<<<<<< HEAD
Теперь, если мы изменим текст внутри `<b>меня</b>`, мы получим единичное изменение:
=======
If we run this code in the browser, then focus on the given `<div>` and change the text inside `<b>edit</b>`, `console.log` will show one mutation:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "меня",
  target: <text node>,
  // другие свойства пусты
}];
```

<<<<<<< HEAD
Если мы выберем или удалим `<b>меня</b>` полностью, мы получим сразу несколько изменений:
=======
If we make more complex editing operations, e.g. remove the `<b>edit</b>`, the mutation event may contain multiple mutation records:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
mutationRecords = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <text node>,
  previousSibling: <text node>
  // другие свойства пусты
}, {
  type: "characterData"
  target: <text node>
  // ...детали изменений зависят от того, как браузер обрабатывает такое удаление
  // он может соединить два соседних текстовых узла "Отредактируй " и ", пожалуйста" в один узел
  // или может оставить их разными текстовыми узлами
}];
```

Так что, `MutationObserver` позволяет реагировать на любые изменения в DOM-поддереве.

## Использование для интеграции

<<<<<<< HEAD
Когда это может быть нужно?
=======
Imagine the situation when you need to add a third-party script that contains useful functionality, but also does something unwanted, e.g. shows ads `<div class="ads">Unwanted ads</div>`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Представим ситуацию, когда вы подключаете сторонний скрипт, который добавляет какую-то полезную функциональность на страницу, но при этом делает что-то лишнее, например, показывает рекламу `<div class="ads">Ненужная реклама</div>`.

<<<<<<< HEAD
Разумеется, сторонний скрипт не даёт каких-то механизмов её убрать.
=======
Using `MutationObserver`, we can detect when the unwanted element appears in our DOM and remove it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Используя `MutationObserver`, мы можем отследить, когда в нашем DOM появится такой элемент и удалить его. А полезную функциональность оставить. Хотя, конечно, создатели стороннего скрипта вряд ли обрадуются, что вы их полезный скрипт взяли, а рекламу удалили.

<<<<<<< HEAD
Есть и другие ситуации, когда сторонний скрипт добавляет что-то в наш документ, и мы хотели бы отследить, когда это происходит, чтобы адаптировать нашу страницу, динамически поменять какие-то размеры и т.п.
=======
`MutationObserver` allows to implement this.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`MutationObserver` для этого как раз отлично подходит.

## Использование для архитектуры

Есть и ситуации, когда `MutationObserver` хорошо подходит с архитектурной точки зрения.

<<<<<<< HEAD
Представим, что мы создаём сайт о программировании. Естественно, статьи на нём и другие материалы могут содержать фрагменты с исходным кодом.
=======
Such snippet in an HTML markup looks like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Такой фрагмент в HTML-разметке выглядит так:
```html
...
<pre class="language-javascript"><code>
  // вот код
  let hello = "world";
</code></pre>
...
```

<<<<<<< HEAD
Также на нашем сайте мы будем использовать JavaScript-библиотеку для подсветки синтаксиса, например [Prism.js](https://prismjs.com/). Вызов метода `Prism.highlightElem(pre)` ищет такие элементы `pre` и добавляет в них стили и теги, которые в итоге дают цветную подсветку синтаксиса, подобно той, которую вы видите в примерах здесь, на этой странице.

Когда конкретно нам вызвать этот метод подсветки? Можно по событию `DOMContentLoaded` или просто внизу страницы написать код, который будет искать все `pre[class*="language"]` и вызывать `Prism.highlightElem` для них:
=======
For better readability and at the same time, to beautify it, we'll be using a JavaScript syntax highlighting library on our site, like [Prism.js](https://prismjs.com/). To get syntax highlighting for above snippet in Prism, `Prism.highlightElem(pre)` is called, which examines the contents of such `pre` elements and adds special tags and styles for colored syntax highlighting into those elements, similar to what you see in examples here, on this page.

When exactly should we run that highlighting method? Well, we can do it on `DOMContentLoaded` event, or put the script at the bottom of the page. The moment our DOM is ready, we can search for elements `pre[class*="language"]` and call `Prism.highlightElem` on them:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
// выделить все примеры кода на странице
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

<<<<<<< HEAD
Пока всё просто, правда? В HTML есть фрагменты кода в `<pre>`, и для них мы включаем подсветку синтаксиса.
=======
Everything's simple so far, right? We find code snippets in HTML and highlight them.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Идём дальше. Представим, что мы собираемся динамически подгружать материалы с сервера. Позже в учебнике мы изучим [способы для этого](info:fetch). На данный момент имеет значение только то, что мы получаем HTML-статью с веб-сервера и показываем её по запросу:

```js
let article = /* получить новую статью с сервера */
articleElem.innerHTML = article;
```

HTML подгружённой статьи `article` может содержать примеры кода. Нам нужно вызвать `Prism.highlightElem` для них, чтобы подсветить синтаксис.

**Кто и когда должен вызывать `Prism.highlightElem` для динамически загруженной статьи?**

Мы можем добавить этот вызов к коду, который загружает статью, например, так:

```js
let article = /* получить новую статью с сервера */
articleElem.innerHTML = article;

*!*
let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);
*/!*
```

<<<<<<< HEAD
...Но представьте, что у нас есть много мест в коде, где мы загружаем что-либо: статьи, опросы, посты форума. Нужно ли нам в каждый такой вызов добавлять `Prism.highlightElem`? Получится не очень удобно, да и можно легко забыть сделать это.

А что, если содержимое загружается вообще сторонним кодом? Например, у нас есть форум, написанный другим человеком, загружающий содержимое динамически, и нам захотелось добавить к нему выделение синтаксиса. Никто не любит править чужие скрипты.
=======
...But, imagine if we have many places in the code where we load our content - articles, quizzes, forum posts, etc. Do we need to put the highlighting call everywhere, to highlight the code in content after loading? That's not very convenient.

And what if the content is loaded by a third-party module? For example, we have a forum written by someone else, that loads content dynamically, and we'd like to add syntax highlighting to it. No one likes patching third-party scripts.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

К счастью, есть другой вариант.

<<<<<<< HEAD
Мы можем использовать `MutationObserver`, чтобы автоматически определять момент, когда примеры кода появляются на странице, и подсвечивать их.
=======
We can use `MutationObserver` to automatically detect when code snippets are inserted into the page and highlight them.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Тогда вся функциональность для подсветки синтаксиса будет в одном месте, а мы будем избавлены от необходимости интегрировать её.

### Пример динамической подсветки синтаксиса

Вот работающий пример.

Если вы запустите этот код, он начнёт наблюдать за элементом ниже, подсвечивая код любого примера, который появляется там:

```js run
let observer = new MutationObserver(mutations => {

  for(let mutation of mutations) {
    // проверим новые узлы, есть ли что-то, что надо подсветить?

    for(let node of mutation.addedNodes) {
      // отслеживаем только узлы-элементы, другие (текстовые) пропускаем
      if (!(node instanceof HTMLElement)) continue;

      // проверить, не является ли вставленный элемент примером кода
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

      // или, может быть, пример кода есть в его поддереве?
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, {childList: true, subtree: true});
```

<<<<<<< HEAD
Ниже находится HTML-элемент и JavaScript, который его динамически заполнит примером кода через `innerHTML`.
=======
Here, below, there's an HTML-element and JavaScript that dynamically fills it using `innerHTML`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Пожалуйста, запустите предыдущий код (он наблюдает за этим элементом), а затем код, расположенный ниже. Вы увидите как `MutationObserver` обнаружит и подсветит фрагменты кода.

<p id="highlight-demo" style="border: 1px solid #ddd">A demo-element with <code>id="highlight-demo"</code>, run the code above to observe it.</p>

<<<<<<< HEAD
=======
The following code populates its `innerHTML`, that causes the `MutationObserver` to react and highlight its contents:

>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```js run
let demoElem = document.getElementById('highlight-demo');

// динамически вставить содержимое как фрагменты кода
demoElem.innerHTML = `Фрагмент кода ниже:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Ещё один:</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
```

Теперь у нас есть `MutationObserver`, который может отслеживать вставку кода в наблюдаемых элементах или во всём документе. Мы можем добавлять/удалять фрагменты кода в HTML, не задумываясь об их подсветке.

## Дополнительные методы

Метод, останавливающий наблюдение за узлом:

- `observer.disconnect()` -- останавливает наблюдение.

<<<<<<< HEAD
Вместе с ним используют метод:

- `mutationRecords = observer.takeRecords()` -- получает список необработанных записей изменений, которые произошли, но колбэк для них ещё не выполнился.

```js
// мы отключаем наблюдатель
=======
When we stop the observing, it might be possible that some changes were not yet processed by the observer. In such cases, we use

- `observer.takeRecords()` -- gets a list of unprocessed mutation records - those that happened, but the callback has not handled them.

These methods can be used together, like this:

```js
// get a list of unprocessed mutations
// should be called before disconnecting,
// if you care about possibly unhandled recent mutations
let mutationRecords = observer.takeRecords();

// stop tracking changes
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
observer.disconnect();
...
```

<<<<<<< HEAD
// он, возможно, не успел обработать некоторые изменения
let mutationRecords = observer.takeRecords();
// обработать mutationRecords
```

## Сборка мусора

Объекты `MutationObserver` используют внутри себя так называемые ["слабые ссылки"](https://ru.wikipedia.org/wiki/%D0%A1%D0%BB%D0%B0%D0%B1%D0%B0%D1%8F_%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B0) на узлы, за которыми смотрят. Так что если узел удалён из DOM и больше не достижим, то он будет удалён из памяти вне зависимости от наличия наблюдателя.

=======

```smart header="Records returned by `observer.takeRecords()` are removed from the processing queue"
The callback won't be called for records, returned by `observer.takeRecords()`.
```

```smart header="Garbage collection interaction"
Observers use weak references to nodes internally. That is, if a node is removed from the DOM, and becomes unreachable, then it can be garbage collected.

The mere fact that a DOM node is observed doesn't prevent the garbage collection.
```
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Итого

<<<<<<< HEAD
`MutationObserver` может реагировать на изменения в DOM: атрибуты, добавленные/удалённые элементы, текстовое содержимое.
=======
`MutationObserver` can react to changes in DOM - attributes, text content and adding/removing elements.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Мы можем использовать его, чтобы отслеживать изменения, производимые другими частями нашего собственного кода, а также интегрироваться со сторонними библиотеками.

`MutationObserver` может отслеживать любые изменения. Разные опции конфигурации "что наблюдать" предназначены для оптимизации, чтобы не тратить ресурсы на лишние вызовы колбэка.
