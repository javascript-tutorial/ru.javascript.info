libs:
  - lodash

---

# Привязка контекста к функции

При передаче методов объекта в качестве колбэков, например для `setTimeout`, возникает известная проблема - потеря `this`.

В этой главе мы посмотрим, как можно её решать.

## Потеря "this"

Мы уже видели примеры потери `this`. Как только метод передается отдельно от объекта - `this` теряется.

Вот как это может произойти с `setTimeout`:

```js run
let user = {
  firstName: "Вася",
  sayHi() {
    alert(`Привет, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Привет, undefined!
*/!*
```

При запуске этого кода мы видим, что вызов `this.firstName` возвращает не "Вася", а `undefined`!

Это произошло потому, что `setTimeout` получил функцию `sayHi`, отдельно от объекта `user` (именно здесь функция и потеряла контекст). То есть последняя строка может быть переписана как:

```js
let f = user.sayHi;
setTimeout(f, 1000); // контекст user потеряли
```

Метод `setTimeout` в браузере имеет особенность: он устанавливает `this=window` для вызова функции (в Node.js `this` становится объектом таймера, но здесь это не имеет значения). Таким образом, для `this.firstName` он пытается получить `window.firstName`, которого не существует. В других подобных случаях обычно `this` просто становится `undefined`.

Задача довольно типичная - мы хотим передать метод объекта куда-то ещё (в этом конкретном случае - в планировщик), где он будет вызван. Как бы сделать так, чтобы он вызывался в правильном контексте?

## Решение 1: сделать функцию-обёртку

Самый простой вариант решения – это обернуть вызов в анонимную функцию, создав замыкание:

```js run
let user = {
  firstName: "Вася",
  sayHi() {
    alert(`Привет, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Привет, Вася!
}, 1000);
*/!*
```

Теперь код работает корректно, так как объект `user` достаётся из замыкания, а затем вызывается его метод `sayHi`.

То же самое, только короче:

```js
setTimeout(() => user.sayHi(), 1000); // Привет, Вася!
```

Выглядит хорошо, но теперь в нашем коде появилась небольшая уязвимость.

Что произойдёт, если до момента срабатывания `setTimeout` (ведь задержка составляет целую секунду!) в переменную `user` будет записано другое значение? Тогда вызов неожиданно будет совсем не тот!

```js run
let user = {
  firstName: "Вася",
  sayHi() {
    alert(`Привет, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...в течение 1 секунды
user = { sayHi() { alert("Другой пользователь в 'setTimeout'!"); } };

// Другой пользователь в 'setTimeout'!
```

Следующее решение гарантирует, что такого не случится.

## Решение 2: привязать контекст с помощью bind

В современном JavaScript у функций есть встроенный метод [bind](mdn:js/Function/bind), который позволяет зафиксировать `this`.

Базовый синтаксис `bind`:

```js
// полный синтаксис будет представлен немного позже
let boundFunc = func.bind(context);
```

Результатом вызова `func.bind(context)` является особый "экзотический объект" (термин взят из спецификации), который вызывается как функция и прозрачно передает вызов в `func`, при этом устанавливая `this=context`.

Другими словами, вызов `boundFunc` подобен вызову `func` с фиксированным `this`.

Например, здесь `funcUser` передает вызов в `func`, фиксируя `this=user`:

```js run  
let user = {
  firstName: "Вася"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // Вася  
*/!*
```

Здесь `func.bind(user)` - это "связанный вариант" `func`, с фиксированным `this=user`.

Все аргументы передаются исходному методу `func` "как есть", например:

```js run  
let user = {
  firstName: "Вася"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// привязка this к user
let funcUser = func.bind(user);

*!*
funcUser("Привет"); // Привет, Вася (аргумент "Привет" передан, при этом this = user)
*/!*
```

Теперь давайте попробуем с методом объекта:

```js run
let user = {
  firstName: "Вася",
  sayHi() {
    alert(`Привет, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

sayHi(); // Привет, Вася!

setTimeout(sayHi, 1000); // Привет, Вася!
```

В строке `(*)` мы берем метод `user.sayHi` и привязываем его к `user`. Теперь `SayHi` - это "связанная" функция, которая может быть вызвана отдельно или передана в `setTimeout` (контекст всегда будет правильным).

Здесь мы можем видеть, что `bind` исправляет только `this`, а аргументы передаются "как есть":

```js run
let user = {
  firstName: "Вася",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Привет"); // Привет, Вася (аргумент "Привет" передан в функцию "say")
say("Пока"); // Пока, Вася (аргумент "Пока" передан в функцию "say")
```

````smart header="Удобный метод: `bindAll`"
Если у объекта много методов и мы планируем их активно передавать, то можно привязать контекст для них всех в цикле:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

Некоторые JS-библиотеки предоставляют встроенные функции для удобной массовой привязки контекста, например [_.bindAll(obj)](http://lodash.com/docs#bindAll) в lodash.
````

<<<<<<< HEAD
## Частичное применение

До сих пор мы говорили только о привязывании `this`. Давайте шагнём дальше.

Мы можем привязать не только `this`, но и аргументы. Это делается редко, но иногда может быть полезно.

Полный синтаксис `bind`:
=======
## Partial functions

Until now we have only been talking about binding `this`. Let's take it a step further.

We can bind not only `this`, but also arguments. That's rarely done, but sometimes can be handy.

The full syntax of `bind`:
>>>>>>> e50185af4b4df7dbe1870215e382a206241c8515

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```
<<<<<<< HEAD
Это позволяет привязать контекст `this` и начальные аргументы функции.

Например, у нас есть функция умножения `mul(a, b)`:
=======

It allows to bind context as `this` and starting arguments of the function.

For instance, we have a multiplication function `mul(a, b)`:
>>>>>>> e50185af4b4df7dbe1870215e382a206241c8515

```js
function mul(a, b) {
  return a * b;
}
```

<<<<<<< HEAD
Давайте воспользуемся `bind`, чтобы создать функцию `double` на её основе:
=======
Let's use `bind` to create a function `double` on its base:
>>>>>>> e50185af4b4df7dbe1870215e382a206241c8515

```js run
function mul(a, b) {
  return a * b;
}

*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

<<<<<<< HEAD
Вызов `mul.bind(null, 2)` создаёт новую функцию `double`, которая передаёт вызов `mul`, фиксируя `null` как контекст и `2` -- как первый аргумент. Следующие аргументы передаются "как есть".

Это называется [частичное применение](https://ru.wikipedia.org/wiki/Частичное_применение) -- мы создаём новую функцию, фиксируя некоторые из существующих параметров.

Обратите внимание, что в данном случае мы на самом деле не используем `this`. Но для `bind` это обязательный параметр, так что мы должны передать туда что-нибудь вроде `null`.

В следующем коде функция `triple` умножает значение на три:
=======
The call to `mul.bind(null, 2)` creates a new function `double` that passes calls to `mul`, fixing `null` as the context and `2` as the first argument. Further arguments are passed "as is".

That's called [partial function application](https://en.wikipedia.org/wiki/Partial_application) -- we create a new function by fixing some parameters of the existing one.

Please note that here we actually don't use `this` here. But `bind` requires it, so we must put in something like `null`.

The function `triple` in the code below triples the value:
>>>>>>> e50185af4b4df7dbe1870215e382a206241c8515

```js run
function mul(a, b) {
  return a * b;
}

*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

<<<<<<< HEAD
Для чего мы обычно создаём частично применённую функцию?

Польза от этого в том, что возможно создать независимую функцию с понятным названием (`double`, `triple`). Мы можем использовать её и не передавать каждый раз первый аргумент, т.к. он зафиксирован с помощью `bind`.

В других случаях частичное применение полезно, когда у нас есть очень общая функция и для удобства мы хотим создать её частный вариант.

Например, у нас есть функция `send(from, to, text)`. Потом внутри объекта `user` мы можем захотеть использовать её частный вариант: `sendTo(to, text)`, который отправляет текст от имени текущего пользователя.

## Частичное применение без контекста

Что если мы хотим зафиксировать некоторые аргументы, но не контекст `this`? Например, для метода объекта.

Встроенный `bind` не позволяет этого. Мы не можем просто опустить контекст и перейти  к аргументам.

К счастью, лекго создать вспомогательную функцию `partial`, которая привязывает только аргументы.

Вот так:
=======
Why do we usually make a partial function?

The benefit is that we can create an independent function with a readable name (`double`, `triple`). We can use it and not provide first argument of every time as it's fixed with `bind`.

In other cases, partial application is useful when we have a very generic function and want a less universal variant of it for convenience.

For instance, we have a function `send(from, to, text)`. Then, inside a `user` object we may want to use a partial variant of it: `sendTo(to, text)` that sends from the current user.

## Going partial without context

What if we'd like to fix some arguments, but not the context `this`? For example, for an object method.

The native `bind` does not allow that. We can't just omit the context and jump to arguments.

Fortunately, a helper function `partial` for binding only arguments can be easily implemented.

Like this:
>>>>>>> e50185af4b4df7dbe1870215e382a206241c8515

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

<<<<<<< HEAD
// использование:
=======
// Usage:
>>>>>>> e50185af4b4df7dbe1870215e382a206241c8515
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

<<<<<<< HEAD
// добавляем частично применённый метод с фиксированным временем
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Что-то вроде этого:
// [10:00] John: Hello!
```

Результатом вызова `partial(func[, arg1, arg2...])` будет обёртка `(*)`, которая вызывает `func` с:
- Тем же `this`, который она получает (для вызова `user.sayNow` -- это будет `user`)
- Затем передаёт ей `...argsBound` -- аргументы из вызова `partial` (`"10:00"`)
- Затем передаёт ей `...args` -- аргументы, полученные обёрткой (`"Hello"`)

Благодаря оператору расширения `...` это реализовать очень легко, не правда ли?

Также есть готовый вариант [_.partial](https://lodash.com/docs#partial) из библиотеки lodash.

## Итого

Метод `bind` возвращает "привязанный вариант" функции `func`, фиксируя контекст `this` и первые аргументы `arg1`, `arg2`..., если они заданы.

Обычно `bind` применяется для фиксации `this` в методе объекта, чтобы передать его в качестве колбэка. Например, для `setTimeout`.
=======
// add a partial method with fixed time
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] John: Hello!
```

The result of `partial(func[, arg1, arg2...])` call is a wrapper `(*)` that calls `func` with:
- Same `this` as it gets (for `user.sayNow` call it's `user`)
- Then gives it `...argsBound` -- arguments from the `partial` call (`"10:00"`)
- Then gives it `...args` -- arguments given to the wrapper (`"Hello"`)

So easy to do it with the spread operator, right?

Also there's a ready [_.partial](https://lodash.com/docs#partial) implementation from lodash library.

## Summary
>>>>>>> e50185af4b4df7dbe1870215e382a206241c8515

Когда мы привязываем аргументы, такая функция называется "частично применённой" или "частичной".

<<<<<<< HEAD
Частичное применение удобно, когда мы не хотим повторять один и тот же аргумент много раз. Например, когда у нас есть функция `send(from, to)`, и `from` всё время будет одинаков для нашей задачи, мы можем создать частично применённую функцию и дальше работать с ней.
=======
Usually we apply `bind` to fix `this` for an object method, so that we can pass it somewhere. For example, to `setTimeout`.

When we fix some arguments of an existing function, the resulting (less universal) function is called *partially applied* or *partial*.

Partials are convenient when we don't want to repeat the same argument over and over again. Like if we have a `send(from, to)` function, and `from` should always be the same for our task, we can get a partial and go on with it.
>>>>>>> e50185af4b4df7dbe1870215e382a206241c8515
