function Accumulator(startingValue) {
  this.value = startingValue;

  this.read = function() {
    this.value += +prompt('Сколько нужно добавить?', 0);
  };

}
