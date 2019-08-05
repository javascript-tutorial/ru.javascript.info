Можно прототипно унаследовать от `options` и добавлять/менять опции в наследнике:

```js run
function Menu(options) {
  options = Object.create(options);
  options.width = 300;

  alert("width: " + options.width); // возьмёт width из наследника
  alert("height: " + options.height); // возьмёт height из исходного объекта
}

var options = {
  width: 100,
  height: 200
};

var menu = new Menu(options);

alert("original width: " + options.width); // width исходного объекта
alert("original height: " + options.height); // height исходного объекта
```

Все изменения будут происходить не в исходном `options`, а в его наследнике, при этом `options` останется незатронутым.
