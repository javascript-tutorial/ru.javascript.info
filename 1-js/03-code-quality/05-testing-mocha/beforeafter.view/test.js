<<<<<<< HEAD
describe("тест", function () {

  before(() => alert("Тестирование началось – перед тестами"));
  after(() => alert("Тестирование закончилось – после всех тестов"));
=======
describe("test", function() {
  
   // Mocha usually waits for the tests for 2 seconds before considering them wrong
  
  this.timeout(200000); // With this code we increase this - in this case to 200,000 milliseconds

  // This is because of the "alert" function, because if you delay pressing the "OK" button the tests will not pass!
  
  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

  beforeEach(() => alert("Перед тестом – начинаем выполнять тест"));
  afterEach(() => alert("После теста – заканчиваем выполнение теста"));

  it('тест 1', () => alert(1));
  it('тест 2', () => alert(2));

});
