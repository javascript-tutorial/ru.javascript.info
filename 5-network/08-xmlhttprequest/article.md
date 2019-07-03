# XMLHttpRequest

`XMLHttpRequest` -- это встроенный в браузер объект, который даёт возможность делать HTTP-запросы к серверу без перезагрузки страницы.

Несмотря на наличие слова "XML" в названии, XMLHttpRequest может работать с любыми данными, а не только с XML. Мы можем загружать/скачивать файлы, отслеживать прогресс и многое другое.

На сегодняшний день не обязательно использовать `XMLHttpRequest`, так как существует другой, более современный метод `fetch`.

В современной веб-разработке `XMLHttpRequest` может использоваться по трём причинам:

1. По историческим причинам: существует много кода, использующего `XMLHttpRequest`, который нужно поддерживать.
2. Необходимость поддерживать старые браузеры и нежелание использовать полифилы (например, чтобы уменьшить количество кода).
3. Потребность в функционале, который `fetch` пока что не может предоставить, к примеру, отслеживание прогресса закачки на сервер.

<<<<<<< HEAD:5-network/07-xmlhttprequest/article.md
Что-то из этого списка звучит знакомо? Если да, тогда вперёд, приятного знакомства с `XMLHttpRequest`. Если же нет, возможно, имеет смысл изучать сразу <info:fetch-basics>.

## Основы
=======
Does that sound familiar? If yes, then all right, go on with `XMLHttpRequest`. Otherwise, please head on to <info:fetch>.

## The basics
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/08-xmlhttprequest/article.md

XMLHttpRequest имеет два режима работы: синхронный и асинхронный.

Сначала рассмотрим асинхронный, так как в большинстве случаев используется именно он.

Чтобы сделать запрос, нам нужно выполнить три шага:

<<<<<<< HEAD:5-network/07-xmlhttprequest/article.md
1. Создать `XMLHttpRequest`.
    ```js
    let xhr = new XMLHttpRequest(); // у конструктора нет аргументов 
    ```

2. Инициализировать его.
=======
1. Create `XMLHttpRequest`:
    ```js
    let xhr = new XMLHttpRequest(); // the constructor has no arguments
    ```

2. Initialize it:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/08-xmlhttprequest/article.md
    ```js
    xhr.open(method, URL, [async, user, password])
    ```

<<<<<<< HEAD:5-network/07-xmlhttprequest/article.md
    Этот метод обычно вызывается сразу после `new XMLHttpRequest`. В него передаются основные параметры запроса:

    - `method` -- HTTP-метод. Обычно это `"GET"` или `"POST"`.
    - `URL` -- URL, куда отправляется запрос.
    - `async` -- если указать `false`, тогда запрос будет выполнен синхронно, это мы рассмотрим чуть позже.
    - `user`, `password` -- логин и пароль для базовой HTTP-авторизации (если требуется).
=======
    This method is usually called right after `new XMLHttpRequest`. It specifies the main parameters of the request:

    - `method` -- HTTP-method. Usually `"GET"` or `"POST"`.
    - `URL` -- the URL to request, a string, can be [URL](info:url) object.
    - `async` -- if explicitly set to `false`, then the request is synchronous, we'll cover that a bit later.
    - `user`, `password` -- login and password for basic HTTP auth (if required).
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/08-xmlhttprequest/article.md

    Заметим, что вызов `open`, вопреки своему названию, не открывает соединение. Он лишь конфигурирует запрос, но непосредственно отсылается запрос только лишь после вызова `send`.

3. Послать запрос.

    ```js
    xhr.send([body])
    ```

    Этот метод устанавливает соединение и отсылает запрос к серверу. Необязательный параметр `body` содержит тело запроса.

    Некоторые типы запросов, такие как `GET`, не имеют тела. А некоторые, как, например, `POST`, используют `body`, чтобы отправлять данные на сервер. Мы позже увидим примеры.

4. Слушать события, чтобы получить ответ.

    Три наиболее используемых события:
    - `load` -- происходит, когда получен какой-либо ответ, включая ответы с HTTP-ошибкой, например 404.
    - `error` -- когда запрос не может быть выполнен, например, нет соединения или невалидный URL.
    - `progress` -- происходит периодически во время загрузки ответа, сообщает о прогрессе.

    ```js
    xhr.onload = function() {
      alert(`Загружено: ${xhr.status} ${xhr.response}`);
    };

    xhr.onerror = function() { // происходит, только когда запрос совсем не получилось выполнить
      alert(`Ошибка соединения`);
    };

    xhr.onprogress = function(event) { // запускается периодически
      // event.loaded - количество загруженных байт
      // event.lengthComputable = равно true, если сервер присылает заголовок Content-Length
      // event.total - количество байт всего (только если lengthComputable равно true)
      alert(`Загружено ${event.loaded} из ${event.total}`);
    };
    ```

