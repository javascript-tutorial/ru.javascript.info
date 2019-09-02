importance: 5

---

# Улучшенная подсказка

<<<<<<< HEAD
Напишите JavaScript код, который показывает подсказку над элементом с атрибутом `data-tooltip`. Значение атрибута должно становиться текстом подсказки.
=======
Write JavaScript that shows a tooltip over an element with the attribute `data-tooltip`. The value of this attribute should become the tooltip text.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

Это похоже на задачу <info:task/behavior-tooltip>, но здесь элементы с подсказками могут быть вложены друг в друга. Показываться должна подсказка на самом глубоко вложенном элементе.

<<<<<<< HEAD
Только одна подсказка может быть показана в любой момент времени.

Например:
=======
Only one tooltip may show up at the same time.

For instance:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```html
<div data-tooltip="Здесь - домашний интерьер" id="house">
  <div data-tooltip="Здесь - крыша" id="roof"></div>
  ...
  <a href="https://ru.wikipedia.org/wiki/%D0%A2%D1%80%D0%B8_%D0%BF%D0%BE%D1%80%D0%BE%D1%81%D1%91%D0%BD%D0%BA%D0%B0" data-tooltip="Читать далее…">Наведи курсор на меня</a>
</div>
```

Результат в iframe:

[iframe src="solution" height=300 border=1]
