function multiplyNumeric(obj) {
  const multiplier = 2;

  for (const key in obj) {
    if (typeof obj[key] !== 'number') continue;

    obj[key] *= multiplier;
  }
}