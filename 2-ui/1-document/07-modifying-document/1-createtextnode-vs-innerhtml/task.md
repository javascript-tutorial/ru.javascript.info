importance: 5

---

# createTextNode vs innerHTML vs textContent

У нас есть пустой DOM-элемент `elem` и строка `text`.

<<<<<<< HEAD
Какие из этих 3-х команд работают одинаково?
=======
Which of these 3 commands will do exactly the same?
>>>>>>> 6989312841d843f2350803ab552d9082437be569

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
