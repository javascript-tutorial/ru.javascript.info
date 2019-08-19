<<<<<<< HEAD
# Движение мыши: mouseover/out, mouseenter/leave

В этой главе мы более подробно рассмотрим события, возникающие при движении указателя мыши над элементами страницы.

## События mouseover/mouseout, relatedTarget
=======
# Moving the mouse: mouseover/out, mouseenter/leave

Let's dive into more details about events that happen when the mouse moves between elements.

## Events mouseover/mouseout, relatedTarget
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

Событие `mouseover` происходит в момент, когда курсор оказывается над элементом, а событие `mouseout` -- в момент, когда курсор уходит с элемента.

![](mouseover-mouseout.svg)

<<<<<<< HEAD
Эти события являются особенными, потому что у них имеется свойство `relatedTarget`. Оно "дополняет" `target`. Когда мышь переходит с одного элемента на другой, то один из них будет `target`, а другой `relatedTarget`.

Для события `mouseover`:
=======
These events are special, because they have property `relatedTarget`. This property complements `target`. When a mouse leaves one element for another, one of them becomes `target`, and the other one - `relatedTarget`.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

- `event.target` -- это элемент, *на который* курсор перешёл.
- `event.relatedTarget` -- это элемент, *с которого* курсор ушёл (`relatedTarget` -> `target`).

Для события `mouseout` наоборот:

<<<<<<< HEAD
- `event.target` -- это элемент, *с которого* курсор ушёл.
- `event.relatedTarget` -- это элемент, *на который* курсор перешёл (`target` -> `relatedTarget`).

```online
В примере ниже каждое лицо и его черты - отдельные элементы. При движении указателя по этим элементам в текстовом поле отображаются происходящие события.

Каждое из них содержит информацию о `target` и `relatedTarget`:
=======
For `mouseout` the reverse:

- `event.target` -- is the element that the mouse left.
- `event.relatedTarget` -- is the new under-the-pointer element, that mouse left for (`target` -> `relatedTarget`).

```online
In the example below each face and its features are separate elements. When you move the mouse, you can see mouse events in the text area.

Each event has the information about both `target` and `relatedTarget`:
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

[codetabs src="mouseoverout" height=280]
```

```warn header="Свойство `relatedTarget` может быть `null`"
Свойство `relatedTarget` может быть `null`.

Это нормально и означает, что указатель мыши перешёл не с другого элемента, а из-за пределов окна браузера. Или же, наоборот, ушёл за пределы окна.

Следует держать в уме такую возможность при использовании `event.relatedTarget` в своём коде. Если, например, написать `event.relatedTarget.tagName`, то при отсутствии `event.relatedTarget` будет ошибка.
```

<<<<<<< HEAD
## Пропуск элементов
=======
## Skipping elements
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

Событие `mousemove` происходит при движении мыши. Однако, это не означает, что указанное событие генерируется при прохождении каждого пикселя.

Браузер периодически проверяет позицию курсора и, заметив изменения, генерирует события `mousemove`.

<<<<<<< HEAD
Это означает, что если пользователь двигает мышкой очень быстро, то некоторые DOM-элементы могут быть пропущены:
=======
That means that if the visitor is moving the mouse very fast then some DOM-elements may be skipped:
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

![](mouseover-mouseout-over-elems.svg)

Если курсор мыши передвинуть очень быстро с элемента `#FROM` на элемент `#TO`, как это показано выше, то лежащие между ними элементы `<div>` (или некоторые из них) могут быть пропущены. Событие `mouseout` может запуститься на элементе `#FROM` и затем сразу же сгенерируется `mouseover` на элементе `#TO`.

<<<<<<< HEAD
Это хорошо с точки зрения производительности, потому что если промежуточных элементов много, вряд ли мы действительно хотим обрабатывать вход и выход для каждого.

С другой стороны, мы должны иметь в виду, что указатель мыши не "посещает" все элементы на своём пути. Он может и "прыгать".

В частности, возможно, что указатель запрыгнет в середину страницы из-за пределов окна браузера. В этом случае значение `relatedTarget` будет `null`, так как курсор пришёл "из ниоткуда":
=======
That's good for performance, because if there may be many intermediate elements. We don't really want to process in and out of each one.

On the other hand, we should keep in mind that the mouse pointer doesn't "visit" all elements along the way. It can "jump".

