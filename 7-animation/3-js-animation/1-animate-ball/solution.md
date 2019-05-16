Чтобы заставить мячик прыгать можно использовать CSS-свойство `top` и задать мячику `position:absolute` внутри поля с `position:relative`.

Нижняя координата поля -- `field.clientHeight`. Но свойство `top` соответствует координате мяча от верхней границы мяча, конечная позиция мяча может быть вычислена так: `field.clientHeight - ball.clientHeight`.

Итак мы анимируем свойство `top` от `0` до `field.clientHeight - ball.clientHeight`.

Теперь, чтобы получить эффект "скачущего" мяча, мы можем использовать временную функцию `bounce` в режиме `easeOut`.

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
