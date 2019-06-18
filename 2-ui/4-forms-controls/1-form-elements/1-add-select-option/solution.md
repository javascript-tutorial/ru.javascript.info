Решение шаг за шагом:

```html run
<select id="genres">
  <option value="rock">Рок</option>
  <option value="blues" selected>Блюз</option>
</select>

<script>
  // 1)
  let selectedOption = genres.options[genres.selectedIndex];
  alert( selectedOption.value );

  // 2)
  let newOption = new Option("Классика", "classic");
  genres.append(newOption);

  // 3)
  newOption.selected = true;
</script>
```
