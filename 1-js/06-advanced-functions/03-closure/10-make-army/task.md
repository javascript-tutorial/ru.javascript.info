importance: 5

---

# Армия функций

Следующий код создаёт массив из стрелков (`shooters`).

Каждая функция предназначена выводить их порядковые номера. Но что-то пошло не так...

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // функция shooter
      alert( i ); // должна выводить порядковый номер
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // у 0-го стрелка будет номер 10
army[5](); // и у 5-го стрелка тоже будет номер 10
// ... у всех стрелков будет номер 10, вместо 0, 1, 2, 3...
```

<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/8-make-army/task.md
Почему у всех стрелков одинаковые номера? Почините код, чтобы он работал как задумано.
=======
Why do all of the shooters show the same value? Fix the code so that they work as intended.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a:1-js/06-advanced-functions/03-closure/10-make-army/task.md

