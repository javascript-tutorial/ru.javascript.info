importance: 5

---

# Сортировка таблицы

Таблица:

```html run
<table>
<<<<<<< HEAD
<tr>
  <th>Имя</th>
  <th>Фамилия</th>
  <th>Возраст</th>
</tr>
<tr>
  <td>John</td>
  <td>Smith</td>
  <td>10</td>
</tr>
<tr>
  <td>Pete</td>
  <td>Brown</td>
  <td>15</td>
</tr>
<tr>
  <td>Ann</td>
  <td>Lee</td>
  <td>5</td>
</tr>
<tr>
  <td>...</td>
  <td>...</td>
  <td>...</td>
</tr>
=======
<thead>
  <tr>
    <th>Name</th><th>Surname</th><th>Age</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>John</td><td>Smith</td><td>10</td>
  </tr>
  <tr>
    <td>Pete</td><td>Brown</td><td>15</td>
  </tr>
  <tr>
    <td>Ann</td><td>Lee</td><td>5</td>
  </tr>
  <tr>
    <td>...</td><td>...</td><td>...</td>
  </tr>
</tbody>
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5
</table>
```

Может быть больше строк.

Напишите код для сортировки по столбцу `"name"`.
