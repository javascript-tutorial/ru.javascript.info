# Получите данные о пользователях GitHub

<<<<<<< HEAD
Создайте асинхронную функцию `getUsers(names)`, которая получает на вход массив логинов пользователей GitHub, запрашивает у GitHub информацию о них и возвращает массив объектов-пользователей.

Информация о пользователе GitHub с логином USERNAME доступна по ссылке: `https://api.github.com/users/USERNAME`.
=======
Create an async function `getUsers(names)`, that gets an array of GitHub logins, fetche the users from GitHub and returns an array of GitHub users.

The GitHub url with user informaiton for the given `USERNAME` is: `https://api.github.com/users/USERNAME`.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

В песочнице есть тестовый пример.

Важные детали:

<<<<<<< HEAD
1. На каждого пользователя должен приходиться один запрос `fetch`. Запросы не должны ожидать завершения друг друга. Надо, чтобы данные приходили как можно быстрее.
2. Если какой-то запрос завершается ошибкой или оказалось, что данных о запрашиваемом пользователе нет, то функция должна возвращать `null` в массиве результатов.
=======
1. There should be one `fetch` request per user. And requests shouldn't wait for each other. So that the data arrives as soon as possible.
2. If any request fails, or if there's no such user, the function should return `null` in the resulting array.
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7