Вот полный пример. Код ниже загружает `/article/xmlhttprequest/example/load` с сервера и сообщает о прогрессе:

```js run
// 1. Создаём новый XMLHttpRequest-объект
let xhr = new XMLHttpRequest();

// 2. Настраиваем его: GET-запрос по URL /article/.../load
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. Отсылаем запрос
xhr.send();

// 4. Этот код сработает после того, как мы получим ответ сервера
xhr.onload = function() {
  if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
  } else { // если всё прошло гладко, выводим результат
    alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
  }
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`Получено ${event.loaded} из ${event.total} байт`);
  } else {
    alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
  }

};

xhr.onerror = function() {
  alert("Запрос не удался");
};
```

После ответа сервера мы можем получить результат запроса в следующих свойствах его объекта:

`status`
: код состояния HTTP (число): `200`, `404`, `403` и так далее, может быть `0` в случае, если ошибка не связана с HTTP.

`statusText`
: сообщение о состоянии ответа HTTP (строка): обычно `OK` для `200`, `Not Found` для `404`, `Forbidden` для `403` и так далее.

`response` (в старом коде может встречаться как `responseText`)
: собственно ответ сервера.

<<<<<<< HEAD:5-network/07-xmlhttprequest/article.md
Если, выполняя запрос, мы вдруг передумали, мы можем его отменить в любое время -- вызов `xhr.abort()` делает именно это:

```js
xhr.abort(); // отменяем запрос
```

Выполнение генерирует событие `abort`.

Мы можем также указать промежуток времени, который мы готовы ждать ответ:

```js
xhr.timeout = 10000; // таймаут указывается в миллисекундах, т.е. 10 секунд
```

Если запрос не успевает выполниться в установленное время, то он прерывается, и происходит событие `timeout`.
=======
We can also specify a timeout using the corresponding property:

```js
xhr.timeout = 10000; // timeout in ms, 10 seconds
```

If the request does not succeed within the given time, it gets canceled and `timeout` event triggers.

````smart header="URL search parameters"
To pass URL parameters, like `?name=value`, and ensure the proper encoding, we can use [URL](info:url) object:

```js
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!');

// the parameter 'q' is encoded
xhr.open('GET', url); // https://google.com/search?q=test+me%21
```

````
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/08-xmlhttprequest/article.md

## Тип ответа

Мы можем использовать свойство `xhr.responseType`, чтобы указать ожидаемый тип ответа:

- `""` (по умолчанию) -- строка,
- `"text"` -- строка,
- `"arraybuffer"` -- `ArrayBuffer` (для бинарных данных, подробности в <info:arraybuffer-binary-arrays>),
- `"blob"` -- `Blob` (для бинарных данных, смотрите в <info:blob>),
- `"document"` -- документ XML (может использовать XPath и другие XML-методы),
- `"json"` -- JSON (парсится автоматически).

К примеру, давайте получим ответ в формате JSON:

```js run
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/example/json');

*!*
xhr.responseType = 'json';
*/!*

xhr.send();

// тело ответа {"сообщение": "Привет, мир!"}
xhr.onload = function() {
  let responseObj = xhr.response;
  alert(responseObj.message); // Привет, мир!
};
```

```smart
В старом коде вы можете встретить свойства `xhr.responseText` и даже `xhr.responseXML`.

Они существуют по историческим причинам, раньше с их помощью получали строки или XML-документы. Сегодня следует устанавливать желаемый тип объекта в `xhr.responseType` и получать `xhr.response`, как показано выше.
```

## Состояния запроса

У `XMLHttpRequest` есть состояния, которые меняются по мере выполнения запроса. Текущее состояние можно посмотреть в свойстве `xhr.readyState`.

