
# Скрипты: async, defer

В современных сайтах скрипты обычно  "тяжелее", чем HTML: они весят больше, дольше обрабатываются.

<<<<<<< HEAD
Когда браузер загружает HTML и доходит до тега `<script>...</script>`, он не может продолжать строить DOM. Он должен сначала выполнить скрипт. То же самое происходит и с внешними скриптами `<script src="..."></script>`: браузер должен подождать, пока загрузится скрипт, выполнить его, и только затем обработать остальную страницу.
=======
When the browser loads HTML and comes across a `<script>...</script>` tag, it can't continue building the DOM. It must execute the script right now. The same happens for external scripts `<script src="..."></script>`: the browser must wait for the script to download, execute the downloaded script, and only then can it process the rest of the page.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Это ведёт к двум важным проблемам:

<<<<<<< HEAD
1. Скрипты не видят DOM-элементы ниже себя, поэтому к ним нельзя добавить обработчики и т.д. 
2. Если вверху страницы объёмный скрипт, он "блокирует" страницу. Пользователи не видят содержимое страницы, пока он не загрузится и не запустится:
=======
1. Scripts can't see DOM elements below them, so they can't add handlers etc.
2. If there's a bulky script at the top of the page, it "blocks the page". Users can't see the page content till it downloads and runs:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```html run height=100
<p>...содержимое перед скриптом...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- Это не отобразится, пока скрипт не загрузится -->
<p>...содержимое после скрипта...</p>
```

Конечно, есть пути, как это обойти. Например, мы можем поместить скрипт внизу страницы. Тогда он сможет видеть элементы над ним и не будет препятствовать отображению содержимого страницы: 

```html
<body>
  ...всё содержимое над скриптом...

  <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
</body>
```

Но это решение далеко от идеального. Например, браузер замечает скрипт (и может начать загружать его) только после того, как он полностью загрузил HTML-документ. В случае с длинными HTML-страницами это может создать заметную задержку.

<<<<<<< HEAD
Такие вещи незаметны людям, у кого очень быстрое соединение, но много кто в мире имеет медленное подключение к интернету или использует не такой хороший мобильный интернет. 
=======
Such things are invisible for people using very fast connections, but many people in the world still have slow internet speeds and use a far-from-perfect mobile internet connection.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

К счастью, есть два атрибута тега `<script>`, которые решают нашу проблему: `defer` и `async`.

## defer

<<<<<<< HEAD
Атрибут `defer` сообщает браузеру, что он должен продолжать обрабатывать страницу и загружать скрипт в фоновом режиме, а затем запустить этот скрипт, когда он загрузится.
=======
The `defer` attribute tells the browser not to wait for the script. Instead, the browser will continue to process the HTML, build DOM. The script loads "in the background", and then runs when the DOM is fully built.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Вот тот же пример, что и выше, но с `defer`:

```html run height=100
<p>...содержимое перед скриптом...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- отображается сразу же -->
<p>...содержимое после скрипта...</p>
```

<<<<<<< HEAD
- Скрипты с `defer` никогда не блокируют страницу.
- Скрипты с  `defer` всегда выполняются, когда дерево DOM готово, но до события `DOMContentLoaded`.

Следующий пример это показывает:
=======
In other words:

- Scripts with `defer` never block the page.
- Scripts with `defer` always execute when the DOM is ready (but before `DOMContentLoaded` event).

The following example demonstrates the second part:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```html run height=100
<p>...содержимое до скрипта...</p>

<script>
<<<<<<< HEAD
  document.addEventListener('DOMContentLoaded', () => alert("Дерево DOM готово после скрипта с 'defer'!")); // (2)
=======
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready after defer!"));
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...содержимое после скрипта...</p>
```

<<<<<<< HEAD
1. Содержимое страницы отобразится мгновенно.
2. Событие `DOMContentLoaded` подождёт отложенный скрипт. Оно будет сгенерировано, только когда скрипт `(2)` будет загружен и выполнен.

Отложенные с помощью `defer` скрипты сохраняют порядок относительно друг друга, как и обычные скрипты.

