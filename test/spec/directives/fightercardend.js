'use strict';

describe('Directive: fighterCardEnd', function () {

  // load the directive's module
  beforeEach(module('conquerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fighter-card-end></fighter-card-end>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fighterCardEnd directive');
  }));
});
