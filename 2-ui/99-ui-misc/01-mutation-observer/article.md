
# MutationObserver: наблюдатель за изменениями

`MutationObserver` - это встроенный объект, наблюдающий за DOM-элементом и запускающий колбэк в случае изменений.

Сначала мы познакомимся с синтаксисом, а затем разберём примеры использования.

<<<<<<< HEAD
## Синтаксис
=======
We'll first take a look at the syntax, and then explore a real-world use case, to see where such thing may be useful.
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

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
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

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
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

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
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

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
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

Представим ситуацию, когда вы подключаете сторонний скрипт, который добавляет какую-то полезную функциональность на страницу, но при этом делает что-то лишнее, например, показывает рекламу `<div class="ads">Ненужная реклама</div>`.

<<<<<<< HEAD
Разумеется, сторонний скрипт не даёт каких-то механизмов её убрать.
=======
Using `MutationObserver`, we can detect when the unwanted element appears in our DOM and remove it.
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

Используя `MutationObserver`, мы можем отследить, когда в нашем DOM появится такой элемент и удалить его. А полезный функционал оставить. Хотя, конечно, создатели стороннего скрипта вряд ли обрадуются, что вы их полезный скрипт взяли, а рекламу удалили.

<<<<<<< HEAD
Есть и другие ситуации, когда сторонний скрипт добавляет что-то в наш документ, и мы хотели бы отследить, когда это происходит, чтобы адаптировать нашу страницу, динамически поменять какие-то размеры и т.п.
=======
`MutationObserver` allows to implement this.
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

`MutationObserver` для этого как раз отлично подходит.

## Использование для архитектуры

Есть и ситуации, когда `MutationObserver` хорошо подходит с архитектурной точки зрения.

<<<<<<< HEAD
Представим, что мы создаём сайт о программировании. Естественно, статьи на нём и другие материалы могут содержать фрагменты с исходным кодом.
=======
Such snippet in an HTML markup looks like this:
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

Такой фрагмент в HTML-разметке выглядит так:
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
When exactly to run that highlighting method? We can do it on `DOMContentLoaded` event, or at the bottom of the page. At that moment we have our DOM ready, can search for elements `pre[class*="language"]` and call `Prism.highlightElem` on them:
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

```js
// выделить все примеры кода на странице
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

Пока всё просто, правда? В HTML есть фрагменты кода в `<pre>`, и для них мы включаем подсветку синтаксиса.

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

...Но представьте, что у нас есть много мест в коде, где мы загружаем что-либо: статьи, опросы, посты форума. Нужно ли нам в каждый такой вызов добавлять `Prism.highlightElem`? Получится не очень удобно, да и можно легко забыть сделать это.

А что, если содержимое загружается вообще сторонним кодом? Например, у нас есть форум, написанный другим человеком, загружающий содержимое динамически, и нам захотелось добавить к нему выделение синтаксиса. Никто не любит править чужие скрипты.

К счастью, есть другой вариант.

Мы можем использовать `MutationObserver`, чтобы автоматически определять момент, когда примеры кода появляются на странице, и подсвечивать их.

Тогда весь функционал для подсветки синтаксиса будет в одном месте, а мы будем избавлены от необходимости интегрировать его.

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
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

Пожалуйста, запустите предыдущий код (он наблюдает за этим элементом), а затем код, расположенный ниже. Вы увидите как `MutationObserver` обнаружит и подсветит фрагменты кода.

<p id="highlight-demo" style="border: 1px solid #ddd">A demo-element with <code>id="highlight-demo"</code>, run the code above to observe it.</p>

<<<<<<< HEAD
=======
The following code populates its `innerHTML`, that causes the `MutationObserver` to react and highlight its contents:

>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874
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
=======
When we stop the observing, it might be possible that some changes were not processed by the observer yet.

- `observer.takeRecords()` -- gets a list of unprocessed mutation records, those that happened, but the callback did not handle them.

These methods can be used together, like this:
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

```js
// мы отключаем наблюдатель
observer.disconnect();

<<<<<<< HEAD
// он, возможно, не успел обработать некоторые изменения
let mutationRecords = observer.takeRecords();
// обработать mutationRecords
```

## Сборка мусора

Объекты `MutationObserver` используют внутри себя так называемые ["слабые ссылки"](https://ru.wikipedia.org/wiki/%D0%A1%D0%BB%D0%B0%D0%B1%D0%B0%D1%8F_%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B0) на узлы, за которыми смотрят. Так что если узел удалён из DOM и больше не достижим, то он будет удалён из памяти вне зависимости от наличия наблюдателя.

=======
// handle unprocessed some mutations
let mutationRecords = observer.takeRecords();
...
```

```smart header="Garbage collection interaction"
Observers use weak references to nodes internally. That is: if a node is removed from DOM, and becomes unreachable, then it becomes garbage collected.

The mere fact that a DOM node is observed doesn't prevent the garbage collection.
```
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

## Итого

`MutationObserver` может реагировать на изменения в DOM: атрибуты, добавленные/удалённые элементы, текстовое содержимое.

Мы можем использовать его, чтобы отслеживать изменения, производимые другими частями нашего собственного кода, а также интегрироваться со сторонними библиотеками.

`MutationObserver` может отслеживать любые изменения. Разные опции конфигурации "что наблюдать" предназначены для оптимизации, чтобы не тратить ресурсы на лишние вызовы колбэка.
