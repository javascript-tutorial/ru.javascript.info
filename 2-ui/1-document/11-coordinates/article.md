# Координаты

Чтобы передвигать элементы по экрану, нам следует познакомиться с системами координат.

Большинство соответствующих методов JavaScript работают в одной из двух указанных ниже систем координат:

1. **Относительно окна браузера** - похоже на `position:fixed`, отсчёт идёт от верхнего левого угла окна браузера.
    - мы будем обозначать эти координаты как `clientX/clientY`, причина выбора таких имён будет ясна позже, когда мы изучим свойства событий.
2. **Относительно документа** - похоже на `position:absolute` на уровне документа, отсчёт идёт от верхнего левого угла документа.
    - мы будем обозначать эти координаты как `pageX/pageY`.

Когда страница полностью прокручена наверх, то верхний левый угол окна совпадает с левым верхним углом документа, из чего следует, что обе системы координат тоже совпадают. Но если происходит прокрутка вниз, то координаты элементов в контексте окна меняются, так как они двигаются, но в то же время их координаты относительно документа остаются такими же.

На приведённой картинке слева показана ситуация до прокрутки страницы, а справа - после:

![](document-and-window-coordinates-scrolled.png)

Поскольку документ сдвинулся вверх, то:
- `pageY` - координата произвольной точки относительно документа осталась без изменений, так как отсчёт по-прежнему ведётся от верхней границы документа (сейчас она прокручена наверх).
- `clientY` - координата точки относительно окна изменилась (стрелка на рисунке стала короче), так как точка стала ближе к верхней границе окна.

В этой главе мы увидим и другие примеры координат элементов относительно окна и документа.

## Координаты относительно окна: getBoundingClientRect

