<<<<<<< HEAD
Чтобы перетащить элемент, мы можем использовать `position:fixed`, это делает управление координатами проще. В конце следует переключиться обратно на `position:absolute`, чтобы положить элемент в документ.

Когда координаты находятся в верхней/нижней части окна, мы используем его `window.scrollTo` для прокрутки.
=======
To drag the element we can use `position:fixed`, it makes coordinates easier to manage. At the end we should switch it back to `position:absolute` to lay the element into the document.

When coordinates are at window top/bottom, we use `window.scrollTo` to scroll it.
>>>>>>> 8c30654f694fe8682f5631809980be931ee4ed72

Детали решения расписаны в комментариях в исходном коде.
