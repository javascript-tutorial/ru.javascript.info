importance: 5

---

# createTextNode vs innerHTML vs textContent

У нас есть пустой DOM-элемент `elem` и строка `text`.

<<<<<<< HEAD
Какие из этих 3-х команд работают одинаково?
=======
Which of these 3 commands will do exactly the same?
>>>>>>> 246c600f11b4e6c52b4ae14f83e65319671f998f

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
