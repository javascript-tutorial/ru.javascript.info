Пройдём циклом по всем элементам `<li>`:

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

В цикле нам нужно получить текст в каждом элементе `li`. Мы можем прочитать текстовое содержимое элемента списка из первого дочернего узла `li`, который будет текстовым узлом:

```js
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // переменная title содержит текст элемента <li> 
}
```

Так мы сможем получить количество потомков как `li.getElementsByTagName('li').length`.
