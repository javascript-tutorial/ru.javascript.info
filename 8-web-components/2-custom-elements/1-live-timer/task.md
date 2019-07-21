
# Элемент "живой таймер"

У нас уже есть элемент `<time-formatted>`, показывающий красиво отформатированное время.

Создайте элемент `<live-timer>`, показывающий текущее время:
1. Внутри он должен использовать `<time-formatted>`, не дублировать его функциональность.
2. Должен тикать (обновляться) каждую секунду.
3. На каждом тике должно генерироваться пользовательское событие с именем `tick`, содержащее текущую дату в `event.detail` (смотрите главу <info:dispatch-events>).

Использование:

```html
<live-timer id="elem"></live-timer>

<script>
  elem.addEventListener('tick', event => console.log(event.detail));
</script>
```

Демо:

[iframe src="solution" height=40]
