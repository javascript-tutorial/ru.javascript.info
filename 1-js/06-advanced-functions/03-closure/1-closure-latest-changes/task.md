importance: 5

---

<<<<<<< HEAD
# Учитывает ли функция последние изменения?

Функция `sayHi` использует имя внешней переменной. Какое значение будет использоваться при выполнении функции?
=======
# Does a function pickup latest changes?

The function sayHi uses an external variable name. When the function runs, which value is it going to use?
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete";

<<<<<<< HEAD
sayHi(); // что будет показано: "John" или "Pete"?
```

Такие ситуации встречаются как при разработке для браузера, так и для сервера. Функция может быть назначена на выполнение позже, чем она была создана, например, после действия пользователя или сетевого запроса.

Итак, вопрос: учитывает ли она последние изменения?
=======
sayHi(); // what will it show: "John" or "Pete"?
```

Such situations are common both in browser and server-side development. A function may be scheduled to execute later than it is created, for instance after a user action or a network request.

So, the question is: does it pick up the latest changes?
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
