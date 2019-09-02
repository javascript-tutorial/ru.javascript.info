
<<<<<<< HEAD
Алгоритм выглядит просто:
1. Назначаем обработчики `onmouseover/out` на элементе. Также можно было бы использовать `onmouseenter/leave`, но они менее универсальны и не сработают с делегированием.
2. Когда курсор переходит на элемент, начинаем измерять скорость его движения, используя `mousemove`.
3. Если скорость низкая, то вызываем `over`.
4. Когда мы выходим из элемента, если запускали `over`, вызываем `out`.

Но как измерить скорость?

Первая идея может быть такой: запускать нашу функцию каждые `100ms` и находить разницу между прежними и текущими координатами курсора. Если она мала, то значит и скорость низкая.
=======
The algorithm looks simple:
1. Put `onmouseover/out` handlers on the element. Also can use `onmouseenter/leave` here, but they are less universal, won't work if we introduce delegation.
2. When a mouse cursor entered the element, start measuring the speed on `mousemove`.
3. If the speed is slow, then run `over`.
4. When we're going out of the element, and `over` was executed, run `out`.

But how to measure the speed?

The first idea can be: run a function every `100ms` and measure the distance between previous and new coordinates. If it's small, then the speed is small.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

К сожалению, в JavaScript нет возможности получать текущие координаты мыши. Не существует функции типа `получитьТекущиеКоординатыМыши()`.

<<<<<<< HEAD
Единственный путь - это слушать события мыши, например `mousemove`, и координаты брать из объекта события.

Так что поставим обработчик на `mousemove`, чтобы отслеживать координаты и запоминать их. И будем сравнивать результаты каждые `100ms`.
=======
The only way to get coordinates is to listen to mouse events, like `mousemove`, and take coordinates from the event object.

So let's set a handler on `mousemove` to track coordinates and remember them. And then compare them, once per `100ms`.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

P.S. Обратите внимание: тесты для решения этой задачи используют `dispatchEvent`, чтобы проверить, что подсказка работает корректно.
