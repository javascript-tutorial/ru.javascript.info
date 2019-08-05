
# Событийный цикл: микрозадачи и макрозадачи

Поток выполнения в браузере, равно как и в Node.js, основан на *событийном цикле*.

Понимание работы событийного цикла важно для оптимизаций, иногда для правильной архитектуры.

В этой главе мы сначала разберём теорию, а затем рассмотрим её практическое применение.

## Событийный цикл

Идея *событийного цикла* очень проста. Есть бесконечный цикл, в котором движок JavaScript ожидает задачи, исполняет их, и снова ожидает появления новых.

<<<<<<< HEAD
Общий алгоритм движка:

1. Пока есть задачи:
    - выполнить их, начиная с самой старой
2. Бездействовать до появления новой задачи, а затем перейти к пункту 1

Это формализация того, что мы наблюдаем, просматривая веб-страницу. Движок JavaScript большую часть времени ничего не делает и работает, только если требуется исполнить скрипт/обработчик или обработать событие.
=======
The general algorithm of the engine:

1. While there are tasks:
    - execute them, starting with the oldest task.
2. Sleep until a task appears, then go to 1.

That's a formalization for what we see when browsing a page. JavaScript engine does nothing most of the time, only runs if a script/handler/event activates.

Examples of tasks:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Примеры задач:

-  Когда загружается внешний скрипт `<script src="...">`, то задача - это выполнение этого скрипта.
-  Когда пользователь двигает мышь, задача - сгенерировать событие `mousemove` и выполнить его обработчики.
-  Когда истечёт таймер, установленный с помощью `setTimeout(func, ...)`, задача - это выполнение функции `func`
-  И так далее.

Задачи поступают на выполнение -- движок выполняет их -- затем ожидает новые задачи (во время ожидания практически не нагружая процессор компьютера)

Может так случиться, что задача поступает, когда движок занят чем-то другим, тогда она ставится в очередь.

Очередь, которую формируют такие задачи, называют "очередью макрозадач" (macrotask queue, термин v8).

![](eventLoop.svg)

<<<<<<< HEAD
Например, когда движок занят выполнением скрипта, пользователь может передвинуть мышь, тем самым вызвав появление события `mousemove`, или может истечь таймер, установленный `setTimeout` и т.п. Эти задачи формируют очередь, как показано на иллюстрации выше.
=======
Tasks from the queue are processed on "first come – first served" basis. When the engine browser is done with the `script`, it handles `mousemove` event, then `setTimeout` handler, and so on.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Задачи из очереди исполняются по правилу "первым пришел - первым ушёл". Когда браузер заканчивает выполнение скрипта, он обрабатывает событие `mousemove`, затем выполняет обработчик, заданный `setTimeout`, и так далее.

<<<<<<< HEAD
Пока что всё просто, не правда ли?

Отметим две детали:
1.  Рендеринг (отрисовка страницы) никогда не происходит во время выполнения задачи движком. Не имеет значение сколь долго выполняется задача. Изменения в DOM отрисовываются только после того, как задача выполнена.
2.  Если задача выполняется очень долго, то браузер не может выполнять другие задачи, обрабатывать пользовательские события, поэтому спустя некоторое время браузер предлагает "убить" долго выполняющуюся задачу. Такое возможно, когда в скрипте много сложных вычислений или ошибка, ведущая к бесконечному циклу.

Это была теория. Теперь давайте взглянем, как можно применить эти знания.

## Пример 1: разбиение "тяжёлой" задачи.
=======
Two more details:
1. Rendering never happens while the engine executes a task. Doesn't matter if the task takes a long time. Changes to DOM are painted only after the task is complete.
2. If a task takes too long, the browser can't do other tasks, process user events, so after a time it raises an alert like "Page Unresponsive" and suggesting to kill the task with the whole page. That happens when there are a lot of complex calculations or a programming error leading to infinite loop.

That was a theory. Now let's see how we can apply that knowledge.

## Use-case 1: splitting CPU-hungry tasks
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Допустим, у нас есть задача, требующая значительных ресурсов процессора.

