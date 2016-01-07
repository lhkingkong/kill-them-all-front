'use strict';

describe('Controller: GameadminCtrl', function () {

  // load the controller's module
  beforeEach(module('conquerApp'));

  var GameadminCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GameadminCtrl = $controller('GameadminCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GameadminCtrl.awesomeThings.length).toBe(3);
  });
});
