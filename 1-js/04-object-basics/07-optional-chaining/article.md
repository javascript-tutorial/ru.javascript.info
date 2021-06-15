
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

As an example, let's say we have `user` objects that hold the information about our users.

Most of our users have addresses in `user.address` property, with the street `user.address.street`, but some did not provide them.

In such case, when we attempt to get `user.address.street`, and the user happens to be without an address, we get an error:

```js run
let user = {}; // a user without "address" property

alert(user.address.street); // Error!
```

That's the expected result. JavaScript works like this. As `user.address` is `undefined`, an attempt to get `user.address.street` fails with an error.

In many practical cases we'd prefer to get `undefined` instead of an error here (meaning "no street").

...And another example. In the web development, we can get an object that corresponds to a web page element using a special method call, such as `document.querySelector('.elem')`, and it returns `null` when there's no such element.

```js run
// document.querySelector('.elem') is null if there's no element
let html = document.querySelector('.elem').innerHTML; // error if it's null
```

Once again, if the element doesn't exist, we'll get an error accessing `.innerHTML` of `null`. And in some cases, when the absence of the element is normal, we'd like to avoid the error and just accept `html = null` as the result.

How can we do this?

The obvious solution would be to check the value using `if` or the conditional operator `?`, before accessing its property, like this:

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

It works, there's no error... But it's quite inelegant. As you can see, the `"user.address"` appears twice in the code. For more deeply nested properties, that becomes a problem as more repetitions are required.

E.g. let's try getting `user.address.street.name`.

We need to check both `user.address` and `user.address.street`:

```js
let user = {}; // user has no address

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

That's just awful, one may even have problems understanding such code.

Don't even care to, as there's a better way to write it, using the `&&` operator:

```js run
let user = {}; // user has no address

alert( user.address && user.address.street && user.address.street.name ); // undefined (no error)
```

AND'ing the whole path to the property ensures that all components exist (if not, the evaluation stops), but also isn't ideal.

As you can see, property names are still duplicated in the code. E.g. in the code above, `user.address` appears three times.

That's why the optional chaining `?.` was added to the language. To solve this problem once and for all!

## Optional chaining

The optional chaining `?.` stops the evaluation if the value before `?.` is `undefined` or `null` and returns `undefined`.

**Further in this article, for brevity, we'll be saying that something "exists" if it's not `null` and not `undefined`.**

In other words, `value?.prop`:
- works as `value.prop`, if `value` exists,
- otherwise (when `value` is `undefined/null`) it returns `undefined`.

Here's the safe way to access `user.address.street` using `?.`:

```js run
let user = {}; // user has no address

alert( user?.address?.street ); // undefined (no error)
```

The code is short and clean, there's no duplication at all.

Reading the address with `user?.address` works even if `user` object doesn't exist:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

<<<<<<< HEAD
Обратите внимание, что синтаксис `?.` делает необязательным только свойство перед ним, а не какое-либо последующее.

В приведённом выше примере конструкция `user?.` допускает, что переменная `user` может содержать `null/undefined`.

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

E.g. in `user?.address.street.name` the `?.` allows `user` to safely be `null/undefined` (and returns `undefined` in that case), but that's only for `user`. Further properties are accessed in a regular way. If we want some of them to be optional, then we'll need to replace more `.` with `?.`.

```warn header="Don't overuse the optional chaining"
We should use `?.` only where it's ok that something doesn't exist.

For example, if according to our coding logic `user` object must exist, but `address` is optional, then we should write `user.address?.street`, but not `user?.address?.street`.

So, if `user` happens to be undefined due to a mistake, we'll see a programming error about it and fix it. Otherwise, coding errors can be silenced where not appropriate, and become more difficult to debug.
```

````warn header="The variable before `?.` must be declared"
If there's no variable `user` at all, then `user?.anything` triggers an error:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

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
The variable must be declared (e.g. `let/const/var user` or as a function parameter). The optional chaining works only for declared variables.
````

## Short-circuiting

As it was said before, the `?.` immediately stops ("short-circuits") the evaluation if the left part doesn't exist.

So, if there are any further function calls or side effects, they don't occur.

For instance:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let user = null;
let x = 0;

<<<<<<< HEAD
user?.sayHi(x++); // нет user, поэтому до x++ вычисление не дойдет

alert(x); // 0, значение не было увеличено на единицу
```

## Другие варианты применения: ?.(), ?.[]

Опциональная цепочка `?.` — это не оператор, а специальная синтаксическая конструкция, которая также работает с функциями и квадратными скобками.

Например, `?.()` используется для вызова потенциально несуществующей функции.

В следующем примере не у всех пользователей есть метод `admin`:

```js run
let user1 = {
  admin() {
    alert("Я администратор");
  }
}

let user2 = {};

*!*
user1.admin?.(); // Я администратор
user2.admin?.();
*/!*
```

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
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

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
user?.sayHi(x++); // no "sayHi", so the execution doesn't reach x++

alert(x); // 0, value not incremented
```

## Other variants: ?.(), ?.[]

The optional chaining `?.` is not an operator, but a special syntax construct, that also works with functions and square brackets.

For example, `?.()` is used to call a function that may not exist.

In the code below, some of our users have `admin` method, and some don't:

```js run
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // I am admin
*/!*

*!*
userGuest.admin?.(); // nothing (no such method)
*/!*
```

Here, in both lines we first use the dot (`userAdmin.admin`) to get `admin` property, because we assume that the user object exists, so it's safe read from it.

Then `?.()` checks the left part: if the admin function exists, then it runs (that's so for `userAdmin`). Otherwise (for `userGuest`) the evaluation stops without errors.

The `?.[]` syntax also works, if we'd like to use brackets `[]` to access properties instead of dot `.`. Similar to previous cases, it allows to safely read a property from an object that may not exist.

```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null; 

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
```

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

Still, we should apply `?.` carefully, only where it's acceptable that the left part doesn't exist. So that it won't hide programming errors from us, if they occur.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
