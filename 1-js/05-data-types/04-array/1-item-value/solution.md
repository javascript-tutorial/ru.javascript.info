Выведется `4`:


```js run
let fruits = ["Яблоки", "Груша", "Апельсин"];

let shoppingCart = fruits;

shoppingCart.push("Банан");

*!*
alert( fruits.length ); // 4
*/!*
```

Потому, что массивы - это объекты. Обе переменные `shoppingCart` и `fruits` являются ссылками на один и тот же массив.

