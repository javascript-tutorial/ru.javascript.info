<<<<<<< HEAD
# Function Expression

Функция в JavaScript - это не магическая языковая структура, а особого типа значение.

Синтаксис, который мы использовали до этого, называется *Function Declaration* (Объявление Функции):

```js
function sayHi() {
  alert( "Привет" );
}
```

Существует ещё один синтаксис создания функций, который называется *Function Expression* (Функциональное Выражение).

Данный синтаксис позволяет нам создавать новую функцию в середине любого выражения.

Это выглядит следующим образом:

```js
let sayHi = function() {
  alert( "Привет" );
};
```

Здесь мы можем видеть переменную `sayHi`, получающую значение, новую функцию, созданную как `function() { alert("Привет"); }`.

Поскольку создание функции происходит в контексте выражения присваивания (с правой стороны от `=`), это *Function Expression*.

Обратите внимание, что после ключевого слова `function` нет имени. Для Function Expression допускается его отсутствие.

Здесь мы сразу присваиваем её переменной, так что смысл этих примеров кода один и тот же: "создать функцию и поместить её в переменную `sayHi`".

В более сложных ситуациях, с которыми мы столкнёмся позже, функция может быть создана и немедленно вызвана, или запланирована для дальнейшего выполнения, нигде не сохраняясь, таким образом, оставаясь анонимной.

## Функция - это значение

Давайте повторим: независимо от того, как создаётся функция - она является значением. В обоих приведённых выше примерах функция хранится в переменной `sayHi`.

Мы даже можем вывести это значение с помощью `alert`:

```js run
function sayHi() {
  alert( "Привет" );
}

*!*
alert( sayHi ); // выведет код функции
*/!*
```
Обратите внимание, что последняя строка не вызывает функцию, потому что после `sayHi` нет круглых скобок. Существуют языки программирования, в которых любое упоминание имени функции приводит к её выполнению, но JavaScript к таким не относится.

В JavaScript функция - это значение, поэтому мы можем обращаться с ней как со значением. Приведённый выше код показывает её строковое представление, которое является её исходным кодом.

Конечно, функция - это особое значение, в том смысле, что мы можем вызвать её как `sayHi()`.

Но всё же это значение. Поэтому мы можем работать с ней так же, как и с другими видами значений.

Мы можем скопировать функцию в другую переменную:

```js run no-beautify
function sayHi() {   // (1) создаём
  alert( "Привет" );
}

let func = sayHi;    // (2) копируем

func(); // Привет     // (3) вызываем копию (работает)!
sayHi(); // Привет    //     эта тоже все ещё работает (почему бы и нет)
```

Давайте подробно разберём всё, что тут произошло:

1. Объявление Function Declaration `(1)` создаёт функцию и помещает её в переменную с именем `sayHi`.
2. В строке `(2)` мы скопировали её значение в переменную `func`. Обратите внимание (ещё раз): нет круглых скобок после `sayHi`. Если бы они были, то выражение `func = sayHi()` записало бы *результат вызова* `sayHi()` в переменную `func`, а не саму *функцию* `sayHi`.
3. Теперь функция может вызываться как `sayHi()`, так и `func()`. 

Мы также могли бы использовать Function Expression для объявления `sayHi` в первой строке:

```js
let sayHi = function() { // (1) создаём
  alert( "Привет" );
};

let func = sayHi;
// ...
```

Всё будет работать так же.

````smart header="Зачем нужна точка с запятой в конце?"
У вас мог возникнуть вопрос: Почему в Function Expression ставится точка с запятой `;` на конце, а в Function Declaration нет:
=======
# Function expressions

In JavaScript, a function is not a "magical language structure", but a special kind of value.

The syntax that we used before is called a *Function Declaration*:

```js
function sayHi() {
  alert( "Hello" );
}
```

There is another syntax for creating a function that is called a *Function Expression*.

It allows us to create a new function in the middle of any expression.

For example:

```js
let sayHi = function() {
  alert( "Hello" );
};
```

Here we can see a variable `sayHi` getting a value, the new function, created as `function() { alert("Hello"); }`.

As the function creation happens in the context of the assignment expression (to the right side of `=`), this is a *Function Expression*.

