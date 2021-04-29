Есть несколько способов для получения элементов, например:

DOM-узел элемента `<div>`:

```js
document.body.firstElementChild
// или
document.body.children[0]
// или (первый узел пробел, поэтому выбираем второй)
document.body.childNodes[1]
```

DOM-узел элемента `<ul>`:

```js
document.body.lastElementChild
// или
document.body.children[1]
```

Второй `<li>` (с именем Пит):

```js
// получаем <ul>, и его последнего ребёнка
document.body.lastElementChild.lastElementChild
```
