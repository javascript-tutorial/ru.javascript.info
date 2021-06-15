<<<<<<< HEAD
Причина в том, что окно запроса возвращает пользовательский ввод как строку.

Поэтому переменные получают значения `"1"` и `"2"` соответственно.

```js run
let a = "1"; // prompt("Первое число?", 1);
let b = "2"; // prompt("Второе число?", 2);
=======
The reason is that prompt returns user input as a string.

So variables have values `"1"` and `"2"` respectively.

```js run
let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

alert(a + b); // 12
```

<<<<<<< HEAD
Нам нужно привести строки к числам перед применением оператора `+`. Например, с помощью `Number()` или вставки `+` перед ними.

Вставить `+` можно прямо перед `prompt`:

```js run
let a = +prompt("Первое число?", 1);
let b = +prompt("Второе число?", 2);
=======
What we should do is to convert strings to numbers before `+`. For example, using `Number()` or prepending them with `+`.

For example, right before `prompt`:

```js run
let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

alert(a + b); // 3
```

<<<<<<< HEAD
Или внутри `alert`:

```js run
let a = prompt("Первое число?", 1);
let b = prompt("Второе число?", 2);
=======
Or in the `alert`:

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c

alert(+a + +b); // 3
```

<<<<<<< HEAD
В последнем варианте унарный и бинарный `+` используются вместе. Выглядит забавно, правда?
=======
Using both unary and binary `+` in the latest code. Looks funny, doesn't it?
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c