Например, подсветка синтаксиса (используется для выделения цветом участков кода на этой странице) -- довольно процессороёмкая задача. Для подсветки кода надо выполнить синтаксический анализ, создать много элементов для цветового выделения, добавить их в документ -- для большого текста это требует значительных ресурсов.

<<<<<<< HEAD
Пока движок занят подсветкой синтаксиса, он не может делать ничего, связанного с DOM, не может обрабатывать пользовательские события и т.д. Возможно даже "подвисание" браузера, что совершенно неприемлемо.

Мы можем избежать этого, разбив задачу на части. Сделать подсветку для первых 100 строк, затем запланировать `setTimeout` (с нулевой задержкой) разметку следующих 100 строк, и т.д.
=======
While the engine is busy with syntax highlighting, it can't do other DOM-related stuff, process user events, etc. It may even cause the browser to "hang" for a bit, which is unacceptable.

We can evade problems by splitting the big task into pieces. Highlight first 100 lines, then schedule `setTimeout` (with zero-delay) another 100 lines, and so on.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Чтобы продемонстрировать такой подход, давайте будем использовать для простоты функцию, которая считает от `1` до `1000000000`.

Если вы запустите код ниже, движок "зависнет" на некоторое время. Для серверного JS это будет явно заметно, а если вы будете выполнять этот код в браузере, то попробуйте понажимать другие кнопки на странице -- вы заметите, что никакие другие события не обрабатываются до завершения функции счёта.

```js run
let i = 0;

let start = Date.now();

function count() {

  // делаем тяжёлую работу
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  alert("Done in " + (Date.now() - start) + 'ms');
}

count();
```

<<<<<<< HEAD
Браузер может даже показать сообщение "скрипт выполняется слишком долго".
=======
The browser may even show "the script takes too long" warning.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Давайте разобьём задачу на части, воспользовавшись вложенным `setTimeout`:

```js run
let i = 0;

let start = Date.now();

function count() {

  // делаем часть тяжелой работы (*)
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count); // планируем новый вызов (**)
  }

}

count();
```

Теперь интерфейс браузера полностью работоспособен во время выполнения "счёта".

Один вызов `count` делает часть работы `(*)`, а затем, если необходимо, планирует свой очередной запуск `(**)`:

1.  Первое выполнение производит счёт: i=1...1000000.
2.  Второе выполнение производит счёт: i=1000001..2000000.
3.  ...и так далее.

Теперь если новая сторонняя задача (например, событие `onclick`) появляется, пока движок занят выполнением 1-й части, то она становится в очередь, и затем выполняется, когда 1-я часть завершена, перед следующей частью. Периодические возвраты в событийный цикл между запусками `count` дают движку достаточно "воздуха", чтобы сделать что-то ещё, отреагировать на действия пользователя.

Отметим, что оба варианта -- с разбиением задачи с помощью `setTimeout` и без -- сопоставимы по скорости выполнения. Нет большой разницы в общем времени счёта.

Чтобы сократить разницу ещё сильнее, давайте немного улучшим наш код.

Мы перенесём планирование очередного вызова в начало `count()`:

```js run
let i = 0;

let start = Date.now();

function count() {

  // перенесём планирование очередного вызова в начало
  if (i < 1e9 - 1e6) {
    setTimeout(count); // запланировать новый вызов
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

Теперь, когда мы начинаем выполнять `count()` и видим, что потребуется выполнить `count()` ещё раз, мы планируем этот вызов немедленно, перед выполнением работы.

Если вы запустите этот код, то легко заметите, что он требует значительно меньше времени.

Почему?

Всё просто: как вы помните, в браузере есть минимальная задержка в 4 миллисекунды при множестве вложенных вызовов `setTimeout`. Даже если мы указываем задержку `0`, на самом деле она будет равна `4 мс` (или чуть больше). Поэтому чем раньше мы запланируем выполнение - тем быстрее выполнится код.

Итак, мы разбили ресурсоёмкую задачу на части - теперь она не блокирует пользовательский интерфейс, причём почти без потерь в общем времени выполнения.

<<<<<<< HEAD
## Пример 2: индикация прогресса
=======
Finally, we've split a CPU-hungry task into parts - now it doesn't block the user interface. And its overall execution time isn't much longer.

## Use case 2: progress indication
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Ещё одно преимущество разделения на части крупной задачи в браузерных скриптах - это возможность показывать индикатор выполнения.

Обычно браузер отрисовывает содержимое страницы после того, как заканчивается выполнение текущего кода. Не имеет значения насколько долго выполняется задача. Изменения в DOM отображаются только после её завершения.

С одной стороны, это хорошо, потому что наша функция может создавать много элементов, добавлять их по одному в документ и изменять их стили -- пользователь не увидит "промежуточного", незаконченного состояния. Это важно, верно?

В примере ниже, изменения `i` не будут заметны, пока функция не завершится, поэтому мы увидим только последнее значение `i`:


```html run
<div id="progress"></div>

