importance: 2

---

# Что выведет этот код (||=, &&=)?

Что выведет код ниже?

```js
let value = NaN;

value &&= 10;
value ||= 20;
value &&= 30;
value ||= 40;

alert(value);
```