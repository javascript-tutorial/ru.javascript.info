<<<<<<< HEAD
# Оператор объединения с null '??'

[recent browser="new"]

В этой статье мы будем говорить, что значение выражения "определено", если оно отличается от `null` или `undefined`.

Оператор объединения с null представляет собой два вопросительных знака `??`.

Результат выражения `a ?? b` будет следующим:
- `a`, если значение `a` определено,
- `b`, если значение `a` не определено.

То есть оператор `??` возвращает первый аргумент, если он не `null/undefined`, иначе второй.

Оператор объединения с null не является чем-то принципиально новым. Это всего лишь удобный синтаксис, как из двух значений получить одно "определённое".

Вот как можно переписать выражение `result = a ?? b`, используя уже знакомые нам операторы:
=======
# Nullish coalescing operator '??'

[recent browser="new"]

The nullish coalescing operator is written as two question marks `??`.

As it treats `null` and `undefined` similarly, we'll use a special term here, in this article. We'll say that an expression is "defined" when it's neither `null` nor `undefined`.

The result of `a ?? b` is:
- if `a` is defined, then `a`,
- if `a` isn't defined, then `b`.

In other words, `??` returns the first argument if it's not `null/undefined`. Otherwise, the second one.

The nullish coalescing operator isn't anything completely new. It's just a nice syntax to get the first "defined" value of the two.

We can rewrite `result = a ?? b` using the operators that we already know, like this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js
result = (a !== null && a !== undefined) ? a : b;
```

<<<<<<< HEAD
Как правило, оператор `??` нужен для того, чтобы задать значение по умолчанию для потенциально неопределённой переменной.

Например, в следующем примере, если переменная `user` не определена, покажем модальное окно с надписью `Аноним`:
=======
Now it should be absolutely clear what `??` does. Let's see where it helps.

The common use case for `??` is to provide a default value for a potentially undefined variable.

For example, here we show `user` if defined, otherwise `Anonymous`:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let user;

<<<<<<< HEAD
alert(user ?? "Аноним"); // Аноним
```

Конечно, если бы переменная `user` содержала любое значение, кроме `null/undefined`, то мы бы увидели его:

```js run
let user = "Иван";

alert(user ?? "Аноним"); // Иван
```

Кроме этого, можно записать последовательность из операторов `??`, чтобы получить первое значение из списка, которое не является `null/undefined`.

Допустим, у нас есть данные пользователя в переменных `firstName`, `lastName` или `nickName`. Все они могут быть неопределёнными, если отсутствует соответствующая информация.

Выведем имя пользователя, используя одну из этих переменных, а в случае если все они не определены, то покажем "Аноним".

Для этого воспользуемся оператором `??`:
=======
alert(user ?? "Anonymous"); // Anonymous (user not defined)
```

Here's the example with `user` assigned to a name:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John (user defined)
```

We can also use a sequence of `??` to select the first value from a list that isn't `null/undefined`.

Let's say we have a user's data in variables `firstName`, `lastName` or `nickName`. All of them may be not defined, if the user decided not to enter a value.

We'd like to display the user name using one of these variables, or show "Anonymous" if all of them aren't defined.

Let's use the `??` operator for that:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let firstName = null;
let lastName = null;
<<<<<<< HEAD
let nickName = "Суперкодер";

// показывает первое определённое значение:
*!*
alert(firstName ?? lastName ?? nickName ?? "Аноним"); // Суперкодер
*/!*
```

## Сравнение с ||

Оператор ИЛИ `||` можно использовать для того же, что и `??`, как это было показано в [предыдущей главе](info:logical-operators#or-finds-the-first-truthy-value).

Например, если в приведённом выше коде заменить `??` на `||`, то будет тот же самый результат:
=======
let nickName = "Supercoder";

// shows the first defined value:
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## Comparison with ||

The OR `||` operator can be used in the same way as `??`, as it was described in the [previous chapter](info:logical-operators#or-finds-the-first-truthy-value).

For example, in the code above we could replace `??` with `||` and still get the same result:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let firstName = null;
let lastName = null;
<<<<<<< HEAD
let nickName = "Суперкодер";

// показывает первое истинное значение:
*!*
alert(firstName || lastName || nickName || "Аноним"); // Суперкодер
*/!*
```

Оператор ИЛИ `||` существует с самого появления JavaScript, поэтому ранее для решения похожих задач разработчики использовали именно его.

С другой стороны, сравнительно недавно в язык был добавлен оператор объединения с null `??` как раз потому, что многие были недовольны оператором `||`.

Важное различие между ними заключается в том, что:
- `||` возвращает первое *истинное* значение.
- `??` возвращает первое *определённое* значение.

Проще говоря, оператор `||` не различает `false`, `0`, пустую строку `""` и `null/undefined`. Для него они все одинаковые, т.е. являются ложными значениями. Если первым аргументом для оператора `||` будет любое из перечисленных значений, то в качестве результата мы получим второй аргумент.

Однако на практике часто требуется использовать значение по умолчанию только тогда, когда переменная является `null/undefined`. Ведь именно тогда значение действительно неизвестно/не определено.

Например, рассмотрим следующий пример:
=======
let nickName = "Supercoder";

// shows the first truthy value:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

