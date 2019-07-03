# Атака типа clickjacking

Атака типа clickjacking (англ. "захват клика") позволяет вредоносной странице кликнуть по сайту-жертве от имени посетителя.

Многие сайты были взломаны подобным способом, включая Twitter, Facebook, Paypal и другие. Все они, конечно же, сейчас защищены.

## Идея

Идея этой атаки очень проста.

Вот как clickjacking-атака была проведена на Facebook:

1. Посетителя заманивают на вредоносную страницу (неважно как).
2. На странице есть ссылка, которая выглядит безобидно (например, "Разбогатей прямо сейчас" или "Нажми здесь, это очень смешно").
3. Поверх этой ссылки вредоносная страница размещает прозрачный `<iframe>` с `src` с сайта facebook.com таким образом, что кнопка "like" находится прямо над этой ссылкой. Обычно это делается с помощью  `z-index` в CSS.
4. При попытке клика на эту ссылку посетитель на самом деле нажимает на кнопку.

## Демонстрация

Вот как выглядит вредоносная страница. Для наглядности `<iframe>` полупрозрачный (на реальных вредоносных страницах он полностью прозрачен):

```html run height=120 no-beautify
<style>
iframe { /* ифрейм с сайта-жертвы */
  width: 400px;
  height: 100px;
  position: absolute;
  top:0; left:-20px;
*!*
  opacity: 0.5; /* в реальности opacity:0 */
*/!*
  z-index: 1;
}
</style>

<div>Нажми, чтобы разбогатеть:</div>

<!-- Url с сайта-жертвы -->
*!*
<iframe src="/clickjacking/facebook.html"></iframe>

<button>Нажмите сюда!</button>
*/!*

<div>...И всё будет супер (у меня, хакера)!</div>
```

Полная демонстрация атаки:

[codetabs src="clickjacking-visible" height=160]

Здесь у нас есть полупрозрачный `<iframe src="facebook.html">`, и в примере мы видим его висящим поверх кнопки. Клик на кнопку фактически кликает на ифрейм, но этого не видно пользователю, потому что ифрейм прозрачный.

В результате, если пользователь авторизован на сайте Facebook ("Запомнить меня" обычно активировано), то он добавляет "лайк". В Twitter это будет кнопка "читать", и т.п.

Вот тот же пример, но более приближенный к реальности с `opacity:0` для `<iframe>`:

[codetabs src="clickjacking" height=160]

<<<<<<< HEAD
Всё, что нам необходимо для атаки — это расположить `<iframe>` на вредоносной странице так, чтобы кнопка находилась прямо над ссылкой. Так что пользователь, кликающий по ссылке, на самом деле будет нажимать на кнопку в `<iframe>`. Обычно это можно сделать с помощью CSS-позиционирования.

```smart header="Clickjacking-атака для кликов мыши, а не для клавиатуры"
Эта атака срабатывает только на действия мыши (или аналогичные, вроде нажатия пальцем на мобильном устройстве).

Клавиатурный ввод гораздо сложнее перенаправить. Технически, если у нас есть текстовое поле для взлома, мы можем расположить ифрейм таким образом, чтобы текстовые поля перекрывали друг друга. Тогда посетитель при попытке сфокусироваться на текстовом поле, которое он видит на странице, фактически будет фокусироваться на текстовом поле внутри ифрейм.
=======
All we need to attack -- is to position the `<iframe>` on the evil page in such a way that the button is right over the link. So that when a user clicks the link, they actually click the button. That's usually doable with CSS.

```smart header="Clickjacking is for clicks, not for keyboard"
The attack only affects mouse actions (or similar, like taps on mobile).

Keyboard input is much difficult to redirect. Technically, if we have a text field to hack, then we can position an iframe in such a way that text fields overlap each other. So when a visitor tries to focus on the input they see on the page, they actually focus on the input inside the iframe.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Но есть одна проблема. Всё, что посетитель печатает, будет скрыто, потому что ифрейм не виден. 

