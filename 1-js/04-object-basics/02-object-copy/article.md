<<<<<<< HEAD
# Копирование объектов и ссылки

Одним из фундаментальных отличий объектов от примитивных типов данных является то, что они хранятся и копируются "по ссылке".

Примитивные типы: строки, числа, логические значения - присваиваются и копируются "по значению".

Например:

```js
let message = "Привет!";
let phrase = message;
```

В результате мы имеем две независимые переменные, каждая из которых хранит строку `"Привет!"`.

![](variable-copy-value.svg)


Объекты ведут себя иначе.

**Переменная хранит не сам объект, а его "адрес в памяти", другими словами "ссылку" на него.**

Проиллюстрируем это:

```js
let user = {
  name: "Иван"
};
```

![](variable-contains-reference.svg)

Сам объект хранится где-то в памяти. А в переменной `user` лежит "ссылка" на эту область памяти.

**Когда переменная объекта копируется - копируется ссылка, сам же объект не дублируется.**

Если мы представляем объект как ящик, то переменная – это ключ к нему. Копирование переменной дублирует ключ, но не сам ящик.

Например:


```js no-beautify
let user = { name: "Иван" };

let admin = user; // копируется ссылка
```

Теперь у нас есть две переменные, каждая из которых содержит ссылку на один и тот же объект:

![](variable-copy-reference.svg)

Мы можем использовать любую из переменных для доступа к ящику и изменения его содержимого:

```js run
let user = { name: 'Иван' };
=======
# Object references and copying

One of the fundamental differences of objects versus primitives is that objects are stored and copied "by reference", whereas primitive values: strings, numbers, booleans, etc -- are always copied "as a whole value".

That's easy to understand if we look a bit under the hood of what happens when we copy a value.

Let's start with a primitive, such as a string.

Here we put a copy of `message` into `phrase`:

```js
let message = "Hello!";
let phrase = message;
```

As a result we have two independent variables, each one storing the string `"Hello!"`.

![](variable-copy-value.svg)

Quite an obvious result, right?

Objects are not like that.

**A variable assigned to an object stores not the object itself, but its "address in memory" -- in other words "a reference" to it.**

Let's look at an example of such a variable:

```js
let user = {
  name: "John"
};
```

And here's how it's actually stored in memory:

![](variable-contains-reference.svg)

The object is stored somewhere in memory (at the right of the picture), while the `user` variable (at the left) has a "reference" to it.

We may think of an object variable, such as `user`, as like a sheet of paper with the address of the object on it.

When we perform actions with the object, e.g. take a property `user.name`, the JavaScript engine looks at what's at that address and performs the operation on the actual object.

Now here's why it's important.

**When an object variable is copied, the reference is copied, but the object itself is not duplicated.**

For instance:

```js no-beautify
let user = { name: "John" };

let admin = user; // copy the reference
```

Now we have two variables, each storing a reference to the same object:

![](variable-copy-reference.svg)

As you can see, there's still one object, but now with two variables that reference it.

We can use either variable to access the object and modify its contents:

```js run
let user = { name: 'John' };
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

let admin = user;

*!*
<<<<<<< HEAD
admin.name = 'Петя'; // изменено по ссылке из переменной "admin"
*/!*

alert(*!*user.name*/!*); // 'Петя', изменения видны по ссылке из переменной "user"
```

Приведённый выше пример демонстрирует, что объект только один. Как если бы у нас был один ящик с двумя ключами и мы использовали один из них (`admin`), чтобы войти в него и что-то изменить, а затем, открыв ящик другим ключом (`user`), мы бы увидели эти изменения.

## Сравнение по ссылке

Операторы равенства `==` и строгого равенства `===` для объектов работают одинаково.

**Два объекта равны только в том случае, если это один и тот же объект.**

В примере ниже две переменные ссылаются на один и тот же объект, поэтому они равны друг другу:

```js run
let a = {};
let b = a; // копирование по ссылке

alert( a == b ); // true, т.к. обе переменные ссылаются на один и тот же объект
alert( a === b ); // true
```

В другом примере два разных объекта не равны, хотя оба пусты:

```js run
let a = {};
let b = {}; // два независимых объекта
=======
admin.name = 'Pete'; // changed by the "admin" reference
*/!*

