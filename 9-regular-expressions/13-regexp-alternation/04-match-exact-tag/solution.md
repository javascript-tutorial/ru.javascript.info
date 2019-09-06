
Начало шаблона очевидно: `pattern:<style`.

...А вот дальше… Мы не можем написать просто `pattern:<style.*?>`, потому что `match:<styler>` удовлетворяет этому выражению.

После `match:<style` должен быть либо пробел, после которого может быть что-то ещё, либо закрытие тега `match:>`.

На языке регулярных выражений: `pattern:<style(>|\s.*?>)`.

В действии:

```js run
let regexp = /<style(>|\s.*?>)/g;

alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
```
