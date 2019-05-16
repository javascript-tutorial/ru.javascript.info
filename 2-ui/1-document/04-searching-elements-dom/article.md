# Поиск: getElement*, querySelector*

Прямая навигация от родителя к потомку удобна, если элементы расположены рядом. А что если нет? Как получить произвольный элемент откуда-то из глубины документа?

Для этого в DOM есть дополнительные методы поиска.

## document.getElementById или просто id

Если элементу назначен специальный атрибут `id`, то можно получить его по переменной с искомым значением `id`.

Мы можем использовать его для немедленного доступа к элементу:

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Элемент</div>
</div>

<script>
  alert(elem); // DOM-элемент с id="elem"
  alert(window.elem); // доступ к глобальной переменной

  // для `elem-content` сложнее так как в имени переменной `-`
  
  alert(window['elem-content']); // ... поэтому через [...]
</script>
```

Это поведение соответствует [стандарту](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem), но поддерживается в основном для совместимости, как осколок далёкого прошлого. Браузер пытается помочь нам, смешивая пространства имён JS и DOM, но при этом возможны конфликты, неочевидно откуда возьмётся переменная.

Если мы объявляем переменную с тем же именем, то она будет иметь приоритет:

```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5;

  alert(elem); // переменная переопределяет элемент
</script>
```

Лучшая альтернатива - использовать специальный метод `document.getElementById(id)`.

Например:

```html run
<div id="elem">
  <div id="elem-content">Элемент</div>
</div>

<script>
*!*
  let elem = document.getElementById('elem');
*/!*

  elem.style.background = 'red';
</script>
```
Далее в примерах мы часто будем использовать прямое обращение через `id`, но это только для краткости. В реальных проектах предпочтителен метод `document.getElementById`.

```smart header="Должен остаться только один"
Значение `id` должно быть уникальным. В документе может быть только один элемент с данным `id`.

Если в документе есть несколько элементов с одинаковым значением `id`, то поведение методов поиска непредсказуемо. Браузер может вернуть любой из них случайным образом. Поэтому, пожалуйста, придерживайтесь правила сохранения уникальности `id`.
```

```warn header="Только `document.getElementById`, а не `anyNode.getElementById`"
Метод `getElementById` можно вызвать только для объекта `document`. Он осуществляет поиск по `id` по всему документу.
```

## querySelectorAll [#querySelectorAll]

Самый универсальный метод `elem.querySelectorAll(css)` возвращает все элементы внутри `elem` удовлетворяющие CSS-селектору.

Следующий запрос получает все элементы `<li>`, которые являются последними потомками в `<ul>`:

```html run
<ul>
  <li>Этот</li>
  <li>тест</li>
</ul>
<ul>
  <li>полностью</li>
  <li>пройден</li>
</ul>
<script>
*!*
  let elements = document.querySelectorAll('ul > li:last-child');
*/!*

  for (let elem of elements) {
    alert(elem.innerHTML); // "тест", "пройден"
  }
</script>
```

Этот метод действительно мощный, поэтому можно использовать любой CSS-селектор.

```smart header="Псевдоклассы тоже работают"
Псевдоклассы в CSS-селекторе, в частности `:hover` и `:active`, также поддерживаются. Например, `document.querySelectorAll(':hover')` вернёт коллекцию (в порядке вложенности) из текущих элементов под курсором мыши.
```

## querySelector [#querySelector]

Метод `elem.querySelector(css)` возвращает первый элемент, соответствующий данному CSS-селектору.

Иначе говоря, результат такой же, как при `elem.querySelectorAll(css)[0]`, но в последнем вызове сначала ищутся *все* элементы, а потом берётся первый, а `elem.querySelector` ищется только первый, то есть он эффективнее.

## matches
Предыдущие методы искали по DOM.

Метод [elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) ничего не ищет, а проверяет, удовлетворяет ли `elem` CSS-селектору, и возвращает `true` или `false`.

Этот метод удобен, когда мы перебираем элементы(например в массиве) и пытаемся выбрать те из них, которые нас интересуют.

Например:

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // может быть любая коллекция вместо document.body.children
  for (let elem of document.body.children) {
*!*
    if (elem.matches('a[href$="zip"]')) {
*/!*
      alert("Ссылка на архив: " + elem.href );
    }
  }
</script>
```

## closest

*Предками* элемента являются: родитель, родитель родителя, его родитель и так далее. Вместе предки образуют цепочку иерархии.

Метод `elem.closest(css)` ищет ближайший элемент по иерархии DOM, который соответствует CSS-селектору. Сам элемент также включается в поиск.

