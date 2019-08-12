
# MutationObserver: Наблюдатель за изменениями

`MutationObserver` - это встроенный объект, наблюдающий за DOM-элементом и запускающий колбэк в случае изменений.

Сначала мы познакомимся с синтаксисом, а затем разберём примеры использования.

## Синтаксис

`MutationObserver` очень прост в использовании.

Сначала мы создаём наблюдатель за изменениями с помощью колбэк-функции:

```js
let observer = new MutationObserver(callback);
```

Потом прикрепляем его к DOM-узлу:

```js
observer.observe(node, config);
```

<<<<<<< HEAD
`config` - это объект с булевыми параметрами "на какие изменения реагировать":
- `childList` -- изменения в непосредственных детях `node`,
- `subtree` -- во всех потомках `node`,
- `attributes` -- в атрибутах `node`,
- `attributeFilter` -- массив имён атрибутов, чтобы наблюдать только за выбранными.
- `characterData` -- наблюдать ли за `node.data` (текстовое содержимое),

И ещё пара опций:
- `characterDataOldValue` -- если `true`, будет передавать и старое и новое значение `node.data` в колбэк (см далее), иначе только новое (также требуется опция `characterData`),
- `attributeOldValue` -- если `true`, будет передавать и старое и новое старое значение атрибута в колбэк (см далее), иначе только новое (также требуется опция `attributes`).
=======
`config` is an object with boolean options "what kind of changes to react on":
- `childList` -- changes in the direct children of `node`,
- `subtree` -- in all descendants of `node`,
- `attributes` -- attributes of `node`,
- `attributeFilter` -- an array of attribute names, to observe only selected ones.
- `characterData` -- whether to observe `node.data` (text content),

Few other options:
- `attributeOldValue` -- if `true`, pass both the old and the new value of attribute to callback (see below), otherwise only the new one (needs `attributes` option),
- `characterDataOldValue` -- if `true`, pass both the old and the new value of `node.data` to callback (see below), otherwise only the new one (needs `characterData` option).

Then after any changes, the `callback` is executed: changes are passed in the first argument as a list of [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects, and the observer itself as the second argument.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Затем, после изменений, выполняется `callback`, в который изменения передаются первым аргументом как список объектов [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord), а сам наблюдатель идёт вторым аргументом.

<<<<<<< HEAD
Объекты [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) имеют следующие свойства:

- `type` -- тип изменения, один из:
   - `"attributes"` изменён атрибут,
   - `"characterData"` изменены данные `elem.data`, это для текстовых узлов
   - `"childList"` добавлены/удаленые дочерние элементы,
- `target` -- где произошло изменение: элемент для `"attributes"`, текстовый узел для `"characterData"` или элемент для `"childList"`,
- `addedNodes/removedNodes`  -- добавленные/удалённые узлы,
- `previousSibling/nextSibling` -- предыдущий или следующий одноуровневый элемент для добавленных/удалённых элементов,
- `attributeName/attributeNamespace` -- имя/пространство имён (для XML) изменённого атрибута,
- `oldValue` -- предыдущее значение, только для изменений атрибута или текста, если включена соответствующая опция `attributeOldValue`/`characterDataOldValue`.
=======
- `type` -- mutation type, one of
    - `"attributes"`: attribute modified
    - `"characterData"`: data modified, used for text nodes,
    - `"childList"`: child elements added/removed,
- `target` -- where the change occurred: an element for `"attributes"`, or text node for `"characterData"`, or an element for a `"childList"` mutation,
- `addedNodes/removedNodes`  -- nodes that were added/removed,
- `previousSibling/nextSibling` -- the previous and next sibling to added/removed nodes,
- `attributeName/attributeNamespace` -- the name/namespace (for XML) of the changed attribute,
- `oldValue` -- the previous value, only for attribute or text changes, if the corresponding option is set `attributeOldValue`/`characterDataOldValue`.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Для примера возьмём `<div>` с атрибутом `contentEditable`. Этот атрибут позволяет нам сфокусироваться на элементе, например, кликнув, и отредактировать содержимое.

```html run
<div contentEditable id="elem">Отредактируй <b>меня</b>, пожалуйста</div>

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(изменения)
});

<<<<<<< HEAD
// наблюдать за всем, кроме атрибутов
observer.observe(elem, {
  childList: true, // наблюдать за непосредственными детьми
  subtree: true, // и более глубокими потомками
  characterDataOldValue: true // передавать старое значение в колбэк
=======
// observe everything except attributes
observer.observe(elem, {
  childList: true, // observe direct children
  subtree: true, // and lower descendants too
  characterDataOldValue: true // pass old data to callback
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
});
</script>
```

<<<<<<< HEAD
Тепеь, если мы изменим текст внутри `<b>меня</b>`, мы получим единичное изменение:
=======
Now if we change the text inside `<b>edit</b>`, we'll get a single mutation:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "меня",
  target: <text node>,
  // другие свойства пусты
}];
```

Если мы выберем или удалим `<b>меня</b>` полностью, мы получим сразу несколько изменений:

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
<<<<<<< HEAD
  // ...детали изменений зависят от того, как браузер обрабатывает такое удаление
  // он может соединить два соседних текстовых узла "Отредактируй " и ", пожалуйста" в один узел
  // или может оставить их разными текстовыми узлами
}];
```