Please note, there's no name after the `function` keyword. Omitting a name is allowed for Function Expressions.

Here we immediately assign it to the variable, so the meaning of these code samples is the same: "create a function and put it into the variable `sayHi`".

In more advanced situations, that we'll come across later, a function may be created and immediately called or scheduled for a later execution, not stored anywhere, thus remaining anonymous.

## Function is a value

Let's reiterate: no matter how the function is created, a function is a value. Both examples above store a function in the `sayHi` variable.

We can even print out that value using `alert`:

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // shows the function code
*/!*
```

Please note that the last line does not run the function, because there are no parentheses after `sayHi`. There are programming languages where any mention of a function name causes its execution, but JavaScript is not like that.

In JavaScript, a function is a value, so we can deal with it as a value. The code above shows its string representation, which is the source code.

Surely, a function is a special value, in the sense that we can call it like `sayHi()`.

But it's still a value. So we can work with it like with other kinds of values.

We can copy a function to another variable:

```js run no-beautify
function sayHi() {   // (1) create
  alert( "Hello" );
}

let func = sayHi;    // (2) copy

func(); // Hello     // (3) run the copy (it works)!
sayHi(); // Hello    //     this still works too (why wouldn't it)
```

Here's what happens above in detail:

1. The Function Declaration `(1)` creates the function and puts it into the variable named `sayHi`.
2. Line `(2)` copies it into the variable `func`. Please note again: there are no parentheses after `sayHi`. If there were, then `func = sayHi()` would write  *the result of the call* `sayHi()` into `func`, not *the function* `sayHi` itself.
3. Now the function can be called as both `sayHi()` and `func()`.

We could also have used a Function Expression to declare `sayHi`, in the first line:

```js
let sayHi = function() { // (1) create
  alert( "Hello" );
};

let func = sayHi;  //(2)
// ...
```

Everything would work the same.


````smart header="Why is there a semicolon at the end?"
You might wonder, why do Function Expressions have a semicolon `;` at the end, but Function Declarations do not:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

<<<<<<< HEAD
Ответ прост: Function Expression создаётся здесь как `function(...) {...}` внутри выражения присваивания: `let sayHi = …;`. Точку с запятой `;` рекомендуется ставить в конце выражения, она не является частью синтаксиса функции.

Точка с запятой нужна там для более простого присваивания, такого как `let sayHi = 5;`, а также для присваивания функции.
````

## Функции-"колбэки"

Давайте рассмотрим больше примеров передачи функции в виде значения и использования функциональных выражений.

Давайте напишем функцию `ask(question, yes, no)` с тремя параметрами:

`question`
: Текст вопроса

`yes`
: Функция, которая будет вызываться, если ответ будет "Yes"

`no`
: Функция, которая будет вызываться, если ответ будет "No"

Наша функция должна задать вопрос `question` и, в зависимости от того, как ответит пользователь, вызвать `yes()` или `no()`:
=======
The answer is simple: a Function Expression is created here as `function(…) {…}` inside the assignment statement: `let sayHi = …;`. The semicolon `;` is recommended at the end of the statement, it's not a part of the function syntax.

The semicolon would be there for a simpler assignment, such as `let sayHi = 5;`, and it's also there for a function assignment.
````

## Callback functions

Let's look at more examples of passing functions as values and using function expressions.

We'll write a function `ask(question, yes, no)` with three parameters:

`question`
: Text of the question

`yes`
: Function to run if the answer is "Yes"

`no`
: Function to run if the answer is "No"

The function should ask the `question` and, depending on the user's answer, call `yes()` or `no()`:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
<<<<<<< HEAD
  alert( "Вы согласны." );
}

function showCancel() {
  alert( "Вы отменили выполнение." );
}

// использование: функции showOk, showCancel передаются в качестве аргументов ask
ask("Вы согласны?", showOk, showCancel);
```

На практике подобные функции очень полезны. Основное отличие "реальной" функции `ask` от примера выше будет в том, что она использует более сложные способы взаимодействия с пользователем, чем простой вызов `confirm`. В браузерах такие функции обычно отображают красивые диалоговые окна. Но это уже другая история.