Поэтому, если сначала загружается большой скрипт, а затем меньшего размера, то последний будет ждать. 
=======
1. The page content shows up immediately.
2. `DOMContentLoaded` event handler waits for the deferred script. It only triggers when the script is downloaded and executed.

**Deferred scripts keep their relative order, just like regular scripts.**

Let's say, we have two deferred scripts: the `long.js` and then `small.js`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

<<<<<<< HEAD
```smart header="Маленький скрипт загрузится первым, но выполнится вторым"
Браузеры сканируют страницу на предмет скриптов и загружают их параллельно в целях увеличения производительности. Поэтому и в примере выше оба скрипта скачиваются параллельно. `small.js` скорее всего загрузится первым.

Но спецификация требует последовательного выполнения скриптов согласно порядку в документе, поэтому он подождёт выполнения `long.js`.
```
=======
Browsers scan the page for scripts and download them in parallel, to improve performance. So in the example above both scripts download in parallel. The `small.js` probably finishes first.

...But the `defer` attribute, besides telling the browser "not to block", ensures that the relative order is kept. So even though `small.js` loads first, it still waits and runs after `long.js` executes.

That may be important for cases when we need to load a JavaScript library and then a script that depends on it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```smart header="Атрибут `defer` предназначен только для внешних скриптов"
Атрибут `defer` будет проигнорирован, если в теге `<script>` нет `src`.
```

## async

<<<<<<< HEAD
Атрибут `async` означает, что скрипт абсолютно независим:

- Страница не ждёт асинхронных скриптов, содержимое обрабатывается и отображается.
- Событие `DOMContentLoaded` и асинхронные скрипты не ждут друг друга:
    - `DOMContentLoaded` может произойти как до асинхронного скрипта (если асинхронный скрипт завершит загрузку после того, как страница будет готова),
    - ...так и после асинхронного скрипта (если он короткий или уже содержится в HTTP-кеше)
- Остальные скрипты не ждут `async`, и скрипты c`async` не ждут другие скрипты.
=======
The `async` attribute is somewhat like `defer`. It also makes the script non-blocking. But it has important differences in the behavior.

The `async` attribute means that a script is completely independent:

- The browser doesn't block on `async` scripts (like `defer`).
- Other scripts don't wait for `async` scripts, and `async` scripts don't wait for them.
- `DOMContentLoaded` and async scripts don't wait for each other:
    - `DOMContentLoaded` may happen both before an async script (if an async script finishes loading after the page is complete)
    - ...or after an async script (if an async script is short or was in HTTP-cache)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

In other words, `async` scripts load in the background and run when ready. The DOM and other scripts don't wait for them, and they don't wait for anything. A fully independent script that runs when loaded. As simple, as it can get, right?

Here's an example similar to what we've seen with `defer`: two scripts `long.js` and `small.js`, but now with `async` instead of `defer`.

<<<<<<< HEAD
Так что если у нас есть несколько скриптов с `async`, они могут выполняться в любом порядке. То, что первое загрузится -- запустится в первую очередь:
=======
They don't wait for each other. Whatever loads first (probably `small.js`) -- runs first:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```html run height=100
<p>...содержимое перед скриптами...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM готов!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...содержимое после скриптов...</p>
```

<<<<<<< HEAD
1. Содержимое страницы отображается сразу же : `async` его не блокирует.
2. `DOMContentLoaded` может произойти как до, так и после `async`, никаких гарантий нет.
3. Асинхронные скрипты не ждут друг друга. Меньший скрипт  `small.js` идёт вторым, но скорее всего загрузится раньше `long.js`, поэтому и запустится первым. То есть, скрипты выполняются в порядке загрузки.
=======
- The page content shows up immediately: `async` doesn't block it.
- `DOMContentLoaded` may happen both before and after `async`, no guarantees here.
- A smaller script `small.js` goes second, but probably loads before `long.js`, so `small.js` runs first. Although, it might be that `long.js` loads first, if cached, then it runs first. In other words, async scripts run in the "load-first" order.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Асинхронные скрипты очень полезны для добавления на страницу сторонних скриптов: счётчиков, рекламы и т.д. Они не зависят от наших скриптов, и мы тоже не должны ждать их:

```html
<!-- Типичное подключение скрипта Google Analytics -->
<script async src="https://google-analytics.com/analytics.js"></script>
```

<<<<<<< HEAD

## Динамически загружаемые скрипты

Мы можем также добавить скрипт и динамически, с помощью JavaScript:
=======
## Dynamic scripts
 
There's one more important way of adding a script to the page.

We can create a script and append it to the document dynamically using JavaScript:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script); // (*)
```

