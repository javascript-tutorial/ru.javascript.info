# Function expressions and arrows

Функции в JavaScript, это не магическая языковая структура, а специальный вид значений.

Синтаксис, который мы использовали до этого называется *Function Declaration* (объявление функции):

```js
function sayHi() {
  alert( "Привет" );
}
```

Существует ещё один синтаксис для создания функций, который называется *Function Expression* (функциональное выражение).

Оно выглядит вот так:

```js
let sayHi = function() {
  alert( "Привет" );
};
```

В коде выше, функция создаётся и явно присваивается переменной, как любое другое значение. По сути без разницы, как мы определили функцию, это просто значение, хранимое в переменной `sayHi`.


Смыслы этого кода одинаковы: "создать функцию и поместить её значение в переменную `sayHi`".

Мы можем даже вывести это значение с помощью `alert`:

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // выведет код функции
*/!*
```

Обратите внимание, что последняя строка не вызывает функцию `sayHi`, после её имени нет круглых скобок. Существуют языки программирования, в которых любое упоминание имени функции совершает её вызов. JavaScript - не один из них.

В JavaScript функции - это значения, поэтому мы и обращаемся с ними, как со значениями. Код выше выведет строковое представление функции, которое является её исходным кодом.

Конечно, это не обычное значение, в том смысле, что мы можем вызвать его следующим образом `sayHi()`.

Но всё же это значение. Поэтому мы можем делать с ним то же самое, что и с любым другим значением.

Мы можем скопировать функцию и поместить её значение в другую переменную:

```js run no-beautify
function sayHi() {   // (1) создаём
  alert( "Hello" );
}

let func = sayHi;    // (2) копируем

func(); // Hello     // (3) вызываем копию (работает)!
sayHi(); // Hello    //     прежняя тоже работает (почему бы нет)
```

Давайте детально разберём всё, что тут произошло:

1. *Function Declaration* `(1)` создало функцию и присвоило её значение переменной с именем `sayHi`.
2. В строке `(2)` мы скопировали её значение в переменную `func`.

    Обратите внимание (ещё раз): нет круглых скобок после `sayHi`. Если бы они были, то выражение `func = sayHi()` "записало" бы *результат вызова* `sayHi()` в переменную `func`, а не саму *функцию* `sayHi`.
3. Теперь функция может быть вызвана с помощью обеих переменных `sayHi()` и `func()`.

Заметьте, что мы можем использовать и *Function Expression* чтобы создать `sayHi`, в первой строке:

```js
let sayHi = function() { ... };

let func = sayHi;
// ...
```

Для нашего примера результат будет таким же. Надеюсь, происходящее теперь стало более понятным.


````smart header="Зачем нужны точка с зяпятой в конце?"
У вас мог возникнуть вопрос: Почему в *Function Expression* ставится точка с запятой `;` на конце, а в *Function Declaration* нет:

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

Ответ прост:
- Нет необходимости в закрывающей `;` блоков кода и синтсаксических конструкций, использующих их, таких как `if { ... }`, `for {  }`, `function f { }` и т.д.
- *Function Expression* использует внутри себя инструкцию: `let sayHi = ...;`, как значение. Это не является блоком кода. И точки с запятой `;` рекомеднуется ставить на конце инструкций, не зависимо от их значений. Таким образом, точка с запятой не отностися непосредственно к *Function Expression*, оно лишь выполняет внутри себя инструкцию.
````

## Функции Callback (обратного вызова)

Давайте рассмотрим ещё примеры использования функций, при передаче их другим функциям, в качестве значений.

Давайте напишем функцию `ask(question, yes, no)` с тремя параметрами:

`question`
: Текст вопроса

`yes`
: Функция, которая будет вызваться, если ответ будет "Yes"

`no`
: Функция, которая будет вызываться, если ответ будет "No"

Наша функция должна задать вопрос `question` и в зависимости от того, как ответит пользователь, вызвать `yes()` или `no()`:

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// использование: функции showOk, showCancel передаются в качестве аргументов ask
ask("Do you agree?", showOk, showCancel);
```

