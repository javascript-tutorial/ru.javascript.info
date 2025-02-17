
describe('Лестница', function() {
  before(function() {
    window.alert = sinon.stub(window, "alert");
  });
  
  beforeEach(function() {
    ladder.step = 0;
  });

  it('up() должен возвращать this', function() {
    assert.equal(ladder.up(), ladder);
  });

  it('down() должен возвращать  this', function() {
    assert.equal(ladder.down(), ladder);
  });

  it('showStep() должен вызывать alert', function() {
    ladder.showStep();
    assert(alert.called);
  });

  it('up() должен увеличивать ступеньку', function() {
    assert.equal(ladder.up().up().step, 2);
  });

  it('down() должен уменьшать ступеньку', function() {
    assert.equal(ladder.down().step, -1);
  });

  it('down().up().up().up() ', function() {
    assert.equal(ladder.down().up().up().up().step, 2);
  });

<<<<<<< HEAD
  it('showStep() должен возвращать this', function() {
=======
  it('showStep() should return this', function() {
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
    assert.equal(ladder.showStep(), ladder);
  });
 
  it('up().up().down().showStep().down().showStep()', function () {
    assert.equal(ladder.up().up().down().showStep().down().showStep().step, 0)
  });
  
  after(function() {
    ladder.step = 0;
    alert.restore();
  });
});
