function isEmpty(obj) {
  for (let key in obj) {
    // если цикл запустился, то значит свойство есть
    return false;
  }
  return true;
}
