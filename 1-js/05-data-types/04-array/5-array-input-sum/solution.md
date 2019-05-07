Обратите внимание на малозаметную, но важную деталь решения. Мы не преобразуем `value` в число сразу после `prompt`, потому что после `value = +value` мы не сможем отличить пустую строку (конец записи) от "0" (разрешённое число). Мы сделаем это позже. 


```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("Введите число", 0);

    // Прекращаем ввод?
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() ); 
```