Другими словами, метод `closest` поднимается вверх от элемента и проверяет каждого из родителей. Если он соответствует селектору, поиск прекращается и предок возвращается.

Например:

```html run
<h1>Содержание</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Глава 1</li>
    <li class="chapter">Глава 2</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null (потому что h1 не предок)
</script>
```

## getElementsBy*

Существуют также другие методы поиска элементов по тегу, классу и так далее.

На данный момент, они скорее исторические, так как `querySelector` более чем эффективен.

Здесь мы рассмотрим их для полноты картины, также вы можете встретить их в старом коде.

- `elem.getElementsByTagName(tag)` ищет элементы с данным тегом и возвращает их коллекцию. Передав `"*"` вместо тега можно получить всех потомков.
- `elem.getElementsByClassName(className)` возвращает элементы, которые имеют данный CSS-класс. Элементы могут иметь и другие классы.
- `document.getElementsByName(name)` возвращает элементы с заданным `name` атрибута для всего документа. Очень редко используется.

Например:
```js
// получить все элементы div в документе
let divs = document.getElementsByTagName('div');
```

Давайте найдем все `input` в таблице:

```html run height=50
<table id="table">
  <tr>
    <td>Ваш возраст:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> младше 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> от 18 до 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> старше 60
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="Не забываем про букву `\"s\"`!"
Одна из самых частых ошибок начинающих разработчиков (впрочем, иногда и не только)  - это забыть букву `"s"`. То есть пробовать вызывать метод `getElementByTagName` вместо <code>getElement<b>s</b>ByTagName</code>.

Буква `"s"` отсутствует в названии метода `getElementById`, так как в данном случае вызывает один элемент. Но `getElementsByTagName` вернёт список элементов, поэтому `"s"` обязательна.
```

````warn header="Возвращает коллекцию, а не элемент!"
Другая распространённая ошибка - написать:

```js
// не работает
document.getElementsByTagName('input').value = 5;
```

Это не сработает, так как вместо элемента присваивают значение *коллекции*.

Нужно перебрать коллекцию в цикле или получить элемент по номеру и уже ему присваивать значение, например так:

```js
// работает (если есть input)
document.getElementsByTagName('input')[0].value = 5;
```
````

Ищем элементы с классом `.article`:

```html run height=50
<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // ищем по имени атрибута
  let form = document.getElementsByName('my-form')[0];

  // ищем по классу внутри form
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, находим два элемента с классом article
</script>
```

## Живые коллекции

Все методы `"getElementsBy*"` возвращают *живую* коллекцию. Такие коллекции всегда отражают текущее состояние документа и автоматически обновляются при его изменении.

В приведённом ниже примере есть два скрипта.

1. Первый создает ссылку на коллекцию `<div>`. На этот момент её длина равна `1`.
2. Второй скрипт запускается после того, как браузер встречает ещё один `<div>`, теперь её длина `2`.

```html run
<div>First div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 2
*/!*
</script>
```

Напротив, `querySelectorAll` возвращает *статическую* коллекцию. Это как фиксированный массив элементов.

Если мы будем использовать его в примере выше, то оба скрипта вернут длину равную `1`:


```html run
<div>First div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 1
*/!*
</script>
```

Теперь мы видим разницу. Длина статической коллекции не изменилась после появления нового `div` в документе.

Мы использовали отдельные скрипты, чтобы увидеть как добавление элемента влияет на коллекцию, но любые манипуляции с DOM влияют на них.

## Итого

Есть 6 основных методов поиска элементов в DOM:

<table>
<thead>
<tr>
<td>Метод</td>
<td>Ищет по...</td>
<td>Ищет внутри элемента?</td>
<td>Возвращает живую коллекцию?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>tag or <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>class</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>
Безусловно, наиболее часто используемыми в настоящее время являются методы `querySelector` и `querySelectorAll`, но и методы  `getElementBy*` могут быть полезны в отдельных случаях, а также встречаются в старом коде.

Кроме того:

- Есть метод `elem.matches(css)`, который проверяет, удовлетворяет ли элемент CSS-селектору.
- Метод `elem.closest(css)` ищет ближайшего по иерархии предка, соответствующему данному CSS-селектору. Сам элемент также включён в поиск.

И давайте упомянем ещё один метод, который проверяет наличие отношений "потомок-предок":
-  `elemA.contains(elemB)` вернёт `true`, если `elemB` находится внутри `elemA` (`elemA` яляется предком `elemB`) или когда `elemA==elemB`.
