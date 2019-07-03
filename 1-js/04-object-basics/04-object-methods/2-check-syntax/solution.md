**Ошибка**!

Попробуйте запустить:

```js run
let user = {
  name: "Джон",
  go: function() { alert(this.name) }
}

(user.go)() // ошибка!
```

Сообщение об ошибке в большинстве браузеров не даёт понимания, что же пошло не так.

**Ошибка появляется, потому что точка с запятой пропущена после `user = {...}`.**

<<<<<<< HEAD
JavaScript не вставляет автоматически точку с запятой перед круглой скобкой `(user.go)()`, поэтому читает этот код так:
=======
JavaScript does not auto-insert a semicolon before a bracket `(user.go)()`, so it reads the code like:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```js no-beautify
let user = { go:... }(user.go)()
```

<<<<<<< HEAD
Теперь мы тоже можем увидеть, что такое объединённое выражение синтаксически является вызовом объекта `{ go: ... }` как функции с аргументом `(user.go)`. И это происходит в той же строчке с объявлением переменной `let user`, т.е. объект `user` ещё даже не определён, поэтому получается ошибка.
=======
Then we can also see that such a joint expression is syntactically a call of the object `{ go: ... }` as a function with the argument `(user.go)`. And that also happens on the same line with `let user`, so the `user` object has not yet even been defined, hence the error.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Если мы вставим точку с запятой - всё заработает:

```js run
let user = {
  name: "Джон",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // Джон
```

<<<<<<< HEAD
Обратите внимание, что круглые скобки вокруг `(user.go)` ничего не значат. Обычно они определяют последовательность операций (оператор группировки), но здесь вызов метода через точку `.` срабатывает первым в любом случае, поэтому группировка ни на что не влияет. Только точка с запятой имеет значение.






=======
Please note that brackets around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there's no effect. Only the semicolon thing matters.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