In particular, it's possible that the pointer jumps right inside the middle of the page from out of the window. In that case `relatedTarget` is `null`, because it came from "nowhere":
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

![](mouseover-mouseout-from-outside.svg)

```online
<<<<<<< HEAD
Вы можете проверить это "вживую" на тестовом стенде ниже.

В его HTML есть два элемента, `<div id="child">` вложен в `<div id="parent">`. Если быстро провести мышью над ними, то событие может возникнуть только на внутреннем элементе или только на внешнем, а может вообще не сгенерироваться никаких событий.

Также попробуйте поставить курсор на внутренний элемент, а затем очень быстро сделайте движение мышкой вниз через внешний элемент. Если у вас получится достаточно быстро, то на родительском элементе не будет сгенерировано никаких событий. То есть, мышь пройдёт через внешний элемент, не замечая его.
=======
You can check it out "live" on a teststand below.

Its HTML has two nested elements: the `<div id="child">` is inside the `<div id="parent">`. If you move the mouse fast over them, then maybe only the child div triggers events, or maybe the parent one, or maybe there will be no events at all.

Also move the pointer into the child `div`, and then move it out quickly down through the parent one. If the movement is fast enough, then the parent element is ignored. The mouse will cross the parent element without noticing it.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

[codetabs height=360 src="mouseoverout-fast"]
```

<<<<<<< HEAD
```smart header="Если был `mouseover`, то будет и `mouseout`"
Несмотря на то, что при быстрых переходах промежуточные элементы могут игнорироваться, в одном мы можем быть уверены: элемент может быть пропущен только целиком.

Если указатель "официально" зашёл на элемент, то есть было событие `mouseover`, то при выходе с него обязательно будет `mouseout`.
```

## Событие mouseout при переходе на потомка

Важная особенность события `mouseout` - оно генерируется в том числе, когда указатель переходит с элемента на его потомка.

То есть, визуально указатель всё ещё на элементе, но мы получим `mouseout`!

![](mouseover-to-child.svg)

Это выглядит странно, но легко объясняется.

**По логике браузера, курсор мыши может быть только над одним элементом в любой момент времени - над самым глубоко вложенным и верхним по z-index.**

Таким образом, если курсор переходит на другой элемент (пусть даже дочерний), то он покидает предыдущий.

Обратите внимание на важную деталь.

Событие `mouseover`, происходящее на потомке, всплывает. Поэтому если на родительском элементе есть такой обработчик, то оно его вызовет.
=======
```smart header="If `mouseover` triggered, there must be `mouseout`"
In case of fast mouse movements, intermediate elements may be ignores, but one thing we know for sure: elements can be only skipped as a whole.

If the pointer "officially" entered an element with `mouseover`, then upon leaving it we always get `mouseout`.
```

## Mouseout when leaving for a child

An important feature of `mouseout` -- it triggers, when the pointer moves from an element to its descendant.

Visually, the pointer is still on the element, but we get `mouseout`!

![](mouseover-to-child.svg)

That looks strange, but can be easily explained.

**According to the browser logic, the mouse cursor may be only over a *single* element at any time -- the most nested one and top by z-index.**

So if it goes to another element (even a descendant), then it leaves the previous one.

Please note an important detail.

The `mouseover` event on a descendant bubbles up. So, if the parent element has such handler, it triggers.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

![](mouseover-bubble-nested.svg)

```online
<<<<<<< HEAD
Вы можете наглядно увидеть это в примере ниже: `<div id="child">` находится внутри `<div id="parent">`. На родителе определены обработчики событий `mouseover/out`, которые выводят информацию о них в текстовое поле.

При переходе мышью с внешнего элемента на внутренний, вы увидите сразу два события: `mouseout [target: parent]` (ушли с родителя) и `mouseover [target: child]` (перешли на потомка, событие всплыло).
=======
You can see that very well in the example below: `<div id="child">` is inside the `<div id="parent">`. There are handlers on the parent that listen for `mouseover/out` events and output their details.

If you move the mouse from the parent to the child, you see two events: `mouseout [target: parent]` (left the parent) and `mouseover [target: child]` (came to the child, bubbled).
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

[codetabs height=360 src="mouseoverout-child"]
```

