'use strict';

describe('Filter: filterFighter', function () {

  // load the filter's module
  beforeEach(module('conquerApp'));

  // initialize a new instance of the filter before each test
  var filterFighter;
  beforeEach(inject(function ($filter) {
    filterFighter = $filter('filterFighter');
  }));

  it('should return the input prefixed with "filterFighter filter:"', function () {
    var text = 'angularjs';
    expect(filterFighter(text)).toBe('filterFighter filter: ' + text);
  });

});
