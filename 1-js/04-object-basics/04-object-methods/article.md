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

В JavaScript ключевое слово "this" ведет себя иначе чем в большентве других языках программирования. Во-первых, оно может использоваться в любой функции.

В этом коде нет синтаксической ошибки:

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

Значение `this` вычисляется во время выполнения кода. И оно может быть любым.

Например, одна и таже функция может иметь различное значение "this" когда вызывается из разных объектов:

```js run
let user = { name: "Джон" };
let admin = { name: "Админ" };

function sayHi() {
  alert( this.name );
}

*!*
// используем одну и ту же функцию в двух объектах
user.f = sayHi;
admin.f = sayHi;
*/!*

// вызовы функции, приведенные ниже, имеют разное значение this
// "this" внутри функции является ссылкой на объект, который указан "перед точкой" (т.о. значение "this" внутри функции определяется объектом, который вызывает эту функцию)
user.f(); // Джон  (this == user)
admin.f(); // Админ  (this == admin)

admin['f'](); // Админ (неважен способ доступ к методу - через точку или квадтратные скобки)
```

На самом деле, мы можем вызвать функцию вообще без использования объекта:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

В строгом режиме (`"use strict"`) в таком коде значением `this` будет является `undefined`. Если мы попытаемся получить доступ к name, используя `this.name` в строгом режиме - это вызовет ошибку.

В нестрогом режиме значением `this` в таком случае будет *глобальный объект* (`window` для браузера, мы вернемся к этому позже в главе  [Глобальный объект](info:global-object)). Это исторически сложившееся поведение `this`, которое исправляется использованием строгого режима (`"use strict"`).

Пожалуста, обратите внимание, что обычно вызов функции, которая использует `this`, без объекта - не является нормальным и больше говорит об ошибке в программировании. Если функция использует `this`, тогда это обычно означает, что она будет вызываться в контектсте какого-либо объекта.

```smart header="Последствия несвязонности `this`"
Если вы до этого изучали другие языки программирования, тогда вы, скорее всего, привыкли к идее "связонности `this`" - когда методы, определенные внутри объекта всегда сохраняют в качестве значения `this` ссылку на свой объект (в котром был определен метод).

В JavaScript `this` является "свободным", его значение вычисляется в момент вызова метода и не зависит от того, где этот метод был объявлен, а зависит от того, какой объект вызывает метод (какой объект стоит "перед точкой"). 

Эта идея вычисления `this` в момент исполнения имеет как свои плюсы, так и минусы. С одной стороны, функция может быть повторно использована в качестве метода у различных объектов (что повышает гибкость). С другой стороны, бОльшая гибкость открывает место ошибкам.

Здесь наша позиция не в том, чтобы судить является ли это решение в языке хорошим или плохим. Мы должны понимать как с этим работать, как получить выгоды и избежать проблем.
```
```

## Внутренности: Тип ссылки

```warn header="Углубленная особенность языка"
Этот раздел объясняет сложную тему, чтобы лучше понимать некоторые крайние случаи.

Если вы хотите продвигаться быстрее, его можно пропустить или отложить.
```

Не очевидный вызов метода может приветс к потери значения `this`, например:

```js run
let user = {
  name: "Джон",
  hi() { alert(this.name); },
  bye() { alert("Пока"); }
};

user.hi(); // Джон (простой вызов метода работает хорошо)

*!*
// теперь, давайте попробуем вызывать user.hi или user.bye в зависимости от имени ползователя (user.name)
(user.name == "Джон" ? user.hi : user.bye)(); // Ошибка, имя "Джон" не будет выведено во 2-й раз!
*/!*
```

В последтней строчке кода используется тернарный оператор, который определяет какой будет вызван метод `user.hi` или `user.bye` в зависимости от выполнения условия. В данном случае будет выбран `user.hi`.

И тогда метод сразу вызывается с помощью круглых скобок `()`. Но это не работает должным образом.

Вы можете видеть, что при вызове будет получен ошибочный результат (или ошибка в строгом режиме), потому что значением `"this"` внутри функции становиться `undefined`.

Так работает (доступ к методу объекта через точку):
```js
user.hi();
```

Так уже не работает (вызыаемый метод вычисляется):
```js
(user.name == "Джон" ? user.hi : user.bye)(); // Ошибка!
```

Почему? Если мы хотим понять почему так происходит, давайте разберемся (заглянем под капот) как работает вызов методов (`obj.method()`).

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
