function isEmpty(obj) {
  for (let key in obj) {
    // если цикл запустился, то значит есть свойство
    return false;
  }
  return true;
}