Обычно люди перестают печатать, когда не видят на экране новых символов.
```

## Примеры слабой защиты

Самым старым вариантом защиты является код JavaScript, запрещающий открытие страницы во фрейме (это называют "framebusting").

Выглядит он вот так:

```js
if (top != window) {
  top.location = window.location;
}
```

В этом случае, если окно обнаруживает, что оно открыто во фрейме, оно автоматически располагает себя сверху.

Этот метод не является надёжной защитой, поскольку появилось множество способов его обойти. Рассмотрим некоторые из них.

### Блокировка top-навигации

<<<<<<< HEAD
Мы можем заблокировать переход, вызванный сменой `top.location` в обработчике события beforeunload.

Внешняя страница (принадлежащая хакеру) устанавливает обработчик на это событие, отменяющий его, например, такой:
=======
We can block the transition caused by changing `top.location` in  [beforeunload](info:onload-ondomcontentloaded#window.onbeforeunload) event handler.

The top page (enclosing one, belonging to the hacker) sets a preventing handler to it, like this:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```js
window.onbeforeunload = function() {
  return false;
};
```

<<<<<<< HEAD
Когда iframe пытается изменить `top.location`, посетитель увидит сообщение с вопросом действительно ли он хочет покинуть эту страницу. В большинстве случаев посетитель ответит отрицательно, поскольку он не знает об ифрейме: всё, что он видит - это верхнюю страницу, которую нет причин покидать. Поэтому `top.location` не изменится!
=======
When the `iframe` tries to change `top.location`, the visitor gets a message asking them whether they want to leave.

In most cases the visitor would answer negatively because they don't know about the iframe - all they can see is the top page, there's no reason to leave. So `top.location` won't change!
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

В действии:

[codetabs src="top-location"]

### Атрибут "sandbox"

Одним из действий, которые можно ограничить атрибутом `sandbox`, является навигация. Соответственно ифрейм внутри sandbox не изменит `top.location`.

Поэтому мы можем добавить ифрейм с `sandbox="allow-scripts allow-forms"`. Это снимет некоторые ограничения, разрешая при этом использование скриптов и форм. Но мы опускаем `allow-top-navigation`, чтобы изменение `top.location` было запрещено.

Вот код этого примера:

```html
<iframe *!*sandbox="allow-scripts allow-forms"*/!* src="facebook.html"></iframe>
```

Есть и другие способы обойти эту простую защиту.

## Заголовок X-Frame-Options

Заголовок `X-Frame-Options` со стороны сервера может разрешать или запрещать отображение страницы внутри фрейма.

<<<<<<< HEAD
Это должен быть именно HTTP-заголовок: браузер проигнорирует его, если найдёт в HTML-теге `<meta>`. Поэтому при `<meta http-equiv="X-Frame-Options"...>` ничего не произойдёт.
=======
It must be sent exactly as HTTP-header: the browser will ignore it if found in HTML `<meta>` tag. So, `<meta http-equiv="X-Frame-Options"...>` won't do anything.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Заголовок может иметь 3 значения:


`DENY`
: Никогда не показывать страницу внутри фрейма.

`SAMEORIGIN`
: Разрешить открытие страницы внутри фрейма только в том случае, если родительский документ имеет тот же источник.

`ALLOW-FROM domain`
: Разрешить открытие страницы внутри фрейма только в том случае, если родительский документ находится на указанном в заголовке домене.

Например, Twitter использует `X-Frame-Options: SAMEORIGIN`.

````online
Вот результат:

```html
<iframe src="https://twitter.com"></iframe>
```

<!-- ebook: prerender/ chrome headless dies and timeouts on this iframe -->
<iframe src="https://twitter.com"></iframe>

В зависимости от того, какой браузер вы используете, `iframe` выше либо будет пустым, либо оповестит вас о том, что его невозможно отобразить.
````

## Отображение с ограниченными возможностями

У заголовка `X-Frame-Options` есть побочный эффект. Другие сайты не смогут отобразить нашу страницу во фрейме, даже если у них будут на то веские причины.

<<<<<<< HEAD
Так что есть другие решения... Например, мы можем "накрыть" страницу блоком `<div>` со стилями `height: 100%; width: 100%;`, чтобы он перехватывал все клики. Этот `<div>` будем убирать, если `window == top` или если мы поймём, что защита нам не нужна.
=======
So there are other solutions... For instance, we can "cover" the page with a `<div>` with styles `height: 100%; width: 100%;`, so that it will intercept all clicks. That `<div>` is to be removed if `window == top` or if we figure out that we don't need the protection.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Примерно так:

```html
<style>
  #protector {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999;
  }
