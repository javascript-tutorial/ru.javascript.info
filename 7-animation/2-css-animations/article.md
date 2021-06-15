# CSS-анимации

<<<<<<< HEAD
CSS позволяет создавать простые анимации без использования JavaScript.

JavaScript может быть использован для управления такими CSS-анимациями. Это позволяет делать более сложные анимации, используя небольшие кусочки кода.
=======
CSS animations make it possible to do simple animations without JavaScript at all.

JavaScript can be used to control CSS animations and make them even better, with little code.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## CSS-переходы [#css-transition]

Идея CSS-переходов проста: мы указываем, что некоторое свойство должно быть анимировано, и как оно должно быть анимировано. А когда свойство меняется, браузер сам обработает это изменение и отрисует анимацию.

<<<<<<< HEAD
Всё что нам нужно, чтобы начать анимацию - это изменить свойство, а дальше браузер сделает плавный переход сам.
=======
That is, all we need is to change the property, and the fluid transition will be done by the browser.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Например, CSS-код ниже анимирует трёх-секундное изменение`background-color`:

```css
.animated {
  transition-property: background-color;
  transition-duration: 3s;
}
```

Теперь, если элементу присвоен класс `.animated`, любое изменение свойства `background-color` будет анимироваться в течение трёх секунд.

Нажмите кнопку ниже, чтобы анимировать фон:

```html run autorun height=60
<button id="color">Нажми меня</button>

<style>
  #color {
    transition-property: background-color;
    transition-duration: 3s;
  }
</style>

<script>
  color.onclick = function() {
    this.style.backgroundColor = 'red';
  };
</script>
```

Существует 4 свойства для описания CSS-переходов:

- `transition-property` -- свойство перехода
- `transition-duration` -- продолжительность перехода
- `transition-timing-function` -- временная функция перехода
- `transition-delay` -- задержка начала перехода

<<<<<<< HEAD
Далее мы рассмотрим их все, а сейчас ещё заметим, что есть также общее свойство `transition`, которое позволяет задать их одновременно в последовательности: `property duration timing-function delay`, а также анимировать несколько свойств одновременно.
=======
We'll cover them in a moment, for now let's note that the common `transition` property allows declaring them together in the order: `property duration timing-function delay`, as well as animating multiple properties at once.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Например, у этой кнопки анимируются два свойства `color` и `font-size` одновременно:

```html run height=80 autorun no-beautify
<button id="growing">Нажми меня</button>

<style>
#growing {
*!*
  transition: font-size 3s, color 2s;
*/!*
}
</style>

<script>
growing.onclick = function() {
  this.style.fontSize = '36px';
  this.style.color = 'red';
};
</script>
```

<<<<<<< HEAD
Теперь рассмотрим каждое свойство анимации по отдельности.

## transition-property

В `transition-property` записывается список свойств, изменения которых необходимо анимировать, например: `left`, `margin-left`, `height`, `color`.

