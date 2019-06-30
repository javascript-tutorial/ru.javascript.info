// ячейка <td> под курсором в данный момент (если есть)
let currentElem = null;

table.onmouseover = function(event) {
  if (currentElem) {
    // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий
    // если мы ещё не ушли с <td>, то мы внутри него и игнорируем такое событие
    return;
  }

  let target = event.target.closest('td');
  if (!target || !table.contains(target)) return;

  // отлично, мы сейчас внутри <td>
  currentElem = target;
  target.style.background = 'pink';
};


table.onmouseout = function(event) {
  // если мы вне всякого <td>, то игнорируем событие
  if (!currentElem) return;

  // мы покидаем элемент -- но куда? Возможно, на дочерний элемент?
  let relatedTarget = event.relatedTarget;
  if (relatedTarget) { // возможно: relatedTarget = null
    while (relatedTarget) {
      // поднимаемся по дереву элементов и проверяем -- внутри ли мы currentElem или нет
      // если это переход внутри элемента -- игнорируем
      if (relatedTarget == currentElem) return;
      relatedTarget = relatedTarget.parentNode;
    }
  }

  // мы действительно покинули элемент
  currentElem.style.background = '';
  currentElem = null;
};
