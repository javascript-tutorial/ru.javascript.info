
# Вызовите async–функцию из "обычной"

<<<<<<< HEAD
Есть "обычная" функция. Как можно внутри неё получить результат выполнения `async`–функции?
=======
We have a "regular" function called `f`. How can you call the `async` function `wait()` and use its result inside of `f`?
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
<<<<<<< HEAD
  // ...что здесь написать?
  // чтобы вызвать wait() и дождаться результата "10" от async–функции
  // не забывайте, здесь нельзя использовать "await"
=======
  // ...what should you write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
>>>>>>> 039716de8a96f49b5fccd7aed5effff2e719dfe5
}
```

P.S. Технически задача очень простая, но этот вопрос часто задают разработчики, недавно познакомившиеся с async/await. 
