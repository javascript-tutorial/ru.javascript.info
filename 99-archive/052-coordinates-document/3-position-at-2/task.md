importance: 5

---

# Разместить заметку внутри элемента

Расширьте предыдущую задачу <info:task/position-at-absolute>: научите функцию `positionAt(anchor, position, elem)` вставлять `elem` внутрь `anchor`.

Новые значения `position`:

- `top-out`, `right-out`, `bottom-out` -- работают так же, как раньше, то есть вставляют `elem` над/справа/под `anchor`.
- `top-in`, `right-in`, `bottom-in` -- вставляют `elem` внутрь `anchor`: к верхней границе/правой/нижней.

Например:

```js
// покажет note сверху blockquote
positionAt(blockquote, "top-out", note);

// покажет note сверху-внутри blockquote
positionAt(blockquote, "top-in", note);
```

Пример результата:

[iframe src="solution" height="500" border="1" link]

В качестве исходного документа возьмите решение задачи <info:task/position-at-absolute>.