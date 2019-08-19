Обработчик `onscroll` должен проверить, какие изображения видимы, и показать их.

Мы также можем запустить его при загрузке страницы, чтобы сразу обнаружить видимые изображения и загрузить их.

Код должен выполниться, когда документ загружен, чтобы у него был доступ к его содержимому.

Можно и разместить его его перед закрывающим тегом `</body>`:

```js
// ...содержимое страницы выше...

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

  // верхний край элемента виден?
  let topVisible = coords.top > 0 && coords.top < windowHeight;

  // нижний край элемента виден?
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}
```

Функция `showVisible()` использует проверку на видимость, реализованную в `isVisible()` для загрузки видимых картинок:

```js
function showVisible() {
  for (let img of document.querySelectorAll('img')) {
    let realSrc = img.dataset.src;
    if (!realSrc) continue;

    if (isVisible(img)) {
      img.src = realSrc;
      img.dataset.src = '';
    }
  }
}

*!*
showVisible();
window.onscroll = showVisible;
*/!*
```

P.S. В решении этой задачи есть также вариант `isVisible`, который предварительно загружает изображения, находящиеся в пределах одной страницы выше/ниже от текущей прокрутки документа.
