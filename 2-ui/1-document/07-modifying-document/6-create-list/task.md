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
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Все элементы должны создаваться динамически.

Если пользователь вводит HTML-теги -– пусть в списке они показываются как обычный текст.

[demo src="solution"]
