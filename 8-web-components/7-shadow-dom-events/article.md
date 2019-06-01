# Теневой DOM и события

Идея, стоящая за теневым DOM-деревом -- это инкапсуляция реализации внутренних деталей компонента.

Допустим, клик произошёл внутри теневого DOM на компоненте `<user-card>`. Но скрипты основного документа ничего не знают о внутреннем устройстве теневой DOM-структуры, в особенности, если компонент из кода сторонней библиотеки или вроде того.

Таким образом, чтобы не усложнять, браузер *перенаправляет* это событие.

**События, которые пойманы в теневом DOM, но вне компонента, имеют в качестве целевого элемента -- элемент-"хозяин" (host element).**

Рассмотрим простой пример:

```html run autorun="no-epub" untrusted height=60
<user-card></user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<p>
      <button>Нажми меня</button>
    </p>`;
    this.shadowRoot.firstElementChild.onclick =
      e => alert("Внутренний целевой элемент: " + e.target.tagName);
  }
});

document.onclick =
  e => alert("Внешний целевой элемент: " + e.target.tagName);
</script>
```

Если нажать на кнопку, то выведется следующее:

1. Внутренний целевой элемент: `BUTTON` -- внутренний обработчик событий получает правильный целевой элемент -- элемент, находящийся внутри теневого DOM.
2. Внешний целевой элемент: `USER-CARD` -- обработчик событий на уровне документа получает теневой элемент-"хозяин" в качестве целевого.

Хорошо, что у нас есть перенаправление событий. Потому что внешний документ ничего не знает о внутреннем устройстве компонента. С его (внешнего документа) точки зрения, событие происходит на `<user-card>`.

**Перенаправления не происходит если событие берёт начало на явном элементе, который фактически находится в обычном "светлом" DOM.**

Например, если пользователь совершит клик на `<span slot="username">` из кода ниже -- целевой элемент события будет именно этим элементом для обоих обработчиков -- теневого и обычного ("светлого"):

```html run autorun="no-epub" untrusted height=60
<user-card id="userCard">
*!*
  <span slot="username">John Smith</span>
*/!*
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div>
      <b>Имя:</b> <slot name="username"></slot>
    </div>`;

    this.shadowRoot.firstElementChild.onclick =
      e => alert("Внутренний целевой элемент: " + e.target.tagName);
  }
});

userCard.onclick = e => alert(`Внешний целевой элемент: ${e.target.tagName}`);
</script>
```

Если клик произойдёт на `"John Smith"`, то для обоих обработчиков -- внутреннего и внешнего -- целевым элементом будет `<span slot="username">`. Это элемент обычного ("светлого") DOM, так что перенаправление не происходит.

С другой стороны, если клик произойдёт на элементе, происходящем из теневого DOM, например, на `<b>Имя</b>`, то как только всплытие выйдет за пределы теневой DOM-структуры, его `event.target` станет `<user-card>`.

## Всплытие и метод event.composedPath()

Для обеспечения всплытия событий используются развёрнутые DOM-структуры.

Таким образом, если мы имеем явный элемент и событие происходит где-то внутри него, то оно всплывает до `<slot>` и выше.

Полный путь изначального целевого элемента, со всеми корневыми элементами теневого DOM-дерева, можно получить, воспользовавшись методом `event.composedPath()`. Как видно из названия -- это метод, возвращающий путь, полученный после задания композиции.

В примере выше развёрнутое DOM-дерево будет таким:

```html
<user-card id="userCard">
  #shadow-root
    <div>
      <b>Имя:</b>
      <slot name="username">
        <span slot="username">John Smith</span>
      </slot>
    </div>
</user-card>
```


Так что, при клике по `<span slot="username">` вызов метода `event.composedPath()` вернёт массив: [`span`, `slot`, `div`, `shadow-root`, `user-card`, `body`, `html`, `document`, `window`]. Что в точности отражает цепочку родителей от целевого элемента в развёрнутой DOM-структуре после задания композиции.

```warn header="Детали теневого DOM-дерева доступны только для `{mode:'open'}` деревьев"
Если теневое DOM-дерево было создано с `{mode: 'closed'}`, то после задания композиции путь будет начинаться с элемента-"хозяина": `user-card` и дальше вверх по дереву.

Этот метод работает по тем же принципам, что и остальные методы теневого DOM. Внутреннее устройство свёрнутых DOM-деревьев совершенно скрыто.
```


## Свойство: event.composed

Большинство событий успешно всплывают выходя за границы теневого DOM. Но есть некоторые события, которые ведут себя иначе.

Это поведение регулируется с помощью свойства `composed` объекта события. Если оно `true`, то событие пересекает границу. Иначе, оно может быть поймано лишь внутри теневого DOM.

Если вы посмотрите в [спецификации UI Events](https://www.w3.org/TR/uievents), большинство событий имеют `composed: true`:

- `blur`, `focus`, `focusin`, `focusout`,
- `click`, `dblclick`,
- `mousedown`, `mouseup` `mousemove`, `mouseout`, `mouseover`,
- `wheel`,
- `beforeinput`, `input`, `keydown`, `keyup`.

Все события прикосновений и события курсора, также имеют `composed: true`.

Хотя есть и события, имеющие `composed: false`:

- `mouseenter`, `mouseleave` (также не всплывают),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

Эти события могут быть пойманы только на элементах текущего DOM, в котором находится целевой элемент события.

## Генерация событий

Когда мы инициируем сгенерированное событие, чтобы оно всплывало за пределы компонента, нужно установить оба свойства: `bubbles` и `composed` -- со значением `true`.

Например, здесь мы создаём элемент `div#inner` в теневом DOM-дереве элемента `div#outer` и устанавливаем ему два события. Только одно с флагом `composed: true` выйдет за пределы документа:

```html run untrusted height=0
<div id="outer"></div>

<script>
outer.attachShadow({mode: 'open'});

let inner = document.createElement('div');
outer.shadowRoot.append(inner);

/*
div(id=outer)
  #shadow-dom
    div(id=inner)
*/

document.addEventListener('test', event => alert(event.detail));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
*!*
  composed: true,
*/!*
  detail: "composed"
}));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
*!*
  composed: false,
*/!*
  detail: "not composed"
}));
</script>
```

## Итого

Только те события пересекают границы теневого DOM, чей флаг `composed` установлен в значение `true`.

У большинства встроенных событий стоит `composed: true`, как и описано в соответствующих спецификациях:

- UI Events <https://www.w3.org/TR/uievents>.
- Touch Events <https://w3c.github.io/touch-events>.
- Pointer Events <https://www.w3.org/TR/pointerevents>.
- ...И так далее.

У некоторых встроенных событий все жё стоит `composed: false`:

- `mouseenter`, `mouseleave` (также не всплывают),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

Эти события могут быть пойманы только на элементах, принадлежащих текущему DOM-дереву.

Если мы инициируем `CustomEvent`, то нам определённо нужно поставить флаг `composed: true`.

Обратите внимание, что в случае вложенных компонентов, события с заданной композицией всплывают через границы всего теневого DOM. Поэтому, если событие предназначено только для непосредственного ближайшего компонента, то мы также должны инициировать событие на теневом элементе-"хозяине". Иначе оно выйдет за пределы своего теневого DOM.
