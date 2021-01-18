
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
>>>>>>> 3a0b3f4e31d4c4bbe90ed4c9c6e676a888ad8311
```
