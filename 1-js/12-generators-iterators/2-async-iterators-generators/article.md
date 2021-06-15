# Асинхронные итераторы и генераторы

<<<<<<< HEAD
Асинхронные итераторы позволяют перебирать данные, поступающие асинхронно. Например, когда мы загружаем что-то по частям по сети. Асинхронные генераторы делают такой перебор ещё удобнее.

Давайте сначала рассмотрим простой пример, чтобы понять синтаксис, а затем - реальный практический.
=======
# Async iteration and generators

Asynchronous iteration allow us to iterate over data that comes asynchronously, on-demand. Like, for instance, when we download something chunk-by-chunk over a network. And asynchronous generators make it even more convenient.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Асинхронные итераторы

<<<<<<< HEAD
Асинхронные итераторы похожи на обычные итераторы, но имеют некоторые синтаксические отличия.

"Обычный" перебираемый объект, как подробно рассказано в главе <info:iterable>, выглядит примерно так:
=======
## Recall iterables

Let's recall the topic about iterables. 

The idea is that we have an object, such as `range` here:
```js
let range = {
  from: 1,
  to: 5
};
```

...And we'd like to use `for..of` loop on it, such as `for(value of range)`, to get values from `1` to `5`.

In other words, we want to add an *iteration ability* to the object.

That can be implemented using a special method with the name `Symbol.iterator`:

- This method is called in by the `for..of` construct when the loop is started, and it should return an object with the `next` method.
- For each iteration, the `next()` method is invoked for the next value.
- The `next()` should return a value in the form `{done: true/false, value:<loop value>}`, where `done:true` means the end of the loop.