**Аргументы `showOk` и `showCancel` функции `ask` называются *функциями-колбэками* или просто *колбэками*.**

Ключевая идея в том, что мы передаём функцию и ожидаем, что она вызовется обратно (от англ. "call back" - обратный вызов) когда-нибудь позже, если это будет необходимо. В нашем случае, `showOk` становится *колбэком* для ответа "yes", а `showCancel` -- для ответа "no".

Мы можем переписать этот пример значительно короче, используя Function Expression:
=======
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);
```

In practice, such functions are quite useful. The major difference between a real-life `ask` and the example above is that real-life functions use more complex ways to interact with the user than a simple `confirm`. In the browser, such functions usually draw a nice-looking question window. But that's another story.

**The arguments `showOk` and `showCancel` of `ask` are called *callback functions* or just *callbacks*.**

The idea is that we pass a function and expect it to be "called back" later if necessary. In our case, `showOk` becomes the callback for "yes" answer, and `showCancel` for "no" answer.

We can use Function Expressions to write an equivalent, shorter function:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
<<<<<<< HEAD
  "Вы согласны?",
  function() { alert("Вы согласились."); },
  function() { alert("Вы отменили выполнение."); }
=======
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
);
*/!*
```

<<<<<<< HEAD

Здесь функции объявляются прямо внутри вызова `ask(...)`. У них нет имён, поэтому они называются *анонимными*. Такие функции недоступны снаружи `ask` (потому что они не присвоены переменным), но это как раз то, что нам нужно.

Подобный код, появившийся в нашем скрипте выглядит очень естественно, в духе JavaScript.



```smart header="Функция - это значение, представляющее \"действие\""
Обычные значения, такие как строки или числа представляют собой *данные*.

Функции, с другой стороны, можно воспринимать как *действия*.

Мы можем передавать их из переменной в переменную и запускать, когда захотим.
```


## Function Expression в сравнении с Function Declaration

Давайте разберём ключевые отличия Function Declaration от Function Expression.

Во-первых, синтаксис: как отличить их друг от друга в коде.

- *Function Declaration*: функция объявляется отдельной конструкцией "function..." в основном потоке кода.
=======
Here, functions are declared right inside the `ask(...)` call. They have no name, and so are called *anonymous*. Such functions are not accessible outside of `ask` (because they are not assigned to variables), but that's just what we want here.

Such code appears in our scripts very naturally, it's in the spirit of JavaScript.

```smart header="A function is a value representing an \"action\""
Regular values like strings or numbers represent the *data*.

A function can be perceived as an *action*.

We can pass it between variables and run when we want.
```


## Function Expression vs Function Declaration

Let's formulate the key differences between Function Declarations and Expressions.

First, the syntax: how to differentiate between them in the code.

- *Function Declaration:* a function, declared as a separate statement, in the main code flow:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

    ```js
    // Function Declaration
    function sum(a, b) {
      return a + b;
    }
    ```
<<<<<<< HEAD
- *Function Expression*: функция, созданная внутри другого выражения или синтаксической конструкции. В данном случае функция создаётся в правой части "выражения присваивания" `=`:
=======
- *Function Expression:* a function, created inside an expression or inside another syntax construct. Here, the function is created on the right side of the "assignment expression" `=`:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    };
    ```

<<<<<<< HEAD
Более тонкое отличие состоит в том, *когда* создаётся функция движком JavaScript.

**Function Expression создаётся, когда выполнение доходит до него, и затем уже может использоваться.**

После того, как поток выполнения достигнет правой части выражения присваивания `let sum = function…` -- с этого момента, функция считается созданной и может быть использована (присвоена переменной, вызвана и т.д. ).

С Function Declaration всё иначе.

**Function Declaration может быть вызвана раньше, чем она объявлена.**

Другими словами, когда движок JavaScript *готовится* выполнять скрипт или блок кода, прежде всего он ищет в нём Function Declaration и создаёт все такие функции.  Можно считать этот процесс "стадией инициализации".

И только после того, как все объявления Function Declaration будут обработаны, продолжится выполнение.

В результате функции, созданные как Function Declaration, могут быть вызваны раньше своих определений.

Например, так будет работать:

```js run refresh untrusted
*!*
sayHi("Вася"); // Привет, Вася
*/!*

