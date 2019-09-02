importance: 5

---

# "Умная" подсказка

<<<<<<< HEAD
Напишите функцию, которая показывает подсказку над элементом только в случае, когда пользователь передвигает мышь *на него*, но не *через него*.

Другими словами, если пользователь подвинул курсор на элементе и остановился -- показывать подсказку. А если он просто быстро провёл курсором по элементу, то не надо ничего показывать. Кому понравится лишнее мелькание?
=======
Write a function that shows a tooltip over an element only if the visitor moves the mouse *to it*, but not *through it*.

In other words, if the visitor moves the mouse to the element and stops there -- show the tooltip. And if they just moved the mouse through, then no need, who wants extra blinking?
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

Технически, мы можем измерять скорость прохода курсора мыши над элементом, и если она низкая, то можно посчитать, что пользователь остановил курсор над элементом, и показать ему подсказку. А если скорость высокая, то тогда не показывать.

<<<<<<< HEAD
Создайте для этого универсальный объект `new HoverIntent(options)`.

Его настройки `options`:
- `elem` -- отслеживаемый элемент.
- `over` -- функция, вызываемая, при заходе на элемент, считаем что заход - это когда курсор медленно двигается или остановился над элементом.
- `out` -- функция, вызываемая при уходе курсора с элемента (если был заход).
=======
Make a universal object `new HoverIntent(options)` for it.

Its `options`:
- `elem` -- element to track.
- `over` -- a function to call if the mouse came to the element: that is, it moves slowly or stopped over it.
- `out` -- a function to call when the mouse leaves the element (if `over` was called).
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

Пример использования такого объекта для показа подсказки:

```js
// пример подсказки
let tooltip = document.createElement('div');
tooltip.className = "tooltip";
tooltip.innerHTML = "Tooltip";

// объект будет отслеживать движение мыши и вызывать функции over/out
new HoverIntent({
  elem,
  over() {
    tooltip.style.left = elem.getBoundingClientRect().left + 'px';
    tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
    document.body.append(tooltip);
  },
  out() {
    tooltip.remove();
  }
});
```

Демо:

[iframe src="solution" height=140]

Если двигать кусор над "часами" быстро, то ничего не произойдёт, а если вы замедлите движение курсора над элементом или остановите его, то будет показана подсказка.

Обратите внимание: подсказка не должна пропадать (мигать), когда курсор переходит между дочерними элементами часов.
