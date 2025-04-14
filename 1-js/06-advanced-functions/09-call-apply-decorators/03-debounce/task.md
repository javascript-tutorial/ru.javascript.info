importance: 5

---

# Декоратор debounce

<<<<<<< HEAD
Результат декоратора `debounce(f, ms)` – это обёртка, которая откладывает вызовы `f`, пока не пройдёт `ms` миллисекунд бездействия (без вызовов, «cooldown period»), а затем вызывает `f` один раз с последними аргументами.

Другими словами, `debounce` – это так называемый секретарь, который принимает «телефонные звонки», и ждёт, пока не пройдет `ms` миллисекунд тишины. И только после этого передает «начальнику» информацию о последнем звонке (вызывает непосредственно `f`).

Например, у нас была функция `f` и мы заменили её на `f = debounce(f, 1000)`.

Затем, если обёрнутая функция вызывается в 0, 200 и 500 мс, а потом вызовов нет, то фактическая `f` будет вызвана только один раз, в 1500 мс. То есть: по истечению 1000 мс от последнего вызова.

![](debounce.svg)

...И она получит аргументы самого последнего вызова, остальные вызовы игнорируются.

Ниже код этого примера (используется декоратор debounce из библиотеки [Lodash](https://lodash.com/docs/4.17.15#debounce)):

```js no-beautify
let f = _.debounce(alert, 1000);

f("a");
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500);

// Обёрнутая в debounce функция ждёт 1000 мс после последнего вызова, а затем запускает: alert("c")
```

Теперь практический пример. Предположим, пользователь набирает какой-то текст, и мы хотим отправить запрос на сервер, когда ввод этого текста будет завершён.

Нет смысла отправлять запрос для каждого набранного символа. Вместо этого мы хотели бы подождать, а затем обработать весь результат.

В браузере мы можем настроить обработчик событий – функцию, которая вызывается при каждом изменении поля для ввода. Обычно обработчик событий вызывается очень часто, для каждого набранного символа. Но если мы воспользуемся `debounce` на 1000мс, то он будет вызван только один раз, через 1000мс после последнего ввода символа.

```online

В этом живом примере обработчик помещает результат в поле ниже, попробуйте:

[iframe border=1 src="debounce" height=200]

Видите? На втором поле вызывается функция, обёрнутая в `debounce`, поэтому его содержимое обрабатывается через 1000мс с момента последнего ввода.
```

Таким образом, `debounce` – это отличный способ обработать последовательность событий: будь то последовательность нажатий клавиш, движений мыши или ещё что-либо.

Он ждёт заданное время после последнего вызова, а затем запускает свою функцию, которая может обработать результат.

Задача — реализовать декоратор `debounce`.

Подсказка: это всего лишь несколько строк, если вдуматься :)
=======
The result of `debounce(f, ms)` decorator is a wrapper that suspends calls to `f` until there's `ms` milliseconds of inactivity (no calls, "cooldown period"), then invokes `f` once with the latest arguments.

In other words, `debounce` is like a secretary that accepts "phone calls", and waits until there's `ms` milliseconds of being quiet. And only then it transfers the latest call information to "the boss" (calls the actual `f`).

For instance, we had a function `f` and replaced it with `f = debounce(f, 1000)`.

Then if the wrapped function is called at 0ms, 200ms and 500ms, and then there are no calls, then the actual `f` will be only called once, at 1500ms. That is: after the cooldown period of 1000ms from the last call.

![](debounce.svg)

...And it will get the arguments of the very last call, other calls are ignored.

Here's the code for it (uses the debounce decorator from the [Lodash library](https://lodash.com/docs/4.17.15#debounce)):

```js
let f = _.debounce(alert, 1000);

f("a");
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500);
// debounced function waits 1000ms after the last call and then runs: alert("c")
```

Now a practical example. Let's say, the user types something, and we'd like to send a request to the server when the input is finished.

There's no point in sending the request for every character typed. Instead we'd like to wait, and then process the whole result.

In a web-browser, we can setup an event handler -- a function that's called on every change of an input field. Normally, an event handler is called very often, for every typed key. But if we `debounce` it by 1000ms, then it will be only called once, after 1000ms after the last input.

```online

In this live example, the handler puts the result into a box below, try it:

[iframe border=1 src="debounce" height=200]

See? The second input calls the debounced function, so its content is processed after 1000ms from the last input.
```

So, `debounce` is a great way to process a sequence of events: be it a sequence of key presses, mouse movements or something else.

It waits the given time after the last call, and then runs its function, that can process the result.

The task is to implement `debounce` decorator.

Hint: that's just a few lines if you think about it :)
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
