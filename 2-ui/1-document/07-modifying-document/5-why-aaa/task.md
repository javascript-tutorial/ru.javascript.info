importance: 1

---

# Почему остаётся "aaa"?

Запустите этот пример. Почему вызов `remove` не удалил текст `"aaa"`?

```html height=100 run
<table id="table">
  aaa
  <tr>
    <td>Тест</td>
  </tr>
</table>

<script>
  alert(table); // таблица, как и должно быть

  table.remove();
  // почему в документе остался текст "ааа"??
</script>
```