alert(*!*user.name*/!*); // 'Pete', changes are seen from the "user" reference
```

It's as if we had a cabinet with two keys and used one of them (`admin`) to get into it and make changes. Then, if we later use another key (`user`), we are still opening the same cabinet and can access the changed contents.

## Comparison by reference

Two objects are equal only if they are the same object.

For instance, here `a` and `b` reference the same object, thus they are equal:

```js run
let a = {};
let b = a; // copy the reference

alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true
```

And here two independent objects are not equal, even though they look alike (both are empty):

```js run
let a = {};
let b = {}; // two independent objects
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

alert( a == b ); // false
```

<<<<<<< HEAD
Для сравнений типа `obj1 > obj2` или для сравнения с примитивом `obj == 5` объекты преобразуются в примитивы. Мы скоро изучим, как работают такие преобразования объектов, но, по правде говоря, сравнения такого рода необходимы очень редко и обычно являются результатом ошибки программиста.

## Клонирование и объединение объектов, Object.assign

Таким образом, при копировании переменной с объектом создаётся ещё одна ссылка на тот же самый объект.

Но что, если нам всё же нужно дублировать объект? Создать независимую копию, клон?

Это выполнимо, но немного сложно, так как в JavaScript нет встроенного метода для этого. На самом деле, такая нужда возникает редко. В большинстве случаев нам достаточно копирования по ссылке.

Но если мы действительно этого хотим, то нам нужно создавать новый объект и повторять структуру дублируемого объекта, перебирая его свойства и копируя их.

Например так:

```js run
let user = {
  name: "Иван",
=======
For comparisons like `obj1 > obj2` or for a comparison against a primitive `obj == 5`, objects are converted to primitives. We'll study how object conversions work very soon, but to tell the truth, such comparisons are needed very rarely -- usually they appear as a result of a programming mistake.

## Cloning and merging, Object.assign [#cloning-and-merging-object-assign]

So, copying an object variable creates one more reference to the same object.

But what if we need to duplicate an object? Create an independent copy, a clone?

That's also doable, but a little bit more difficult, because there's no built-in method for that in JavaScript. But there is rarely a need -- copying by reference is good most of the time.

But if we really want that, then we need to create a new object and replicate the structure of the existing one by iterating over its properties and copying them on the primitive level.

Like this:

```js run
let user = {
  name: "John",
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  age: 30
};

*!*
<<<<<<< HEAD
let clone = {}; // новый пустой объект

// скопируем все свойства user в него
=======
let clone = {}; // the new empty object

// let's copy all user properties into it
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
for (let key in user) {
  clone[key] = user[key];
}
*/!*

<<<<<<< HEAD
// теперь в переменной clone находится абсолютно независимый клон объекта
clone.name = "Пётр"; // изменим в нём данные

alert( user.name ); // в оригинальном объекте значение свойства `name` осталось прежним – Иван.
```

Кроме того, для этих целей мы можем использовать метод [Object.assign](mdn:js/Object/assign).

Синтаксис:
=======
// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object
```

Also we can use the method [Object.assign](mdn:js/Object/assign) for that.

The syntax is:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
Object.assign(dest, [src1, src2, src3...])
```

<<<<<<< HEAD
- Первый аргумент `dest` — целевой объект.
- Остальные аргументы `src1, ..., srcN` (может быть столько, сколько нужно)) являются исходными объектами
- Метод копирует свойства всех исходных объектов `src1, ..., srcN` в целевой объект `dest`.  То есть, свойства всех перечисленных объектов, начиная со второго, копируются в первый объект.
- Возвращает объект `dest`.

Например, объединим несколько объектов в один:
```js
let user = { name: "Иван" };
=======
- The first argument `dest` is a target object.
- Further arguments `src1, ..., srcN` (can be as many as needed) are source objects.
- It copies the properties of all source objects `src1, ..., srcN` into the target `dest`. In other words, properties of all arguments starting from the second are copied into the first object.
- The call returns `dest`.

For instance, we can use it to merge several objects into one:
```js
let user = { name: "John" };
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
<<<<<<< HEAD
// копируем все свойства из permissions1 и permissions2 в user
Object.assign(user, permissions1, permissions2);
*/!*

// теперь user = { name: "Иван", canView: true, canEdit: true }
```

Если принимающий объект (`user`) уже имеет свойство с таким именем, оно будет перезаписано:

```js run
let user = { name: "Иван" };

Object.assign(user, { name: "Пётр" });

