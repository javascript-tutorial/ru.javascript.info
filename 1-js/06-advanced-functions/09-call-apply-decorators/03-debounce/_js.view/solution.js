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
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
