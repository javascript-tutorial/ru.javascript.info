<<<<<<< HEAD
Если совсем точно следовать работе `switch`, то `if` должен выполнять строгое сравнение `'==='`.

Впрочем, для таких строк, подойдёт и обычное сравнение `'=='`.
=======
To precisely match the functionality of `switch`, the `if` must use a strict comparison `'==='`.

For given strings though, a simple `'=='` works too.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js no-beautify
if(browser == 'Edge') {
  alert("You've got the Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Okay we support these browsers too' );
} else {
  alert( 'We hope that this page looks ok!' );
}
```

<<<<<<< HEAD
Обратите внимание: конструкция `browser == 'Chrome' || browser == 'Firefox' ...` разбита на несколько строк для лучшей читаемости.

Но всё равно запись через `switch` нагляднее.
=======
Please note: the construct `browser == 'Chrome' || browser == 'Firefox' …` is split into multiple lines for better readability.

But the `switch` construct is still cleaner and more descriptive.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
