'use strict';

/**
 * @ngdoc filter
 * @name conquerApp.filter:startFrom
 * @function
 * @description
 * # startFrom
 * Filter in the conquerApp.
 */
angular.module('conquerApp')
  .filter('startFrom', function () {
    return function (input, start) {
      return function (input, start) {
        start = +start;
        return input.slice(start);
      };
    };
  });