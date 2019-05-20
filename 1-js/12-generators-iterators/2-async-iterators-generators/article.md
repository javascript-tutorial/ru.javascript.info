
# Async-итераторы и генераторы

Асинхронные итераторы позволяют перебирать данные по-мере их поступления, по запросу.

Например, когда мы скачиваем, что-нибудь пакет-за-пакетом, или просто ожидаем потока асинхронных событий и хотим их перебирать -- асинхронные итераторы и генераторы могут очень пригодиться. Давайте для начала рассмотрим простой пример, чтобы познакомиться с синтаксисом, а затем перейдём уже к реальным случаям их применения.

## Async-итераторы

Асинхронные итераторы почти идентичны обычным итераторам, с учётом нескольких синтаксических отличий.

"Обычный" итерируемый объект из главы <info:iterable> выглядит так:

```js run
let range = {
  from: 1,
  to: 5,

  // цикл for..of вызывает этот метод один раз в самом начале
*!*
  [Symbol.iterator]() {
*/!*
    // ...он возвращает итератор:
    // далее, for..of работает только с ним, запрашивая этот объект для последующих значений
    return {
      current: this.from,
      last: this.to,

      // next() вызывается на каждой итерации цикла for..of
*!*
      next() { // (2)
        // метод должен вернуть значение в виде объекта {done:.., value :...}
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
  alert(value); // 1, затем 2, затем 3, затем 4, затем 5
}
```

Если есть необходимость, можете вернуться к [главе об итерируемых объектах](info:iterable) чтобы освежить детали об обычных итераторах.

Чтобы объект перебирался асинхронно:
1. Нам понадобится `Symbol.asyncIterator` вместо `Symbol.iterator`.
2. Метод `next()` должен возвращать промис.
3. Чтобы перебрать такой объект, мы должны запустить цикл `for await (let item of iterable)`.

Давайте сделаем объект `range` итерируемым, как в примере выше, но на этот раз, объект будет возвращать значения асинхронно, один раз в секунду:

```js run
let range = {
  from: 1,
  to: 5,

  // цикл for await..of вызвает этот метод один раз в самом начале
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...метод возвращает итератор:
    // далее, цикл for await..of работает только с ним, запрашивая этот объект для последующих значений
    return {
      current: this.from,
      last: this.to,

      // Метод next() вызывается на каждой итерации цикла for..of
*!*
      async next() { // (2)
        // метод должен возвращать значение в виде объекта {done:.., value :...}
        // (автоматически оборачивая его в промис с помощью async)
*/!*

        // можно использовать await внутри, выполняя асинхронные задачи:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

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

Как видно, все компоненты похожи, как в случае с обычными итераторами:

1. Для того, чтобы сделать объект перебираемым асинхронно, у него должен быть метод `Symbol.asyncIterator` `(1)`.
2. Он должен возвращать объект с методом `next()`, возвращающим промис `(2)`.
3. Метод `next()` не обязательно должен быть `async`, он может быть обычным методом, возвращающим промис, но `async` позволяет использовать внутри себя `await`. Тут мы просто выжидаем одну секунду `(3)`.
4. Для перебора, используется цикл `for await(let value of range)` `(4)`, а именно добавляется "await" после "for". Он вызывает `range[Symbol.asyncIterator]()` один раз, и затем метод `next()` для каждого значения.

Вот небольшая шпаргалка:

|       | Обычные итераторы | Async-итераторы |
|-------|-----------|-----------------|
| Встроенный метод для перебора | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` возращаемое значение              | любое         | `Promise`  |
| для перебора используется                          | `for..of`         | `for await..of` |


````warn header="Оператор spread не работает асинхронно"
Возможности языка, совместимые с обычными синхронными итераторыми, не работают с их асинхронными аналогами.

Например, оператор spread:
```js
alert( [...range] ); // Ошибка, нет свойства Symbol.iterator
```

Это естественно, т.к. spread ожидает найти свойство `Symbol.iterator`, как и цикл `for..of` без `await`.
````

## Async-генераторы

В JavaScript также есть генераторы, которые тоже являются итерируемыми объектами.

Давайте вернёмся к генераторам из статьи [](info:generators). Они генерируют последовательность значений от `start` до `end` (или каких-либо ещё):

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```


Это нормально, что мы не можем использовать `await` в генераторах. Все значения должны обрабатываться синхонно: задержкам не место в цикле `for..of`.

Но что, если всё же нам понадобится воспользоваться `await` в теле генератора? Для выполнения сетевых запросов, к примеру.

Нет проблем, просто поставьте `async` перед генератором, вот так:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // ого, теперь await работает!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, затем 2, затем 3, затем 4, затем 5
  }

})();
```

Теперь у нас есть async-генератор, итерируемый объект с циклом `for await...of`.

В самом деле - это очень просто. Мы добавляем ключевое слово `async`, и теперь внутри генератора можно использовать `await`, промисы и всё остальное, что связано с async-функциями.

Технически, ещё одним отличием async-генераторов, является то, что метод `generator.next()` теперь тоже асинхронный, и возвращает промисы.

