# Всплытие и погружение

Давайте начнём с примера.

Этот обработчик для `<div>` сработает, если вы кликните по любому из вложенных тегов, будь то `<em>` или `<code>`:

```html autorun height=60
<div onclick="alert('Обработчик!')">
  <em>Если вы кликните на <code>EM</code>, сработает обработчик на <code>DIV</code></em>
</div>
```

Вам не кажется это странным? Почему же сработал обработчик на `<div>`, если клик произошёл на `<em>`?

## Всплытие

Принцип всплытия очень простой.

**Когда на элементе происходит событие, обработчики сначала срабатывают на нём, потом на его родителе, затем выше и так далее, вверх по цепочке предков.**

Например, есть 3 вложенных элемента `FORM > DIV > P` с обработчиком на каждом:

```html run autorun
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```

Клик по внутреннему `<p>` вызовет обработчик `onclick`:
1. Сначала на самом `<p>`.
2. Потом на внешнем `<div>`.
3. Затем на внешнем `<form>`.
4. И так далее вверх по цепочке до самого `document`.

![](event-order-bubbling.svg)

Поэтому если кликнуть на `<p>`, то мы увидим три оповещения: `p` -> `div` -> `form`.

Этот процесс называется "всплытием", потому что события "всплывают" от внутреннего элемента вверх через родителей подобно тому, как всплывает пузырёк воздуха в воде.

```warn header="*Почти* все события всплывают."
Ключевое слово в этой фразе -- "почти".

Например, событие `focus` не всплывает. В дальнейшем мы увидим и другие примеры. Однако, стоит понимать, что это скорее исключение, чем правило, всё-таки большинство событий всплывают.
```

## event.target

Всегда можно узнать, на каком конкретно элементе произошло событие.

**Самый глубокий элемент, который вызывает событие, называется *целевым* элементом, и он доступен через `event.target`.**

Отличия от `this` (=`event.currentTarget`):

- `event.target` -- это "целевой" элемент, на котором произошло событие, в процессе всплытия он неизменен.
- `this` -- это "текущий" элемент, до которого дошло всплытие, на нём сейчас выполняется обработчик.

Например, если стоит только один обработчик `form.onclick`, то он "поймает" все клики внутри формы. Где бы ни был клик внутри -- он всплывёт до элемента `<form>`, на котором сработает обработчик.

При этом внутри обработчика `form.onclick`:

<<<<<<< HEAD
- `this` (=`event.currentTarget`) всегда будет элемент `<form>`, так как обработчик сработал на ней.
- `event.target` будет содержать ссылку на конкретный элемент внутри формы, на котором произошёл клик.
=======
- `this` (=`event.currentTarget`) is the `<form>` element, because the handler runs on it.
- `event.target` is the actual element inside the form that was clicked.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

Попробуйте сами:

[codetabs height=220 src="bubble-target"]

Возможна и ситуация, когда `event.target` и `this` -- один и тот же элемент, например, если клик был непосредственно на самом элементе `<form>`, а не на его подэлементе.

## Прекращение всплытия

Всплытие идёт с "целевого" элемента прямо наверх. По умолчанию событие будет всплывать до элемента `<html>`, а затем до объекта `document`, а иногда даже до `window`, вызывая все обработчики на своём пути.

Но любой промежуточный обработчик может решить, что событие полностью обработано, и остановить всплытие.

Для этого нужно вызвать метод `event.stopPropagation()`.

Например, здесь при клике на кнопку `<button>` обработчик `body.onclick` не сработает:

```html run autorun height=60
<body onclick="alert(`сюда всплытие не дойдёт`)">
  <button onclick="event.stopPropagation()">Кликни меня</button>
</body>
```

```smart header="event.stopImmediatePropagation()"
Если у элемента есть несколько обработчиков на одно событие, то даже при прекращении всплытия все они будут выполнены.

То есть, `event.stopPropagation()` препятствует продвижению события дальше, но на текущем элементе все обработчики будут вызваны.

Для того, чтобы полностью остановить обработку, существует метод `event.stopImmediatePropagation()`. Он не только предотвращает всплытие, но и останавливает обработку событий на текущем элементе.
```

<<<<<<< HEAD
```warn header="Не прекращайте всплытие без необходимости!"
Всплытие -- это удобно. Не прекращайте его без явной нужды, очевидной и архитектурно прозрачной.
=======
```warn header="Don't stop bubbling without a need!"
Bubbling is convenient. Don't stop it without a real need: obvious and architecturally well thought out.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

Зачастую прекращение всплытия через `event.stopPropagation()` имеет свои подводные камни, которые со временем могут стать проблемами.

Например:

