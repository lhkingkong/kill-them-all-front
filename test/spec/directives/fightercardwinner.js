'use strict';

describe('Directive: fighterCardWinner', function () {

  // load the directive's module
  beforeEach(module('conquerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fighter-card-winner></fighter-card-winner>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fighterCardWinner directive');
  }));
});