Here's an implementation for the iterable `range`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // for..of вызывает этот метод один раз в самом начале
=======
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*!*
  [Symbol.iterator]() { // called once, in the beginning of for..of
*/!*
<<<<<<< HEAD
    // ...возвращает объект-итератор:
    // далее for..of работает только с этим объектом, запрашивая следующее значение вызовом next()
=======
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // next() вызывается на каждой итерации цикла for..of
*!*
      next() { // (2)
        // должен возвращать значение в виде объекта {done:.., value :...}
=======
*!*
      next() { // called every iteration, to get the next value
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*/!*
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1, потом 2, потом 3, потом 4, потом 5
}
```

<<<<<<< HEAD
Если нужно, пожалуйста, ознакомьтесь с [главой про итераторы](info:iterable), где обычные итераторы разбираются подробно.

Чтобы сделать объект итерируемым асинхронно:
1. Используется `Symbol.asyncIterator` вместо `Symbol.iterator`.
2. `next()` должен возвращать промис.
3. Чтобы перебрать такой объект, используется цикл `for await (let item of iterable)`.

Давайте создадим итерируемый объект `range`, как и в предыдущем примере, но теперь он будет возвращать значения асинхронно, по одному в секунду:
=======
If anything is unclear, please visit the chapter [](info:iterable), it gives all the details about regular iterables.

## Async iterables

Asynchronous iteration is needed when values come asynchronously: after `setTimeout` or another kind of delay. 

The most common case is that the object needs to make a network request to deliver the next value, we'll see a real-life example of it a bit later.

To make an object iterable asynchronously:

1. Use `Symbol.asyncIterator` instead of `Symbol.iterator`.
2. The `next()` method should return a promise (to be fulfilled with the next value).
    - The `async` keyword handles it, we can simply make `async next()`.
3. To iterate over such an object, we should use a `for await (let item of iterable)` loop.
    - Note the `await` word.

As a starting example, let's make an iterable `range` object, similar like the one before, but now it will return values asynchronously, one per second.

All we need to do is to perform a few replacements in the code above:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // for await..of вызывает этот метод один раз в самом начале
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...возвращает объект-итератор:
    // далее for await..of работает только с этим объектом,
    // запрашивая у него следующие значения вызовом next()
=======
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // next() вызывается на каждой итерации цикла for await..of
*!*
      async next() { // (2)
        // должен возвращать значение как объект {done:.., value :...}
        // (автоматически оборачивается в промис с помощью async)
*/!*

        // можно использовать await внутри для асинхронности:
=======
*!*
      async next() { // (2)
*/!*

*!*
        // note: we can use "await" inside the async next:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
*/!*

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```

Как видим, структура похожа на обычные итераторы:

<<<<<<< HEAD
1. Чтобы сделать объект асинхронно итерируемым, он должен иметь метод `Symbol.asyncIterator` `(1)`.
2. Этот метод должен возвращать объект с методом `next()`, который в свою очередь возвращает промис `(2)`.
3. Метод `next()` не обязательно должен быть `async`, он может быть обычным методом, возвращающим промис, но `async` позволяет использовать `await`, так что это удобно. Здесь мы просто делаем паузу на одну секунду `(3)`.
4. Для итерации мы используем `for await (let value of range)` `(4)`, добавляя "await" после "for". Он вызовет `range[Symbol.asyncIterator]()` один раз, а затем его метод `next()` для получения значений.

Вот небольшая шпаргалка:
=======
1. To make an object asynchronously iterable, it must have a method `Symbol.asyncIterator` `(1)`.
2. This method must return the object with `next()` method returning a promise `(2)`.
3. The `next()` method doesn't have to be `async`, it may be a regular method returning a promise, but `async` allows us to use `await`, so that's convenient. Here we just delay for a second `(3)`.
4. To iterate, we use `for await(let value of range)` `(4)`, namely add "await" after "for". It calls `range[Symbol.asyncIterator]()` once, and then its `next()` for values.

Here's a small table with the differences:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

|       | Итераторы | Асинхронные итераторы |
|-------|-----------|-----------------|
| Метод для создания итерируемого объекта | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` возвращает              | любое значение         | промис  |
| для цикла используйте                          | `for..of`         | `for await..of` |

<<<<<<< HEAD

````warn header="Оператор расширения `...` не работает асинхронно"
Функции, которые требуют обычных синхронных итераторов, не работают с асинхронными.

Например, оператор расширения (три точки `...`) не будет работать:
=======
````warn header="The spread syntax `...` doesn't work asynchronously"
Features that require regular, synchronous iterators, don't work with asynchronous ones.

For instance, a spread syntax won't work:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
```js
alert( [...range] ); // Ошибка, нет Symbol.iterator
```

<<<<<<< HEAD
Это естественно, так как он ожидает `Symbol.iterator`, как и `for..of` без `await`. Ему не подходит `Symbol.asyncIterator`.
````

## Асинхронные генераторы

Как мы уже знаем, в JavaScript есть генераторы, и они являются перебираемыми.

Давайте вспомним генератор последовательности из главы [](info:generators). Он генерирует последовательность значений от `start` до `end`:
=======
That's natural, as it expects to find `Symbol.iterator`, not `Symbol.asyncIterator`.

It's also the case for `for..of`: the syntax without `await` needs `Symbol.iterator`.
````

## Recall generators

Now let's recall generators, as they allow to make iteration code much shorter. Most of the time, when we'd like to make an iterable, we'll use generators.

For sheer simplicity, omitting some important stuff, they are "functions that generate (yield) values". They are explained in detail in the chapter [](info:generators).

Generators are labelled with `function*` (note the star) and use `yield` to generate a value, then we can use `for..of` to loop over them.

This example generates a sequence of values from `start` to `end`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, потом 2, потом 3, потом 4, потом 5
}
```

<<<<<<< HEAD
В обычных генераторах мы не можем использовать `await`. Все значения должны поступать синхронно: в `for..of` нет места для задержки, это синхронная конструкция.

Но что если нам нужно использовать `await` в теле генератора? Для выполнения сетевых запросов, например.

Нет проблем, просто добавьте в начале `async`, например, вот так:
=======
As we already know, to make an object iterable, we should add `Symbol.iterator` to it.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <object with next to make range iterable>
  }
*/!*
}
```

A common practice for `Symbol.iterator` is to return a generator, it makes the code shorter, as you can see:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

Please see the chapter [](info:generators) if you'd like more details.

In regular generators we can't use `await`. All values must come synchronously, as required by the `for..of` construct.

What if we'd like to generate values asynchronously? From network requests, for instance. 

Let's switch to asynchronous generators to make it possible.

## Async generators (finally)

For most practical applications, when we'd like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator.

The syntax is simple: prepend `function*` with `async`. That makes the generator asynchronous.

And then use `for await (...)` to iterate over it, like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
<<<<<<< HEAD
    // ура, можно использовать await!
=======
    // Wow, can use await!
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
<<<<<<< HEAD
    alert(value); // 1, потом 2, потом 3, потом 4, потом 5
=======
    alert(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  }

})();
```

<<<<<<< HEAD
Теперь у нас есть асинхронный генератор, который можно перебирать с помощью `for await ... of`.

Это действительно очень просто. Мы добавляем ключевое слово `async`, и внутри генератора теперь можно использовать `await`, а также промисы и другие асинхронные функции.

