importance: 5

---

# Почему нам нужен Origin?

Как вы, вероятно, знаете, существует HTTP-заголовок `Referer`, который обычно содержит адрес страницы, инициировавшей сетевой запрос.

Например, при запросе (fetch) `http://google.com` с `http://javascript.info/some/url` заголовки выглядят так:

```
Accept: */*
Accept-Charset: utf-8
Accept-Encoding: gzip,deflate,sdch
Connection: keep-alive
Host: google.com
*!*
Origin: http://javascript.info
Referer: http://javascript.info/some/url
*/!*
```

Как вы можете видеть, присутствуют и `Referer`, и `Origin`.

Вопросы:

<<<<<<< HEAD
1. Почему нужен `Origin`, если `Referer` содержит даже больше информации?
2. Возможно ли отсутствие `Referer` или `Origin`, или это неправильно?
=======
1. Why `Origin` is needed, if `Referer` has even more information?
2. Is it possible that there's no `Referer` or `Origin`, or is it incorrect?
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
