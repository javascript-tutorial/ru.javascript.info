<<<<<<< HEAD

# Копирование объектов и ссылки

Одно из фундаментальных отличий объектов от примитивов заключается в том, что объекты хранятся и копируются "по ссылке", тогда как примитивные значения: строки, числа, логические значения и т.д. – всегда копируются "как целое значение".

Это легко понять, если мы немного заглянем под капот того, что происходит, когда мы копируем значение.

Давайте начнём с примитива, такого как строка.

Здесь мы помещаем копию `message` во `phrase`:

```js
let message = "Привет!";
let phrase = message;
```

В результате мы имеем две независимые переменные, каждая из которых хранит строку `"Привет!"`.

![](variable-copy-value.svg)

Вполне очевидный результат, не так ли?

Объекты ведут себя иначе.

**Переменная, которой присвоен объект, хранит не сам объект, а его "адрес в памяти" – другими словами, "ссылку" на него.**

Давайте рассмотрим пример такой переменной:
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
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let user = {
  name: "John"
};
```

<<<<<<< HEAD
И вот как это на самом деле хранится в памяти:

![](variable-contains-reference.svg)

Объект хранится где-то в памяти (справа от изображения), в то время как переменная `user` (слева) имеет лишь "ссылку" на него.

Мы можем думать о переменной объекта, такой как `user`, как о листе бумаги с адресом объекта на нем.

Когда мы выполняем действия с объектом, к примеру, берём свойство `user.name `, движок JavaScript просматривает то, что находится по этому адресу, и выполняет операцию с самим объектом.

Теперь вот почему это важно.

**При копировании переменной объекта копируется ссылка, но сам объект не дублируется.**

Например:
=======
And here's how it's actually stored in memory:

![](variable-contains-reference.svg)

The object is stored somewhere in memory (at the right of the picture), while the `user` variable (at the left) has a "reference" to it.

We may think of an object variable, such as `user`, like a sheet of paper with the address of the object on it.

When we perform actions with the object, e.g. take a property `user.name`, the JavaScript engine looks at what's at that address and performs the operation on the actual object.

Now here's why it's important.

**When an object variable is copied, the reference is copied, but the object itself is not duplicated.**

For instance:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js no-beautify
let user = { name: "John" };

<<<<<<< HEAD
let admin = user; // копируется ссылка
```

Теперь у нас есть две переменные, каждая из которых содержит ссылку на один и тот же объект:

![](variable-copy-reference.svg)

Как вы можете видеть, все ещё есть один объект, но теперь с двумя переменными, которые ссылаются на него.

Мы можем использовать любую переменную для доступа к объекту и изменения его содержимого:
=======
let admin = user; // copy the reference
```

Now we have two variables, each storing a reference to the same object:

![](variable-copy-reference.svg)

As you can see, there's still one object, but now with two variables that reference it.

We can use either variable to access the object and modify its contents:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let user = { name: 'John' };

let admin = user;

*!*
<<<<<<< HEAD
admin.name = 'Pete'; // изменено по ссылке из переменной "admin"
*/!*

alert(*!*user.name*/!*); // 'Pete', изменения видны по ссылке из переменной "user"
```

Это как если бы у нас был шкафчик с двумя ключами, и мы использовали один из них (`admin`), чтобы войти в него и внести изменения. А затем, если мы позже используем другой ключ (`user`), мы все равно открываем тот же шкафчик и можем получить доступ к изменённому содержимому.

## Сравнение по ссылке

Два объекта равны только в том случае, если это один и тот же объект.

Например, здесь `a` и `b` ссылаются на один и тот же объект, поэтому они равны:

```js run
let a = {};
let b = a; // копирование по ссылке

alert( a == b ); // true, обе переменные ссылаются на один и тот же объект
alert( a === b ); // true
```

И здесь два независимых объекта не равны, даже если они выглядят одинаково (оба пусты):

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
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

