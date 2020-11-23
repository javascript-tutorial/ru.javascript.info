importance: 1

---

# Почему остаётся "aaa"?

<<<<<<< HEAD
Запустите этот пример. Почему вызов `remove` не удалил текст `"aaa"`?
=======
In the example below, the call `table.remove()` removes the table from the document.

But if you run it, you can see that the text `"aaa"` is still visible.

Why does that happen?
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

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
