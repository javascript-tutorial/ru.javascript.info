describe("isEmpty", function() {
  it("возвращает true для пустого объекта", function() {
    assert.isTrue(isEmpty({}));
  });

  it("возвращает false, если свойство существует", function() {
    assert.isFalse(isEmpty({
      anything: false
    }));
  });
});