importance: 3

---

# Почему не работает return false?

Почему в коде ниже `return false` не работает?

```html autorun run
<script>
  function handler() {
    alert( "..." );
    return false;
  }
</script>

<a href="http://w3.org" onclick="handler()">браузер откроет w3.org</a>
```

Браузер переходит по указанной ссылке, но нам этого не нужно.

Как поправить?
