importance: 3

---

# Перепишите код используя операторы ??, ??=

Перепишите этот код используя операторы нулевого слияния и присваивания.

```js
let num1 = 10,
    num2 = 20,
    result;

*!*
if (result === null || result === undefined) {
  if (num1 !== null && num1 !== undefined) {
    result = num1;
  } else {
    result = num2;
  }
}
*/!*
```
