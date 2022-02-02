Решение состоит из двух частей:

1. При вызове `.observe(handler)` нам нужно где-то сохранить обработчик, чтобы вызвать его позже. Можно хранить обработчики прямо в объекте, создав в нём для этого свой символьный ключ.
2. Нам нужен прокси с ловушкой `set`, чтобы вызывать обработчики при изменении свойств.

```js run
let handlers = Symbol('handlers');

function makeObservable(target) {
  // 1. Создадим хранилище обработчиков
  target[handlers] = [];

  // положим туда функции-обработчики для вызовов в будущем
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

  // 2. Создадим прокси для реакции на изменения
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // перенаправим операцию к оригинальному объекту
      if (success) { // если не произошло ошибки при записи свойства
        // вызовем обработчики
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}

let user = {};

user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John";
```
