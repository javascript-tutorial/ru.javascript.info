function getLocalDay(date) {
  return (date.getDay()===0) ? 7 : date.getDay() // день недели 0 (воскресенье) в европейской нумерации будет 7
}
