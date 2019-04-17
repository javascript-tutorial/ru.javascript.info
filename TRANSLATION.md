<<<<<<< HEAD
# Перевод

Перевод не обязательно должен быть слово-в-слово.

Он должен быть без ошибок и, по сути, верным, хорошо объясняющим.

Если вы видите, что исходный текст может быть улучшен – отлично, пришлите, пожалуйста, PR.

## Текст в коде

- Комментарии в коде – переводить.
- Строки в примерах – можно переводить, но не обязательно.
- Названия переменных, классы, идентификаторы – не надо переводить.

Например:

=======
# Translation Style Guide

This document describes rules that should be applied to **all** languages.

NOTE TO MAINTAINERS: You may want to translate this guide so that it can be more accessible to your translators.

## General

The translation doesn't have to be word-by-word precise.

It should be technically correct and explain well.

If you feel the original text could be improved, please send a PR.

## Text in Code Blocks

- Translate comments in code blocks.
- Don't translate strings, variable names, ids, classes, etc.

Example:

>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

<<<<<<< HEAD
✅ ХОРОШО (переведен комментарий):

```js
// Пример
=======
✅ DO (translate comment):

```js
// Ejemplo
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
const text = 'Hello, world';
document.querySelector('.hello').innerHTML = text;
```

<<<<<<< HEAD
✅ ТОЖЕ ОК (переведен комментарий и текст):

```js
// Пример
const text = 'Привет, мир';
document.querySelector('.hello').innerHTML = text;
```


## Внешние ссылки

Если есть внешняя ссылка на MDN или Wikipedia, например https://en.wikipedia.org/wiki/JavaScript, но есть версия этой же статьи на русском, поменяйте ссылку.

Например:
=======
❌ DON'T (translate string or class):

```js
// Ejemplo
const text = 'Hola mundo';
// ".hello" is a class
// DO NOT TRANSLATE
document.querySelector('.hola').innerHTML = text;
```

## External Links

If an external link is to Wikipedia, e.g. https://en.wikipedia.org/wiki/JavaScript, and a version of that article exists in your language that is of decent quality, consider linking to that version instead.

Example:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

<<<<<<< HEAD
✅ ПОСЛЕ ЗАМЕНЫ (en -> ru):

```md
[JavaScript](https://ru.wikipedia.org/wiki/JavaScript) – это язык программирования.
```

Если статья на MDN переведена частично, это тоже подходит.

В случае, если у ссылки нет эквивалента на русском, оставьте её как есть.

## И ещё пара деталей :)

- _Вы_ и его производные пишите с маленькой буквы
- Используйте букву `ё` ([этот npm-пакет](https://github.com/hcodes/eyo) может проверить текст и вставить её, где нужно)
- Не знаете, как перевести термин? [Словарь «Веб-стандартов»](https://github.com/web-standards-ru/dictionary/blob/master/dictionary.md) поможет!
- Названия компаний (Google), библиотек (Jest) и аббревиатуры (DOM) не переводятся.


<!-- скоро

## Соглашение по переводу (глоссарий)

**Пожалуйста, поддерживайте глоссарий в алфавитном порядке.**

| Оригинальный термин | Перевод |
| ------------------ | ---------- |

-->


## Ресурсы по переводу

Чтобы улучшить ваш перевод и, вообще, письмо, полезные статьи:

* [Берегись канцелярита!](http://www.vavilon.ru/noragal/slovo2.html)
* [Словесная алгебра](http://www.vavilon.ru/noragal/slovo4.html)
=======
✅ OK (en -> es):

```md
[JavaScript](https://es.wikipedia.org/wiki/JavaScript) es un lenguaje de programación.
```

For links to MDN, that are only partially translated, also use the language-specific version.

If a linked article has no translated version, leave the link "as is".
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
