# Изменение документа

Модификации DOM - это ключ к созданию "живых" страниц.

Здесь мы увидим, как создавать новые элементы "на лету" и изменять уже существующие.

Сначала мы посмотрим пример, а затем объясним методы для изменения DOM.

## Пример: показать сообщение

Для начала давайте посмотрим, как добавить сообщение на страницу, которое будет выглядеть лучше, чем `alert`.

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

Это был пример HTML. Теперь давайте создадим такой же `div`, используя JavaScript (предполагаем, что стили всё ещё в HTML или во внешнем CSS-файле).

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

### Создание сообщения

В нашем случае мы хотим создать `div` с определёнными классами и сообщением:

```js
let div = document.createElement('div');
div.className = "alert alert-success";
div.innerHTML = "<strong>Всем привет!</strong> Вы прочитали важное сообщение.";
```

После этого у нас есть готовый DOM-элемент. Сейчас это просто переменная, и мы не можем её увидеть. Это потому, что элемент ещё не вставлен на страницу.

## Методы вставки

Чтобы наш `div` появился, нам нужно вставить его где-нибудь в `document`. Например, в `document.body`.

Для этого есть метод `appendChild`, в нашем случае: `document.body.appendChild(div)`.

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
  div.className = "alert alert-success";
  div.innerHTML = "<strong>Всем привет!</strong> Вы прочитали важное сообщение.";

*!*
  document.body.appendChild(div);
*/!*
</script>
```

Вот краткий список методов для вставки узлов на страницу (`parentElem` родительский элемент):

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

Все эти методы возвращают вставленный узел. Другими словами, `parentElem.appendChild(node)` вернёт `node`. Но обычно возвращаемое значение не используют, просто вызывают метод.

Это методы "старой школы": они существуют с древних времён, и мы можем встретить их во многих старых скриптах. Однако, зачастую их возможностей не хватает.

Например, как вставить *html*, если элемент у нас в виде строки? Или, если у нас есть узел, но не его родитель, как его удалить? Конечно, это можно сделать, но код будет не особо красивым.

Поэтому существуют два других набора методов вставки, на все случаи.

### prepend/append/before/after

Этот набор методов предоставляет более гибкие возможности для вставки:

- `node.append(...узлы или строки)` -- добавляет узлы или строки в конец `node`,
- `node.prepend(...nodes or strings)` -- вставляет узлы или строки в начало `node`,
- `node.before(...nodes or strings)` –- вставляет узлы или строки до `node`,
- `node.after(...nodes or strings)` –- вставляет узлы или строки после `node`,
- `node.replaceWith(...nodes or strings)` –- заменяет `node` заданными узлами или строками.

Можно передать список DOM-узлов и/или строк. Строки вставляются как текстовые узлы.

Вот пример использования этих методов, добавляем элементы в список и текст до/после элемента:

```html autorun
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before('before');
  ol.after('after');

  let prepend = document.createElement('li');
  prepend.innerHTML = 'prepend';
  ol.prepend(prepend);  

  let append = document.createElement('li');
  append.innerHTML = 'append';
  ol.append(append);
</script>
```

Небольшая иллюстрация, как методы работают:

![](before-prepend-append-after.png)

Итоговый список будет:

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

Эти методы могут вставлять несколько узлов и текстовых фрагментов за один вызов.

Например, здесь вставляется строка и элемент:

```html run
<div id="div"></div>
<script>
  div.before('<p>Привет</p>', document.createElement('hr'));
</script>
```

Весь текст вставляется *как текст*.

Поэтому финальный HTML будет:

```html run
*!*
&lt;p&gt;Привет&lt;/p&gt;
*/!*
<hr>
<div id="div"></div>
```

Другими словами, строки вставляются безопасным способом, как делает это `elem.textContent`.

Итак, эти методы могут использоваться только для вставки DOM-узлов или текстовых фрагментов.

А что, если мы хотим вставить HTML "как html", со всеми тегами и прочим, как делает это `elem.innerHTML`?

### insertAdjacentHTML/Text/Element

Это другой, довольно универсальный метод: `elem.insertAdjacentHTML(where, html)`.

Первый параметр - это специальное слово, указывающее, куда по отношению к `elem` производить вставку. Значение должно быть одним из следующих:

- `"beforebegin"` -- вставить `html` непосредственно перед `elem`,
- `"afterbegin"` -- вставить `html` в начало `elem`,
- `"beforeend"` -- вставить `html` в конец `elem`,
- `"afterend"` -- вставить `html` непосредственно после `elem`.

Второй параметр - это HTML-строка, вставляется "как HTML".

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

Так мы можем добавлять произвольный HTML на нашу страницу.

Варианты вставки:

![](insert-adjacent.png)

Мы можем легко заметить сходство между этой и предыдущей картинкой. Точки вставки фактически одинаковые, но этот метод вставляет HTML.

У метода есть два брата:

- `elem.insertAdjacentText(where, text)` -- такой же синтаксис, но строка `text` вставляется "как текст", вместо HTML,
- `elem.insertAdjacentElement(where, elem)` -- такой же синтаксис, но вставляет элемент.

Они существуют в основном, чтобы сделать синтаксис "единым". На практике часто используется только `insertAdjacentHTML`. Потому что для элементов и текста у нас есть методы `append/prepend/before/after` -- их быстрее написать, и они могут вставлять как узлы, так и текст.

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
  document.body.insertAdjacentHTML("afterbegin", `<div class="alert alert-success">
    <strong>Всем привет!</strong> Вы прочитали важное сообщение.
  </div>`);
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

Мы упоминаем `DocumentFragment` в основном потому, что он используется в некоторых концепциях, например, для элемента [template](info:template-element), который мы рассмотрим гораздо позже.


## Методы удаления

Для удаления узлов есть следующие методы:


`parentElem.removeChild(node)`
: Удаляет `node` из  `parentElem` (при условии, что это дочерний элемент).

`node.remove()`
: Удаляет `node` со своего места.

Мы можем легко увидеть, что второй метод гораздо короче. Первый до сих пор существует по историческим причинам.

````smart
Если нам нужно *переместить* элемент в другое место -- нет необходимости удалять его со старого.

**Все методы вставки автоматически удаляют узлы со старых мест.**

Например, давайте поменяем местами элементы:

```html run height=50
<div id="first">Первый</div>
<div id="second">Второй</div>
<script>
  // нет необходимости вызывать метод remove
  second.after(first); // берёт #second и после него - вставляет #first
