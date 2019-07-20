importance: 5

---

# Расположите заметку внутри элемента (абсолютное позиционирование)

Усовершенствуйте решение предыдущего задания <info:task/position-at-absolute>: научите функцию `positionAt(anchor, position, elem)` вставлять `elem` внутрь `anchor`.

Новые значения для аргумента `position`:

- `top-out`, `right-out`, `bottom-out` -- работают так же, как раньше, они вставляют `elem` сверху/справа/снизу `anchor`.
- `top-in`, `right-in`, `bottom-in` -- вставляют `elem` внутрь `anchor`: приклеивают его к верхнему/правому/нижнему краю.

Например:

```js
// показывает заметку поверх цитаты
positionAt(blockquote, "top-out", note);

// показывает заметку внутри цитаты вблизи верхнего края элемента
positionAt(blockquote, "top-in", note);
```

Результат:

[iframe src="solution" height="310" border="1" link]

Для начала возьмите решение задания <info:task/position-at-absolute>.
