# Свойства и методы формы

Формы и элементы управления, такие как `<input>`, имеют множество специальных свойств и событий.

Работать с формами станет намного удобнее, когда мы их изучим.

## Навигация: формы и элементы

Формы в документе входят в специальную коллекцию `document.forms`.

Это - так называемая "именованная" коллекция: мы можем использовать для получения формы как её имя, так и порядковый номер в документе.

```js no-beautify
document.forms.my - форма с именем "my" (name="my")
document.forms[0] - первая форма в документе
```

Когда мы уже получили форму, любой элемент доступен в именованной коллекции `form.elements`.

Например:

```html run height=40
<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
</form>

<script>
  // получаем форму
  let form = document.forms.my; // <form name="my"> element

  // получаем элемент
  let elem = form.elements.one; // <input name="one"> element

  alert(elem.value); // 1
</script>
```

Может быть несколько элементов с одним и тем же именем, это часто бывает с кнопками-переключателями `radio`.

В этом случае `form.elements[name]` является коллекцией, например:

```html run height=40
<form>
  <input type="radio" *!*name="age"*/!* value="10">
  <input type="radio" *!*name="age"*/!* value="20">
</form>

<script>
let form = document.forms[0];

let ageElems = form.elements.age;

*!*
alert(ageElems[0]); // [object HTMLInputElement]
*/!*
</script>
```

Эти навигационные свойства не зависят от структуры тегов внутри формы. Все элементы управления формы, как бы глубоко они ни находились в форме, доступны в коллекции `form.elements`.

````smart header="`<fieldset>` как \"подформа\""
Форма может содержать один или несколько элементов `<fieldset>` внутри себя. Они также поддерживают свойство `elements`, в котором находятся элементы управления внутри них.

Например:

```html run height=80
<body>
  <form id="form">
    <fieldset name="userFields">
      <legend>info</legend>
      <input name="login" type="text">
    </fieldset>
  </form>

  <script>
    alert(form.elements.login); // <input name="login">

*!*
    let fieldset = form.elements.userFields;
    alert(fieldset); // HTMLFieldSetElement

    // мы можем достать элемент по имени как из формы, так и из fieldset с ним
    alert(fieldset.elements.login == form.elements.login); // true
*/!*
  </script>
</body>
```
````

````warn header="Сокращённая форма записи: `form.name`"
Есть более короткая запись: мы можем получить доступ к элементу через `form[index/name]`.

Другими словами, вместо `form.elements.login` мы можем написать `form.login`.

Это также работает, но есть небольшая проблема: если мы получаем элемент, а затем меняем его свойство `name`, то он всё ещё будет доступен под старым именем (также, как и под новым).

В этом легче разобраться на примере:

```html run height=40
<form id="form">
  <input name="login">
</form>

<script>
  alert(form.elements.login == form.login); // true, ведь это одинаковые <input>

  form.login.name = "username"; // изменяем свойство name у элемента input

  // form.elements обновили свои имена:
  alert(form.elements.login); // undefined
  alert(form.elements.username); // input

*!*
  // а в form мы можем использовать оба имени: новое и старое
  alert(form.username == form.login); // true
*/!*
</script>
```

Обычно это не вызывает проблем, так как мы редко меняем имена у элементов формы.

````

## Обратная ссылка: element.form

Для любого элемента форма доступна через `element.form`. Так что форма ссылается на все элементы, а эти элементы ссылаются на форму.

Вот иллюстрация:

![](form-navigation.svg)

Пример:

```html run height=40
<form id="form">
  <input type="text" name="login">
</form>

<script>
*!*
  // form -> element
  let login = form.login;

  // element -> form
  alert(login.form); // HTMLFormElement
*/!*
</script>
```

## Элементы формы

Рассмотрим элементы управления, используемые в формах.

### input и textarea

К их значению можно получить доступ через свойство `input.value` (строка) или `input.checked` (булево значение) для чекбоксов.

Вот так:

```js
input.value = "Новое значение";
textarea.value = "Новый текст";

input.checked = true; // для чекбоксов и переключателей
```

```warn header="Используйте `textarea.value` вместо `textarea.innerHTML`"
Обратим внимание: хоть элемент `<textarea>...</textarea>` и хранит своё значение как вложенный HTML, нам не следует использовать `textarea.innerHTML` для доступа к нему.

Там хранится только тот HTML, который был изначально на странице, а не текущее значение.
```

