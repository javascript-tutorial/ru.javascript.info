
# Анимация круга с помощью промиса

Перепишите функцию `showCircle`, написанную в задании <info:task/animate-circle-callback> таким образом, чтобы она возвращала промис, вместо того чтобы принимать в аргументы функцию-callback.

Новое использование:

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

Возьмите решение из <info:task/animate-circle-callback> в качестве основы.