Список всех состояний, указанных в [спецификации](https://xhr.spec.whatwg.org/#states):

```js
UNSENT = 0; // исходное состояние
OPENED = 1; // вызван метод open
HEADERS_RECEIVED = 2; // получены заголовки ответа
LOADING = 3; // ответ в процессе передачи (данные частично получены)
DONE = 4; // запрос завершён
```

Состояния объекта `XMLHttpRequest` меняются в таком порядке: `0` -> `1` -> `2` -> `3` -> ... -> `3` -> `4`. Состояние `3` повторяется каждый раз, когда получена часть данных.

Изменения в состоянии объекта запроса генерируют событие `readystatechange`:

```js
xhr.onreadystatechange = function() {
  if (xhr.readyState == 3) {
    // загрузка
  }
  if (xhr.readyState == 4) {
    // запрос завершён
  }
};
```

<<<<<<< HEAD:5-network/07-xmlhttprequest/article.md
Вы можете наткнуться на обработчики события `readystatechange` в очень старом коде, так уж сложилось исторически, когда-то не было событий `load` и других.
=======
You can find `readystatechange` listeners in really old code, it's there for historical reasons, as there was a time when there were no `load` and other events.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/08-xmlhttprequest/article.md

Сегодня из-за существования событий `load/error/progress` можно сказать, что событие `readystatechange` "морально устарело".

<<<<<<< HEAD:5-network/07-xmlhttprequest/article.md
## Синхронные запросы
=======
## Aborting request

We can terminate the request at any time. The call to `xhr.abort()` does that:

```js
xhr.abort(); // terminate the request
```

That triggers `abort` event.

That
Also, `x and `xhr.status` become `0` in that case.


## Synchronous requests
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/08-xmlhttprequest/article.md

Если в методе `open` третий параметр `async` установлен на `false`, запрос выполняется синхронно.

Другими словами, выполнение JavaScript останавливается на `send()` и возобновляется после получения ответа. Так ведут себя, например, функции `alert` или `prompt`.

Вот пример, переписанный с параметром `async` равным `false`:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/hello.txt', *!*false*/!*);

try {
  xhr.send();
  if (xhr.status != 200) {
    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
  } else {
    alert(xhr.response);
  }
} catch(err) { // для отлова ошибок используем конструкцию try...catch вместо onerror
  alert("Запрос не удался");
};
```

Выглядит, может быть, и неплохо, но синхронные запросы используются редко, так как они блокируют выполнение JavaScript до тех пор, пока загрузка не завершена. В некоторых браузерах нельзя прокручивать страницу, пока идёт синхронный запрос. Ну а если же синхронный запрос по какой-то причине выполняется слишком долго, браузер предложит закрыть "зависшую" страницу.

Многие продвинутые возможности `XMLHttpRequest`, такие как выполнение запроса на другой домен или установка таймаута, недоступны для синхронных запросов. Также, как вы могли заметить, ни о какой индикации прогресса речь тут не идёт.

Из-за всего этого синхронные запросы используют очень редко. Мы более не будем рассматривать их.

## HTTP-заголовки

`XMLHttpRequest` умеет как указывать свои заголовки в запросе, так и читать присланные в ответ.

Для работы с HTTP-заголовками есть 3 метода:

`setRequestHeader(name, value)`
: Устанавливает заголовок запроса с именем `name` и значением `value`.

    Например:

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

    ```warn header="Ограничения на заголовки"
    Некоторые заголовки управляются исключительно браузером, например `Referer` или `Host`, а также ряд других.
    Полный список [тут](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method).

<<<<<<< HEAD:5-network/07-xmlhttprequest/article.md
    XMLHttpRequest не разрешено изменять их ради безопасности пользователей и для обеспечения корректности HTTP-запроса.
=======
    `XMLHttpRequest` is not allowed to change them, for the sake of user safety and correctness of the request.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/08-xmlhttprequest/article.md
    ```

    ````warn header="Поставленный заголовок нельзя снять"
    Ещё одной особенностью `XMLHttpRequest` является то, что отменить `setRequestHeader` невозможно.

    Если заголовок определён, то его нельзя снять. Повторные вызовы лишь добавляют информацию к заголовку, а не перезаписывают его.

    Например:

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

    // заголовок получится такой:
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(name)`
: Возвращает значение заголовка ответа `name` (кроме `Set-Cookie` и `Set-Cookie2`).

    Например:

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
: Возвращает все заголовки ответа, кроме `Set-Cookie` и `Set-Cookie2`.

    Заголовки возвращаются в виде единой строки, например:

    ```
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

    Между заголовками всегда стоит перевод строки в два символа `"\r\n"` (независимо от ОС), так что мы может легко разделить их в отдельные заголовки. Значение заголовка всегда отделено двоеточием с пробелом `": "`. Этот формат задан стандартом.

    Таким образом, если хочется получить объект с парами заголовок-значение, нам нужно задействовать немного JS.

    Вот так (предполагается, что если два заголовка имеют одинаковое имя, то последний перезаписывает предыдущий):

    ```js
    let headers = xhr
      .getAllResponseHeaders()
      .split('\r\n')
      .reduce((result, current) => {
        let [name, value] = current.split(': ');
        result[name] = value;
        return result;
      }, {});
    ```

## POST, FormData

Чтобы сделать POST-запрос, мы можем использовать встроенный объект [FormData](https://developer.mozilla.org/ru/docs/Web/API/FormData).

Синтаксис:

```js
let formData = new FormData([form]); // создаём объект, по желанию передаём данные из <form>
formData.append(name, value); // добавляем поле
```

<<<<<<< HEAD:5-network/07-xmlhttprequest/article.md
Мы создаём объект, по желанию указываем, из какой формы `form`, затем, если нужно, с помощью метода `append` добавляем дополнительные поля, после чего:
=======
We create it, optionally from a form, `append` more fields if needed, and then:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/08-xmlhttprequest/article.md

1. `xhr.open('POST', ...)` – создаём `POST`-запрос.
2. `xhr.send(formData)` – отсылаем форму серверу.

Например:

```html run
<form name="person">
  <input name="name" value="Петя">
  <input name="surname" value="Васечкин">
</form>

<script>
  // заполним FormData данными из формы
  let formData = new FormData(document.forms.person);

  // добавим ещё одно поле
  formData.append("middle", "Иванович");

  // отправим данные
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(formData);

</script>
```

Обычно форма отсылается в кодировке `multipart/form-data`.

Если же вам по каким-то причинам нужны данные в формате JSON, то используйте `JSON.stringify` и отправляйте данные как строку.

Только не забудьте поставить соответствующий заголовок `Content-Type: application/json`, многие серверные фреймворки автоматически декодируют JSON при его наличии:

```js
let xhr = new XMLHttpRequest();

let json = JSON.stringify({
  name: "Вася",
  surname: "Петров"
});

xhr.open("POST", '/submit')
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

xhr.send(json);
```

<<<<<<< HEAD:5-network/07-xmlhttprequest/article.md
Метод `.send(body)` весьма всеяден. Он может отправить практически что угодно, включая объекты типа Blob и BufferSource.
=======
The `.send(body)` method is pretty omnivore. It can send almost everything, including `Blob` and `BufferSource` objects.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/08-xmlhttprequest/article.md

## Прогресс закачки

Событие `progress` работает только на стадии загрузки ответа с сервера.

<<<<<<< HEAD:5-network/07-xmlhttprequest/article.md
А именно: если мы отправляем что-то через `POST`-запрос, `XMLHttpRequest` сперва закачает наши данные (тело запроса) на сервер, а потом загрузит ответ сервера. И событие `progress` будет срабатывать только во вовремя загрузки ответа.

Если мы загружаем что-то большое, то нас однозначно больше интересует прогресс загрузки данных *на* сервер. Но `xhr.onprogress` тут не поможет.
=======
That is: if we `POST` something, `XMLHttpRequest` first uploads our data (the request body), then downloads the response.

If we're uploading something big, then we're surely more interested in tracking the upload progress. But `xhr.onprogress` doesn't help here.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/08-xmlhttprequest/article.md

Существует другой объект `xhr.upload`, без методов, только для событий закачки.

<<<<<<< HEAD:5-network/07-xmlhttprequest/article.md
Список событий похож на события `xhr`, но все они относятся к процессу закачки на сервер:
=======
The event list is similar to `xhr` events, but `xhr.upload` triggers them on uploading:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/08-xmlhttprequest/article.md

- `loadstart` -- начало загрузки данных.
- `progress` -- генерируется переодически во время закачки на сервер.
- `abort` -- загрузка прервана.
- `error` -- ошибка, не связанная с HTTP.
- `load` -- загрузка успешно завершена.
- `timeout` -- вышло время, отведённое на загрузку (при установленном свойстве `timeout`).
- `loadend` -- загрузка завершена, вне зависимости от того, как -- успешно или нет.

Примеры обработчиков для этих событий:

```js
xhr.upload.onprogress = function(event) {
  alert(`Закачано ${event.loaded} из ${event.total} байт`);
};

xhr.upload.onload = function() {
  alert(`Данные успешно загружены.`);
};

xhr.upload.onerror = function() {
  alert(`Произошла ошибка во время загрузки: ${xhr.status}`);
};
```

Пример из реальной жизни: загрузка файла на сервер с индикацией прогресса:
 
```html run
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

  // отслеживаем процесс загрузки
*!*
  xhr.upload.onprogress = function(event) {
    console.log(`Загружено ${event.loaded} из ${event.total}`);
  };
*/!*

  // Ждём завершения: неважно, успешного или нет
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      console.log("Успех");
    } else {
      console.log("Ошибка " + this.status);
    }
  };

  xhr.open("POST", "/article/xmlhttprequest/post/upload");
  xhr.send(file);
}
</script>
```

## Кросс-доменные запросы

`XMLHttpRequest` может выполнять кросс-доменные запросы, используя ту же политику в отношении CORS, что и [fetch](info:fetch-crossorigin).

Точно так же, как и при работе с `fetch`, не отсылаются куки и не происходит HTTP-авторизация по умолчанию на другом домене. Чтобы это изменить, установите `true` для свойства`xhr.withCredentials`:

```js
let xhr = new XMLHttpRequest();
*!*
xhr.withCredentials = true;
*/!*

xhr.open('POST', 'http://anywhere.com/request');
...
```
Детали по заголовкам, которые при этом необходимы, смотрите в главе [fetch](info:fetch-crossorigin).

<<<<<<< HEAD:5-network/07-xmlhttprequest/article.md
## Итого
=======
See the chapter <info:fetch-crossorigin> for details about cross-origin headers.

>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/08-xmlhttprequest/article.md

Типичный код GET-запроса с использованием `XMLHttpRequest`:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

<<<<<<< HEAD:5-network/07-xmlhttprequest/article.md
xhr.send();
=======
xhr.send(); s
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/08-xmlhttprequest/article.md

xhr.onload = function() {
  if (xhr.status != 200) { // HTTP ошибка?
    // обработаем ошибку
    alert( 'Ошибка: ' + xhr.status);
    return;
  }

  // получим ответ из xhr.response
};

xhr.onprogress = function(event) {
  // выведем прогресс
  alert(`Загружено ${event.loaded} из ${event.total}`);
};

xhr.onerror = function() {
  // обработаем ошибку, не связанную с HTTP (например, нет соединения)
};
```

Событий на самом деле больше, в [современной спецификации](http://www.w3.org/TR/XMLHttpRequest/#events) они все перечислены в том порядке, в каком генерируются во время запроса:

<<<<<<< HEAD:5-network/07-xmlhttprequest/article.md
- `loadstart` -- начало запроса.
- `progress` -- прибыла часть данных ответа, тело ответа полностью на данный момент можно получить из свойства `responseText`.
- `abort` -- запрос был прерван вызовом `xhr.abort()`.
- `error` -- произошла ошибка соединения, например неправильное доменное имя. Событие не генерируется для HTTP-ошибок как, например, 404.
- `load` -- запрос успешно завершён.
- `timeout` -- запрос был отменён по причине истечения отведённого для него времени (происходит, только если был установлен таймаут).
- `loadend` -- запрос завершён (успешно или нет).

Наиболее часто используют события завершения загрузки (`load`), ошибки загрузки (`error`) и событие `progress` для отслеживания прогресса.
=======
- `loadstart` -- the request has started.
- `progress` -- a data packet of the response has arrived, the whole response body at the moment is in `responseText`.
- `abort` -- the request was canceled by the call `xhr.abort()`.
- `error` -- connection error has occurred, e.g. wrong domain name. Doesn't happen for HTTP-errors like 404.
- `load` -- the request has finished successfully.
- `timeout` -- the request was canceled due to timeout (only happens if it was set).
- `loadend` -- triggers after `load`, `error`, `timeout` or `abort`.

The `error`, `abort`, `timeout`, and `load` events are mutually exclusive.

The most used events are load completion (`load`), load failure (`error`), or we can use a single `loadend` handler and check event and response to see what happened.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af:5-network/08-xmlhttprequest/article.md

Также мы уже видели событие: `readystatechange`. Исторически оно появилось одним из первых, даже раньше, чем была составлена спецификация. Сегодня нет необходимости использовать его, так как оно может быть заменено современными событиями, но на него можно часто наткнуться в старом коде.

Если же нам нужно следить именно за процессом загрузки данных на сервер, тогда можно использовать те же события, но для объекта `xhr.upload`.
