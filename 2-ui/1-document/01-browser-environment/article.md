# Браузерное окружение, спецификации

<<<<<<< HEAD
Язык JavaScript изначально был создан для веб-браузеров. Но с тех пор он значительно эволюционировал и превратился в кроссплатформенный язык программирования для решения широкого круга задач.

Сегодня JavaScript может использоваться в браузере, на веб-сервере или в какой-то другой среде, даже в кофеварке. Каждая среда предоставляет свою функциональность, которую спецификация JavaScript называет *окружением*.

Окружение предоставляет свои объекты и дополнительные функции, в дополнение базовым языковым. Браузеры, например, дают средства для управления веб-страницами. Node.js делает доступными какие-то серверные возможности и так далее.

На картинке ниже в общих чертах показано, что доступно для JavaScript в браузерном окружении:
=======
The JavaScript language was initially created for web browsers. Since then, it has evolved into a language with many uses and platforms.

A platform may be a browser, or a web-server or another *host*, or even a "smart" coffee machine if it can run JavaScript. Each of these provides platform-specific functionality. The JavaScript specification calls that a *host environment*.

A host environment provides its own objects and functions in addition to the language core. Web browsers give a means to control web pages. Node.js provides server-side features, and so on.

Here's a bird's-eye view of what we have when JavaScript runs in a web browser:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

![](windowObjects.svg)

Как мы видим, имеется корневой объект `window`, который выступает в 2 ролях:

1. Во-первых, это глобальный объект для JavaScript-кода, об этом более подробно говорится в главе <info:global-object>.
2. Во-вторых, он также представляет собой окно браузера и располагает методами для управления им.

<<<<<<< HEAD
Например, здесь мы используем `window` как глобальный объект:
=======
For instance, we can use it as a global object:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run global
function sayHi() {
  alert("Hello");
}

// глобальные функции доступны как методы глобального объекта:
window.sayHi();
```

<<<<<<< HEAD
А здесь мы используем `window` как объект окна браузера, чтобы узнать его высоту:
=======
And we can use it as a browser window, to show the window height:
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```js run
alert(window.innerHeight); // внутренняя высота окна браузера
```

<<<<<<< HEAD
Существует гораздо больше свойств и методов для управления окном браузера. Мы рассмотрим их позднее.

## DOM (Document Object Model)

Document Object Model, сокращённо DOM - объектная модель документа, которая представляет все содержимое страницы в виде объектов, которые можно менять.
=======
There are more window-specific methods and properties, which we'll cover later.

## DOM (Document Object Model)

The Document Object Model, or DOM for short, represents all page content as objects that can be modified.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Объект `document` - основная "входная точка". С его помощью мы можем что-то создавать или менять на странице.

Например:
```js run
// заменим цвет фона на красный,
document.body.style.background = "red";

// а через секунду вернём как было
setTimeout(() => document.body.style.background = "", 1000);
```

<<<<<<< HEAD
Мы использовали в примере только `document.body.style`, но на самом деле возможности по управлению страницей намного шире. Различные свойства и методы описаны в спецификации:

- **DOM Living Standard** на <https://dom.spec.whatwg.org>
=======
Here, we used `document.body.style`, but there's much, much more. Properties and methods are described in the specification: [DOM Living Standard](https://dom.spec.whatwg.org).
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

```smart header="DOM - не только для браузеров"
Спецификация DOM описывает структуру документа и предоставляет объекты для манипуляций со страницей. Существуют и другие, отличные от браузеров, инструменты, использующие DOM.

