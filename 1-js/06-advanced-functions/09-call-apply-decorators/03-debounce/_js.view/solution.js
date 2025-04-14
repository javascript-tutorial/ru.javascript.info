function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
<<<<<<< HEAD
}
=======
}
>>>>>>> 540d753e90789205fc6e75c502f68382c87dea9b
