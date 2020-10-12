
<<<<<<< HEAD
# Опциональная цепочка '?.'

[recent browser="new"]

Опциональная цепочка `?.` — это безопасный способ доступа к свойствам вложенных объектов, даже если какое-либо из промежуточных свойств не существует.

## Проблема "несуществующего свойства"

Если вы только начали читать учебник и изучать JavaScript, то, возможно, эта проблема вам пока незнакома, но она достаточно распространена.

Например, рассмотрим объекты для пользователей `user`. У большинства пользователей есть адрес `user.address` с улицей `user.address.street`, но некоторые адрес не указали. 

В этом случае при попытке получить свойство `user.address.street` будет ошибка:

```js run
let user = {}; // пользователь без свойства address

alert(user.address.street); // ошибка!
```

Это нормальный результат, так работает JavaScript, но во многих реальных ситуациях удобнее было бы получать не ошибку, а просто `undefined` ("нет улицы"). 

Или ещё пример. В веб-разработке нам бывает нужно получить данные об HTML-элементе, который иногда может отсутствовать на странице:

```js run
// Произойдёт ошибка, если querySelector(...) равен null.
let html = document.querySelector('.my-element').innerHTML;
```

До появления `?.` в языке для решения подобных проблем использовался оператор `&&`.

Например:

```js run
let user = {}; // пользователь без адреса

alert( user && user.address && user.address.street ); // undefined (без ошибки)
```

Использование логического И со всей цепочкой свойств гарантирует, что все они существуют (а если нет - вычисление прекращается), но это довольно длинная и громоздкая конструкция.

## Опциональная цепочка

Опциональная цепочка `?.` останавливает вычисление и возвращает `undefined`, если часть перед `?.` имеет значение `undefined` или `null`.

**Для краткости в этой статье мы будем говорить о значении, что оно "существует", если оно отличается от `null` или `undefined`.**

Вот безопасный способ обратиться к свойству `user.address.street`:

```js run
let user = {}; // пользователь без адреса

alert( user?.address?.street ); // undefined (без ошибки)
```

Чтение адреса с помощью конструкции `user?.address` выполняется без ошибок, даже если объекта `user` не существует:
=======
# Optional chaining '?.'

[recent browser="new"]

The optional chaining `?.` is a safe way to access nested object properties, even if an intermediate property doesn't exist.

## The "non-existing property" problem

If you've just started to read the tutorial and learn JavaScript, maybe the problem hasn't touched you yet, but it's quite common.

As an example, let's consider objects for user data. Most of our users have addresses in `user.address` property, with the street `user.address.street`, but some did not provide them. 

In such case, when we attempt to get `user.address.street`, we'll get an error:

```js run
let user = {}; // the user without "address" property

alert(user.address.street); // Error!
```

That's the expected result, JavaScript works like this, but many practical cases we'd prefer to get `undefined` instead of an error (meaning "no street").

...And another example. In the web development, we may need to get an information about an element on the page, that sometimes doesn't exist:

```js run
// Error if the result of querySelector(...) is null
let html = document.querySelector('.my-element').innerHTML;
```

Before `?.` appeared in the language, the `&&` operator was used to work around that.

For example:

```js run
let user = {}; // user has no address

alert( user && user.address && user.address.street ); // undefined (no error)
```

AND'ing the whole path to the property ensures that all components exist (if not, the evaluation stops), but is cumbersome to write.

## Optional chaining

The optional chaining `?.` stops the evaluation and returns `undefined` if the part before `?.` is `undefined` or `null`.

**Further in this article, for brevity, we'll be saying that something "exists" if it's not `null` and not `undefined`.**

Here's the safe way to access `user.address.street`:

```js run
let user = {}; // user has no address

alert( user?.address?.street ); // undefined (no error)
```

Reading the address with `user?.address` works even if `user` object doesn't exist:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

<<<<<<< HEAD
Обратите внимание, что синтаксис `?.` делает необязательным только свойство перед ним, а не какое-либо последующее.

В приведённом выше примере конструкция `user?.` допускает, что переменная `user` может быть содержать `null/undefined`.

С другой стороны, если объект `user` существует, то в нём должно быть свойство `user.address`, иначе выполнение `user?.address.street` вызовет ошибку из-за второй точки.

```warn header="Не злоупотребляйте опциональной цепочкой"
Используйте `?.` только тогда, когда допускаете ситуацию, что значение перед ним не существует.

Например, если по нашей логике объект `user` точно существует, но его свойство `address` является необязательным, то предпочтительнее использовать следующую конструкцию: `user.address?.street`.

Тогда если переменная `user` по ошибке окажется пустой, мы увидим программную ошибку и исправим это.
```

````warn header="Переменная перед `?.` должна быть объявлена"
Если переменной `user` вообще не существует, то выражение `user?.anything` выдаст ошибку:
=======
Please note: the `?.` syntax makes optional the value before it, but not any further.

In the example above, `user?.` allows only `user` to be `null/undefined`.

On the other hand, if `user` does exist, then it must have `user.address` property, otherwise `user?.address.street` gives an error at the second dot.

```warn header="Don't overuse the optional chaining"
We should use `?.` only where it's ok that something doesn't exist.

For example, if according to our coding logic `user` object must be there, but `address` is optional, then `user.address?.street` would be better.

So, if `user` happens to be undefined due to a mistake, we'll see a programming error about it and fix it. Otherwise, coding errors can be silenced where not appropriate, and become more difficult to debug.
```

