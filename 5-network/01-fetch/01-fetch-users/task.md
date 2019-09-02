# Получите данные о пользователях GitHub

<<<<<<< HEAD
Создайте асинхронную функцию `getUsers(names)`, которая получает на вход массив логинов пользователей GitHub, запрашивает у GitHub информацию о них и возвращает массив объектов-пользователей.

Информация о пользователе GitHub с логином USERNAME доступна по ссылке: `https://api.github.com/users/USERNAME`.
=======
Create an async function `getUsers(names)`, that gets an array of GitHub logins, fetches the users from GitHub and returns an array of GitHub users.

The GitHub url with user information for the given `USERNAME` is: `https://api.github.com/users/USERNAME`.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

В песочнице есть тестовый пример.

Важные детали:

1. На каждого пользователя должен приходиться один запрос `fetch`.
2. Запросы не должны ожидать завершения друг друга. Надо, чтобы данные приходили как можно быстрее.
3. Если какой-то запрос завершается ошибкой или оказалось, что данных о запрашиваемом пользователе нет, то функция должна возвращать `null` в массиве результатов.
