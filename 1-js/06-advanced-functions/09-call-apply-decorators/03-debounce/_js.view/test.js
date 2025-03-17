describe('debounce', function () {
  before(function () {
    this.clock = sinon.useFakeTimers();
  });

  after(function () {
    this.clock.restore();
  });

<<<<<<< HEAD
  it('для одного вызова - запускается через "ms" миллисекунд', function () {
=======
  it('for one call - runs it after given ms', function () {
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
    const f = sinon.spy();
    const debounced = debounce(f, 1000);

    debounced('test');
<<<<<<< HEAD
    assert(f.notCalled, 'не вызывается сразу');
    this.clock.tick(1000);
    assert(f.calledOnceWith('test'), 'вызывается после 1000ms');
  });

  it('для 3 вызовов - вызывает последний через "ms" миллисекунд', function () {
=======
    assert(f.notCalled, 'not called immediately');
    this.clock.tick(1000);
    assert(f.calledOnceWith('test'), 'called after 1000ms');
  });

  it('for 3 calls - runs the last one after given ms', function () {
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
    const f = sinon.spy();
    const debounced = debounce(f, 1000);

    debounced('a');
<<<<<<< HEAD
    setTimeout(() => debounced('b'), 200); // проигнорирована
    setTimeout(() => debounced('c'), 500); // вызвана
    this.clock.tick(1000);

    assert(f.notCalled, 'не вызывается после 1000ms');

    this.clock.tick(500);

    assert(f.calledOnceWith('c'), 'вызывается после 1500ms');
  });

  it('сохраняет контекст вызова', function () {
=======
    setTimeout(() => debounced('b'), 200); // ignored (too early)
    setTimeout(() => debounced('c'), 500); // runs (1000 ms passed)
    this.clock.tick(1000);

    assert(f.notCalled, 'not called after 1000ms');

    this.clock.tick(500);

    assert(f.calledOnceWith('c'), 'called after 1500ms');
  });

  it('keeps the context of the call', function () {
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
    let obj = {
      f() {
        assert.equal(this, obj);
      },
    };

    obj.f = debounce(obj.f, 1000);
    obj.f('test');
    this.clock.tick(5000);
  });
<<<<<<< HEAD
});
=======
  
});
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
