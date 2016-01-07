'use strict';

/**
 * @ngdoc directive
 * @name conquerApp.directive:myFighter
 * @description
 * # myFighter
 */
angular.module('conquerApp')
  .directive('myFighter', function () {
    return {
      templateUrl: '../../views/myfighter.html',
      restrict: 'E',
      replace:'true',
      scope:{
        fighter:'='
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
