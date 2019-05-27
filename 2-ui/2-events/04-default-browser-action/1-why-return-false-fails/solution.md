Когда браузер считывает атрибут `on*`, например `onclick`, он создаёт функцию-обработчик с содержимым этого атрибута в качестве тела функции.

Функция для `onclick="handler()"` будет:

```js
function(event) {
  handler() // содержимое onclick
}
```

Сейчас нам видно, что возвращаемое значение `handler()` не используется и не влияет на результат.

Исправить очень просто:

```html run
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="http://w3.org" onclick="*!*return handler()*/!*">w3.org</a>
```

Также мы можем использовать `event.preventDefault()`, например:

```html run
<script>
*!*
  function handler(event) {
    alert("...");
    event.preventDefault();
  }
*/!*
</script>

<a href="http://w3.org" onclick="*!*handler(event)*/!*">w3.org</a>
```
