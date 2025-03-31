importance: 5

---

# createTextNode vs innerHTML vs textContent

У нас есть пустой DOM-элемент `elem` и строка `text`.

<<<<<<< HEAD
Какие из этих 3-х команд работают одинаково?
=======
Which of these 3 commands will do exactly the same?
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