alert( a == b ); // false
```

<<<<<<< HEAD
Для сравнений типа `obj1 > obj2` или для сравнения с примитивом `obj == 5` объекты преобразуются в примитивы. Очень скоро мы изучим, как работают преобразования объектов, но, по правде говоря, такие сравнения требуются очень редко и обычно они появляются в результате ошибок программиста.

## Клонирование и объединение, Object.assign [#cloning-and-merging-object-assign]

Итак, копирование объектной переменной создаёт ещё одну ссылку на тот же объект.

Но что, если нам всё же нужно дублировать объект? Создать независимую копию, клон?

Это тоже выполнимо, но немного сложнее, потому что в JavaScript для этого нет встроенного метода. Но на самом деле в этом редко возникает необходимость, копирования по ссылке в большинстве случаев вполне хватает.

Но если мы действительно этого хотим, то нам нужно создать новый объект и воспроизвести структуру существующего, перебрав его свойства и скопировав их на примитивном уровне.

Например так:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // новый пустой объект

// давайте скопируем все свойства user в него
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// теперь clone это полностью независимый объект с тем же содержимым
clone.name = "Pete"; // изменим в нём данные

alert( user.name ); // все ещё John в первоначальном объекте
```

Также мы можем использовать для этого метод [Object.assign](mdn:js/Object/assign).

Синтаксис:

```js
Object.assign(dest, [src1, src2, src3...])
```

- Первый аргумент `dest` — целевой объект.
- Остальные аргументы `src1, ..., srcN` (может быть столько, сколько необходимо) являются исходными объектами
- Метод копирует свойства всех исходных объектов `src1, ..., srcN` в целевой объект `dest`.  Другими словами, свойства всех аргументов, начиная со второго, копируются в первый объект.
- Возвращает объект `dest`.

Например, мы можем использовать его для объединения нескольких объектов в один:
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// копируем все свойства из permissions1 и permissions2 в user
Object.assign(user, permissions1, permissions2);
*/!*

// теперь user = { name: "John", canView: true, canEdit: true }
```

Если скопированное имя свойства уже существует, оно будет перезаписано:

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // теперь user = { name: "Pete" }
```

Мы также можем использовать `Object.assign` для замены цикла `for..in ` для простого клонирования:

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

Он копирует все свойства `user` в пустой объект и возвращает его.

Также существуют и другие методы клонирования объекта. Например, с использованием [оператора расширения](info:rest-parameters-spread-operator) `clone = {...user}`, рассмотренного далее в учебнике.

## Вложенное клонирование

До сих пор мы предполагали, что все свойства `user` примитивныe. Но свойства могут быть и ссылками на другие объекты. Что с ними делать?

Например, есть объект:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Теперь недостаточно просто скопировать `clone.sizes = user.sizes`, потому что `user.sizes` - это объект, он будет скопирован по ссылке. Таким образом, `clone` и `user` будут иметь общий объект `sizes`:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, тот же объект

// user и clone обладают общим свойством sizes
user.sizes.width++;       // изменяем свойства в первом объекте
alert(clone.sizes.width); // 51, видим результат в другом
```

Чтобы исправить это, мы должны использовать цикл клонирования, который проверяет каждое значение `user[key]` и, если это объект, тогда также копирует его структуру. Это называется "глубоким клонированием".

Мы можем реализовать глубокое клонирование, используя рекурсию. Или, чтобы не изобретать велосипед заново, возьмите готовую реализацию, например [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) из библиотеки JavaScript [lodash](https://lodash.com).

Также мы можем использовать глобальный метод [structuredClone()](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone), который позволяет сделать полную копию объекта. К сожалению он поддерживается только современными браузерами. [Здесь](https://caniuse.com/?search=structuredClone) можно ознакомиться с поддержкой этого метода.

````smart header="Объекты, объявленные как константа, могут быть изменены"
Важным побочным эффектом хранения объектов в качестве ссылок является то, что объект, объявленный как `const`, *может* быть изменён.

Например:
=======
For comparisons like `obj1 > obj2` or for a comparison against a primitive `obj == 5`, objects are converted to primitives. We'll study how object conversions work very soon, but to tell the truth, such comparisons are needed very rarely -- usually they appear as a result of a programming mistake.

````smart header="Const objects can be modified"
An important side effect of storing objects as references is that an object declared as `const` *can* be modified.

For instance:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

<<<<<<< HEAD
Может показаться, что строка `(*)` вызовет ошибку, но, это не так. Значение `user` это константа, оно всегда должно ссылаться на один и тот же объект, но свойства этого объекта могут свободно изменяться.

Другими словами, `const user` выдаст ошибку только в том случае, если мы попытаемся задать `user=...` в целом.

Тем не менее, если нам действительно нужно создать постоянные свойства объекта, это тоже возможно, но с использованием совершенно других методов. Мы затронем это в главе <info:property-descriptors>.
````

## Итого

Объекты присваиваются и копируются по ссылке. Другими словами, переменная хранит не "значение объекта", а "ссылку" (адрес в памяти) на это значение. Таким образом, копирование такой переменной или передача её в качестве аргумента функции копирует эту ссылку, а не сам объект.

Все операции с использованием скопированных ссылок (например, добавление/удаление свойств) выполняются с одним и тем же объектом.

Чтобы создать "реальную копию" (клон), мы можем использовать `Object.assign` для так называемой "поверхностной копии" (вложенные объекты копируются по ссылке) или функцию "глубокого клонирования", такую как [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
=======
It might seem that the line `(*)` would cause an error, but it does not. The value of `user` is constant, it must always reference the same object, but properties of that object are free to change.

In other words, the `const user` gives an error only if we try to set `user=...` as a whole.

That said, if we really need to make constant object properties, it's also possible, but using totally different methods. We'll mention that in the chapter <info:property-descriptors>.
````

## Cloning and merging, Object.assign [#cloning-and-merging-object-assign]

So, copying an object variable creates one more reference to the same object.

But what if we need to duplicate an object?

We can create a new object and replicate the structure of the existing one, by iterating over its properties and copying them on the primitive level.

Like this:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object
```