<script>

  function count() {
    for (let i = 0; i < 1e6; i++) {
      i++;
      progress.innerHTML = i;
    }
  }

  count();
</script>
```

...Но, возможно, мы хотим что-нибудь показать во время выполнения задачи, например, индикатор выполнения.

Если мы разобьём тяжёлую задачу на части, используя `setTimeout`, то изменения индикатора будут отрисованы в промежутках между частями.

Так будет красивее:

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // сделать часть крупной задачи (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e7) {
      setTimeout(count);
    }

  }

  count();
</script>
```

Теперь `<div>` показывает растущее значение `i` - это своего рода индикатор выполнения.


<<<<<<< HEAD
## Пример 3: делаем что-нибудь после события
=======
## Use case 3: doing something after the event
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

В обработчике события мы можем решить отложить некоторые действия, пока событие не "всплывёт" и не будет обработано на всех уровнях. Мы можем добиться этого, обернув код в `setTimeout` с нулевой задержкой.

<<<<<<< HEAD
В главе <info:dispatch-events> мы видели пример: наше событие `menu-open` генерируется через `setTimeout`, чтобы возникло после того, как полностью обработано событие "click".
=======
In the chapter <info:dispatch-events> we saw an example: custom event `menu-open` is dispatched in `setTimeout`, so that it happens after the "click" event is fully handled.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js
menu.onclick = function() {
  // ...

  // создадим наше собственное событие с данными пункта меню, по которому щёлкнули мышью
  let customEvent = new CustomEvent("menu-open", {
    bubbles: true
  });

  // сгенерировать наше событие асинхронно
  setTimeout(() => menu.dispatchEvent(customEvent));
};
```

<<<<<<< HEAD
## Макрозадачи и Микрозадачи

Помимо *макрозадач*, описанных в этой части, существуют *микрозадачи*, упомянутые в главе <info:microtask-queue>.
=======
## Macrotasks and Microtasks
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Микрозадачи приходят только из кода. Обычно они создаются промисами: выполнение обработчика `.then/catch/finally` становится микрозадачей. Микрозадачи также используются "под капотом" `await`, т.к. это форма обработки промиса.

<<<<<<< HEAD
Также есть специальная функция `queueMicrotask(func)`, которая помещает `func` в очередь микрозадач.

**Сразу после каждой *макрозадачи* движок исполняет все задачи из очереди *микрозадач* перед тем, как выполнить следующую макрозадачу или отобразить изменения на странице или сделать что-то ещё.**

Например:
=======
Microtasks come solely from our code. They are usually created by promises: an execution of `.then/catch/finally` handler becomes a microtask. Microtasks are used "under the cover" of `await` as well, as it's another form of promise handling.

There's also a special function `queueMicrotask(func)` that queues `func` for execution in the microtask queue.

**Immediately after every *macrotask*, the engine executes all tasks from *microtask* queue, prior to running any other macrotasks or rendering or anything else.**

For instance, take a look:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js run
setTimeout(() => alert("timeout"));

Promise.resolve()
  .then(() => alert("promise"));

alert("code");
```

<<<<<<< HEAD
Какой здесь будет порядок?
=======
What's going to be the order here?
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

1.  `code` появляется первым, т.к. это обычный синхронный вызов.
2.  `promise` появляется вторым, потому что `.then` проходит через очередь микрозадач и выполняется после текущего синхронного кода.
3.  `timeout` появляется последним, потому что это макрозадача.

<<<<<<< HEAD
Более подробное изображение событийного цикла выглядит так:

