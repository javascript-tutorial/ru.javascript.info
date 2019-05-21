# Движение: mouseover/-out, mouseenter/-leave

В этой главе мы более подробно рассмотрим события, возникающие при движении указателя (курсора) мыши над элементами страницы.

## Mouseover/mouseout, relatedTarget

Событие `mouseover` происходит однократно в момент, когда курсор оказывается над элементом, а событие `mouseout` -- тоже однократно, но в момент, когда курсор уходит с элемента.

![](mouseover-mouseout.png)

Эти события являются особенными, потому что у них имеется свойство `relatedTarget`.

Для события `mouseover`:

- `event.target` -- это элемент, на который курсор зашёл.
- `event.relatedTarget` -- это элемент, с которого курсор ушёл.

Для события `mouseout` наоборот:

- `event.target` -- это элемент, с которого курсор ушёл.
- `event.relatedTarget` -- это элемент, на который курсор зашёл.

```online
В примере ниже каждое изображение - отдельный элемент. При движении курсора по этим элементам в текстовом поле отображаются произошедшие события.

Каждое из них содержит информацию о том, откуда на соответствующий элемент пришёл и куда с него ушёл курсор.

[codetabs src="mouseoverout" height=280]
```

```warn header="Свойство `relatedTarget` может быть `null`"
Свойство `relatedTarget` может быть `null`.

Это нормально и означает, что указатель мыши пришёл не с другого элемента, а из-за пределов окна браузера. Или же, наоборот, ушёл за пределы окна.

Разработчикам следует держать в голове такие варианты при использовании `event.relatedTarget` в своём коде. Если, например, написать `event.relatedTarget.tagName`, то при отсутствии `event.relatedTarget` будет ошибка.
```

## Частота запуска событий

Событие `mousemove` происходит при движении мыши. Однако, это не означает, что указанное событие генерируется при прохождении каждого пикселя.

Браузер периодически проверяет позицию курсора и, заметив изменения, генерирует события `mousemove`.

Это означает, что если пользователь двигает мышкой очень быстро, то некоторые DOM-элементы могут быть пропущены:

![](mouseover-mouseout-over-elems.png)

Если курсор мыши двигается очень быстро с `#FROM` на `#TO` элемент, как это показано выше, то лежащие между ними `<div>`-ы (или некоторые из них) могут быть пропущены. Событие `mouseout` может запуститься на элементе `#FROM` и затем сразу же сгенерируется `mouseover` на элементе `#TO`.

На практике это даже может быть полезно, потому что если промежуточных элементов много, то на самом деле не хотелось бы обрабатывать события `mouseout` и `mouseover` для каждого из них.

С другой стороны, не стоит рассчитывать, что курсор мыши будет медленно переходить от одного элемента к другому. Он может и "прыгать".

В частности, возможно, что курсор запрыгнет в середину страницы из-за пределов окна браузера, и в таком случае получится, что `relatedTarget=null`, так как курсор пришёл "из ниоткуда":

![](mouseover-mouseout-from-outside.png)

<div style="display:none">
В случае быстрого прохождения курсором промежуточных элементов события вообще могут не генерироваться. Но если уж курсор пришёл на элемент (было сгенерировано `mouseover`), то гарантировано при выходе с того элемента будет запущено событие `mouseout`.
</div>

```online
Проверьте это в песочнице ниже.

Вёрстка состоит из двух элементов типа `<div>`, один из которых вложен в другой. Если быстро провести мышью над ними, то может не будет сгенерировано никаких событий вообще, а может события будут запущены только на красном элементе, а может только на зеленом.

Также попробуйте поставить курсор на красный элемент, а затем очень быстро сделайте движение мышкой вниз через зеленый элемент. Если у вас получилось достаточно быстро, то на родительском элементе не было сгенерировано никаких событий.

[codetabs height=360 src="mouseoverout-fast"]
```

## "Лишний" mouseout при уходе на потомка

Представьте ситуацию -- курсор мыши зашёл на элемент. Сгенерировано событие `mouseover`. Затем курсор перешёл на дочерний элемент. Интересно, что в таком случае будет сгенерировано `mouseout`. То есть курсор всё ещё на элементе, но мы получили `mouseout`!

![](mouseover-to-child.png)

Это выглядит странно, но легко объясняется.

**По логике браузера, курсор мыши может быть только над одним элементом в любой момент времени - над самым глубоко вложенным (и имеющим самое большое значение z-index).**