<<<<<<< HEAD
При переходе с родителя элемента на потомка - на родителе сработают два обработчика: и `mouseout` и `mouseover`:

```js
parent.onmouseout = function(event) {
  /* event.target: внешний элемент */
};
parent.onmouseover = function(event) {
  /* event.target: внутренний элемент (всплыло) */
};
```

Если код внутри обработчиков не смотрит на `target`, то он подумает, что мышь ушла с элемента `parent` и вернулась на него обратно. Но это не так! Мышь никуда не уходила, она просто перешла на потомка.

Если при уходе с элемента что-то происходит, например, запускается анимация, то такая интерпретация происходящего может давать нежелательные побочные эффекты.

Чтобы этого избежать, можно смотреть на `relatedTarget` и, если мышь всё ещё внутри элемента, то игнорировать такие события.

Или же можно использовать другие события: `mouseenter` и `mouseleave`, которые мы сейчас изучим, с ними такая проблема не возникает.

## События mouseenter и mouseleave

События `mouseenter/mouseleave` похожи на `mouseover/mouseout`. Они тоже генерируются, когда курсор мыши переходит на элемент или покидает его.
=======
When we move from a parent element to a child, then two handlers trigger on the parent element: `mouseout` and `mouseover`:

```js
parent.onmouseout = function(event) {
  /* event.target: parent element */
};
parent.onmouseover = function(event) {
  /* event.target: child element (bubbled) */
};
```

If the code inside the handlers doesn't look at `target`, then it might think that the mouse left the `parent` element, and then came back over it. But it's not the case! The mouse never left, it just moved to the child element.

If there's some action upon leaving the element, e.g. animation runs, then such interpretation may bring unwanted side effects.

To avoid it, we can check `relatedTarget` and, if the mouse is still inside the element, then ignore such event.

Alternatively we can use other events: `mouseenter` и `mouseleave`, that we'll be covering now, as they don't have such problems.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

Но есть и пара важных отличий:

<<<<<<< HEAD
1. Переходы внутри элемента, на его потомки и с них, не считаются.
2. События `mouseenter/mouseleave` не всплывают.

События `mouseenter/mouseleave` предельно просты и понятны.

Когда указатель появляется над элементом -- генерируется `mouseenter`, причём не имеет значения, где именно указатель: на самом элементе или на его потомке.

Событие `mouseleave` происходит, когда курсор покидает элемент.

```online
Вот тот же пример, что и выше, но на этот раз на верхнем элементе стоят обработчики `mouseenter/mouseleave` вместо `mouseover/mouseout`.

Как вы сами можете увидеть, генерируются только события, связанные с движением курсора относительно верхнего `<div>`. Ничего не произойдёт при переходе на внутренний `<div>` и обратно. Переходы на потомки игнорируются.
=======
Events `mouseenter/mouseleave` are like `mouseover/mouseout`. They trigger when the mouse pointer enters/leaves the element.

But there are two important differences:

1. Transitions inside the element, to/from descendants, are not counted.
2. Events `mouseenter/mouseleave` do not bubble.

These events are extremely simple.

When the pointer enters an element -- `mouseenter` triggers. The exact location of the pointer inside the element or its descendants doesn't matter.

When the pointer leaves an element -- `mouseleave` triggers.

```online
This example is similar to the one above, but now the top element has `mouseenter/mouseleave` instead of `mouseover/mouseout`.

As you can see, the only generated events are the ones related to moving the pointer in and out of the top element. Nothing happens when the pointer goes to the child and back. Transitions between descendants are ignores
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

[codetabs height=340 src="mouseleave"]
```

## Делегирование событий

События `mouseenter/leave` просты и легки в использовании. Но они не всплывают. Таким образом, мы не можем их делегировать.

Представьте ситуацию, когда мы хотим обрабатывать события, сгенерированные при движении курсора по ячейкам таблицы. И в таблице сотни ячеек.

<<<<<<< HEAD
Очевидное решение -- определить обработчик на родительском элементе `<table>` и там обрабатывать возникающие события. Но, так как `mouseenter/leave` не всплывают, то если событие происходит на ячейке `<td>`, то только обработчик на `<td>` может поймать его.

Обработчики событий `mouseenter/leave` на `<table>` срабатывают, если курсор оказывается над таблицей в целом или же уходит с неё. Невозможно получить какую-либо информацию о переходах между ячейками внутри таблицы.

Что ж, не проблема -- будем использовать `mouseover/mouseout`.

Начнём с простых обработчиков, которые выделяют текущий элемент под указателем мыши:

```js
// выделим элемент под мышью
=======
The natural solution would be -- to set the handler on `<table>` and process events there. But `mouseenter/leave` don't bubble. So if such event happens on `<td>`, then only a handler on that `<td>` is able to catch it.

