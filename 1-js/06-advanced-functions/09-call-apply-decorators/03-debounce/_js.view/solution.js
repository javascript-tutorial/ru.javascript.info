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
>>>>>>> 20208769e528337949e946f526534d61d38bac47
