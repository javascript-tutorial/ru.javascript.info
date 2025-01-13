<<<<<<< HEAD
# Взаимодействие: alert, prompt, confirm

Так как мы будем использовать браузер как демо-среду, нам нужно познакомиться с несколькими функциями его интерфейса, а именно: `alert`, `prompt` и `confirm`.

## alert

С этой функцией мы уже знакомы. Она показывает сообщение и ждёт, пока пользователь нажмёт кнопку "ОК".

Например:
=======
# Interaction: alert, prompt, confirm

As we'll be using the browser as our demo environment, let's see a couple of functions to interact with the user: `alert`, `prompt` and `confirm`.

## alert

This one we've seen already. It shows a message and waits for the user to press "OK".

For example:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
alert("Hello");
```

<<<<<<< HEAD
Это небольшое окно с сообщением называется *модальным окном*. Понятие *модальное* означает, что пользователь не может взаимодействовать с интерфейсом остальной части страницы, нажимать на другие кнопки и т.д. до тех пор, пока взаимодействует с окном. В данном случае -- пока не будет нажата кнопка "OK".

## prompt

Функция `prompt` принимает два аргумента:
=======
The mini-window with the message is called a *modal window*. The word "modal" means that the visitor can't interact with the rest of the page, press other buttons, etc, until they have dealt with the window. In this case -- until they press "OK".

## prompt

The function `prompt` accepts two arguments:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js no-beautify
result = prompt(title, [default]);
```

<<<<<<< HEAD
Этот код отобразит модальное окно с текстом, полем для ввода текста и кнопками OK/Отмена.

`title`
: Текст для отображения в окне.

`default`
: Необязательный второй параметр, который устанавливает начальное значение в поле для текста в окне.

```smart header="Квадратные скобки в синтаксисе `[...]`"
Квадратные скобки вокруг `default` в описанном выше синтаксисе означают, что параметр факультативный, необязательный.
```

Пользователь может напечатать что-либо в поле ввода и нажать OK. Введённый текст будет присвоен переменной `result`. Пользователь также может отменить ввод нажатием на кнопку "Отмена" или нажав на клавишу `key:Esc`. В этом случае значением `result` станет  `null`.

Вызов `prompt` возвращает текст, указанный в поле для ввода, или `null`, если ввод отменён пользователем.

Например:

```js run
let age = prompt('Сколько тебе лет?', 100);

alert(`Тебе ${age} лет!`); // Тебе 100 лет!
```

````warn header="Для IE: всегда устанавливайте значение по умолчанию"
Второй параметр является необязательным, но если не указать его, то Internet Explorer вставит строку `"undefined"` в поле для ввода.

Запустите код в Internet Explorer и посмотрите на результат:
=======
It shows a modal window with a text message, an input field for the visitor, and the buttons OK/Cancel.

`title`
: The text to show the visitor.

`default`
: An optional second parameter, the initial value for the input field.

```smart header="The square brackets in syntax `[...]`"
The square brackets around `default` in the syntax above denote that the parameter is optional, not required.
```

The visitor can type something in the prompt input field and press OK. Then we get that text in the `result`. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key, then we get `null` as the `result`.

The call to `prompt` returns the text from the input field or `null` if the input was canceled.

For instance:

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

````warn header="In IE: always supply a `default`"
The second parameter is optional, but if we don't supply it, Internet Explorer will insert the text `"undefined"` into the prompt.

Run this code in Internet Explorer to see:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
let test = prompt("Test");
```

<<<<<<< HEAD
Чтобы `prompt` хорошо выглядел в IE, рекомендуется всегда указывать второй параметр:

```js run
let test = prompt("Test", ''); // <-- для IE
=======
So, for prompts to look good in IE, we recommend always providing the second argument:

```js run
let test = prompt("Test", ''); // <-- for IE
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```
````

## confirm

<<<<<<< HEAD
Синтаксис:
=======
The syntax:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
result = confirm(question);
```

<<<<<<< HEAD
Функция `confirm` отображает модальное окно с текстом вопроса `question` и двумя кнопками: OK и Отмена.

Результат -- `true`, если нажата кнопка OK. В других случаях -- `false`.

Например:

```js run
let isBoss = confirm("Ты здесь главный?");

alert( isBoss ); // true, если нажата OK
```

## Итого

Мы рассмотрели 3 функции браузера для взаимодействия с пользователем:

`alert`
: показывает сообщение.

`prompt`
: показывает сообщение и запрашивает ввод текста от пользователя. Возвращает напечатанный в поле ввода текст или `null`, если была нажата кнопка "Отмена" или `key:Esc` с клавиатуры.

`confirm`
: показывает сообщение и ждёт, пока пользователь нажмёт OK или Отмена. Возвращает `true`, если нажата OK, и `false`, если нажата кнопка "Отмена" или `key:Esc` с клавиатуры.

Все эти методы являются модальными: останавливают выполнение скриптов и не позволяют пользователю взаимодействовать с остальной частью страницы до тех пор, пока окно не будет закрыто.

На все указанные методы распространяются два ограничения:

1. Расположение окон определяется браузером. Обычно окна находятся в центре.
2. Визуальное отображение окон зависит от браузера, и мы не можем изменить их вид.

Такова цена простоты. Есть другие способы показать более приятные глазу окна с богатой функциональностью для взаимодействия с пользователем, но если "навороты" не имеют значения, то данные методы работают отлично.
=======
The function `confirm` shows a modal window with a `question` and two buttons: OK and Cancel.

The result is `true` if OK is pressed and `false` otherwise.

For example:

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true if OK is pressed
```

## Summary

We covered 3 browser-specific functions to interact with visitors:

`alert`
: shows a message.

`prompt`
: shows a message asking the user to input text. It returns the text or, if Cancel button or `key:Esc` is clicked, `null`.

`confirm`
: shows a message and waits for the user to press "OK" or "Cancel". It returns `true` for OK and `false` for Cancel/`key:Esc`.

All these methods are modal: they pause script execution and don't allow the visitor to interact with the rest of the page until the window has been dismissed.

There are two limitations shared by all the methods above:

1. The exact location of the modal window is determined by the browser. Usually, it's in the center.
2. The exact look of the window also depends on the browser. We can't modify it.

That is the price for simplicity. There are other ways to show nicer windows and richer interaction with the visitor, but if "bells and whistles" do not matter much, these methods work just fine.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
