# Советы по стилю кода

Код должен быть максимально читаемым и понятным.

<<<<<<< HEAD
Это и есть искусство программирования - взять сложную задачу и написать такой код для её решения, который и правильно работает, и легко читается, понятен для людей. Для этого нужен *хороший стиль* написания кода. В этой главе мы рассмотрим составляющие такого стиля.
=======
That is actually the art of programming -- to take a complex task and code it in a way that is both correct and human-readable. A good code style greatly assists in that.  
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

## Синтаксис

<<<<<<< HEAD
Шпаргалка с правилами синтаксиса (подробнее смотрите ниже по тексту):
=======
Here is a cheat sheet with some suggested rules (see below for more details):
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

![](code-style.png)
<!--
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

if (n < 0) {
  alert(`Степень ${n} не поддерживается,
   введите целую степень, большую 0`);
} else {
  alert( pow(x, n) );
}
```

-->

Не всё здесь однозначно, так что разберём эти правила подробнее.

<<<<<<< HEAD
```warn header="Ни одно правило не является жёстко обязательным"
Здесь нет железных правил. Это стилевые предпочтения, а не религиозные догмы.
=======
```warn header="There are no \"you must\" rules"
Nothing is set in stone here. These are style preferences, not religious dogmas.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
```

### Фигурные скобки

В большинстве JavaScript проектов фигурные скобки пишутся в так называемом "египетском" стиле с открывающей скобкой на той же строке, что и соответствующее ключевое слово - не на новой строке. Перед открывающей скобкой должен быть пробел, как здесь:

```js
if (condition) {
  // делай это
  // ...и это
  // ...и потом это
}
```

<<<<<<< HEAD
А что если у нас однострочная запись, типа `if (condition) doSomething()`, должны ли мы использовать фигурные скобки?
=======
A single-line construct, such as `if (condition) doSomething()`, is an important edge case. Should we use braces at all?
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Вот различные варианты расстановки скобок с комментариями, посмотрите сами, какой вам кажется самым читаемым:

<!--
```js no-beautify
// Плохо! Фигурные скобки не имеют смысла
if (n < 0) {alert(`Степень ${n} не поддерживается`);}
// Никогда не разделяйте строки без использования фигурных скобок.
if (n < 0)
  alert(`Степень ${n} не поддерживается`);
// В одну строку без скобок - приемлемо, если это строка короткая
if (n < 0) alert(`Степень ${n} не поддерживается`);
// Самый лучший вариант
if (n < 0) {
  alert(`Степень ${n} не поддерживается`);
}
```
-->
![](figure-bracket-style.png)

<<<<<<< HEAD
Итоговые рекомендации:
- Для очень короткого кода допустима одна строка. Например: `if (cond) return null`.
- На отдельной строке (последний вариант) обычно читается лучше.

### Длина строки

Никто не любит читать длинные горизонтальные строки кода. Лучше всего разбивать их, например:

