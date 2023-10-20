describe('debounce', function () {
  before(function () {
    this.clock = sinon.useFakeTimers();
  });

  after(function () {
    this.clock.restore();
  });

  it('для одного вызова - запускается через "ms" миллисекунд', function () {
    const f = sinon.spy();
    const debounced = debounce(f, 1000);

    debounced('test');
    assert(f.notCalled, 'не вызывается сразу');
    this.clock.tick(1000);
    assert(f.calledOnceWith('test'), 'вызывается после 1000ms');
  });

  it('для 3 вызовов - вызывает последний через "ms" миллисекунд', function () {
    const f = sinon.spy();
    const debounced = debounce(f, 1000);

    debounced('a');
    setTimeout(() => debounced('b'), 200); // проигнорирована
    setTimeout(() => debounced('c'), 500); // вызвана
    this.clock.tick(1000);

    assert(f.notCalled, 'не вызывается после 1000ms');

    this.clock.tick(500);

    assert(f.calledOnceWith('c'), 'вызывается после 1500ms');
  });

  it('сохраняет контекст вызова', function () {
    let obj = {
      f() {
        assert.equal(this, obj);
      },
    };

    obj.f = debounce(obj.f, 1000);
    obj.f('test');
    this.clock.tick(5000);
  });
});