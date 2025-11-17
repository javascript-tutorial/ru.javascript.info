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
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