Перед тем, как мы рассмотрим, как можно записать это гораздо короче, давайте обратим внимание, что в браузере (и в отдельных случаях на стороне сервера) подобное использование функций очень распространено. Основным отличием между реализацией таких функций в реальном проекте и примером выше, является то, что в реальности функции используют более сложные способы взаимодействия с пользователем, чем простой вызов `confirm`. В браузерах, такие фукнции обычно,отображают красивые диалоговые окна. Но это уже другая история.

**Аргументы функции `ask` ещё называют *callback functions* (функциями обратного вызова) или просто *callbacks*.**

Ключевая идея в том, что мы передаём функцию и ожидаем, что она вызовется обратно ("called back") когда-нибудь позже, если это будет необходимо. В нашем случае, `showOk` становится *callback*'ом для ответа "yes", и `showCancel` -- для ответа "no".

Мы можем переписать этот пример значительно короче, используя *Function Expressions* (функциональные выражения):

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
*/!*
```


Тут, функции объявляются прямо внутри вызова `ask(...)`. У них нет имён, поэтому они называются *анонимными*. Такие фукнции недоступны снаружи `ask` (потому что они не присвоены переменным), но это как раз то, что нам нужно.

Подобный код, появившийся в нашем скрипте естественнен, и очень в духе JavaScript.


```smart header="Функция это значение представляющее \"действие\""
Обычные значения, такие как строки или числа представляют *данные*.

Функции предназначены для *значений*.

Мы можем передавать их другим переменным и вызывать их когда захотим.
```


## *Function Expression* в сравнении с *Function Declaration*

Давайте разберём ключевые отличия *Function Declarations* (объявления функций) от *Function Expressions* (функциональных выражений).

Во-первых, синтаксис: как мы можем видеть это из кода.

- В случае *Function Declaration:* функция объявляется, как отдельная инструкция в основном потоке кода.

    ```js
    // Function Declaration
    function sum(a, b) {
      return a + b;
    }
    ```
- В случае *Function Expression:* функция создаётся внутри выражения или другой синтаксической конструкции. В данном случае функция создаётся в правой части "выражения присваивания" `=`:
    
    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    };
    ```

Более тонкое отличие состоит, в том, *когда* создаётся функция движком JavaScript.

**Function Expression создаётся, когда выполнение доходит но него, и с этого момента может быть используемо.**

После того, как поток выполнения достигнет правой части выражения присваивания `let sum = function…` -- с этого момента, функция считается созданной и может быть использована (присвоена переменной, вызвана и т.д. ).

*С *Function Declaration* всё иначе.

**Function Declaration применимы ко всему скрипту или блоку кода.**

Другими словами, когда движок JavaScript *подготавливает* к выполнение скрипт или блок кода, прежде всего, в  нём происходит поиск *Function Declarations* и создаются все найдённые функции, созданные таким образом. Можно считать этот процесс "стадией инициализации".

И только после того, как все объявления функций будут обработаны, продолжиться выполнение остального кода.

В результате, функции, созданные, как *Function Declaration* могут быть вызваны раньше своих определений.

Например, так будет работать:

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

*Function Declaration* `sayHi` было создано, когда движок JavaScript приготавливал скрипт к выполнению, и такая функция отовсюду.

...В случае с *Function Expression*, такой код вызовет ошибку:

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*) магии больше нет
  alert( `Hello, ${name}` );
};
```

Функциональное выражение создаётся тогда, когда выполение достигает его. Это случится только на строке, помеченной звёздочкой `(*)`. Слишком поздно.

**Когда Function Declaration создаётся для блока кода, оно становится доступно везде внутри блока. Но не снаружи него.**

Иногда очень удобно создать локальную функцию лишь для отдельного блока кода, но этот приём, также череват и проблемами.

Для примера, давайте представим, что нам нужно создать функцию `welcome()` в зависимости от значение переменной `age`, которое мы получим во время выполнения кода. И замем запланируем использовать её когда-нибудь в будущем.

Код, написанный подобным образом, работать не будет:

```js run
let age = prompt("What is your age?", 18);

