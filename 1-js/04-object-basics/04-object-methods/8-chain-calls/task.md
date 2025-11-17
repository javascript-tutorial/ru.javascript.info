importance: 2

---

# Цепь вызовов

<<<<<<< HEAD
У нас есть объект `ladder` (лестница), который позволяет подниматься и спускаться:
=======
There's a `ladder` object that allows you to go up and down:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js
let ladder = {
  step: 0,
  up() { 
    this.step++;
  },
  down() { 
    this.step--;
  },
  showStep: function() { // показывает текущую ступеньку
    alert( this.step );
  }
};
```

<<<<<<< HEAD
Теперь, если нам нужно выполнить несколько последовательных вызовов, мы можем сделать это так:
=======
Now, if we need to make several calls in sequence, we can do it like this:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

<<<<<<< HEAD
Измените код методов `up`, `down` и `showStep` таким образом, чтобы их вызов можно было сделать по цепочке, например так:

```js
ladder.up().up().down().showStep().down().showStep(); // показывает 1 затем 0
```

Такой подход широко используется в библиотеках JavaScript. 
=======
Modify the code of `up`, `down`, and `showStep` to make the calls chainable, like this:

```js
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

Such an approach is widely used across JavaScript libraries.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
