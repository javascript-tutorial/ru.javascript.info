# Изменение документа

<<<<<<< HEAD
Модификации DOM - это ключ к созданию "живых" страниц.
=======
DOM modification is the key to creating "live" pages.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Здесь мы увидим, как создавать новые элементы "на лету" и изменять уже существующие.

## Пример: показать сообщение

<<<<<<< HEAD
Рассмотрим методы на примере - а именно, добавим на страницу сообщение, которое будет выглядеть получше, чем `alert`.
=======
Let's demonstrate using an example. We'll add a message on the page that looks nicer than `alert`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Вот такое:

```html autorun height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

*!*
<div class="alert">
  <strong>Всем привет!</strong> Вы прочитали важное сообщение.
</div>
*/!*
```

<<<<<<< HEAD
Это был пример HTML. Теперь давайте создадим такой же `div`, используя JavaScript (предполагаем, что стили в HTML или во внешнем CSS-файле).
=======
That was the HTML example. Now let's create the same `div` with JavaScript (assuming that the styles are in the HTML/CSS already).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Создание элемента

DOM-узел можно создать двумя методами:

`document.createElement(tag)`
: Создаёт новый *элемент* с заданным тегом:

    ```js
    let div = document.createElement('div');
    ```

`document.createTextNode(text)`
: Создаёт новый *текстовый узел* с заданным текстом:

    ```js
    let textNode = document.createTextNode('А вот и я');
    ```

<<<<<<< HEAD
### Создание сообщения

В нашем случае сообщение - это `div` с классом `alert` и HTML в нём:
=======
Most of the time we need to create element nodes, such as the `div` for the message.

### Creating the message

Creating the message div takes 3 steps:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
// 1. Create <div> element
let div = document.createElement('div');

// 2. Set its class to "alert"
div.className = "alert";
<<<<<<< HEAD
div.innerHTML = "<strong>Всем привет!</strong> Вы прочитали важное сообщение.";
```

Мы создали элемент, но пока он только в переменной. Мы не можем видеть его на странице, поскольку он не является частью документа.
=======

// 3. Fill it with the content
div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
```

We've created the element. But as of now it's only in a variable named `div`, not in the page yet. So we can't see it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Методы вставки

<<<<<<< HEAD
Чтобы наш `div` появился, нам нужно вставить его где-нибудь в `document`. Например, в `document.body`.
=======
To make the `div` show up, we need to insert it somewhere into `document`. For instance, into `<body>` element, referenced by `document.body`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Для этого есть метод `append`, в нашем случае: `document.body.append(div)`.

Вот полный пример:

```html run height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Всем привет!</strong> Вы прочитали важное сообщение.";

*!*
  document.body.append(div);
*/!*
</script>
```

<<<<<<< HEAD
Вот методы для различных вариантов вставки:

- `node.append(...nodes or strings)` -- добавляет узлы или строки в конец `node`,
- `node.prepend(...nodes or strings)` -- вставляет узлы или строки в начало `node`,
- `node.before(...nodes or strings)` –- вставляет узлы или строки до `node`,
- `node.after(...nodes or strings)` –- вставляет узлы или строки после `node`,
- `node.replaceWith(...nodes or strings)` –- заменяет `node` заданными узлами или строками.

Вот пример использования этих методов, чтобы добавить новые элементы в список и текст до/после него:
=======
Here we called `append` on `document.body`, but we can call `append` method on any other element, to put another element into it. For instance, we can append something to `<div>` by calling `div.append(anotherElement)`.

Here are more insertion methods, they specify different places where to insert:

- `node.append(...nodes or strings)` -- append nodes or strings *at the end* of `node`,
- `node.prepend(...nodes or strings)` -- insert nodes or strings *at the beginning* of `node`,
- `node.before(...nodes or strings)` –- insert nodes or strings *before* `node`,
- `node.after(...nodes or strings)` –- insert nodes or strings *after* `node`,
- `node.replaceWith(...nodes or strings)` –- replaces `node` with the given nodes or strings.

Arguments of these methods are an arbitrary list of DOM nodes to insert, or text strings (that become text nodes automatically).

Let's see them in action.