Вместо `result = generator.next()` для обычного, не async-генератора, значения будут получаться иначе:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```

## Итерируемые объекты с async-генераторами

Когда мы хотим сделать объект итерируемым, нам нужно добавить ему свойство `Symbol.iterator`.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() { ...возвращает объект с методом next, делающий range итерируемым...  }
*/!*
}
```

Распространённый приём возвращать из `Symbol.iterator` генератор, вместо простого объекта с методом `next`, как в примере выше.

Давайте возьмём пример из главы [](info:generators):

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
  alert(value); // 1, затем 2, затем 3, затем 4, затем 5
}
```

Представленный объект `range` итерируемый, и генератор `*[Symbol.iterator]` реализует логику для перебора значений.

Для того, чтобы генератор стал асинхронным, нам нужно заменить `Symbol.iterator` на async `Symbol.asyncIterator`:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  async *[Symbol.asyncIterator]() { // то же, что [Symbol.asyncIterator]: async function*()
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // делает паузу между значениями, ожидая чего-либо  
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, затем 2, затем 3, затем 4, затем 5
  }

})();
```

Теперь значения идут с задержкой в 1 секунду.

## Пример из реальной жизни

Поскольку мы уже изучили простые примеры, давшие понимание основ, давайте разберём случай из реальной жизни.

Есть множество онлайн API, которые предоставляют данные по-странично. Например, когда нам нужен список пользователей, мы можем подгрузить их страница-за-страницей: запрос вернёт заранее известное число (например 100 пользователей), и предоставит URL для следующей страницы.

Подход очень распространён. Он работает не только со списом пользователей, но с чем-угодно. Например, GitHub позволяет получать коммиты подобным, по-страничным образом:

- Мы должны сделать запрос по URL в форме `https://api.github.com/repos/<repo>/commits`.
- Получить ответ в виде JSON с 30-ю коммитами, а также ссылку со следующей страницей в заголовке `Link`.
- Затем мы можем использовать эту ссылку для следующего запроса, чтобы получить ещё коммитов, и так далее.

А что, если мы захотим получить итерируемый источних коммитов, чтобы использовать его следующим образом:

```js
let repo = 'javascript-tutorial/ ru.javascript.info'; // GitHub репозиторий, из которого получаем коммиты

for await (let commit of fetchCommits(repo)) {
  // обработать коммит
}
```

Нам нужно, чтобы `fetchCommits` мог получать коммиты, совершая запросы по-мере необходимости, а также обрабатывал для нас подгрузку всех по-страничных данных, просто перебирая их в цикле `for await..of`.

С async-генераторами это реализовать довольно просто:

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github запрашивает заголовок user-agent
    });

    const body = await response.json(); // (2) парсит ответ, как JSON (массив коммитов)

    // (3) URL следующей страницы находится в заголовках, извлечём их
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage && nextPage[1];

    url = nextPage;

    for(let commit of body) { // (4) подгружать коммиты один за одним, пока не кончится страница
      yield commit;
    }
  }
}
```

1. Мы используем встроенный в браузер метод `fetch` для загрузки данных с удалённого URL. Это позволяет обеспечить авторизацию и наличие остальных заголовков, если потребуется. В данном случае GitHub запрашивает заголовок `User-Agent`.
2. Результат fetch парсится как JSON, с помощью специфичного для `fetch` метода.
3. Из ответа мы можем получить URL следующей страницы из заголовка `Link`. URL имеет особый формат, таким образом, мы можем воспользоваться regexp, чтобы получить его. Ссылка может выглядеть примерно так: `https://api.github.com/repositories/93253246/commits?page=2`, она автоматически генерируется GitHub.
4. Затем мы дожидаемся последовательной подгрузки всех коммитов, и по её завершению -- следующая итерация цикла `while(url)` запустит выполнение ещё одного запроса.

Пример использования (выводит коммиты автора в консоль):

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/ru.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // остановится на 100-м коммите
      break;
    }
  }

})();
```

Как раз то, что мы и хотели. Внутренняя механика по-страничной подгрузки данных невидна снаружи. Для нас это просто async-генератор, возвращающий коммиты.

## Summary

Regular iterators and generators work fine with the data that doesn't take time to generate.

When we expect the data to come asynchronously, with delays, their async counterparts can be used, and `for await..of` instead of `for..of`.

Syntax differences between async and regular iterators:

|       | Iterators | Async iterators |
|-------|-----------|-----------------|
| Object method to provide iteraterable | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` return value is              | any value         | `Promise`  |

Syntax differences between async and regular generators:

|       | Generators | Async generators |
|-------|-----------|-----------------|
| Declaration | `function*` | `async function*` |
| `generator.next()` returns              | `{value:…, done: true/false}`         | `Promise` that resolves to `{value:…, done: true/false}`  |

In web-development we often meet streams of data, when it flows chunk-by-chunk. For instance, downloading or uploading a big file.

We could use async generators to process such data, but there's also another API called Streams, that may be more convenient, as it provides special interfaces to transform the data and to pass it from one stream to another (e.g. download from one place and immediately send elsewhere). But they are also more complex.

Streams API not a part of JavaScript language standard. Streams and async generators complement each other, both are great ways to handle async data flows.
