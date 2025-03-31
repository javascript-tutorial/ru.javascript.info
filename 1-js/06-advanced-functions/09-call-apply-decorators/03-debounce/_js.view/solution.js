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
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