Так что, `MutationObserver` позволяет реагировать на любые изменения в DOM-поддереве.

## Использование для интеграции

Когда это может быть нужно?

Представим ситуацию, когда вы подключаете сторонний скрипт, который добавляет какую-то полезную функциональность на страницу, но при этом делает что-то лишнее, например, показывает рекламу `<div class="ads">Ненужная реклама</div>`.

Разумеется, сторонний скрипт не даёт каких-то механизмов её убрать.

Используя `MutationObserver`, мы можем отследить, когда в нашем DOM появится такой элемент и удалить его. А полезный функционал оставить. Хотя, конечно, создатели стороннего скрипта вряд ли обрадуются, что вы их полезный скрипт взяли, а рекламу удалили.
=======
  // ...mutation details depend on how the browser handles such removal
  // it may coalesce two adjacent text nodes "edit " and ", please" into one node
  // or it may leave them separate text nodes
}];
```

So, `MutationObserver` allows to react on any changes within DOM subtree.

## Usage for integration

When such thing may be useful?

Imagine the situation when you attach a third-party script that adds useful functionality on the page, but also does something unwanted, e.g. shows ads `<div class="ads">Unwanted ads</div>`.

Naturally, the third-party script provides no mechanisms to remove it.

Using `MutationObserver`, we can detect when such element appears in our DOM and remove it. While leaving the useful functionality intact. Surely though, creators of that script won't be happy that you took their useful stuff and removed the ads.

There are other situations when a third-party script adds something into our document, and we'd like to detect, when it happens, to adapt our page, dynamically resize something etc.

`MutationObserver` can easily handle this.

## Usage for architecture

There are also situations when `MutationObserver` is good from architectural standpoint.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Есть и другие ситуации, когда сторонний скрипт добавляет что-то в наш документ, и мы хотели бы отследить, когда это происходит, чтобы адаптировать нашу страницу, динамически поменять какие-то размеры и т.п.

<<<<<<< HEAD
`MutationObserver` для этого как раз отлично подходит.

## Использование для архитектуры

Есть и ситуации, когда `MutationObserver` хорошо подходит с архитектурной точки зрения.

Представим, что мы создаём сайт о программировании. Естественно, статьи на нём и другие материалы могут содержать фрагменты с исходным кодом.

Такой фрагмент в HTML-разметке выглядит так:
=======
Such snippet in HTML markup looks like this:

>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
```html
...
<pre class="language-javascript"><code>
  // вот код
  let hello = "world";
</code></pre>
...
```

Также на нашем сайте мы будем использовать JavaScript-библиотеку для подсветки синтаксиса, например [Prism.js](https://prismjs.com/). Вызов метода `Prism.highlightElem(pre)` ищет такие элементы `pre` и добавляет в них стили и теги, которые в итоге дают цветную подсветку синтаксиса, подобно той, которую вы видите в примерах здесь, на этой странице.

<<<<<<< HEAD
Когда конкретно нам вызвать этот метод подсветки? Можно по событию `DOMContentLoaded` или просто внизу страницы написать код, который будет искать все `pre[class*="language"]` и вызывать `Prism.highlightElem` для них:
=======
When exactly to run that highlighting method? We can do it on `DOMContentLoaded` event, or at the bottom of the page. At that moment we have DOM ready, can search for elements `pre[class*="language"]` and call `Prism.highlightElem` on them:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
// выделить все примеры кода на странице
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

<<<<<<< HEAD
Пока всё просто, правда? В HTML есть фрагменты кода в `<pre>`, и для них мы включаем подсветку синтаксиса.

Идём дальше. Представим, что мы собираемся динамически подгружать материалы с сервера. Позже в учебнике мы изучим [способы для этого](info:fetch). На данный момент имеет значение только то, что мы получаем HTML-статью с веб-сервера и показываем её по запросу:
=======
Everything's simple so far, right? There are `<pre>` code snippets in HTML, we highlight them.

Now let's go on. Let's say we're going to dynamically fetch materials from a server. We'll study methods for that [later in the tutorial](info:fetch). For now it only matters that we fetch an HTML article from a webserver and display it on demand:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
let article = /* получить новую статью с сервера */
articleElem.innerHTML = article;
```