alert(user.name); // теперь user = { name: "Пётр" }
```

Мы также можем использовать `Object.assign` для замены `for..in` на простое клонирование:

```js
let user = {
  name: "Иван",
=======
// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);
*/!*

// now user = { name: "John", canView: true, canEdit: true }
```

If the copied property name already exists, it gets overwritten:

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // now user = { name: "Pete" }
```

We also can use `Object.assign` to replace `for..in` loop for simple cloning:

```js
let user = {
  name: "John",
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

<<<<<<< HEAD
Этот метод скопирует все свойства объекта `user` в пустой объект и возвратит его.

## Вложенное клонирование

До сих пор мы предполагали, что все свойства объекта `user` хранят примитивные значения. Но свойства могут быть ссылками на другие объекты. Что с ними делать?

Например, есть объект:
```js run
let user = {
  name: "Иван",
=======
It copies all properties of `user` into the empty object and returns it.

There are also other methods of cloning an object, e.g. using the [spread syntax](info:rest-parameters-spread) `clone = {...user}`, covered later in the tutorial.

## Nested cloning

Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects. What to do with them?

Like this:
```js run
let user = {
  name: "John",
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

<<<<<<< HEAD
Теперь при клонировании недостаточно просто скопировать `clone.sizes = user.sizes`, поскольку `user.sizes` - это объект, он будет скопирован по ссылке. А значит объекты `clone` и `user` в своих свойствах `sizes` будут ссылаться на один и тот же объект:

```js run
let user = {
  name: "Иван",
=======
Now it's not enough to copy `clone.sizes = user.sizes`, because the `user.sizes` is an object, it will be copied by reference. So `clone` and `user` will share the same sizes:

Like this:

```js run
let user = {
  name: "John",
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

<<<<<<< HEAD
alert( user.sizes === clone.sizes ); // true, один и тот же объект

// user и clone обращаются к одному sizes
user.sizes.width++;       // меняем свойство в одном объекте
alert(clone.sizes.width); // 51, видим результат в другом объекте
```

Чтобы исправить это, мы должны в цикле клонирования делать проверку, не является ли значение `user[key]` объектом, и если это так - скопировать и его структуру тоже. Это называется "глубокое клонирование".

Мы можем реализовать глубокое клонирование, используя рекурсию. Или, чтобы не изобретать велосипед, использовать готовую реализацию — метод [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) из JavaScript-библиотеки [lodash](https://lodash.com).

## Итого

Объекты присваиваются и копируются по ссылке. Другими словами, переменная хранит не "значение объекта", а "ссылку" (адрес в памяти) на это значение. Поэтому копирование такой переменной или передача её в качестве аргумента функции приводит к копированию этой ссылки, а не самого объекта.

Все операции с использованием скопированных ссылок (например, добавление или удаление свойств) выполняются с одним и тем же объектом.

Для "простого клонирования" объекта можно использовать `Object.assign`. Необходимо помнить, что `Object.assign` не делает глубокое клонирование объекта. Если внутри копируемого объекта есть свойство, значение которого не является примитивом, оно будет передано по ссылке. Для создания "настоящей копии" (полного клона объекта) можно воспользоваться методом из сторонней JavaScript-библиотеки [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
=======
alert( user.sizes === clone.sizes ); // true, same object

// user and clone share sizes
user.sizes.width++;       // change a property from one place
alert(clone.sizes.width); // 51, see the result from the other one
```

To fix that, we should use a cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning".

We can use recursion to implement it. Or, to not reinvent the wheel, take an existing implementation, for instance [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) from the JavaScript library [lodash](https://lodash.com).

````smart header="Const objects can be modified"
An important side effect of storing objects as references is that an object declared as `const` *can* be modified.

For instance:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

It might seem that the line `(*)` would cause an error, but it does not. The value of `user` is constant, it must always reference the same object, but properties of that object are free to change.

In other words, the `const user` gives an error only if we try to set `user=...` as a whole.

That said, if we really need to make constant object properties, it's also possible, but using totally different methods. We'll mention that in the chapter <info:property-descriptors>.
````

## Summary

Objects are assigned and copied by reference. In other words, a variable stores not the "object value", but a "reference" (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object itself.

All operations via copied references (like adding/removing properties) are performed on the same single object.

To make a "real copy" (a clone) we can use `Object.assign` for the so-called "shallow copy" (nested objects are copied by reference) or a "deep cloning" function, such as [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
