# Размеры и прокрутка окна

<<<<<<< HEAD
Как узнать ширину и высоту окна браузера? Как получить полную ширину и высоту документа, включая прокрученную часть? Как прокрутить страницу с помощью JavaScript?

Для большинства таких запросов мы можем использовать корневой элемент документа `document.documentElement`, который соответствует тегу `<html>`. Однако есть дополнительные методы и особенности, которые необходимо учитывать.
=======
How do we find the width and height of the browser window? How do we get the full width and height of the document, including the scrolled out part? How do we scroll the page using JavaScript?

For this type of information, we can use the root document element `document.documentElement`, that corresponds to the `<html>` tag. But there are additional methods and peculiarities to consider.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Ширина/высота окна

<<<<<<< HEAD
Чтобы получить ширину/высоту окна, можно взять свойства `clientWidth/clientHeight` из `document.documentElement`:
=======
To get window width and height, we can use the `clientWidth/clientHeight` of `document.documentElement`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

![](document-client-width-height.svg)

```online
Например, эта кнопка показывает высоту вашего окна:

<button onclick="alert(document.documentElement.clientHeight)">alert(document.documentElement.clientHeight)</button>
```

<<<<<<< HEAD
````warn header="Не `window.innerWidth/Height`"
Браузеры также поддерживают свойства `window.innerWidth/innerHeight`. Вроде бы, похоже на то, что нам нужно. Почему же не использовать их?

Если есть полоса прокрутки, и она занимает какое-то место, то свойства `clientWidth/clientHeight` указывают на ширину/высоту документа без неё (за её вычетом). Иными словами, они возвращают высоту/ширину видимой части документа, доступной для содержимого.

А `window.innerWidth/innerHeight` включают в себя полосу прокрутки.
=======
````warn header="Not `window.innerWidth/innerHeight`"
Browsers also support properties like `window.innerWidth/innerHeight`. They look like what we want, so why not to use them instead?

If there exists a scrollbar, and it occupies some space, `clientWidth/clientHeight` provide the width/height without it (subtract it). In other words, they return the width/height of the visible part of the document, available for the content.

`window.innerWidth/innerHeight` includes the scrollbar.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Если полоса прокрутки занимает некоторое место, то эти две строки выведут разные значения:
```js run
alert( window.innerWidth ); // полная ширина окна
alert( document.documentElement.clientWidth ); // ширина окна за вычетом полосы прокрутки
```

<<<<<<< HEAD
В большинстве случаев нам нужна *доступная* ширина окна: для рисования или позиционирования. Полоса прокрутки "отъедает" её часть. Поэтому следует использовать `documentElement.clientHeight/Width`.
=======
In most cases, we need the *available* window width in order to draw or position something within scrollbars (if there are any), so we should use `documentElement.clientHeight/clientWidth`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
````

```warn header="`DOCTYPE` -- это важно"
Обратите внимание, что геометрические свойства верхнего уровня могут работать немного иначе, если в HTML нет `<!DOCTYPE HTML>`. Возможны странности.

В современном HTML мы всегда должны указывать `DOCTYPE`.  
```

## Ширина/высота документа

<<<<<<< HEAD
Теоретически, т.к. корневым элементом документа является `documentElement`, и он включает в себя всё содержимое, мы можем получить полный размер документа как `documentElement.scrollWidth/scrollHeight`.

Но именно на этом элементе, для страницы в целом, эти свойства работают не так, как предполагается. В Chrome/Safari/Opera, если нет прокрутки, то `documentElement.scrollHeight` может быть даже меньше, чем `documentElement.clientHeight`! С точки зрения элемента это невозможная ситуация.
=======
Theoretically, as the root document element is `document.documentElement`, and it encloses all the content, we could measure the document's full size as `document.documentElement.scrollWidth/scrollHeight`.

But on that element, for the whole page, these properties do not work as intended. In Chrome/Safari/Opera, if there's no scroll, then `documentElement.scrollHeight` may be even less than `documentElement.clientHeight`! Weird, right?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Чтобы надёжно получить полную высоту документа, нам следует взять максимальное из этих свойств:

```js run
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert('Полная высота документа с прокручиваемой частью: ' + scrollHeight);
```

Почему?
Лучше не спрашивайте. Эти несоответствия идут с древних времён. Глубокой логики здесь нет.

## Получение текущей прокрутки [#page-scroll]

<<<<<<< HEAD
Обычные элементы хранят текущее состояние прокрутки в `elem.scrollLeft/scrollTop`.

Что же со страницей?
В большинстве браузеров мы можем обратиться к `documentElement.scrollLeft/Top`, за исключением основанных на старом WebKit (Safari), где есть ошибка ([5991](https://bugs.webkit.org/show_bug.cgi?id=5991)), и там нужно использовать `document.body` вместо `document.documentElement`.

К счастью, нам совсем не обязательно запоминать эти особенности, потому что текущую прокрутку можно прочитать из свойств `window.pageXOffset/pageYOffset`:
=======
DOM elements have their current scroll state in their `scrollLeft/scrollTop` properties.

For document scroll, `document.documentElement.scrollLeft/scrollTop` works in most browsers, except older WebKit-based ones, like Safari (bug [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)), where we should use `document.body` instead of `document.documentElement`.

Luckily, we don't have to remember these peculiarities at all, because the scroll is available in the special properties, `window.pageXOffset/pageYOffset`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
alert('Текущая прокрутка сверху: ' + window.pageYOffset);
alert('Текущая прокрутка слева: ' + window.pageXOffset);
```

Эти свойства доступны только для чтения.

<<<<<<< HEAD
## Прокрутка: scrollTo, scrollBy, scrollIntoView [#window-scroll]

```warn
Для прокрутки страницы из JavaScript её DOM должен быть полностью построен.

Например, если мы попытаемся прокрутить страницу из скрипта в `<head>`, это не сработает.
=======
```smart header="Also available as `window` properties `scrollX` and `scrollY`"
For historical reasons, both properties exist, but they are the same:
- `window.pageXOffset` is an alias of `window.scrollX`.
- `window.pageYOffset` is an alias of `window.scrollY`.
```

## Scrolling: scrollTo, scrollBy, scrollIntoView [#window-scroll]

```warn
To scroll the page with JavaScript, its DOM must be fully built.

For instance, if we try to scroll the page with a script in `<head>`, it won't work.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

Обычные элементы можно прокручивать, изменяя `scrollTop/scrollLeft`.

<<<<<<< HEAD
Мы можем сделать то же самое для страницы в целом, используя  `document.documentElement.scrollTop/Left` (кроме основанных на старом WebKit (Safari), где, как сказано выше, `document.body.scrollTop/Left`).

Есть и другие способы, в которых подобных несовместимостей нет: специальные методы `window.scrollBy(x,y)` и `window.scrollTo(pageX,pageY)`.
=======
We can do the same for the page using `document.documentElement.scrollTop/scrollLeft` (except Safari, where `document.body.scrollTop/Left` should be used instead).

Alternatively, there's a simpler, universal solution: special methods [window.scrollBy(x,y)](mdn:api/Window/scrollBy) and [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

- Метод `scrollBy(x,y)` прокручивает страницу *относительно её текущего положения*. Например, `scrollBy(0,10)` прокручивает страницу на `10px` вниз.

    ```online
    Кнопка ниже демонстрирует это:

    <button onclick="window.scrollBy(0,10)">window.scrollBy(0,10)</button>
    ```
- Метод `scrollTo(pageX,pageY)` прокручивает страницу *на абсолютные координаты* `(pageX,pageY)`. То есть, чтобы левый-верхний угол видимой части страницы имел данные координаты относительно левого верхнего угла документа. Это всё равно, что поставить `scrollLeft/scrollTop`.
    Для прокрутки в самое начало мы можем использовать `scrollTo(0,0)`.

    ```online
    <button onclick="window.scrollTo(0,0)">window.scrollTo(0,0)</button>
    ```

Эти методы одинаково работают для всех браузеров.

## scrollIntoView

<<<<<<< HEAD
Для полноты картины давайте рассмотрим ещё один метод: [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView).
=======
For completeness, let's cover one more method: [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Вызов `elem.scrollIntoView(top)` прокручивает страницу, чтобы `elem` оказался вверху.
У него есть один аргумент:

<<<<<<< HEAD
- если `top=true` (по умолчанию), то страница будет прокручена, чтобы `elem` появился в верхней части окна. Верхний край элемента совмещён с верхней частью окна.
- если `top=false`, то страница будет прокручена, чтобы `elem` появился внизу. Нижний край элемента будет совмещён с нижним краем окна.

```online
Кнопка ниже прокрутит страницу так, что она сама окажется вверху:

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

А следующая кнопка прокрутит страницу так, что она сама окажется внизу
=======
- If `top=true` (that's the default), then the page will be scrolled to make `elem` appear on the top of the window. The upper edge of the element will be aligned with the window top.
- If `top=false`, then the page scrolls to make `elem` appear at the bottom. The bottom edge of the element will be aligned with the window bottom.

```online
The button below scrolls the page to position itself at the window top:

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

And this button scrolls the page to position itself at the bottom:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

<button onclick="this.scrollIntoView(false)">this.scrollIntoView(false)</button>
```

## Запретить прокрутку

<<<<<<< HEAD
Иногда нам нужно сделать документ "непрокручиваемым". Например, при показе большого диалогового окна над документом – чтобы посетитель мог прокручивать это окно, но не документ.

Чтобы запретить прокрутку страницы, достаточно установить `document.body.style.overflow = "hidden"`.
=======
Sometimes we need to make the document "unscrollable". For instance, when we need to cover the page with a large message requiring immediate attention, and we want the visitor to interact with that message, not with the document.

To make the document unscrollable, it's enough to set `document.body.style.overflow = "hidden"`. The page will "freeze" at its current scroll position.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```online
Попробуйте сами:

<button onclick="document.body.style.overflow = 'hidden'">document.body.style.overflow = 'hidden'</button>

<button onclick="document.body.style.overflow = ''">document.body.style.overflow = ''</button>

<<<<<<< HEAD
Первая кнопка останавливает прокрутку, вторая возобновляет её.
=======
The first button freezes the scroll, while the second one releases it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```
Аналогичным образом мы можем "заморозить" прокрутку для других элементов, а не только для `document.body`.

<<<<<<< HEAD
Недостатком этого способа является то, что сама полоса прокрутки исчезает. Если она занимала некоторую ширину, то теперь эта ширина освободится, и содержимое страницы расширится, текст «прыгнет», заняв освободившееся место.

Это выглядит немного странно, но это можно обойти, если сравнить `clientWidth` до и после остановки, и если `clientWidth` увеличится (значит полоса прокрутки исчезла), то добавить `padding` в `document.body` вместо полосы прокрутки, чтобы оставить ширину содержимого прежней.
=======
We can use the same technique to freeze the scroll for other elements, not just for `document.body`.

The drawback of the method is that the scrollbar disappears. If it occupied some space, then that space is now free and the content "jumps" to fill it.

That looks a bit odd, but can be worked around if we compare `clientWidth` before and after the freeze. If it increased (the scrollbar disappeared), then add `padding` to `document.body` in place of the scrollbar to keep the content width the same.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Итого

Размеры:

<<<<<<< HEAD
- Ширина/высота видимой части документа (ширина/высота области содержимого): `document.documentElement.clientWidth/Height`
- Ширина/высота всего документа с прокрученной частью:
=======
- Width/height of the visible part of the document (content area width/height): `document.documentElement.clientWidth/clientHeight`
- Width/height of the whole document, with the scrolled out part:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    ```js
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    ```

Прокрутка:

- Прокрутку окна можно получить так: `window.pageYOffset/pageXOffset`.
- Изменить текущую прокрутку:

    - `window.scrollTo(pageX,pageY)` -- абсолютные координаты,
    - `window.scrollBy(x,y)` -- прокрутка относительно текущего места,
    - `elem.scrollIntoView(top)` -- прокрутить страницу так, чтобы сделать `elem` видимым
    (выровнять относительно верхней/нижней части окна).
