describe("getLocalDay возвращает \"европейский\" день недели", function() {
  it("3 января 2014 года - пятница", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 3)), 5);
  });

  it("4 января 2014 года - суббота", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 4)), 6);
  });

  it("5 января 2014 года - воскресенье", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 5)), 7);
  });

  it("6 января 2014 года - понедельник", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 6)), 1);
  });

  it("7 января 2014 года - вторник", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 7)), 2);
  });

  it("8 января 2014 года - среда", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 8)), 3);
  });

  it("9 января 2014 года - четверг", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 9)), 4);
  });
});
