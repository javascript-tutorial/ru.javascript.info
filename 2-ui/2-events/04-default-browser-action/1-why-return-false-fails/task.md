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
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
```

Браузер переходит по указанной ссылке, но нам этого не нужно.

Как поправить?