```js
// обратные кавычки ` позволяют разделять строку на части
let str = `
  Рабочая группа TC39 организации Ecma International -
  это группа JavaScript-разработчиков, теоретиков и авторов движков JavaScript,
  которые вместе с сообществом занимаются поддержкой и развитием языка JavaScript.
`;
```

Или для if:
=======
### Line Length

No one likes to read a long horizontal line of code. It's best practice to split them.

For example:
```js
// backtick quotes ` allow to split the string into multiple lines
let str = `
  Ecma International's TC39 is a group of JavaScript developers,
  implementers, academics, and more, collaborating with the community
  to maintain and evolve the definition of JavaScript.
`;
```

And, for `if` statements:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```js
if (
  id === 123 &&
  moonPhase === 'Waning Gibbous' &&
  zodiacSign === 'Libra'
) {
  letTheSorceryBegin();
}
```

Максимальную длину строки согласовывают в команде. Обычно это `80` или `120` символов.

### Отступы

Существует два типа отступов:

- **Горизонтальные отступы: два или четыре пробела.**

    Горизонтальный отступ выполняется с помощью 2 или 4 пробелов, или символа "Tab". Какой из них выбрать - это уже на ваше усмотрение. Пробелы больше распространены.

    Одно из преимуществ пробелов над табуляцией заключается в том, что пробелы допускают более гибкие конфигурации отступов, чем символ "Tab".

    Например, мы можем выровнять аргументы относительно открывающей скобки:

    ```js no-beautify
    show(parameters,
         aligned, // 5 пробелов слева  
         one,
         after,
         another
      ) {
      // ...
    }
    ```

- **Вертикальные отступы: пустые строки для разбивки кода на "логические блоки".**

    Даже одну функцию часто можно разделить на логические блоки. В примере ниже разделены инициализация переменных, основной цикл и возвращаемый результат:

    ```js
    function pow(x, n) {
      let result = 1;
      //              <--
      for (let i = 0; i < n; i++) {
        result *= x;
      }
      //              <--
      return result;
    }
    ```

    Вставляйте дополнительный перевод строки туда, где это сделает код более читаемым. Не должно быть более 9 строк кода подряд без вертикального отступа.

### Точка с запятой

Точки с запятой должны присутствовать после каждого выражения, даже если их, казалось бы, можно пропустить.

<<<<<<< HEAD
Есть языки, в которых точка с запятой необязательна и редко используется. Однако в JavaScript бывают случаи, когда перенос строки не интерпретируется как точка с запятой, что может привести к ошибкам. Детали об этом - в главе [точка с запятой](info:structure#semicolon).

Если вы опытный разработчик на JavaScript, то можно выбрать стиль кода без точек с запятой, например [StandardJS](https://standardjs.com/). В ином случае, лучше будет использовать точки с запятой, чтобы избежать подводных камней. Большинство разработчиков их ставят.
=======
There are languages where a semicolon is truly optional and it is rarely used. In JavaScript, though, there are cases where a line break is not interpreted as a semicolon, leaving the code vulnerable to errors. See more about that in the chapter <info:structure#semicolon>.

If you're an experienced JavaScript programmer, you may choose a no-semicolon code style like [StandardJS](https://standardjs.com/). Otherwise, it's best to use semicolons to avoid possible pitfalls. The majority of developers put semicolons.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

### Уровни вложенности

Уровней вложенности должно быть немного.

<<<<<<< HEAD
Например, в цикле бывает полезно использовать директиву ["continue"](info:while-for#continue), чтобы избежать лишней вложенности.
=======
For example, in the loop, it's sometimes a good idea to use the ["continue"](info:while-for#continue) directive to avoid extra nesting.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Например, вместо добавления вложенного условия `if`, как здесь:

```js
for (let i = 0; i < 10; i++) {
  if (cond) {
    ... // <- ещё один уровень вложенности
  }
}
```

Мы можем написать:

```js
for (let i = 0; i < 10; i++) {
  if (!cond) *!*continue*/!*;
  ...  // <- нет лишнего уровня вложенности
}
```

Аналогичная ситуация – с `if/else` и `return`.

Например, две нижеследующие конструкции идентичны.

Первая:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Отрицательные значения 'n' не поддерживаются");
  } else {
    let result = 1;

    for (let i = 0; i < n; i++) {
      result *= x;
    }

    return result;
  }  
}
```

Вторая:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Отрицательные значения 'n' не поддерживаются");
    return;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

<<<<<<< HEAD
Второй вариант является более читабельным, потому что "особый случай" `n < 0` обрабатывается на ранней стадии. После проверки можно переходить к "основному" потоку кода без необходимости увеличения вложенности.
=======
The second one is more readable because the "special case" of `n < 0` is handled early on. Once the check is done we can move on to the "main" code flow without the need for additional nesting.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

## Размещение функций

Если вы пишете несколько "вспомогательных" функций и далее используемый ими код, то существует три способа организации функций.

<<<<<<< HEAD
1. Объявить функции *перед* кодом, который их вызовет:
=======
1. Declare the functions *above* the code that uses them:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

    ```js
    // *!*объявление функций*/!*
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }

    // *!*код, который использует их*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();
    ```
2. Сначала код, затем функции

    ```js
    // *!*код, использующий функции*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();

    // --- *!*вспомогательные функции*/!* ---
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }
    ```
3. Смешанный стиль: функция объявляется там, где она используется впервые.

В большинстве случаев второй вариант является предпочтительным.

<<<<<<< HEAD
Это потому, что при чтении кода мы сначала хотим знать, *что он делает*. Если сначала идёт код, то это тут же становится понятно. И тогда, может быть, нам вообще не нужно будет читать функции, особенно если их имена хорошо подобраны.
=======
That's because when reading code, we first want to know *what it does*. If the code goes first, then it becomes clear from the start. Then, maybe we won't need to read the functions at all, especially if their names are descriptive of what they actually do.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

## Руководства по стилю кода

Руководство по стилю содержит общие правила о том, как писать код, например: какие кавычки использовать, сколько пробелов отступать, куда помещать разрывы строк и так далее - в общем, множество мелочей.

