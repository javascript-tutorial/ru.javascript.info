importance: 5

---

# Компонент: список с выделением

Перепишите решение задачи <info:task/selectable-list> в виде компонента.

У компонента должен быть единственный публичный метод `getSelected()`, который возвращает выбранные значения в виде массива.

Использование:

```js
var listSelect = new ListSelect({
  elem: document.querySelector('ul')
});
// listSelect.getSelected()
```

Демо:

[iframe border="1" src="solution"]

