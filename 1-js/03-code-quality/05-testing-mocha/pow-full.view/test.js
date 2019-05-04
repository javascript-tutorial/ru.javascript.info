describe("pow", function() {

  describe("возводит x в степень 3", function() {

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} в степени 3 будет ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

  });

  it("если n - отрицательное число, результат будет NaN", function() {
    assert.isNaN(pow(2, -1));
  });

  it("если n не число, результат будет NaN", function() {
    assert.isNaN(pow(2, 1.5));
  });

});
