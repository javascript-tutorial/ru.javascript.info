Обработчик `onscroll` должен проверить, какие изображения видимы, и показать их.

<<<<<<< HEAD
Мы также можем запустить его при загрузке страницы, чтобы сразу обнаружить видимые изображения и загрузить их.

Код должен выполниться, когда документ загружен, чтобы у него был доступ к его содержимому.

Можно и разместить его его перед закрывающим тегом `</body>`:
=======
We also want to run it when the page loads, to detect immediately visible images and load them.

The code should execute when the document is loaded, so that it has access to its content.

Or put it at the `<body>` bottom:
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

```js
// ...содержимое страницы выше...

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

<<<<<<< HEAD
  // верхний край элемента виден?
  let topVisible = coords.top > 0 && coords.top < windowHeight;

  // нижний край элемента виден?
=======
  // top elem edge is visible?
  let topVisible = coords.top > 0 && coords.top < windowHeight;

  // bottom elem edge is visible?
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}
```

<<<<<<< HEAD
Функция `showVisible()` использует проверку на видимость, реализованную в `isVisible()` для загрузки видимых картинок:
=======
The `showVisible()` function uses the visibility check, implemented by `isVisible()`, to load visible images:
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

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

<<<<<<< HEAD
P.S. В решении этой задачи есть также вариант `isVisible`, который предварительно загружает изображения, находящиеся в пределах одной страницы выше/ниже от текущей прокрутки документа.
=======
P.S. The solution also has a variant of `isVisible` that "preloads" images that are within 1 page above/below the current document scroll.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
