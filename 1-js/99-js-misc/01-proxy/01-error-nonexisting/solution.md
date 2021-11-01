
```js run
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      } else {
        throw new ReferenceError(`Свойство не существует: "${prop}"`)
      }
    }
  });
}

user = wrap(user);

alert(user.name); // John
<<<<<<< HEAD
alert(user.age); // Ошибка: Свойство не существует
=======
alert(user.age); // ReferenceError: Property doesn't exist: "age"
>>>>>>> 6989312841d843f2350803ab552d9082437be569
```
