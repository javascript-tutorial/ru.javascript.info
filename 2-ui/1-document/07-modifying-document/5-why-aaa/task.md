importance: 1

---

# Почему остаётся "aaa"?

В примере ниже вызов `table.remove()` удаляет таблицу из документа.

Но если вы запустите его, вы увидите, что текст `"aaa"` все еще виден.

Почему так происходит?

<<<<<<< HEAD
=======
In the example below, the call `table.remove()` removes the table from the document.

But if you run it, you can see that the text `"aaa"` is still visible.

Why does that happen?
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

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
<<<<<<< HEAD
  // почему в документе остался текст "ааа"?
=======
  // why there's still "aaa" in the document?
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
</script>
```
