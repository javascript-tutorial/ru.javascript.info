importance: 3

---

# Объясните значение "this"

<<<<<<< HEAD
В представленном ниже коде мы намерены вызвать `obj.go()` метод 4 раза подряд.
=======
In the code below we intend to call `obj.go()` method 4 times in a row.
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f

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