1. Мы делаем вложенное меню.  Каждое подменю обрабатывает клики на своих элементах и делает для них `stopPropagation`, чтобы не срабатывало внешнее меню.
2. Позже мы решили отслеживать все клики в окне для какой-то своей функциональности, к примеру, для статистики – где вообще у нас кликают люди. Некоторые системы аналитики так делают. Обычно используют `document.addEventListener('click'…)`, чтобы отлавливать все клики.
3. Наша аналитика не будет работать над областью, где клики прекращаются `stopPropagation`. Увы, получилась "мёртвая зона".

Зачастую нет никакой необходимости прекращать всплытие. Задача, которая, казалось бы, требует этого, может быть решена иначе. Например, с помощью создания своего уникального события, о том, как это делать, мы поговорим позже. Также мы можем записывать какую-то служебную информацию в объект `event` в одном обработчике, а читать в другом, таким образом мы можем сообщить обработчикам на родительских элементах информацию о том, что событие уже было как-то обработано.
```


## Погружение

Существует ещё одна фаза из жизненного цикла события -- "погружение" (иногда её называют "перехват"). Она очень редко используется в реальном коде, однако тоже может быть полезной.

<<<<<<< HEAD
Стандарт [DOM Events](https://www.w3.org/TR/DOM-Level-3-Events/) описывает 3 фазы прохода события:
=======
The standard [DOM Events](https://www.w3.org/TR/DOM-Level-3-Events/) describes 3 phases of event propagation:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

1. Фаза погружения (capturing phase) -- событие сначала идёт сверху вниз.
2. Фаза цели (target phase) -- событие достигло целевого(исходного) элемента.
3. Фаза всплытия (bubbling stage) -- событие начинает всплывать.

<<<<<<< HEAD
Картинка из спецификации демонстрирует, как это работает при клике по ячейке `<td>`, расположенной внутри таблицы:
=======
Here's the picture, taken from the specification, of the capturing `(1)`, target `(2)` and bubbling `(3)` phases for a click event on a `<td>` inside a table:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

![](eventflow.svg)

То есть при клике на `<td>` событие путешествует по цепочке родителей сначала вниз к элементу (погружается), затем оно достигает целевой элемент (фаза цели), а потом идёт наверх (всплытие), вызывая по пути обработчики.

<<<<<<< HEAD
**Ранее мы говорили только о всплытии, потому что другие стадии, как правило, не используются и проходят незаметно для нас.**

Обработчики, добавленные через `on<event>`-свойство или через HTML-атрибуты, или через `addEventListener(event, handler)` с двумя аргументами, ничего не знают о фазе погружения, а работают только на 2-ой и 3-ей фазах.
=======
Until now, we only talked about bubbling, because the capturing phase is rarely used.

In fact, the capturing phase was invisible for us, because handlers added using `on<event>`-property or using HTML attributes or using two-argument `addEventListener(event, handler)` don't know anything about capturing, they only run on the 2nd and 3rd phases.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

Чтобы поймать событие на стадии погружения, нужно использовать третий аргумент `capture` вот так:

```js
elem.addEventListener(..., {capture: true})
<<<<<<< HEAD
// или просто "true", как сокращение для {capture: true}
=======

// or, just "true" is an alias to {capture: true}
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
elem.addEventListener(..., true)
```

Существуют два варианта значений опции `capture`:

- Если аргумент `false` (по умолчанию), то событие будет поймано при всплытии.
- Если аргумент `true`, то событие будет перехвачено при погружении.

Обратите внимание, что хоть и формально существует 3 фазы, 2-ую фазу ("фазу цели": событие достигло элемента) нельзя обработать отдельно, при её достижении вызываются все обработчики: и на всплытие, и на погружение.

Давайте посмотрим и всплытие и погружение в действии:

```html run autorun height=140 edit
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form>FORM
  <div>DIV
    <p>P</p>
  </div>
</form>

<script>
  for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Погружение: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Всплытие: ${elem.tagName}`));
  }
</script>
```

Здесь обработчики навешиваются на *каждый* элемент в документе, чтобы увидеть в каком порядке они вызываются по мере прохода события.

Если вы кликните по `<p>`, то последовательность следующая:

<<<<<<< HEAD
1. `HTML` -> `BODY` -> `FORM` -> `DIV` (фаза погружения, первый обработчик)
2. `P` (фаза цели, срабатывают обработчики, установленные и на погружение и на всплытие, так что выведется два раза)
3. `DIV` -> `FORM` -> `BODY` -> `HTML` (фаза всплытия, второй обработчик)
=======
1. `HTML` -> `BODY` -> `FORM` -> `DIV -> P` (capturing phase, the first listener):
2. `P` -> `DIV` -> `FORM` -> `BODY` -> `HTML` (bubbling phase, the second listener).

Please note, the `P` shows up twice, because we've set two listeners: capturing and bubbling. The target triggers at the end of the first and at the beginning of the second phase.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

