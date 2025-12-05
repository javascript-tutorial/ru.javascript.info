importance: 5

---

# Редактирование TD по клику

Сделайте ячейки таблицы редактируемыми по клику.

<<<<<<< HEAD
- По клику -- ячейка должна стать "редактируемой" (textarea появляется внутри), мы можем изменять HTML. Изменение размера ячейки должно быть отключено.
- Кнопки OK и ОТМЕНА появляются ниже ячейки и, соответственно, завершают/отменяют редактирование.
- Только одну ячейку можно редактировать за один раз. Пока `<td>` в "режиме редактирования", клики по другим ячейкам игнорируются.
- Таблица может иметь множество ячеек. Используйте делегирование событий.
=======
- On click -- the cell should become "editable" (textarea appears inside), we can change HTML. There should be no resize, all geometry should remain the same.
- Buttons OK and CANCEL appear below the cell to finish/cancel the editing.
- Only one cell may be editable at a moment. While a `<td>` is in "edit mode", clicks on other cells are ignored.
- The table may have many cells. Use event delegation.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

Демо:

[iframe src="solution" height=400]
