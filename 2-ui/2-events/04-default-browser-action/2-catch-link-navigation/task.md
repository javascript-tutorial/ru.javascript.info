importance: 5

---

# Поймайте переход по ссылке

Сделайте так, чтобы при клике на ссылки внутри элемента `id="contents"` пользователю выводился вопрос о том, действительно ли он хочет покинуть страницу, и если он не хочет, то прерывать переход по ссылке.

Так это должно работать:

[iframe height=100 border=1 src="solution"]

Детали:

<<<<<<< HEAD
- Содержимое `#contents` может быть загружено динамически и присвоено при помощи `innerHTML`. Так что найти все ссылки и поставить на них обработчики нельзя. Используйте делегирование.
- Содержимое может иметь вложенные теги, *в том числе внутри ссылок*, например, `<a href=".."><i>...</i></a>`.
=======
- HTML inside the element may be loaded or regenerated dynamically at any time, so we can't find all links and put handlers on them. Use event delegation.
- The content may have nested tags. Inside links too, like `<a href=".."><i>...</i></a>`.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