Handlers for `mouseenter/leave` on `<table>` only trigger when the pointer enters/leaves the table as a whole. It's impossible to get any information about transitions inside it.

So, let's use `mouseover/mouseout`.

Let's start with simple handlers that highlight the element under mouse:

```js
// let's highlight an element under the pointer
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
table.onmouseover = function(event) {
  let target = event.target;
  target.style.background = 'pink';
};

table.onmouseout = function(event) {
  let target = event.target;
  target.style.background = '';
};
```

```online
<<<<<<< HEAD
Вот они в действии. При переходе между элементами этой таблицы, текущий будет подсвечен:
=======
Here they are in action. As the mouse travels across the elements of this table, the current one is highlighted:
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

[codetabs height=480 src="mouseenter-mouseleave-delegation"]
```

<<<<<<< HEAD
В нашем случае мы хотим обрабатывать переходы именно между ячейками `<td>`: вход на ячейку и выход с неё. Прочие переходы, в частности, внутри ячейки `<td>` или вообще вне любых ячеек, нас не интересуют, хорошо бы их отфильтровать.

Можно достичь этого так:

- Запоминать текущую ячейку `<td>` в переменную, которую назовём `currentElem`.
- На `mouseover` -- игнорировать событие, если мы всё ещё внутри той же самой ячейки `<td>`.
- На `mouseout` -- игнорировать событие, если это не уход с текущей ячейки `<td>`.

Вот пример кода, учитывающего все ситуации:

=======
In our case we'd like to handle transitions between table cells `<td>`: entering a cell and leaving it. Other transitions, such as inside the cell or outside of any cells, don't interest us. Let's filter them out.

Here's what we can do:

- Remember the currently highlighted `<td>` in a variable, let's call it `currentElem`.
- On `mouseover` -- ignore the event if we're still inside the current `<td>`.
- On `mouseout` -- ignore if we didn't leave the current `<td>`.

Here's an example of code that accounts for all possible situations:

>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
[js src="mouseenter-mouseleave-delegation-2/script.js"]

```online
Полный пример со всеми деталями:

[codetabs height=380 src="mouseenter-mouseleave-delegation-2"]

<<<<<<< HEAD
Попробуйте подвигать курсор между ячейками и внутри них. Быстро или медленно - без разницы. В отличие от предыдущего примера выделяется только сама ячейка `<td>`.
```

## Итого

Мы рассмотрели события `mouseover`, `mouseout`, `mousemove`, `mouseenter` и `mouseleave`.

Особенности, на которые стоит обратить внимание:
=======
Try to move the cursor in and out of table cells and inside them. Fast or slow -- doesn't matter. Only `<td>` as a whole is highlighted, unlike the example before.
```

## Summary
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

- При быстром движении мыши события не будут возникать на промежуточных элементах.
- События `mouseover/out` и `mouseenter/leave` имеют дополнительное свойство: `relatedTarget`. Оно дополняет свойство `target` и содержит ссылку на элемент, с/на который мы переходим.

<<<<<<< HEAD
События `mouseover/out` возникают, даже когда происходит переход с родительского элемента на потомка. С точки зрения браузера, курсор мыши может быть только над одним элементом в любой момент времени - над самым глубоко вложенным.

События `mouseenter/leave` в этом отличаются. Они генерируются, когда курсор переходит на элемент в целом или уходит с него. Также они не всплывают.
=======
These things are good to note:

- A fast mouse move may skip intermediate elements.
- Events `mouseover/out` and `mouseenter/leave` have an additional property: `relatedTarget`. That's the element that we are coming from/to, complementary to `target`.

Events `mouseover/out` trigger even when we go from the parent element to a child element. The browser assumes that the mouse can be only over one element at one time -- the deepest one.

Events `mouseenter/leave` are different in that aspect: they only trigger when the mouse comes in and out the element as a whole. Also they do not bubble. 
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
