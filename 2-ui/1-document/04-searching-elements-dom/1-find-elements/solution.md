Есть много путей как это сделать.

Вот некоторые:

```js
// 1. Таблица с `id="age-table"`.
let table = document.getElementById('age-table')

// 2. Все label в этой таблице
table.getElementsByTagName('label')
// или
document.querySelectorAll('#age-table label')

<<<<<<< HEAD
// 3. Первый td в этой таблице
=======
// 3. The first td in that table (with the word "Age")
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
table.rows[0].cells[0]
// или
table.getElementsByTagName('td')[0]
// или
table.querySelector('td')

<<<<<<< HEAD
// 4. Форма с name="search"
// предполагаем, что есть только один элемент с таким name в документе
=======
// 4. The form with the name "search"
// assuming there's only one element with name="search" in the document
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
let form = document.getElementsByName('search')[0]
// или, именно форма:
document.querySelector('form[name="search"]')

// 5. Первый input в этой форме
form.getElementsByTagName('input')[0]
// или
form.querySelector('input')

<<<<<<< HEAD
// 6. Последний input в этой форме
let inputs = form.querySelectorAll('input') // найти все input
inputs[inputs.length-1] // взять последний
=======
// 6. The last input in that form
let inputs = form.querySelectorAll('input') // find all inputs
inputs[inputs.length-1] // take the last one
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
```
