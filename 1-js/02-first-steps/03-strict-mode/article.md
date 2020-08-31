# Строгий режим — "use strict"

На протяжении долгого времени JavaScript развивался без проблем с обратной совместимостью. Новые функции добавлялись в язык, в то время как старая функциональность не менялась.

Преимуществом данного подхода было то, что существующий код продолжал работать. А недостатком -- что любая ошибка или несовершенное решение, принятое создателями JavaScript, застревали в языке навсегда.

Так было до 2009 года, когда появился ECMAScript 5 (ES5). Он добавил новые возможности в язык и изменил некоторые из существующих. Чтобы устаревший код работал, как и раньше, по умолчанию подобные изменения не применяются. Поэтому нам нужно явно их активировать с помощью специальной директивы: `"use strict"`.

## "use strict"

Директива выглядит как строка: `"use strict"` или `'use strict'`. Когда она находится в начале скрипта, весь сценарий работает в "современном" режиме.

Например:

```js
"use strict";

// этот код работает в современном режиме
...
```

<<<<<<< HEAD
Позже мы изучим функции (способ группировки команд). Забегая вперёд, заметим, что вместо всего скрипта `"use strict"` можно поставить в начале большинства видов функций. Это позволяет включить строгий режим только в конкретной функции. Но обычно люди используют его для всего файла.

=======
Quite soon we're going to learn functions (a way to group commands), so let's note in advance that `"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. But usually people use it for the whole script.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

````warn header="Убедитесь, что \"use strict\" находится в начале"
Проверьте, что `"use strict"` находится в первой исполняемой строке скрипта, иначе строгий режим может не включиться.

Здесь строгий режим не включён:

```js no-strict
alert("some code");
// "use strict" ниже игнорируется - он должен быть в первой строке

"use strict";

// строгий режим не активирован
```

Над `"use strict"` могут быть записаны только комментарии.
````

```warn header="Нет никакого способа отменить `use strict`"
Нет директивы типа `"no use strict"`, которая возвращала бы движок к старому поведению.

<<<<<<< HEAD
Как только мы входим в строгий режим, отменить это невозможно.
=======
Once we enter strict mode, there's no going back.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
```

## Консоль браузера

<<<<<<< HEAD
В будущем, когда вы будете использовать консоль браузера для тестирования функций, обратите внимание, что `use strict` по умолчанию в ней выключен.
=======
When you use a [developer console](info:devtools) to run code, please note that it doesn't `use strict` by default.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

Иногда, когда `use strict` имеет значение, вы можете получить неправильные результаты.

<<<<<<< HEAD
Можно использовать `key:Shift+Enter` для ввода нескольких строк и написать в верхней строке `use strict`:
=======
So, how to actually `use strict` in the console?

First, you can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js
'use strict'; <Shift+Enter для перехода на новую строку>
//  ...ваш код...
<Enter для запуска>
```

В большинстве браузеров, включая Chrome и Firefox, это работает.

<<<<<<< HEAD
В старых браузерах консоль не учитывает такой `use strict`, там можно "оборачивать" код в функцию, вот так:
=======
If it doesn't, e.g. in an old browser, there's an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js
(function() {
  'use strict';

<<<<<<< HEAD
  // ...ваш код...
})()
```

## Всегда используйте "use strict"

Нам ещё предстоит рассмотреть различия между строгим режимом и режимом "по умолчанию".

В следующих главах, изучая особенности языка, мы будем отмечать различия между строгим и стандартным режимами. К счастью, их не так много, и они действительно делают нашу жизнь лучше.

На данный момент достаточно иметь общее понимание об этом режиме:

1. Директива `"use strict"` переключает движок в "современный" режим, изменяя поведение некоторых встроенных функций. Позже в учебнике мы увидим подробности.
2. Строгий режим включается путём размещения `"use strict"` в начале скрипта или функции. Некоторые функции языка, такие как "классы" и "модули", автоматически включают строгий режим.
3. Строгий режим поддерживается всеми современными браузерами.
4. Мы рекомендуем всегда начинать скрипты с `"use strict"`. Все примеры в этом руководстве предполагают строгий режим, если (очень редко) не указано иное.
=======
  // ...your code here...
})()
```

## Should we "use strict"?

The question may sound obvious, but it's not so.

One could recommend to start scripts with `"use strict"`... But you know what's cool?

Modern JavaScript supports "classes" and "modules" - advanced language structures (we'll surely get to them), that enable `use strict` automatically. So we don't need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we've got to know about `use strict` in general.

In the next chapters, as we learn language features, we'll see the differences between the strict and old modes. Luckily, there aren't many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