С технической точки зрения, ещё одно отличие асинхронного генератора заключается в том, что его метод `generator.next()` теперь тоже асинхронный и возвращает промисы.
=======
As the generator is asynchronous, we can use `await` inside it, rely on promises, perform network requests and so on.

````smart header="Under-the-hood difference"
Technically, if you're an advanced reader who remembers the details about generators, there's an internal difference.

For async generators, the `generator.next()` method is asynchronous, it returns promises.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Из обычного генератора мы можем получить значения при помощи `result = generator.next()`. Для асинхронного нужно добавить `await`, вот так:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
That's why async generators work with `for await...of`.
````

<<<<<<< HEAD
## Асинхронно перебираемые объекты

Как мы уже знаем, чтобы сделать объект перебираемым, нужно добавить к нему `Symbol.iterator`.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <объект с next, чтобы сделать range перебираемым>
  }
*/!*
}
```

Обычная практика для `Symbol.iterator` - возвращать генератор, а не простой объект с `next`, как в предыдущем примере.

Давайте вспомним пример из главы [](info:generators):

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // сокращение для [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, потом 2, потом 3, потом 4, потом 5
}
```

Здесь созданный объект `range` является перебираемым, а генератор `*[Symbol.iterator]` реализует логику для перечисления значений.

Если хотим добавить асинхронные действия в генератор, нужно заменить `Symbol.iterator` на асинхронный `Symbol.asyncIterator`:
=======
### Async iterable range

Regular generators can be used as `Symbol.iterator` to make the iteration code shorter.

Similar to that, async generators can be used as `Symbol.asyncIterator` to implement the asynchronous iteration.

For instance, we can make the `range` object generate values asynchronously, once per second, by replacing synchronous `Symbol.iterator` with asynchronous `Symbol.asyncIterator`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let range = {
  from: 1,
  to: 5,

  // this line is same as [Symbol.asyncIterator]: async function*() {
*!*
<<<<<<< HEAD
  async *[Symbol.asyncIterator]() { // то же, что и [Symbol.asyncIterator]: async function*()
=======
  async *[Symbol.asyncIterator]() {
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // пауза между значениями, ожидание  
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, потом 2, потом 3, потом 4, потом 5
  }

})();
```

Теперь значения поступают с задержкой в одну секунду между ними.


<<<<<<< HEAD
## Пример из реальной практики

До сих пор мы видели простые примеры, чтобы просто получить базовое представление. Теперь давайте рассмотрим реальную ситуацию.

Есть много онлайн-сервисов, которые предоставляют данные постранично. Например, когда нам нужен список пользователей, запрос возвращает предопределённое количество (например, 100) пользователей - "одну страницу", и URL следующей страницы.

Этот подход очень распространён, и речь не только о пользователях, а о чём угодно. Например, GitHub позволяет получать коммиты таким образом, с разбивкой по страницам:

- Нужно сделать запрос на URL в виде `https://api.github.com/repos/<repo>/commits`.
- В ответ придёт JSON с 30 коммитами, а также со ссылкой на следующую страницу в заголовке `Link`.
- Затем можно использовать эту ссылку для следующего запроса, чтобы получить дополнительную порцию коммитов, и так далее.

Но нам бы, конечно же, хотелось вместо этого сложного взаимодействия иметь просто объект с коммитами, которые можно перебирать, вот так:

```js
let repo = 'javascript-tutorial/en.javascript.info'; // репозиторий на GitHub, откуда брать коммиты

for await (let commit of fetchCommits(repo)) {
  // обработка коммитов
}
```

Мы бы хотели сделать функцию `fetchCommits(repo)`, которая будет получать коммиты, делая запросы всякий раз, когда это необходимо. И пусть она сама разбирается со всем, что касается нумерации страниц, для нас это будет просто `for await..of`.

С асинхронными генераторами это довольно легко реализовать:
=======
```smart
Technically, we can add both `Symbol.iterator` and `Symbol.asyncIterator` to the object, so it's both synchronously (`for..of`) and asynchronously (`for await..of`) iterable.

In practice though, that would be a weird thing to do.
```

## Real-life example: paginated data

So far we've seen basic examples, to gain understanding. Now let's review a real-life use case.

There are many online services that deliver paginated data. For instance, when we need a list of users, a request returns a pre-defined count (e.g. 100 users) - "one page", and provides a URL to the next page.

This pattern is very common. It's not about users, but just about anything. 

For instance, GitHub allows us to retrieve commits in the same, paginated fashion:

- We should make a request to `fetch` in the form `https://api.github.com/repos/<repo>/commits`.
- It responds with a JSON of 30 commits, and also provides a link to the next page in the `Link` header.
- Then we can use that link for the next request, to get more commits, and so on.