function sayHi(name) {
  alert( `Привет, ${name}` );
}
```

Функция `sayHi` была создана, когда движок JavaScript подготавливал скрипт к выполнению, и такая функция видна повсюду в этом скрипте.

...Если бы это было Function Expression, то такой код вызвал бы ошибку:

```js run refresh untrusted
*!*
sayHi("Вася"); // ошибка!
*/!*

let sayHi = function(name) {  // (*) магии больше нет
  alert( `Привет, ${name}` );
};
```

Функции, объявленные при помощи Function Expression, создаются тогда, когда выполнение доходит до них. Это случится только на строке, помеченной звёздочкой `(*)`. Слишком поздно.

Ещё одна важная особенность Function Declaration заключается в их блочной области видимости.

**В строгом режиме, когда Function Declaration находится в блоке `{...}`, функция доступна везде внутри блока. Но не снаружи него.**

Для примера давайте представим, что нам нужно объявить функцию `welcome()` в зависимости от значения переменной `age`, которое мы получим во время выполнения кода. И затем запланируем использовать её когда-нибудь в будущем.

Если мы попробуем использовать Function Declaration, это не заработает так, как задумывалось:

```js run
let age = prompt("Сколько Вам лет?", 18);

// в зависимости от условия объявляем функцию
if (age < 18) {

  function welcome() {
    alert("Привет!");
=======
The more subtle difference is *when* a function is created by the JavaScript engine.

**A Function Expression is created when the execution reaches it and is usable only from that moment.**

Once the execution flow passes to the right side of the assignment `let sum = function…` -- here we go, the function is created and can be used (assigned, called, etc. ) from now on.

Function Declarations are different.

**A Function Declaration can be called earlier than it is defined.**

For example, a global Function Declaration is visible in the whole script, no matter where it is.

That's due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates the functions. We can think of it as an "initialization stage".

And after all Function Declarations are processed, the code is executed. So it has access to these functions.

For example, this works:

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

The Function Declaration `sayHi` is created when JavaScript is preparing to start the script and is visible everywhere in it.

...If it were a Function Expression, then it wouldn't work:

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

Function Expressions are created when the execution reaches them. That would happen only in the line `(*)`. Too late.

Another special feature of Function Declarations is their block scope.

**In strict mode, when a Function Declaration is within a code block, it's visible everywhere inside that block. But not outside of it.**

For instance, let's imagine that we need to declare a function `welcome()` depending on the `age` variable that we get during runtime. And then we plan to use it some time later.

If we use Function Declaration, it won't work as intended:

```js run
let age = prompt("What is your age?", 18);

// conditionally declare a function
if (age < 18) {

  function welcome() {
    alert("Hello!");
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
  }

} else {

  function welcome() {
<<<<<<< HEAD
    alert("Здравствуйте!");
=======
    alert("Greetings!");
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
  }

}

<<<<<<< HEAD
// ...не работает
=======
// ...use it later
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
*!*
welcome(); // Error: welcome is not defined
*/!*
```

<<<<<<< HEAD
Это произошло, так как объявление Function Declaration видимо только внутри блока кода, в котором располагается.

Вот ещё один пример:

```js run
let age = 16; // возьмём для примера 16

if (age < 18) {
*!*
  welcome();               // \   (выполнится)
*/!*
                           //  |
  function welcome() {     //  |
    alert("Привет!");      //  |  Function Declaration доступно
  }                        //  |  во всём блоке кода, в котором объявлено
                           //  |
*!*
  welcome();               // /   (выполнится)
=======
That's because a Function Declaration is only visible inside the code block in which it resides.

Here's another example:

```js run
let age = 16; // take 16 as an example

if (age < 18) {
*!*
  welcome();               // \   (runs)
*/!*
                           //  |
  function welcome() {     //  |
    alert("Hello!");       //  |  Function Declaration is available
  }                        //  |  everywhere in the block where it's declared
                           //  |
*!*
  welcome();               // /   (runs)
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
*/!*

} else {

<<<<<<< HEAD
  function welcome() {     
    alert("Здравствуйте!");
  }
}

// здесь фигурная скобка закрывается,
// поэтому Function Declaration, созданные внутри блока кода выше -- недоступны отсюда.

*!*
welcome(); // Ошибка: welcome is not defined
*/!*
```

Что можно сделать, чтобы `welcome` была видима снаружи `if`?

Верным подходом будет воспользоваться функцией, объявленной при помощи Function Expression, и присвоить значение `welcome` переменной, объявленной снаружи `if`, что обеспечит нам нужную видимость.

Такой код заработает, как ожидалось:

```js run
let age = prompt("Сколько Вам лет?", 18);
=======
  function welcome() {
    alert("Greetings!");
  }
}

// Here we're out of curly braces,
// so we can not see Function Declarations made inside of them.

*!*
welcome(); // Error: welcome is not defined
*/!*
```

What can we do to make `welcome` visible outside of `if`?

The correct approach would be to use a Function Expression and assign `welcome` to the variable that is declared outside of `if` and has the proper visibility.

This code works as intended:

```js run
let age = prompt("What is your age?", 18);
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

let welcome;

if (age < 18) {

  welcome = function() {
<<<<<<< HEAD
    alert("Привет!");
=======
    alert("Hello!");
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
  };

} else {

  welcome = function() {
<<<<<<< HEAD
    alert("Здравствуйте!");
=======
    alert("Greetings!");
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
  };

}

*!*
<<<<<<< HEAD
welcome(); // теперь всё в порядке
*/!*
```

Или мы могли бы упростить это ещё сильнее, используя условный оператор `?`:

```js run
let age = prompt("Сколько Вам лет?", 18);

let welcome = (age < 18) ?
  function() { alert("Привет!"); } :
  function() { alert("Здравствуйте!"); };

*!*
welcome(); // теперь всё в порядке
=======
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
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
*/!*
```


<<<<<<< HEAD
```smart header="Когда использовать Function Declaration, а когда Function Expression?"
Как правило, если нам понадобилась функция, в первую очередь нужно рассматривать синтаксис Function Declaration, который мы использовали до этого. Он даёт нам больше свободы в том, как мы можем организовывать код. Функции, объявленные таким образом, можно вызывать до их объявления.

Также функции вида `function f(…) {…}` чуть более заметны в коде, чем `let f = function(…) {…}`. Function Declaration легче "ловятся глазами".

...Но если Function Declaration нам не подходит по какой-то причине, или нам нужно условное объявление (мы рассмотрели это в примере выше), то следует использовать Function Expression.
```

## Итого

- Функции - это значения. Они могут быть присвоены, скопированы или объявлены в любом месте кода.
- Если функция объявлена как отдельная инструкция в основном потоке кода, то это “Function Declaration”.
- Если функция была создана как часть выражения, то это “Function Expression”.
- Function Declaration обрабатываются перед выполнением блока кода. Они видны во всём блоке.
- Функции, объявленные при помощи Function Expression, создаются только когда поток выполнения достигает их.

В большинстве случаев, когда нам нужно объявить функцию, Function Declaration предпочтительнее, т.к функция будет видна до своего объявления в коде. Это даёт нам больше гибкости в организации кода, и, как правило, делает его более читабельным.

Исходя из этого, мы должны использовать Function Expression только тогда, когда Function Declaration не подходит для нашей задачи. Мы рассмотрели несколько таких примеров в этой главе, и увидим ещё больше в будущем.
=======
```smart header="When to choose Function Declaration versus Function Expression?"
As a rule of thumb, when we need to declare a function, the first thing to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.

That's also better for readability, as it's easier to look up `function f(…) {…}` in the code than `let f = function(…) {…};`. Function Declarations are more "eye-catching".

...But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we've just seen an example), then Function Expression should be used.
```

## Summary

- Functions are values. They can be assigned, copied or declared in any place of the code.
- If the function is declared as a separate statement in the main code flow, that's called a "Function Declaration".
- If the function is created as a part of an expression, it's called a "Function Expression".
- Function Declarations are processed before the code block is executed. They are visible everywhere in the block.
- Function Expressions are created when the execution flow reaches them.

In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.

So we should use a Function Expression only when a Function Declaration is not fit for the task. We've seen a couple of examples of that in this chapter, and will see more in the future.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
