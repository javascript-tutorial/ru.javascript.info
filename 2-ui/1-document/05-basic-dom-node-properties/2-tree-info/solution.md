Пройдем циклом по всем элементам `<li>`:

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

В цикле нам нужно получить текст всех элементов `li`. Мы можем прочитать его прямо из первого дочернего узла, это будет текстовый узел:

```js
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // переменная title содержит текст элемента <li> 
}
```

Так мы сможем узнать количество потомков `li.getElementsByTagName('li')`.length
