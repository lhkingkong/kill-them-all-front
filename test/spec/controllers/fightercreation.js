'use strict';

describe('Controller: FightercreationCtrl', function () {

  // load the controller's module
  beforeEach(module('conquerApp'));

  var FightercreationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FightercreationCtrl = $controller('FightercreationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FightercreationCtrl.awesomeThings.length).toBe(3);
  });
});
