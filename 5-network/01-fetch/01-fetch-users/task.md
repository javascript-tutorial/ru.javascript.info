# Получите данные о пользователях GitHub

Создайте асинхронную функцию `getUsers(names)`, которая получает на вход массив логинов пользователей GitHub, запрашивает у GitHub информацию о них и возвращает массив объектов-пользователей.

Информация о пользователе GitHub с логином USERNAME доступна по ссылке: `https://api.github.com/users/USERNAME`.

В песочнице есть тестовый пример.

Важные детали:

<<<<<<< HEAD
1. На каждого пользователя должен приходиться один запрос `fetch`.
2. Запросы не должны ожидать завершения друг друга. Надо, чтобы данные приходили как можно быстрее.
3. Если какой-то запрос завершается ошибкой или оказалось, что данных о запрашиваемом пользователе нет, то функция должна возвращать `null` в массиве результатов.
=======
1. There should be one `fetch` request per user.
2. Requests shouldn't wait for each other. So that the data arrives as soon as possible.
3. If any request fails, or if there's no such user, the function should return `null` in the resulting array.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
