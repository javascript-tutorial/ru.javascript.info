В задаче <info:task/animate-ball> нам надо было анимировать только одно свойство. Теперь необходимо добавить ещё одно: `elem.style.left`.

Горизонтальная координата меняется по другому закону: она не «подпрыгивает», а постепенно увеличивается, сдвигая шар вправо.

Для этого мы можем написать ещё одну функцию `animate`.

В качестве временной функции можно использовать `linear`, но `makeEaseOut(quad)` будет выглядеть гораздо лучше.

Код:

```js
let height = field.clientHeight - ball.clientHeight;
let width = 100;

// анимация top (прыжки)
animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw: function(progress) {
    ball.style.top = height * progress + 'px'
  }
});

// анимация left (движение вправо)
animate({
  duration: 2000,
  timing: makeEaseOut(quad),
  draw: function(progress) {
    ball.style.left = width * progress + "px"
  }
});
```
