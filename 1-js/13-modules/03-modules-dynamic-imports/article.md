
<<<<<<< HEAD
# Динамические импорты

Инструкции экспорта и импорта, которые мы рассматривали в предыдущей главе, называются "статическими". Синтаксис у них весьма простой и строгий.
=======
Export and import statements that we covered in previous chapters are called "static". The syntax is very simple and strict.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Во-первых, мы не можем динамически задавать никакие из параметров `import`.

Путь к модулю должен быть строковым примитивом и не может быть вызовом функции. Вот так работать не будет:

```js
import ... from *!*getModuleName()*/!*; // Ошибка, должна быть строка
```

Во-вторых, мы не можем делать импорт в зависимости от условий или в процессе выполнения.

```js
if(...) {
  import ...; // Ошибка, запрещено
}

{
  import ...; // Ошибка, мы не можем ставить импорт в блок
}
```

<<<<<<< HEAD
Всё это следствие того, что цель директив `import/export` -- задать костяк структуры кода. Благодаря ним она может быть проанализирована, модули могут быть собраны в один файл специальными инструментами, а неиспользуемые экспорты удалены. Это возможно только благодаря тому, что всё статично.
=======
That's because `import`/`export` aim to provide a backbone for the code structure. That's a good thing, as code structure can be analyzed, modules can be gathered and bundled into one file by special tools, unused exports can be removed ("tree-shaken"). That's possible only because the structure of imports/exports is simple and fixed.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Но как мы можем импортировать модуль динамически, по запросу?

<<<<<<< HEAD
## Выражение import()

Выражение `import(module)` загружает модуль и возвращает промис, результатом которого становится объект модуля, содержащий все его экспорты.

Использовать его мы можем динамически в любом месте кода, например, так:

```js
let modulePath = prompt("Какой модуль загружать?");

import(modulePath)
  .then(obj => <объект модуля>)
  .catch(err => <ошибка загрузки, например если нет такого модуля>)
=======
## The import() expression

The `import(module)` expression loads the module and returns a promise that resolves into a module object that contains all its exports. It can be called from any place in the code.

We can use it dynamically in any place of the code, for instance:

```js
let modulePath = prompt("Which module to load?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
```

Или если внутри асинхронной функции, то можно `let module = await import(modulePath)`.

<<<<<<< HEAD
Например, если у нас есть такой модуль `say.js`:
=======
For instance, if we have the following module `say.js`:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
// 📁 say.js
export function hi() {
  alert(`Привет`);
}

export function bye() {
  alert(`Пока`);
}
```

...То динамический импорт может выглядеть так:

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

А если в `say.js` указан экспорт по умолчанию:

```js
// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}
```

<<<<<<< HEAD
...То для доступа к нему нам следует взять свойство `default` объекта модуля:
=======
...Then, in order to access it, we can use `default` property of the module object:
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
let obj = await import('./say.js');
let say = obj.default;
<<<<<<< HEAD
// или, одной строкой: let {default: say} = await import('./say.js');
=======
// or, in one line: let {default: say} = await import('./say.js');
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

say();
```

Вот полный пример:

[codetabs src="say" current="index.html"]

```smart
Динамический импорт работает в обычных скриптах, он не требует указания `script type="module"`.
```

```smart
Хотя `import()` и выглядит похоже на вызов функции, на самом деле это специальный синтаксис, так же, как, например, `super()`.

<<<<<<< HEAD
Так что мы не можем скопировать `import` в другую переменную или вызвать при помощи `.call/apply`. Это не функция.
=======
So we can't copy `import` to a variable or use `.call/apply` with it. That's not a function.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
```
