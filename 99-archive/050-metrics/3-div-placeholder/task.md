importance: 3

---

# Подменить div на другой с таким же размером

Посмотрим следующий случай из жизни. Был текст, который, в частности, содержал `div` с зелёными границами:

```html run no-beautify
<style>
  #moving-div {
    border: 5px groove green;
    padding: 5px;
    margin: 10px;
    background-color: yellow;
  }
</style>

Before Before Before

<div id="moving-div">
Text Text Text<br>
Text Text Text<br>
</div>

After After After
```

Программист Валера из вашей команды написал код, который позиционирует его абсолютно и смещает в правый верхний угол. Вот этот код:

```js
var div = document.getElementById('moving-div');
div.style.position = 'absolute';
div.style.right = div.style.top = 0;
```

Побочным результатом явилось смещение текста, который раньше шёл после `DIV`. Теперь он поднялся вверх:

[iframe height=90 src="source"]

**Допишите код Валеры, сделав так, чтобы текст оставался на своём месте после того, как `DIV` будет смещен.**

Сделайте это путём создания вспомогательного `DIV` с теми же `width`, `height`, `border`, `margin`, `padding`, что и у жёлтого `DIV`.

Используйте только JavaScript, без CSS.

Должно быть так (новому блоку задан фоновый цвет для демонстрации):

[iframe height=140 src="solution"]

