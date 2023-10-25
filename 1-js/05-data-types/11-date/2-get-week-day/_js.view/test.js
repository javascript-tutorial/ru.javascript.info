describe("getWeekDay", function() {
  it("3 января 2014 года - пятница", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 3)), 'ПТ');
  });

  it("4 января 2014 года - суббота", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 4)), 'СБ');
  });

  it("5 января 2014 года - воскресенье", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 5)), 'ВС');
  });

  it("6 января 2014 года - понедельник", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 6)), 'ПН');
  });

  it("7 января 2014 года - вторник", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 7)), 'ВТ');
  });

  it("8 января 2014 года - среда", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 8)), 'СР');
  });

  it("9 января 2014 - четверг", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 9)), 'ЧТ');
  });
});
