'use strict';

describe('Service: webservices', function () {

  // load the service's module
  beforeEach(module('conquerApp'));

  // instantiate service
  var webservices;
  beforeEach(inject(function (_webservices_) {
    webservices = _webservices_;
  }));

  it('should do something', function () {
    expect(!!webservices).toBe(true);
  });

});
