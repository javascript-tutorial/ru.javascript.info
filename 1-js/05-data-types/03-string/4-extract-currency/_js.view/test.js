describe("extractCurrencyValue", function() {

  it("возвращает для строки $120 число 120", function() {
    assert.strictEqual(extractCurrencyValue('$120'), 120);
  });


});