Here's an example of using these methods to add items to a list and the text before/after it:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```html autorun
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before('before'); // вставить строку "before" перед <ol>
  ol.after('after'); // вставить строку "after" после <ol>

  let liFirst = document.createElement('li');
  liFirst.innerHTML = 'prepend';
  ol.prepend(liFirst); // вставить liFirst в начало <ol>

  let liLast = document.createElement('li');
  liLast.innerHTML = 'append';
  ol.append(liLast); // вставить liLast в конец <ol>
</script>
```

<<<<<<< HEAD
Наглядная иллюстрация того, куда эти методы вставляют:
=======
Here's a visual picture of what the methods do:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

![](before-prepend-append-after.svg)

Итоговый список будет таким:

```html
before
<ol id="ol">
  <li>prepend</li>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>append</li>
</ol>
after
```

<<<<<<< HEAD
Эти методы могут вставлять несколько узлов и текстовых фрагментов за один вызов.
=======
As said, these methods can insert multiple nodes and text pieces in a single call.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Например, здесь вставляется строка и элемент:

```html run
<div id="div"></div>
<script>
  div.before('<p>Привет</p>', document.createElement('hr'));
</script>
```

<<<<<<< HEAD
Весь текст вставляется *как текст*.
=======
Please note: the text is inserted "as text", not "as HTML", with proper escaping of characters such as `<`, `>`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Поэтому финальный HTML будет:

```html run
*!*
&lt;p&gt;Привет&lt;/p&gt;
*/!*
<hr>
<div id="div"></div>
```

Другими словами, строки вставляются безопасным способом, как делает это `elem.textContent`.

Поэтому эти методы могут использоваться только для вставки DOM-узлов или текстовых фрагментов.

<<<<<<< HEAD
А что, если мы хотим вставить HTML именно "как html", со всеми тегами и прочим, как делает это `elem.innerHTML`?
=======
But what if we'd like to insert an HTML string "as html", with all tags and stuff working, in the same manner as `elem.innerHTML` does it?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## insertAdjacentHTML/Text/Element

С этим может помочь другой, довольно универсальный метод: `elem.insertAdjacentHTML(where, html)`.

Первый параметр - это специальное слово, указывающее, куда по отношению к `elem` производить вставку. Значение должно быть одним из следующих:

- `"beforebegin"` -- вставить `html` непосредственно перед `elem`,
- `"afterbegin"` -- вставить `html` в начало `elem`,
- `"beforeend"` -- вставить `html` в конец `elem`,
- `"afterend"` -- вставить `html` непосредственно после `elem`.

Второй параметр - это HTML-строка, которая будет вставлена именно "как HTML".

Например:

```html run
<div id="div"></div>
<script>
  div.insertAdjacentHTML('beforebegin', '<p>Привет</p>');
  div.insertAdjacentHTML('afterend', '<p>Пока</p>');
</script>
```

...Приведёт к:

```html run
<p>Привет</p>
<div id="div"></div>
<p>Пока</p>
```

<<<<<<< HEAD
Так мы можем добавлять произвольный HTML на страницу.
=======
That's how we can append arbitrary HTML to the page.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Варианты вставки:

![](insert-adjacent.svg)

Мы можем легко заметить сходство между этой и предыдущей картинкой. Точки вставки фактически одинаковые, но этот метод вставляет HTML.

У метода есть два брата:

- `elem.insertAdjacentText(where, text)` -- такой же синтаксис, но строка `text` вставляется "как текст", вместо HTML,
- `elem.insertAdjacentElement(where, elem)` -- такой же синтаксис, но вставляет элемент `elem`.

Они существуют, в основном, чтобы унифицировать синтаксис. На практике часто используется только `insertAdjacentHTML`. Потому что для элементов и текста у нас есть методы `append/prepend/before/after` -- их быстрее написать, и они могут вставлять как узлы, так и текст.

Так что, вот альтернативный вариант показа сообщения:

```html run
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  document.body.insertAdjacentHTML("afterbegin", `<div class="alert">
    <strong>Всем привет!</strong> Вы прочитали важное сообщение.
  </div>`);
</script>
```

## Удаление узлов

Для удаления узла есть методы `node.remove()`.

Например, сделаем так, чтобы наше сообщение удалялось через секунду:

```html run untrusted
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Всем привет!</strong> Вы прочитали важное сообщение.";

  document.body.append(div);
*!*
  setTimeout(() => div.remove(), 1000);
