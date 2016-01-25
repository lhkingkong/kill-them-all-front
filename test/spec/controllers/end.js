'use strict';

describe('Controller: EndCtrl', function () {

  // load the controller's module
  beforeEach(module('conquerApp'));

  var EndCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EndCtrl = $controller('EndCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EndCtrl.awesomeThings.length).toBe(3);
  });
});
