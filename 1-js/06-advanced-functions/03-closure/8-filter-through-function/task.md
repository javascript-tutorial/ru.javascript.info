importance: 5

---

<<<<<<< HEAD
# Фильтрация с помощью функции

У нас есть встроенный метод `arr.filter(f)` для массивов. Он фильтрует все элементы с помощью функции `f`. Если она возвращает `true`, то элемент добавится в возвращаемый массив.

Сделайте набор "готовых к употреблению" фильтров:

- `inBetween(a, b)` -- между `a` и `b` (включительно).
- `inArray([...])` -- находится в данном массиве.

Они должны использоваться таким образом:

- `arr.filter(inBetween(3,6))` -- выбирает только значения между 3 и 6 (включительно).
- `arr.filter(inArray([1,2,3]))` -- выбирает только элементы, совпадающие с одним из элементов массива

Например:

```js
/* .. ваш код для inBetween и inArray */
=======
# Filter through function

We have a built-in method `arr.filter(f)` for arrays. It filters all elements through the function `f`. If it returns `true`, then that element is returned in the resulting array.

Make a set of "ready to use" filters:

- `inBetween(a, b)` -- between `a` and `b` or equal to them (inclusively).
- `inArray([...])` -- in the given array.

The usage must be like this:

- `arr.filter(inBetween(3,6))` -- selects only values between 3 and 6.
- `arr.filter(inArray([1,2,3]))` -- selects only elements matching with one of the members of `[1,2,3]`.

For instance:

```js
/* .. your code for inBetween and inArray */
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```
<<<<<<< HEAD
=======

>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
