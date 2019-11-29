Операция над числами, в конечном итоге, сводится к битам.

Посмотрим, можно ли поменять местами биты слева и справа.

Например, таблица истинности для `^`:
<table>
<thead>
<tr>
<th><code>a</code></th>
<th><code>b</code></th>
<th>результат</th>
</tr>
</thead>
<tbody>
<tr><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td></tr>
<tr><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td></tr>
<tr><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td></tr>
<tr><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td></tr>
</tbody>
</table>

Случаи `0^0` и `1^1` заведомо не изменятся при перемене мест, поэтому нас не интересуют. А вот `0^1` и `1^0` эквивалентны и равны `1`.

Аналогично можно увидеть, что и другие операторы симметричны.

Ответ: **да**.