Анимировать можно не все свойства, но [многие из них](http://www.w3.org/TR/css3-transitions/#animatable-properties-). Значение свойства `all` означает "анимируй все свойства".
=======
Now, let's cover animation properties one by one.

## transition-property

In `transition-property`, we write a list of properties to animate, for instance: `left`, `margin-left`, `height`, `color`. Or we could write `all`, which means "animate all properties".

Do note that, there are properties which can not be animated. However, [most of the generally used properties are animatable](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## transition-duration

В `transition-duration` можно определить, сколько времени займёт анимация. Время должно быть задано в [формате времени CSS](http://www.w3.org/TR/css3-values/#time): в секундах `s` или миллисекундах `ms`.

## transition-delay

<<<<<<< HEAD
В `transition-delay` можно определить задержку *перед* началом анимации. Например, если  `transition-delay: 1s`, тогда анимация начнётся через 1 секунду после изменения свойства.

Отрицательные значения также допустимы. В таком случае анимация начнётся с середины. Например, если `transition-duration` равно `2s`, а `transition-delay` -- `-1s`, тогда анимация займёт одну секунду и начнётся с середины.

Здесь приведён пример анимации, сдвигающей цифры от `0` до `9` с использованием CSS-свойства `transform` со значением `translate`:
=======
In `transition-delay` we can specify the delay *before* the animation. For instance, if `transition-delay` is `1s` and `transition-duration` is `2s`, then the animation starts 1 second after the property change and the total duration will be 2 seconds.

Negative values are also possible. Then the animation is shown immediately, but the starting point of the animation will be after given value (time). For example, if `transition-delay` is `-1s` and `transition-duration` is `2s`, then animation starts from the halfway point and total duration will be 1 second. 

Here the animation shifts numbers from `0` to `9` using CSS `translate` property:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

[codetabs src="digits"]

Свойство `transform` анимируется следующим образом:

```css
#stripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
}
```

В примере выше JavaScript-код добавляет класс `.animate` к элементу, после чего начинается анимация:

```js
stripe.classList.add('animate');
```

<<<<<<< HEAD
Можно начать анимацию "с середины", с определённого числа, например, используя отрицательное значение `transition-delay`, соответствующие необходимому числу.
=======
We could also start it from somewhere in the middle of the transition, from an exact number, e.g. corresponding to the current second, using a negative `transition-delay`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Если вы нажмёте на цифру ниже, то анимация начнётся с последней секунды:

[codetabs src="digits-negative-delay"]

<<<<<<< HEAD
JavaScript делает это с помощью нескольких строк кода:
=======
JavaScript does it with an extra line:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
stripe.onclick = function() {
  let sec = new Date().getSeconds() % 10;
*!*
  // например, значение -3s здесь начнут анимацию с третьей секунды
  stripe.style.transitionDelay = '-' + sec + 's';
*/!*
  stripe.classList.add('animate');
};
```

## transition-timing-function

<<<<<<< HEAD
Временная функция описывает, как процесс анимации будет распределён во времени. Будет ли она начата медленно и затем ускорится или наоборот.

На первый взгляд это очень сложное свойство, но оно становится понятным, если уделить ему немного времени.

Это свойство может принимать два вида значений: кривую Безье или количество шагов. Давайте начнём с кривой Безье, как с наиболее часто используемой.
=======
The timing function describes how the animation process is distributed along its timeline. Will it start slowly and then go fast, or vice versa.

It appears to be the most complicated property at first. But it becomes very simple if we devote a bit time to it.

That property accepts two kinds of values: a Bezier curve or steps. Let's start with the curve, as it's used more often.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

### Кривая Безье

<<<<<<< HEAD
Временная функция может быть задана, как [кривая Безье](/bezier-curve) с 4 контрольными точками, удовлетворяющими условиям:

1. Первая контрольная точка: `(0,0)`.
2. Последняя контрольная точка: `(1,1)`.
3. Для промежуточных точек значение `x` должно быть `0..1`, значение `y` может принимать любое значение.
=======
The timing function can be set as a [Bezier curve](/bezier-curve) with 4 control points that satisfy the conditions:

1. First control point: `(0,0)`.
2. Last control point: `(1,1)`.
3. For intermediate points, the values of `x` must be in the interval `0..1`, `y` can be anything.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Синтаксис для кривых Безье в CSS: `cubic-bezier(x2, y2, x3, y3)`. Нам необходимо задать только вторую и третью контрольные точки, потому что первая зафиксирована со значением `(0,0)` и четвёртая - `(1,1)`.

<<<<<<< HEAD
Временная функция описывает то, насколько быстро происходит анимации во времени.

- Ось `x` - это время: `0` - начальный момент, `1` - последний момент `transition-duration`.
- Ось `y` указывает на завершение процесса: `0` - начальное значение свойства, `1` - конечное значение.
=======
The timing function describes how fast the animation process goes.

- The `x` axis is the time: `0` -- the start, `1` -- the end of `transition-duration`.
- The `y` axis specifies the completion of the process: `0` -- the starting value of the property, `1` -- the final value.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Самым простым примером анимации является равномерная анимация с линейной скоростью. Она может быть задана с помощью кривой `cubic-bezier(0, 0, 1, 1)`.

Вот как выглядит эта "кривая":

![](bezier-linear.svg)

...Как мы видим, это прямая линия. Значению времени (`x`) соответствует значение завершённости анимации (`y`), которое равномерно изменяется от `0` к `1`.

В примере ниже поезд "едет" слева направо с одинаковой скоростью (нажмите на поезд):

[codetabs src="train-linear"]

В свойстве `transition` указана следующая кривая Безье:

```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, 0, 1, 1);
  /* JavaScript устанавливает свойство left равным 450px */
}
```

...А как показать замедляющийся поезд?

Мы можем использовать другую кривую Безье: `cubic-bezier(0.0, 0.5, 0.5 ,1.0)`.

Её график:

![](train-curve.svg)

Как видим, анимация начинается быстро: кривая быстро поднимается вверх, и затем все медленнее и медленнее.

Ниже временная функция в действии (нажмите на поезд):

[codetabs src="train"]

CSS:
```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, .5, .5, 1);
  /* JavaScript устанавливает свойство left равным 450px */
}
```

Есть несколько встроенных обозначений кривых Безье: `linear`, `ease`, `ease-in`, `ease-out` и `ease-in-out`.

<<<<<<< HEAD
`linear` это короткая запись для `cubic-bezier(0, 0, 1, 1)` -- прямой линии, которую мы видели раньше.
=======
The `linear` is a shorthand for `cubic-bezier(0, 0, 1, 1)` -- a straight line, which we described above.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Другие названия -- это также сокращения для других `cubic-bezier`:

| <code>ease</code><sup>*</sup> | <code>ease-in</code> | <code>ease-out</code> | <code>ease-in-out</code> |
|-------------------------------|----------------------|-----------------------|--------------------------|
| <code>(0.25, 0.1, 0.25, 1.0)</code> | <code>(0.42, 0, 1.0, 1.0)</code> | <code>(0, 0, 0.58, 1.0)</code> | <code>(0.42, 0, 0.58, 1.0)</code> |
| ![ease, figure](ease.svg) | ![ease-in, figure](ease-in.svg) | ![ease-out, figure](ease-out.svg) | ![ease-in-out, figure](ease-in-out.svg) |

`*` -- используется по умолчанию, если не задана другая временная функция.

Для того, чтобы замедлить поезд, мы можем использовать `ease-out`:

```css
.train {
  left: 0;
  transition: left 5s ease-out;
  /* transition: left 5s cubic-bezier(0, .5, .5, 1); */
}
```

Но получившийся результат немного отличается.

<<<<<<< HEAD
**Кривая Безье может заставить анимацию "выпрыгивать" за пределы диапазона.**

Контрольные точки могут иметь любые значения по оси `y`: отрицательные или сколь угодно большие. В таком случае кривая Безье будет скакать очень высоко или очень низко, заставляя анимацию выходить за её нормальные пределы.
=======
**A Bezier curve can make the animation exceed its range.**

The control points on the curve can have any `y` coordinates: even negative or huge ones. Then the Bezier curve would also extend very low or high, making the animation go beyond its normal range.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

В приведённом ниже примере код анимации:
```css
.train {
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
  /* JavaScript sets left to 400px */
}
```

Свойство `left` будет анимироваться от `100px` до `400px`.

Но когда вы нажмёте на поезд, вы увидите следующее:

- Сначала, поезд поедет *назад*: `left` станет меньше, чем `100px`.
- Затем он поедет вперёд, немного дальше, чем `400px`.
- И затем вернётся назад в значение `400px`.

[codetabs src="train-over"]

<<<<<<< HEAD
Если мы взглянем на кривую Безье из примера, становится понятно поведение поезда.

![](bezier-train-over.svg)

Мы вынесли координату `y` для первой опорной точки ниже нуля и выше единицы для третьей опорной точки, поэтому кривая вышла за пределы "обычного" квадрата. Значения `y` вышли из "стандартного" диапазона `0..1`.

Как мы знаем, ось `y` измеряет "завершённость процесса анимации". Значение `y = 0` соответствует начальному значению анимируемого свойства и `y = 1` -- конечному значению. Таким образом, `y<0` делает значение свойства `left` меньше начального значения и `y>1` -- больше конечного.
=======
Why it happens is pretty obvious if we look at the graph of the given Bezier curve:

![](bezier-train-over.svg)

We moved the `y` coordinate of the 2nd point below zero, and for the 3rd point we made it over `1`, so the curve goes out of the "regular" quadrant. The `y` is out of the "standard" range `0..1`.

As we know, `y` measures "the completion of the animation process". The value `y = 0` corresponds to the starting property value and `y = 1` -- the ending value. So values `y<0` move the property beyond the starting `left` and `y>1` -- past the final `left`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Это, конечно, "мягкий" вариант. Если значение `y` будут `-99` и `99`, то поезд будет гораздо сильнее "выпрыгивать" за пределы.

<<<<<<< HEAD
Как сделать кривую Безье необходимую для конкретной задачи? Существует множество инструментов, например можно использовать с сайта <http://cubic-bezier.com/>.
=======
But how do we make a Bezier curve for a specific task? There are many tools. For instance, we can do it on the site <http://cubic-bezier.com/>.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

### Шаги

<<<<<<< HEAD
Временная функция `steps(количество шагов[, start/end])` позволяет разделить анимацию на шаги.
=======
The timing function `steps(number of steps[, start/end])` allows splitting an animation into steps.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Давайте рассмотрим это на уже знакомом нам примере с цифрами.

Ниже представлен список цифр, без какой-либо анимации, который мы будем использовать в качестве основы:

[codetabs src="step-list"]

Давайте сделаем так, чтобы цифры двигались не плавно, а появлялись одна за другой раздельно. Для этого скроем все что находится за красным "окошком" и будем сдвигать список влево по шагам.

Всего будет 9 шагов, один шаг для каждой цифры:

```css
#stripe.animate  {
  transform: translate(-90%);
  transition: transform 9s *!*steps(9, start)*/!*;
}
```

В действии:

[codetabs src="step"]

Первый аргумент временной функции `steps(9, start)` -- количество шагов. Трансформация будет разделена на 9 частей (10% каждая). Временной интервал также будет разделён на 9 частей, таким образом свойство `transition: 9s` обеспечивает нам 9 секунду анимации, что даёт по одной секунде на цифру.

Вторым аргументом является одно из ключевых слов: `start` или `end`.

<<<<<<< HEAD
`start` -- означает, что в начале анимации нам необходимо перейти на первый шаг немедленно.
=======
The `start` means that in the beginning of animation we need to make the first step immediately.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Мы можем наблюдать это во время анимации: когда пользователь нажимает на цифру, значение меняется на `1` (первый шаг) сразу и в следующий раз меняется уже в начале следующей секунды.

Анимация будет происходить так:

- `0s` -- `-10%` (первое изменение в начале первой секунды, сразу после нажатия)
- `1s` -- `-20%`
- ...
- `8s` -- `-80%`
- (на протяжении последней секунды отображается последнее значение).

Альтернативное значение `end` означало бы, что изменения нужно применять не в начале, а в конце каждой секунды.

Анимация будет происходить так:

- `0s` -- `0`
- `1s` -- `-10%` (первое изменение произойдёт в конце первой секунды)
- `2s` -- `-20%`
- ...
- `9s` -- `-90%`

<<<<<<< HEAD
Пример `step(9, end)` в действии (обратите внимание на паузу между первым изменением цифр):
=======
Here's `steps(9, end)` in action (note the pause between the first digit change):
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

[codetabs src="step-end"]

Также есть сокращённые значения:

- `step-start` -- то же самое, что `steps(1, start)`. Оно означает, что анимация начнётся сразу и произойдёт в один шаг. Таким образом она начнётся и завершится сразу, как будто и нет никакой анимации.
- `step-end` -- то же самое, что `steps(1, end)`: выполнит анимацию за один шаг в конце `transition-duration`.

Такие значения используются редко, потому что это не совсем анимация, а точнее будет сказать одношаговые изменения.

## Событие transitionend

Когда завершается анимация, срабатывает событие `transitionend`.

Оно широко используется для выполнения действий после завершения анимации, а также для создания последовательности анимаций.

<<<<<<< HEAD
Например, корабль в приведённом ниже примере начинает плавать туда и обратно по клику, каждый раз все дальше и дальше вправо:

[iframe src="boat" height=300 edit link]

Анимация начинается с помощью функции `go`, которая вызывается каждый раз снова, когда переход заканчивается и меняется направление:
=======
For instance, the ship in the example below starts to sail there and back when clicked, each time farther and farther to the right:

[iframe src="boat" height=300 edit link]

The animation is initiated by the function `go` that re-runs each time the transition finishes, and flips the direction:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
boat.onclick = function() {
  //...
  let times = 1;

  function go() {
    if (times % 2) {
<<<<<<< HEAD
      // плыть вправо
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // плыть влево
=======
      // sail to the right
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // sail to the left
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
      boat.classList.add('back');
      boat.style.marginLeft = 100 * times - 200 + 'px';
    }

  }

  go();

  boat.addEventListener('transitionend', function() {
    times++;
    go();
  });
};
```

