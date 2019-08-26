// ячейка <td> под курсором в данный момент (если есть)
let currentElem = null;

table.onmouseover = function(event) {
<<<<<<< HEAD
  // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий
  // если currentElem есть, то мы ещё не ушли с предыдущего <td>,
  // это переход внутри - игнорируем такое событие
=======
  // before entering a new element, the mouse always leaves the previous one
  // if currentElem is set, we didn't leave the previous <td>,
  // that's a mouseover inside it, ignore the event
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
  if (currentElem) return;

  let target = event.target.closest('td');

<<<<<<< HEAD
  // переход не на <td> - игнорировать
  if (!target) return;

  // переход на <td>, но вне нашей таблицы (возможно при вложенных таблицах)
  // игнорировать
  if (!table.contains(target)) return;

  // ура, мы зашли на новый <td>
=======
  // we moved not into a <td> - ignore
  if (!target) return;

  // moved into <td>, but outside of our table (possible in case of nested tables)
  // ignore
  if (!table.contains(target)) return;

  // hooray! we entered a new <td>
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
  currentElem = target;
  target.style.background = 'pink';
};


table.onmouseout = function(event) {
<<<<<<< HEAD
  // если мы вне <td>, то игнорируем уход мыши
  // это какой-то переход внутри таблицы, но вне <td>,
  // например с <tr> на другой <tr>
  if (!currentElem) return;

  // мы покидаем элемент – но куда? Возможно, на потомка?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // поднимаемся по дереву элементов и проверяем – внутри ли мы currentElem или нет
    // если да, то это переход внутри элемента – игнорируем
=======
  // if we're outside of any <td> now, then ignore the event
  // that's probably a move inside the table, but out of <td>,
  // e.g. from <tr> to another <tr>
  if (!currentElem) return;

  // we're leaving the element – where to? Maybe to a descendant?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // go up the parent chain and check – if we're still inside currentElem
    // then that's an internal transition – ignore it
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

<<<<<<< HEAD
  // мы действительно покинули элемент
=======
  // we left the <td>. really.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72
  currentElem.style.background = '';
  currentElem = null;
};
