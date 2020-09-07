
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
alert(user.age); // ReferenceError: Property doesn't exist "age"
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
```
