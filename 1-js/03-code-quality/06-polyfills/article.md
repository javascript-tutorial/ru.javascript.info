
<<<<<<< HEAD
# Полифилы
=======
# Polyfills and transpilers
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

JavaScript - динамично развивающийся язык программирования. Регулярно появляются предложения о добавлении в JS новых возможностей, они анализируются, и, если предложения одобряются, то описания новых возможностей языка переносятся в черновик <https://tc39.github.io/ecma262/>, а затем публикуются в [спецификации](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

Разработчики JavaScript-движков сами решают, какие предложения реализовывать в первую очередь. Они могут заранее добавить в браузеры поддержку функций, которые всё ещё находятся в черновике, и отложить разработку функций, которые уже перенесены в спецификацию, потому что они менее интересны разработчикам или более сложные в реализации.

Таким образом, довольно часто реализуется только часть стандарта.

Можно проверить текущее состояние поддержки различных возможностей JavaScript на странице <https://kangax.github.io/compat-table/es6/> (нам ещё предстоит изучить многое из этого списка).

As programmers, we'd like to use most recent features. The more good stuff - the better!

<<<<<<< HEAD
Когда мы используем современные возможности JavaScript, некоторые движки могут не поддерживать их. Как было сказано выше, не везде реализованы все функции.

И тут приходит на помощь Babel.

[Babel](https://babeljs.io) - это [транспилер](https://ru.wikipedia.org/wiki/%D0%A2%D1%80%D0%B0%D0%BD%D1%81%D0%BF%D0%B0%D0%B9%D0%BB%D0%B5%D1%80). Он переписывает современный JavaScript-код в предыдущий стандарт.

На самом деле, есть две части Babel:

1. Во-первых, транспилер, который переписывает код. Разработчик запускает Babel на своём компьютере. Он переписывает код в старый стандарт. И после этого код отправляется на сайт. Современные сборщики проектов, такие как [webpack](http://webpack.github.io/) или [brunch](http://brunch.io/), предоставляют возможность запускать транспилер автоматически после каждого изменения кода, что позволяет экономить время.

2. Во-вторых, полифил.

    Новые возможности языка могут включать встроенные функции и синтаксические конструкции. Транспилер переписывает код, преобразовывая новые синтаксические конструкции в старые. Но что касается новых встроенных функций, нам нужно их как-то реализовать. JavaScript является высокодинамичным языком, скрипты могут добавлять/изменять любые функции, чтобы они вели себя в соответствии с современным стандартом.

    Термин "полифил" означает, что скрипт "заполняет" пробелы и добавляет современные функции.

    Два интересных хранилища полифилов:
    - [core js](https://github.com/zloirock/core-js) поддерживает много функций, можно подключать только нужные.
    - [polyfill.io](http://polyfill.io) - сервис, который автоматически создаёт скрипт с полифилом в зависимости от необходимых функций и браузера пользователя.

Таким образом, чтобы современные функции поддерживались в старых движках, нам надо установить транспилер и добавить полифил.

## Примеры в учебнике
=======
On the other hand, how to make our modern code work on older engines that don't understand recent features yet?

There are two tools for that:

1. Transpilers.
2. Polyfills.

Here, in this chapter, our purpose is to get the gist of how they work, and their place in web development.

## Transpilers

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that can parse ("read and understand") modern code, and rewrite it using older syntax constructs, so that the result would be the same.

E.g. JavaScript before year 2020 didn't have the "nullish coalescing operator" `??`. So, if a visitor uses an outdated browser, it may fail to understand the code like `height = height ?? 100`.

A transpiler would analyze our code and rewrite `height ?? 100` into `(height !== undefined && height !== null) ? height : 100`.

```js
// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Now the rewritten code is suitable for older JavaScript engines.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.

<<<<<<< HEAD
````online
Большинство примеров можно запустить "на месте", как этот:

```js run
alert('Нажмите кнопку "Play" в крайнем правом углу, чтобы запустить пример');
```

Примеры, в которых используются современные возможности JS, будут работать, если ваш браузер их поддерживает.
````

```offline
Вы читаете оффлайн-версию, примеры в PDF запустить не получится, в EPUB некоторые работают.
```

Google Chrome обычно поддерживает современные функции, можно запускать новейшие примеры без каких-либо транспилеров, но и другие современные браузеры тоже хорошо работают.
=======
Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there. 

Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process.

## Polyfills

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23)` returns `1`.

In some (very outdated) JavaScript engines, there's no `Math.trunc`, so such code will fail.

As we're talking about new functions, not syntax changes, there's no need to transpile anything here. We just need to declare the missing function.

A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

For this particular case, the polyfill for `Math.trunc` is a script that implements it, like this:

```js
if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript is a highly dynamic language, scripts may add/modify any functions, even including built-in ones. 

Two interesting libraries of polyfills are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.


## Summary

In this chapter we'd like to motivate you to study modern and even "bleeding-edge" language features, even if they aren't yet well-supported by JavaScript engines.

Just don't forget to use transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). And they'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](http://webpack.github.io/) with [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://kangax.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.

>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
