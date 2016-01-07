'use strict';

describe('Service: adminUserInfo', function () {

  // load the service's module
  beforeEach(module('conquerApp'));

  // instantiate service
  var adminUserInfo;
  beforeEach(inject(function (_adminUserInfo_) {
    adminUserInfo = _adminUserInfo_;
  }));

  it('should do something', function () {
    expect(!!adminUserInfo).toBe(true);
  });

});
