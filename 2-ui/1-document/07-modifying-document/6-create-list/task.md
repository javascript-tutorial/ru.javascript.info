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
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b

Все элементы должны создаваться динамически.

Если пользователь вводит HTML-теги, они должны обрабатываться как текст.

[demo src="solution"]
