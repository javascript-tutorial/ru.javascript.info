describe("ucFirst", function() {
  it('Переводит первый символ в верхний регистр', function() {
    assert.strictEqual(ucFirst("john"), "John");
  });

  it("Не умирает на пустых строках", function() {
    assert.strictEqual(ucFirst(""), "");
  });
});
