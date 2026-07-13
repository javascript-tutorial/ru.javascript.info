
Вы могли заметить следующие недостатки, сверху вниз:

```js no-beautify
<<<<<<< HEAD
function pow(x,n)  // <- отсутствует пробел между аргументами
{  // <- фигурная скобка на отдельной строке
  let result=1;   // <- нет пробелов вокруг знака =
  for(let i=0;i<n;i++) {result*=x;}   // <- нет пробелов
  // содержимое скобок { ... } лучше вынести на отдельную строку
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- технически допустимо,
// но лучше написать в 2 строки, также нет пробелов и точки с запятой
if (n<=0)  // <- нет пробелов, стоит добавить отступ в одну строку сверху
{   // <- фигурная скобка на отдельной строке
  // ниже - слишком длинная строка, лучше разбить для улучшения читаемости
  alert(`Степень ${n} не поддерживается, введите целую степень, большую 0`);
=======
function pow(x,n)  // <- no space between arguments
{  // <- curly brace on a separate line
  let result=1;   // <- no spaces before or after =
  for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
  // the contents of { ... } should be on a new line
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
// but better make it 2 lines, also there's no spaces and missing ;
if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
{   // <- curly brace on a separate line
  // below - long lines can be split into multiple lines for improved readability
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
}
else // <- можно на одной строке, вместе: "} else {"
{
  alert(pow(x,n))  // вложенный вызов функции, нет пробелов и точки с запятой
}
```

Исправленный вариант:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n <= 0) {
<<<<<<< HEAD
  alert(`Степень ${n} не поддерживается,
    введите целую степень, большую 0`);
=======
  alert(`Power ${n} is not supported,
    please enter an integer number greater than zero`);
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
} else {
  alert( pow(x, n) );
}
```
