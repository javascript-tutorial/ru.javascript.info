
function filterRange(arr, a, b) {
  // добавлены скобки вокруг выражения для лучшей читаемости
  return arr.filter(item => (a <= item && item <= b));
}