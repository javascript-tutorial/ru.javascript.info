importance: 5

---

# Выберите элементы селектором

HTML-документ:

```html
<input type="checkbox">
<input type="checkbox" checked>
<input type="text" id="message">

<h3 id="widget-title">Сообщения:</h3>
<ul id="messages">
  <li id="message-1">Сообщение 1</li>
  <li id="message-2">Сообщение 2</li>
  <li id="message-3" data-action="delete">Сообщение 3</li>
  <li id="message-4" data-action="edit do-not-delete">Сообщение 4</li>
  <li id="message-5" data-action="edit delete">Сообщение 5</li>
  <li><a href="#">...</a></li>
</ul>

<a href="http://site.com/list.zip">Ссылка на архив</a>
<a href="http://site.com/list.pdf">..И на PDF</a>
```

Задания:

1. Выбрать `input` типа `checkbox`.
2. Выбрать `input` типа `checkbox`, НЕ отмеченный.
3. Найти все элементы с `id=message` или `message-*`.
4. Найти все элементы с `id=message-*`.
5. Найти все ссылки с расширением `href="...zip"`.
6. Найти все элементы с атрибутом `data-action`, содержащим `delete` в списке (через пробел).
7. Найти все элементы, у которых ЕСТЬ атрибут `data-action`, но он НЕ содержит `delete` в списке (через пробел).
8. Выбрать все чётные элементы списка `#messages`.
9. Выбрать один элемент сразу за заголовком `h3#widget-title` на том же уровне вложенности.
10. Выбрать все ссылки, следующие за заголовком `h3#widget-title` на том же уровне вложенности.
11. Выбрать ссылку внутри последнего элемента списка `#messages`.

