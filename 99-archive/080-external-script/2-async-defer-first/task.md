importance: 4

---

# Какой скрипт выполнится первым?

В примере ниже подключены два скрипта `small.js` и `big.js`.

Если предположить, что `small.js` загружается гораздо быстрее, чем `big.js` --  какой выполнится первым?

```html
<script src="big.js"></script>
<script src="small.js"></script>
```

А вот так?

```html
<script async src="big.js"></script>
<script async src="small.js"></script>
```

А так?

```html
<script defer src="big.js"></script>
<script defer src="small.js"></script>
```

