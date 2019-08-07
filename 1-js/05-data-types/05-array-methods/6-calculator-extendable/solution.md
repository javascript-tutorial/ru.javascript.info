
- Обратите внимание, как хранятся методы. Они просто добавляются к внутреннему объекту.
- Все тесты и числовые преобразования выполняются в методе `calculate`. В будущем он может быть расширен для поддержки более сложных выражений.

```js run
function Calculator() {
  
    let methods = {
      "-": (a, b) => a - b,
      "+": (a, b) => a + b
    };
  
    this.calculate = function(str) {
  
      let split = str.split(' '),
        a = +split[0],
        op = split[1],
        b = +split[2]
  
      if (!methods[op] || isNaN(a) || isNaN(b)) {
        return NaN;
      }
  
      return methods[op](a, b);
    }
  
    this.addMethod = function(name, func) {
      methods[name] = func;
    };
  }
  ```