````warn header="The variable before `?.` must be declared"
If there's no variable `user` at all, then `user?.anything` triggers an error:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js run
// ReferenceError: user is not defined
user?.address;
```
<<<<<<< HEAD
Объявление переменной (например `let/const/var user`) обязательно должно быть. Опциональная цепочка работает только с существующими переменными.
````

## Сокращённое вычисление

Как уже говорилось, `?.` немедленно останавливает вычисление, если левой части не существует.

Таким образом, последующие вызовы функций или операции не будут выполнены.

Например:
=======
There must be a declaration (e.g. `let/const/var user`). The optional chaining works only for declared variables.
````

## Short-circuiting

As it was said before, the `?.` immediately stops ("short-circuits") the evaluation if the left part doesn't exist.

So, if there are any further function calls or side effects, they don't occur.

For instance:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js run
let user = null;
let x = 0;

<<<<<<< HEAD
user?.sayHi(x++); // нет sayHi, поэтому до x++ вычисление не дойдет

alert(x); // 0, значение не было увеличено на единицу
```

## Другие варианты применения: ?.(), ?.[]

Опциональная цепочка `?.` — это не оператор, а специальная синтаксическая конструкция, которая также работает с функциями и квадратными скобками.

Например, `?.()` используется для вызова потенциально несуществующей функции.

В следующем примере не у всех пользователей есть метод `admin`:
=======
user?.sayHi(x++); // no "sayHi", so the execution doesn't reach x++

alert(x); // 0, value not incremented
```

## Other variants: ?.(), ?.[]

The optional chaining `?.` is not an operator, but a special syntax construct, that also works with functions and square brackets.

For example, `?.()` is used to call a function that may not exist.

In the code below, some of our users have `admin` method, and some don't:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js run
let user1 = {
  admin() {
<<<<<<< HEAD
    alert("Я администратор");
=======
    alert("I am admin");
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
  }
}

let user2 = {};

*!*
<<<<<<< HEAD
user1.admin?.(); // Я администратор
=======
user1.admin?.(); // I am admin
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
user2.admin?.();
*/!*
```

<<<<<<< HEAD
В обоих вызовах сначала используем точку (`user1.admin`), чтобы получить свойство `admin`, потому что объект пользователя точно существует, к нему можно обратиться без какой-либо ошибки.

Затем уже `?.()` проверяет левую часть: если функция `admin` существует, то она выполнится (это так для `user1`). Иначе (для `user2`) вычисление остановится без ошибок.

Также существует синтаксис `?.[]`, если значение свойства требуется получить с помощью квадратных скобок `[]`, а не через точку `.`. Как и в остальных случаях, такой способ позволяет защититься от ошибок при доступе к свойству объекта, которого может не быть.

```js run
let user1 = {
  firstName: "Иван"
};

let user2 = null; // Представим, что пользователь не авторизован

let key = "firstName";

alert( user1?.[key] ); // Иван
=======
Here, in both lines we first use the dot (`user1.admin`) to get `admin` property, because the user object must exist, so it's safe read from it.

Then `?.()` checks the left part: if the admin function exists, then it runs (that's so for `user1`). Otherwise (for `user2`) the evaluation stops without errors.

The `?.[]` syntax also works, if we'd like to use brackets `[]` to access properties instead of dot `.`. Similar to previous cases, it allows to safely read a property from an object that may not exist.

```js run
let user1 = {
  firstName: "John"
};

let user2 = null; // Imagine, we couldn't authorize the user

let key = "firstName";

alert( user1?.[key] ); // John
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

<<<<<<< HEAD
Кроме этого, `?.` можно совместно использовать с `delete`:

```js run
delete user?.name; // Удалить user.name, если пользователь существует
```

````warn header="Можно использовать `?.` для безопасного чтения и удаления, но не для записи"
Опциональная цепочка `?.` не имеет смысла в левой части присваивания.

Например:

```js run
let user;

user?.name = "John"; // Ошибка, это не сработает
// это по сути то же самое что undefined = "John"
```

Она недостаточно "умна" для этого.
````

## Итого

Синтаксис опциональной цепочки `?.` имеет три формы:

1. `obj?.prop` -- возвращает `obj.prop`, если существует `obj`, и `undefined` в противном случае.
2. `obj?.[prop]` -- возвращает `obj[prop]`, если существует `obj`, и `undefined` в противном случае.
3. `obj.method?.()` -- вызывает `obj.method()`, если существует `obj.method`, в противном случае возвращает `undefined`.

Как мы видим, все они просты и понятны в использовании. `?.` проверяет левую часть выражения на равенство `null/undefined`, и продолжает дальнейшее вычисление, только если это не так.

Цепочка `?.` позволяет без возникновения ошибок обратиться к вложенным свойствам.

Тем не менее, нужно разумно использовать `?.` — только там, где это уместно, если допустимо, что левая часть не существует. Чтобы таким образом не скрывать возможные ошибки программирования.
=======
Also we can use `?.` with `delete`:

```js run
delete user?.name; // delete user.name if user exists
```

````warn header="We can use `?.` for safe reading and deleting, but not writing"
The optional chaining `?.` has no use at the left side of an assignment.

For example:
```js run
let user = null;

user?.name = "John"; // Error, doesn't work
// because it evaluates to undefined = "John"
```

It's just not that smart.
````

## Summary

The optional chaining `?.` syntax has three forms:

1. `obj?.prop` -- returns `obj.prop` if `obj` exists, otherwise `undefined`.
2. `obj?.[prop]` -- returns `obj[prop]` if `obj` exists, otherwise `undefined`.
3. `obj.method?.()` -- calls `obj.method()` if `obj.method` exists, otherwise returns `undefined`.

As we can see, all of them are straightforward and simple to use. The `?.` checks the left part for `null/undefined` and allows the evaluation to proceed if it's not so.

A chain of `?.` allows to safely access nested properties.

Still, we should apply `?.` carefully, only where it's acceptable that the left part doesn't to exist. So that it won't hide programming errors from us, if they occur.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
