# Загрузка ресурсов: onload и onerror

<<<<<<< HEAD
Браузер позволяет отслеживать загрузку сторонних ресурсов: скриптов, ифреймов, изображений и др.
=======
The browser allows us to track the loading of external resources -- scripts, iframes, pictures and so on.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Для этого существуют два события:

- `load` -- успешная загрузка,
- `error` -- во время загрузки произошла ошибка.

## Загрузка скриптов

Допустим, нам нужно загрузить сторонний скрипт и вызвать функцию, которая объявлена в этом скрипте.

Мы можем загрузить этот скрипт динамически:

```js
let script = document.createElement('script');
script.src = "my.js";

document.head.append(script);
```

...Но как нам вызвать функцию, которая объявлена внутри того скрипта? Нам нужно подождать, пока скрипт загрузится, и только потом мы можем её вызвать.

```smart
Для наших собственных скриптов мы можем использовать [JavaScript-модули](info:modules), но они не слишком широко распространены в сторонних библиотеках.
```

### script.onload

Главный помощник - это событие `load`. Оно срабатывает после того, как скрипт был загружен и выполнен.

Например:

```js run
let script = document.createElement('script');

// мы можем загрузить любой скрипт с любого домена
script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
document.head.append(script);

*!*
script.onload = function() {
<<<<<<< HEAD
  // в скрипте создаётся вспомогательная переменная с именем "_"
  alert(_.VERSION); // отображает версию библиотеки
=======
  // the script creates a variable "_"
  alert( _.VERSION ); // shows library version
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
};
*/!*
```

Таким образом, в обработчике `onload` мы можем использовать переменные, вызывать функции и т.д., которые предоставляет нам сторонний скрипт.

<<<<<<< HEAD
...А что если во время загрузки произошла ошибка? Например, такого скрипта нет (ошибка 404), или сервер был недоступен.

### script.onerror

Ошибки, которые возникают во время загрузки скрипта, могут быть отслежены с помощью события `error`.
=======
...And what if the loading failed? For instance, there's no such script (error 404) or the server is down (unavailable).

### script.onerror

Errors that occur during the loading of the script can be tracked in an `error` event.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Например, давайте запросим скрипт, которого не существует:

```js run
let script = document.createElement('script');
script.src = "https://example.com/404.js"; // такого файла не существует
document.head.append(script);

*!*
script.onerror = function() {
  alert("Ошибка загрузки " + this.src); // Ошибка загрузки https://example.com/404.js
};
*/!*
```

<<<<<<< HEAD
Обратите внимание, что мы не можем получить описание HTTP-ошибки. Мы не знаем, была ли это ошибка 404 или 500, или какая-то другая. Знаем только, что во время загрузки произошла ошибка.
=======
Please note that we can't get HTTP error details here. We don't know if it was an error 404 or 500 or something else. Just that the loading failed.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```warn
Обработчики `onload`/`onerror` отслеживают только сам процесс загрузки.

<<<<<<< HEAD
Ошибки обработки и выполнения загруженного скрипта ими не отслеживаются. Чтобы "поймать" ошибки в скрипте, нужно воспользоваться глобальным обработчиком `window.onerror`.
=======
Errors that may occur during script processing and execution are out of scope for these events. That is: if a script loaded successfully, then `onload` triggers, even if it has programming errors in it. To track script errors, one can use `window.onerror` global handler.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```

## Другие ресурсы

События `load` и `error` также срабатывают и для других ресурсов, а вообще, для любых ресурсов, у которых есть внешний `src`.

Например:

```js run
let img = document.createElement('img');
img.src = "https://js.cx/clipart/train.gif"; // (*)

img.onload = function() {
  alert(`Изображение загружено, размеры ${img.width}x${img.height}`);
};

img.onerror = function() {
  alert("Ошибка во время загрузки изображения");
};
```

Однако есть некоторые особенности:

<<<<<<< HEAD
- Большинство ресурсов начинают загружаться после их добавления в документ. За исключением тега `<img>`. Изображения начинают загружаться, когда получают `src (*)`.
- Для `<iframe>` событие `load` срабатывает по окончании загрузки как в случае успеха, так и в случае ошибки.
=======
- Most resources start loading when they are added to the document. But `<img>` is an exception. It starts loading when it gets a src `(*)`.
- For `<iframe>`, the `iframe.onload` event triggers when the iframe loading finished, both for successful load and in case of an error.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Такое поведение сложилось по историческим причинам.

## Ошибка в скрипте с другого источника

Есть правило: скрипты с одного сайта не могут получить доступ к содержимому другого сайта. Например, скрипт с `https://facebook.com` не может прочитать почту пользователя на `https://gmail.com`.

<<<<<<< HEAD
Или, если быть более точным, один источник (домен/порт/протокол) не может получить доступ к содержимому с другого источника. Даже поддомен или просто другой порт будут считаться разными источниками, не имеющими доступа друг к другу.
=======
Or, to be more precise, one origin (domain/port/protocol triplet) can't access the content from another one. So even if we have a subdomain, or just another port, these are different origins with no access to each other.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Это правило также касается ресурсов с других доменов.

Если мы используем скрипт с другого домена, и в нем имеется ошибка, мы не сможем узнать детали этой ошибки.

Для примера давайте возьмём мини-скрипт `error.js`, который состоит из одного-единственного вызова функции, которой не существует:

```js
// 📁 error.js
noSuchFunction();
```

Теперь загрузим этот скрипт с того же сайта, на котором он лежит:

```html run height=0
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script src="/article/onload-onerror/crossorigin/error.js"></script>
```

Мы видим нормальный отчёт об ошибке:

```
Uncaught ReferenceError: noSuchFunction is not defined
https://javascript.info/article/onload-onerror/crossorigin/error.js, 1:1
```

А теперь загрузим этот же скрипт с другого домена:

```html run height=0
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
```

Отчёт отличается:

```
Script error.
, 0:0
```

<<<<<<< HEAD
Детали отчёта могут варьироваться в зависимости от браузера, но основная идея остаётся неизменной: любая информация о внутреннем устройстве скрипта, включая стек ошибки, спрятана. Именно потому, что скрипт загружен с другого домена.
=======
Details may vary depending on the browser, but the idea is the same: any information about the internals of a script, including error stack traces, is hidden. Exactly because it's from another domain.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Зачем нам могут быть нужны детали ошибки?

<<<<<<< HEAD
Существует много сервисов (и мы можем сделать наш собственный), которые обрабатывают глобальные ошибки при помощи `window.onerror`, сохраняют отчёт о них и предоставляют доступ к этому отчёту для анализа. Это здорово, потому что мы можем увидеть реальные ошибки, которые случились у наших пользователей. Но если скрипт - с другого домена, то информации об ошибках в нём почти нет, как мы только что видели.
=======
There are many services (and we can build our own) that listen for global errors using `window.onerror`, save errors and provide an interface to access and analyze them. That's great, as we can see real errors, triggered by our users. But if a script comes from another origin, then there's not much information about errors in it, as we've just seen.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Похожая кросс-доменная политика (CORS) внедрена и в отношении других ресурсов.

<<<<<<< HEAD
**Чтобы разрешить кросс-доменный доступ, нам нужно поставить тегу `<script>` атрибут `crossorigin`, и, кроме того, удалённый сервер должен поставить специальные заголовки.**
=======
**To allow cross-origin access, the `<script>` tag needs to have the `crossorigin` attribute, plus the remote server must provide special headers.**
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Существует три уровня кросс-доменного доступа:

<<<<<<< HEAD
1. **Атрибут `crossorigin` отсутствует** -- доступ запрещён.
2. **`crossorigin="anonymous"`** -- доступ разрешён, если сервер отвечает с заголовком `Access-Control-Allow-Origin` со значениями `*` или наш домен. Браузер не отправляет авторизационную информацию и куки на удалённый сервер.
3. **`crossorigin="use-credentials"`** -- доступ разрешён, если сервер отвечает с заголовками `Access-Control-Allow-Origin` со значением наш домен и `Access-Control-Allow-Credentials: true`. Браузер отправляет авторизационную информацию и куки на удалённый сервер.

```smart
Почитать больше о кросс-доменных доступах вы можете в главе <info:fetch-crossorigin>. Там описан метод `fetch` для сетевых запросов, но политика там точно такая же.
=======
1. **No `crossorigin` attribute** -- access prohibited.
2. **`crossorigin="anonymous"`** -- access allowed if the server responds with the header `Access-Control-Allow-Origin` with `*` or our origin. Browser does not send authorization information and cookies to remote server.
3. **`crossorigin="use-credentials"`** -- access allowed if the server sends back the header `Access-Control-Allow-Origin` with our origin and `Access-Control-Allow-Credentials: true`. Browser sends authorization information and cookies to remote server.

```smart
You can read more about cross-origin access in the chapter <info:fetch-crossorigin>. It describes the `fetch` method for network requests, but the policy is exactly the same.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

Такое понятие как "куки" (cookies) не рассматривается в текущей главе, но вы можете почитать о них в главе <info:cookie>.
```

В нашем случае атрибут `crossorigin` отсутствовал. Поэтому кросс-доменный доступ был запрещён. Давайте добавим его.

Мы можем выбрать `"anonymous"` (куки не отправляются, требуется один серверный заголовок) или `"use-credentials"` (куки отправляются, требуются два серверных заголовка) в качестве значения атрибута.

<<<<<<< HEAD
Если куки нас не волнуют, тогда смело выбираем `"anonymous"`:
=======
If we don't care about cookies, then `"anonymous"` is the way to go:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```html run height=0
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script *!*crossorigin="anonymous"*/!* src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
```

<<<<<<< HEAD
Теперь при условии, что сервер предоставил заголовок `Access-Control-Allow-Origin`, всё хорошо. У нас есть полный отчёт по ошибкам.
=======
Now, assuming that the server provides an `Access-Control-Allow-Origin` header, everything's fine. We have the full error report.
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

## Итого

Изображения `<img>`, внешние стили, скрипты и другие ресурсы предоставляют события `load` и `error` для отслеживания загрузки:

- `load` срабатывает при успешной загрузке,
- `error` срабатывает при ошибке загрузки.

Единственное исключение - это `<iframe>`: по историческим причинам срабатывает всегда `load` вне зависимости от того, как завершилась загрузка, даже если страница не была найдена.

Событие `readystatechange` также работает для ресурсов, но используется редко, потому что события `load/error` проще в использовании.
