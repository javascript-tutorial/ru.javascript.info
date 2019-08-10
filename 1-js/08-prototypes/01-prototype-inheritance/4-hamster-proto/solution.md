Давайте внимательно посмотрим, что происходит при вызове `speedy.eat("apple")`.

1. Сначала в прототипе (`=hamster`) находится метод `speedy.eat`, а затем он выполняется с `this=speedy` (объект перед точкой).

2. Затем в `this.stomach.push()` нужно найти свойство `stomach` и вызвать для него `push`. Движок ищет `stomach` в `this` (`=speedy`), но ничего не находит.

3. Он идёт по цепочке прототипов и находит `stomach` в `hamster`.

4. И вызывает для него `push`, добавляя еду в *живот прототипа*.

Получается, что у хомяков один живот на двоих!

И при `lazy.stomach.push(...)` и при `speedy.stomach.push()`, свойство `stomach` берётся из прототипа (так как его нет в самом объекте), затем в него добавляются данные.

Обратите внимание, что этого не происходит при простом присваивании `this.stomach=`:

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // присвоение значения this.stomach вместо вызова this.stomach.push
    this.stomach = [food];
*/!*
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Шустрый хомяк нашёл еду
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Живот ленивого хомяка пуст
alert( lazy.stomach ); // <ничего>
```

Теперь всё работает правильно, потому что `this.stomach=` не ищет свойство `stomach`. Значение записывается непосредственно в объект `this`.

Также мы можем полностью избежать проблемы, если у каждого хомяка будет собственный живот:

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

let lazy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

// Шустрый хомяк нашёл еду
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Живот ленивого хомяка пуст
alert( lazy.stomach ); // <ничего>
```

Все свойства, описывающие состояние объекта (как свойство `stomach` в примере выше), рекомендуется записывать в сам этот объект. Это позволяет избежать подобных проблем.