Существует свойство `event.eventPhase`, содержащее номер фазы, на которой событие было поймано. Но оно используется редко, мы обычно и так знаем об этом в обработчике.

```smart header="Чтобы убрать обработчик `removeEventListener`, нужна та же фаза"
Если мы добавили обработчик вот так `addEventListener(..., true)`, то мы должны передать то же значение аргумента `capture` в `removeEventListener(..., true)`, когда снимаем обработчик.
```

<<<<<<< HEAD
````smart header="На каждой фазе разные обработчики на одном элементе срабатывают в порядке назначения"
Если у нас несколько обработчиков одного события, назначенных `addEventListener` на один элемент, в рамках одной фазы, то их порядок срабатывания - тот же, в котором они установлены:
=======
````smart header="Listeners on the same element and same phase run in their set order"
If we have multiple event handlers on the same phase, assigned to the same element with `addEventListener`, they run in the same order as they are created:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js
elem.addEventListener("click", e => alert(1)); // всегда сработает перед следующим
elem.addEventListener("click", e => alert(2));
```
````

<<<<<<< HEAD
## Итого
=======
```smart header="The `event.stopPropagation()` during the capturing also prevents the bubbling"
The `event.stopPropagation()` method and its sibling `event.stopImmediatePropagation()` can also be called on the capturing phase. Then not only the futher capturing is stopped, but the bubbling as well.

In other words, normally the event goes first down ("capturing") and then up ("bubbling"). But if `event.stopPropagation()` is called during the capturing phase, then the event travel stops, no bubbling will occur.
```

>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

При наступлении события - самый глубоко вложенный элемент, на котором оно произошло, помечается как "целевой" (`event.target`).

- Затем событие сначала двигается вниз от корня документа к `event.target`, по пути вызывая обработчики, поставленные через `addEventListener(...., true)`, где `true` -- это сокращение для `{capture: true}`.
- Далее обработчики вызываются на целевом элементе.
- Далее событие двигается от `event.target` вверх к корню документа, по пути вызывая обработчики, поставленные через `on<event>` и `addEventListener` без третьего аргумента или с третьим аргументом равным `false`.

<<<<<<< HEAD
Каждый обработчик имеет доступ к свойствам события `event`:
=======
- Then the event moves down from the document root to `event.target`, calling handlers assigned with `addEventListener(..., true)` on the way (`true` is a shorthand for `{capture: true}`).
- Then handlers are called on the target element itself.
- Then the event bubbles up from `event.target` to the root, calling handlers assigned using `on<event>`, HTML attributes and `addEventListener` without the 3rd argument or with the 3rd argument `false/{capture:false}`.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

- `event.target` -- самый глубокий элемент, на котором произошло событие.
- `event.currentTarget` (=`this`) -- элемент, на котором в данный момент сработал обработчик (тот, на котором "висит" конкретный обработчик)
- `event.eventPhase` -- на какой фазе он сработал (погружение=1, фаза цели=2, всплытие=3).

Любой обработчик может остановить событие вызовом `event.stopPropagation()`, но делать это не рекомендуется, так как в дальнейшем это событие может понадобиться, иногда для самых неожиданных вещей.

В современной разработке стадия погружения используется очень редко, обычно события обрабатываются во время всплытия. И в этом есть логика.

<<<<<<< HEAD
В реальном мире, когда происходит чрезвычайная ситуация, местные службы реагируют первыми. Они знают лучше всех местность, в которой это произошло, и другие детали. Вышестоящие инстанции подключаются уже после этого и при необходимости.
=======
The capturing phase is used very rarely, usually we handle events on bubbling. And there's a logical explanation for that.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

Тоже самое справедливо для обработчиков событий. Код, который "навесил" обработчик на конкретный элемент, знает максимум деталей об элементе и его предназначении. Например, обработчик на определённом `<td>` скорее всего подходит только для этого конкретного `<td>`, он знает все о нём, поэтому он должен отработать первым. Далее имеет смысл передать обработку события родителю -- он тоже понимает, что происходит, но уже менее детально, далее – выше, и так далее, до самого объекта `document`, обработчик на котором реализовывает самую общую функциональность уровня документа.

<<<<<<< HEAD
Всплытие и погружение являются основой для "делегирования событий" -- очень мощного приёма обработки событий. Его мы изучим в следующей главе.
=======
The same for event handlers. The code that set the handler on a particular element knows maximum details about the element and what it does. A handler on a particular `<td>` may be suited for that exactly `<td>`, it knows everything about it, so it should get the chance first. Then its immediate parent also knows about the context, but a little bit less, and so on till the very top element that handles general concepts and runs the last one.

Bubbling and capturing lay the foundation for "event delegation" -- an extremely powerful event handling pattern that we study in the next chapter.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
