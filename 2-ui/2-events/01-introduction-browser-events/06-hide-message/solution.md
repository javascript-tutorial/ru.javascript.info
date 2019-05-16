
Чтобы добавить кнопку закрытия, мы можем использовать либо `position:absolute` (и сделать плитку (`pane`) `position:relative`) либо `float:right`. Преимущество варианта с `float:right` в том, что кнопка закрытия никогда не перекроет текст, но вариант `position:absolute` даёт больше свободы для действий. В общем, выбор за вами.

Тогда для каждой плитки код может выглядеть следующим образом:

```js
pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
```

Элемент `<button>` становится `pane.firstChild`, таким образом мы можем добавить на него обработчик события:

```js
pane.firstChild.onclick = () => pane.remove();
```
