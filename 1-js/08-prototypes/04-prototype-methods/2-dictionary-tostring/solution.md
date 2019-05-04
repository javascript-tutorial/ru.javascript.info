
В методе можно получить список всех перечисляем ключей с помощью `Object.keys` и вывести их как список.

Чтобы сделать `toString` не перечисляемым, давайте определим метод как дескриптор свойства. Синтаксис `Object.create` позволяет нам добавить в объект дескрипторы свойств как второй аргумент.

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // определяем свойство toString
    value() { // значение -- это функция
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple и __proto__ выведены в цикле
for(let key in dictionary) {
  alert(key); // "apple", затем "__proto__"
}  

// список свойств разделённых запятой выведен с помощью toString
alert(dictionary); // "apple,__proto__"
```

Когда мы создаем свойство с помощью дескриптора, все флаги по умолчанию имеют значение `false`. Таким образом, в коде выше `dictionary.toString` не перечисляемое свойство.

Смотрите главу [](info:property-descriptors) для ознакомления.