<<<<<<< HEAD
Объект события `transitionend` содержит ряд полезных свойства:
=======
The event object for `transitionend` has a few specific properties:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

`event.propertyName`
: Имя свойства, анимация которого завершилась. Может быть полезным, если мы анимируем несколько свойств.

`event.elapsedTime`
: Время (в секундах), которое заняла анимация, без учёта `transition-delay`.

## Ключевые кадры

Мы можем объединить несколько простых анимаций вместе, используя CSS-правило `@keyframes`.

<<<<<<< HEAD
Оно определяет "имя" анимации и правила: что, когда и где анимировать. После этого можно использовать свойство `animation`, чтобы назначить анимацию на элемент и определить её дополнительные параметры.
=======
It specifies the "name" of the animation and rules - what, when and where to animate. Then using the `animation` property, we can attach the animation to the element and specify additional parameters for it.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Ниже приведён пример с пояснениями:

```html run height=60 autorun="no-epub" no-beautify
<div class="progress"></div>

<style>
*!*
  @keyframes go-left-right {        /* объявляем имя анимации: "go-left-right" */
    from { left: 0px; }             /* от: left: 0px */
    to { left: calc(100% - 50px); } /* до: left: 100%-50px */
  }
*/!*

  .progress {
*!*
    animation: go-left-right 3s infinite alternate;
    /* применить анимацию "go-left-right" на элементе
       продолжительностью 3 секунды
       количество раз: бесконечно (infinite)
       менять направление анимации каждый раз (alternate)
    */
*/!*

    position: relative;
    border: 2px solid green;
    width: 50px;
    height: 20px;
    background: lime;
  }
</style>
```

