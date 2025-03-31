HTML в задаче некорректен. В этом всё дело.

<<<<<<< HEAD
Браузер исправил ошибку автоматически. Но внутри `<table>` не может быть текста: в соответствии со спецификацией допускаются только табличные теги. Поэтому браузер показывает `"aaa"` *до* `<table>`.
=======
The browser has to fix it automatically. But there may be no text inside the `<table>`: according to the spec only table-specific tags are allowed. So the browser shows `"aaa"` *before* the `<table>`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Теперь очевидно, что когда мы удаляем таблицу, текст остаётся.

<<<<<<< HEAD
На этот вопрос можно легко ответить, изучив DOM, используя инструменты браузера. Вы увидите `"aaa"` до элемента `<table>`.
=======
The question can be easily answered by exploring the DOM using the browser tools. You'll see `"aaa"` before the `<table>`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

Вообще, в стандарте HTML описано, как браузеру обрабатывать некорректный HTML, так что такое действие браузера является правильным.
