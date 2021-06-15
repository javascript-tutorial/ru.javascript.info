# Куки, document.cookie

<<<<<<< HEAD
Куки -- это небольшие строки данных, которые хранятся непосредственно в браузере. Они являются частью HTTP-протокола, определённого в спецификации [RFC 6265](https://tools.ietf.org/html/rfc6265).

Куки обычно устанавливаются веб-сервером при помощи заголовка `Set-Cookie`. Затем браузер будет автоматически добавлять их в (почти) каждый запрос на тот же домен при помощи заголовка `Cookie`.
=======
Cookies are small strings of data that are stored directly in the browser. They are a part of the HTTP protocol, defined by the [RFC 6265](https://tools.ietf.org/html/rfc6265) specification.

Cookies are usually set by a web-server using the response `Set-Cookie` HTTP-header. Then, the browser automatically adds them to (almost) every request to the same domain using the `Cookie` HTTP-header.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Один из наиболее частых случаев использования куки -- это аутентификация:

<<<<<<< HEAD
1. При входе на сайт сервер отсылает в ответ HTTP-заголовок `Set-Cookie` для того, чтобы установить куки со специальным уникальным идентификатором сессии ("session identifier").
2. Во время следующего запроса к этому же домену браузер посылает на сервер HTTP-заголовок `Cookie`.
3. Таким образом, сервер понимает, кто сделал запрос.
=======
1. Upon sign in, the server uses the `Set-Cookie` HTTP-header in the response to set a cookie with a unique "session identifier".
2. Next time when the request is sent to the same domain, the browser sends the cookie over the net using the `Cookie` HTTP-header.
3. So the server knows who made the request.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Мы также можем получить доступ к куки непосредственно из браузера, используя свойство `document.cookie`.

Куки имеют множество особенностей и тонкостей в использовании, и в этой главе мы подробно с ними разберёмся.

## Чтение из document.cookie

```online
Хранит ли ваш браузер какие-то куки с этого сайта? Посмотрим:
```

```offline
Если предположить, что вы зашли на сайт, то куки можно посмотреть вот так:
```

```js run
// На javascript.info мы используем сервис Google Analytics для сбора статистики,
// поэтому какие-то куки должны быть
alert( document.cookie ); // cookie1=value1; cookie2=value2;...
```


Значение `document.cookie` состоит из пар `ключ=значение`, разделённых `; `. Каждая пара представляет собой отдельное куки.

Чтобы найти определённое куки, достаточно разбить строку из `document.cookie` по `; `, и затем найти нужный ключ. Для этого мы можем использовать как регулярные выражения, так и функции для обработки массивов.

Оставим эту задачу читателю для самостоятельного выполнения. Кроме того, в конце этой главы вы найдёте полезные функции для работы с куки.

## Запись в document.cookie

Мы можем писать в `document.cookie`. Но это не просто данные, а акcессор (геттер/сеттер). Присваивание
обрабатывается особым образом.

**Запись в `document.cookie` обновит только упомянутые в ней куки, но при этом не затронет все остальные.**

Например, этот вызов установит куки с именем `user` и значением `John`:

```js run
document.cookie = "user=John"; // обновляем только куки с именем 'user'
alert(document.cookie); // показываем все куки
```

<<<<<<< HEAD
Если вы запустите этот код, то, скорее всего, увидите множество куки. Это происходит, потому что операция `document.cookie=` перезапишет не все куки, а лишь куки с вышеупомянутым именем `user`.

Технически, и имя и значение куки могут состоять из любых символов, для правильного форматирования следует использовать встроенную функцию `encodeURIComponent`:
=======
If you run it, then probably you'll see multiple cookies. That's because the `document.cookie=` operation does not overwrite all cookies. It only sets the mentioned cookie `user`.

Technically, name and value can have any characters. To keep the valid formatting, they should be escaped using a built-in `encodeURIComponent` function:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
// специальные символы (пробелы), требуется кодирование
let name = "my name";
let value = "John Smith"

// кодирует в my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith
```


<<<<<<< HEAD
```warn header="Ограничения"
Существует несколько ограничений:
- После `encodeURIComponent` пара `name=value` не должна занимать более 4Кб. Таким образом, мы не можем хранить в куки большие данные.
- Общее количество куки на один домен ограничивается примерно 20+. Точное ограничение зависит от конкретного браузера.
=======
```warn header="Limitations"
There are few limitations:
- The `name=value` pair, after `encodeURIComponent`, should not exceed 4KB. So we can't store anything huge in a cookie.
- The total number of cookies per domain is limited to around 20+, the exact limit depends on the browser.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```

У куки есть ряд настроек, многие из которых важны и должны быть установлены.

Эти настройки указываются после пары `ключ=значение` и отделены друг от друга разделителем `;`, вот так:

```js run
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

## path

- **`path=/mypath`**

<<<<<<< HEAD
URL-префикс пути, куки будут доступны для страниц под этим путём. Должен быть абсолютным. По умолчанию используется текущий путь.
=======
The url path prefix must be absolute. It makes the cookie accessible for pages under that path. By default, it's the current path.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Если куки установлено с `path=/admin`, то оно будет доступно на страницах `/admin` и `/admin/something`, но не на страницах `/home` или `/adminpage`.

Как правило, указывают в качестве пути корень `path=/`, чтобы наше куки было доступно на всех страницах сайта.

## domain

- **`domain=site.com`**

<<<<<<< HEAD
Домен, на котором доступны наши куки. На практике, однако, есть ограничения -- мы не можем указать здесь какой угодно домен.

По умолчанию куки доступно лишь тому домену, который его установил. Так что куки, которые были установлены сайтом `site.com`, не будут доступны на сайте `other.com`.
=======
A domain defines where the cookie is accessible. In practice though, there are limitations. We can't set any domain.

By default, a cookie is accessible only at the domain that set it. So, if the cookie was set by `site.com`, we won't get it at `other.com`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

...Но что более интересно, мы не сможем получить эти куки на поддомене `forum.site.com`!

```js
// на site.com
document.cookie = "user=John"

// на forum.site.com
alert(document.cookie); // нет user
```

**Нет способа сделать куки доступным на другом домене 2-го уровня, так что `other.com` никогда не получит куки, установленное сайтом `site.com`.**

Это ограничение безопасности, чтобы мы могли хранить в куки конфиденциальные данные, предназначенные только для одного сайта.

<<<<<<< HEAD
...Однако, если мы всё же хотим дать поддоменам типа `forum.site.com` доступ к куки, это можно сделать. Достаточно при установке куки на сайте `site.com` в качестве значения опции `domain` указать корневой домен: `domain=site.com`:
=======
...But if we'd like to allow subdomains like `forum.site.com` to get a cookie, that's possible. When setting a cookie at `site.com`, we should explicitly set the `domain` option to the root domain: `domain=site.com`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
// находясь на странице site.com
// сделаем куки доступным для всех поддоменов *.site.com:
document.cookie = "user=John; domain=site.com"

// позже

// на forum.site.com
alert(document.cookie); // есть куки user=John
```

<<<<<<< HEAD
По историческим причинам установка `domain=.site.com` (с точкой перед `site.com`) также работает и разрешает доступ к куки для поддоменов. Это старая запись, но можно использовать и её, если нужно, чтобы поддерживались очень старые браузеры.

Таким образом, опция `domain` позволяет нам разрешить доступ к куки для поддоменов.
=======
For historical reasons, `domain=.site.com` (a dot before `site.com`) also works the same way, allowing access to the cookie from subdomains. That's an old notation and should be used if we need to support very old browsers.

So, the `domain` option allows to make a cookie accessible at subdomains.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## expires, max-age

По умолчанию, если куки не имеют ни одного из этих параметров, то они удалятся при закрытии браузера. Такие куки называются сессионными ("session cookies").

<<<<<<< HEAD
Чтобы помочь куки "пережить" закрытие браузера, мы можем установить значение опций `expires` или `max-age`.

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

Дата истечения срока действия куки, когда браузер удалит его автоматически.

Дата должна быть точно в этом формате, во временной зоне GMT. Мы можем использовать `date.toUTCString`, чтобы получить правильную дату. Например, мы можем установить срок действия куки на 1 день.
=======
To let cookies survive a browser close, we can set either the `expires` or `max-age` option.

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

The cookie expiration date defines the time, when the browser will automatically delete it.

The date must be exactly in this format, in the GMT timezone. We can use `date.toUTCString` to get it. For instance, we can set the cookie to expire in 1 day:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
// +1 день от текущей даты
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```

Если мы установим в `expires` прошедшую дату, то куки будет удалено.

-  **`max-age=3600`**

<<<<<<< HEAD
Альтернатива `expires`, определяет срок действия куки в секундах с текущего момента.

Если задан ноль или отрицательное значение, то куки будет удалено:

```js
// куки будет удалено через 1 час
=======
Is an alternative to `expires` and specifies the cookie's expiration in seconds from the current moment.

If set to zero or a negative value, the cookie is deleted:

```js
// cookie will die in +1 hour from now
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
document.cookie = "user=John; max-age=3600";

// удалим куки (срок действия истекает прямо сейчас)
document.cookie = "user=John; max-age=0";
```

## secure

- **`secure`**

Куки следует передавать только по HTTPS-протоколу.

**По умолчанию куки, установленные сайтом `http://site.com`, также будут доступны на сайте `https://site.com` и наоборот.**

То есть, куки, по умолчанию, опираются на доменное имя, они не обращают внимания на протоколы.

<<<<<<< HEAD
С этой настройкой, если куки будет установлено на сайте `https://site.com`, то оно не будет доступно на том же сайте с протоколом HTTP, как `http://site.com`. Таким образом, если в куки хранится конфиденциальная информация, которую не следует передавать по незашифрованному протоколу HTTP, то нужно установить этот флаг.

```js
// предполагается, что сейчас мы на https://
// установим опцию secure для куки (куки доступно только через HTTPS)
=======
With this option, if a cookie is set by `https://site.com`, then it doesn't appear when the same site is accessed by HTTP, as `http://site.com`. So if a cookie has sensitive content that should never be sent over unencrypted HTTP, the `secure` flag is the right thing.

```js
// assuming we're on https:// now
// set the cookie to be secure (only accessible over HTTPS)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
document.cookie = "user=John; secure";
```  

## samesite

Это ещё одна настройка безопасности, применяется для защиты от так называемой XSRF-атаки (межсайтовая подделка запроса).

Чтобы понять, как настройка работает и где может быть полезной, посмотрим на XSRF-атаки.

### Атака XSRF

Представьте, вы авторизовались на сайте `bank.com`. То есть: у вас есть куки для аутентификации с этого сайта. Ваш браузер отправляет его на сайт `bank.com` с каждым запросом, чтобы сервер этого сайта узнавал вас и выполнял все конфиденциальные финансовые операции.

Теперь, просматривая веб-страницу в другом окне, вы случайно переходите на сайт `evil.com`, который автоматически отправляет форму `<form action="https://bank.com/pay">` на сайт `bank.com` с заполненными полями, которые инициируют транзакцию на счёт хакера.

Браузер посылает куки при каждом посещении `bank.com`, даже если форма была отправлена с `evil.com`. Таким образом, банк узнает вас и выполнит платёж.

![](cookie-xsrf.svg)

<<<<<<< HEAD
Такая атака называется межсайтовая подделка запроса (или Cross-Site Request Forgery, XSRF).

Конечно же, в реальной жизни банки защищены от такой атаки. Во всех сгенерированных сайтом `bank.com` формах есть специальное поле, так называемый "токен защиты от xsrf", который вредоносная страница не может ни сгенерировать, ни каким-либо образом извлечь из удалённой страницы (она может отправить форму туда, но не может получить данные обратно). И сайт `bank.com` при получении формы проверяет его наличие.

Но такая защита требует усилий на её реализацию: нам нужно убедиться, что в каждой форме есть поле с токеном, также мы должны проверить все запросы.
=======
That's a so-called "Cross-Site Request Forgery" (in short, XSRF) attack.

Real banks are protected from it of course. All forms generated by `bank.com` have a special field, a so-called "XSRF protection token", that an evil page can't generate or extract from a remote page. It can submit a form there, but can't get the data back. The site `bank.com` checks for such token in every form it receives.

Such a protection takes time to implement though. We need to ensure that every form has the required token field, and we must also check all requests.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

### Настройка samesite

Параметр куки `samesite` предоставляет ещё один способ защиты от таких атак, который (теоретически) не должен требовать "токенов защиты xsrf".

У него есть два возможных значения:

- **`samesite=strict` (или, что то же самое, `samesite` без значения)**

Куки с `samesite=strict` никогда не отправятся, если пользователь пришёл не с этого же сайта.

Другими словами, если пользователь переходит по ссылке из почты, отправляет форму с `evil.com` или выполняет любую другую операцию, происходящую с другого домена, то куки не отправляется.

<<<<<<< HEAD
Если куки имеют настройку `samesite`, то атака XSRF не имеет шансов на успех, потому что отправка с сайта `evil.com` происходит без куки. Таким образом, сайт `bank.com` не распознает пользователя и не произведёт платёж.
=======
If authentication cookies have the `samesite` option, then a XSRF attack has no chances to succeed, because a submission from `evil.com` comes without cookies. So `bank.com` will not recognize the user and will not proceed with the payment.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Защита довольно надёжная. Куки с настройкой `samesite` будет отправлено только в том случае, если операции происходят с сайта `bank.com`, например отправка формы сделана со страницы на `bank.com`.

Хотя есть небольшие неудобства.

Когда пользователь перейдёт по ссылке на `bank.com`, например из своих заметок, он будет удивлён, что сайт `bank.com` не узнал его. Действительно, куки с `samesite=strict` в этом случае не отправляется.

<<<<<<< HEAD
Мы могли бы обойти это ограничение, используя два куки: одно куки для "общего узнавания", только для того, чтобы поздороваться: "Привет, Джон", и другое куки для операций изменения данных с `samesite=strict`. Тогда пользователь, пришедший на сайт, увидит приветствие, но платежи нужно инициировать с сайта банка, чтобы отправилось второе куки.

- **`samesite=lax`**

Это более мягкий вариант, который также защищает от XSRF и при этом не портит впечатление от использования сайта.
=======
We could work around that by using two cookies: one for "general recognition", only for the purposes of saying: "Hello, John", and the other one for data-changing operations with `samesite=strict`. Then, a person coming from outside of the site will see a welcome, but payments must be initiated from the bank's website, for the second cookie to be sent.

- **`samesite=lax`**

A more relaxed approach that also protects from XSRF and doesn't break the user experience.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Режим Lax так же, как и `strict`, запрещает браузеру отправлять куки, когда запрос происходит не с сайта, но добавляет одно исключение.

Куки с `samesite=lax` отправляется, если два этих условия верны:
1. Используются безопасные HTTP-методы (например, GET, но не POST).

    Полный список безопасных HTTP-методов можно посмотреть в спецификации [RFC7231](https://tools.ietf.org/html/rfc7231). По сути, безопасными считаются методы, которые обычно используются для чтения, но не для записи данных. Они не должны выполнять никаких операций на изменение данных. Переход по ссылке является всегда GET-методом, то есть безопасным.

<<<<<<< HEAD
2. Операция осуществляет навигацию верхнего уровня (изменяет URL в адресной строке браузера).
=======
2. The operation performs a top-level navigation (changes URL in the browser address bar).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    Обычно это так, но если навигация выполняется в `<iframe>`, то это не верхний уровень. Кроме того, JavaScript-методы для сетевых запросов не выполняют никакой навигации, поэтому они не подходят.

<<<<<<< HEAD
Таким образом, режим `samesite=lax`, позволяет самой распространённой операции "переход по ссылке" передавать куки. Например, открытие сайта из заметок удовлетворяет этим условиям.

Но что-то более сложное, например, сетевой запрос с другого сайта или отправка формы, теряет куки.
=======
So, what `samesite=lax` does, is to basically allow the most common "go to URL" operation to have cookies. E.g. opening a website link from notes that satisfy these conditions.

But anything more complicated, like a network request from another site or a form submission, loses cookies.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Если это вам походит, то добавление `samesite=lax`, скорее всего, не испортит впечатление пользователей от работы с сайтом и добавит защиту.

<<<<<<< HEAD
В целом, `samesite` отличная настройка, но у неё есть важный недостаток:
- `samesite` игнорируется (не поддерживается) старыми браузерами, выпущенными до 2017 года и ранее.
=======
Overall, `samesite` is a great option. 

There's a drawback:

- `samesite` is ignored (not supported) by very old browsers, year 2017 or so.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

**Так что, если мы будем полагаться исключительно на `samesite`, то старые браузеры будут уязвимы.**

Но мы, безусловно, можем использовать `samesite` вместе с другими методами защиты, такими как XSRF-токены, чтобы добавить дополнительный слой защиты, а затем, в будущем, когда старые браузеры полностью исчезнут, мы, вероятно, сможем полностью удалить XSRF-токены.

## httpOnly

Эта настройка не имеет ничего общего с JavaScript, но мы должны упомянуть её для полноты изложения.

<<<<<<< HEAD
Веб-сервер использует заголовок `Set-Cookie` для установки куки. И он может установить настройку `httpOnly`.

Эта настройка запрещает любой доступ к куки из JavaScript. Мы не можем видеть такое куки или манипулировать им с помощью `document.cookie`.

Эта настройка используется в качестве меры предосторожности от определённых атак, когда хакер внедряет свой собственный JavaScript-код в страницу и ждёт, когда пользователь посетит её. Это вообще не должно быть возможным, хакер не должен быть в состоянии внедрить свой код на ваш сайт, но могут быть ошибки, которые позволят хакеру сделать это.


Обычно, если такое происходит, и пользователь заходит на страницу с JavaScript-кодом хакера, то этот код выполняется и получает доступ к `document.cookie`, и тем самым к куки пользователя, которые содержат аутентификационную информацию. Это плохо.
=======
The web-server uses the `Set-Cookie` header to set a cookie. Also, it may set the `httpOnly` option.

This option forbids any JavaScript access to the cookie. We can't see such a cookie or manipulate it using `document.cookie`.

That's used as a precaution measure, to protect from certain attacks when a hacker injects his own JavaScript code into a page and waits for a user to visit that page. That shouldn't be possible at all, hackers should not be able to inject their code into our site, but there may be bugs that let them do it.


Normally, if such a thing happens, and a user visits a web-page with hacker's JavaScript code, then that code executes and gains access to `document.cookie` with user cookies containing authentication information. That's bad.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Но если куки имеет настройку `httpOnly`, то `document.cookie` не видит его, поэтому такое куки защищено.

## Приложение: Функции для работы с куки

Вот небольшой набор функций для работы с куки, более удобных, чем ручная модификация `document.cookie`.

Для этого существует множество библиотек, так что они, скорее, в демонстрационных целях. Но при этом полностью рабочие.


### getCookie(name)

<<<<<<< HEAD
Самый короткий способ получить доступ к куки -- это использовать [регулярные выражения](info:regular-expressions).
=======
The shortest way to access a cookie is to use a [regular expression](info:regular-expressions).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Функция `getCookie(name)` возвращает куки с указанным `name`:

```js
// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
```

Здесь `new RegExp` генерируется динамически, чтобы находить `; name=<value>`.

Обратите внимание, значение куки кодируется, поэтому `getCookie` использует встроенную функцию `decodeURIComponent` для декодирования.

### setCookie(name, value, options)

<<<<<<< HEAD
Устанавливает куки с именем `name` и значением `value`, с настройкой `path=/` по умолчанию (можно изменить, чтобы добавить другие значения по умолчанию):
=======
Sets the cookie's `name` to the given `value` with `path=/` by default (can be modified to add other defaults):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// Пример использования:
setCookie('user', 'John', {secure: true, 'max-age': 3600});
```

### deleteCookie(name)

Чтобы удалить куки, мы можем установить отрицательную дату истечения срока действия:

```js
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
```

```warn header="Операции обновления или удаления куки должны использовать те же путь и домен"
Обратите внимание: когда мы обновляем или удаляем куки, нам следует использовать только такие же настройки пути и домена, как при установке куки.
```

Всё вместе: [cookie.js](cookie.js).


## Приложение: Сторонние куки

<<<<<<< HEAD
Куки называются сторонними, если они размещены с домена, отличающегося от страницы, которую посещает пользователь.

Например:
1. Страница `site.com` загружает баннер с другого сайта: `<img src="https://ads.com/banner.png">`.
2. Вместе с баннером удалённый сервер `ads.com` может установить заголовок `Set-Cookie` с куки, например, `id=1234`. Такие куки создаются с домена `ads.com` и будут видны только на сайте `ads.com`:
=======
A cookie is called "third-party" if it's placed by a domain other than the page the user is visiting.

For instance:
1. A page at `site.com` loads a banner from another site: `<img src="https://ads.com/banner.png">`.
2. Along with the banner, the remote server at `ads.com` may set the `Set-Cookie` header with a cookie like `id=1234`. Such a cookie originates from the `ads.com` domain, and will only be visible at `ads.com`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    ![](cookie-third-party.svg)

3. В следующий раз при доступе к `ads.com` удалённый сервер получит куки `id` и распознает пользователя:

    ![](cookie-third-party-2.svg)

<<<<<<< HEAD
4. Что ещё более важно, когда пользователь переходит с `site.com` на другой сайт `other.com`, на котором тоже есть баннер, то `ads.com` получит куки, так как они принадлежат `ads.com`, таким образом `ads.com` распознает пользователя и может отслеживать его перемещения между сайтами:
=======
4. What's even more important is, when the user moves from `site.com` to another site `other.com`, which also has a banner, then `ads.com` gets the cookie, as it belongs to `ads.com`, thus recognizing the visitor and tracking him as he moves between sites:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

    ![](cookie-third-party-3.svg)


Сторонние куки в силу своей специфики обычно используются для целей отслеживания посещаемых пользователем страниц и показа рекламы. Они привязаны к исходному домену, поэтому ads.com может отслеживать одного и того же пользователя на разных сайтах, если оттуда идёт обращение к нему.

Естественно, некоторым пользователям не нравится, когда их отслеживают, поэтому браузеры позволяют отключать такие куки.

Кроме того, некоторые современные браузеры используют специальные политики для таких куки:
- Safari вообще не разрешает сторонние куки.
- У Firefox есть "чёрный список" сторонних доменов, чьи сторонние куки он блокирует.


```smart
Если мы загружаем скрипт со стороннего домена, например `<script src="https://google-analytics.com/analytics.js">`, и этот скрипт использует `document.cookie`, чтобы установить куки, то такое куки не является сторонним.

Если скрипт устанавливает куки, то нет разницы откуда был загружен скрипт -- куки принадлежит домену текущей веб-страницы.
```

## Приложение: GDPR

Эта тема вообще не связана с JavaScript, но следует её иметь в виду при установке куки.

<<<<<<< HEAD
В Европе существует законодательство под названием GDPR, которое устанавливает для сайтов ряд правил, обеспечивающих конфиденциальность пользователей. И одним из таких правил является требование явного разрешения от пользователя на использование отслеживающих куки.
=======
There's a legislation in Europe called GDPR, that enforces a set of rules for websites to respect the users' privacy. One of these rules is to require an explicit permission for tracking cookies from the user.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Обратите внимание, это относится только к куки, используемым для отслеживания/идентификации/авторизации.

То есть, если мы установим куки, которые просто сохраняют некоторую информацию, но не отслеживают и не идентифицируют пользователя, то мы свободны от этого правила.

Но если мы собираемся установить куки с информацией об аутентификации или с идентификатором отслеживания, то пользователь должен явно разрешить это.

Есть два основных варианта как сайты следуют GDPR. Вы наверняка уже видели их в сети:

1. Если сайт хочет установить куки для отслеживания только для авторизованных пользователей.

    То в регистрационной форме должен быть установлен флажок "принять политику конфиденциальности" (которая определяет, как используются куки),  пользователь должен установить его, и только тогда сайт сможет использовать авторизационные куки.

2. Если сайт хочет установить куки для отслеживания всем пользователям.

<<<<<<< HEAD
    Чтобы сделать это законно, сайт показывает модально окно для пользователей, которые зашли в первый раз, и требует от них согласие на использование куки. Затем сайт может установить такие куки и показать пользователю содержимое страницы. Хотя это создаёт неудобства для новых посетителей - никому не нравится наблюдать модальные окна вместо контента. Но GDPR в данной ситуации требует явного согласия пользователя.
=======
    To do so legally, a website shows a modal "splash screen" for newcomers, and requires them to agree to the cookies. Then the website can set them and let people see the content. That can be disturbing for new visitors though. No one likes to see such "must-click" modal splash screens instead of the content. But GDPR requires an explicit agreement.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c


GDPR касается не только куки, но и других вопросов, связанных с конфиденциальностью, которые выходят за рамки материала этой главы.


## Итого

<<<<<<< HEAD
`document.cookie` предоставляет доступ к куки
- операция записи изменяет только то куки, которое было указано.
- имя и значение куки должны быть закодированы.
- одно куки вмещает до 4kb данных, разрешается более 20 куки на сайт (зависит от браузера).

Настройки куки:
- `path=/`, по умолчанию устанавливается текущий путь, делает куки видимым только по указанному пути и ниже.
- `domain=site.com`, по умолчанию куки видно только на текущем домене, если явно указан домен, то куки видно и на поддоменах.
- `expires` или `max-age` устанавливает дату истечения срока действия, без них куки умрёт при закрытии браузера.
- `secure` делает куки доступным только при использовании HTTPS.
- `samesite` запрещает браузеру отправлять куки с запросами, поступающими извне, помогает предотвратить XSRF-атаки.
=======
`document.cookie` provides access to cookies
- write operations modify only cookies mentioned in it.
- name/value must be encoded.
- one cookie must not exceed 4KB, 20+ cookies per site (depends on the browser).

Cookie options:
- `path=/`, by default current path, makes the cookie visible only under that path.
- `domain=site.com`, by default a cookie is visible on the current domain only. If the domain is set explicitly, the cookie becomes visible on subdomains.
- `expires` or `max-age` sets the cookie expiration time. Without them the cookie dies when the browser is closed.
- `secure` makes the cookie HTTPS-only.
- `samesite` forbids the browser to send the cookie with requests coming from outside the site. This helps to prevent XSRF attacks.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Дополнительно:
- Сторонние куки могут быть запрещены браузером, например Safari делает это по умолчанию.
- Установка отслеживающих куки пользователям из стран ЕС требует их явного согласия на это в соответствии с законодательством GDPR.
