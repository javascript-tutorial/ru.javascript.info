
Сначала давайте посмотрим, как *не* надо это делать:

```js
function clear(elem) {
  for (let i=0; i < elem.childNodes.length; i++) {
      elem.childNodes[i].remove();
  }
}
```

Это не будет работать, потому что вызов `remove()` сдвигает коллекцию `elem.childNodes`, поэтому элементы начинаются каждый раз с индекса `0`. А `i` увеличивается, и некоторые элементы будут пропущены.

Цикл `for..of` делает то же самое.

Правильным вариантом может быть:

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

А также есть более простой способ сделать то же самое:

```js
function clear(elem) {
  elem.innerHTML = '';
}
```
