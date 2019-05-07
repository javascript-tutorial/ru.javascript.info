# Планирование: setTimeout and setInterval

Вы можете вызвать функцию не в данный момент, а позже в определенное время. Это называется "планирование вызова".

Для этого существуется два метода:

- `setTimeout` позволяет вызвать функцию **один раз** через определенный интервал времени.
- `setInterval` позволяет вызывать функцию **постоянно** через определенный интервал времени.

Эти методы не являюся частью спецификации JavaScript. Но большинство сред выполнения JS-кода имеют внутренний планировщик и предоставляют доступ к этим методам. В частности, они поддерживаются во всех браузерах и Node.js.


## setTimeout

Синтаксис:

```js
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
```

Параметры:

`func|code`
: функция или строка кода для выполнения.
В большинстве случаев, это функция. Так уже давно сложилось, что код может быть передан в строке, но это не рекомендуется.

`delay`
: Задержка перед запуском в миллисекундах (1000 мс = 1 с). Значение по-умолчанию 0.

`arg1`, `arg2`...
: аргументы, передаваемые в функцию (не поддерживается в IE9-)

Например, данный код вызывает `sayHi()` спустя одну секунду:

```js run
function sayHi() {
  alert('Привет');
}

*!*
setTimeout(sayHi, 1000);
*/!*
```

С аргументами:

```js run
function sayHi(phrase, who) {
  alert( phrase + ', ' + who );
}

*!*
setTimeout(sayHi, 1000, "Привет", "Джон"); // Привет, Джон
*/!*
```

Если первый аргумент является строкой, то JavaScript создаст из нее функцию.

Это также будет работать:

```js run no-beautify
setTimeout("alert('Привет')", 1000);
```

Но использование строк не реккомендуется. Вместо этого используйте функции. Например, так:

```js run no-beautify
setTimeout(() => alert('Привет'), 1000);
```

````smart header="Передать функцию, но не выполнять ее"
Начинающие разработчики иногда ошибаются, добавляя скобки `()` после функции:

```js
// не правильно!
setTimeout(sayHi(), 1000);
```
Это не работает, потому что `setTimeout` ожидает ссылку на функцию. Здесь `sayHi()` запускает выполнение функции и *результат выполнения* отправляется в `setTimeout`. В нашем случае результатом выполнения `sayHi()` является `undefined` (так как функция ничего не возвращает), поэтому и нечего планировать.
````

### Отмена через clearTimeout

Вызов `setTimeout` вызывает "идентификатор таймера" `timerId`, который можно использовать для отмены выполнения.

Синтаксис для отмены:

```js
let timerId = setTimeout(...);
clearTimeout(timerId);
```

В коде ниже мы планируем вызов функции и затем отменяем его (просто передумали). В результате ничего не происходит:

```js run no-beautify
let timerId = setTimeout(() => alert("ничего не происходит"), 1000);
alert(timerId); // идентификатор таймера

clearTimeout(timerId);
alert(timerId); // тот же идентификатор (не принимает значение null после отмены)
```

Как мы видим в результате вывода `alert`, в браузере идентификатором таймера является число. В других средах это может быть что-то еще. Например, Node.js возвращает объект таймера с дополнительными методами.

Повторюсь, что нет единой спецификации на эти методы, поэтому такое поведение является нормальным.