![](eventLoop-full.svg)

**Все микрозадачи завершаются до обработки каких-либо событий или рендеринга или перехода к другой макрозадаче.**

Это важно, так как гарантирует, что общее окружение остаётся одним и тем же между микрозадачами - не изменены координаты мыши, не получены новые данные по сети, и т.п.

Если мы хотели бы запустить функцию асинхронно (после текущего кода), но до отображения изменений и до новых событий, мы можем запланировать это через `queueMicrotask`.

Вот пример с индикатором выполнения, похожий на предыдущий, но в этот раз использована функция `queueMicrotask` вместо `setTimeout`. Обратите внимание - отрисовка страницы происходит только в самом конце. Как и в случае обычного синхронного кода.
=======
The richer event loop picture looks like this:

![](eventLoop-full.svg)

**All microtasks are completed before any other event handling or rendering or any other macrotask takes place.**

That's important, as it guarantees that the application environment be basically the same (no mouse coordinate changes, no new network data, etc) between microtasks.

If we'd like to execute a function asynchronously (after the current code), but before changes are rendered or new events, we can schedule it with `queueMicrotask`.

Here's an example with "counting progress bar", similar to the one shown previously, but `queueMicrotask` is used instead of `setTimeout`. You can see that it renders at the very end. Just like the synchronous code:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

    // делаем часть крупной задачи (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e6) {
  *!*
      queueMicrotask(count);
  */!*
    }

  }

  count();
</script>
```

<<<<<<< HEAD
## Итого

Более подробный алгоритм событийного цикла (хоть и упрощенный в сравнении со [спецификацией](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)):

1. Выбрать и исполнить старейшую задачу из очереди *макрозадач* (например, "script").
2. Исполнить все *микрозадачи*:
    - Пока очередь микрозадач не пуста:
          - Выбрать из очереди и исполнить старейшую микрозадачу
3. Отрисовать изменения страницы, если они есть.
4. Если очередь макрозадач пуста - подождать, пока появится макрозадача.
5. Перейти к шагу 1.

Чтобы добавить в очередь новую *макрозадачу*:
- Используйте `setTimeout(f)` с нулевой задержкой.
=======
## Summary

The more detailed algorithm of the event loop (though still simplified compare to the [specification](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)):

1. Dequeue and run the oldest task from the *macrotask* queue (e.g. "script").
2. Execute all *microtasks*:
    - While the microtask queue is not empty:
        - Dequeue and run the oldest microtask.
3. Render changes if any.
4. If the macrotask queue is empty, wait till a macrotask appears.
5. Go to step 1.

To schedule a new *macrotask*:
- Use zero delayed `setTimeout(f)`.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

Этот способ можно использовать для разбиения больших вычислительных задач на части, чтобы браузер мог реагировать на пользовательские события и показывать прогресс выполнения этих частей.

Также это используется в обработчиках событий для отложенного выполнения действия после того, как событие полностью обработано (всплытие завершено).

<<<<<<< HEAD
Для добавления в очередь новой *микрозадачи*:
- Используйте `queueMicrotask(f)`.
- Также обработчики промисов выполняются в рамках очереди микрозадач.
=======
To schedule a new *microtask*
- Use `queueMicrotask(f)`.
- Also promise handlers go through the microtask queue.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

События пользовательского интерфейса и сетевые события в промежутках между микрозадачами не обрабатываются: микрозадачи исполняются непрерывно одна за другой.

<<<<<<< HEAD
Поэтому `queueMicrotask` можно использовать для асинхронного выполнения функции в том же состоянии окружения.
=======
So one may want to `queueMicrotask` to execute a function asynchronously, but within the environment state.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```smart header="Web Workers"
Для длительных тяжёлых вычислений, которые не должны блокировать событийный цикл, мы можем использовать [Web Workers](https://html.spec.whatwg.org/multipage/workers.html).

Это способ исполнить код в другом, параллельном потоке.

Web Workers могут обмениваться сообщениями с основным процессом, но они имеют свои переменные и свой событийный цикл.

Web Workers не имеют доступа к DOM, поэтому основное их применение - вычисления. Они позволяют задействовать нескольких ядер процессора одновременно.
```