HTML подгруженной статьи `article` может содержать примеры кода. Нам нужно вызвать `Prism.highlightElem` для них, чтобы подсветить синтаксис.

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

...Но представьте, что у нас есть много мест в коде, где мы загружаем что-либо: статьи, опросы, посты форума. Нужно ли нам в каждый такой вызов добавлять `Prism.highlightElem`? Получится не очень удобно, да и можно легко забыть сделать это.

А что, если содержимое загружается вообще сторонним кодом? Например, у нас есть форум, написанный другим человеком, загружающий содержимое динамически, и нам захотелось добавить к нему выделение синтаксиса. Никто не любит править чужие скрипты.

К счастью, есть другой вариант.

<<<<<<< HEAD
Мы можем использовать `MutationObserver`, чтобы автоматически определять момент, когда примеры кода появляются на странице, и подсвечивать их.
=======
We can use `MutationObserver` to automatically detect when code snippets are inserted in the page and highlight them.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Тогда весь функционал для подсветки синтаксиса будет в одном месте, а мы будем избавлены от необходимости интегрировать его.

<<<<<<< HEAD
### Пример динамической подсветки синтаксиса
=======
### Dynamic highlight demo
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Вот работающий пример.

Если вы запустите этот код, он начнёт наблюдать за элементом ниже, подсвечивая код любого примера, который появляется там:

```js run
let observer = new MutationObserver(mutations => {

  for(let mutation of mutations) {
<<<<<<< HEAD
    // проверим новые узлы, есть ли что-то, что надо подсветить?
=======
    // examine new nodes, is there anything to highlight?
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

    for(let node of mutation.addedNodes) {
      // отслеживаем только узлы-элементы, другие (текстовые) пропускаем
      if (!(node instanceof HTMLElement)) continue;

      // проверить, не является ли вставленный элемент примером кода
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

<<<<<<< HEAD
      // или, может быть, пример кода есть в его поддереве?
=======
      // or maybe there's a code snippet somewhere in its subtree?
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
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
Here's HTML-element and JavaScript that dynamically fills it using `innerHTML`.

Please run the previous code (above, observes that element), and then the code below. You'll see how `MutationObserver` detects and highlights the snippet.

<p id="highlight-demo" style="border: 1px solid #ddd">Демо-элемент с <code>id="highlight-demo"</code>, за которым следит код примера выше.</p>
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Пожалуйста, запустите предыдущий код (выше, наблюдает за этим элементом), а затем код ниже. Вы увидите как `MutationObserver` обнаружит и подсветит фрагменты кода.

<p id="highlight-demo" style="border: 1px solid #ddd">Демо-элемент с <code>id="highlight-demo"</code>, за которым следит код примера выше.</p>

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
=======
Another method often used with it:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

- `mutationRecords = observer.takeRecords()` -- получает список необработанных записей изменений, которые произошли, но колбэк для них ещё не выполнился.

```js
<<<<<<< HEAD
// мы отключаем наблюдатель
observer.disconnect();

// он, возможно, не успел обработать некоторые изменения
let mutationRecords = observer.takeRecords();
// обработать mutationRecords
=======
// we'd like to stop tracking changes
observer.disconnect();

// it might have not yet handled some mutations
let mutationRecords = observer.takeRecords();
// process mutationRecords
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
```

## Сборка мусора

Объекты `MutationObserver` используют внутри себя так называемые ["слабые ссылки"](https://ru.wikipedia.org/wiki/%D0%A1%D0%BB%D0%B0%D0%B1%D0%B0%D1%8F_%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B0) на узлы, за которыми смотрят. Так что если узел удалён из DOM и больше не достижим, то он будет удалён из памяти вне зависимости от наличия наблюдателя.


## Итого

`MutationObserver` может реагировать на изменения в DOM: атрибуты, добавленные/удалённые элементы, текстовое содержимое.

<<<<<<< HEAD
Мы можем использовать его, чтобы отслеживать изменения, производимые другими частями нашего собственного кода, а также интегрироваться со сторонними библиотеками.

`MutationObserver` может отслеживать любые изменения. Разные опции конфигурации "что наблюдать" предназначены для оптимизации, чтобы не тратить ресурсы на лишние вызовы колбэка.
=======
We can use it to track changes introduced by other parts of our code, as well as to integrate with third-party scripts.

`MutationObserver` can track any changes. The config "what to observe" options are used for optimizations, not to spend resources on unneeded callback invocations.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
