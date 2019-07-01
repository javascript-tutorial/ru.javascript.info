function concat(arrays) {
  // находим общую длину переданных массивов
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

  if (!arrays.length) return null;

  let result = new Uint8Array(totalLength);

  // копируем каждый из массивов в result
  // следующий массив копируется сразу после предыдущего
  let length = 0;
  for(let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
