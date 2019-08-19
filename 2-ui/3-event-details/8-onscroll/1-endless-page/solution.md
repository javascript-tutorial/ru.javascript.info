Основа решения -- функция, которая добавляет больше дат на страницу (или загружает больше материала в реальной жизни), пока мы находимся в конце этой страницы.

Мы можем вызвать её сразу же и добавить как обработчик для `window.onscroll`.

Самый важный вопрос: "Как обнаружить, что страница прокручена к самому низу?"

Давайте используем координаты относительно окна.

Документ представлен тегом `<html>` (и содержится в нём же), который доступен как `document.documentElement`.

<<<<<<< HEAD
Так что мы можем получить его координаты относительно окна как `document.documentElement.getBoundingClientRect()`, свойство `bottom` будет координатой нижней границы документа относительно окна.

Например, если высота всего HTML-документа `2000px`, тогда:

```js
// когда мы находимся вверху страницы
// координата top относительно окна равна 0
=======
We can get window-relative coordinates of the whole document as `document.documentElement.getBoundingClientRect()`, the `bottom` property will be window-relative coordinate of the document bottom.

For instance, if the height of the whole HTML document is `2000px`, then:

```js
// when we're on the top of the page
// window-relative top = 0
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
document.documentElement.getBoundingClientRect().top = 0

// координата bottom относительно окна равна 2000
// документ длинный, вероятно, далеко за пределами нижней части окна
document.documentElement.getBoundingClientRect().bottom = 2000
```

Если прокрутить `500px` вниз, тогда:

```js
// верх документа находится выше окна на 500px
document.documentElement.getBoundingClientRect().top = -500
// низ документа на 500px ближе
document.documentElement.getBoundingClientRect().bottom = 1500
```

Когда мы прокручиваем до конца, предполагая, что высота окна `600px`:


```js
// верх документа находится выше окна на 1400px
document.documentElement.getBoundingClientRect().top = -1400
// низ документа находится ниже окна на 600px
document.documentElement.getBoundingClientRect().bottom = 600
```

<<<<<<< HEAD
Пожалуйста, обратите внимание, что `bottom` не может быть `0`, потому что низ документа никогда не достигнет верха окна. Нижним пределом координаты `bottom` является высота окна (выше мы предположили, что это `600`), больше прокручивать вверх нельзя.

Получить высоту окна можно как `document.documentElement.clientHeight`.

Для нашей задачи мы хотим знать, когда нижняя граница документа находится не более чем в  `100px` от неё (т.е. `600-700px`, если высота `600`).
=======
Please note that the `bottom` can't be `0`, because it never reaches the window top. The lowest limit of the `bottom` coordinate is the window height (we assumed it to be `600`), we can't scroll it any more up.

We can obtain the window height as `document.documentElement.clientHeight`.

For our task, we need to know when the document bottom is not no more than `100px` away from it (that is: `600-700px`, if the height is `600`).
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

Итак, вот функция:

```js
function populate() {
  while(true) {
    // нижняя граница документа
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

<<<<<<< HEAD
    // если пользователь прокрутил достаточно далеко (< 100px до конца)
    if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
      // добавим больше данных
      document.body.insertAdjacentHTML("beforeend", `<p>Дата: ${new Date()}</p>`);
=======
    // if the user scrolled far enough (<100px to the end)
    if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
      // let's add more data
      document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
    }
  }
}
```
