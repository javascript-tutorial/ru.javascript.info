archive:
  ref: shadow-dom-style

---


# Стили и селекторы

Стилизация Shadow DOM покрывается более общей спецификацией ["CSS Scoping"](https://drafts.csswg.org/css-scoping/).

По умолчанию стили внутри Shadow DOM относятся только к его содержимому.

Например:

```html run autorun="no-epub"
<p>Жили мы тихо-мирно, и тут...</p>

<p id="elem">Доброе утро, страна!</p>

<template id="tmpl">
*!*
  <style>
    p {
      color: red;
    }
  </style>
*/!*
  <h3><content></content></h3>
  <p>Привет из подполья!</p>
</template>

<script>
  var root = elem.createShadowRoot();
  root.appendChild(tmpl.content.cloneNode(true));
</script>
```

При запуске окрашенным в красный цвет окажется только `<p>` внутри Shadow DOM. Обратим внимание, окрасился именно тот элемент, который находится непосредственно в Shadow DOM. А элементы, которые отображены в Shadow DOM при помощи `<content>`, этот стиль не получили -- у них есть свои, заданные на внешней странице.

## Внешний стиль для Shadow DOM

Граница между Shadow DOM и основным DOM, хоть и существует, но при помощи специальных селекторов её можно переходить.

Если нужно с основной страницы стилизовать или выбрать элементы внутри Shadow DOM, то можно использовать селекторы:

- **`::shadow` -- выбирает корень Shadow DOM.**

    Выбранный элемент  сам по себе не создаёт CSS box, но служит отправной точкой для дальнейшей выборки уже внутри дерева Shadow DOM.

    Например, `#elem::shadow > div` найдёт внутри Shadow DOM `#elem` элементы `div` первого уровня.
- **`>>>` -- особого вида CSS-селектор для всех элементов Shadow DOM, который полностью игнорирует границы между DOM'ами, включая вложенные подэлементы, у которых тоже может быть свой Shadow DOM.**

    Например, `#elem >>> span` найдёт все `span` внутри Shadow DOM `#elem`, но кроме того, если в `#elem` есть подэлементы, у которых свой Shadow DOM, то оно продолжит поиск в них.

    Вот пример, когда внутри одного Shadow DOM есть `<input type="date">`, у которого тоже есть Shadow DOM:

    ```html run
    <style>
      #elem::shadow span {
        /* для span только внутри Shadow DOM #elem */

        border-bottom: 1px dashed blue;
      }

      #elem >>> * {
        /* для всех элементов внутри Shadow DOM #elem и далее внутри input[type=date] */

        color: red;
      }
    </style>

    <p id="elem"></p>

    <script>
      var root = elem.createShadowRoot();
      root.innerHTML = "<span>Текущее время:</span> <input type='date'>";
    </script>
    ```
- Кроме того, на Shadow DOM действует обычное CSS-наследование, если свойство поддерживает его по умолчанию.

    В этом примере CSS-стили для `body` наследуются на внутренние элементы, включая Shadow DOM:

    ```html run autorun="no-epub"
    <style>
      body {
        color: red;
        font-style: italic;
      }
    </style>
    <p id="elem"></p>
    <script>
      elem.createShadowRoot().innerHTML = "<span>Привет, мир!</span>";
    </script>
    ```

    Внутренний элемент станет красным курсивом.

````warn header="Нельзя получить содержимое встроенных элементов"
Описанные CSS-селекторы можно использовать не только в CSS, но и в `querySelector`.

Исключением являются встроенные элементы типа `<input type="date">`, для которых CSS-селекторы работают, но  получить их содержимое нельзя.

Например:

```html run
<p id="elem"></p>

<script>
  var root = elem.createShadowRoot();
  root.innerHTML = "<span>Текущее время:</span> <input type='date'>";

  // выберет только span из #elem
  // вообще-то, должен выбрать span и из вложенных Shadow DOM,
  // но для встроенных элементов - не умеет
  alert( document.querySelectorAll('#elem::shadow span').length ); // 1
</script>
```
````

## Стиль в зависимости от хозяина

Следующие селекторы позволяют изнутри Shadow DOM выбрать внешний элемент ("элемент-хозяин"):

- `:host` выбирает элемент-хозяин, в котором, живёт Shadow DOM.

    Хозяин :host выбирается именно в контексте Shadow DOM.

    То есть, это доступ не к внешнему элементу, а, скорее, к корню текущего Shadow DOM.

    После `:host` мы можем указать селекторы и стили, которые нужно применить, если хозяин удовлетворяет тому или иному условию, например:

    ```html
    <style>
      :host > p {
        color: green;
      }
    </style>
    ```

    Этот селектор сработает для `<p>` первого уровня внутри Shadow DOM.
- `:host(селектор хозяина)` выбирает элемент-хозяин, если он подходит под селектор.

    Этот селектор используется для темизации хозяина "изнутри", в зависимости от его классов и атрибутов. Он отлично добавляет просто `:host`, например:

    ```css
    :host p {
      color: green;
    }

    :host(.important) p {
      color: red;
    }
    ```

    Здесь параграфы будут иметь `color:green`, но если у хозяина класс `.important`, то `color:red`.
- `:host-context(селектор хозяина)` выбирает элемент-хозяин, если какой-либо из его родителей удовлетворяет селектору, например:

    ```css
    :host-context(h1) p {
      /* селектор сработает для p, если хозяин находится внутри h1 */
    }
    ```

    Это используется для расширенной темизации, теперь уже не только в зависимости от его атрибутов, но и от того, внутри каких элементов он находится.

Пример использования селектора `:host()` для разной расцветки Shadow DOM-сообщения, в зависимости от того, в каком оно `<p>`:

```html run autorun="no-epub" no-beautify
*!*
<p class="message info">Доброе утро, страна!</p>
*/!*

*!*
<p class="message warning">Внимание-внимание! Говорит информбюро!</p>
*/!*

<template id="tmpl">
  <style>
  .content {
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
  }

*!*
  :host(.info) .content {
    color: green;
  }

  :host(.warning) .content {
    color: red;
  }
*/!*

  </style>
  <div class="content"><content></content></div>
</template>

<script>
var elems = document.querySelectorAll('p.message');

elems[0].createShadowRoot().appendChild( tmpl.content.cloneNode(true) );
elems[1].createShadowRoot().appendChild( tmpl.content.cloneNode(true) );
</script>
```

## Стиль для content

Тег `<content>` не меняет DOM, а указывает, что где показывать. Поэтому если элемент изначально находится в элементе-хозяине -- внешний документ сохраняет к нему доступ.

К нему будут применены стили и сработают селекторы, всё как обычно.

Например, здесь применится стиль для `<span>`:

```html run autorun="no-epub" no-beautify
<style>
*!*
  span { text-decoration: underline; }
*/!*
</style>

<p id="elem"><span>Доброе утро, страна!</span></p>

<template id="tmpl">
  <h3><content></content></h3>
  <p>Привет из подполья!</p>
</template>

<script>
  elem.createShadowRoot().appendChild( tmpl.content.cloneNode(true) );
</script>
```

В примере выше заголовок "Доброе утро, страна!", который пришёл как `<span>` из внешнего документа, будет подчёркнут,

Итак, стили основного DOM-дерева применяются, всё в порядке.

Но что, если Shadow DOM тоже "имеет виды" на `<content>` и хочет стилизовать вставленное? Это тоже возможно.

**Для обращения к "содержимому" `<content>` из стилей внутри Shadow DOM используется псевдоэлемент `::content`.**

Например, изнутри Shadow DOM селектор `content[select="h1"]::content span` найдёт элемент `<content select="h1">` и *в его содержимом* отыщет `<span>`.

В примере ниже селектор `::content span` стилизует все `<span>` внутри всех `<content>`:

```html run no-beautify
<style>
*!*
  span { text-decoration: underline; }
*/!*
</style>

<p id="elem"><span>Доброе утро, страна!</span></p>

<template id="tmpl">
  <style>
*!*
    ::content span { color: green; }
*/!*
  </style>
  <h3><content></content></h3>
  <span>Привет из подполья!</span>
</template>

<script>
  elem.createShadowRoot().appendChild( tmpl.content.cloneNode(true) );
</script>
```

Текст внутри `<h3>` -- зелёный и подчёркнутый одновременно, но стилизуется именно тот `<span>`, который показан в `<content>`, а тот, который просто в Shadow DOM -- нет.

Приоритет селекторов рассчитывается по [обычным правилам специфичности](https://www.w3.org/TR/selectors-3/#specificity), если же приоритеты стилей на странице и в Shadow DOM равны, то, как описано в секции [Cascading](https://drafts.csswg.org/css-scoping/#cascading), побеждает страница, а для `!important`-стиля побеждает Shadow DOM.

## Итого

По умолчанию стили и селекторы из DOM-дерева действуют только на те элементы, в которых сами находятся.

Границу можно преодолевать, причём проще, естественно, от родителя к Shadow DOM, чем наоборот:

- Снаружи можно выбирать и стилизовать элементы внутри Shadow DOM -- при помощи селекторов `::shadow` и `>>>`.
- Изнутри Shadow DOM можно стилизовать не только то, что изначально в Shadow DOM, но и узлы, показываемые в `<content>`.
- Также можно ставить стиль в зависимость от хозяина при помощи селекторов `::host`, `::host-context`, но выбирать и стилизовать произвольные теги внутри хозяина нельзя.