Скрипт начнёт загружаться, как только он будет добавлен в документ  `(*)`.

**Динамически загружаемые скрипты по умолчанию ведут себя как "async".**

То есть:
- Они никого не ждут, и их никто не ждёт.
- Скрипт, который загружается первым -- запускается первым (в порядке загрузки).

<<<<<<< HEAD
Мы можем изменить относительный порядок скриптов с "первый загрузился - первый выполнился" на порядок, в котором они идут в документе (как в обычных скриптах) с помощью явной установки свойства  `async` в `false`:

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";

*!*
script.async = false;
*/!*

document.body.append(script);
```

Например, здесь мы добавляем два скрипта. Без `script.async=false` они запускались бы в порядке загрузки (`small.js` скорее всего запустился бы раньше). Но с этим флагом порядок будет как в документе:
=======
This can be changed if we explicitly set `script.async=false`. Then scripts will be executed in the document order, just like `defer`.

In this example, `loadScript(src)` function adds a script and also sets `async` to `false`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

So `long.js` always runs first (as it's added first):

```js run
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

// long.js запускается первым, так как async=false
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
```

Without `script.async=false`, scripts would execute in default, load-first order (the `small.js` probably first).

Again, as with the `defer`, the order matters if we'd like to load a library and then another script that depends on it.


## Итого

У `async` и `defer` есть кое-что общее: они не блокируют отрисовку страницы. Так что пользователь может просмотреть содержимое страницы и ознакомиться с ней сразу же.

Но есть и значимые различия:

|         | Порядок | `DOMContentLoaded` |
|---------|---------|---------|
<<<<<<< HEAD
| `async` | *Порядок загрузки* (кто загрузится первым, тот и сработает).|  Не имеет значения. Может загрузиться и выполниться до того, как страница полностью загрузится. Такое случается, если скрипты маленькие или хранятся в кеше, а документ достаточно большой. |
| `defer` | *Порядок документа* (как расположены в документе). |  Выполняется после того, как документ загружен и обработан  (ждёт), непосредственно перед `DOMContentLoaded`. |

```warn header="Страница без скриптов должна быть рабочей"
Пожалуйста, помните, что когда вы используете `defer`, страница видна до того, как скрипт загрузится.

Пользователь может знакомиться с содержимым страницы, читать её, но графические компоненты пока отключены.

Поэтому обязательно должна быть индикация загрузки, нерабочие кнопки - отключены с помощью CSS или другим образом. Чтобы пользователь явно видел, что уже готово, а что пока нет.
```

На практике `defer` используется для скриптов, которым требуется доступ ко всему DOM и/или важен их относительный порядок выполнения.

А `async` хорош для независимых скриптов, например счётчиков и рекламы, относительный порядок выполнения которых не играет роли.
=======
| `async` | *Load-first order*. Their document order doesn't matter -- which loads first runs first |  Irrelevant. May load and execute while the document has not yet been fully downloaded. That happens if scripts are small or cached, and the document is long enough. |
| `defer` | *Document order* (as they go in the document). |  Execute after the document is loaded and parsed (they wait if needed), right before `DOMContentLoaded`. |

In practice, `defer` is used for scripts that need the whole DOM and/or their relative execution order is important. 

And  `async` is used for independent scripts, like counters or ads. And their relative execution order does not matter.

```warn header="Page without scripts should be usable"
Please note: if you're using `defer` or `async`, then user will see the the page *before* the script loads.

In such case, some graphical components are probably not initialized yet.

Don't forget to put "loading" indication and disable buttons that aren't functional yet. Let the user clearly see what he can do on the page, and what's still getting ready.
```
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
