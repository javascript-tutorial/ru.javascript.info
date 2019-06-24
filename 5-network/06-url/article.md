
# Объекты URL

Встроенный класс [URL](https://url.spec.whatwg.org/#api) предоставляет удобный интерфейс для создания и анализа URL-адресов.

Нет сетевых методов, которые требуют объект URL, обычные строки вполне подходят. Так что, технически, мы не обязаны использовать URL. Но иногда он может быть весьма удобным.

## Создание URL

Синтаксис создания нового объекта URL:

```js
new URL(url, [base])
```

- **`url`** -- URL-адрес или путь, если указан второй параметр
- **`base`** -- "базовый" URL, если указан, то адрес будет создан относительно `base` (пример ниже)

Эти два URL одинаковы:

```js run
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin
```

Переход к пути относительно текущего URL:

```js run
let url = new URL('https://javascript.info/profile/admin');
let testerUrl = new URL('tester', url);

alert(testerUrl); // https://javascript.info/profile/tester
```

Объект `URL` даёт доступ к компонентам URL, поэтому это отличный способ "распарсить" URL-адрес, например:

```js run
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

Вот шпаргалка:

![](url-object.png)

- `href` это полный URL-адрес, то же самое, что `url.toString()`
- `protocol` - протокол, заканчивается символом двоеточия `:`
- `search` строка параметров, начинается с вопросительного знака `?`
- `hash` начинается с символа `#`
- также есть свойства `user` и `password`, если используется HTTP-аутентификация.

```smart header="We can use `URL` everywhere instead of a string"
Мы можем использовать объект `URL` в методах `fetch` или `XMLHttpRequest` и почти во всех других, где ожидается URL-строка.
В подавляющем большинстве методов он автоматически конвертируется в строку.
```

## SearchParams "?..."

Допустим, мы хотим создать URL-адрес с заданными параметрами, например, `https://google.com/search?query=JavaScript`.

Параметры должны быть правильно закодированы, чтобы они могли содержать не-латинские буквы, пробелы и т.п.

Когда-то давно, до появления объекта `URL`, использовались встроенные функции `encodeURIComponent/decodeURIComponent`, у них есть ряд недостатков, которые, к счастью, уже не актуальны.

Сейчас в них нет необходимости: у `URL` есть свойство `url.searchParams` -- объект типа [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams).

Он предоставляет удобные методы для работы с параметрами:

- **`append(name, value)`** -- добавить параметр,
- **`delete(name)`** -- удалить параметр,
- **`get(name)`** -- получить параметр,
- **`getAll(name)`** -- получить все параметры с этим именем (если их много, например: `?user=John&user=Pete`),
- **`has(name)`** -- проверить наличие параметра,
- **`set(name, value)`** -- задать/заменить параметр,
- **`sort()`** -- отсортировать параметры по имени, используется редко,
- ...и является перебираемым, по аналогии с `Map`.

Таким образом, `URL` объект также дает возможность оперировать параметрами URL-адреса.

Пример:

```js run
let url = new URL('https://google.com/search');
url.searchParams.set('query', 'test me!'); // добавим параметр, содержащий пробел и !

alert(url); // https://google.com/search?query=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // добавить параметр для диапазона дат: прошлый год

alert(url); // https://google.com/search?query=test+me%21&tbs=qdr%3Ay

// перебор параметров поиска (декодированных)
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // query=test me!, далее tbs=qdr:y
}
```
