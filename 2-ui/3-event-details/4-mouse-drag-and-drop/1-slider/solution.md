<<<<<<< HEAD
Как можно видеть из HTML/CSS, слайдер – это `<div>`, подкрашенный фоном/градиентом, внутри которого находится другой `<div>`, оформленный как бегунок, с `position:relative`.

Используем для его координат `position:relative`, т.е. координаты ставятся не абсолютные, а относительно родителя, так как это удобнее.

И дальше реализуем Drag'n'Drop только по горизонтали, с ограничением по ширине.
=======
As we can see from HTML/CSS, the slider is a `<div>` with a colored background, that contains a runner -- another `<div>` with `position:relative`.

To position the runner we use `position:relative`, to provide the coordinates relative to its parent, here it's more convenient here than `position:absolute`.

Then we implement horizontal-only Drag'n'Drop with limitation by width.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
