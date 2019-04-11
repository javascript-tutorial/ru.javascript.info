# TextDecoder и TextEncoder

Что если бинарные данные фактически являются строкой? Например, мы получили файл с текстовыми данными.

Встроенный объект [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) позволяет декодировать данные из бинарного буфера в обычную строку.

Для этого прежде всего нам нужно создать сам декодер:
```js
let decoder = new TextDecoder([label], [options]);
```

- **`label`** -- тип кодировки, `utf-8`используется по умолчанию, но также поддерживаются `big5`, `windows-1251` и многие другие.
- **`options`** -- объект с дополнительными настройками:
  - **`fatal`** -- boolean, если `true` тогда генерируется ошибка для не валидных (не декодируемых) символов, в ином случае (по умолчанию) они заменяются символом `\uFFFD`.
  - **`ignoreBOM`** -- boolean, если `true` тогда игнорируется BOM (дополнительный признак определяющий порядок следования байтов), что необходимо крайне редко.

...и после использовать его метод decode:

```js
let str = decoder.decode([input], [options]);
```

- **`input`** -- `BufferSource` бинарный буфер.
- **`options`** -- объект с дополнительными настройками:
  - **`stream`** -- true для декодирования потока данных, при этом `decoder` вызывается вновь и вновь для каждого следующего фрагмента данных. В этом случае многобайтовой символ может иногда быть разделен и попасть до разных фрагментов данных. Это опция заставляет `TextDecoder` запомнить "разбитый" символ и декодировать его только после того как придет его недостающая часть.

Например:

```js run
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

alert( new TextDecoder().decode(uint8Array) ); // Hello
```


```js run
let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

alert( new TextDecoder().decode(uint8Array) ); // 你好
```

Мы так же может декодировать часть бинарного массива вычленив подмассив :


```js run
let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

// возьмем строку из середины массива
let binaryString = uint8Array.subarray(1, -1);

alert( new TextDecoder().decode(binaryString) ); // Hello
```

## TextEncoder

[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) поступает наоборот – кодирует строку в бинарный массив.

Имеет следующий синтаксис:

```js run
let encoder = new TextEncoder();
```

Поддерживается только кодировка "utf-8".

Кодировщик имеет следующие два метода:
- **`encode(str)`** -- возвращает строку  закодированную в `Uint8Array` бинарный массив.
- **`encodeInto(str, destination)`** -- кодирует строку (`str`) и помещает её в `destination`, который должен быть экземпляром `Uint8Array`.

```js run
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111
```

