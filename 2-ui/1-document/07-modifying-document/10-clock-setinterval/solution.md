Для начала придумаем подходящую HTML/CSS-структуру.

Здесь каждый компонент времени удобно поместить в соответствующий `<span>`:

```html
<div id="clock">
  <span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec">ss</span>
</div>
```

Каждый `span` раскрашивается при помощи CSS.

Функция `update` будет обновлять часы, `setInterval` вызывает её каждую секунду:

```js
function update() {
  let clock = document.getElementById('clock');
*!*
  let date = new Date(); // (*)
*/!*
  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  clock.children[0].innerHTML = hours;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  clock.children[1].innerHTML = minutes;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  clock.children[2].innerHTML = seconds;
}
```

В строке `(*)` каждый раз мы получаем текущую дату. Вызовы `setInterval` не надёжны: они могут происходить с задержками.

Функция `clockStart` для запуска часов:

```js
let timerId;

<<<<<<< HEAD
function clockStart() { // запустить часы
  timerId = setInterval(update, 1000);
=======
function clockStart() { // run the clock  
  if (!timerId) { // only set a new interval if the clock is not running
    timerId = setInterval(update, 1000);
  }
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  update(); // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null; // (**)
}
```

<<<<<<< HEAD
Обратите внимание, что вызов `update()` не только запланирован, но и тут же производится в строке `(*)`. Иначе посетителю пришлось бы ждать до первого выполнения `setInterval`, то есть целую секунду.
=======
Please note that the call to `update()` is not only scheduled in `clockStart()`, but immediately run in the line `(*)`. Otherwise the visitor would have to wait till the first execution of `setInterval`. And the clock would be empty till then.

Also it is important to set a new interval in `clockStart()` only when the clock is not running. Otherways clicking the start button several times would set multiple concurrent intervals. Even worse - we would only keep the `timerID` of the last interval, losing references to all others. Then we wouldn't be able to stop the clock ever again! Note that we need to clear the `timerID` when the clock is stopped in the line `(**)`, so that it can be started again by running `clockStart()`.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
