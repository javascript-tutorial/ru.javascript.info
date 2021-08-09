<<<<<<< HEAD
# Ошибка при чтении несуществующего свойства

Обычно при чтении несуществующего свойства из объекта возвращается `undefined`.

Создайте прокси, который генерирует ошибку при попытке прочитать несуществующее свойство.
=======
# Error on reading non-existent property

Usually, an attempt to read a non-existent property returns `undefined`.

Create a proxy that throws an error for an attempt to read of a non-existent property instead.
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b

Это может помочь обнаружить программные ошибки пораньше.

Напишите функцию `wrap(target)`, которая берёт объект `target` и возвращает прокси, добавляющий в него этот аспект функциональности.

Вот как это должно работать:

```js
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
*!*
      /* ваш код */
*/!*
  });
}

user = wrap(user);

alert(user.name); // John
*!*
<<<<<<< HEAD
alert(user.age); // Ошибка: такого свойства не существует
=======
alert(user.age); // ReferenceError: Property doesn't exist: "age"
>>>>>>> bc08fd1b32285304b14afea12a9deaa10d13452b
*/!*
```