</script>
```
````

Давайте сделаем, чтобы наше сообщение исчезало через секунду:

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
  div.className = "alert alert-success";
  div.innerHTML = "<strong>Всем привет!</strong> Вы прочитали важное сообщение.";

  document.body.append(div);
*!*
  setTimeout(() => div.remove(), 1000);
  // или setTimeout(() => document.body.removeChild(div), 1000);
*/!*
</script>
```

## Несколько слов о "document.write"

Это ещё один, очень древний метод добавления содержимого на веб-страницу: `document.write`.

Синтаксис:

```html run
<p>Кде-то на странице...</p>
*!*
<script>
  document.write('<b>Привет из JS</b>');
</script>
*/!*
<p>Конец</p>
```

Вызов `document.write(html)` записывает `html` на страницу "прямо здесь и сейчас". Строка `html` может быть динамически сгенерирована, поэтому метод достаточно гибкий. Мы можем использовать JavaScript, чтобы создать полноценную веб-страницу и записать её.

Метод пришёл к нам со времён, когда ещё не было ни DOM, ни стандартов... Действительно старые времена. Он всё ещё живёт, потому что есть скрипты, которые используют его.

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

Это было недостатком.

Технически, когда `document.write` запускается во время чтения HTML браузером, и что-то пишет в документ, то браузер воспринимает это так, как будто это изначально было частью загруженного HTML-документа.

В этом есть плюс -- он работает невероятно быстро, потому что *не осуществляет модификации DOM*. Метод пишет прямо в текст страницы, пока DOM ещё в процессе создания, и браузер помещает написанное в DOM в процессе его генерации.

Итак, если нам нужно динамически добавить много текста в HTML, и мы находимся на стадии загрузки, и для нас очень важна скорость, это может помочь. Но на практике эти требования редко сочетаются. И обычно мы можем увидеть этот метод в скриптах просто потому, что они старые.

## Итого

Методы для создания узлов:

- `document.createElement(tag)` -- создаёт элемент с заданным тегом,
- `document.createTextNode(value)` -- создаёт текстовый узел (редко используется),
- `elem.cloneNode(deep)` -- клонирует элемент, если `deep==true`, то со всеми дочерними элементами.  

Вставка и удаление узлов:

- От родительского элемента:
  - `parent.appendChild(node)`
  - `parent.insertBefore(node, nextSibling)`
  - `parent.removeChild(node)`
  - `parent.replaceChild(newElem, node)`

  Все эти методы возвращают `node`.

- Если задан список узлов и строк:
  - `node.append(...nodes or strings)` -- вставляет в `node` в конец,
  - `node.prepend(...nodes or strings)` -- вставляет в `node` в начало,
  - `node.before(...nodes or strings)` –- вставляет прямо перед `node`,
  - `node.after(...nodes or strings)` –- вставляет сразу после `node`,
  - `node.replaceWith(...nodes or strings)` –- заменяет `node`.
  - `node.remove()` –- удаляет `node`.

  Текстовые строки вставляются "как есть".

- Если нужно вставить фрагмент HTML, то `elem.insertAdjacentHTML(where, html)` вставляет в зависимости от `where`:
  - `"beforebegin"` -- вставляет `html` прямо перед `elem`,
  - `"afterbegin"` -- вставляет `html` в `elem` в начало,
  - `"beforeend"` -- вставляет `html` в `elem` в конец,
  - `"afterend"` -- вставляет `html` сразу после `elem`.

  Также существуют похожие методы `elem.insertAdjacentText` и `elem.insertAdjacentElement`, они вставляют текстовые строки и элементы, но они редко используются.

- Чтобы добавить HTML на страницу до завершения её загрузки:
  - `document.write(html)`

  После загрузки страницы такой вызов затирает документ. В основном встречается в старых скриптах.
