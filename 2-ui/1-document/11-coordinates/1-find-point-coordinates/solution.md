# Внешние углы

Координаты внешних углов -- это как раз то, что возвращает функция [elem.getBoundingClientRect()](https://developer.mozilla.org/ru/docs/DOM/element.getBoundingClientRect).

Координаты верхнего левого внешнего угла будут в переменной `answer1` и нижнего правого -- в `answer2`:

```js
let coords = elem.getBoundingClientRect();

let answer1 = [coords.left, coords.top];
let answer2 = [coords.right, coords.bottom];
```

# Верхний левый внутренний угол

Тут значения отличаются на ширину рамки. Надёжный способ получить интересующее значение -- это использовать `clientLeft/clientTop`:

```js
let answer3 = [coords.left + field.clientLeft, coords.top + field.clientTop];
```

# Нижний правый внутренний угол

В нашем случае нужно вычесть размеры рамки из внешних координат.

Это может быть сделано с помощью CSS:

```js
let answer4 = [
  coords.right - parseInt(getComputedStyle(field).borderRightWidth),
  coords.bottom - parseInt(getComputedStyle(field).borderBottomWidth)
];
```

Другим вариантом решения было бы добавление `clientWidth/clientHeight` к координатам верхнего левого угла. Так даже было бы лучше.

```js
let answer4 = [
  coords.left + elem.clientLeft + elem.clientWidth,
  coords.top + elem.clientTop + elem.clientHeight
];
```