### select и option

Элемент `<select>` имеет 3 важных свойства:

1. `select.options` -- коллекция из подэлементов `<option>`,
2. `select.value` -- значение выбранного в данный момент `<option>`,
3. `select.selectedIndex` -- номер выбранного `<option>`.

Они дают три разных способа установить значение в `<select>`:

1. Найти соответствующий элемент `<option>` и установить в `option.selected` значение `true`.
2. Установить в `select.value` значение нужного `<option>`.
3. Установить в `select.selectedIndex` номер нужного `<option>`.

Первый способ наиболее понятный, но `(2)` и `(3)` являются более удобными при работе.

Вот эти способы на примере:

```html run
<select id="select">
  <option value="apple">Яблоко</option>
  <option value="pear">Груша</option>
  <option value="banana">Банан</option>
</select>

<script>
  // все три строки делают одно и то же
  select.options[2].selected = true;
  select.selectedIndex = 2;
  select.value = 'banana';
</script>
```

В отличие от большинства других элементов управления, `<select>` позволяет нам выбрать несколько вариантов одновременно, если у него стоит атрибут `multiple`. Эту возможность используют редко, но в этом случае для работы со значениями необходимо использовать первый способ, то есть ставить или удалять свойство `selected` у подэлементов `<option>`.

Их коллекцию можно получить как `select.options`, например:

```html run
<select id="select" *!*multiple*/!*>
  <option value="blues" selected>Блюз</option>
  <option value="rock" selected>Рок</option>
  <option value="classic">Классика</option>
</select>

<script>
  // получаем все выбранные значения из select с multiple
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // Блюз,Рок
</script>
```

Полное описание элемента `<select>` доступно в спецификации <https://html.spec.whatwg.org/multipage/forms.html#the-select-element>.

### new Option

Элемент `<option>` редко используется сам по себе, но и здесь есть кое-что интересное.

В [спецификации](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) есть красивый короткий синтаксис для создания элемента `<option>`:

```js
option = new Option(text, value, defaultSelected, selected);
```

Параметры:

- `text` -- текст внутри `<option>`,
- `value` -- значение,
- `defaultSelected` -- если `true`, то ставится HTML-атрибут `selected`,
- `selected` -- если `true`, то элемент `<option>` будет выбранным.

Тут может быть небольшая путаница с `defaultSelected` и `selected`. Всё просто: `defaultSelected` задаёт HTML-атрибут, его можно получить как  `option.getAttribute('selected')`, а `selected` - выбрано значение или нет, именно его важно поставить правильно. Впрочем, обычно ставят оба этих значения в `true` или не ставят вовсе (т.е. `false`).

Пример:

```js
let option = new Option("Текст", "value");
// создаст <option value="value">Текст</option>
```

Тот же элемент, но выбранный:

```js
let option = new Option("Текст", "value", true, true);
```

Элементы `<option>` имеют свойства:

`option.selected`
: Выбрана ли опция.

`option.index`
: Номер опции среди других в списке `<select>`.

`option.text`
: Содержимое опции (то, что видит посетитель).

## Ссылки

- Спецификация: <https://html.spec.whatwg.org/multipage/forms.html>.

## Итого

Свойства для навигации по формам:

`document.forms`
: Форма доступна через `document.forms[name/index]`.

`form.elements`  
: Элементы формы доступны через `form.elements[name/index]`, или можно просто использовать `form[name/index]`. Свойство `elements` также работает для `<fieldset>`.

`element.form`
: Элементы хранят ссылку на свою форму в свойстве `form`.

Значения элементов формы доступны через `input.value`, `textarea.value`, `select.value` и т.д. либо  `input.checked` для чекбоксов и переключателей.

Для элемента `<select>` мы также можем получить индекс выбранного пункта через `select.selectedIndex`, либо используя коллекцию пунктов `select.options`.

Это были основы для начала работы с формами. Далее в учебнике мы встретим ещё много примеров.

В следующей главе мы рассмотрим такие события, как `focus` и `blur`, которые могут происходить на любом элементе, но чаще всего обрабатываются в формах.
