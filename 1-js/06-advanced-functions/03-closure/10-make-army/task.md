importance: 5

---

<<<<<<< HEAD
# Армия функций

Следующий код создаёт массив из стрелков (`shooters`).

Каждая функция предназначена выводить их порядковые номера. Но что-то пошло не так...
=======
# Army of functions

The following code creates an array of `shooters`.

Every function is meant to output its number. But something is wrong...
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
<<<<<<< HEAD
    let shooter = function() { // функция shooter
      alert( i ); // должна выводить порядковый номер
    };
    shooters.push(shooter); // и добавлять стрелка в массив
    i++;
  }

  // ...а в конце вернуть массив из всех стрелков
  return shooters; 
=======
    let shooter = function() { // create a shooter function,
      alert( i ); // that should show its number
    };
    shooters.push(shooter); // and add it to the array
    i++;
  }

  // ...and return the array of shooters
  return shooters;
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
}

let army = makeArmy();

*!*
<<<<<<< HEAD
// все стрелки выводят 10 вместо их порядковых номеров (0, 1, 2, 3...)
army[0](); // 10 от стрелка с порядковым номером 0
army[1](); // 10 от стрелка с порядковым номером 1
army[2](); // 10 ...и т.д.
*/!*
```

Почему у всех стрелков одинаковые номера? 

Почините код, чтобы он работал как задумано.
=======
// all shooters show 10 instead of their numbers 0, 1, 2, 3...
army[0](); // 10 from the shooter number 0
army[1](); // 10 from the shooter number 1
army[2](); // 10 ...and so on.
*/!*
```

Why do all of the shooters show the same value? 

Fix the code so that they work as intended.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

