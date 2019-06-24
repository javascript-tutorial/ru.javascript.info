
```html run height=100
<!DOCTYPE html>
<html>
<body>

  <div data-widget-name="menu">Choose the genre</div>

  <script>
    // получаем элемент
    let elem = document.querySelector('[data-widget-name]');

    // читаем значение
    alert(elem.dataset.widgetName);
    // или так
    alert(elem.getAttribute('data-widget-name'));
  </script>
</body>
</html>
```
