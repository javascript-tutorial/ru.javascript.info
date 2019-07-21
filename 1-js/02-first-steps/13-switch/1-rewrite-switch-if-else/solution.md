Если совсем точно следовать работе `switch`, то `if` должен выполнять строгое сравнение `'==='`.

Впрочем, для таких строк, подойдёт и обычное сравнение `'=='`.

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

Обратите внимание: конструкция `browser == 'Chrome' || browser == 'Firefox' ...` разбита на несколько строк для лучшей читаемости.

Но всё равно запись через `switch` нагляднее.
