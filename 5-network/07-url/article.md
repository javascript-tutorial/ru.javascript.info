
# Объекты URL

Встроенный класс [URL](https://url.spec.whatwg.org/#api) предоставляет удобный интерфейс для создания и разбора URL-адресов.

Нет сетевых методов, которые требуют именно объект `URL`, обычные строки вполне подходят. Так что, технически, мы не обязаны использовать `URL`. Но иногда он может быть весьма удобным.

## Создание URL

Синтаксис создания нового объекта `URL`:

```js
new URL(url, [base])
```

- **`url`** -- полный URL-адрес или только путь, если указан второй параметр,
- **`base`** -- необязательный "базовый" URL: если указан и аргумент `url` содержит только путь, то адрес будет создан относительно него (пример ниже).

Например:

```js
let url = new URL('https://javascript.info/profile/admin');
```

Эти два URL одинаковы:

```js run
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin
```

Можно легко создать новый URL по пути относительно существующего URL-адреса:

```js run
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

alert(newUrl); // https://javascript.info/profile/tester
```

Объект `URL` даёт доступ к компонентам URL, поэтому это отличный способ "разобрать" URL-адрес, например:

```js run
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

Вот шпаргалка по компонентам URL:

![](url-object.svg)

- `href` это полный URL-адрес, то же самое, что `url.toString()`
- `protocol` - протокол, заканчивается символом двоеточия `:`
- `search` строка параметров, начинается с вопросительного знака `?`
- `hash` начинается с символа `#`
- также есть свойства `user` и `password`, если используется HTTP-аутентификация: `http://login:password@site.com` (не нарисованы сверху, так как редко используются).

```smart header="Можно передавать объекты `URL` в сетевые методы (и большинство других) вместо строк"
Мы можем использовать объект `URL` в методах `fetch` или `XMLHttpRequest` и почти во всех других, где ожидается URL-строка.

Вообще, объект `URL` можно передавать почти куда угодно вместо строки, так как большинство методов сконвертируют объект в строку, при этом он станет строкой с полным URL-адресом.
```

## SearchParams "?..."

Допустим, мы хотим создать URL-адрес с заданными параметрами, например, `https://google.com/search?query=JavaScript`.

Мы можем указать их в строке:

```js
new URL('https://google.com/search?query=JavaScript')
```

...Но параметры должны быть правильно закодированы, чтобы они могли содержать не-латинские буквы, пробелы и т.п. (об этом подробнее далее).

Так что для этого есть свойство `url.searchParams` -- объект типа [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams).

Он предоставляет удобные методы для работы с параметрами:

- **`append(name, value)`** -- добавить параметр по имени,
- **`delete(name)`** -- удалить параметр по имени,
- **`get(name)`** -- получить параметр по имени,
- **`getAll(name)`** -- получить все параметры с одинаковым именем `name` (такое возможно, например: `?user=John&user=Pete`),
- **`has(name)`** -- проверить наличие параметра по имени,
- **`set(name, value)`** -- задать/заменить параметр,
- **`sort()`** -- отсортировать параметры по имени, используется редко,
- ...и является перебираемым, аналогично `Map`.

Пример добавления параметров, содержащих пробелы и знаки препинания:

```js run
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!'); // добавим параметр, содержащий пробел и !

alert(url); // https://google.com/search?q=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // параметр с двоеточием :

// параметры автоматически кодируются
alert(url); // https://google.com/search?query=test+me%21&tbs=qdr%3Ay

// перебрать параметры (в исходном виде)
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!, далее tbs=qdr:y
}
```


## Кодирование символов

Существует стандарт [RFC3986](https://tools.ietf.org/html/rfc3986), который определяет список разрешённых и запрещённых символов.

Запрещённые символы, такие как нелатинские буквы и пробелы, должны быть закодированы -- замещены соответствующими кодами UTF-8 с префиксом `%`, например: `%20` (исторически сложилось так, что пробел в URL-адресе можно также кодировать симоволом `+`).

К счастью, объекты `URL` обрабатывают всё это автоматически. Мы просто указываем параметры в обычном, незакодированном, виде, а затем конвертируем URL-адрес в строку:

```js run
// в этом примере используются кириллические символы

let url = new URL('https://ru.wikipedia.org/wiki/Тест');

url.searchParams.set('key', 'ъ');
alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
```
Как видно, слово `Тест` в пути URL-адреса и буква `ъ` в параметре закодированы.

### Кодирование символов в строках

Если вместо объектов URL используются строки, мы можем кодировать символы вручную с помощью встроенных функций:

- [encodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) - закодировать URL-адрес полностью.
- [decodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI) - раскодировать URL-адрес.
- [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) - закодировать компоненты URL-адреса, такие как параметры поиска, хеш, имя пути.
- [decodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent) - раскодировать компоненты URL-адреса.

Чем отличается `encodeURIComponent` от `encodeURI`?

Это легко понять, если мы посмотрим на URL-адрес; как показано на рисунке выше, он состоит из компонентов:

```
http://site.com:8080/path/page?p1=v1&p2=v2#hash
```

Как мы видим, в URL-адресе разрешены символы `:`, `?`, `=`, `&`, `#`. Другие же, в том числе нелатинские буквы и пробелы, должны быть закодированы.

Вот что делает функция `encodeURI`:

```js run
// в пути URL-адреса используются кириллические символы
let url = encodeURI('http://site.com/привет');

// каждый кириллический символ закодирован двумя символами %xx
// вместе они формируют код UTF-8 для символа
alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
```

...С другой стороны, если посмотреть на любой отдельный компонент URL-адреса, такой как параметр поиска, мы должны закодировать больше символов, например: для форматирования используются символы `?`, `=` и `&`.

Это то, что делает функция `encodeURIComponent`. Она кодирует те же символы, что и `encodeURI`, а также многие другие, чтобы результирующее значение можно было безопасно использовать в любом компоненте URL-адреса.

Например:

```js run
let music = encodeURIComponent('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll
```

Сравните с `encodeURI`:

```js run
let music = encodeURI('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock&Roll
```

Как мы видим, `encodeURI` не закодировала символ `&`, который является разрешённым в составе полного URL-адреса.

Но внутри параметра поиска символ `&` должен быть закодирован, в противном случае мы получим `q=Rock&Roll`, что значит `q=Rock` плюс непонятный параметр `Roll`. Не то, что предполагалось.

Чтобы правильно вставить параметр поиска в строку URL, мы должны использовать для него только `encodeURIComponent`. Наиболее безопасно кодировать и имя, и значение, за исключением случаев, когда мы абсолютно уверены в том, что они содержат только разрешённые символы.

### Использование объектов URL

Эти функции часто встречаются в старом коде. Иногда они удобны и далеко не устарели.

Однако в современном коде рекомендуется использовать классы [URL](https://url.spec.whatwg.org/#url-class) и [URLSearchParams](https://url.spec.whatwg.org/#interface-urlsearchparams).

Одна из причин в том, что они базируются на последней спецификации URI: [RFC3986](https://tools.ietf.org/html/rfc3986), в то время как функции `encode*` -- на устаревшей версии стандарта [RFC2396](https://www.ietf.org/rfc/rfc2396.txt).

Например, по-разному обрабатываются адреса IPv6:

```js run
// допустимый URL-адрес IPv6
let url = 'http://[2607:f8b0:4005:802::1007]/';

alert(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
alert(new URL(url)); // http://[2607:f8b0:4005:802::1007]/
```

Как мы видим, функция `encodeURI` заменила квадратные скобки `[...]`, что является некорректным. Причина: URL-адреса IPv6 не существовали в момент создания стандарта RFC2396 (август 1998 г.).

Такие случаи редки, по большей части функции `encode*` работают хорошо. Пример выше - лишь одна из немногих причин использовать новые API.
