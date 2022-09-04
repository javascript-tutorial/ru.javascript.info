importance: 5

---

# Использование "this" в литерале объекта

Здесь функция `makeUser` возвращает объект.

Каким будет результат при обращении к свойству объекта `ref`? Почему?

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Каким будет результат?
```