Для браузеров таймеры описаны в [разделе таймеров](https://www.w3.org/TR/html5/webappapis.html#timers) стандарта HTML5.

## setInterval

Метод `setInterval` имеет какой же синтаксис как `setTimeout`:

```js
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
```

Все аргументы имеют такое же значение. Но отличие этого метода от `setTimeout` в том, что функция запускается не один раз, а периодически через указанный интервал времени.

Чтобы остановить дальнейшее выполнение функции необходимо вызвать `clearInterval(timerId)`.

Следующий пример выводит сообщение каждые 2 секунды. Через 5 секунд вывод прекращается:

```js run
// повторить с интервалом 2 секунды
let timerId = setInterval(() => alert('tick'), 2000);

// остановить вывод через 5 секунд
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
```

```smart header="Modal windows freeze time in Chrome/Opera/Safari"
В браузерах IE и Firefox внутренний счетчик продолжает подсчет времени после показа `alert/confirm/prompt`, но в Chrome, Opera и Safari внутренний счетчик в это время останаливается.

Если выполните код ниже и не закроете окно `alert` в течение некоторого времени, тогда в Firefox/IE следующее окно `alert` появится как только закроется первое (2 секунды после прошлого вызова), а в Chrome/Opera/Safari -- спустя 2 секунды после закрытия (таймер не работал во время первого `alert`).
```

## Рекурсивный setTimeout

Есть два способа запускать что-то регулярно.

Один из них `setInterval`. Другим является рекурсивный `setTimeout`. Например:

```js
/** вместо:
let timerId = setInterval(() => alert('tick'), 2000);
*/

let timerId = setTimeout(function tick() {
  alert('tick');
*!*
  timerId = setTimeout(tick, 2000); // (*)
*/!*
}, 2000);
```

Метод `setTimeout` выше планирует следующий вызов прямо после окончания текущего `(*)`.

Рекурсивный `setTimeout` более гибкий метод, чем `setInterval`. Таким образом, следующий вызов может быть задан по-разному, в зависимости от результатов текущего.

Например, необходимо написать сервис, который отправляет запрос для получения данных на сервер каждые 5 секунд, но если сервер перегружен, то необходимо увеличить интревал запросов до 10, 20, 40 секунд...
Вот псевдокод:
```js
let delay = 5000;

let timerId = setTimeout(function request() {
  ...отправить запрос...

  if (ошибка запроса из-за перегрузки сервера) {
    // увеличить интервал для следующего запроса
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
```


И если мы постоянно получаем ресурсоемкие задачи, то затем можем измерить время, затраченное на выполнение, и спланировать следующий вызов раньше или позже.

**Рекурсивный `setTimeout` гарантирует задержку между извлечениями, `setInterval` -- нет.**

Сравним два фрагмента кода. Первый использует `setInterval`:

```js
let i = 1;
setInterval(function() {
  func(i);
}, 100);
```

Второй использует рекурсивный `setTimeout`:

```js
let i = 1;
setTimeout(function run() {
  func(i);
  setTimeout(run, 100);
}, 100);
```

Для `setInterval` внутренний планировщик выполнит `func(i)` каждые 100 мс:

![](setinterval-interval.png)

Обратили внимание?

**Реальная задержка между `func` для `setInterval` меньше, чем видно в коде!**

Это нормально, потому что время, затраченное на выполнение `func`, "потребляет" часть интервала времени.

Вполне возможно, что выполнение `func` окажется дольше, чем мы ожидали, и займет более 100 мс.

В данном случае движок ждет окончания выполнения `func` и затем проверяет планировщик и, если время истекло, *немедленно* запускает его снова.

В крайнем случае, если функция всегда выполняется дольше, чем задержка `delay`, то в таком случае вызовы будут выполняться без задержек вовсе.

Ниже представлено изображение, показывающее процесс работы рекурсивного `setTimeout`:

![](settimeout-interval.png)

**Рекурсивный`setTimeout` гарантирует фиксированную задержку (здесь 100 мс).**

Это потому, что новый вызов планируется в конце предыдущего.

````smart header="Сборщик мусора"
Когда функция передается в `setInterval/setTimeout`, на нее создается внутренняя ссылка и сохраняется в планировщике. Это предотвращает попадание функции в сборщик муссора, даже если на нее нет других ссылок.

```js
// функция остается в памяти до тех пор, пока планировщик обращается к ней
setTimeout(function() {...}, 100);
```

Для `setInterval` функция остается в памяти до тех, пока не будет вызван `clearInterval`.

Это сайд—эффект. Функция ссылается на внешнее лексическое окружение, поэтому пока она существует, внешние переменные существуют тоже. Они могут больше памяти, чем сама функция. hey may take much more memory than the function itself. Поэтому если нет больше необходимости планирования вызова функции, то лучше отменить его, даже если он очень маленький.
````

## setTimeout(...,0)

Особый вариант использования: `setTimeout(func, 0)` или просто `setTimeout(func)`.

Это планирование вызова `func` настолько быстро, насколько это возможно. Но планировщик будет вызывать ее только после завершения текущего кода.

Так вызов функции запланировал сразу после выполнения текущего кода. Другими словами, *асинхронно*.

Например, этот код выводит "Hello" и затем сразу "World":

```js run
setTimeout(() => alert("World"));

alert("Hello");
```

Первая строка "помещает вызов в календарь через 0 мс". Но планировщик "проверит календарь" после того, как текущий код завершится. Поэтому `"Hello"` выводится первым, а `"World"` после него.

### Разделение ресурсоемких задач

Рассмотрим вариант разделения ресурсоемких задача при помощи `setTimeout`.

Например, скрипт подсветки синтаксиса (используется для изменения цвета кода в примерах на данной страницы) довольно прожорлив. Для подсветки кода он выполняет анализ, создает много цветных элементов, добавляет их в документ -- для большого текста это требует значительных ресурсов. Это может даже привести к "зависанию" браузера, что недопустимо.

Но мы можем разделить длинный текст на части. Обрабатываем первые 100 строк, планируем следующие 100 строк кода с помощью `setTimeout(..., 0)` и т.д.

Для ясности рассмотрим более простой пример. Имеем функцию, которая ведет счет от `1` до `1000000000`.

Если запустить ее, то процессор на время зависнет. Это хорошо заметно на серверном JS. Если запустить код в браузере и попробовать кликнуть на другие кнопки на странице, то вы увидите, что весь JavaScript фактически приостановлен и никакие другие действия не работают, пока он не завершится.

```js run
let i = 0;

let start = Date.now();

function count() {

  // выполнить тяжелую работы
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  alert("Выполнено в " + (Date.now() - start) + ' мс');
}

count();
```

Браузер даже может показать предупреждение, что "скрипт выполняется слишком долго" (надеюсь этого не произойдет, потому что число не очень большое).

Разделим задание при помощи вложенного `setTimeout`:

```js run
let i = 0;

let start = Date.now();

function count() {

  // сделать кусок тяжелой работы (*)
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Выполнено в " + (Date.now() - start) + ' мс');
  } else {
    setTimeout(count); // планируем новый вызов (**)
  }

}

count();
```

Теперь интерфейс в браузере польностью доступен с течение всего процесса "подсчета".

Мы делаем часть работы `(*)`:

1. Первый запуск: `i=1...1000000`.
2. Второй: `i=1000001..2000000`.
3. ... и т.д., пока `while` проверяет делится ли `i` ровно на `1000000`.

Затем следующиый вызов планируется в `(**)` если мы еще не закончили.

Задержки между выполнениями `count` обеспечивают достаточно "воздуха" для движка JavaScript, чтобы делать что-то еще и реагировать на другие действия пользователей.

The notable thing is that both variants -- with and without splitting the job by `setTimeout` -- are comparable in speed. There's no much difference in the overall counting time.

To make them closer, let's make an improvement.

We'll move the scheduling in the beginning of the `count()`:

```js run
let i = 0;

let start = Date.now();

function count() {

  // move the scheduling at the beginning
  if (i < 1e9 - 1e6) {
    setTimeout(count); // schedule the new call
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  }

}

count();
```

Now when we start to `count()` and know that we'll need to `count()` more, we schedule that immediately, before doing the job.

If you run it, it's easy to notice that it takes significantly less time.

````smart header="Minimal delay of nested timers in-browser"
In the browser, there's a limitation of how often nested timers can run. The [HTML5 standard](https://www.w3.org/TR/html5/webappapis.html#timers) says: "after five nested timers, the interval is forced to be at least four milliseconds.".

Let's demonstrate what it means with the example below. The `setTimeout` call in it re-schedules itself after `0ms`. Each call remembers the real time from the previous one in the `times` array. What do the real delays look like? Let's see:

```js run
let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // remember delay from the previous call

  if (start + 100 < Date.now()) alert(times); // show the delays after 100ms
  else setTimeout(run); // else re-schedule
});

// an example of the output:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
```

First timers run immediately (just as written in the spec), and then the delay comes into play and we see `9, 15, 20, 24...`.

That limitation comes from ancient times and many scripts rely on it, so it exists for historical reasons.

For server-side JavaScript, that limitation does not exist, and there exist other ways to schedule an immediate asynchronous job, like [process.nextTick](https://nodejs.org/api/process.html) and [setImmediate](https://nodejs.org/api/timers.html) for Node.js. So the notion is browser-specific only.
````

### Allowing the browser to render

Another benefit for in-browser scripts is that they can show a progress bar or something to the user. That's because the browser usually does all "repainting" after the script is complete.

So if we do a single huge function then even if it changes something, the changes are not reflected in the document till it finishes.

Here's the demo:
```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {
    for (let j = 0; j < 1e6; j++) {
      i++;
      // put the current i into the <div>
      // (we'll talk more about innerHTML in the specific chapter, should be obvious here)
      progress.innerHTML = i;
    }
  }

  count();
</script>
```

If you run it, the changes to `i` will show up after the whole count finishes.

And if we use `setTimeout` to split it into pieces then changes are applied in-between the runs, so this looks better:

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // do a piece of the heavy job (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e9) {
      setTimeout(count);
    }

  }

  count();
