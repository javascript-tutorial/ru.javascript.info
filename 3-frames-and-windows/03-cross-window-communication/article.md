# Общение между окнами

Политика "Одинакового источника" (Same Origin) ограничивает доступ окон и фреймов друг к другу.

Идея заключается в том, что если у пользователя открыто две страницы: `john-smith.com` и `gmail.com`, то у скрипта со страницы `john-smith.com` не будет возможности прочитать письма из `gmail.com`. Таким образом, задача политики "Одинакового источника" - защитить данные пользователя от возможной кражи. 

## Политика "Одинакового источника" [#same-origin]

Два URL имеют "одинаковый источник" в том случае, если они имеют совпадающие протокол, домен и порт.

Эти URL имеют одинаковый источник:

- `http://site.com`
- `http://site.com/`
- `http://site.com/my/page.html`

А эти - разные источники:

- <code>http://<b>www.</b>site.com</code> (другой домен: `www.` важен)
- <code>http://<b>site.org</b></code> (другой домен: `.org` важен)
- <code><b>https://</b>site.com</code> (другой протокол: `https`)
- <code>http://site.com:<b>8080</b></code> (другой порт: `8080`)

Политика "Одинакового источника" говорит, что:

- если у нас есть ссылка на другой объект `window`, например, на всплывающее окно, созданное с помощью `window.open` или на `window` из `<iframe>` и у этого окна тот же источник, то к нему будет полный доступ.
- в противном случае, если у него другой источник, мы не сможем обращаться к его переменным, объекту `document` и так далее. Единственное исключение - объект `location`: его можно изменять (таким образом перенаправляя пользователя). Но нельзя читать `location` (нельзя узнать, где находится пользователь, чтобы не было никаких утечек информации).

<<<<<<< HEAD
Посмотрим на примеры. Сначала посмотрим на страницы с одинаковым источником, при этом разрешён прямой доступ, а затем разберём способ отправки сообщений между окнами, который позволяет обойти эту политику.

````warn header="Окна на разных поддоменах одного домена"
По определению, если у двух URL разный домен, то у них не одинаковый источник.

Однако, здесь есть небольшое исключение.

Если в окнах открыты страницы с поддоменов одного домена 2-го уровня, например `john.site.com`, `peter.site.com` и `site.com` (так что их общий домен `site.com`), то можно заставить браузер игнорировать это отличие. Так что браузер сможет считать их пришедшими с одного источника.

Для этого в каждом окне нужно запустить:

```js
document.domain = 'site.com';
```

После этого они смогут взаимодействовать без ограничений. Напомним, что это доступно только для страниц с одинаковым доменом второго уровня.
````

## Доступ к содержимому ифрейма

В качестве первого примера давайте рассмотрим ифрейм. С одной стороны, `<iframe>` это обычный тег, как `<script>` или `<img>`, с другой - это окно в окне.

Находящееся в ифрейме окно имеет свои собственные объекты `document` и `window`.

Мы можем обращаться к ним, используя свойства:

- `iframe.contentWindow` ссылка на объект `window` внутри `<iframe>`.
- `iframe.contentDocument` - ссылка на объект `document` внутри `<iframe>`.

Когда мы обращаемся к встроенному окну, браузер проверяет, имеет ли ифрейм тот же источник. Если это не так, тогда доступ будет запрещён (разрешена лишь запись в `location`, это исключение).

Например, вот `<iframe>` с другим источником:
=======
### In action: iframe

An `<iframe>` tag hosts embbedded window, with its own separate `document` and `window` objects.

We can access them using properties:

- `iframe.contentWindow` to get the window inside the `<iframe>`.
- `iframe.contentDocument` to get the document inside the `<iframe>`.

When we access something inside the embedded window, the browser checks if the iframe has the same origin. If that's not so then the access is denied (writing to `location` is an exception, it's still permitted).

