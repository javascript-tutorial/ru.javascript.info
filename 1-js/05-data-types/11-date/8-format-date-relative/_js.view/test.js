describe("formatDate", function() {
  it("отображает 1 мс назад как \"прямо сейчас\"", function() {
    assert.equal(formatDate(new Date(new Date - 1)), 'прямо сейчас');
  });

  it('"30 секунд назад"', function() {
    assert.equal(formatDate(new Date(new Date - 30 * 1000)), "30 сек. назад");
  });

  it('"5 минут назад"', function() {
    assert.equal(formatDate(new Date(new Date - 5 * 60 * 1000)), "5 мин. назад");
  });

  it("более поздние даты в виде DD.MM.YY HH:mm", function() {
    assert.equal(formatDate(new Date(2014, 2, 1, 11, 22, 33)), "01.03.14 11:22");
  });

});