Таким образом, если курсор переходит на другой элемент (пусть даже дочерний), то он покидает предыдущий. Достаточно просто.

На примере ниже можно увидеть забавную последовательность сгенерированных событий.

Красный `<div>` находится внутри синего. На синем `<div>`-е определены обработчики событий `mouseover/-out`, которые отображают всю информацию по ним в текстовое поле ниже.

Попробуйте зайти курсором на синий элемент, а затем перейдите на красный -- и смотрите, какие события сгенерировались:

[codetabs height=360 src="mouseoverout-child"]

1. При входе на синий элемент -- мы получили `mouseover [target: blue]`.
2. Затем при переходе на красный -- `mouseout [target: blue]` (уход с родителя).
3. ...и сразу же `mouseover [target: red]`.

Таким образом, для обработчика, который не принимает во внимание свойство `target`, ситуация выглядит так, как будто курсор ушёл с родительского элемента, запустив `mouseout` на строке `(2)`, а затем вернулся обратно, запустив `mouseover` на строке `(3)`.

Если постоянно передвигать курсор мышки между элементами, то мы получим много "ложных" срабатываний обработчиков. В простых случаях это может быть незаметно для пользователя, но в сложных случаях могут проявляться нежелательные побочные эффекты.

Чтобы их избежать, можно использовать события `mouseenter/mouseleave`.

## Events mouseenter and mouseleave

Events `mouseenter/mouseleave` are like `mouseover/mouseout`. They also trigger when the mouse pointer enters/leaves the element.

But there are two differences:

1. Transitions inside the element are not counted.
2. Events `mouseenter/mouseleave` do not bubble.

These events are intuitively very clear.

When the pointer enters an element -- the `mouseenter` triggers, and then doesn't matter where it goes while inside the element. The `mouseleave` event only triggers when the cursor leaves it.

If we make the same example, but put `mouseenter/mouseleave` on the blue `<div>`, and do the same -- we can see that events trigger only on entering and leaving the blue `<div>`. No extra events when going to the red one and back. Children are ignored.

[codetabs height=340 src="mouseleave"]

## Event delegation

Events `mouseenter/leave` are very simple and easy to use. But they do not bubble. So we can't use event delegation with them.

Imagine we want to handle mouse enter/leave for table cells. And there are hundreds of cells.

The natural solution would be -- to set the handler on `<table>` and process events there. But `mouseenter/leave` don't bubble. So if such event happens on `<td>`, then only a handler on that `<td>` can catch it.

Handlers for `mouseenter/leave` on `<table>` only trigger on entering/leaving the whole table. It's impossible to get any information about transitions inside it.

Not a problem -- let's use `mouseover/mouseout`.

A simple handler may look like this:

```js
// let's highlight cells under mouse
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
[codetabs height=480 src="mouseenter-mouseleave-delegation"]
```

These handlers work when going from any element to any inside the table.

But we'd like to handle only transitions in and out of `<td>` as a whole. And highlight the cells as a whole. We don't want to handle transitions that happen between the children of `<td>`.

One of solutions:

- Remember the currently highlighted `<td>` in a variable.
- On `mouseover` -- ignore the event if we're still inside the current `<td>`.
- On `mouseout` -- ignore if we didn't leave the current `<td>`.

That filters out "extra" events when we are moving between the children of `<td>`.

```offline
The details are in the [full example](sandbox:mouseenter-mouseleave-delegation-2).
```

```online
Here's the full example with all details:

[codetabs height=380 src="mouseenter-mouseleave-delegation-2"]

Try to move the cursor in and out of table cells and inside them. Fast or slow -- doesn't matter. Only `<td>` as a whole is highlighted unlike the example before.
```


## Summary

We covered events `mouseover`, `mouseout`, `mousemove`, `mouseenter` and `mouseleave`.

Things that are good to note:

- A fast mouse move can make `mouseover, mousemove, mouseout` to skip intermediate elements.
- Events `mouseover/out` and `mouseenter/leave` have an additional target: `relatedTarget`. That's the element that we are coming from/to, complementary to `target`.
- Events `mouseover/out` trigger even when we go from the parent element to a child element. They assume that the mouse can be only over one element at one time -- the deepest one.
- Events `mouseenter/leave` do not bubble and do not trigger when the mouse goes to a child element. They only track whether the mouse comes inside and outside the element as a whole.