</style>

<div id="protector">
  <a href="/" target="_blank">Перейти к сайту</a>
</div>

<script>
  // Здесь будет отображаться ошибка, если верхнее окно имеет другое происхождение
  // а здесь будет код, если всё в порядке
  if (top.document.domain == document.domain) {
    protector.remove();
  }
</script>
```

Демонстрация:

[codetabs src="protector"]

## Атрибут cookie: samesite

<<<<<<< HEAD
Атрибут `samesite` также может помочь избежать clickjacking-атаки.

Файл куки с таким атрибутом отправляется на сайт только в том случае, если он открыт напрямую, не через фрейм или каким-либо другим способом. Подробно об этом - в главе <info:cookie#samesite>.

Если сайт, такой как Facebook, при установке авторизующего куки ставит атрибут  `samesite`:
=======
The `samesite` cookie attribute can also prevent clickjacking attacks.

A cookie with such attribute is only sent to a website if it's opened directly, not via a frame, or otherwise. More information in the chapter <info:cookie#samesite>.

If the site, such as Facebook, had `samesite` attribute on its authentication cookie, like this:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```
Set-Cookie: authorization=secret; samesite
```

<<<<<<< HEAD
... Тогда такие куки не будут отправляться, когда Facebook будет открыт в ифрейме с другого сайта. Так что атака не удастся.

Атрибут `samesite` не играет никакой роли, если куки не используются. Так что другие веб-сайты смогут отображать публичные, не требующие авторизации, страницы в ифрейме. 

Однако, это даёт возможность в некоторых ситуациях осуществить clickjacking-атаку, например, на сайт для анонимных опросов, который предотвращает повторное голосование пользователя путём проверки IP-адреса. Он останется уязвимым к атаке, потому что не аутентифицирует пользователей с помощью куки. 
=======
...Then such cookie wouldn't be sent when Facebook is open in iframe from another site. So the attack would fail.

The `samesite` cookie attribute will not have an effect when cookies are not used. This may allow other websites to easily show our public, unauthenticated pages in iframes.

However, this may also allow clickjacking attacks to work in a few limited cases. An anonymous polling website that prevents duplicate voting by checking IP addresses, for example, would still be vulnerable to clickjacking because it does not authenticate users using cookies.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

## Итого

<<<<<<< HEAD
Атака сlickjacking - это способ хитростью "заставить" пользователей кликнуть на сайте-жертве, без понимания, что происходит. Она опасна, если по клику могут быть произведены важные действия.
=======
Clickjacking is a way to "trick" users into clicking on a victim site without even knowing what's happening. That's dangerous if there are important click-activated actions.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Хакер может разместить ссылку на свою вредоносную страницу в сообщении или найти другие способы, как заманить пользователей. Вариантов множество.

С одной стороны — эта атака "неглубокая", ведь хакер перехватывает только один клик. Но с другой стороны, если хакер знает, что после этого клика появятся другие элементы управления, то он может хитростью заставить пользователя кликнуть на них.

Этот вид атаки довольно опасен, ведь при разработке интерфейсов мы не предполагаем, что хакер может кликнуть от имени пользователя. Поэтому уязвимости могут быть обнаружены в совершенно неожиданных местах.

- Для защиты от этой атаки рекомендуется использовать `X-Frame-Options: SAMEORIGIN` на страницах или даже целиком сайтах, которые не предназначены для просмотра во фрейме.
- Или, если мы хотим разрешить отображение страницы во фрейме и при этом оставаться в безопасности, то можно использовать перекрывающий блок `<div>`.