For instance, let's try reading and writing to `<iframe>` from another origin:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```html run
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
<<<<<<< HEAD
    // можно получить ссылку на внутренний window
    let iframeWindow = iframe.contentWindow;

    try {
      // ...но не на document внутри него
      let doc = iframe.contentDocument;
=======
    // we can get the reference to the inner window
*!*
    let iframeWindow = iframe.contentWindow; // OK
*/!*
    try {
      // ...but not to the document inside it
*!*
      let doc = iframe.contentDocument; // ERROR
*/!*
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
    } catch(e) {
      alert(e); // выведет ошибку безопасности (другой источник)
    }

<<<<<<< HEAD
    // также нельзя прочитать URL страницы внутри
=======
    // also we can't READ the URL of the page in iframe
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
    try {
      // Can't read URL from the Location object
*!*
      let href = iframe.contentWindow.location.href; // ERROR
*/!*
    } catch(e) {
      alert(e); // ошибка безопасности
    }

<<<<<<< HEAD
    // ...но его можно изменять, таким образом, загрузить что-то ещё в iframe!
    iframe.contentWindow.location = '/'; // работает

    iframe.onload = null; // уберём обработчик, чтобы этот код запустился только один раз
=======
    // ...we can WRITE into location (and thus load something else into the iframe)!
*!*
    iframe.contentWindow.location = '/'; // OK
*/!*

    iframe.onload = null; // clear the handler, not to run it after the location change
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
  };
</script>
```

Код выше выведет ошибку для любых операций, кроме:

<<<<<<< HEAD
- Получения ссылки на внутренний объект `window` из `iframe.contentWindow`
- Изменения `location`.

```smart header="`iframe.onload` vs `iframe.contentWindow.onload`"
Событие `iframe.onload` - по сути то же, что и `iframe.contentWindow.onload`. Оно сработает, когда встроенное окно полностью загрузится со всеми ресурсами.

...Но `iframe.onload` всегда доступно извне ифрейма, в то время как доступ `iframe.contentWindow.onload` разрешён только из окна с тем же источником.
```

А теперь пример, когда источник одинаковый. Мы можем делать со встроенным окном всё, что захотим:
=======
- Getting the reference to the inner window `iframe.contentWindow` - that's allowed.
- Writing to `location`.

Contrary to that, if the `<iframe>` has the same origin, we can do anything with it:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```html run
<!-- iframe from the same site -->
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // просто сделаем что-то
    iframe.contentDocument.body.prepend("Hello, world!");
  };
</script>
```

<<<<<<< HEAD
### Пожалуйста, подождите, пока загрузится iframe

Когда ифрейм создан, у него сразу есть `document`. Но этот `document` -- другой, не тот который в конечном итоге будет загружен!
=======
```smart header="`iframe.onload` vs `iframe.contentWindow.onload`"
The `iframe.onload` event (on the `<iframe>` tag) is essentially the same as `iframe.contentWindow.onload` (on the embedded window object). It triggers when the embedded window fully loads with all resources.

...But we can't access `iframe.contentWindow.onload` for an iframe from another origin, so using `iframe.onload`.
```

## Iframes on subdomains: document.domain

By definition, two URLs with different domains have different origins.

But if windows share the same second-level domain, for instance `john.site.com`, `peter.site.com` and `site.com` (so that their common second-level domain is `site.com`), we can make the browser ignore that difference, so that they can be treated as coming from the "same origin" for the purposes of cross-window communication.

To make it work, each window (including the one from `site.com`) should run the code:

```js
document.domain = 'site.com';
```

That's all. Now they can interact without limitations. Again, that's only possible for pages with the same second-level domain.

## Iframe: wrong document pitfall

When an iframe comes from the same origin, and we may access its  `document`, there's a pitfall. It's not related to cross-domain things, but important to know.

Upon its creation an iframe immediately has a document. But that document is different from the one that loads into it!

So if we do something with the document immediately, that will probably be lost.

Here, look:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Вот, взгляните:

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;
  iframe.onload = function() {
    let newDoc = iframe.contentDocument;
*!*
    // загруженный document - не тот, который был в iframe при создании изначально!
    alert(oldDoc == newDoc); // false
*/!*
  };
</script>
```

<<<<<<< HEAD
Это известный "подводный камень". Не следует начинать работать с `document` недогруженного `iframe`, потому что это неправильный `document`. Если добавить к нему обработчик событий, он будет проигнорирован.

...Мы, разумеется, получим правильный документ, если обратимся к нему после события `onload`. Но оно сработает лишь когда ифрейм загрузится полностью со всеми ресурсами. А что если мы хотим запустить код раньше, например, при событии `DOMContentLoaded` встроенного документа?

