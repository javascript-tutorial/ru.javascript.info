# Открытие окон и методы window

Всплывающее окно («попап» – от англ. Popup window) – один из древнейших способов показать пользователю ещё один документ.

Запустим код:
```js
window.open('https://javascript.info/')
```

<<<<<<< HEAD
... и откроется новое окно с указанным URL. Большинство современных браузеров по умолчанию будут открывать новую вкладку вместо отдельного окна.

## Блокировщик всплывающих окон

Попапы существуют с доисторических времён. Они были придуманы для отображения нового контента поверх главного окна, оставив главное окно открытым. Но с тех пор появились другие способы сделать это: JavaScript может отправлять запросы к серверу, поэтому попапы стали использоваться все реже и реже. Однако иногда они могут быть действительно удобны.
=======
...And it will open a new window with given URL. Most modern browsers are configured to open new tabs instead of separate windows.

Popups exist from really ancient times. The initial idea was to show another content without closing the main window. As of now, there are other ways to do that: we can load content dynamically with [fetch](info:fetch) and show it in a dynamically generated `<div>`. So, popups is not something we use everyday.

Also, popups are tricky on mobile devices.

Still, there are situations when a popup works good, e.g. for OAuth authorization (login with Google/Facebook/...), because:

1. A popup is a separate window with its own independent JavaScript environment. So opening a popup with a third-party non-trusted site is safe.
2. It's very easy to open a popup, little to no overhead.
3. A popup can navigate (change URL) and send messages to the opener window.

## Popup blocking
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

В прошлом злонамеренные сайты заваливали посетителей всплывающими окнами. Такие страницы могли открывать сотни попапов с рекламой. Поэтому теперь большинство браузеров пытаются заблокировать всплывающие окна, чтобы защитить пользователя.

**Всплывающее окно блокируется в том случае, если вызов window.open произошёл не в результате действия посетителя (например, события `onclick`).**

Например:
```js
// попап заблокирован
window.open('https://javascript.info');

// попап будет показан
button.onclick = () => {
  window.open('https://javascript.info');
};
```

Таким образом браузеры могут защитить пользователя от появления нежелательных попапов, при этом не отключая попапы полностью.

Что, если попап должен открываться в результате `onclick`, но не сразу, а только после выполнения `setTimeout`? Здесь все не так-то просто.

Запустим код:

```js run
// откроется через 3 секунды
setTimeout(() => window.open('http://google.com'), 3000);
```

Попап откроется в Chrome, но будет заблокирован в Firefox.

Но если мы уменьшим тайм-аут до одной секунды, то попап откроется и в Firefox:

```js run
// откроется через 1 секунду
setTimeout(() => window.open('http://google.com'), 1000);
```

Мы получили два разных результата из-за того, что Firefox "допускает" тайм-аут в 2000 мс или менее, но все, что свыше этого – не вызывает его доверия, т.к. предполагается, что в таком случае открытие окна происходит без ведома пользователя. Именно поэтому попап из первого примера будет заблокирован, а из второго – нет.

<<<<<<< HEAD
## Современное использование

Мы уже говорили о том, что в настоящее время в JavaScript есть методы, позволяющие загрузить и показать новые данные на странице. При этом есть ситуации, когда использование попапа будет наилучшим решением по ряду причин:

1. Попап – это отдельное окно с независимым JavaScript-окружением. Поэтому открытие попапа со сторонним сервисом внутри безопасно.
2. Попап очень легко прикрепить к сайту.
3. Попап может оставаться открытым, даже если пользователь покинул страницу, которая инициировала его открытие. Например, при переходе пользователя по предложенному в попапе URL, который откроется в основном окне.

## Полный синтаксис window.open
=======
## window.open
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Синтаксис открытия нового окна: `window.open(url, name, params)`:

url
: URL для загрузки в новом окне.

name
: Имя нового окна. У каждого окна есть свойство `window.name`, в котором можно задавать, какое окно использовать для попапа. Таким образом, если уже существует окно с заданным именем – указанный в параметрах URL откроется в нем, в противном случае откроется новое окно.

params
: Строка параметров для нового окна. Содержит настройки, разделённые запятыми. Важно помнить, что в данной строке не должно быть пробелов. Например `width:200,height=100`.

Параметры в строке `params`:

