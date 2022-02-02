
Первая идея, которая может прийти в голову -- перечислить языки, разделив их `|`.

Но это не сработает, как надо:

```js run
let regexp = /Java|JavaScript|PHP|C|C\+\+/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,Java,PHP,C,C
```

Движок регулярных выражений ищет альтернации в порядке их перечисления. То есть, он сначала смотрит, есть ли  `match:Java`, а если нет -- ищет  `match:JavaScript` и так далее.

В результате `match:JavaScript` не будет найден никогда, только потому что `match:Java` проверяется первым.

То же самое -- с языками `match:C` и `match:C++`.

Есть два решения проблемы:

1. Поменять порядок, чтобы более длинное совпадение проверялось первым:  `pattern:JavaScript|Java|C\+\+|C|PHP`.
2. Соединить одинаково начинающиеся варианты: `pattern:Java(Script)?|C(\+\+)?|PHP`.

В действии:

```js run
let regexp = /Java(Script)?|C(\+\+)?|PHP/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,JavaScript,PHP,C,C++
```
