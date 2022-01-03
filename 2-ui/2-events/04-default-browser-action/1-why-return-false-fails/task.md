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

<<<<<<< HEAD
<a href="http://w3.org" onclick="handler()">браузер откроет w3.org</a>
=======
<a href="https://w3.org" onclick="handler()">the browser will go to w3.org</a>
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
```

Браузер переходит по указанной ссылке, но нам этого не нужно.

Как поправить?
