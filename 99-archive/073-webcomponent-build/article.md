archive:
  ref: web-components

---

# Веб-компонент в сборе

В этой главе мы посмотрим на итоговый пример веб-компонента, включающий в себя описанные ранее технологии: Custom Elements, Shadow DOM, CSS Scoping и, конечно же, Imports.

## Компонент ui-message

Компонент `ui-message` будет описан в отдельном файле `ui-message.html`.

Его использование будет выглядеть следующим образом:

```html
<link rel="import" id="link" href="ui-message.html">

<style>
  ui-message {
    width: 80%;
    margin: auto;
  }
</style>

*!*
<ui-message class="info">Доброе утро, страна!</ui-message>
*/!*

*!*
<ui-message class="warning">Внимание-внимание! Говорит информбюро!</ui-message>
*/!*
```

Этот код ничем не отличается от использования обычного элемента, поэтому перейдём дальше, к содержимому `ui-message.html`

## Шаблон для ui-message

Файл `ui-message.html` можно начать с шаблона:

```html
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

    :host {
      display: block;
    }

    :host(.info) .content {
      color: green;
    }

    :host(.warning) .content {
      color: red;
    }
  </style>
  <div class="content">
    <content></content>
  </div>
</template>
```

Этот шаблон рисует `<div class="content">` и заполняет его содержимым элемента-хозяина.

Важные детали:

- Самое важное правило здесь `:host { display:block }`.

    Оно обязательно! . Это правило задаёт, что корень DOM-дерева будет иметь `display:block`. По умолчанию `:host` не создаёт CSS-блок, а это значит, что ни ширину ни отступы указать не получится.
- Последующие правила `:host(.info) .content` и `:host(.warning) .content` стилизуют содержимое в зависимости от того, какой на хозяине класс.

## Скрипт для ui-message

В файле `ui-message.html` мы создадим новый элемент `<ui-message>`:

```js
// (1) получить шаблон
var localDocument = document.currentScript.ownerDocument;
var tmpl = localDocument.getElementById('tmpl');

// (2) создать элемент
var MessageProto = Object.create(HTMLElement.prototype);

MessageProto.createdCallback = function() {
  var root = this.createShadowRoot();
  root.appendChild(tmpl.content.cloneNode(true));
};

// (3) зарегистрировать в DOM
document.registerElement('ui-message', {
  prototype: MessageProto
});
```

Все компоненты этого кода мы подробно разбирали ранее:

1. Получаем шаблон из текущего документа, то есть из самого импорта.
2. Описываем элемент. Он довольно прост -- при создании записывает в свой `Shadow DOM` шаблон. При этом содержимое исходного элемента будет показано в `<content>`, но делать правила на сам `content` бессмысленно -- они не сработают. Нужно либо перейти внутрь `<content>` при помощи `::content`-селектора, либо указать для внешнего элемента `.content`, что в данном случае и сделано.
3. С момента регистрации все уже существующие элементы `<ui-message>` будут превращены в описанные здесь. И будущие, конечно, тоже.

Компонент в действии:

[codetabs src="message" height=200]

## Компонент ui-slider с jQuery

Компонент может использовать и внешние библиотеки.

