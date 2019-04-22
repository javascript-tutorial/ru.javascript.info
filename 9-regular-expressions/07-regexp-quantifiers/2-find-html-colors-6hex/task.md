# Regexp for HTML colors

Create a regexp to search HTML-colors written as `#ABCDEF`: first `#` and then 6 hexadimal characters.

An example of use:

```js
let reg = /...your regexp.../

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert( str.match(reg) )  // #121212,#AA00ef
```

P.S. In this task we do not need other color formats like `#123` or `rgb(1,2,3)` etc.
