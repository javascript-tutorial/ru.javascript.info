importance: 5

---

<<<<<<< HEAD
# Почему наедаются оба хомяка?
=======
# Why are both hamsters full?
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

У нас есть два хомяка: шустрый (`speedy`) и ленивый (`lazy`); оба наследуют от общего объекта `hamster`.

<<<<<<< HEAD
Когда мы кормим одного хомяка, второй тоже наедается. Почему? Как это исправить?
=======
When we feed one of them, the other one is also full. Why? How can we fix it?
>>>>>>> 13da056653754765b50aa5a9f706f84a4a0d6293

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Этот хомяк нашёл еду
speedy.eat("apple");
alert( speedy.stomach ); // apple

// У этого хомяка тоже есть еда. Почему? Исправьте
alert( lazy.stomach ); // apple
```

