
Открывающий тег -- это `pattern:\[(b|url|quote)\]`.

Затем, чтобы найти всё до закрывающего тега -- используем выражение `pattern:.*?` с флагом `pattern:s`: оно найдёт любые символы, включая новую строку, и затем добавим обратную ссылку на открывающий тег.

Полное выражение: `pattern:\[(b|url|quote)\].*?\[/\1\]`.

В действии:

```js run
let regexp = /\[(b|url|quote)\].*?\[\/\1\]/gs;

let str = `
  [b]привет![/b]
  [quote]
    [url]http://ya.ru[/url]
  [/quote]
`;

alert( str.match(regexp) ); // [b]привет![/b],[quote][url]http://ya.ru[/url][/quote]
```

<<<<<<< HEAD
Обратите внимание, что кроме экранирования `pattern:[` и `pattern:]` нам необходимо экранировать слеш в закрывающем теге `pattern:[\/\1]`, потому что обычно слеш завершает паттерн.
=======
Please note that besides escaping `pattern:[` and `pattern:]`, we had to escape a slash for the closing tag `pattern:[\/\1]`, because normally the slash closes the pattern.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea
