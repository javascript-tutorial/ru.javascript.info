
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
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
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
