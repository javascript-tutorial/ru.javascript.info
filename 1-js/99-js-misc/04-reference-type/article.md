<<<<<<< HEAD
# Ссылочный тип

```warn header="Продвинутая возможность языка"
Эта статья охватывает продвинутую тему, чтобы лучше понять некоторые нестандартные случаи.

Она несильно важна. Многие опытные разработчики прекрасно живут, даже не подозревая об этом. Читайте дальше, если хотите узнать, как все работает под капотом.
```

Некоторые хитрые способы вызова метода приводят к потере значения `this`, например:

```js run
let user = {
  name: "Джон",
  hi() { alert(this.name); },
  bye() { alert("Пока"); }
};

user.hi(); // Джон (простой вызов метода работает хорошо)

*!*
// теперь давайте попробуем вызывать user.hi или user.bye
// в зависимости от имени пользователя user.name
(user.name == "Джон" ? user.hi : user.bye)(); // Ошибка!
*/!*
```

В последней строчке кода используется условный оператор `?`, который определяет, какой будет вызван метод (`user.hi` или `user.bye`) в зависимости от выполнения условия. В данном случае будет выбран `user.hi`.

Затем метод тут же вызывается с помощью скобок `()`. Но вызов не работает как положено!

Вы можете видеть, что при вызове будет ошибка, потому что значением `"this"` внутри функции становится `undefined` (полагаем, что у нас строгий режим).

Так работает (доступ к методу объекта через точку):
```js
user.hi();
```

Так уже не работает (вызываемый метод вычисляется):
```js
(user.name == "John" ? user.hi : user.bye)(); // Ошибка!
```

Почему? Если мы хотим понять, почему так происходит, давайте разберёмся (заглянем под капот), как работает вызов методов (`obj.method()`).

## Ссылочный тип: объяснение

Присмотревшись поближе, в выражении `obj.method()` можно заметить две операции:

1. Сначала оператор точка `'.'` возвращает свойство объекта - его метод (`obj.method`).
2. Затем скобки `()` вызывают этот метод (исполняется код метода).

Итак, каким же образом информация о `this` передаётся из первой части во вторую?

Если мы поместим эти операции в отдельные строки, то значение `this`, естественно, будет потеряно:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
};

*!*
// разделим получение метода объекта и его вызов в разных строках
let hi = user.hi;
hi(); // Ошибка, потому что значением this является undefined
*/!*
```

Здесь `hi = user.hi` сохраняет функцию в переменной, и далее в последней строке она вызывается полностью сама по себе, без объекта, так что нет `this`.

**Для работы вызовов типа `user.hi()`, JavaScript использует трюк - точка `'.'` возвращает не саму функцию, а специальное значение "ссылочного типа", называемого [Reference Type](https://tc39.github.io/ecma262/#sec-reference-specification-type).**

Этот ссылочный тип (Reference Type) является внутренним типом. Мы не можем явно использовать его, но он используется внутри языка.

Значение ссылочного типа - это "триплет": комбинация из трёх значений `(base, name, strict)`, где:

- `base` - это объект.
- `name` - это имя свойства объекта.
- `strict` - это режим исполнения. Является true, если действует строгий режим (`use strict`).

Результатом доступа к свойству `user.hi` является не функция, а значение ссылочного типа. Для `user.hi` в строгом режиме оно будет таким:

```js
// значение ссылочного типа (Reference Type)
(user, "hi", true)
```

Когда скобки `()` применяются к значению ссылочного типа (происходит вызов), то они получают полную информацию об объекте и его методе, и могут поставить правильный `this` (`user` в данном случае, по `base`).

Ссылочный тип - исключительно внутренний, промежуточный, используемый, чтобы передать информацию от точки `.` до вызывающих скобок `()`.

При любой другой операции, например, присваивании `hi = user.hi`, ссылочный тип заменяется на собственно значение `user.hi` (функцию), и дальше работа уже идёт только с ней. Поэтому дальнейший вызов происходит уже без `this`.

Таким образом, значение `this` передаётся правильно, только если функция вызывается напрямую с использованием синтаксиса точки `obj.method()` или квадратных скобок `obj['method']()` (они делают то же самое). Существуют различные способы решения этой проблемы: одним из таких является [func.bind()](/bind#solution-2-bind).

## Итого

Ссылочный тип - это внутренний тип языка.

Чтение свойства, например, с точкой `.` в `obj.method()` возвращает не точное значение свойства, а специальное значение "ссылочного типа", в котором хранится как значение свойства, так и объект, из которого оно было взято.

Это нужно для последующего вызова метода `()`, чтобы получить объект и установить для него `this`.

Для всех остальных операций ссылочный тип автоматически становится значением свойства (в нашем случае функцией).

Вся механика скрыта от наших глаз. Это имеет значение только в особых случаях, например, когда метод динамически извлекается из объекта с использованием выражения.
=======

# Reference Type

```warn header="In-depth language feature"
This article covers an advanced topic, to understand certain edge-cases better.

It's not important. Many experienced developers live fine without knowing it. Read on if you want to know how things work under the hood.
```

A dynamically evaluated method call can lose `this`.

For instance:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // works

// now let's call user.hi or user.bye depending on the name
*!*
(user.name == "John" ? user.hi : user.bye)(); // Error!
*/!*
```

On the last line there is a conditional operator that chooses either `user.hi` or `user.bye`. In this case the result is `user.hi`.

Then the method is immediately called with parentheses `()`. But it doesn't work correctly!

As you can see, the call results in an error, because the value of `"this"` inside the call becomes `undefined`.

This works (object dot method):
```js
user.hi();
```

This doesn't (evaluated method):
```js
(user.name == "John" ? user.hi : user.bye)(); // Error!
```

Why? If we want to understand why it happens, let's get under the hood of how `obj.method()` call works.

## Reference type explained

Looking closely, we may notice two operations in `obj.method()` statement:

1. First, the dot `'.'` retrieves the property `obj.method`.
2. Then parentheses `()` execute it.

So, how does the information about `this` get passed from the first part to the second one?

If we put these operations on separate lines, then `this` will be lost for sure:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
};

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
- `name` is the property name.
- `strict` is true if `use strict` is in effect.

The result of a property access `user.hi` is not a function, but a value of Reference Type. For `user.hi` in strict mode it is:

```js
// Reference Type value
(user, "hi", true)
```

When parentheses `()` are called on the Reference Type, they receive the full information about the object and its method, and can set the right `this` (`user` in this case).

Reference type is a special "intermediary" internal type, with the purpose to pass information from dot `.` to calling parentheses `()`.

Any other operation like assignment `hi = user.hi` discards the reference type as a whole, takes the value of `user.hi` (a function) and passes it on. So any further operation "loses" `this`.

So, as the result, the value of `this` is only passed the right way if the function is called directly using a dot `obj.method()` or square brackets `obj['method']()` syntax (they do the same here). There are various ways to solve this problem such as [func.bind()](/bind#solution-2-bind).

## Summary

Reference Type is an internal type of the language.

Reading a property, such as with dot `.` in `obj.method()` returns not exactly the property value, but a special "reference type" value that stores both the property value and the object it was taken from.

That's for the subsequent method call `()` to get the object and set `this` to it.

For all other operations, the reference type automatically becomes the property value (a function in our case).

The whole mechanics is hidden from our eyes. It only matters in subtle cases, such as when a method is obtained dynamically from the object, using an expression.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
