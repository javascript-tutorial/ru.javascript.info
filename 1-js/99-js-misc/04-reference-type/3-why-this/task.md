importance: 3

---

# Объясните значение "this"

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/task.md
В представленном ниже коде мы намерены вызвать `obj.go()` метод 4 раза подряд.
=======
In the code below we intend to call `obj.go()` method 4 times in a row.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74:1-js/99-js-misc/04-reference-type/3-why-this/task.md

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