*/!*
</script>
```

Если нам нужно *переместить* элемент в другое место -- нет необходимости удалять его со старого.

**Все методы вставки автоматически удаляют узлы со старых мест.**

Например, давайте поменяем местами элементы:

```html run height=50
<div id="first">Первый</div>
<div id="second">Второй</div>
<script>
  // нет необходимости вызывать метод remove
  second.after(first); // берёт #second и после него вставляет #first
</script>
```

## Клонирование узлов: cloneNode

Как вставить ещё одно подобное сообщение?

Мы могли бы создать функцию и поместить код туда. Альтернатива - *клонировать* существующий `div` и изменить текст внутри него (при необходимости).

Иногда, когда у нас есть большой элемент, это может быть быстрее и проще.

- Вызов `elem.cloneNode(true)` создаёт "глубокий" клон элемента -- со всеми атрибутами и дочерними элементами. Если мы вызовем `elem.cloneNode(false)`, тогда клон будет без дочерних элементов.

Пример копирования сообщения:

```html run height="120"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<div class="alert" id="div">
  <strong>Всем привет!</strong> Вы прочитали важное сообщение.
</div>

<script>
*!*
  let div2 = div.cloneNode(true); // клонировать сообщение
  div2.querySelector('strong').innerHTML = 'Всем пока!'; // изменить клонированный элемент

  div.after(div2); // показать клонированный элемент после существующего div
*/!*
</script>
```

## DocumentFragment [#document-fragment]

`DocumentFragment` является специальным DOM-узлом, который служит обёрткой для передачи списков узлов.

Мы можем добавить к нему другие узлы, но когда мы вставляем его куда-то, он "исчезает", вместо него вставляется его содержимое.

Например, `getListContent` ниже генерирует фрагмент с элементами `<li>`, которые позже вставляются в `<ul>`:

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let fragment = new DocumentFragment();

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    fragment.append(li);
  }

  return fragment;
}

*!*
ul.append(getListContent()); // (*)
*/!*
</script>
```

Обратите внимание, что на последней строке с `(*)` мы добавляем `DocumentFragment`, но он "исчезает", поэтому структура будет:

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

`DocumentFragment` редко используется. Зачем добавлять элементы в специальный вид узла, если вместо этого мы можем вернуть массив узлов? Переписанный пример:

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let result = [];

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    result.push(li);
  }

  return result;
}

*!*
ul.append(...getListContent()); // append + оператор "..." = друзья!
*/!*
</script>
```

Мы упоминаем `DocumentFragment` в основном потому, что он используется в некоторых других областях, например, для элемента [template](info:template-element), который мы рассмотрим гораздо позже.

## Устаревшие методы вставки/удаления

[old]

Есть несколько других, более старых, методов вставки и удаления, которые существуют по историческим причинам.

Сейчас уже нет причин их использовать, так как современные методы `append`, `prepend`, `before`, `after`, `remove`, `replaceWith` более гибкие и удобные.

Мы упоминаем о них только потому, что их можно найти во многих старых скриптах:

`parentElem.appendChild(node)`
: Добавляет `node` в конец дочерних элементов `parentElem`.

    Следующий пример добавляет новый `<li>` в конец `<ol>`:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Привет, мир!';

      list.appendChild(newLi);
    </script>
    ```

`parentElem.insertBefore(node, nextSibling)`
: Вставляет `node` перед `nextSibling` в `parentElem`.

    Следующий пример вставляет новый элемент перед вторым `<li>`:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>
    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Привет, мир!';

    *!*
      list.insertBefore(newLi, list.children[1]);
    */!*
    </script>
    ```
    Чтобы вставить `newLi` в начало, мы можем сделать вот так:

    ```js
    list.insertBefore(newLi, list.firstChild);
    ```

`parentElem.replaceChild(node, oldChild)`
: Заменяет `oldChild` на `node` среди дочерних элементов `parentElem`.

`parentElem.removeChild(node)`
: Удаляет `node` из `parentElem` (предполагается, что он родитель `node`).

    Этот пример удалит первый `<li>` из `<ol>`:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let li = list.firstElementChild;
      list.removeChild(li);
    </script>
    ```

Все эти методы возвращают вставленный/удалённый узел. Другими словами, `parentElem.appendChild(node)` вернёт `node`. Но обычно возвращаемое значение не используют, просто вызывают метод.

## Несколько слов о "document.write"

Есть ещё один, очень древний метод добавления содержимого на веб-страницу: `document.write`.

Синтаксис:

