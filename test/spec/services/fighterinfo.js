'use strict';

describe('Service: fighterInfo', function () {

  // load the service's module
  beforeEach(module('conquerApp'));

  // instantiate service
  var fighterInfo;
  beforeEach(inject(function (_fighterInfo_) {
    fighterInfo = _fighterInfo_;
  }));

  it('should do something', function () {
    expect(!!fighterInfo).toBe(true);
  });

});