Для примера создадим слайдер с использованием библиотеки [jQuery UI](https://jqueryui.com).

Компонент `ui-slider` будет показывать слайдер с минимальным и максимальным значением из атрибутов `min/max` и генерировать событие `slide` при его перемещении.

Использование:

```html
<link rel="import" id="link" href="ui-slider.html">

<ui-slider min="0" max="1000" id="elem"></ui-slider>

<script>
  elem.addEventListener("slide", function(e) {
    value.innerHTML = e.detail.value;
  });
</script>

<div id="value">0</div>
```

## Файл компонента ui-slider

Файл `ui-slider.html`, задающий компонент, мы разберём по частям.

### Заголовок

В начале подключим jQuery и jQuery UI.

Мы импортируем в слайдер `jquery.html`, который содержит теги `<script>` вместо того, чтобы явным образом прописывать загрузку скриптов:

```html
<head>
  <link rel="import" href="jquery.html">
</head>
```

Это сделано для того, чтобы другие компоненты, которым тоже могут понадобится эти библиотеки, также могли импортировать `jquery.html`. При повторном импорте ничего не произойдёт, скрипты не будут подгружены и исполнены два раза.

То есть, это средство оптимизации.

Содержимое `jquery.html`:

[html src="ui-slider/jquery.html"]

### Шаблон

Шаблон будет помещён в Shadow DOM. В нём должны быть стили и элементы, необходимые слайдеру.

Конкретно для слайдера из разметки достаточно одного элемента `<div id="slider"></div>`, который затем будет обработан jQuery UI.

Кроме того, в шаблоне должны быть стили:

```html
<template id="tmpl">
  <style>
    @import url(https://code.jquery.com/ui/1.11.4/themes/ui-lightness/jquery-ui.css);
    :host {
      display: block;
    }
  </style>
  <div id="slider"></div>
</template>
```

### Скрипт

Скрипт для нового элемента похож на тот, что делали раньше, но теперь он использует jQuery UI для создания слайдера внутри своего Shadow DOM.

Для его понимания желательно знать jQuery, хотя в коде ниже я намеренно свёл использование этой библиотеки к минимуму.

```js
var localDocument = document.currentScript.ownerDocument;
var tmpl = localDocument.getElementById('tmpl');

var SliderProto = Object.create(HTMLElement.prototype);

SliderProto.createdCallback = function() {
  // (1) инициализировать Shadow DOM, получить из него #slider
  var root = this.createShadowRoot();
  root.appendChild(tmpl.content.cloneNode(true));

  this.$slider = $(root.getElementById('slider'));

  var self = this;

  // (2) инициализировать слайдер, пробросить параметры
  this.$slider.slider({
    min: this.getAttribute('min') || 0,
    max: this.getAttribute('max') || 100,
    value: this.getAttribute('value') || 0,
    slide: function() {
      // (3) пробросить событие
      var event = new CustomEvent("slide", {
        detail: {
          value: self.$slider.slider("option", "value")
        },
        bubbles: true
      });
      self.dispatchEvent(event);
    }
  });
};

document.registerElement('ui-slider', {
  prototype: SliderProto
});
```

Функция `createdCallback` по шагам:

1. Создаём Shadow DOM, элемент `#slider` получаем из него, он не в основном документе.
2. Используя jQuery UI, слайдер создаётся вызовом [jQuery UI методом slider](https://jqueryui.com/slider/), который имеет вид `$elem.slider({...параметры...});`. Параметры получаем из атрибутов `<ui-slider>` (он же `this`) и отдаём библиотеке. Она делает всю работу.
3. Параметр `slide` задаёт функцию-колбэк, которая вызывается при передвижении слайдера и будет генерировать DOM-событие на элементе, на которое можно будет поставить обработчик при помощи `addEventListener`. В его деталях мы указываем новое значение слайдера.

Полный код с примером:

[codetabs src="ui-slider" height=300]

Его можно далее улучшать, например добавить геттер и сеттер для значения `value`:

```js
Object.defineProperty(SliderProto, 'value', {
  get: function() {
    return this.$slider.slider("option", "value");
  },
  set: function(value) {
    this.$slider.slider('option', 'value', value);
  }
});
```

Если добавить этот код, то к значению `<ui-slider>` можно будет обращаться как `elem.value`, аналогично всяким встроенным `<input>`.

## Проблема с jQuery

Попробуйте пример выше. Он не совсем работает. Слайдер прокручивается первый раз, но второй раз он как-то странно "прыгает".

Чтобы понять, почему это происходит, я заглянул в исходники jQuery UI и, после отладки происходящего, натолкнулся на проблемный код.

Он был в методе [offset](https://api.jquery.com/offset/), который предназначен для того, чтобы определять координаты элемента. Этот метод не срабатывал, поскольку в нём есть проверка, которая выглядит примерно так:

```js
var box = {
  top: 0,
  left: 0
};
...
// Make sure it's not a disconnected DOM node
if(!jQuery.contains(elem.ownerDocument, elem)) {
  return box;
}
```

То есть, jQuery проверяет, находится ли элемент `elem` внутри своего документа `elem.ownerDocument`. Если нет -- то считается, что элемент вне DOM, и его размеры равны нулю.

Если копнуть чуть глубже, то `jQuery.contains` в современных браузерах сводится к обычному вызову [contains](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains).

Парадокс с Shadow DOM заключается в том, что вызов `elem.ownerDocument.contains(elem)` вернёт `false`!

Получилось, что элемент не в документе и одновременно он имеет размеры. Такого разработчики jQuery не предусмотрели.

Можно, конечно, побежать исправлять jQuery, но давайте подумаем, может быть так оно и должно быть?

С точки зрения здравого смысла, Shadow DOM является частью текущего документа. Это соответствует и духу [текущей спецификации](http://w3c.github.io/webcomponents/spec/shadow/), где shadow tree рассматривается в контексте document tree.

Поэтому на самом деле `document.contains(elem)` следовало бы возвращать `true`.

Почему же `false`? Причина проста -- описанный в [другом стандарте](http://www.w3.org/TR/dom/#dom-node-contains) механизм работы `contains` по сути состоит в проходе вверх от `elem` по цепочке `parentNode`, пока либо встретим искомый элемент, тогда ответ `true`, а иначе `false`. В случае с Shadow DOM этот путь закончится на корне Shadow DOM-дерева, оно ведь не является потомком хозяина.

**Метод `contains` описан стандартом без учёта Shadow DOM, поэтому возвратил неверный результат `false`.**

Это один из тех небольших, но важных нюансов, которые показывают, что стандарты всё ещё в разработке.

## Итого

- С использованием современных технологий можно делать компоненты. Но это, всё же, дело будущего. Все стандарты находятся в процессе доработки, готовятся новые.
- Можно использовать произвольную библиотеку, такую как jQuery, и работать с Shadow DOM с её использованием. Но возможны проблемки. Выше была продемонстрирована одна из них, могут быть и другие.

Пока веб-компоненты ещё не являются законченными стандартами, можно попробовать [Polymer](http://www.polymer-project.org) -- это самый известный из полифилов на тему веб-компонент.

Он старается их эмулировать по возможности кросс-браузерно, но пока что это довольно-таки сложно, в частности, необходима дополнительная разметка.