</script>
```

Now the `<div>` shows increasing values of `i`.

## Итого

- Методы `setInterval(func, delay, ...args)` и `setTimeout(func, delay, ...args)` позволяют выполнять `func` регулярно или только один раз после задержки `delay`, заданной в мс.
- Для отмены выполнения необходимо вызвать `clearInterval/clearTimeout` со значением, которое возвращают методы `setInterval/setTimeout`.
- Вложенный вызов `setTimeout` является более гибкой альтернативой `setInterval`. Также он может гарантировать минимальное время *между* выполнениями.
- Планирование с нулевой задержкой `setTimeout(...,0)` используется для вызовов, которые должны быть исполнены "как можно скорее, после завершения исполнения текущего кода".

Некоторые случаи использования `setTimeout(...,0)`:
- разделить ресурсоемкие задачи на части, чтобы скрипт не "зависал",
- позволить браузеру сделать что-то еще, пока идет процесс (отрисовка статуса загрузки).

Обратите внимание, что все методы планирования не дают *гарантию* точности задержки. Поэтому не стоит полагаться на это в запланированном коде.

Например, таймер в браузере может замедляться по многим причинам:
- Перегружен процессор.
- Вкладка браузера в фоновом режиме.
- Работа ноутбука от аккумулятора.

Все это может увеличивать минимальное временное разрешение (минимальная задержка) до 300 или даже 1000 мс в зависимости от браузера и настроек.
