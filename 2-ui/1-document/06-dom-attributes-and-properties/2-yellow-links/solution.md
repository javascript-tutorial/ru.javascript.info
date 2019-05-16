
Во-первых, мы должны найти все внешние ссылки.

Это можно сделать двумя способами.

Первый -- это найти все ссылки, используя `document.querySelectorAll('a')`, а затем отфильтровать ненужное:

```js
let links = document.querySelectorAll('a');

for (let link of links) {
*!*
  let href = link.getAttribute('href');
*/!*
  if (!href) continue; // нет атрибута

  if (!href.includes('://')) continue; // нет протокола

  if (href.startsWith('http://internal.com')) continue; // внутренняя

  link.style.color = 'orange';
}
```

Пожалуйста, обратите внимание: мы используем `link.getAttribute('href')`. Не `link.href`, потому что нам нужно значение из HTML.

...Другой, более простой путь -- добавить проверку в CSS-селектор:

```js
// найти все ссылки, атрибут href у которых содержит ://
// и при этом href не начинается с http://internal.com
let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
let links = document.querySelectorAll(selector);

links.forEach(link => link.style.color = 'orange');
```