Historically, the OR `||` operator was there first. It exists since the beginning of JavaScript, so developers were using it for such purposes for a long time.

On the other hand, the nullish coalescing operator `??` was added to JavaScript only recently, and the reason for that was that people weren't quite happy with `||`.

The important difference between them is that:
- `||` returns the first *truthy* value.
- `??` returns the first *defined* value.

In other words, `||` doesn't distinguish between `false`, `0`, an empty string `""` and `null/undefined`. They are all the same -- falsy values. If any of these is the first argument of `||`, then we'll get the second argument as the result.

In practice though, we may want to use default value only when the variable is `null/undefined`. That is, when the value is really unknown/not set.

For example, consider this:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

<<<<<<< HEAD
- `height || 100` проверяет, имеет ли переменная `height` ложное значение, что так и есть,
    - поэтому результатом является второй аргумент, т.е. `100`.
- `height ?? 100` проверяет, что переменная `height` содержит `null/undefined`, а поскольку это не так,
    - то результатом является сама переменная `height`, т.е. `0`.

Если нулевая высота является "нормальным" значением, которое не должно заменяться значением по умолчанию, то оператор `??` делает как раз то, что нужно.

## Приоритет

Оператор `??` имеет довольно низкий приоритет: `5`, согласно [таблице на MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).
Таким образом, оператор `??` вычисляется до `=` и `?`, но после большинства других операций, таких как `+`, `*`.

Из этого следует, что если нужно выбрать значение при помощи оператора `??` вместе с другими операторами в выражении, следует добавить круглые скобки:
=======
- The `height || 100` checks `height` for being a falsy value, and it's `0`, falsy indeed.
    - so the result of `||` is the second argument, `100`.
- The `height ?? 100` checks `height` for being `null/undefined`, and it's not,
    - so the result is `height` "as is", that is `0`.

In practice, the zero height is often a valid value, that shouldn't be replaced with the default. So `??` does just the right thing.

## Precedence

The precedence of the `??` operator is about the same as `||`, just a bit lower. It equals `5` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table), while `||` is `6`.

That means that, just like `||`, the nullish coalescing operator `??` is evaluated before `=` and `?`, but after most other operations, such as `+`, `*`.

So if we'd like to choose a value with `??` in an expression with other operators, consider adding parentheses:
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

```js run
let height = null;
let width = null;

<<<<<<< HEAD
// важно: используйте круглые скобки
=======
// important: use parentheses
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

<<<<<<< HEAD
Иначе, если опустить скобки, то оператор `*` выполнится первым, так как у него приоритет выше, чем у `??`, а это приведёт к неправильным результатам.

```js
// без круглых скобок
let area = height ?? 100 * width ?? 50;

// ...то же самое, что предыдущее выражение (вероятно, это не то, что нам нужно):
let area = height ?? (100 * width) ?? 50;
```

### Использование ?? вместе с && или ||

По соображениям безопасности JavaScript запрещает использование оператора `??` вместе с `&&` и `||`, если только приоритет явно не указан в круглых скобках.

Выполнение следующего кода приведёт к синтаксической ошибке:

```js run
let x = 1 && 2 ?? 3; // Синтаксическая ошибка
```

Это довольно спорное ограничение, которое было описано в спецификации языка, чтобы избежать ошибок при замене оператора `||` на `??`.

Используйте круглые скобки, чтобы обойти это ограничение: 

```js run
*!*
let x = (1 && 2) ?? 3; // Работает без ошибок
=======
Otherwise, if we omit parentheses, then as `*` has the higher precedence than `??`, it would execute first, leading to incorrect results.

```js
// without parentheses
let area = height ?? 100 * width ?? 50;

// ...works the same as this (probably not what we want):
let area = height ?? (100 * width) ?? 50;
```

### Using ?? with && or ||

Due to safety reasons, JavaScript forbids using `??` together with `&&` and `||` operators, unless the precedence is explicitly specified with parentheses.

The code below triggers a syntax error:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

The limitation is surely debatable, it was added to the language specification with the purpose to avoid programming mistakes, when people start to switch from `||` to `??`.

Use explicit parentheses to work around it:

```js run
*!*
let x = (1 && 2) ?? 3; // Works
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
*/!*

alert(x); // 2
```

<<<<<<< HEAD
## Итого

- Оператор объединения с null `??` — это быстрый способ выбрать первое "определённое" значение из списка.

    Используется для присвоения переменным значений по умолчанию:

    ```js
    // будет height=100, если переменная height равна null или undefined
    height = height ?? 100;
    ```

- Оператор `??` имеет очень низкий приоритет, лишь немного выше, чем у `?` и `=`, поэтому при использовании его в выражении, скорее всего, потребуются скобки.
- Запрещено использовать вместе с `||` или `&&` без явно указанных круглых скобок.
=======
## Summary

- The nullish coalescing operator `??` provides a short way to choose the first "defined" value from a list.

    It's used to assign default values to variables:

    ```js
    // set height=100, if height is null or undefined
    height = height ?? 100;
    ```

- The operator `??` has a very low precedence, only a bit higher than `?` and `=`, so consider adding parentheses when using it in an expression.
- It's forbidden to use it with `||` or `&&` without explicit parentheses.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
