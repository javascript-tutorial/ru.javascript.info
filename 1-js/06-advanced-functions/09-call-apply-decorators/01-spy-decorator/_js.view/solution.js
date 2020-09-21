function spy(func) {

  function wrapper(...args) {
    wrapper.calls.push([...args]);
    return func(...args);
  }

  wrapper.calls = [];

  return wrapper;
}