Если ифрейм - с другого источника, то мы не имеем доступа к его документу, это невозможно.

А если с того же, то можем поймать момент, когда появляется новый документ, и после этого добавить необходимые обработчики:
=======
We shouldn't work with the document of a not-yet-loaded iframe, because that's the *wrong document*. If we set any event handlers on it, they will be ignored.

...The right document is definitely there when `iframe.onload`  triggers. But it only triggers when the whole iframe with all resources is loaded.

There's also `DOMContentLoaded` event, that triggers sooner than `onload`. As we assume that the iframe comes from the same origin, we can setup the event handler. But we should set it on the right document, so we need to detect when it's there.

Here's a small recipe for this.

We can try to catch the moment when a new document appears using checks in `setInterval`, and then setup necessary handlers:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  function onDocumentLoaded() {
    iframe.contentDocument.body.prepend('Hello, world!');
  }

  let oldDoc = iframe.contentDocument;

  // каждый 100 мс проверяем, не изменился ли документ
  let timer = setInterval(() => {
    let newDoc = iframe.contentDocument;
    if (newDoc == oldDoc) return;

<<<<<<< HEAD
    // документ изменился
    if (newDoc.readyState == 'loading') {
      // пока загружается, дождемся соответствующего события
      newDoc.addEventListener('DOMContentLoaded', onDocumentLoaded);
    } else {
      // DOM готов!
=======
    // new document
    if (newDoc.readyState == 'loading') {
      // loading yet, wait for the event
      newDoc.addEventListener('DOMContentLoaded', onDocumentLoaded);
    } else {
      // DOM is ready!
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
      onDocumentLoaded();
    }

    clearInterval(timer); // отключим setInterval, потому что он нам больше не нужен
  }, 100);
</script>
```

<<<<<<< HEAD
Если вы знаете более удачное решение -- напишите об этом в комментариях.

## window.frames
=======
## Collection: window.frames
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Другой способ получить объект `window` из `<iframe>` -- забрать его из именованной коллекции `window.frames`:

- По номеру: `window.frames[0]` -- объект `window` для первого фрейма в документе. 
- По имени: `window.frames.iframeName` -- объект `window` для фрейма со свойством `name="iframeName"`.

Например:

```html run
<iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.win); // true
</script>
```

Ифрейм может иметь другие ифреймы внутри. Таким образом, объекты `window` создают иерархию.

Навигация по ним выглядит так:

- `window.frames` -- коллекция "дочерних" `window` (для вложенных фреймов).
- `window.parent` -- ссылка на "родительский" (внешний) `window`.
- `window.top` -- ссылка на самого верхнего родителя.

Например:

```js run
window.frames[0].parent === window; // true
```

Можно использовать свойство `top`, чтобы проверять, открыт ли текущий документ внутри ифрейма или нет:

```js run
if (window == top) { // текущий window == window.top?
  alert('Скрипт находится в самом верхнем объекте window, не во фрейме');
} else {
  alert('Скрипт запущен во фрейме!');
}
```

<<<<<<< HEAD
## Атрибут sandbox
=======
## The "sandbox" iframe attribute
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Атрибут `sandbox` позволяет наложить ограничения на действия внутри `<iframe>`, чтобы предотвратить выполнение ненадежного кода. Атрибут помещает ифрейм в "песочницу", отмечая его как имеющий другой источник и/или накладывая на него дополнительные ограничения.

<<<<<<< HEAD
Существует список ограничений, которые накладываются на `<iframe sandbox src="...">`. Их можно уменьшить, если указать в атрибуте список исключений (специальными ключевыми словами), которые не нужно применять, например: `<iframe sandbox="allow-forms allow-popups">`.
=======
There's a "default set" of restrictions applied for `<iframe sandbox src="...">`. But it can be relaxed if we provide a space-separated list of keywords for restrictions that should not be applied as a value of the attribute, like this: `<iframe sandbox="allow-forms allow-popups">`.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Другими словами, если у атрибута `"sandbox"` нет значения, то браузер применяет максимум ограничений, но через пробел можно указать те из них, которые мы не хотим применять.

<<<<<<< HEAD
Вот список ограничений. По умолчанию применяются они все. Каждое можно отменить, если указать соответствующее ключевое слово в атрибуте `sandbox`:
=======
Here's a list of limitations. By default, all are applied. We can disable each by specifying the corresponding keyword in the `sandbox` attribute:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

`allow-same-origin`
: `"sandbox"` принудительно устанавливает "другой источник" для ифрейма. Другими словами, он заставляет браузер воспринимать `iframe`, как пришедший из другого источника, даже если `src` содержит тот же сайт. Со всеми возможными ограничениями для скрипта. Эта опция отключает это ограничение.

`allow-top-navigation`
: Позволяет ифрейму менять `parent.location`.

`allow-forms`
: Позволяет отправлять формы из ифрейма.

`allow-scripts`
: Позволяет запускать скрипты из ифрейма.

`allow-popups`
: Позволяет открывать всплывающие окна из ифрейма с помощью `window.open`.

Больше опций можно найти [в справочнике](mdn:/HTML/Element/iframe).

Пример ниже демонстрирует ифрейм, помещённый в песочницу со стандартным набором ограничений: `<iframe sandbox src="...">`. На странице содержится JavaScript и форма.

Обратите внимание, что ничего не работает. Таким образом, набор ограничений по умолчанию очень строгий:

[codetabs src="sandbox" height=140]


```smart
Атрибут `"sandbox"` создан только для того, чтобы добавлять ограничения. Он не может удалять их. В частности, он не может ослабить ограничения, накладываемые браузером на ифрейм, приходящий с другого источника.
```

## Обмен сообщениями между окнами

Интерфейс `postMessage` позволяет окнам общаться между собой независимо от их происхождения.

Это способ обойти политику "Одинакового источника". Он позволяет обмениваться информацией, скажем `john-smith.com` и `gmail.com`, но только в том случае, если оба сайта согласны и вызывают соответствующие JavaScript-функции. Это делает общение безопасным для пользователя.

Интерфейс имеет две части.

### postMessage

Окно, которое хочет отправить сообщение, должно вызвать метод [postMessage](mdn:api/Window.postMessage) окна получателя. Другими словами, если мы хотим отправить сообщение в окно `win`, тогда нам следует вызвать `win.postMessage(data, targetOrigin)`.

Аргументы:

`data`
: Данные для отправки. Может быть любым объектом, данные клонируются с использованием "алгоритма структурированного клонирования". IE поддерживает только строки, поэтому мы должны использовать метод `JSON.stringify` на сложных объектах, чтобы поддержать этот браузер.

`targetOrigin`
: Определяет источник для окна-получателя, только окно с данного источника имеет право получить сообщение.

<<<<<<< HEAD
Указание `targetOrigin` является мерой безопасности. Как мы помним, если окно (получатель) происходит из другого источника, мы из окна-отправителя не можем прочитать его `location`. Таким образом, мы не можем быть уверены, какой сайт открыт в заданном окне прямо сейчас: пользователь мог перейти куда-то, окно-отправитель не может это знать.

Если указать `targetOrigin`, то мы можем быть уверены, что окно получит данные только в том случае, если в нём правильный сайт. Особенно это важно, если данные конфиденциальные.
=======
The `targetOrigin` is a safety measure. Remember, if the target window comes from another origin, we can't read it's `location` in the sender window. So we can't be sure which site is open in the intended window right now: the user could navigate away, and the sender window has no idea about it.

Specifying `targetOrigin` ensures that the window only receives the data if it's still at the right site. Important when the data is sensitive.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Например, здесь `win` получит сообщения только в том случае, если в нём открыт документ из источника `http://example.com`:

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "http://example.com");
</script>
```

Если мы не хотим проверять, то в `targetOrigin` можно указать `*`.

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

*!*
  win.postMessage("message", "*");
*/!*
</script>
```


