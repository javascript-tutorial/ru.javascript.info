
Когда нам необходимо вставить фрагмент HTML-кода, можно использовать `insertAdjacentHTML`, он лучше всего подходит для таких задач.
  
Решение:

```js
one.insertAdjacentHTML('afterend', '<li>2</li><li>3</li>');
```
