# Введение: шаблоны и флаги

<<<<<<< HEAD
Регулярные выражения – мощное средство поиска и замены в строке.

В JavaScript регулярные выражения реализованы отдельным объектом [RegExp](mdn:js/RegExp) и интегрированы в методы строк.
=======
Regular expressions are patterns that provide a powerful way to search and replace in text.

In JavaScript, they are available via the [RegExp](mdn:js/RegExp) object, as well as being integrated in methods of strings.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

## Регулярные выражения

Регулярное выражение (оно же "регэксп", "регулярка" или просто "рег"), состоит из *шаблона* (также говорят "паттерн") и необязательных *флагов*.

<<<<<<< HEAD
Существует два синтаксиса для создания регулярного выражения.
=======
There are two syntaxes that can be used to create a regular expression object.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

"Длинный" синтаксис:

```js
regexp = new RegExp("шаблон", "флаги");
```

<<<<<<< HEAD
...И короткий синтаксис, использующий слеши `"/"`:
=======
And the "short" one, using slashes `"/"`:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js
regexp = /шаблон/; // без флагов
regexp = /шаблон/gmi; // с флагами gmi (будут описаны далее)
```

Слеши `pattern:/.../` говорят JavaScript о том, что это регулярное выражение. Они играют здесь ту же роль, что и кавычки для обозначения строк.

<<<<<<< HEAD
Регулярное выражение `regexp` в обоих случаях является объектом встроенного класса `RegExp`.

Основная разница между этими двумя способами создания заключается в том, что слеши `pattern:/.../` не допускают никаких вставок переменных (наподобие возможных в строках через `${...}`). Они полностью статичны.

Слеши используются, когда мы на момент написания кода точно знаем, каким будет регулярное выражение - и это большинство ситуаций. А `new RegExp` - когда мы хотим создать регулярное выражение "на лету" из динамически сгенерированной строки, например:
=======
In both cases `regexp` becomes an instance of the built-in `RegExp` class.

The main difference between these two syntaxes is that pattern using slashes `/.../` does not allow for expressions to be inserted (like string template literals with `${...}`). They are fully static.

Slashes are used when we know the regular expression at the code writing time -- and that's the most common situation. While `new RegExp`, is more often used when we need to create a regexp "on the fly" from a dynamically generated string. For instance:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js
let tag = prompt("Какой тег вы хотите найти?", "h2");

let regexp = new RegExp(`<${tag}>`); // то же, что /<h2>/  при ответе "h2" на prompt выше
```

## Флаги

Регулярные выражения могут иметь флаги, которые влияют на поиск.

В JavaScript их всего шесть:

`pattern:i`
: С этим флагом поиск не зависит от регистра: нет разницы между `A` и `a` (см. пример ниже).

`pattern:g`
<<<<<<< HEAD
: С этим флагом поиск ищет все совпадения, без него - только первое.
=======
: With this flag the search looks for all matches, without it -- only the first match is returned.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

`pattern:m`
: Многострочный режим (рассматривается в главе <info:regexp-multiline-mode>).

`pattern:s`
: Включает режим "dotall", при котором точка `pattern:.` может соответствовать символу перевода строки `\n` (рассматривается в главе <info:regexp-character-classes>).

`pattern:u`
: Включает полную поддержку юникода. Флаг разрешает корректную обработку суррогатных пар (подробнее об этом в главе <info:regexp-unicode>).

`pattern:y`
: Режим поиска на конкретной позиции в тексте (описан в главе <info:regexp-sticky>)

```smart header="Цветовые обозначения"
Здесь и далее в тексте используется следующая цветовая схема:

- регулярное выражение -- `pattern:красный`
- строка (там где происходит поиск) -- `subject:синий`
- результат -- `match:зелёный`
```

## Поиск: str.match

<<<<<<< HEAD
Как уже говорилось, использование регулярных выражений интегрировано в методы строк.
=======
As mentioned previously, regular expressions are integrated with string methods.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

Метод `str.match(regexp)` для строки `str` возвращает совпадения с регулярным выражением `regexp`.

У него есть три режима работы:

1. Если у регулярного выражения есть флаг `pattern:g`, то он возвращает массив всех совпадений:
    ```js run
    let str = "Любо, братцы, любо!";

    alert( str.match(/любо/gi) ); // Любо,любо (массив из 2х подстрок-совпадений)
    ```
    Обратите внимание: найдены и `match:Любо` и `match:любо`, благодаря флагу `pattern:i`, который делает регулярное выражение регистронезависимым.

