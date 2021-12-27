Мяч имеет CSS-свойство `position:absolute`. Это означает, что координаты `left/top` измеряются относительно ближайшего спозиционированного элемента, которым является `#field` (т.к. у него есть CSS-свойство `position:relative`).

Координаты отсчитываются от внутреннего верхнего левого угла поля:

![](field.svg)

Ширина и высота внутреннего поля -- это `clientWidth/clientHeight`. Таким образом, его центр имеет координаты `(clientWidth/2, clientHeight/2)`.

...Но если мы установим мячу такие значения `ball.style.left/top`, то в центре будет не сам мяч, а его левый верхний угол:

```js
ball.style.left = Math.round(field.clientWidth / 2) + 'px';
ball.style.top = Math.round(field.clientHeight / 2) + 'px';
```

Вот как это выглядит:

[iframe height=180 src="ball-half"]

Для того, чтобы центр мяча находился в центре поля, нам нужно сместить мяч на половину его ширины влево и на половину его высоты вверх:

```js
ball.style.left = Math.round(field.clientWidth / 2 - ball.offsetWidth / 2) + 'px';
ball.style.top = Math.round(field.clientHeight / 2 - ball.offsetHeight / 2) + 'px';
```

<<<<<<< HEAD
**Внимание, подводный камень!**
=======
Now the ball is finally centered.

````warn header="Attention: the pitfall!"
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Код выше стабильно работать не будет, потому что `<img>` идёт без ширины/высоты:

```html
<img src="ball.png" id="ball">
```
````

Если браузеру неизвестны ширина и высота изображения (из атрибута HTML-тега или CSS-свойств), он считает их равными `0` до тех пор, пока изображение не загрузится.

<<<<<<< HEAD
При первой загрузке браузер обычно кеширует изображения, так что при последующей загрузке оно будет доступно тут же, вместе с размерами. Но при первой загрузке значение ширины мяча `ball.offsetWidth` равно `0`. Это приводит к вычислению неверных координат.
=======
So the value of `ball.offsetWidth` will be `0` until the image loads. That leads to wrong coordinates in the code above.

After the first load, the browser usually caches the image, and on reloads it will have the size immediately. But on the first load the value of `ball.offsetWidth` is `0`.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Мы можем исправить это, добавив атрибуты `width/height` тегу `<img>`:

```html
<img src="ball.png" *!*width="40" height="40"*/!* id="ball">
```

...Или задав размеры в CSS:

```css
#ball {
  width: 40px;
  height: 40px;
}
```
