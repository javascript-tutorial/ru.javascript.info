importance: 5

---

# createTextNode vs innerHTML vs textContent

У нас есть пустой DOM-элемент `elem` и строка `text`.

<<<<<<< HEAD
Какие из этих 3-х команд работают одинаково?
=======
Which of these 3 commands will do exactly the same?
>>>>>>> bae0ef44d0208506f6e9b7f3421ee640ab41af2b

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
