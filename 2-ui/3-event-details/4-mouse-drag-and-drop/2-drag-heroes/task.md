importance: 5

---

# Расставить супергероев по полю

В этой задаче вы можете проверить своё понимание сразу нескольких аспектов Drag’n’Drop и DOM.

Сделайте так, чтобы элементы с классом `draggable` можно было переносить мышкой. Как мяч в этой главе.

Требования к реализации:

<<<<<<< HEAD
- Используйте делегирование событий для отслеживания начала перетаскивания: только один обработчик событий `mousedown` на документе.
- Если элементы подносят к верхней/нижней границе окна – оно должно прокручиваться вверх/вниз, чтобы позволить дальнейшее перетаскивание.
- Горизонтальная прокрутка отсутствует (чуть-чуть упрощает задачу, её просто добавить).
- Элемент при переносе, даже при резких движениях мышкой, не должен даже частично попасть вне окна.
=======
- Use event delegation to track drag start: a single event handler on `document` for `mousedown`.
- If elements are dragged to top/bottom window edges -- the page scrolls up/down to allow further dragging.
- There is no horizontal scroll (this makes the task a bit simpler, adding it is easy).
- Draggable elements or their parts should never leave the window, even after swift mouse moves.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

Демо слишком велико для размещения здесь, перейдите по ссылке ниже.

[demo src="solution"]
