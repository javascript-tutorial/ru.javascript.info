
# Методы прототипов, объекты без свойства __proto__

В первой главе это секции мы упоминали, что существуют современные методы работы с прототипами.

Свойство `__proto__` считается устаревшим и некотором роде нежелательным (только в браузерной части стандарта Javascript).

Современные методы:

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- создает пустой объект со свойством `[[Prototype]]`, указанным как `proto`, и необязательными дескрипторами свойств.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- возвращает свойство `[[Prototype]]` объекта `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- устанавливает свойство `[[Prototype]]` объекта `obj` как `proto`.

Эти методы должны быть использованы вместо `__proto__`.

Например:

```js run
let animal = {
  eats: true
};

// создаем новый объект с прототипом animal
*!*
let rabbit = Object.create(animal);
*/!*

alert(rabbit.eats); // true
*!*
alert(Object.getPrototypeOf(rabbit) === animal); // получаем прототип объекта rabbit
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // изменяем прототип объект rabbit на {}
*/!*
```

У `Object.create` есть необязательный второй аргумент: дескрипторы свойств. Мы можем добавить дополнительное свойство новому объекту таким образом:

```js run
let animal = {
  eats: true
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

alert(rabbit.jumps); // true
```

У дескрипторов такой же формат как описано в этой главе <info:property-descriptors>.

Мы можем использовать `Object.create` для клонирования объектов как более мощный способ чем копирование свойств с помощью `for..in`:

```js
// полностью идентичный поверхностный клон obj
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

Подобный вызов создает точную копию объекта `obj`, включая все свойства: перечисляемые и не перечисляемые, свойства, геттеры/сеттеры для свойств -- и все это с правильным свойством `[[Prototype]]`.

## Краткая история

Если пересчитать все способы управления свойством `[[Prototype]]`, то их будет много! И многие из них делают одно и тоже!

Почему так?

В силу исторических причин.

- Свойство `"prototype"` функции-конструктора существует еще с очень давних времен.
- Позднее в 2012 году: `Object.create` появился в стандарте. Это давало возможность создавать объекты с указанным прототипом, но так же не позволяло устанавливать/получать его. Тогда браузеры реализовали нестандартный аксессор `__proto__`, который позволил устанавливать/получать прототип в любой время.
- Позднее и 2015 году: в стандарт были добавлены `Object.setPrototypeOf` и `Object.getPrototypeOf`. Фактически свойство `__proto__` было реализовано везде, так что оно попало Приложение Б стандарта, которое было опционально для не браузерных окружений.

Теперь мы знаем, что у нас есть все эти способы в нашем распоряжении.

Почему же `__proto__` был заменен на функции? Вопрос интересный, требующий от нас понимания, почему `__proto__` плох. Читайте далее, чтобы узнать ответ.

```warn header="Не переопределяйте `[[Prototype]]`, кроме случаев, когда скорость не важна"
Технически, мы можем установить/получить `[[Prototype]]` в любое время. Но обычно мы устанавливаем прототип только раз во время создания объекта, а после не меняем: `rabbit` наследует от `animal`, и это не изменится.

И JavaScript движки хорошо оптимизированы для этого. Изменение прототипа "на лету" с помощью `Object.setPrototypeOf` или `obj.__proto__=` очень медленная операция, которая ломает внутренние оптимизации для операций доступа к свойствам объекта. Так что лучше избегать этого, кроме, тех ситуаций, когда вы знаете, что делаете, или скорость Javascript для вас полностью не важна.
```

## "Очень пустой" объект

Как мы знаем, объекты можно использовать как ассоциативные массивы для хранения пар ключ/значение.

...Но если попробуем хранить *созданные пользователями* ключи (например, словари с пользовательским вводом), мы можем заметить интересный сбой: все ключи работают как ожидается, за исключением `"__proto__"`.

Посмотрите на пример:

```js run
let obj = {};

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // [object Object], не "some value"!
```

Если пользователь введет `__proto__`, присвоение проигнорируется!

И это не должно удивлять нас. Свойство `__proto__` особенное: оно должно быть либо объектом, либо `null`, а строка не может стать прототипом.

Но мы не *намеревались* реализовывать такое поведение, не так ли? Мы хотим хранить пары ключ/значение, и ключ с именем `"__proto__"` не был сохранен надлежащим образом. Так что это ошибка!

В примере последствия не так ужасны. Но в других случаях прототип может быть изменен, и код может выполниться совершенно неожиданным неправильным способом.

Что хуже всего -- разработчики не думают о такой возможности совсем. Это делает такие ошибки сложным для отлавливания или даже превращает их в уязвимости, особенно когда JavaScript используется на сервере.

Неожиданные вещи могут случаться также при получении доступа к свойству `toString`, которое по умолчанию функция, и к другим встроенным свойствам.

Как избежать проблемы?

Во-первых, мы можем перейти на использование коллекции `Map`, и тогда все будет в порядке.

Но и `Object` может также хорошо подойти, потому что создатели языка уже давно продумали решение проблемы.

Свойство `__proto__` это не свойство объекта, а свойство-аксессор для `Object.prototype`:

![](object-prototype-2.png)

Так что при чтении или установке `obj.__proto__`, вызывается соответствующий геттер/сеттер из прототипа `obj`, и именно он устанавливает/получает свойство `[[Prototype]]`.

Как было сказано в начале этой обучающей секции: `__proto__` это способ доступа к свойству `[[Prototype]]`, это не само свойство `[[Prototype]]`.

Теперь, если мы хотим использовать объект как ассоциативный массив, мы можем сделать это с помощью небольшого трюка:

```js run
*!*
let obj = Object.create(null);
*/!*

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // "some value"
```

`Object.create(null)` создает пустой объект без прототипа (свойство `[[Prototype]]` это `null`):

![](object-prototype-null.png)

Таким образом не будет унаследованного геттера/сеттера для `__proto__`. Теперь это свойство обрабатывается как обычное свойство, и пример приведенный выше работает правильно.

Мы можем назвать такой объект "очень пустым" или "чистым словарным объектом", потому что они еще проще чем обычные объекты `{...}`.

Недостаток в том, что у таких объектов не будет встроенных методов объекта, таких как `toString`:

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Error (no toString)
```

...Но обычно этого достаточно для ассоциативных массивов.

Пожалуйста, обратите внимание, что большая часть методов `Object.something(...)` связанных с объектами, таких как `Object.keys(obj)` -- они не находятся в прототипе, так что они продолжать работать для таких объектов:


```js run
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";

alert(Object.keys(chineseDictionary)); // hello,bye
```

## Summary

Modern methods to setup and directly access the prototype are:

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- creates an empty object with given `proto` as `[[Prototype]]` (can be `null`) and optional property descriptors.
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) -- returns the `[[Prototype]]` of `obj` (same as `__proto__` getter).
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto` (same as `__proto__` setter).

The built-in `__proto__` getter/setter is unsafe if we'd want to put user-generated keys in to an object. Just because a user may enter "__proto__" as the key, and there'll be an error with hopefully easy, but generally unpredictable consequences.

So we can either use `Object.create(null)` to create a "very plain" object without `__proto__`, or stick to `Map` objects for that.

Also, `Object.create` provides an easy way to shallow-copy an object with all descriptors:

```js
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```


- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- returns an array of enumerable own string property names/values/key-value pairs.
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- returns an array of all own symbolic property names.
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- returns an array of all own string property names.
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- returns an array of all own property names.
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): it returns `true` if `obj` has its own (not inherited) property named `key`.

We also made it clear that `__proto__` is a getter/setter for `[[Prototype]]` and resides in `Object.prototype`, just as other methods.

We can create an object without a prototype by `Object.create(null)`. Such objects are used as "pure dictionaries", they have no issues with `"__proto__"` as the key.

All methods that return object properties (like `Object.keys` and others) -- return "own" properties. If we want inherited ones, then we can use `for..in`.