For our code, we'd like to have a simpler way to get commits.

Let's make a function `fetchCommits(repo)` that gets commits for us, making requests whenever needed. And let it care about all pagination stuff. For us it'll be a simple async iteration `for await..of`.

So the usage will be like this:

```js
for await (let commit of fetchCommits("username/repository")) {
  // process commit
}
```

Here's such function, implemented as async generator:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
<<<<<<< HEAD
      headers: {'User-Agent': 'Our script'}, // GitHub требует заголовок user-agent
=======
      headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
    });

    const body = await response.json(); // (2) ответ в формате JSON (массив коммитов)

    // (3) Ссылка на следующую страницу находится в заголовках, извлекаем её
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) вернуть коммиты один за другим, до окончания страницы
      yield commit;
    }
  }
}
```

<<<<<<< HEAD
1. Мы используем метод [fetch](info:fetch) браузера для загрузки с удалённого URL. Он позволяет при необходимости добавлять авторизацию и другие заголовки, здесь GitHub требует `User-Agent`.
2. Результат `fetch` обрабатывается как JSON, это опять-таки метод, присущий `fetch`.
3. Нужно получить URL следующей страницы из заголовка ответа `Link`. Он имеет специальный формат, поэтому мы используем регулярное выражение. URL следующей страницы может выглядеть как `https://api.github.com/repositories/93253246/commits?page=2`, он генерируется самим GitHub.
4. Затем мы выдаём все полученные коммиты, а когда они закончатся - сработает следующая итерация `while(url)`, которая сделает ещё один запрос.
=======
More explanations about how it works:

1. We use the browser [fetch](info:fetch) method to download the commits.

    - The initial URL is `https://api.github.com/repos/<repo>/commits`, and the next page will be in the `Link` header of the response.
    - The `fetch` method allows us to supply authorization and other headers if needed -- here GitHub requires `User-Agent`.
2. The commits are returned in JSON format.
3. We should get the next page URL from the `Link` header of the response. It has a special format, so we use a regular expression for that (we will learn this feature in [Regular expressions](info:regular-expressions)).
    - The next page URL may look like `https://api.github.com/repositories/93253246/commits?page=2`. It's generated by GitHub itself.
4. Then we yield the received commits one by one, and when they finish, the next `while(url)` iteration will trigger, making one more request.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

Пример использования (показывает авторов коммитов в консоли):

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // остановимся на 100 коммитах
      break;
    }
  }

})();

// Note: If you are running this in an external sandbox, you'll need to paste here the function fetchCommits described above 
```

<<<<<<< HEAD
Это именно то, что мы хотели. Внутренняя механика постраничных запросов снаружи не видна. Для нас это просто асинхронный генератор, который возвращает коммиты.
=======
That's just what we wanted. 

The internal mechanics of paginated requests is invisible from the outside. For us it's just an async generator that returns commits.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

## Итого

Обычные итераторы и генераторы прекрасно работают с данными, которые не требуют времени для их создания или получения.

Когда мы ожидаем, что данные будут поступать асинхронно, с задержками, можно использовать их асинхронные аналоги и `for await..of` вместо` for..of`.

Синтаксические различия между асинхронными и обычными итераторами:

|       | Перебираемый объект | Асинхронно перебираемый |
|-------|-----------|-----------------|
| Метод для получения итератора | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` возвращает              | `{value:…, done: true/false}`         | промис, который завершается с `{value:…, done: true/false}`  |

Синтаксические различия между асинхронными и обычными генераторами:

|       | Генераторы | Асинхронные генераторы |
|-------|-----------|-----------------|
| Объявление | `function*` | `async function*` |
| `generator.next()` возвращает              | `{value:…, done: true/false}`         | промис, который завершается с `{value:…, done: true/false}`  |

В веб-разработке мы часто встречаемся с потоками данных, когда они поступают по частям. Например, загрузка или выгрузка большого файла.

<<<<<<< HEAD
Мы можем использовать асинхронные генераторы для обработки таких данных. Также заметим, что в некоторых окружениях, например, браузерах, есть и другое API, называемое Streams (потоки), который предоставляет специальные интерфейсы для работы с такими потоками данных, их преобразования и передачи из одного потока в другой (например, загрузка из одного источника и сразу отправка в другое место).
=======
We can use async generators to process such data. It's also noteworthy that in some environments, like in browsers, there's also another API called Streams, that provides special interfaces to work with such streams, to transform the data and to pass it from one stream to another (e.g. download from one place and immediately send elsewhere).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