<<<<<<< HEAD
Например, серверные скрипты, которые загружают и обрабатывают HTML-страницы, также могут использовать DOM. При этом они могут поддерживать спецификацию не полностью.
```

```smart header="CSSOM для стилей"
Правила стилей CSS структурированы иначе чем HTML. Для них есть отдельная спецификация [CSSOM](https://www.w3.org/TR/cssom-1/), которая объясняет, как стили должны представляться в виде объектов, как их читать и писать.

CSSOM используется вместе с DOM при изменении стилей документа. В реальности CSSOM требуется редко, обычно правила CSS статичны. Мы редко добавляем/удаляем стили из JavaScript, но и это возможно.
=======
For instance, server-side scripts that download HTML pages and process them can also use the DOM. They may support only a part of the specification though.
```

```smart header="CSSOM for styling"
There's also a separate specification, [CSS Object Model (CSSOM)](https://www.w3.org/TR/cssom-1/) for CSS rules and stylesheets, that explains how they are represented as objects, and how to read and write them.

The CSSOM is used together with the DOM when we modify style rules for the document. In practice though, the CSSOM is rarely required, because we rarely need to modify CSS rules from JavaScript (usually we just add/remove CSS classes, not modify their CSS rules), but that's also possible.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
```

## BOM (Browser Object Model)

<<<<<<< HEAD
Объектная модель браузера (Browser Object Model, BOM) - это дополнительные объекты, предоставляемые браузером (окружением), чтобы работать со всем, кроме документа.
=======
The Browser Object Model (BOM) represents additional objects provided by the browser (host environment) for working with everything except the document.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Например:

<<<<<<< HEAD
- Объект [navigator](mdn:api/Window/navigator) даёт информацию о самом браузере и операционной системе. Среди множества его свойств самыми известными являются: `navigator.userAgent` -- информация о текущем браузере, и `navigator.platform` -- информация о платформе (может помочь в понимании того, в какой ОС открыт браузер -- Windows/Linux/Mac и так далее).
- Объект [location](mdn:api/Window/location) позволяет получить текущий URL и перенаправить браузер по новому адресу.
=======
- The [navigator](mdn:api/Window/navigator) object provides background information about the browser and the operating system. There are many properties, but the two most widely known are: `navigator.userAgent` -- about the current browser, and `navigator.platform` -- about the platform (can help to differentiate between Windows/Linux/Mac etc).
- The [location](mdn:api/Window/location) object allows us to read the current URL and can redirect the browser to a new one.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Вот как мы можем использовать объект `location`:

```js run
alert(location.href); // показывает текущий URL
if (confirm("Перейти на Wikipedia?")) {
  location.href = "https://wikipedia.org"; // перенаправляет браузер на другой URL
}
```

<<<<<<< HEAD
Функции `alert/confirm/prompt` тоже являются частью BOM: они не относятся непосредственно к странице, но представляют собой методы объекта окна браузера для коммуникации с пользователем.

```smart header="Спецификации"
BOM является частью общей [спецификации HTML](https://html.spec.whatwg.org).

Да, вы всё верно услышали. Спецификация HTML по адресу <https://html.spec.whatwg.org> не только про "язык HTML" (теги, атрибуты), она также покрывает целое множество объектов, методов и специфичных для каждого браузера расширений DOM. Это всё "HTML в широком смысле". Для некоторых вещей есть отдельные спецификации, перечисленные на <https://spec.whatwg.org>.
=======
The functions `alert/confirm/prompt` are also a part of the BOM: they are not directly related to the document, but represent pure browser methods for communicating with the user.

```smart header="Specifications"
The BOM is a part of the general [HTML specification](https://html.spec.whatwg.org).

Yes, you heard that right. The HTML spec at <https://html.spec.whatwg.org> is not only about the "HTML language" (tags, attributes), but also covers a bunch of objects, methods, and browser-specific DOM extensions. That's "HTML in broad terms". Also, some parts have additional specs listed at <https://spec.whatwg.org>.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
```

## Итого

Говоря о стандартах, у нас есть:

<<<<<<< HEAD
Спецификация DOM
: описывает структуру документа, манипуляции с контентом и события, подробнее на <https://dom.spec.whatwg.org>.

Спецификация CSSOM
: Описывает файлы стилей, правила написания стилей и манипуляций с ними, а также то, как это всё связано со страницей, подробнее на <https://www.w3.org/TR/cssom-1/>.
=======
DOM specification
: Describes the document structure, manipulations, and events, see <https://dom.spec.whatwg.org>.

CSSOM specification
: Describes stylesheets and style rules, manipulations with them, and their binding to documents, see <https://www.w3.org/TR/cssom-1/>.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Спецификация HTML
: Описывает язык HTML (например, теги) и BOM (объектную модель браузера) -- разные функции браузера: `setTimeout`, `alert`, `location` и так далее, подробнее на <https://html.spec.whatwg.org>. Тут берётся за основу спецификация DOM и расширяется дополнительными свойствами и методами.

Кроме того, некоторые классы описаны отдельно на <https://spec.whatwg.org/>.

<<<<<<< HEAD
Пожалуйста, заметьте для себя эти ссылки, так как по ним содержится очень много информации, которую невозможно изучить полностью и держать в уме.

Когда вам нужно будет прочитать о каком-то свойстве или методе, справочник на сайте Mozilla <https://developer.mozilla.org/ru/> тоже очень хороший ресурс, хотя ничто не сравнится с чтением спецификации: она сложная и объёмная, но сделает ваши знания максимально полными.
=======
Please note these links, as there's so much to learn that it's impossible to cover everything and remember it all.

When you'd like to read about a property or a method, the Mozilla manual at <https://developer.mozilla.org/en-US/> is also a nice resource, but the corresponding spec may be better: it's more complex and longer to read, but will make your fundamental knowledge sound and complete.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Для поиска чего-либо обычно удобно использовать интернет-поиск со словами "WHATWG [термин]" или "MDN [термин]", например <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

<<<<<<< HEAD
А теперь давайте перейдём к изучению DOM, так как страница - это основа всего.
=======
Now, we'll get down to learning the DOM, because the document plays the central role in the UI.
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
