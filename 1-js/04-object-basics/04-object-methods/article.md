# Методы объекта, "this"

Объекты обычно создаются чтобы представить сущности реального мира, будь то пользовательи, заказы и так далее:

```js
let user = {
  name: "Джон",
  age: 30
};
```

И, также как и в реальном мире, пользователь может *совершать действия*: выбирать что-то из корзины покупок, автозироваться, выйти из системы, оплатить и т.п.

Такие действия в JavaScript представляют функции, являющиеся значениями свойств объекта.

## Примеры методов

Для начала, давайте научим нашего пользователя (созданный объект) `user` здороваться:

```js run
let user = {
  name: "Джон",
  age: 30
};

*!*
user.sayHi = function() {
  alert("Привет!");
};
*/!*

user.sayHi(); // Привет!
```

Здесь мы просто использовали Function Expression (функциональное выражение), чтобы создать функцию для приветствия и присвоили её свойству `user.sayHi` нашего объекта.

Теперь мы можем вызвать эту функцию. Теперь пользователь может говорить!

Функция, которая является свойством объекта, называется *методом* этого объекта.

Итак, мы получили метод `sayHi` объекта `user`.

Конечно, мы могли бы заранее объявить функцию и использовать ее в качестве метода, примерно так:

```js run
let user = {
  // ...
};

*!*
// сначала объявляем
function sayHi() {
  alert("Привет!");
};

// затем добавляем в качестве метода
user.sayHi = sayHi;
*/!*

user.sayHi(); // Привет!
```

```smart header="Объектно-ориентированное программирование"
Когда мы пишем наш код используя объекты для представления сущностей реального мира - это называется [объектно-ориентированное программирование](https://ru.wikipedia.org/wiki/%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BD%D0%BE-%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5) или сокращенно: "ООП".

ООП является большой предметной областью и интересной наукой сама по себе. Как выбрать правильные сущности? Как организовать взаимодействие между ними? Это создание архитектуру и есть хорошие книги по этой теме, такие как "Design Patterns: Elements of Reusable Object-Oriented Software" авторов E.Gamma, R.Helm, R.Johnson, J.Vissides или "Object-Oriented Analysis and Design with Applications" за авторством G.Booch, а также еще множество книг.
```
### Сокращенная запись метода

Существует более короткий синтаксис для методов в литерале объекта:

```js
// эти объекты делают тоже самое (одинаковые методы)
let user = {
  sayHi: function() {
    alert("Привет");
  }
};

//сокращенная запись выглядит лучше, не так ли?
let user = {
*!*
  sayHi() { // тоже самое что и "sayHi: function()"
*/!*
    alert("Привет");
  }
};
```

Как было показано, мы можем опустить ключевое слово `"function"` и просто написать `sayHi()`.

Нужно отметить, что такая сокращенная нотаяция не является полностью идентичной полной нотации. Есть тонкие различия, связанные с наследованием объектов (что будет рассмортено позже), но на данном этапе изучения это не является важным. В большинстве случаев сокращенный синтаксис более предпочтителен.

## Ключевое слово "this" в методах

Как правило, методу объекта необходим доступ к информации, которая хранится в этом объекте, чтобы выполнить с ней какие-либо действия (в соответствии с назначением метода).

Например, коду внутри `user.sayHi()` может понадобиться имя пользователя, которое храниться в объекте `user`.

**Для доступа к информации внутри объекта метод может использовать ключевое словое `this`.**

Значение `this` - это объект "перед точкой", который использовался для вызова метода.

Например:

```js run
let user = {
  name: "Джон",
  age: 30,

  sayHi() {
*!*
    alert(this.name);
*/!*
  }

};

user.sayHi(); // Джон
```

Здесь во время выполнения кода `user.sayHi()`, значением `this` будет являться `user` (ссылка на объект `user`).

Технически, также возможно получить доступ к объекту без ключевого слова `this`, ссылаясь на него через внешнюю переменную (в которой хранится ссылка на этот объект):

```js
let user = {
  name: "Джон",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // используем переменную "user" вместо ключевого слова "this"
*/!*
  }

};
```

...Но такой код будет ненадежным. Если мы решим скопировать ссылку на объект `user` в другую переменную, например `admin = user` и перезапишем переменную `user` чем-то другим, тогда будет получен доступ к неправильному объекту при вызовер метода из `admin`.

Это показано ниже:

```js run
let user = {
  name: "Джон",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // приведет к ошибке
*/!*
  }

};


let admin = user;
user = null; // обнулим переменную, для наглядности. Теперь переменная "user" не хранит ссылку на объект.

admin.sayHi(); // Оп! внутри sayHi(), используется старая переменная "user", которая боьше не ссылается на объект! Ошибка!
```

Если мы используем `this.name` вместо `user.name` внутри `alert`, тогда этот код будет работать.

## "this" не является связанным

In JavaScript, "this" keyword behaves unlike most other programming languages. First, it can be used in any function.

