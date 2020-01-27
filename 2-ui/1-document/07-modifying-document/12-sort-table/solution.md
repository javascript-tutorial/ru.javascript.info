Решение короткое, но может показаться немного сложным, поэтому здесь я предоставлю подробные комментарии:

```js
let sortedRows = Array.from(table.tBodies[0].rows) // 1
  .sort((rowA, rowB) => rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML));

table.tBodies[0].append(...sortedRows); // (3)
```

<<<<<<< HEAD
1. Получим все `<tr>`, как `table.querySelectorAll('tr')`, затем сделаем массив из них, потому что нам понадобятся методы массива.
2. Первый TR (`table.rows[0]`) -- это заголовок таблицы, поэтому мы берём `.slice(1)`.
3. Затем отсортируем их по содержимому в первом `<td>` (по имени).
4. Теперь вставим узлы в правильном порядке `.append(...sortedRows)`.

    Таблицы всегда имеют неявный элемент <tbody>, поэтому нам нужно получить его и вставить в него: простой `table.append(...)` потерпит неудачу.

    Обратите внимание: нам не нужно их удалять, просто "вставляем их заново", они автоматически покинут старое место.
=======
The step-by-step algorthm:

1. Get all `<tr>`, from `<tbody>`.
2. Then sort them comparing by the content of the first `<td>` (the name field).
3. Now insert nodes in the right order by `.append(...sortedRows)`.

We don't have to remove row elements, just "re-insert", they leave the old place automatically.

P.S. In our case, there's an explicit `<tbody>` in the table, but even if HTML table doesn't have `<tbody>`, the DOM structure always has it.
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38
