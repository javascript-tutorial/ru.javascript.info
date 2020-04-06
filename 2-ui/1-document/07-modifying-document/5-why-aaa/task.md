importance: 1

---

# Почему остаётся "aaa"?

<<<<<<< HEAD
Запустите этот пример. Почему вызов `remove` не удалил текст `"aaa"`?
=======
In the example below, the call `table.remove()` removes the table from the document.

But if you run it, you can see that the text `"aaa"` is still visible.

Why does that happen?
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622

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
