# Взаимодействие: alert, prompt, confirm

В этой части учебника используется JavaScript "из коробки" без специфических настроек окружения.

Но мы продолжим использовать браузер как демо-среду, поэтому мы должны освосить по крайней мере несколько функций его пользовательского интерфейса. В этой части ознакомимся с такими функциями браузера как `alert`, `prompt` и `confirm`.


## alert

Синтаксис:

```js
alert(message);
```

Этот код отобразит окно в браузере и приостановит дальнейшее выполнение скриптов, до тех пор пока пользователь не нажмет кнопку "OK".

Например:

```js run
alert("Hello");
```

Это небольшое окно с сообщением называется *модальным окном*. Понятие *модальный* означает, что пользователь не может взаимодействовать с интерфейсом остальной части страницы, нажимать на другие кнопки и т.д. до тех пор, пока взаимодействует с окном. В данном случае -- пока не будет нажата кнопка "OK".

## prompt

Функция `prompt` принимает два аргумента:

```js no-beautify
result = prompt(title, [default]);
```

Этот код отобразит модальное окно с текстом, полем для ввода текста и кнопками OK/CANCEL.

`title`
: Текст для отображения в окне.

`default`
: Необязательный второй параметр, который устанавливает начальное значение в поле для ввода текста в окне.

Пользователь может напечатать что-либо в поле ввода запроса и нажать OK. Или отменить ввод нажатием клавиши CANCEL или нажав клавишу `Esc`.

Вызов `prompt` вернет текст указанный в поле для ввода или `null` если ввод отменен пользователем.

For instance:

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

````warn header="In IE: always supply a `default`"
The second parameter is optional, but if we don't supply it, Internet Explorer will insert the text `"undefined"` into the prompt.

Run this code in Internet Explorer to see:

```js run
let test = prompt("Test");
```

So, for prompts to look good in IE, we recommend always providing the second argument:

```js run
let test = prompt("Test", ''); // <-- for IE
```
````

## confirm

The syntax:

```js
result = confirm(question);
```

The function `confirm` shows a modal window with a `question` and two buttons: OK and CANCEL.

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
: shows a message asking the user to input text. It returns the text or, if CANCEL or `key:Esc` is clicked, `null`.

`confirm`
: shows a message and waits for the user to press "OK" or "CANCEL". It returns `true` for OK and `false` for CANCEL/`key:Esc`.

All these methods are modal: they pause script execution and don't allow the visitor to interact with the rest of the page until the window has been dismissed.

There are two limitations shared by all the methods above:

1. The exact location of the modal window is determined by the browser. Usually, it's in the center.
2. The exact look of the window also depends on the browser. We can't modify it.

That is the price for simplicity. There are other ways to show nicer windows and richer interaction with the visitor, but if "bells and whistles" do not matter much, these methods work just fine.