Когда все участники команды используют одно и то же руководство по стилю, код выглядит одинаково, независимо от того, кто из команды его написал.

<<<<<<< HEAD
Конечно, команда всегда может написать собственное руководство по стилю, но обычно в этом нет необходимости. Существует множество уже готовых.
=======
Of course, a team can always write their own style guide, but usually there's no need to. There are many existing guides to choose from.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Некоторые популярные руководства:

- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) (есть [перевод](https://leonidlebedev.github.io/javascript-airbnb/))
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js) (есть [перевод](https://github.com/leonidlebedev/javascript-airbnb))
- [StandardJS](https://standardjs.com/)
- (и ещё множество других)

<<<<<<< HEAD
Если вы начинающий разработчик, то начните со шпаргалки в начале этой главы. Как только вы освоитесь, просмотрите другие руководства, чтобы выбрать общие принципы и решить, какое вам больше подходит.
=======
If you're a novice developer, start with the cheat sheet at the beginning of this chapter. Then you can browse other style guides to pick up more ideas and decide which one you like best.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

## Автоматизированные средства проверки (линтеры)

<<<<<<< HEAD
Автоматизированные средства проверки, так называемые "линтеры" - это инструменты, которые могут автоматически проверять стиль вашего кода и вносить предложения по его улучшению.

Самое замечательное в них то, что проверка стиля может также найти программные ошибки, такие как опечатки в именах переменных или функций. Из-за этой особенности использовать линтер рекомендуется, даже если вы не хотите придерживаться какого-то конкретного "стиля кода".

Вот некоторые известные инструменты для проверки:
=======
Linters are tools that can automatically check the style of your code and make improving suggestions.

The great thing about them is that style-checking can also find some bugs, like typos in variable or function names. Because of this feature, using a linter is recommended even if you don't want to stick to one particular "code style".

Here are some well-known linting tools:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

- [JSLint](http://www.jslint.com/) -- проверяет код на соответствие [стилю JSLint](http://www.jslint.com/lint.html), в онлайн-интерфейсе вверху можно ввести код, а внизу различные настройки проверки, чтобы сделать её более мягкой.
- [JSHint](http://www.jshint.com/) -- больше проверок, чем в JSLint.
- [ESLint](http://eslint.org/) -- пожалуй, самый современный линтер.

Все они выполняют свою работу. Автор пользуется [ESLint](http://eslint.org/).

Большинство линтеров интегрированы со многими популярными редакторами: просто включите плагин в редакторе и настройте стиль.

Например, для ESLint вы должны выполнить следующее:

1. Установите [Node.JS](https://nodejs.org/).
2. Установите ESLint с помощью команды `npm install -g eslint` (npm - установщик пакетов JavaScript).
3. Создайте файл конфигурации с именем `.eslintrc` в корне вашего JavaScript-проекта (в папке, содержащей все ваши файлы).
4. Установите/включите плагин для вашего редактора, который интегрируется с ESLint. У большинства редакторов он есть.

Вот пример файла `.eslintrc`:

```js
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,
    "indent": ["warning", 2]
  }
}
```

Здесь директива `"extends"` означает, что конфигурация основана на наборе настроек "eslint:recommended". После этого мы уточняем наши собственные.

Кроме того, возможно загрузить наборы правил стиля из сети и расширить их. Смотрите <https://eslint.org/docs/user-guide/getting-started> для получения более подробной информации об установке.

Также некоторые среды разработки имеют встроенные линтеры, возможно, удобные, но не такие гибкие в настройке, как ESLint.

## Итого

<<<<<<< HEAD
Все правила синтаксиса, описанные в этой главе (и в ссылках на руководства по стилю), направлены на повышение читаемости вашего кода. О любых можно поспорить.

Когда мы думаем о написании "лучшего" кода, мы должны задать себе вопросы: "Что сделает код более читаемым и лёгким для понимания?" и "Что может помочь избегать ошибок?". Это основные моменты, о которых следует помнить при выборе и обсуждении стилей кода.
=======
All syntax rules described in this chapter (and in the style guides referenced) aim to increase the readability of your code. All of them are debatable.

When we think about writing "better" code, the questions we should ask ourselves are: "What makes the code more readable and easier to understand?" and "What can help us avoid errors?" These are the main things to keep in mind when choosing and debating code styles.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

Чтение популярных руководств по стилю позволит вам быть в курсе лучших практик и последних идей и тенденций в стилях написания кода.
