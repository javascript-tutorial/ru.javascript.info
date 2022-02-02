archive:
  ref: prototype-inheritance

---

# Прототип объекта

Объекты в JavaScript можно организовать в цепочки так, чтобы свойство, не найденное в одном объекте, автоматически искалось бы в другом.

Связующим звеном выступает специальное свойство `__proto__`.

## Прототип __proto__

Если один объект имеет специальную ссылку `__proto__` на другой объект, то при чтении свойства из него, если свойство отсутствует в самом объекте, оно ищется в объекте `__proto__`.

Свойство `__proto__` доступно во всех браузерах, кроме IE10-, а в более старых IE оно, конечно же, тоже есть, но напрямую к нему не обратиться, требуются чуть более сложные способы, которые мы рассмотрим позднее.

Пример кода (кроме IE10-):

```js run
var animal = {
  eats: true
};
var rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal;
*/!*

// в rabbit можно найти оба свойства
alert( rabbit.jumps ); // true
alert( rabbit.eats ); // true
```

1. Первый `alert` здесь работает очевидным образом -- он выводит свойство `jumps` объекта `rabbit`.
2. Второй `alert` хочет вывести `rabbit.eats`, ищет его в самом объекте `rabbit`, не находит -- и продолжает поиск в объекте `rabbit.__proto__`, то есть, в данном случае, в `animal`.

Иллюстрация происходящего при чтении `rabbit.eats` (поиск идёт снизу вверх):

![](proto-animal-rabbit.png)

**Объект, на который указывает ссылка `__proto__`, называется *"прототипом"*. В данном случае получилось, что `animal` является прототипом для `rabbit`.**

**Также говорят, что объект `rabbit` *"прототипно наследует"* от `animal`.**

Обратим внимание -- прототип используется исключительно при чтении. Запись значения, например, `rabbit.eats = value` или удаление `delete rabbit.eats` -- работает напрямую с объектом.

В примере ниже мы записываем свойство в сам `rabbit`, после чего `alert` перестаёт брать его у прототипа, а берёт уже из самого объекта:

```js run
var animal = {
  eats: true
};
var rabbit = {
  jumps: true,
  eats: false
};

rabbit.__proto__ = animal;

*!*
alert( rabbit.eats ); // false, свойство взято из rabbit
*/!*
```

**Другими словами, прототип -- это "резервное хранилище свойств и методов" объекта, автоматически используемое при поиске.**

У объекта, который является `__proto__`, может быть свой `__proto__`, у того -- свой, и так далее. При этом свойства будут искаться по цепочке.

```smart header="Ссылка __proto__ в спецификации"
Если вы будете читать спецификацию ECMAScript -- свойство `__proto__` обозначено в ней как `[[Prototype]]`.

Двойные квадратные скобки здесь важны, чтобы не перепутать его с совсем другим свойством, которое называется `prototype`, и которое мы рассмотрим позже.
```

## Метод hasOwnProperty

Обычный цикл `for..in` не делает различия между свойствами объекта и его прототипа.

Он перебирает всё, например:

```js run
var animal = {
  eats: true
};

var rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
for (var key in rabbit) {
  alert( key + " = " + rabbit[key] ); // выводит и "eats" и "jumps"
}
*/!*
```

Иногда хочется посмотреть, что находится именно в самом объекте, а не в прототипе.

**Вызов [obj.hasOwnProperty(prop)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/HasOwnProperty) возвращает `true`, если свойство `prop` принадлежит самому объекту `obj`, иначе `false`.**

Например:

```js run
var animal = {
  eats: true
};

var rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
alert( rabbit.hasOwnProperty('jumps') ); // true: jumps принадлежит rabbit

alert( rabbit.hasOwnProperty('eats') ); // false: eats не принадлежит
*/!*
```

Для того, чтобы перебрать свойства самого объекта, достаточно профильтровать `key` через `hasOwnProperty`:

```js run
var animal = {
  eats: true
};

var rabbit = {
  jumps: true,
  __proto__: animal
};

for (var key in rabbit) {
*!*
  if (!rabbit.hasOwnProperty(key)) continue; // пропустить "не свои" свойства
*/!*
  alert( key + " = " + rabbit[key] ); // выводит только "jumps"
}
```

## Object.create(null)

Зачастую объекты используют для хранения произвольных значений по ключу, как коллекцию:

```js
var data = {};
data.text = "Привет";
data.age = 35;
// ...
```

При дальнейшем поиске в этой коллекции мы найдём не только `text` и `age`, но и встроенные функции:

```js run
var data = {};
alert(data.toString); // функция, хотя мы её туда не записывали
```

Это может быть неприятным сюрпризом и приводить к ошибкам, если названия свойств приходят от посетителя и могут быть произвольными.

Чтобы этого избежать, мы можем исключать свойства, не принадлежащие самому объекту:
```js run
var data = {};

// выведет toString только если оно записано в сам объект
alert(data.hasOwnProperty('toString') ? data.toString : undefined);
```

Однако, есть путь и проще:
```js run
*!*
var data = Object.create(null);
*/!*
data.text = "Привет";

alert(data.text); // Привет
*!*
alert(data.toString); // undefined
*/!*
```

Объект, создаваемый при помощи `Object.create(null)` не имеет прототипа, а значит в нём нет лишних свойств. Для коллекции -- как раз то, что надо.

## Методы для работы с __proto__

В современных браузерах есть два дополнительных метода для работы с `__proto__`. Зачем они нужны, если есть `__proto__`? В общем-то, не очень нужны, но по историческим причинам тоже существуют.

Чтение: [Object.getPrototypeOf(obj)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
: Возвращает `obj.__proto__` (кроме IE8-)

Запись: [Object.setPrototypeOf(obj, proto)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
: Устанавливает `obj.__proto__ = proto` (кроме IE10-).

Кроме того, есть ещё один вспомогательный метод:

Создание объекта с прототипом: [Object.create(proto, descriptors)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/create)
: Создаёт пустой объект с `__proto__`, равным первому аргументу (кроме IE8-), второй необязательный аргумент может содержать [дескрипторы свойств](/descriptors-getters-setters).

## Итого

- В JavaScript есть встроенное "наследование" между объектами при помощи специального свойства `__proto__`.
- При установке свойства `rabbit.__proto__ = animal` говорят, что объект `animal` будет "прототипом" `rabbit`.
- При чтении свойства из объекта, если его в нём нет, оно ищется в `__proto__`. Прототип задействуется только при чтении свойства. Операции присвоения `obj.prop =` или удаления `delete obj.prop` совершаются всегда над самим объектом `obj`.

Несколько прототипов одному объекту присвоить нельзя, но можно организовать объекты в цепочку, когда один объект ссылается на другой при помощи `__proto__`, тот ссылается на третий, и так далее.

В современных браузерах есть методы для работы с прототипом:

- [Object.getPrototypeOf(obj)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) (кроме IE8-)
- [Object.setPrototypeOf(obj, proto)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) (кроме IE10-)
- [Object.create(proto, descriptors)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/create) (кроме IE8-)

Возможно, вас смущает недостаточная поддержка `__proto__` в старых IE. Но это не страшно. В последующих главах мы рассмотрим дополнительные методы работы с `__proto__`, включая те, которые работают везде.

Также мы рассмотрим, как свойство `__proto__` используется внутри самого языка JavaScript и как организовать классы с его помощью.

