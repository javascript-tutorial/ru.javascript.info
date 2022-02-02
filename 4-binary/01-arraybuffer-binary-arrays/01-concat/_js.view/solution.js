function concat(arrays) {
  if (!arrays.length) return null;

  // находим общую длину переданных массивов
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

  let result = new Uint8Array(totalLength);

  // копируем каждый из массивов в result
  // следующий массив копируется сразу после предыдущего
  let offset = 0;
  for(let array of arrays) {
    result.set(array, offset);
    offset += array.length;
  }

  return result;
}
