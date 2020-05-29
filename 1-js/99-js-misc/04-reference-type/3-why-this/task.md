importance: 3

---

# Объясните значение "this"

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/task.md
В представленном ниже коде мы намерены вызвать `obj.go()` метод 4 раза подряд.
=======
In the code below we intend to call `obj.go()` method 4 times in a row.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/99-js-misc/04-reference-type/3-why-this/task.md

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

