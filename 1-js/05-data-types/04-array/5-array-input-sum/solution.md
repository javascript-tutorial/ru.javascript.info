Обратите внимание на малозаметную, но важную деталь решения. Мы не преобразуем `value` в число сразу после `prompt`, потому что после `value = +value` мы не сможем отличить пустую строку (конец записи) от "0" (разрешённое число). Мы сделаем это позже. 


```js run demo
function sumInput() {
 
  let sum = 0;

  while (true) {

    let value = prompt("Введите число", 0);

    // Прекращаем ввод?
    if (value === "" || value === null || !isFinite(value)) break;

    sum += +value;
  }
  
  return sum;
}

alert( sumInput() ); 
```

