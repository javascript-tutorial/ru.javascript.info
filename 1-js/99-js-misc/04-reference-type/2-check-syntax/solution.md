<<<<<<< HEAD
**Ошибка**!

Попробуйте запустить:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // ошибка!
```

Сообщение об ошибке в большинстве браузеров не даёт понимания, что же пошло не так.

**Ошибка появляется, потому что точка с запятой пропущена после `user = {...}`.**

JavaScript не вставляет автоматически точку с запятой перед круглой скобкой `(user.go)()`, поэтому читает этот код так:

```js no-beautify
let user = { go:... }(user.go)()
```

Теперь мы тоже можем увидеть, что такое объединённое выражение синтаксически является вызовом объекта `{ go: ... }` как функции с аргументом `(user.go)`. И это происходит в той же строчке с объявлением переменной `let user`, т.е. объект `user` ещё даже не определён, поэтому получается ошибка.

Если мы вставим точку с запятой - всё заработает:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

Обратите внимание, что круглые скобки вокруг `(user.go)` ничего не значат. Обычно они определяют последовательность операций (оператор группировки), но здесь вызов метода через точку `.` срабатывает первым в любом случае, поэтому группировка ни на что не влияет. Только точка с запятой имеет значение.
=======
**Error**!

Try it:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // error!
```

The error message in most browsers does not give us much of a clue about what went wrong.

**The error appears because a semicolon is missing after `user = {...}`.**

JavaScript does not auto-insert a semicolon before a bracket `(user.go)()`, so it reads the code like:

```js no-beautify
let user = { go:... }(user.go)()
```

Then we can also see that such a joint expression is syntactically a call of the object `{ go: ... }` as a function with the argument `(user.go)`. And that also happens on the same line with `let user`, so the `user` object has not yet even been defined, hence the error.

If we insert the semicolon, all is fine:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

Please note that parentheses around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there's no effect. Only the semicolon thing matters.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
