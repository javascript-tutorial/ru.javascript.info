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
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

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
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
</script>
```
