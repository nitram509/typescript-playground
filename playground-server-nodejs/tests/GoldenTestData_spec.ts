/// <reference path="../src/GoldenTestData" />
/// <reference path="typings/jasmine/jasmine.d.ts" />

import GoldenTestData = require("../src/GoldenTestData");
describe("Golden Test Data", () => {

  var goldenTestData:GoldenTestData;

  beforeEach(() => {
    goldenTestData = new GoldenTestData();
  });

  it("golden test data generate at least one chicken", () => {
    var data = goldenTestData.create();
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].name).toEqual("Chicken");
  });

});
