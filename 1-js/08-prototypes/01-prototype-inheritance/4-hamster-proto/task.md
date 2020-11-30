importance: 5

---

<<<<<<< HEAD
# Почему наедаются оба хомяка?
=======
# Why are both hamsters full?
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

У нас есть два хомяка: шустрый (`speedy`) и ленивый (`lazy`); оба наследуют от общего объекта `hamster`.

<<<<<<< HEAD
Когда мы кормим одного хомяка, второй тоже наедается. Почему? Как это исправить?
=======
When we feed one of them, the other one is also full. Why? How can we fix it?
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

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

