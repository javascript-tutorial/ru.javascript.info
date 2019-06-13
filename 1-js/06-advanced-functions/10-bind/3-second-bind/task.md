importance: 5

---

# Повторный bind

Можем ли мы изменить `this` дополнительным связыванием?

Что выведет этот код?

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "Вася"} ).bind( {name: "Петя" } );

f();
```

