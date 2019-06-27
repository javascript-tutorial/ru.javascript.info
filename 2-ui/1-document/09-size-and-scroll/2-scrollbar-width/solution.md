Чтобы получить ширину полосы прокрутки, создадим элемент с прокруткой, но без рамок и внутренних отступов.

Тогда разница между его полной шириной `offsetWidth` и шириной внутреннего содержимого `clientWidth` будет равна как раз прокрутке:

```js run
// создадим элемент с прокруткой
let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;

div.remove();

alert(scrollWidth);
```
