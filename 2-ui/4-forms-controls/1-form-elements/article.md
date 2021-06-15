# Свойства и методы формы

Формы и элементы управления, такие как `<input>`, имеют множество специальных свойств и событий.

Работать с формами станет намного удобнее, когда мы их изучим.

## Навигация: формы и элементы

Формы в документе входят в специальную коллекцию `document.forms`.

<<<<<<< HEAD
Это так называемая "именованная" коллекция: мы можем использовать для получения формы как её имя, так и порядковый номер в документе.

```js no-beautify
document.forms.my - форма с именем "my" (name="my")
document.forms[0] - первая форма в документе
=======
That's a so-called *"named collection"*: it's both named and ordered. We can use both the name or the number in the document to get the form.

```js no-beautify
document.forms.my; // the form with name="my"
document.forms[0]; // the first form in the document
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
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

<<<<<<< HEAD
Может быть несколько элементов с одним и тем же именем, это часто бывает с кнопками-переключателями `radio`.

В этом случае `form.elements[name]` является коллекцией, например:
=======
There may be multiple elements with the same name. This is typical with radio buttons and checkboxes.

In that case, `form.elements[name]` is a *collection*. For instance:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

Эти навигационные свойства не зависят от структуры тегов внутри формы. Все элементы управления формы, как бы глубоко они не находились в форме, доступны в коллекции `form.elements`.

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

<<<<<<< HEAD
Обычно это не вызывает проблем, так как мы редко меняем имена у элементов формы.
=======
That's usually not a problem, however, because we rarely change names of form elements.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

````

## Обратная ссылка: element.form

<<<<<<< HEAD
Для любого элемента форма доступна через `element.form`. Так что форма ссылается на все элементы, а эти элементы ссылаются на форму.
=======
For any element, the form is available as `element.form`. So a form references all elements, and elements reference the form.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
1. `select.options` -- коллекция из подэлементов `<option>`,
2. `select.value` -- значение выбранного в данный момент `<option>`,
3. `select.selectedIndex` -- номер выбранного `<option>`.
=======
1. `select.options` -- the collection of `<option>` subelements,
2. `select.value` -- the *value* of the currently selected `<option>`,
3. `select.selectedIndex` -- the *number* of the currently selected `<option>`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Они дают три разных способа установить значение в `<select>`:

<<<<<<< HEAD
1. Найти соответствующий элемент `<option>` и установить в `option.selected` значение `true`.
2. Установить в `select.value` значение нужного `<option>`.
3. Установить в `select.selectedIndex` номер нужного `<option>`.

Первый способ наиболее понятный, но `(2)` и `(3)` являются более удобными при работе.

Вот эти способы на примере:
=======
1. Find the corresponding `<option>` element (e.g. among `select.options`) and set its `option.selected` to `true`.
2. If we know a new value: set `select.value` to the new value.
3. If we know the new option number: set `select.selectedIndex` to that number.

Here is an example of all three methods:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```html run
<select id="select">
  <option value="apple">Яблоко</option>
  <option value="pear">Груша</option>
  <option value="banana">Банан</option>
</select>

<script>
<<<<<<< HEAD
  // все три строки делают одно и то же
  select.options[2].selected = true;
=======
  // all three lines do the same thing
  select.options[2].selected = true; 
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  select.selectedIndex = 2;
  select.value = 'banana';
  // please note: options start from zero, so index 2 means the 3rd option.
</script>
```

<<<<<<< HEAD
В отличие от большинства других элементов управления, `<select>` позволяет нам выбрать несколько вариантов одновременно, если у него стоит атрибут `multiple`. Эту возможность используют редко, но в этом случае для работы со значениями необходимо использовать первый способ, то есть ставить или удалять свойство `selected` у подэлементов `<option>`.

Их коллекцию можно получить как `select.options`, например:
=======
Unlike most other controls, `<select>` allows to select multiple options at once if it has `multiple` attribute. This attribute is rarely used, though.

For multiple selected values, use the first way of setting values: add/remove the `selected` property from `<option>` subelements.

Here's an example of how to get selected values from a multi-select:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

  alert(selected); // blues,rock
</script>
```

Полное описание элемента `<select>` доступно в спецификации <https://html.spec.whatwg.org/multipage/forms.html#the-select-element>.

### new Option

<<<<<<< HEAD
Элемент `<option>` редко используется сам по себе, но и здесь есть кое-что интересное.

В [спецификации](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) есть красивый короткий синтаксис для создания элемента `<option>`:
=======
In the [specification](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) there's a nice short syntax to create an `<option>` element:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
option = new Option(text, value, defaultSelected, selected);
```

<<<<<<< HEAD
Параметры:
=======
This syntax is optional. We can use `document.createElement('option')` and set attributes manually. Still, it may be shorter, so here are the parameters:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- `text` -- текст внутри `<option>`,
- `value` -- значение,
- `defaultSelected` -- если `true`, то ставится HTML-атрибут `selected`,
- `selected` -- если `true`, то элемент `<option>` будет выбранным.

<<<<<<< HEAD
Тут может быть небольшая путаница с `defaultSelected` и `selected`. Всё просто: `defaultSelected` задаёт HTML-атрибут, его можно получить как  `option.getAttribute('selected')`, а `selected` - выбрано значение или нет, именно его важно поставить правильно. Впрочем, обычно ставят оба этих значения в `true` или не ставят вовсе (т.е. `false`).

Пример:
=======
The difference between `defaultSelected` and `selected` is that `defaultSelected` sets the HTML-attribute (that we can get using `option.getAttribute('selected')`, while `selected` sets whether the option is selected or not.

In practice, one should usually set _both_ values to `true` or `false`. (Or, simply omit them; both default to `false`.)

For instance, here's a new "unselected" option:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
let option = new Option("Текст", "value");
// создаст <option value="value">Текст</option>
```

<<<<<<< HEAD
Тот же элемент, но выбранный:
=======
The same option, but selected:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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

<<<<<<< HEAD
Значения элементов формы доступны через `input.value`, `textarea.value`, `select.value` и т.д. либо  `input.checked` для чекбоксов и переключателей.

Для элемента `<select>` мы также можем получить индекс выбранного пункта через `select.selectedIndex`, либо используя коллекцию пунктов `select.options`.
=======
Value is available as `input.value`, `textarea.value`, `select.value`, etc. (For checkboxes and radio buttons, use `input.checked` to determine whether a value is selected.)

For `<select>`, one can also get the value by the index `select.selectedIndex` or through the options collection `select.options`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Это были основы для начала работы с формами. Далее в учебнике мы встретим ещё много примеров.

В следующей главе мы рассмотрим такие события, как `focus` и `blur`, которые могут происходить на любом элементе, но чаще всего обрабатываются в формах.
