Для поиска без учёта регистра символов переведём всю строку в нижний регистр, а потом проверим, есть ли в ней искомые подстроки:

```js run demo
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```
