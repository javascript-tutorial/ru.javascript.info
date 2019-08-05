importance: 5

---

# Сравнение количества элементов

Для любого документа сделаем следующее:

```js
var aList1 = document.getElementsByTagName('a');
var aList2 = document.querySelectorAll('a');
```

Что произойдёт со значениями `aList1.length`, `aList2.length`, если в документе вдруг появится ещё одна ссылка `<a href="#">...</a>`?

