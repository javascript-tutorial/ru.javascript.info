Суть решения -- это функция, которая добавляет больше дат на страницу (или загружает больше материала в реальной жизни), пока мы находимся в конце этой страницы.

Мы можем вызвать её сразу же и добавить как обработчик для `window.onscroll`.

Самый важный вопрос: "Как обнаружить, что страница прокручена к самому низу?"

Давайте используем координаты относительно окна.

Документ представлен (и содержится) в теге `<html>`, то есть `document.documentElement`.

Мы можем получить координаты относительно окна так `document.documentElement.getBoundingClientRect()`. И свойство `bottom` будет координатой относительно окна для конца документа.

Например, если высота всего HTML-документа 2000px, тогда:

```js
// Когда мы находимся вверху страницы
// координата top относительно окна равна 0
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

Пожалуйста, обратите внимание, что bottom не может быть 0, потому что низ документа никогда не достигнет верха окна. Нижним пределом координаты bottom является высота окна, больше прокручивать вверх нельзя.

А высота окна -- `document.documentElement.clientHeight`.

Мы хотим, чтобы до нижней границы документа оставалось не более `100px`.

Итак, вот функция:

```js
function populate() {
  while(true) {
    // низ документа
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    // если он больше, чем высота окна + 100px, тогда мы не в конце страницы
    // (смотрите примеры выше, большое значение bottom означает, что нужно прокрутить ещё)
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;

    // иначе, добавим больше данных
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
  }
}
```
