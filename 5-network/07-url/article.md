
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


## Encoding

There's a standard [RFC3986](https://tools.ietf.org/html/rfc3986) that defines which characters are allowed and which are not.

Those that are not allowed, must be encoded, for instance non-latin letters and spaces - replaced with their UTF-8 codes, prefixed by `%`, such as `%20` (a space can be encoded by `+`, for historical reasons that's allowed in URL too).

The good news is that `URL` objects handle all that automatically. We just supply all parameters unencoded, and then convert the URL to the string:

```js run
// using some cyrillic characters for this example

let url = new URL('https://ru.wikipedia.org/wiki/Тест');

url.searchParams.set('key', 'ъ');
alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
```
As you can see, both `Тест` in the url path and `ъ` in the parameter are encoded.

### Encoding strings

If we're using strings instead of URL objects, then we can encode manually using built-in functions:

- [encodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) - encode URL as a whole.
- [decodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI) - decode it back.
- [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) - encode URL components, such as search parameters, or a hash, or a pathname.
- [decodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent) - decodes it back.

What's the difference between `encodeURIComponent` and `encodeURI`?

That's easy to understand if we look at the URL, that's split into components in the picture above:

```
http://site.com:8080/path/page?p1=v1&p2=v2#hash
```

As we can see, characters such as `:`, `?`, `=`, `&`, `#` are allowed in URL. Some others, including non-latin letters and spaces, must be encoded.

That's what `encodeURI` does:

```js run
// using cyrcillic characters in url path
let url = encodeURI('http://site.com/привет');

// each cyrillic character is encoded with two %xx
// together they form UTF-8 code for the character
alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
```

...On the other hand, if we look at a single URL component, such as a search parameter, we should encode more characters, e.g. `?`, `=` and `&` are used for formatting.

That's what `encodeURIComponent` does. It encodes same characters as `encodeURI`, plus a lot of others, to make the resulting value safe to use in any URL component.

For example:

```js run
let music = encodeURIComponent('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll
```

Compare with `encodeURI`:

```js run
let music = encodeURI('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock&Roll
```

As we can see, `encodeURI` does not encode `&`, as this is a legit character in URL as a whole.

But we should encode `&` inside a search parameter, otherwise, we get `q=Rock&Roll` - that is actually `q=Rock` plus some obscure parameter `Roll`. Not as intended.

So we should use only `encodeURIComponent` for each search parameter, to correctly insert it in the URL string. The safest is to encode both name and value, unless we're absolutely sure that either has only allowed characters.

### Why URL?

Lots of old code uses these functions, these are sometimes convenient, and by no means not dead.

But in modern code, it's recommended to use classes [URL](https://url.spec.whatwg.org/#url-class) and [URLSearchParams](https://url.spec.whatwg.org/#interface-urlsearchparams).

One of the reason is: they are based on the recent URI spec: [RFC3986](https://tools.ietf.org/html/rfc3986), while `encode*` functions are based on the obsolete version [RFC2396](https://www.ietf.org/rfc/rfc2396.txt).

For example, IPv6 addresses are treated differently:

```js run
// valid url with IPv6 address
let url = 'http://[2607:f8b0:4005:802::1007]/';

alert(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
alert(new URL(url)); // http://[2607:f8b0:4005:802::1007]/
```

As we can see, `encodeURI` replaced square brackets `[...]`, that's not correct, the reason is: IPv6 urls did not exist at the time of RFC2396 (August 1998).

Such cases are rare, `encode*` functions work well most of the time, it's just one of the reason to prefer new APIs.