Существует множество статей про `@keyframes`, а также [детальная спецификация](https://drafts.csswg.org/css-animations/).

<<<<<<< HEAD
Скорее всего, вам нечасто понадобится `@keyframes`, разве что на вашем сайте все постоянно в движении.
=======
You probably won't need `@keyframes` often, unless everything is in constant motion on your sites.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Итого

<<<<<<< HEAD
CSS-анимации позволяют плавно, или не очень, менять одно или несколько свойств.
=======
CSS animations allow smoothly (or not) animated changes of one or multiple CSS properties.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Они хорошо решают большинство задач по анимации. Также мы можем реализовать анимации через JavaScript, более подробно об этом - в следующей главе.

Ограничения CSS-анимаций в сравнении с JavaScript-анимациями:

<<<<<<< HEAD
```compare plus="CSS-анимации" minus="JavaScript-анимации"
+ Простые анимации делаются просто.
+ Быстрые и не создают нагрузку на CPU.
- JavaScript-анимации более гибкие. В них может присутствовать любая анимационная логика, как например "взорвать" элемент.
- Можно изменять не только свойства. Мы можем создавать новые элементы с помощью JavaScript для анимации.
```

Большинство анимаций может быть реализовано с использованием CSS, как описано в этой главе. А событие `transitionend` позволяет запускать JavaScript после анимации, поэтому CSS-анимации прекрасно интегрируются с кодом.
=======
```compare plus="CSS animations" minus="JavaScript animations"
+ Simple things done simply.
+ Fast and lightweight for CPU.
- JavaScript animations are flexible. They can implement any animation logic, like an "explosion" of an element.
- Not just property changes. We can create new elements in JavaScript as part of the animation.
```

The majority of animations can be implemented using CSS as described in this chapter. And the `transitionend` event allows JavaScript to be run after the animation, so it integrates fine with the code.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Но в следующей главе мы рассмотрим некоторые JavaScript-анимации, которые позволяют решать более сложные задачи.
