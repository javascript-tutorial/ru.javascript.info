importance: 4

---

# Создайте список

Напишите интерфейс для создания списка.

Для каждого пункта:

<<<<<<< HEAD
1. Запрашивайте содержимое пункта у пользователя с помощью  `prompt`.
2. Создавайте элемент `<li>` и добавляйте его к `<ul>`.
3. Продолжайте до тех пор, пока пользователь не отменит ввод (нажатием клавиши `key:Esc` или введя пустую строку).
=======
1. Ask a user about its content using `prompt`.
2. Create the `<li>` with it and add it to `<ul>`.
3. Continue until the user cancels the input (by pressing `key:Esc` or via an empty entry).
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

Все элементы должны создаваться динамически.

Если пользователь вводит HTML-теги, они должны обрабатываться как текст.

[demo src="solution"]