### onmessage

Чтобы получать сообщения, окно-получатель должно иметь обработчик события `message` (сообщение). Оно срабатывает, когда был вызван метод `postMessage` (и проверка `targetOrigin` пройдена успешно).

Объект события имеет специфичные свойства:

`data`
: Данные из `postMessage`.

`origin`
: Источник отправителя, например, `http://javascript.info`.

`source`
<<<<<<< HEAD
: Ссылка на окно-отправитель. Сразу можно отправить что-то в ответ, вызвав `source.postMessage`.
=======
: The reference to the sender window. We can immediately `source.postMessage(...)` back if we want.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Чтобы добавить обработчик, следует использовать метод `addEventListener`, короткий синтаксис `window.onmessage` не работает.

Вот пример:

```js
window.addEventListener("message", function(event) {
  if (event.origin != 'http://javascript.info') {
    // что-то пришло с неизвестного домена. Давайте проигнорируем это
    return;
  }

  alert( "received: " + event.data );
  
  // can message back using event.source.postMessage(...)
});
```

Полный пример:

[codetabs src="postmessage" height=120]

<<<<<<< HEAD
```smart header="Без задержек"
Между `postMessage` и событием `message` не существует задержки. Событие происходит синхронно, быстрее, чем `setTimeout(...,0)`.
=======
```smart header="There's no delay"
There's totally no delay between `postMessage` and the `message` event. The event triggers synchronously, faster than `setTimeout(...,0)`.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
```

## Итого

Чтобы вызвать метод или получить содержимое из другого окна, нам по-первых необходимо иметь ссылку на него.

<<<<<<< HEAD
Для всплывающих окон доступны ссылки в обе стороны:
- При открытии окна: `window.open` открывает новое окно и возвращает ссылку на него,
- Изнутри открытого окна: `window.opener` -- ссылка на открывающее окно.
=======
For popups we have these references:
- From the opener window: `window.open` -- opens a new window and returns a reference to it,
- From the popup: `window.opener` -- is a reference to the opener window from a popup.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Для ифреймов мы можем иметь доступ к родителям/потомкам, используя:
- `window.frames` -- коллекция объектов `window` вложенных ифреймов,
- `window.parent`, `window.top` -- это ссылки на родительское окно и окно самого верхнего уровня,
- `iframe.contentWindow` -- это объект `window` внутри тега `<iframe>`.

Если окна имеют одинаковый источник (протокол, домен, порт), то они могут делать друг с другом всё, что угодно.

<<<<<<< HEAD
В противном случае возможны только следующие действия:
- Изменение свойства location другого окна (доступ только на запись).
- Отправить туда сообщение.


Исключения:
- Окна, которые имеют общий домен второго уровня: `a.site.com` и `b.site.com`. И установленное свойство `document.domain='site.com'` в обоих окнах переведёт их в состояние "Одинакового источника".
- Если у ифрейма установлен атрибут `sandbox`, это принудительно переведёт окна в состояние "разных источников", если не установить в атрибут значение `allow-same-origin`. Это можно использовать для запуска ненадежного кода в ифрейме с того же сайта.
=======
Otherwise, only possible actions are:
- Change the `location` of another window (write-only access).
- Post a message to it.

Exceptions are:
- Windows that share the same second-level domain: `a.site.com` and `b.site.com`. Then setting `document.domain='site.com'` in both of them puts them into the "same origin" state.
- If an iframe has a `sandbox` attribute, it is forcefully put into the "different origin" state, unless the `allow-same-origin` is specified in the attribute value. That can be used to run untrusted code in iframes from the same site.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Интерфейс `postMessage` позволяет двум окнам общаться с проверками безопасности:

<<<<<<< HEAD
1. Отправитель вызывает `targetWin.postMessage(data, targetOrigin)`.
2. Если `targetOrigin` не `'*'`, тогда браузер проверяет имеет ли `targetWin` источник `targetOrigin`.
3. Если это так, тогда `targetWin` вызывает событие `message` со специальными свойствами:
    - `origin` -- источник окна отправителя (например, `http://my.site.com`)
    - `source` -- ссылка на окно отправитель.
    - `data` -- данные, может быть объектом везде, кроме IE (в IE только строки).
=======
1. The sender calls `targetWin.postMessage(data, targetOrigin)`.
2. If `targetOrigin` is not `'*'`, then the browser checks if window `targetWin` has the origin `targetOrigin`.
3. If it is so, then `targetWin` triggers the `message` event with special properties:
    - `origin` -- the origin of the sender window (like `http://my.site.com`)
    - `source` -- the reference to the sender window.
    - `data` -- the data, any object in everywhere except IE that supports only strings.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

    В окне-получателе следует добавить обработчик для этого события с помощью метода `addEventListener`.
