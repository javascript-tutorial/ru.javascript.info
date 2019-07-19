importance: 4

---

# Отфильтруйте анаграммы

[Анаграммы](https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B0%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0) -- это слова, у которых те же буквы в том же количестве, но они располагаются в другом порядке.

Например:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

Напишите функцию `aclean(arr)`, которая возвращает массив слов, очищенный от анаграмм.

Например:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
```

Из каждой группы анаграмм должно остаться только одно слово, не важно какое.

