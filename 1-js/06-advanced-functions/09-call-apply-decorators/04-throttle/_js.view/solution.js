function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      // запоминаем последние аргументы для вызова после задержки
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    // в противном случае переходим в состояние задержки
    func.apply(this, arguments);

    isThrottled = true;

    // настройка сброса isThrottled после задержки
    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        // если были вызовы, savedThis/savedArgs хранят последний из них
        // рекурсивный вызов запускает функцию и снова устанавливает время задержки
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
