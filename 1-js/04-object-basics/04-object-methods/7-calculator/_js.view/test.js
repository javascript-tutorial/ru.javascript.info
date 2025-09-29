

describe("калькулятор", function() {
  
  context("когда 2 и 3 введены", function() {
    beforeEach(function() {
      sinon.stub(window, "prompt");

      prompt.onCall(0).returns("2");
      prompt.onCall(1).returns("3");

      calculator.read();
    });

    afterEach(function() {
      prompt.restore();
    });
    
<<<<<<< HEAD
    it('read получает два значения и сохраняет их как свойства объекта', function () {
=======
    it('the read get two values and saves them as object properties', function () {
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
      assert.equal(calculator.a, 2);
      assert.equal(calculator.b, 3);
    });

    it("сумма равна 5", function() {
      assert.equal(calculator.sum(), 5);
    });

    it("произведение равно 6", function() {
      assert.equal(calculator.mul(), 6);
    });
  });

});