- Позиция окна:
  - `left/top` (числа) – координаты верхнего левого угла нового окна на экране. Существует ограничение: новое окно не может быть позиционировано вне видимой области экрана. 
  - `width/height` (числа) – ширина и высота нового окна. Существуют ограничение на минимальные высоту и ширину, которые делают невозможным создание невидимого окна. 
- Панели окна:
  - `menubar` (yes/no) – позволяет отобразить или скрыть меню браузера в новом окне.
  - `toolbar` (yes/no) – позволяет отобразить или скрыть панель навигации браузера (кнопки вперёд, назад, перезагрузки страницы) нового окна.
  - `location` (yes/no) – позволяет отобразить или скрыть адресную строку нового окна. Firefox и IE не позволяют скрывать эту панель по умолчанию.
  - `status` (yes/no) – позволяет отобразить или скрыть строку состояния. Как и с адресной строкой, большинство браузеров будут принудительно показывать её.
  - `resizable` (yes/no) – позволяет отключить возможность изменения размера нового окна. Не рекомендуется.
  - `scrollbars` (yes/no) – позволяет отключить полосы прокрутки для нового окна. Не рекомендуется.

Помимо этого существует некоторое количество не кроссбраузерных значений, которые обычно не используются. Найти примеры таких свойств можно <a href="https://developer.mozilla.org/en/DOM/window.open">по ссылке</a>.

## Пример: минималистичное окно

Давайте откроем окно с минимальным набором настроек, просто чтобы посмотреть, какие из них браузер позволит отключить:

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', params);
```

В этом примере большинство настроек заблокированы и само окно находится за пределами видимой области экрана. Посмотрим, что получится в результате. Большинство браузеров "исправит" странные значения – как, например, нулевые `width/height` и отрицательные `left/top`. Например, Chrome установит высоту и ширину такого окна равными высоте и ширине экрана, так что попап будет занимать весь экран.

Давайте исправим значения и зададим нормальные координаты (`left` и `top`) и значения размеров окна (`width` и `height`):

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

open('/', 'test', params);
```

Большинство браузеров выведет окно с заданными нами настройками.

Правила для опущенных параметров:

- Если третий аргумент при вызове `open` отсутствует или он пустой, будут использованы настройки окна по умолчанию.
- Если строка параметров передана, но некоторые параметры yes/no пропущены, то считается, что указано `no`, так что соответствующие возможности будут отключены, если на это нет ограничений со стороны браузера. Поэтому при задании параметров убедитесь, что вы явно указали все необходимые yes.  
- Если координаты `left/top` не заданы, браузер попытается открыть новое окно рядом с предыдущим открытым окном.
- Если не заданы размеры окна `width/height`, браузер откроет новое окно с теми же размерами, что и предыдущее открытое окно. 

<<<<<<< HEAD
## Доступ к новому окну
=======
## Accessing popup from window
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Вызов `open` возвращает ссылку на новое окно. Эта ссылка может быть использована для управления свойствами окна, например, изменения положения и др.

<<<<<<< HEAD
В этом примере содержимое окна модифицируется после загрузки:
=======
In this example, we generate popup content from JavaScript:

```js
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write("Hello, world!");
```

And here we modify the contents after loading:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```js run
let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.focus();

alert(newWin.location.href); // (*) about:blank, loading hasn't started yet

newWindow.onload = function() {
  let html = `<div style="font-size:30px">Welcome!</div>`;
*!*
  newWindow.document.body.insertAdjacentHTML('afterbegin', html);
*/!*
};
```

