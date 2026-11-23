importance: 3

---

# Объясните значение "this"

<<<<<<< HEAD
В представленном ниже коде мы намерены вызвать `obj.go()` метод 4 раза подряд.
=======
In the code below we intend to call `obj.go()` method 4 times in a row.
>>>>>>> 20208769e528337949e946f526534d61d38bac47

Но вызовы `(1)` и `(2)` работают иначе, чем `(3)` и `(4)`. Почему?

```js run no-beautify
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```
