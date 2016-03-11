/// <reference path="../src/GoldenTestData" />
/// <reference path="typings/jasmine/jasmine.d.ts" />

import GoldenTestData = require("../src/GoldenTestData");
describe("Person FullName", () => {

  var goldenTestData:GoldenTestData;

  beforeEach(() => {
    goldenTestData = new GoldenTestData();
  });

  it("golden test data generate at least one chicken", () => {
    var data = goldenTestData.create();
    expect(data.length).toBeGreaterThan(0);
  });

});