```html run
<p>Где-то на странице...</p>
*!*
<script>
  document.write('<b>Привет из JS</b>');
</script>
*/!*
<p>Конец</p>
```

Вызов `document.write(html)` записывает `html` на страницу "прямо здесь и сейчас". Строка `html` может быть динамически сгенерирована, поэтому метод достаточно гибкий. Мы можем использовать JavaScript, чтобы создать полноценную веб-страницу и записать её в документ.

Этот метод пришёл к нам со времён, когда ещё не было ни DOM, ни стандартов... Действительно старые времена. Он всё ещё живёт, потому что есть скрипты, которые используют его.

В современных скриптах он редко встречается из-за следующего важного ограничения:

**Вызов `document.write` работает только во время загрузки страницы.**

Если вызвать его позже, то существующее содержимое документа затрётся.

Например:

```html run
<p>Через одну секунду содержимое этой страницы будет заменено...</p>
*!*
<script>
  // document.write через 1 секунду
  // вызов происходит после того, как страница загрузится, поэтому метод затирает содержимое
  setTimeout(() => document.write('<b>...Этим.</b>'), 1000);
</script>
*/!*
```

Так что после того, как страница загружена, он уже непригоден к использованию, в отличие от других методов DOM, которые мы рассмотрели выше.

Это его недостаток.

Есть и преимущество. Технически, когда `document.write` запускается во время чтения HTML браузером, и что-то пишет в документ, то браузер воспринимает это так, как будто это изначально было частью загруженного HTML-документа.

Поэтому он работает невероятно быстро, ведь при этом *нет модификации DOM*. Метод пишет прямо в текст страницы, пока DOM ещё в процессе создания.

Так что, если нам нужно динамически добавить много текста в HTML, и мы находимся на стадии загрузки, и для нас очень важна скорость, это может помочь. Но на практике эти требования редко сочетаются. И обычно мы можем увидеть этот метод в скриптах просто потому, что они старые.

## Итого

- Методы для создания узлов:
    - `document.createElement(tag)` -- создаёт элемент с заданным тегом,
    - `document.createTextNode(value)` -- создаёт текстовый узел (редко используется),
    - `elem.cloneNode(deep)` -- клонирует элемент, если `deep==true`, то со всеми дочерними элементами.  

- Вставка и удаление:
    - `node.append(...nodes or strings)` -- вставляет в `node` в конец,
    - `node.prepend(...nodes or strings)` -- вставляет в `node` в начало,
    - `node.before(...nodes or strings)` -- вставляет прямо перед `node`,
    - `node.after(...nodes or strings)` -- вставляет сразу после `node`,
    - `node.replaceWith(...nodes or strings)` -- заменяет `node`.
    - `node.remove()` -- удаляет `node`.

- Устаревшие методы:
    - `parent.appendChild(node)`
    - `parent.insertBefore(node, nextSibling)`
    - `parent.removeChild(node)`
    - `parent.replaceChild(newElem, node)`

    Все эти методы возвращают `node`.

<<<<<<< HEAD
- Если нужно вставить фрагмент HTML, то `elem.insertAdjacentHTML(where, html)` вставляет в зависимости от `where`:
    - `"beforebegin"` -- вставляет `html` прямо перед `elem`,
    - `"afterbegin"` -- вставляет `html` в `elem` в начало,
    - `"beforeend"` -- вставляет `html` в `elem` в конец,
    - `"afterend"` -- вставляет `html` сразу после `elem`.

    Также существуют похожие методы `elem.insertAdjacentText` и `elem.insertAdjacentElement`, они вставляют текстовые строки и элементы, но они редко используются.
=======
- Given some HTML in `html`, `elem.insertAdjacentHTML(where, html)` inserts it depending on the value of `where`:
    - `"beforebegin"` -- insert `html` right before `elem`,
    - `"afterbegin"` -- insert `html` into `elem`, at the beginning,
    - `"beforeend"` -- insert `html` into `elem`, at the end,
    - `"afterend"` -- insert `html` right after `elem`.

    Also there are similar methods, `elem.insertAdjacentText` and `elem.insertAdjacentElement`, that insert text strings and elements, but they are rarely used.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- Чтобы добавить HTML на страницу до завершения её загрузки:
    - `document.write(html)`

    После загрузки страницы такой вызов затирает документ. В основном встречается в старых скриптах.
