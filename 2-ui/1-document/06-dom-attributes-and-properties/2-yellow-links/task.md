importance: 3

---

# Сделайте внешние ссылки оранжевыми

Сделайте все внешние ссылки оранжевыми, изменяя их свойство `style`.

Ссылка является внешней, если:
- Её `href` содержит `://`
- Но не начинается с `http://internal.com`.

Пример:

```html run
<a name="list">the list</a>
<ul>
  <li><a href="http://google.com">http://google.com</a></li>
  <li><a href="/tutorial">/tutorial.html</a></li>
  <li><a href="local/path">local/path</a></li>
  <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
  <li><a href="http://nodejs.org">http://nodejs.org</a></li>
  <li><a href="http://internal.com/test">http://internal.com/test</a></li>
</ul>

<script>
  // добавление стиля для одной ссылки
  let link = document.querySelector('a');
  link.style.color = 'orange';
</script>
```

Результат должен быть таким:

[iframe border=1 height=180 src="solution"]