There's no syntax error in the code like that:

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

The value of `this` is evaluated during the run-time. And it can be anything.

For instance, the same function may have different "this" when called from different objects:

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// use the same functions in two objects
user.f = sayHi;
admin.f = sayHi;
*/!*

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (dot or square brackets access the method – doesn't matter)
```

Actually, we can call the function without an object at all:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

In this case `this` is `undefined` in strict mode. If we try to access `this.name`, there will be an error.

In non-strict mode the value of `this` in such case will be the *global object* (`window` in a browser, we'll get to it later in the chapter [](info:global-object)). This is a historical behavior that `"use strict"` fixes.

Please note that usually a call of a function that uses `this` without an object is not normal, but rather a programming mistake. If a function has `this`, then it is usually meant to be called in the context of an object.

```smart header="The consequences of unbound `this`"
If you come from another programming language, then you are probably used to the idea of a "bound `this`", where methods defined in an object always have `this` referencing that object.

In JavaScript `this` is "free", its value is evaluated at call-time and does not depend on where the method was declared, but rather on what's the object "before the dot".

The concept of run-time evaluated `this` has both pluses and minuses. On the one hand, a function can be reused for different objects. On the other hand, greater flexibility opens a place for mistakes.

Here our position is not to judge whether this language design decision is good or bad. We'll understand how to work with it, how to get benefits and evade problems.
```

## Internals: Reference Type

```warn header="In-depth language feature"
This section covers an advanced topic, to understand certain edge-cases better.

If you want to go on faster, it can be skipped or postponed.
```

An intricate method call can lose `this`, for instance:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // John (the simple call works)

*!*
// now let's call user.hi or user.bye depending on the name
(user.name == "John" ? user.hi : user.bye)(); // Error!
*/!*
```

On the last line there is a ternary operator that chooses either `user.hi` or `user.bye`. In this case the result is `user.hi`.

The method is immediately called with parentheses `()`. But it doesn't work right!

You can see that the call results in an error, because the value of `"this"` inside the call becomes `undefined`.

This works (object dot method):
```js
user.hi();
```

This doesn't (evaluated method):
```js
(user.name == "John" ? user.hi : user.bye)(); // Error!
```

Why? If we want to understand why it happens, let's get under the hood of how `obj.method()` call works.

Looking closely, we may notice two operations in `obj.method()` statement:

1. First, the dot `'.'` retrieves the property `obj.method`.
2. Then parentheses `()` execute it.

So, how does the information about `this` get passed from the first part to the second one?

If we put these operations on separate lines, then `this` will be lost for sure:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
}

*!*
// split getting and calling the method in two lines
let hi = user.hi;
hi(); // Error, because this is undefined
*/!*
```

Here `hi = user.hi` puts the function into the variable, and then on the last line it is completely standalone, and so there's no `this`.

**To make `user.hi()` calls work, JavaScript uses a trick -- the dot `'.'` returns not a function, but a value of the special [Reference Type](https://tc39.github.io/ecma262/#sec-reference-specification-type).**

The Reference Type is a "specification type". We can't explicitly use it, but it is used internally by the language.

The value of Reference Type is a three-value combination `(base, name, strict)`, where:

- `base` is the object.
- `name` is the property.
- `strict` is true if `use strict` is in effect.

The result of a property access `user.hi` is not a function, but a value of Reference Type. For `user.hi` in strict mode it is:

```js
// Reference Type value
(user, "hi", true)
```

When parentheses `()` are called on the Reference Type, they receive the full information about the object and its method, and can set the right `this` (`=user` in this case).

Any other operation like assignment `hi = user.hi` discards the reference type as a whole, takes the value of `user.hi` (a function) and passes it on. So any further operation "loses" `this`.

So, as the result, the value of `this` is only passed the right way if the function is called directly using a dot `obj.method()` or square brackets `obj['method']()` syntax (they do the same here). Later in this tutorial, we will learn various ways to solve this problem such as [func.bind()](/bind#solution-2-bind).

## Arrow functions have no "this"

Arrow functions are special: they don't have their "own" `this`. If we reference `this` from such a function, it's taken from the outer "normal" function.

For instance, here `arrow()` uses `this` from the outer `user.sayHi()` method:

```js run
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

That's a special feature of arrow functions, it's useful when we actually do not want to have a separate `this`, but rather to take it from the outer context. Later in the chapter <info:arrow-functions> we'll go more deeply into arrow functions.


## Summary

- Functions that are stored in object properties are called "methods".
- Methods allow objects to "act" like `object.doSomething()`.
- Methods can reference the object as `this`.

The value of `this` is defined at run-time.
- When a function is declared, it may use `this`, but that `this` has no value until the function is called.
- That function can be copied between objects.
- When a function is called in the "method" syntax: `object.method()`, the value of `this` during the call is `object`.

Please note that arrow functions are special: they have no `this`. When `this` is accessed inside an arrow function, it is taken from outside.