2. Если такого флага нет, то возвращает только первое совпадение в виде массива, в котором по индексу `0` находится совпадение, и есть свойства с дополнительной информацией о нём:
    ```js run
    let str = "Любо, братцы, любо!";

    let result = str.match(/любо/i); // без флага g

    alert( result[0] );     // Любо (первое совпадение)
    alert( result.length ); // 1

    // Дополнительная информация:
    alert( result.index );  // 0 (позиция совпадения)
    alert( result.input );  // Любо, братцы, любо! (исходная строка)
    ```
    В этом массиве могут быть и другие индексы, кроме `0`, если часть регулярного выражения выделена в скобки. Мы разберём это в главе <info:regexp-groups>.

3. И, наконец, если совпадений нет, то, вне зависимости от наличия флага `pattern:g`, возвращается `null`.

<<<<<<< HEAD
    Это очень важный нюанс. При отсутствии совпадений возвращается не пустой массив, а именно `null`. Если об этом забыть, можно легко допустить ошибку, например:
=======
    This a very important nuance. If there are no matches, we don't receive an empty array, but instead receive `null`. Forgetting about that may lead to errors, e.g.:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Ошибка: у null нет свойства length
      alert("Ошибка в строке выше");
    }
    ```

<<<<<<< HEAD
    Если хочется, чтобы результатом всегда был массив, можно написать так:
=======
    If we'd like the result to always be an array, we can write it this way:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("Совпадений нет"); // теперь работает
    }
    ```

## Замена: str.replace

<<<<<<< HEAD
Метод `str.replace(regexp, replacement)` заменяет совпадения с `regexp` в строке `str` на `replacement` (все, если есть флаг `pattern:g`, иначе только первое).
=======
The method `str.replace(regexp, replacement)` replaces matches found using `regexp` in string `str` with `replacement` (all matches if there's flag `pattern:g`, otherwise, only the first one).
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

Например:

```js run
// без флага g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// с флагом g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

В строке замены `replacement` мы можем использовать специальные комбинации символов для вставки фрагментов совпадения:

| Спецсимволы | Действие в строке замены |
|--------|--------|
|`$&`|вставляет всё найденное совпадение|
|<code>$&#096;</code>|вставляет часть строки до совпадения|
|`$'`|вставляет часть строки после совпадения|
|`$n`|если `n` это 1-2 значное число, вставляет содержимое n-й скобочной группы регулярного выражения, больше об этом в главе <info:regexp-groups>|
|`$<name>`|вставляет содержимое скобочной группы с именем `name`, также изучим в главе <info:regexp-groups>|
|`$$`|вставляет символ `"$"` |

Пример с `pattern:$&`:

```js run
alert( "Люблю HTML".replace(/HTML/, "$& и JavaScript") ); // Люблю HTML и JavaScript
```

## Проверка: regexp.test

Метод `regexp.test(str)` проверяет, есть ли хоть одно совпадение, если да, то возвращает `true`, иначе `false`.

```js run
let str = "Я ЛюБлЮ JavaScript";
let regexp = /люблю/i;

alert( regexp.test(str) ); // true
```

<<<<<<< HEAD
Далее в этом разделе мы будем изучать регулярные выражения, увидим ещё много примеров их использования, а также познакомимся с другими методами.
=======
Later in this chapter we'll study more regular expressions, walk through more examples, and also meet other methods.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

Полная информация о различных методах дана в главе <info:regexp-methods>.

## Итого

<<<<<<< HEAD
- Регулярное выражение состоит из шаблона и необязательных флагов: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Без флагов и специальных символов, которые мы изучим позже, поиск по регулярному выражению аналогичен поиску подстроки.
- Метод `str.match(regexp)` ищет совпадения: все, если есть флаг `pattern:g`, иначе только первое.
- Метод `str.replace(regexp, replacement)` заменяет совпадения с `regexp` на `replacement`: все, если у регулярного выражения есть флаг `pattern:g`, иначе только первое.
- Метод `regexp.test(str)` возвращает `true`, если есть хоть одно совпадение, иначе `false`.
=======
- A regular expression consists of a pattern and optional flags: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Without flags and special symbols  (that we'll study later), the search by a regexp is the same as a substring search.
- The method `str.match(regexp)` looks for matches: all of them if there's `pattern:g` flag, otherwise, only the first one.
- The method `str.replace(regexp, replacement)` replaces matches found using `regexp` with `replacement`: all of them if there's `pattern:g` flag, otherwise only the first one.
- The method `regexp.test(str)` returns `true` if there's at least one match, otherwise, it returns `false`.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
