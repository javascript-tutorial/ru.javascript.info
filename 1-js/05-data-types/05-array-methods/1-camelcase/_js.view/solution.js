function camelize(str) {
  return str
    .split('-') // разбить 'my-long-word' на массив ['my', 'long', 'word']
    .map(
      // преобразовать все, кроме первой буквы в массиве на большую
      // из ['my', 'long', 'word'] в ['my', 'Long', 'Word']
      (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(''); // соеденить ['my', 'Long', 'Word'] в 'myLongWord'
}
