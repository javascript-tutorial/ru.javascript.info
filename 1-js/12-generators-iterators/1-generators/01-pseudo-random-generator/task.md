
# Псевдослучайный генератор

Есть много областей, где нам нужны случайные данные.

<<<<<<< HEAD
Одной из них является тестирование. Нам могут понадобиться случайные данные: текст, числа и т.д., чтобы хорошо всё проверить.
=======
One of them is testing. We may need random data: text, numbers, etc. to test things out well.
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8

В JavaScript мы можем использовать `Math.random()`. Но если что-то пойдёт не так, то нам нужно будет перезапустить тест, используя те же самые данные.

<<<<<<< HEAD
Для этого используются так называемые "сеяные псевдослучайные генераторы". Они получают "зерно", как первое значение, и затем генерируют следующее, используя формулу. Так что одно и то же зерно даёт одинаковую последовательность, и, следовательно, весь поток легко воспроизводим. Нам нужно только запомнить зерно, чтобы воспроизвести последовательность.
=======
For that, so called "seeded pseudo-random generators" are used. They take a "seed", the first value, and then generate the next ones using a formula so that the same seed yields the same sequence, and hence the whole flow is easily reproducible. We only need to remember the seed to repeat it.
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8

Пример такой формулы, которая генерирует более-менее равномерно распределённые значения:

```
next = previous * 16807 % 2147483647
```

Если мы используем `1` как зерно, то значения будут:
1. `16807`
2. `282475249`
3. `1622650073`
4. ...и так далее...

Задачей является создать функцию-генератор `pseudoRandom(seed)`, которая получает `seed` и создаёт генератор с указанной формулой.

Пример использования:

```js
let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
```
