Ответ: **1 и 3**.

Результатом обеих команд будет добавление `text` "как текст" в `elem`.

Пример:

```html run height=80
<div id="elem1"></div>
<div id="elem2"></div>
<div id="elem3"></div>
<script>
  let text = '<b>текст</b>';

  elem1.append(document.createTextNode(text));
  elem2.innerHTML = text;
  elem3.textContent = text;
</script>
```