We can also use the method [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

The syntax is:

```js
Object.assign(dest, ...sources)
```

- The first argument `dest` is a target object.
- Further arguments is a list of source objects.

It copies the properties of all source objects into the target `dest`, and then returns it as the result.

For example, we have `user` object, let's add a couple of permissions to it:

```js run
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);
*/!*

// now user = { name: "John", canView: true, canEdit: true }
alert(user.name); // John
alert(user.canView); // true
alert(user.canEdit); // true
```

If the copied property name already exists, it gets overwritten:

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // now user = { name: "Pete" }
```

We also can use `Object.assign` to perform a simple object cloning:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*

alert(clone.name); // John
alert(clone.age); // 30
```

Here it copies all properties of `user` into the empty object and returns it.

There are also other methods of cloning an object, e.g. using the [spread syntax](info:rest-parameters-spread) `clone = {...user}`, covered later in the tutorial.

## Nested cloning

Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects.

Like this:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Now it's not enough to copy `clone.sizes = user.sizes`, because `user.sizes` is an object, and will be copied by reference, so `clone` and `user` will share the same sizes:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, same object

// user and clone share sizes
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 60, get the result from the other one
```

To fix that and make `user` and `clone` truly separate objects, we should use a cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning" or "structured cloning". There's [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) method that implements deep cloning.


### structuredClone

The call `structuredClone(object)` clones the `object` with all nested properties.

Here's how we can use it in our example:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

*!*
let clone = structuredClone(user);
*/!*

alert( user.sizes === clone.sizes ); // false, different objects

// user and clone are totally unrelated now
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 50, not related
```

The `structuredClone` method can clone most data types, such as objects, arrays, primitive values.

It also supports circular references, when an object property references the object itself (directly or via a chain or references).

For instance:

```js run
let user = {};
// let's create a circular reference:
// user.me references the user itself
user.me = user;

let clone = structuredClone(user);
alert(clone.me === clone); // true
```

As you can see, `clone.me` references the `clone`, not the `user`! So the circular reference was cloned correctly as well.

Although, there are cases when `structuredClone` fails.

For instance, when an object has a function property:

```js run
// error
structuredClone({
  f: function() {}
});
```

Function properties aren't supported.

To handle such complex cases we may need to use a combination of cloning methods, write custom code or, to not reinvent the wheel, take an existing implementation, for instance [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) from the JavaScript library [lodash](https://lodash.com).

## Summary

Objects are assigned and copied by reference. In other words, a variable stores not the "object value", but a "reference" (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object itself.

All operations via copied references (like adding/removing properties) are performed on the same single object.

To make a "real copy" (a clone) we can use `Object.assign` for the so-called "shallow copy" (nested objects are copied by reference) or a "deep cloning" function `structuredClone` or use a custom cloning implementation, such as [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
