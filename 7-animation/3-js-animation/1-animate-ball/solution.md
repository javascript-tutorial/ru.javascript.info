Чтобы заставить мячик прыгать, можно использовать CSS-свойство `top` и задать мячику `position:absolute` внутри поля с `position:relative`.

Нижняя координата поля -- `field.clientHeight`. CSS-свойство `top` относится к верхней границе мяча, которая должна идти от 0 до `field.clientHeight - ball.clientHeight`.

<<<<<<< HEAD
А чтобы получить эффект "скачущего" мяча, мы можем использовать функцию расчёта времени `bounce` в режиме `easeOut`.
=======
To get the "bouncing" effect we can use the timing function `bounce` in `easeOut` mode.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Вот конечный код для анимации:

```js
let to = field.clientHeight - ball.clientHeight;

animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw(progress) {
    ball.style.top = to * progress + 'px'
  }
});
```
