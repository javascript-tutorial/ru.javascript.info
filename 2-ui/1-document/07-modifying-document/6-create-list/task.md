importance: 4

---

# Создайте список

Напишите интерфейс для создания списка.

Для каждого пункта:

<<<<<<< HEAD
1. Запрашивайте содержимое пункта у пользователя с помощью  `prompt`.
2. Создавайте элемент `<li>` и добавляйте его к `<ul>`.
3. Процесс прерывается, когда пользователь нажимает `key:Esc` или вводит пустую строку.
=======
1. Ask a user about its content using `prompt`.
2. Create the `<li>` with it and add it to `<ul>`.
3. Continue until the user cancels the input (by pressing `key:Esc` or via an empty entry).
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

Все элементы должны создаваться динамически.

Если пользователь вводит HTML-теги -– пусть в списке они показываются как обычный текст.

[demo src="solution"]