<<<<<<< HEAD
Важно помнить, что содержимое и настройки внешнего `document` доступны только для таких окон, URL которых происходит из того же источника ("Same Origin"), т.е. совпадают домен, протокол и порт (protocol://domain:port).

Иначе говоря, если новое окно содержит документ с того же сайта.

Если же открыто окно с другого сайта, мы можем сменить его URL, задав `newWindow.location=...`, но мы не сможем прочитать его свойства или получить доступ к контенту. Такие ограничения введены для безопасности пользователя, например, "нехорошая" страница не сможет открыть попап с URL `http://gmail.com` и прочитать данные почты. Больше информации об этом будет позже. 

## Доступ к открывшему окну   

Открывшееся окно получает ссылку на своего родителя через `window.opener`. Для всех других окон этот параметр имеет значение `null`.

Таким образом, связь между окнами двухсторонняя. Каждое из окон может изменять настройки другого, разумеется, только если они оба принадлежат одному сайту. Однако, даже если открывшееся и открывшее его окна принадлежат к разным сайтам, они все ещё могут взаимодействовать. Это поведение будет подробно рассмотрено в следующей главе <info:cross-window-communication>.
=======
Please note: immediately after `window.open`, the new window isn't loaded yet. That's demonstrated by `alert` in line `(*)`. So we wait for `onload` to modify it. We could also use `DOMContentLoaded` handler for `newWin.document`.

```warn header="Same origin policy"
Windows may only freely modify each other if they come from the same origin (the same protocol://domain:port).

Otherwise, e.g. if the main window is from `site.com`, and the popup from `gmail.com`, that's impossible for user safety reasons. For the details, see chapter <info:cross-window-communication>.
```

## Accessing window from popup   

A popup may access the "opener" window as well using `window.opener` reference. It is `null` for all windows except popups.

If you run the code below, it replaces the opener window content with "Test":

```js run
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write(
  "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"
);
```

So the connection between the windows is bidirectional: the main window and the popup have a reference to each other.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

## Закрытие окна

<<<<<<< HEAD
Если попап больше не нужен, можно его закрыть, вызвав `newWindow.close()`.

Технически метод `close()` доступен для любого `window`, но `window.close()` будет игнорироваться большинством браузеров, если `window` не было создано с помощью `window.open()`.

Если окно закрыто, свойство `newWindow.closed` имеет значение `true`. Таким образом можно легко проверить, закрыт ли попап (или главное окно) или все ещё открыт. Пользователь мог и закрыть его, и наш код должен иметь возможность это учесть. 
=======
- To close a window: `win.close()`.
- To check if a window is closed: `win.close` property.

Technically, the `close()` method is available for any `window`, but `window.close()` is ignored by most browsers if `window` is not created with `window.open()`. So it'll only work on a popup.

The `win.closed` property is `true` if the window is closed. That's useful to check if the popup (or the main window) is still open or not. A user can close it anytime, and our code should take that possibility into account.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Этот код откроет и затем закроет окно:

```js run
let newWindow = open('/', 'example', 'width=300,height=300');

newWindow.onload = function() {
  newWindow.close();
  alert(newWindow.closed); // true
};
```

<<<<<<< HEAD
## Установка и потеря фокуса
=======

## Scrolling and resizing

There are methods to move/resize a window:

`win.moveBy(x,y)`
: Move the window relative to current position `x` pixels to the right and `y` pixels down. Negative values are allowed (to move left/up).

`win.moveTo(x,y)`
: Move the window to coordinates `(x,y)` on the screen.

`win.resizeBy(width,height)`
: Resize the window by given `width/height` relative to the current size. Negative values are allowed.

`win.resizeTo(width,height)`
: Resize the window to the given size.

There's also `window.onresize` event.

```warn header="Only popups"
To prevent abuse, the browser usually blocks these methods. They only work reliably on popups that we opened, that have no additional tabs.
```

```warn header="No minification/maximization"
JavaScript has no way to minify or maximize a window. These OS-level functions are hidden from Frontend-developers.

Move/resize methods do not work for maximized/minimized windows.
```

## Scrolling a window

We already talked about scrolling a window in the chapter <info:size-and-scroll-window>.

`win.scrollBy(x,y)`
: Scroll the window `x` pixels right and `y` down relative the current scroll. Negative values are allowed.

`win.scrollTo(x,y)`
: Scroll the window to the given coordinates `(x,y)`.

`elem.scrollIntoView(top = true)`
: Scroll the window to make `elem` show up at the top (the default) or at the bottom for `elem.scrollIntoView(false)`.

There's also `window.onscroll` event.

## Focus/blur on a window
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Теоретически, установить попап в фокус можно с помощью метода `window.focus()`, а убрать из фокуса – с помощью `window.blur()`. Также существуют события `focus/blur`, которые позволяют отследить, когда фокус переводится на какое-то другое окно. 

Раньше на "плохих" сайтах эти методы могли становиться средством манипуляции. Например:

```js run
window.onblur = () => window.focus();
```

Когда пользователь пытается перевести фокус на другое окно, этот код возвращает фокус назад. Таким образом, фокус как бы "блокируется" в попапе, который не нужен пользователю.

Из-за этого в браузерах и появились ограничения, которые препятствуют такого рода поведению фокуса. Эти ограничения нужны для защиты пользователя от назойливой рекламы и "плохих" страниц, и их работа различается в зависимости от конкретного браузера.

Например, мобильный браузер обычно полностью игнорирует такие вызовы метода `window.focus()`. Также фокусировка не работает, когда попап открыт в отдельной вкладке (в отличие от открытия в отдельном окне).

Но все-таки иногда методы фокусировки бывают полезны. Например:

- Когда мы открываем попап, может быть хорошей идеей запустить для него `newWindow.focus()`. Для некоторых комбинаций браузера и операционной системы это устранит неоднозначность – заметит ли пользователь это новое окно.
- Если нужно отследить, когда посетитель использует веб-приложение, можно отслеживать `window.onfocus/onblur`. Это позволит ставить на паузу и продолжать выполнение анимаций и других интерактивных действий на странице. При этом важно помнить, что `blur` означает, что окно больше не в фокусе, но пользователь может по-прежнему видеть его.

## Итого   

<<<<<<< HEAD
- Новое окно можно открыть с помощью вызова `open(url, name, params)`. Этот метод возвращает ссылку на это новое окно.
- По умолчанию браузеры блокируют вызовы `open`, выполненные не в результате действий пользователя. Обычно браузеры показывают предупреждение, так что пользователь все-таки может разрешить вызов этого метода.
- У попапа есть доступ к породившему его окну через свойство `window.opener`.
- Если породившее попап окно и попап имеют один домен и протокол, то они свободно могут читать и изменять друг друга. В противном случае, они могут только изменять положение друг друга и взаимодействовать с помощью сообщений (это будет рассмотрено в следующей главе).
- Чтобы закрыть попап, используйте вызов `close()`. Также попап может закрыть и пользователь (как и любое другое окно). После закрытия окна свойство `window.closed` имеет значение `true`.  
- Методы `focus()` и `blur()` позволяют установить или убрать фокус с попапа. Иногда.
- События `focus` и `blur` позволяют отследить получение и потерю фокуса новым окном. Но пожалуйста, не забывайте, что окно может остаться видимым и после `blur`.

Также важно помнить, что если мы открываем попап, хорошей практикой будет предупредить пользователя об этом. Иконка открывающегося окошка на ссылке поможет посетителю понять, что происходит и не потерять оба окна из поля зрения. 
=======
Всплывающие окна используются нечасто. Ведь загрузить новую информацию можно динамически, с помощью технологии AJAX, а показать -- в элементе `<div>`, расположенным над страницей (`z-index`). Ещё одна альтернатива -- тег `<iframe>`.

Но в некоторых случаях всплывающие окна бывают очень даже полезны. Например, отдельное окно сервиса онлайн-консультаций. Посетитель может ходить по сайту в основном окне, а общаться в чате -- во вспомогательном.

Если вы хотите использовать всплывающее окно, предупредите посетителя об этом, так же и при использовании `target="_blank"` в ссылках или формах. Иконка открывающегося окошка на ссылке поможет посетителю понять, что происходит и не потерять оба окна из поля зрения.

- A popup can be opened by the `open(url, name, params)` call. It returns the reference to the newly opened window.
- Browsers block `open` calls from the code outside of user actions. Usually a notification appears, so that a user may allow them.
- Browsers open a new tab by default, but if sizes are provided, then it'll be a popup window.
- The popup may access the opener window using the `window.opener` property.
- The main window and the popup can freely read and modify each other if they havee the same origin. Otherwise, they can change location of each other and [exchange messages](cross-window-communication).

Methods and properties:

- To close the popup: use `close()` call. Also the user may close them (just like any other windows). The `window.closed` is `true` after that.
- Methods `focus()` and `blur()` allow to focus/unfocus a window. Sometimes.
- Events `focus` and `blur` allow to track switching in and out of the window. But please note that a  window may still be visible even in the background state, after `blur`.
- ...And a few scrolling and resizing methods.

If we're going to open a popup, a good practice is to inform the user about it. If there's a link that opens a popup, we could place an icon near it, so that visitor can survive the focus shift and keep both windows in mind.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
