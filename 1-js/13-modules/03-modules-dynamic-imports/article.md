
# Динамические импорты

Инструкции экспорта и импорта, которые мы рассматривали в предыдущей главе, называются "статическими".

Это потому, что они на самом деле статические. Синтаксис у них весьма строг.

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
Всё это следствие того, что цель импорта/экспорта -- создать костяк структуры кода. Благодаря чему она может быть проанализирована, модули могут быть собраны и связаны друг с другом, а неиспользуемые экспорты удалены. Это возможно только благодаря тому, что всё статично.

Но как мы можем импортировать модуль динамически, по запросу?
=======
That's because `import`/`export` aim to provide a backbone for the code structure. That's a good thing, as code structure can be analyzed, modules can be gathered and bundled together, unused exports can be removed ("tree-shaken"). That's possible only because the structure of imports/exports is simple and fixed.

But how can we import a module dynamically, on-demand?
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

## Функция import()

Функция `import(module)` может быть вызвана из любого места. Она вернёт промис, а он в свою очередь -- объект модуля.

Использовать её мы можем, например, вот так:

```js run
let modulePath = prompt("Путь к модулю?");

import(modulePath)
  .then(obj => <объект модуля>)
  .catch(err => <ошибка загрузки, нет такого модуля?>)
```

Или если внутри асинхронной функции, то можно вот так: `let module = await import(modulePath)`.

<<<<<<< HEAD
Как здесь:

[codetabs src="say" current="index.html"]

Так что использовать динамические импорты очень легко.

Кроме этого, динамические импорты работают в обычных скриптах, для них не требуется `script type="module"`.
=======
For instance, if we have the following `say.js`:

```js
// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
```

...Then dynamic import can be like this:

```js
let {hi, bye} = await import('./say.js');

hi();
bye();

```

Or, for the default export:

```js
// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}
```

To import it, we need to get `default` property of the module object, as explained in the [previous chapter](info:import-export).

So, the dynamic import will be like this:

```js
let {default: say} = await import('./say.js'); // map .default to say variable

say();
```

Here's the full example:

[codetabs src="say" current="index.html"]

So, dynamic imports are very simple to use, and they allow to import modules at run-time.

Also, dynamic imports work in regular scripts, they don't require `script type="module"`.

```smart
Although `import()` looks like a function call, it's a special syntax that just happens to use parentheses (similar to `super()`).

That means that import doesn't inherit from `Function.prototype` so we cannot call or apply it.
```
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7