Метод `elem.getBoundingClientRect()` возвращает координаты в контексте окна для минимального по размеру прямоугольника, который заключает в себе элемент `elem`, в виде объекта встроенного класса [DOMRect](https://www.w3.org/TR/geometry-1/#domrect).

Основные свойства объекта типа `DOMRect`:

- `x/y` -- X/Y-координаты начала прямоугольника относительно окна,
- `width/height` -- ширина/высота прямоугольника (могут быть отрицательными).

Дополнительные, "зависимые", свойства:

- `top/bottom` -- Y-координата верхней/нижней границы прямоугольника,
- `left/right` -- X-координата левой/правой границы прямоугольника.

```online
Кликните на кнопку, чтобы увидеть её координаты относительно окна:

<input id="brTest" type="button" value="Показать результат вызова button.getBoundingClientRect() для этой кнопки" onclick='showRect(this)'/>

<script>
function showRect(elem) {
  let r = elem.getBoundingClientRect();
  alert(`x:${r.x}
y:${r.y}
width:${r.width}
height:${r.height}
top:${r.top}
bottom:${r.bottom}
left:${r.left}
right:${r.right}
`);
}
</script>

Если вы прокрутите страницу, то расположение кнопки в окне поменяется, и, соответсвенно, её координаты в контексте окна тоже (при вертикальной прокрутке - `y/top/bottom`).
```

Вот картинка с результатами вызова `elem.getBoundingClientRect()`:

![](coordinates.png)

Как вы видите, `x/y` и `width/height` полностью описывают прямоугольник. Остальные свойства могут быть легко вычислены на их основе:
- `left = x`
- `top = y`
- `right = x + width`
- `bottom = y + height`

Также:

- Координаты могут считаться с десятичной частью, например `10.5`. Это нормально, ведь браузер использует дроби в своих внутренних вычислениях. Мы не обязаны округлять значения при установке `style.position.left/top`.
- Координаты могут быть отрицательными. Например, если страница прокручена так, что элемент `elem` ушёл вверх за пределы окна, то вызов `elem.getBoundingClientRect().top` вернёт отрицательное значение.

<<<<<<< HEAD
```smart header="Зачем вообще нужны зависимые свойства? Для чего существуют `top/left`, если есть `x/y`?"
С математической точки зрения, прямоугольник однозначно задаётся начальной точкной `(x,y)` и вектором направления `(width,height)`.

Так что дополнительные зависимые свойства существуют лишь для удобства.

Технически, значения `width/height` могут быть отрицательными, это удобно, чтобы задавать "направленные" прямоугольники, например, для выделения мышью с отмеченным началом и концом.

Вот прямоугольник с отрицательными `width` и `height` (например, `width=-200`, `height=-100`):

![](coordinates-negative.png)

Он начинается в своём правом-нижнем углу, и затем "разворачивается" влево-вверх, так как отрицательные width/height ведут его назад по координатам.

Как вы видите, свойства `left/top` здесь не равны `x/y`. То есть они не дублируют друг друга. Формулы выше могут быть исправлены с учётом возможных отрицательных значений `width/height`. Это достаточно просто сделать, но редко требуется, так как результат вызова `elem.getBoundingClientRect()` всегда возвращает положительные значения для ширины/высоты.
=======
```smart header="Why derived properties are needed? Why does `top/left` exist if there's `x/y`?"
Mathematically, a rectangle is uniquely defined with its starting point `(x,y)` and the direction vector `(width,height)`. So the additional derived properties are for convenience.

Technically it's possible for `width/height` to be negative, that's useful for  "directed" rectangles, e.g. to represent mouse selection with properly marked start and end.

Here's a rectangle with negative `width` and `height` (e.g. `width=-200`, `height=-100`):

![](coordinates-negative.png)

The rectangle starts at its bottom-right corner and then spans left/up, as negative `width/height` lead it backwards by coordinates.

As you can see, `left/top` are not `x/y` here. So these are actually not duplicates. Their formula can be adjusted to cover negative `width/height`, that's simple enough, but rarely needed, as the result of `elem.getBoundingClientRect()` always has positive width/height.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3
```

```warn header="Internet Explorer и Edge: не поддерживают `x/y`"
Internet Explorer и Edge не поддерживают свойства `x/y` по историческим причинам.

<<<<<<< HEAD
Таким образом, мы можем либо сделать полифил (добавив соответствующие геттеры в `DomRect.prototype`), либо использовать `top/left`, так как это всегда то же, что и `x/y`, в результате `elem.getBoundingClientRect()`.
```

```warn header="Координаты right/bottom отличаются от одноимённых CSS-свойств"
Есть очевидное сходство между координатами относительно окна и CSS `position:fixed`. Ведь такое CSS-позиционирование тоже происходит относительно окна браузера (или его видимой части).
=======
So we can either make a polywill (add getters in `DomRect.prototype`) or just use `top/left`, as they are always the same as `x/y` for `elem.getBoundingClientRect()`.
```

```warn header="Coordinates right/bottom are different from CSS position properties"
There are obvious similarities between window-relative coordinates and CSS `position:fixed`.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

Но в CSS свойство `right` означает расстояние от правого края, и свойство `bottom` означает расстояние от нижнего края окна браузера.

Если взглянуть на картинку выше, то видно, что в JavaScript это не так. Все координаты в контексте окна считаются от верхнего левого угла, включая `right/bottom`.
```

## elementFromPoint(x, y) [#elementFromPoint]

Вызов `document.elementFromPoint(x, y)` возвращает самый глубоко вложенный элемент в окне, находящийся по координатам `(x, y)`.

Синтаксис:

```js
let elem = document.elementFromPoint(x, y);
```

Например, код ниже выделяет с помощью стилей и выводит имя тега элемента, который сейчас в центре окна браузера:

```js run
let centerX = document.documentElement.clientWidth / 2;
let centerY = document.documentElement.clientHeight / 2;

let elem = document.elementFromPoint(centerX, centerY);

elem.style.background = "red";
alert(elem.tagName);
```

Поскольку используются координаты в контексте окна, то элемент может быть разным, в зависимости от того, какая сейчас прокрутка.

````warn header="Для координат за пределами окна метод `elementFromPoint` возвращает `null`"
Метод `document.elementFromPoint(x,y)` работает, только если координаты `(x,y)` относятся к видимой части содержимого окна.

<<<<<<< HEAD
Если любая из координат представляет собой отрицательное число или превышает размеры окна, то возвращается `null`.

Вот типичная ошибка, которая может произойти, если в коде нет соответствующей проверки:
=======
Here's a typical error that may occur if we don't check for it:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

```js
let elem = document.elementFromPoint(x, y);
// если координаты ведут за пределы окна, то elem = null
*!*
elem.style.background = ''; // Ошибка!
*/!*
```
````

<<<<<<< HEAD
## Применение для fixed позиционирования
=======
## Using for "fixed" positioning
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

Чаще всего нам нужны координаты для позиционирования чего-либо. В CSS для позиционирования элемента относительно окна браузера используется свойство `position:fixed` вместе со свойствами `left/top` (или `right/bottom`).

Мы можем вызвать `getBoundingClientRect`, чтобы получить координаты элемента, а затем показать что-то около него.

Например, функция `createMessageUnder(elem, html)` ниже показывает сообщение под элементом `elem`:

```js
let elem = document.getElementById("coords-show-mark");

function createMessageUnder(elem, html) {
  // создаём элемент, который будет содержать сообщение
  let message = document.createElement('div');
  // для стилей лучше было бы использовать css-класс здесь
  message.style.cssText = "position:fixed; color: red";

*!*
  // устанавливаем координаты элементу, не забываем про "px"!
  let coords = elem.getBoundingClientRect();

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";
*/!*

  message.innerHTML = html;

  return message;
}

// Использование:
// добавим сообщение на страницу на 5 секунд
let message = createMessageUnder(elem, 'Hello, world!');
document.body.append(message);
setTimeout(() => message.remove(), 5000);
```

```online
Кликните кнопку, чтобы увидеть пример в действии:

<button id="coords-show-mark">Кнопка с id="coords-show-mark", сообщение появится под ней</button>
```

<<<<<<< HEAD
Код можно изменить, чтобы показывать сообщение слева, справа, снизу, применять к нему CSS-анимации и так далее. Это просто, так как в нашем распоряжении имеются все координаты и размеры элемента.

Но обратите внимание на одну важную деталь: при прокрутке страницы сообщение уплывает от кнопки.

Причина весьма очевидна: сообщение позиционируется с помощью `position:fixed`, поэтому оно остаётся всегда на том же самом месте в окне при прокрутке страницы.

Чтобы изменить это, нам нужно использовать другую систему координат, где сообщение позиционировалось бы относительно документа, и свойство `position:absolute`.

## Координаты относительно документа [#getCoords]

В такой системе координат отсчёт ведётся от левого верхнего угла документа, не окна.

В CSS координаты относительно окна браузера соответствуют свойству `position:fixed`, а координаты относительно документа -- свойству `position:absolute` на самом верхнем уровне вложенности.

Мы можем воспользоваться свойствами `position:absolute` и `top/left`, чтобы привязать что-нибудь к конкретному месту в документе. При этом прокрутка страницы не имеет значения. Но сначала нужно получить верные координаты.

Не существует стандартного метода, который возвращал бы координаты элемента относительно документа, но мы можем написать его сами.
=======
The code can be modified to show the message at the left, right, below, apply CSS animations to "fade it in" and so on. That's easy, as we have all the coordinates and sizes of the element.

But note the important detail: when the page is scrolled, the message flows away from the button.

The reason is obvious: the message element relies on `position:fixed`, so it remains at the same place of the window while the page scrolls away.

To change that, we need to use document-based coordinates and `position:absolute`.

## Document coordinates [#getCoords]

Document-relative coordinates start from the upper-left corner of the document, not the window.

In CSS, window coordinates correspond to `position:fixed`, while document coordinates are similar to `position:absolute` on top.

We can use `position:absolute` and `top/left` to put something at a certain place of the document, so that it remains there during a page scroll. But we need the right coordinates first.

There's no standard method to get the document coordinates of an element. But it's easy to write it.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

Две системы координат связаны следующими формулами:
- `pageY` = `clientY` + высота вертикально прокрученной части документа.
- `pageX` = `clientX` + ширина горизонтально прокрученной части документа.

Функция `getCoords(elem)` берёт координаты в контексте окна с помощью `elem.getBoundingClientRect()` и добавляет к ним значение соответствующей прокрутки:

```js
// получаем координаты элемента в контексте документа
function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}
```

<<<<<<< HEAD
## Итого
=======
If in the example above we use it with `position:absolute`, that would work right.

The modified `createMessageUnder` function:

```js
function createMessageUnder(elem, html) {
  let message = document.createElement('div');
  message.style.cssText = "*!*position:absolute*/!*; color: red";

  let coords = *!*getCoords(elem);*/!*

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  message.innerHTML = html;

  return message;
}
```

You'll find other examples in the task.

## Summary
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

Любая точка на странице имеет координаты:

1. Относительно окна браузера -- `elem.getBoundingClientRect()`.
2. Относительно документа -- `elem.getBoundingClientRect()` плюс текущая прокрутка страницы.

Координаты в контексте окна подходят для использования с `position:fixed`, а координаты относительно документа -- для использования с `position:absolute`.

Каждая из систем координат имеет свои преимущества и недостатки. Иногда будет лучше применить одну, а иногда -- другую, как это и происходит с позиционированием в CSS, где мы выбираем между `absolute` и `fixed`.
