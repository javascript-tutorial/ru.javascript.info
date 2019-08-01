importance: 5

---

# Добавьте методы в холодильник

Добавьте в холодильник методы:

- Публичный метод `filterFood(func)`, который возвращает всю еду, для которой `func(item) == true`
- Публичный метод `removeFood(item)`, который удаляет еду `item` из холодильника.

Код для проверки:

```js
var fridge = new Fridge(500);
fridge.enable();
fridge.addFood({
  title: "котлета",
  calories: 100
});
fridge.addFood({
  title: "сок",
  calories: 30
});
fridge.addFood({
  title: "зелень",
  calories: 10
});
fridge.addFood({
  title: "варенье",
  calories: 150
});

fridge.removeFood("нет такой еды"); // без эффекта
alert( fridge.getFood().length ); // 4

var dietItems = fridge.filterFood(function(item) {
  return item.calories < 50;
});

dietItems.forEach(function(item) {
  alert( item.title ); // сок, зелень
  fridge.removeFood(item);
});

alert( fridge.getFood().length ); // 2
```

В качестве исходного кода используйте решение [предыдущей задачи](/task/inherit-fridge).