// в зависимости от условия объявляем функцию
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...несколько позже
*!*
welcome(); // Ошибка: welcome is not defined
*/!*
```

Это произошло, так как *Function Declaration* видимо только внутри блока кода в котором располагается.

Вот ещё один пример:

```js run
let age = 16; // присвоим для примера 16

if (age < 18) {
*!*
  welcome();               // \   (выполнится)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Hello!");       //  |  Function Declaration доступно
  }                        //  |  во всём блоке кода, в котором объявлено
                           //  |
*!*
  welcome();               // /   (выполнится)
*/!*

} else {

  function welcome() {     //  для age = 16, эта функция "welcome" никогда не создастся
    alert("Greetings!");
  }
}

// здесь фигурная скобка закрывается,
// поэтому, Function Declarations, созданные внутри блока кода выше -- недоступны отсюда.

*!*
welcome(); // Ошибка: welcome is not defined
*/!*
```

What can we do to make `welcome` visible outside of `if`?

The correct approach would be to use a Function Expression and assign `welcome` to the variable that is declared outside of `if` and has the proper visibility.

Now it works as intended:

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

*!*
welcome(); // ok now
*/!*
```

Or we could simplify it even further using a question mark operator `?`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

*!*
welcome(); // ok now
*/!*
```


```smart header="When should you choose Function Declaration versus Function Expression?"
As a rule of thumb, when we need to declare a function, the first to consider is Function Declaration syntax, the one we used before. It gives more freedom in how to organize our code, because we can call such functions before they are declared.

It's also a little bit easier to look up `function f(…) {…}` in the code than `let f = function(…) {…}`. Function Declarations are more "eye-catching".

...But if a Function Declaration does not suit us for some reason (we've seen an example above), then Function Expression should be used.
```


## Arrow functions [#arrow-functions]

There's one more very simple and concise syntax for creating functions, that's often better than Function Expressions. It's called "arrow functions", because it looks like this:


```js
let func = (arg1, arg2, ...argN) => expression
```

...This creates a function `func` that has arguments `arg1..argN`, evaluates the `expression` on the right side with their use and returns its result.

In other words, it's roughly the same as:

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

...But much more concise.

Let's see an example:

```js run
let sum = (a, b) => a + b;

/* The arrow function is a shorter form of:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3

```

If we have only one argument, then parentheses can be omitted, making that even shorter:

```js run
// same as
// let double = function(n) { return n * 2 }
*!*
let double = n => n * 2;
*/!*

alert( double(3) ); // 6
```

If there are no arguments, parentheses should be empty (but they should be present):

```js run
let sayHi = () => alert("Hello!");

sayHi();
```

Arrow functions can be used in the same way as Function Expressions.

For instance, here's the rewritten example with `welcome()`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ok now
```

Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

They are very convenient for simple one-line actions, when we're just too lazy to write many words.

```smart header="Multiline arrow functions"

The examples above took arguments from the left of `=>` and evaluated the right-side expression with them.

Sometimes we need something a little bit more complex, like multiple expressions or statements. It is also possible, but we should enclose them in curly braces. Then use a normal `return` within them.

Like this:

```js run
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, use return to get results
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="More to come"
Here we praised arrow functions for brevity. But that's not all! Arrow functions have other interesting features. We'll return to them later in the chapter <info:arrow-functions>.

For now, we can already use them for one-line actions and callbacks.
```

## Summary

- Functions are values. They can be assigned, copied or declared in any place of the code.
- If the function is declared as a separate statement in the main code flow, that's called a "Function Declaration".
- If the function is created as a part of an expression, it's called a "Function Expression".
- Function Declarations are processed before the code block is executed. They are visible everywhere in the block.
- Function Expressions are created when the execution flow reaches them.


In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.

So we should use a Function Expression only when a Function Declaration is not fit for the task. We've seen a couple of examples of that in this chapter, and will see more in the future.

Arrow functions are handy for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
