The answer: **`BODY`**.

```html run
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // BODY
</script>
```

Происходящее по шагам:

1. Заменяем содержимое `<body>` на комментарий. Он будет иметь вид `<!--BODY-->`, т.к. `body.tagName == "BODY"`. Как мы помним, свойство `tagName` в HTML всегда находится в верхнем регистре.
2. Этот комментарий теперь является первым и единственным потомком `body.firstChild`.
3. Значение свойства `data` для элемента-комментария -- это его содержимое (внутри `<!--...-->`): `"BODY"`.
