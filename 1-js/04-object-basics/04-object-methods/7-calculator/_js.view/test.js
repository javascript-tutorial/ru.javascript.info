

describe("калькулятор", function() {
  
  context("Когда 2 и 3 введены", function() {
    beforeEach(function() {
      sinon.stub(window, "prompt");

      prompt.onCall(0).returns("2");
      prompt.onCall(1).returns("3");

      calculator.read();
    });

    afterEach(function() {
      prompt.restore();
    });

    it("Сумма равна 5", function() {
      assert.equal(calculator.sum(), 5);
    });

    it("Произведение равно 6", function() {
      assert.equal(calculator.mul(), 6);
    });
  });

});
