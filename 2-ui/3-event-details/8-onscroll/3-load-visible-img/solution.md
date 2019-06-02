Обработчик `onscroll` должен проверить, какие изображения видимы и показать их.

Мы также можем захотеть запустить его при загрузке страницы, чтобы сразу обнаружить видимые изображения перед любой прокруткой и загрузить их.

Если мы поместим его перед закрывающим тегом `</body>`, тогда он запустится при загрузке содержимого страницы.

```js
// ...содержимое страницы выше...

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

  // видны верхний ИЛИ нижний край элемента
  let topVisible = coords.top > 0 && coords.top < windowHeight;
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}

*!*
showVisible();
window.onscroll = showVisible;
*/!*
```

Для видимых изображений мы можем взять `img.dataset.src` и присвоить это значение `img.src` (если ещё этого не сделали).

P.S. У этого решения также есть вариант `isVisible`, который "предварительно загружает" изображения, находящиеся в пределах одной страницы выше/ниже (высота страницы -- `document.documentElement.clientHeight`).