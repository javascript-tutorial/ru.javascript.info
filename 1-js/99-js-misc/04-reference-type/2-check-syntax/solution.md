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

JavaScript не вставляет автоматически точку с запятой перед круглой скобкой `(user.go)()`, поэтому читает этот код так:

```js no-beautify
let user = { go:... }(user.go)()
```

Теперь мы тоже можем увидеть, что такое объединённое выражение синтаксически является вызовом объекта `{ go: ... }` как функции с аргументом `(user.go)`. И это происходит в той же строчке с объявлением переменной `let user`, т.е. объект `user` ещё даже не определён, поэтому получается ошибка.

Если мы вставим точку с запятой - всё заработает:

```js run
let user = {
  name: "Джон",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // Джон
```

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/2-check-syntax/solution.md
Обратите внимание, что круглые скобки вокруг `(user.go)` ничего не значат. Обычно они определяют последовательность операций (оператор группировки), но здесь вызов метода через точку `.` срабатывает первым в любом случае, поэтому группировка ни на что не влияет. Только точка с запятой имеет значение.






=======
Please note that parentheses around `(user.go)` do nothing here. Usually they setup the order of operations, but here the dot `.` works first anyway, so there's no effect. Only the semicolon thing matters.
>>>>>>> fb4fc33a2234445808100ddc9f5e4dcec8b3d24c:1-js/99-js-misc/04-reference-type/2-check-syntax/solution.md
