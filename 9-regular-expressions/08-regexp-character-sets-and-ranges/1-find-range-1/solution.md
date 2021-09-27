Ответы: **нет**, **да**.

- Нет, т.к. в строке `subject:Java` нет каких-либо совпадений, потому что `pattern:[^script]` означает "любой символ, кроме заданных". Таким образом, регулярное выражение ищет `"Java"`, за которым следует один такой символ, но после конца строки нет символов.

    ```js run
    alert( "Java".match(/Java[^script]/) ); // null
    ```
<<<<<<< HEAD
- Да, потому что регулярное выражение регистрозависимое - `pattern:[^script]` совпадает с символом `"S"`.
=======
- Yes, because the `pattern:[^script]` part matches the character `"S"`. It's not one of `pattern:script`. As the regexp is case-sensitive (no `pattern:i` flag), it treats `"S"` as a different character from `"s"`.
>>>>>>> b09e38c5573346c401a9f9f7410b4ff9be5f4115

    ```js run
    alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"
    ```
