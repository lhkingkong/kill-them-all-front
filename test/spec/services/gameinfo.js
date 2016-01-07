'use strict';

describe('Service: gameInfo', function () {

  // load the service's module
  beforeEach(module('conquerApp'));

  // instantiate service
  var gameInfo;
  beforeEach(inject(function (_gameInfo_) {
    gameInfo = _gameInfo_;
  }));

  it('should do something', function () {
    expect(!!gameInfo).toBe(true);
  });

});
